// app/api/ghl/[client]/members/route.ts
//
// GET /api/ghl/[client]/members
//
// Returns normalized gym member records for the admin dashboard.
// Example: GET /api/ghl/maximstrong/members
//
// TODO: Add authentication before exposing to production.
//       This endpoint returns all member PII for the location.

import { NextRequest, NextResponse } from "next/server";
import {
  getGHLClientConfig,
  ClientNotFoundError,
  ClientConfigError,
} from "@/lib/ghl/clients";
import {
  GHLContact,
  listAllContacts,
  getFieldValue,
  safeInt,
  parseGhlDateValue,
} from "@/lib/ghl/api";

export const runtime = "nodejs";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MemberRecord {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  membershipType?: string;
  membershipStatus?: string;
  sessionsRemaining: number;
  totalSessionsUsed: number;
  lastCheckInDate: string | null;
  lastProductPurchased: string | null;
  membershipEndDate: string | null;
  daysUntilExpiration: number | null;
  isActive: boolean;
  isExpired: boolean;
  isInactive: boolean;
  isExpiringSoon: boolean;
  isLowSessions: boolean;
  hasNoSessionsRemaining: boolean;
  isNeedsSetup: boolean;
}

// ---------------------------------------------------------------------------
// Normalization helpers
// ---------------------------------------------------------------------------

function buildName(contact: GHLContact): string {
  if (typeof contact.name === "string" && contact.name.trim()) {
    return contact.name.trim();
  }
  const parts = [contact.firstName, contact.lastName].filter(
    (p): p is string => typeof p === "string" && p.trim() !== ""
  );
  return parts.length > 0 ? parts.join(" ") : contact.id;
}

function computeDaysUntilExpiration(endDate: Date | null, now: Date): number | null {
  if (!endDate) return null;
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  return Math.ceil((endDate.getTime() - now.getTime()) / MS_PER_DAY);
}

function normalizeContact(
  contact: GHLContact,
  cf: Record<string, string>,
  now: Date
): MemberRecord {
  const rawStatus = getFieldValue(contact, cf.membershipStatus);
  const rawType   = getFieldValue(contact, cf.membershipType);

  const membershipStatusRaw =
    rawStatus !== null && rawStatus !== "" ? String(rawStatus).trim() : undefined;
  const membershipTypeRaw =
    rawType !== null && rawType !== "" ? String(rawType).trim() : undefined;

  const sessionsRemaining = safeInt(getFieldValue(contact, cf.sessionsRemaining));
  const totalSessionsUsed = safeInt(getFieldValue(contact, cf.totalSessionsUsed));

  const rawLastCheckinDate      = getFieldValue(contact, cf.lastCheckinDate);
  const rawMembershipEndDate    = getFieldValue(contact, cf.membershipEndDate);
  const rawLastProductPurchased = getFieldValue(contact, cf.lastProductPurchased);

  const lastCheckinDateObj   = parseGhlDateValue(rawLastCheckinDate);
  const membershipEndDateObj = parseGhlDateValue(rawMembershipEndDate);

  const lastCheckInDate   = lastCheckinDateObj?.toISOString() ?? null;
  const membershipEndDate = membershipEndDateObj?.toISOString() ?? null;
  const lastProductPurchased =
    rawLastProductPurchased !== null && rawLastProductPurchased !== ""
      ? String(rawLastProductPurchased)
      : null;

  // isNeedsSetup: contact is missing all meaningful membership data
  const hasMeaningfulData =
    !!membershipStatusRaw ||
    !!membershipTypeRaw ||
    !!membershipEndDate ||
    sessionsRemaining > 0 ||
    totalSessionsUsed > 0;

  const isNeedsSetup = !hasMeaningfulData;

  // Coerce display values for contacts that haven't been set up yet
  const membershipStatus = membershipStatusRaw ?? (isNeedsSetup ? "Needs Setup" : undefined);
  const membershipType   = membershipTypeRaw   ?? (isNeedsSetup ? "Unknown"     : undefined);

  const daysUntilExpiration = computeDaysUntilExpiration(membershipEndDateObj, now);

  const statusLower = (membershipStatus ?? "").toLowerCase();
  const isActive   = statusLower === "active";
  const isInactive = statusLower === "inactive";

  // isExpired: status says "Expired" OR end date has already passed
  const isExpired =
    statusLower === "expired" ||
    (membershipEndDateObj !== null && membershipEndDateObj < now);

  // isExpiringSoon: end date is set and within the next 7 days (not yet expired)
  const isExpiringSoon =
    daysUntilExpiration !== null &&
    daysUntilExpiration >= 0 &&
    daysUntilExpiration <= 7;

  const isLowSessions          = sessionsRemaining > 0 && sessionsRemaining <= 2;
  const hasNoSessionsRemaining = sessionsRemaining <= 0;

  return {
    id: contact.id,
    name: buildName(contact),
    firstName:  typeof contact.firstName === "string" ? contact.firstName : undefined,
    lastName:   typeof contact.lastName  === "string" ? contact.lastName  : undefined,
    phone:      typeof contact.phone === "string" && contact.phone ? contact.phone : undefined,
    email:      typeof contact.email === "string" && contact.email ? contact.email : undefined,
    membershipType,
    membershipStatus,
    sessionsRemaining,
    totalSessionsUsed,
    lastCheckInDate,
    lastProductPurchased,
    membershipEndDate,
    daysUntilExpiration,
    isActive,
    isExpired,
    isInactive,
    isExpiringSoon,
    isLowSessions,
    hasNoSessionsRemaining,
    isNeedsSetup,
  };
}

