import { NextRequest, NextResponse } from "next/server";
import {
  getGHLClientConfig,
  ClientNotFoundError,
  ClientConfigError,
} from "@/lib/ghl/clients";

export const runtime = "nodejs";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface GHLCustomFieldValue {
  id: string;
  value: string | number | null;
}

interface GHLContact {
  id: string;
  customFields?: GHLCustomFieldValue[];
  [key: string]: unknown;
}

interface WebhookBody {
  contactId?: string;
  contact_id?: string;
  productName?: string;
  customData?: {
    contactId?: string;
    productName?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// GHL API helpers
// ---------------------------------------------------------------------------

async function getGHLContact(
  contactId: string,
  apiToken: string
): Promise<GHLContact> {
  const res = await fetch(
    `https://services.leadconnectorhq.com/contacts/${contactId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GHL getContact failed [${res.status}]: ${text}`);
  }

  const data = await res.json();
  return (data.contact ?? data) as GHLContact;
}

async function updateGHLContact(
  contactId: string,
  apiToken: string,
  customFields: { id: string; field_value: string | number }[]
): Promise<void> {
  const res = await fetch(
    `https://services.leadconnectorhq.com/contacts/${contactId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customFields }),
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GHL updateContact failed [${res.status}]: ${text}`);
  }
}

function getCustomFieldValue(
  contact: GHLContact,
  fieldId: string
): string | number | null {
  const field = contact.customFields?.find((f) => f.id === fieldId);
  return field?.value ?? null;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0]; // YYYY-MM-DD
}

// ---------------------------------------------------------------------------
// Membership update logic
// ---------------------------------------------------------------------------

interface MembershipUpdateInput {
  purchasedProduct: {
    accessType: "credits" | "unlimited";
    sessionsToSet: number;
  };
  previousMembershipType: string;
  previousBalance: number;
}

interface MembershipUpdateResult {
  newBalance: number;
  membershipType: string;
}

/**
 * Determines the new session balance and membership type after a purchase.
 * Generic — driven entirely by the product config, not client-specific values.
 */
function determineMembershipUpdate({
  purchasedProduct,
  previousMembershipType,
  previousBalance,
}: MembershipUpdateInput): MembershipUpdateResult {
  const { accessType, sessionsToSet } = purchasedProduct;

  // Unlimited purchase — always override to fixed value
  if (accessType === "unlimited") {
    return { newBalance: sessionsToSet, membershipType: "Unlimited Monthly" };
  }

  const isOnCreditPlan =
    previousMembershipType === "Punch Card" ||
    previousMembershipType === "Daily Pass";

  // Daily Pass purchase (sessionsToSet === 1)
  if (sessionsToSet === 1) {
    if (previousMembershipType === "Daily Pass") {
      // Daily Pass on top of existing Daily Pass — accumulate
      return { newBalance: previousBalance + 1, membershipType: "Daily Pass" };
    }
    if (previousMembershipType === "Punch Card" && previousBalance > 0) {
      // Adding a day to an active punch card — keep Punch Card type
      return { newBalance: previousBalance + 1, membershipType: "Punch Card" };
    }
    // Unlimited Monthly, expired punch card (0 balance), or invalid/missing
    return { newBalance: 1, membershipType: "Daily Pass" };
  }

  // Punch Card purchase (sessionsToSet > 1) — always becomes Punch Card
  return {
    newBalance: isOnCreditPlan
      ? previousBalance + sessionsToSet
      : sessionsToSet,
    membershipType: "Punch Card",
  };
}

