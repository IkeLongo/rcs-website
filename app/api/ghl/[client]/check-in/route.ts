import { NextRequest, NextResponse } from "next/server";
import {
  getGHLClientConfig,
  ClientNotFoundError,
  ClientConfigError,
} from "@/lib/ghl/clients";
import {
  GHLContact,
  getContactById,
  searchContactByPhone,
  searchContactByEmail,
  searchContactsByName,
  updateContactCustomFields,
  safeCreateContactNote,
  getFieldValue,
  safeInt,
  safeDate,
  parseGhlDateValue,
  getGhlDateOnlyKey,
  getTodayCentralDateKey,
  formatDisplayDateTime,
} from "@/lib/ghl/api";

export const runtime = "nodejs";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CheckInWebhookBody {
  contactId?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  source?: string;
  location?: string;
  [key: string]: unknown;
}







// ---------------------------------------------------------------------------
// Daily check-in guard
// ---------------------------------------------------------------------------

/** Returns true if the raw GHL Last Check-In Date value falls on the same calendar day
 * as today in Central Time. Compares the UTC-date portion of the GHL field directly
 * against today's Central date key to avoid UTC-midnight timezone shift errors. */
function hasCheckedInToday(rawLastCheckinDate: unknown, now: Date): boolean {
  const lastDateKey = getGhlDateOnlyKey(rawLastCheckinDate);
  const todayKey = getTodayCentralDateKey(now);

  console.log("[GHL check-in] Daily duplicate check:", {
    rawLastCheckinDate,
    lastDateKey,
    todayKey,
    alreadyCheckedInToday: lastDateKey === todayKey,
  });

  return lastDateKey === todayKey;
}