// ---------------------------------------------------------------------------
// GET /api/ghl/[client]/members
// ---------------------------------------------------------------------------

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ client: string }> }
) {
  const { client: clientSlug } = await params;

  // -- Access key check ------------------------------------------------------
  const expectedKey = process.env.GYM_DASHBOARD_ACCESS_KEY;
  const providedKey = _request.nextUrl.searchParams.get("key");

  if (!expectedKey || !providedKey || providedKey !== expectedKey) {
    return NextResponse.json({ success: false, reason: "Unauthorized" }, { status: 401 });
  }

  // -- Validate client -------------------------------------------------------
  let config: ReturnType<typeof getGHLClientConfig>;
  try {
    config = getGHLClientConfig(clientSlug);
  } catch (err) {
    if (err instanceof ClientNotFoundError) {
      return NextResponse.json(
        { success: false, reason: (err as Error).message },
        { status: 404 }
      );
    }
    if (err instanceof ClientConfigError) {
      console.error(`[GHL members][${clientSlug}] Config error:`, (err as Error).message);
      return NextResponse.json(
        { success: false, reason: "Server configuration error." },
        { status: 500 }
      );
    }
    throw err;
  }

  const { apiToken, locationId, customFields: cf } = config;

  // -- Fetch all contacts ----------------------------------------------------
  let contacts: GHLContact[];
  try {
    contacts = await listAllContacts(locationId, apiToken);
  } catch (err) {
    console.error(`[GHL members][${clientSlug}] listAllContacts error:`, (err as Error).message);
    return NextResponse.json(
      { success: false, reason: "Failed to fetch contacts from GHL." },
      { status: 502 }
    );
  }

  console.log(`[GHL members][${clientSlug}] Fetched ${contacts.length} total contacts`);

  // -- Normalize + filter ----------------------------------------------------
  const now = new Date();

  const members: MemberRecord[] = contacts.map((c) => normalizeContact(c, cf, now));

  // -- Build summary ---------------------------------------------------------
  const summary = {
    totalContacts:        members.length,
    totalMembers:         members.filter((m) => !m.isNeedsSetup).length,
    activeMembers:        members.filter((m) => m.isActive).length,
    expiredMembers:       members.filter((m) => m.isExpired).length,
    inactiveMembers:      members.filter((m) => m.isInactive).length,
    expiringSoon:         members.filter((m) => m.isExpiringSoon).length,
    lowSessions:          members.filter((m) => m.isLowSessions).length,
    noSessionsRemaining:  members.filter((m) => m.hasNoSessionsRemaining).length,
    needsSetup:           members.filter((m) => m.isNeedsSetup).length,
  };

  console.log(`[GHL members][${clientSlug}] Returning ${members.length} member records`, summary);

  return NextResponse.json({ success: true, members, summary });
}
