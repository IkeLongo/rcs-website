// lib/ghl/api.ts
//
// Shared GHL API types, fetch helpers, and field-value utilities.
//
// Used by:
//   app/api/ghl/[client]/check-in/route.ts
//   app/api/ghl/[client]/members/route.ts

const GHL_BASE = "https://services.leadconnectorhq.com";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface GHLCustomFieldValue {
  id: string;
  value: string | number | null;
}

export interface GHLContact {
  id: string;
  firstName?: string;
  lastName?: string;
  /** Pre-built full name returned by GHL on some endpoints */
  name?: string;
  phone?: string;
  email?: string;
  customFields?: GHLCustomFieldValue[];
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Single-contact fetch helpers
// ---------------------------------------------------------------------------

export async function getContactById(
  contactId: string,
  apiToken: string
): Promise<GHLContact> {
  const res = await fetch(`${GHL_BASE}/contacts/${contactId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GHL getContactById failed [${res.status}]: ${text}`);
  }

  const data = await res.json();
  return (data.contact ?? data) as GHLContact;
}

export async function searchContactByPhone(
  phone: string,
  locationId: string,
  apiToken: string
): Promise<GHLContact | null> {
  const url = new URL(`${GHL_BASE}/contacts/`);
  url.searchParams.set("locationId", locationId);
  url.searchParams.set("query", phone);

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GHL searchContactByPhone failed [${res.status}]: ${text}`);
  }

  const data = await res.json();
  const contacts: GHLContact[] = data.contacts ?? [];
  return contacts.length > 0 ? contacts[0] : null;
}

export async function searchContactByEmail(
  email: string,
  locationId: string,
  apiToken: string
): Promise<GHLContact | null> {
  const url = new URL(`${GHL_BASE}/contacts/`);
  url.searchParams.set("locationId", locationId);
  url.searchParams.set("query", email);

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GHL searchContactByEmail failed [${res.status}]: ${text}`);
  }

  const data = await res.json();
  const contacts: GHLContact[] = data.contacts ?? [];
  return contacts.length > 0 ? contacts[0] : null;
}

/**
 * Returns all contacts matching the full name query.
 * Caller is responsible for handling 0, 1, or multiple results.
 */
export async function searchContactsByName(
  firstName: string,
  lastName: string,
  locationId: string,
  apiToken: string
): Promise<GHLContact[]> {
  const url = new URL(`${GHL_BASE}/contacts/`);
  url.searchParams.set("locationId", locationId);
  url.searchParams.set("query", `${firstName} ${lastName}`);

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GHL searchContactsByName failed [${res.status}]: ${text}`);
  }

  const data = await res.json();
  return (data.contacts ?? []) as GHLContact[];
}

// ---------------------------------------------------------------------------
// Bulk fetch
// ---------------------------------------------------------------------------

/**
 * Fetches all contacts for a GHL location, paginating through every page.
 *
 * GHL returns up to 100 contacts per page.  Pagination uses cursor-based
 * startAfterId — the `meta.startAfterId` from each response is passed as
 * the `startAfterId` query param on the next request.
 *
 * Safety cap: 50 pages × 100 contacts = 5 000 contacts max.
 */
export async function listAllContacts(
  locationId: string,
  apiToken: string
): Promise<GHLContact[]> {
  const PAGE_LIMIT = 100;
  const MAX_PAGES  = 50;
  const all: GHLContact[] = [];
  let startAfterId: string | null = null;
  let page = 0;

  while (page < MAX_PAGES) {
    const url = new URL(`${GHL_BASE}/contacts/`);
    url.searchParams.set("locationId", locationId);
    url.searchParams.set("limit", String(PAGE_LIMIT));
    if (startAfterId) {
      url.searchParams.set("startAfterId", startAfterId);
    }

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`GHL listAllContacts failed [${res.status}]: ${text}`);
    }

    const data = await res.json();
    const contacts: GHLContact[] = data.contacts ?? [];
    all.push(...contacts);

    // Use the cursor from meta if present; fall back to last contact ID
    const nextCursor: string | null =
      data.meta?.startAfterId ?? contacts[contacts.length - 1]?.id ?? null;

    // Stop when GHL returns fewer contacts than the limit or has no next cursor
    if (contacts.length < PAGE_LIMIT || !nextCursor) break;

    startAfterId = nextCursor;
    page++;
  }

  return all;
}

// ---------------------------------------------------------------------------
// Mutation helpers
// ---------------------------------------------------------------------------

export async function updateContactCustomFields(
  contactId: string,
  apiToken: string,
  customFields: { id: string; field_value: string | number }[]
): Promise<void> {
  const res = await fetch(`${GHL_BASE}/contacts/${contactId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ customFields }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GHL updateContactCustomFields failed [${res.status}]: ${text}`);
  }
}

export async function createContactNote(
  contactId: string,
  apiToken: string,
  body: string
): Promise<void> {
  const res = await fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GHL createContactNote failed [${res.status}]: ${text}`);
  }
}

/**
 * Wraps createContactNote with a contactId guard and explicit success/error logging.
 * Never throws — safe to call from any validation branch.
 */
export async function safeCreateContactNote(
  contactId: string | null | undefined,
  apiToken: string,
  noteBody: string
): Promise<boolean> {
  if (!contactId) {
    console.error("[safeCreateContactNote] Cannot create note: missing contactId");
    return false;
  }
  console.log("[safeCreateContactNote] Creating note", { contactId });
  try {
    await createContactNote(contactId, apiToken, noteBody);
    console.log("[safeCreateContactNote] Note created successfully", { contactId });
    return true;
  } catch (error) {
    console.error("[safeCreateContactNote] Failed to create contact note", { contactId, error });
    return false;
  }
}

// ---------------------------------------------------------------------------
// Field value helpers
// ---------------------------------------------------------------------------

export function getFieldValue(
  contact: GHLContact,
  fieldId: string
): string | number | null {
  const field = contact.customFields?.find((f) => f.id === fieldId);
  return field?.value ?? null;
}

export function safeInt(value: string | number | null, fallback = 0): number {
  if (value === null || value === "") return fallback;
  const parsed = parseInt(String(value), 10);
  return isNaN(parsed) ? fallback : parsed;
}

export function safeDate(value: string | number | null): Date | null {
  if (!value) return null;
  const d = new Date(String(value));
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Parses GHL date picker values which may be a numeric timestamp (ms),
 * a numeric string, an ISO string, or any other date string.
 */
export function parseGhlDateValue(value: unknown): Date | null {
  if (!value) return null;

  if (typeof value === "number") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;

    // Pure numeric string — treat as ms timestamp
    if (/^\d+$/.test(trimmed)) {
      const date = new Date(Number(trimmed));
      return Number.isNaN(date.getTime()) ? null : date;
    }

    const date = new Date(trimmed);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  return null;
}

/**
 * Extracts the raw YYYY-MM-DD from a GHL date-picker value without timezone
 * conversion.  GHL stores date-only fields as UTC midnight, so slicing the
 * ISO string avoids the off-by-one-day error that appears when converting to
 * America/Chicago.
 */
export function getGhlDateOnlyKey(value: unknown): string | null {
  const parsed = parseGhlDateValue(value);
  if (!parsed) return null;
  return parsed.toISOString().slice(0, 10);
}

/** Returns today's YYYY-MM-DD key in America/Chicago. */
export function getTodayCentralDateKey(now: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function formatDisplayDateTime(date: Date): string {
  const datePart = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
  const timePart = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
  return `${datePart} at ${timePart}`;
}