// ---------------------------------------------------------------------------
// POST /api/ghl/[client]/check-in
// ---------------------------------------------------------------------------

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ client: string }> }
) {
  const { client: clientSlug } = await params;

  // -- Restrict to maximstrong only ------------------------------------------
  if (clientSlug !== "maximstrong") {
    return NextResponse.json(
      { success: false, reason: "Check-in is not configured for this client." },
      { status: 404 }
    );
  }

  // -- Resolve client config --------------------------------------------------
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
      console.error(`[GHL check-in] Config error for "${clientSlug}":`, (err as Error).message);
      return NextResponse.json(
        { success: false, reason: "Server configuration error." },
        { status: 500 }
      );
    }
    throw err;
  }

  const { apiToken, locationId, customFields: cf } = config;


  // -- Parse body -------------------------------------------------------------
  let body: CheckInWebhookBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, reason: "Invalid JSON body." },
      { status: 400 }
    );
  }

  // Defensive location parsing.
  // Prefer checkInLocation to avoid collision with GHL's own location object.
  // Accepts: checkInLocation, gymLocation, location (string or object)
  const rawLocation =
    body.checkInLocation ||
    body.gymLocation ||
    body.location ||
    "MaximStrong Gym";
  let locationText: string;
  if (typeof rawLocation === "string") {
    locationText = rawLocation;
  } else if (rawLocation && typeof rawLocation === "object") {
    const loc = rawLocation as Record<string, unknown>;
    locationText =
      (typeof loc.name === "string" ? loc.name : "") ||
      (typeof loc.locationName === "string" ? loc.locationName : "") ||
      (typeof loc.address === "string" ? loc.address : "") ||
      "MaximStrong Gym";
  } else {
    locationText = "MaximStrong Gym";
  }

  // -- Honeypot spam guard ---------------------------------------------------
  if (body.website) {
    console.warn("[GHL check-in] Spam detected", { body });
    return NextResponse.json({ success: false, reason: "Spam detected" });
  }

  console.log(`[GHL check-in][${clientSlug}] Received`, {
    time: new Date().toISOString(),
    contactId: body.contactId ?? null,
    phone: body.phone ?? null,
    email: body.email ?? null,
    firstName: body.firstName ?? null,
    lastName: body.lastName ?? null,
    websiteHoneypot: !!body.website,
    source: body.source,
    locationText,
  });

  // -- Resolve contact -------------------------------------------------------
  // Priority: contactId → phone → email → firstName+lastName
  let contact: GHLContact | null = null;

  if (body.contactId && typeof body.contactId === "string") {
    try {
      contact = await getContactById(body.contactId, apiToken);
    } catch (err) {
      console.error(`[GHL check-in][${clientSlug}] getContactById error:`, (err as Error).message);
      return NextResponse.json(
        { success: false, reason: "Failed to fetch contact." },
        { status: 502 }
      );
    }
  } else if (body.phone && typeof body.phone === "string") {
    console.log("Lookup attempt:", { method: "phone", phone: body.phone });
    try {
      contact = await searchContactByPhone(body.phone, locationId, apiToken);
      console.log("Lookup result:", { method: "phone", found: !!contact });
    } catch (err) {
      console.error(`[GHL check-in][${clientSlug}] searchContactByPhone error:`, (err as Error).message);
      return NextResponse.json(
        { success: false, reason: "Failed to search for contact." },
        { status: 502 }
      );
    }
  } else if (body.email && typeof body.email === "string") {
    console.log("Lookup attempt:", { method: "email", email: body.email });
    try {
      contact = await searchContactByEmail(body.email, locationId, apiToken);
      console.log("Lookup result:", { method: "email", found: !!contact });
    } catch (err) {
      console.error(`[GHL check-in][${clientSlug}] searchContactByEmail error:`, (err as Error).message);
      return NextResponse.json(
        { success: false, reason: "Failed to search for contact." },
        { status: 502 }
      );
    }
  } else if (
    body.firstName && typeof body.firstName === "string" &&
    body.lastName  && typeof body.lastName  === "string"
  ) {
    const firstName = body.firstName.trim();
    const lastName  = body.lastName.trim();
    try {
      const matches = await searchContactsByName(firstName, lastName, locationId, apiToken);
      console.log("Lookup attempt:", { method: "name", firstName, lastName, matches: matches.length });

      if (matches.length === 0) {
        return NextResponse.json(
          { success: false, reason: "Contact not found" },
          { status: 200 }
        );
      }
      if (matches.length > 1) {
        return NextResponse.json(
          { success: false, reason: "Multiple matching members found" },
          { status: 200 }
        );
      }
      contact = matches[0];
    } catch (err) {
      console.error(`[GHL check-in][${clientSlug}] searchContactsByName error:`, (err as Error).message);
      return NextResponse.json(
        { success: false, reason: "Failed to search for contact." },
        { status: 502 }
      );
    }
  }

  if (!contact) {
    return NextResponse.json(
      { success: false, reason: "Contact not found" },
      { status: 200 }
    );
  }

  // resolvedContactId is always contact.id — the GHL id returned after lookup by
  // contactId OR phone. The raw body.contactId may be absent when lookup was by phone.
  const resolvedContactId = contact.id;

  console.log(`[GHL check-in][${clientSlug}] Resolved contact`, {
    rawWebhookContactId: body.contactId ?? null,
    resolvedContactId,
  });

  // -- Read custom fields ----------------------------------------------------
  const membershipStatus = String(getFieldValue(contact, cf.membershipStatus) ?? "").trim();
  const membershipType   = String(getFieldValue(contact, cf.membershipType) ?? "").trim();
  const sessionsRemaining = safeInt(getFieldValue(contact, cf.sessionsRemaining));
  const totalSessionsUsed = safeInt(getFieldValue(contact, cf.totalSessionsUsed));
  const rawLastCheckinDate  = getFieldValue(contact, cf.lastCheckinDate);
  // parseGhlDateValue handles numeric timestamps returned by GHL date picker fields
  const lastCheckinDate     = parseGhlDateValue(rawLastCheckinDate);
  const membershipEndDate   = safeDate(getFieldValue(contact, cf.membershipEndDate));

  const now = new Date();
  const nowIso = now.toISOString();

  console.log(`[GHL check-in][${clientSlug}] Contact ${resolvedContactId} fields:`, {
    membershipStatus,
    membershipType,
    sessionsRemaining,
    totalSessionsUsed,
    rawLastCheckinDate,
    lastCheckinDate: lastCheckinDate?.toISOString() ?? null,
    membershipEndDate: membershipEndDate?.toISOString() ?? null,
  });

  // -- Validation ------------------------------------------------------------

  // 1. Membership must be active
  if (membershipStatus.toLowerCase() !== "active") {
    await safeCreateContactNote(
      resolvedContactId,
      apiToken,
      buildFailedNote({
        reason: "Membership not active",
        membershipStatus,
        membershipType,
        sessionsRemaining,
        totalSessionsUsed,
        now,
        source: body.source,
      })
    );
    return NextResponse.json(
      { success: false, reason: "Membership not active" },
      { status: 200 }
    );
  }

  // 2. Membership end date must not be expired
  if (membershipEndDate && membershipEndDate < now) {
    await safeCreateContactNote(
      resolvedContactId,
      apiToken,
      buildFailedNote({
        reason: "Membership expired",
        membershipStatus,
        membershipType,
        sessionsRemaining,
        totalSessionsUsed,
        now,
        source: body.source,
        membershipEndDate,
      })
    );
    return NextResponse.json(
      { success: false, reason: "Membership expired" },
      { status: 200 }
    );
  }

  // 3. Sessions remaining must be > 0
  if (sessionsRemaining <= 0) {
    await safeCreateContactNote(
      resolvedContactId,
      apiToken,
      buildFailedNote({
        reason: "No sessions remaining",
        membershipStatus,
        membershipType,
        sessionsRemaining,
        totalSessionsUsed,
        now,
        source: body.source,
      })
    );
    return NextResponse.json(
      { success: false, reason: "No sessions remaining" },
      { status: 200 }
    );
  }

  // 4. Prevent more than one check-in per calendar day (America/Chicago)
  if (hasCheckedInToday(rawLastCheckinDate, now)) {
    console.log(`[GHL check-in][${clientSlug}] Daily limit reached`, {
      resolvedContactId,
      rawLastCheckinDate,
      lastCheckinDate: lastCheckinDate?.toISOString() ?? null,
    });

    const dailyLimitNote = buildDailyLimitNote({
      membershipType,
      sessionsRemaining,
      totalSessionsUsed,
      now,
      source: body.source,
      location: locationText,
      lastCheckinDate,
    });

    await safeCreateContactNote(resolvedContactId, apiToken, dailyLimitNote);

    return NextResponse.json(
      { success: false, reason: "Member already checked in today", contactId: resolvedContactId },
      { status: 200 }
    );
  }

  // -- Valid — apply check-in ------------------------------------------------
  const newSessionsRemaining = sessionsRemaining - 1;
  const newTotalSessionsUsed = totalSessionsUsed + 1;
  // Store ISO string so isDuplicateCheckIn can parse it reliably on the next request

  try {
    await updateContactCustomFields(resolvedContactId, apiToken, [
      { id: cf.sessionsRemaining, field_value: newSessionsRemaining },
      { id: cf.totalSessionsUsed, field_value: newTotalSessionsUsed },
      { id: cf.lastCheckinDate,   field_value: nowIso },
    ]);
    console.log(`[GHL check-in][${clientSlug}] GHL fields updated`, {
      resolvedContactId,
      sessionsRemaining: `${sessionsRemaining} → ${newSessionsRemaining}`,
      totalSessionsUsed: `${totalSessionsUsed} → ${newTotalSessionsUsed}`,
      lastCheckinDate: nowIso,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error.";
    console.error(`[GHL check-in][${clientSlug}] updateContactCustomFields error:`, message);
    return NextResponse.json(
      { success: false, reason: "Failed to update contact fields." },
      { status: 502 }
    );
  }

  await safeCreateContactNote(
    resolvedContactId,
    apiToken,
    buildSuccessNote({
      membershipType,
      sessionsRemainingBefore: sessionsRemaining,
      sessionsRemainingAfter: newSessionsRemaining,
      totalSessionsUsedBefore: totalSessionsUsed,
      totalSessionsUsedAfter: newTotalSessionsUsed,
      now,
      source: body.source,
      location: locationText,
    })
  );

  console.log(
    `[GHL check-in][${clientSlug}] Check-in success for contact ${resolvedContactId}: ` +
      `sessions ${sessionsRemaining} → ${newSessionsRemaining}, ` +
      `total used ${totalSessionsUsed} → ${newTotalSessionsUsed}`
  );

  return NextResponse.json({
    success: true,
    message: "Check-in successful",
    sessionsRemaining: newSessionsRemaining,
  });
}

// ---------------------------------------------------------------------------
// Note builders
//
// GHL Webhook payload: send { checkInLocation: "MaximStrong Gym" }
// instead of { location: "MaximStrong Gym" } to avoid GHL object collisions.
// ---------------------------------------------------------------------------

interface DailyLimitNoteParams {
  membershipType: string;
  sessionsRemaining: number;
  totalSessionsUsed: number;
  now: Date;
  source?: string;
  location?: string;
  lastCheckinDate: Date | null;
}

function buildDailyLimitNote({
  membershipType,
  sessionsRemaining,
  totalSessionsUsed,
  now,
  source,
  location,
  lastCheckinDate,
}: DailyLimitNoteParams): string {
  const lines = [
    "\u26D4 DAILY CHECK-IN ALREADY USED",
    "",
    `Date/Time: ${formatDisplayDateTime(now)}`,
    `Location: ${location ?? "MaximStrong Gym"}`,
    "Reason: Member already checked in today",
    `Membership Type: ${membershipType || "Unknown"}`,
    `Sessions Remaining: ${sessionsRemaining}`,
    `Total Sessions Used: ${totalSessionsUsed}`,
    `Source: ${source ?? "QR Check-In"}`,
  ];

  if (lastCheckinDate) {
    lines.push(`Last Check-In: ${formatDisplayDateTime(lastCheckinDate)}`);
  }

  return lines.join("\n");
}

interface SuccessNoteParams {
  membershipType: string;
  sessionsRemainingBefore: number;
  sessionsRemainingAfter: number;
  totalSessionsUsedBefore: number;
  totalSessionsUsedAfter: number;
  now: Date;
  source?: string;
  location?: string;
}

function buildSuccessNote({
  membershipType,
  sessionsRemainingBefore,
  sessionsRemainingAfter,
  totalSessionsUsedBefore,
  totalSessionsUsedAfter,
  now,
  source,
  location,
}: SuccessNoteParams): string {
  return [
    "✅ Check-In Successful",
    `Date/Time: ${formatDisplayDateTime(now)}`,  
    `Location: ${location ?? "MaximStrong Gym"}`,
    `Membership Type: ${membershipType || "Unknown"}`,
    `Sessions Remaining: ${sessionsRemainingBefore} → ${sessionsRemainingAfter}`,
    `Total Sessions Used: ${totalSessionsUsedBefore} → ${totalSessionsUsedAfter}`,
    `Source: ${source ?? "QR Check-In"}`,
  ].join("\n");
}

interface FailedNoteParams {
  reason: string;
  membershipStatus: string;
  membershipType: string;
  sessionsRemaining: number;
  totalSessionsUsed: number;
  now: Date;
  source?: string;
  membershipEndDate?: Date | null;
  lastCheckinDate?: Date | null;
}

function buildFailedNote({
  reason,
  membershipStatus,
  membershipType,
  sessionsRemaining,
  totalSessionsUsed,
  now,
  source,
  membershipEndDate,
  lastCheckinDate,
}: FailedNoteParams): string {
  const lines = [
    "❌ Check-In Failed",
    `Reason: ${reason}`,
    `Date/Time: ${formatDisplayDateTime(now)}`,
    `Membership Status: ${membershipStatus || "Unknown"}`,
    `Membership Type: ${membershipType || "Unknown"}`,
    `Sessions Remaining: ${sessionsRemaining}`,
    `Total Sessions Used: ${totalSessionsUsed}`,
    `Source: ${source ?? "QR Check-In"}`,
  ];

  if (membershipEndDate) {
    lines.push(`Membership End Date: ${formatDisplayDateTime(membershipEndDate)}`);
  }
  if (lastCheckinDate) {
    lines.push(`Last Check-In: ${formatDisplayDateTime(lastCheckinDate)}`);
  }

  return lines.join("\n");
}
