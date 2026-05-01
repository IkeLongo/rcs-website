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
  contactId: string;
  productName: string;
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

  if (process.env.NODE_ENV === "development") {
    console.log(`[GHL punch-card][${clientSlug}] Incoming payload:`, body);
  }

  const { contactId, productName } = body;

  if (!contactId || typeof contactId !== "string") {
    return NextResponse.json(
      { success: false, error: "Missing or invalid field: contactId" },
      { status: 400 }
    );
  }
  if (!productName || typeof productName !== "string") {
    return NextResponse.json(
      { success: false, error: "Missing or invalid field: productName" },
      { status: 400 }
    );
  }

  // -- Match product rule (do NOT trust sessionsToAdd from webhook) -----------
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

  const { sessionsToAdd, membershipType, membershipStatus, expirationDays } =
    productRule;

  const { apiToken, customFields: cf } = config;

  try {
    // -- Fetch current GHL contact --------------------------------------------
    const contact = await getGHLContact(contactId, apiToken);

    // -- Read current field values --------------------------------------------
    const rawBalance = getCustomFieldValue(contact, cf.sessionsRemaining);
    const previousBalance = rawBalance !== null ? Number(rawBalance) : 0;

    const rawTotal = getCustomFieldValue(contact, cf.totalSessionsPurchased);
    const previousTotalPurchased = rawTotal !== null ? Number(rawTotal) : 0;

    // -- Calculate new values -------------------------------------------------
    const newBalance = previousBalance + sessionsToAdd;
    const newTotalPurchased = previousTotalPurchased + sessionsToAdd;
    const today = new Date();
    const membershipEndDate = formatDate(addDays(today, expirationDays));
    const lastPurchaseDate = formatDate(today);

    // -- Build and send update ------------------------------------------------
    const fieldsToUpdate: { id: string; field_value: string | number }[] = [
      { id: cf.sessionsRemaining,      field_value: newBalance },
      { id: cf.totalSessionsPurchased, field_value: newTotalPurchased },
      { id: cf.membershipType,         field_value: membershipType },
      { id: cf.membershipStatus,       field_value: membershipStatus },
      { id: cf.lastPurchaseDate,       field_value: lastPurchaseDate },
      { id: cf.lastProductPurchased,   field_value: productName },
      { id: cf.membershipEndDate,      field_value: membershipEndDate },
    ];

    await updateGHLContact(contactId, apiToken, fieldsToUpdate);

    console.log(
      `[GHL punch-card][${clientSlug}] Updated contact ${contactId}: ` +
        `${previousBalance} + ${sessionsToAdd} = ${newBalance} sessions`
    );

    return NextResponse.json({
      success: true,
      client: config.slug,
      contactId,
      productName,
      previousBalance,
      sessionsAdded: sessionsToAdd,
      newBalance,
      newTotalPurchased,
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