// ---------------------------------------------------------------------------
// POST /api/ghl/[client]/punch-card-purchase
// ---------------------------------------------------------------------------

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ client: string }> }
) {
  console.log("✅ Punch card webhook received", {
    time: new Date().toISOString(),
    url: request.url,
  });

  const { client: clientSlug } = await params;

  // -- Resolve client config --------------------------------------------------
  let config: ReturnType<typeof getGHLClientConfig>;
  try {
    config = getGHLClientConfig(clientSlug);
  } catch (err) {
    if (err instanceof ClientNotFoundError) {
      return NextResponse.json(
        { success: false, error: (err as Error).message },
        { status: 404 }
      );
    }
    if (err instanceof ClientConfigError) {
      console.error(
        `[GHL punch-card] Config error for "${clientSlug}":`,
        (err as Error).message
      );
      return NextResponse.json(
        { success: false, error: (err as Error).message },
        { status: 500 }
      );
    }
    throw err;
  }

  // -- Validate webhook secret ------------------------------------------------
  const incomingSecret = request.headers.get("x-webhook-secret");
  if (!incomingSecret || incomingSecret !== config.webhookSecret) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  // -- Parse body -------------------------------------------------------------
  let body: WebhookBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  console.log("✅ Punch card webhook received");
  console.log("📦 Body keys:", Object.keys(body));
  console.log("📦 Body:", JSON.stringify(body, null, 2));

  // ⚠️ TEMPORARY DEBUG — remove before going live
  const isDebug = new URL(request.url).searchParams.get("debug") === "true";
  if (isDebug) {
    return NextResponse.json({
      success: true,
      debug: true,
      client: clientSlug,
      receivedBody: body,
      bodyKeys: Object.keys(body),
    });
  }

  // -- Extract fields from possible payload locations -----------------------
  const contactId =
    body.customData?.contactId ||
    body.contactId ||
    body.contact_id;

  const productName =
    body.customData?.productName ||
    body.productName;

  console.log(`[GHL punch-card][${clientSlug}] Extracted contactId:`, contactId);
  console.log(`[GHL punch-card][${clientSlug}] Extracted productName:`, productName);

  if (!contactId || typeof contactId !== "string") {
    return NextResponse.json(
      { success: false, error: "Missing or invalid field: contactId (checked customData.contactId, contactId, contact_id)" },
      { status: 400 }
    );
  }
  if (!productName || typeof productName !== "string") {
    return NextResponse.json(
      { success: false, error: "Missing or invalid field: productName (checked customData.productName, productName)" },
      { status: 400 }
    );
  }

  // -- Match product rule (do NOT trust session values from webhook) ---------
  const productRule = Object.values(config.products).find(
    (p) => p.productName.toLowerCase() === productName.toLowerCase()
  );

  if (!productRule) {
    const knownProducts = Object.values(config.products)
      .map((p) => `"${p.productName}"`)
      .join(", ");
    return NextResponse.json(
      {
        success: false,
        error: `Unknown product: "${productName}". Configured products: ${knownProducts}.`,
      },
      { status: 400 }
    );
  }

  console.log(`[GHL punch-card][${clientSlug}] Matched product:`, productRule.productName);

  const { accessType, sessionsToSet, expirationDays } = productRule;
  const { apiToken, customFields: cf } = config;

  try {
    // -- Fetch current GHL contact --------------------------------------------
    const contact = await getGHLContact(contactId, apiToken);

    // -- Read previous values (balance, total, membershipType) ---------------
    const rawBalance = getCustomFieldValue(contact, cf.sessionsRemaining);
    const previousBalance = rawBalance !== null ? Number(rawBalance) : 0;

    const rawTotal = getCustomFieldValue(contact, cf.totalSessionsPurchased);
    const previousTotalPurchased = rawTotal !== null ? Number(rawTotal) : 0;

    const rawMembershipType = getCustomFieldValue(contact, cf.membershipType);
    const previousMembershipType =
      typeof rawMembershipType === "string" ? rawMembershipType : "";

    console.log(`[GHL punch-card][${clientSlug}] previousMembershipType:`, previousMembershipType);
    console.log(`[GHL punch-card][${clientSlug}] previousBalance:`, previousBalance);

    // -- Determine new balance and membership type ----------------------------
    const { newBalance, membershipType } = determineMembershipUpdate({
      purchasedProduct: { accessType, sessionsToSet },
      previousMembershipType,
      previousBalance,
    });

    const newTotalPurchased = previousTotalPurchased + sessionsToSet;
    const today = new Date();
    const membershipEndDate = formatDate(addDays(today, expirationDays));
    const lastPurchaseDate = formatDate(today);

    console.log(`[GHL punch-card][${clientSlug}] productName:`, productName);
    console.log(`[GHL punch-card][${clientSlug}] newBalance:`, newBalance, "membershipType:", membershipType);

    // -- Build and send update ------------------------------------------------
    const fieldsToUpdate: { id: string; field_value: string | number }[] = [
      { id: cf.sessionsRemaining,      field_value: newBalance },
      { id: cf.totalSessionsPurchased, field_value: newTotalPurchased },
      { id: cf.membershipType,         field_value: membershipType },
      { id: cf.membershipStatus,       field_value: "Active" },
      { id: cf.lastPurchaseDate,       field_value: lastPurchaseDate },
      { id: cf.lastProductPurchased,   field_value: productName },
      { id: cf.membershipEndDate,      field_value: membershipEndDate },
    ];

    await updateGHLContact(contactId, apiToken, fieldsToUpdate);

    console.log(
      `[GHL punch-card][${clientSlug}] Updated contact ${contactId}: ` +
        `balance set to ${newBalance}, type="${membershipType}", expires ${membershipEndDate}`
    );

    return NextResponse.json({
      success: true,
      client: config.slug,
      contactId,
      productName,
      previousMembershipType,
      previousBalance,
      newBalance,
      previousTotalPurchased,
      newTotalPurchased,
      membershipType,
      membershipStatus: "Active",
      membershipEndDate,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error.";
    console.error(`[GHL punch-card][${clientSlug}] Error:`, message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
