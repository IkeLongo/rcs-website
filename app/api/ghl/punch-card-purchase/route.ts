import { NextResponse } from "next/server";

export const runtime = "nodejs";

// ---------------------------------------------------------------------------
// Replace these values with your real GHL custom field IDs.
// Find them in GHL → Settings → Custom Fields, or via the GHL API:
//   GET https://services.leadconnectorhq.com/locations/{locationId}/customFields
// ---------------------------------------------------------------------------
const CUSTOM_FIELD_IDS = {
  sessions_remaining:       "REPLACE_WITH_FIELD_ID",
  total_sessions_purchased: "REPLACE_WITH_FIELD_ID",
  membership_type:          "REPLACE_WITH_FIELD_ID",
  membership_status:        "REPLACE_WITH_FIELD_ID",
  last_purchase_date:       "REPLACE_WITH_FIELD_ID",
  last_product_purchased:   "REPLACE_WITH_FIELD_ID",
} as const;

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
  sessionsToAdd: number;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// GHL API helpers
// ---------------------------------------------------------------------------

/**
 * Fetch a GHL contact by ID using the Private Integration Token.
 */
async function getGHLContact(contactId: string): Promise<GHLContact> {
  const res = await fetch(
    `https://services.leadconnectorhq.com/contacts/${contactId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.GHL_PRIVATE_INTEGRATION_TOKEN!}`,
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
  // GHL wraps the contact under a "contact" key
  return (data.contact ?? data) as GHLContact;
}

/**
 * Update custom fields on a GHL contact.
 * `customFields` should be an array of { id, field_value } objects.
 */
async function updateGHLContact(
  contactId: string,
  customFields: { id: string; field_value: string | number }[]
): Promise<void> {
  const res = await fetch(
    `https://services.leadconnectorhq.com/contacts/${contactId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${process.env.GHL_PRIVATE_INTEGRATION_TOKEN!}`,
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

/**
 * Read a custom field value from a GHL contact object by field ID.
 * Returns null if the field is not present.
 */
function getCustomFieldValue(
  contact: GHLContact,
  fieldId: string
): string | number | null {
  const field = contact.customFields?.find((f) => f.id === fieldId);
  return field?.value ?? null;
}

/**
 * Build the customFields array expected by the GHL update endpoint.
 */
function buildCustomFieldsUpdate(
  values: Record<string, string | number>
): { id: string; field_value: string | number }[] {
  return Object.entries(values).map(([id, field_value]) => ({
    id,
    field_value,
  }));
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(request: Request): Promise<NextResponse> {
  // 1. Validate shared secret
  const incomingSecret = request.headers.get("x-webhook-secret");
  if (!incomingSecret || incomingSecret !== process.env.GHL_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 2. Parse body
    const body: WebhookBody = await request.json();
    console.log("[GHL Punch Card] Incoming payload:", body);

    // 3. Validate required fields
    const { contactId, productName, sessionsToAdd } = body;

    if (!contactId || typeof contactId !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid field: contactId" },
        { status: 400 }
      );
    }
    if (!productName || typeof productName !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid field: productName" },
        { status: 400 }
      );
    }
    if (sessionsToAdd == null || typeof sessionsToAdd !== "number" || sessionsToAdd <= 0) {
      return NextResponse.json(
        { error: "Missing or invalid field: sessionsToAdd (must be a positive number)" },
        { status: 400 }
      );
    }

    // 4. Fetch current GHL contact
    const contact = await getGHLContact(contactId);

    // 5. Read current session balance
    const rawBalance = getCustomFieldValue(
      contact,
      CUSTOM_FIELD_IDS.sessions_remaining
    );
    const previousBalance = rawBalance !== null ? Number(rawBalance) : 0;

    // 6. Read current total purchased (to accumulate)
    const rawTotal = getCustomFieldValue(
      contact,
      CUSTOM_FIELD_IDS.total_sessions_purchased
    );
    const previousTotal = rawTotal !== null ? Number(rawTotal) : 0;

    // 7. Calculate new values
    const newBalance = previousBalance + sessionsToAdd;
    const newTotal = previousTotal + sessionsToAdd;
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    // 8. Build and send the update
    const fieldsToUpdate = buildCustomFieldsUpdate({
      [CUSTOM_FIELD_IDS.sessions_remaining]:       newBalance,
      [CUSTOM_FIELD_IDS.total_sessions_purchased]: newTotal,
      [CUSTOM_FIELD_IDS.membership_type]:          "Punch Card",
      [CUSTOM_FIELD_IDS.membership_status]:        "Active",
      [CUSTOM_FIELD_IDS.last_purchase_date]:       today,
      [CUSTOM_FIELD_IDS.last_product_purchased]:   productName,
    });

    await updateGHLContact(contactId, fieldsToUpdate);

    console.log(
      `[GHL Punch Card] Updated contact ${contactId}: ${previousBalance} + ${sessionsToAdd} = ${newBalance} sessions`
    );

    // 9. Return success response
    return NextResponse.json({
      success: true,
      contactId,
      previousBalance,
      sessionsAdded: sessionsToAdd,
      newBalance,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[GHL Punch Card] Error:", message);
    return NextResponse.json(
      { error: "Internal server error", details: message },
      { status: 500 }
    );
  }
}
