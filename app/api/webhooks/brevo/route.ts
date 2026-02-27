// /app/api/webhooks/brevo/route.ts
import { NextResponse } from "next/server";
import { ovhPool } from "@/lib/mysql"; // adjust if your path differs

type BrevoMarketingUnsubEvent = {
  event?: string;          // "unsubscribe"
  email?: string;          // recipient email
  date_event?: string;     // "YYYY-MM-DD HH:mm:ss" (local time per docs)
  ts_event?: number;       // unix seconds
  list_id?: number[];      // list IDs unsubscribed from
  // ...other fields possible
};

// Brevo can secure webhooks by sending a bearer token header (recommended)
// or you can put basic auth in the URL. Docs show both patterns. :contentReference[oaicite:1]{index=1}
function isAuthorized(req: Request) {
  const secret = process.env.BREVO_WEBHOOK_TOKEN;
  if (!secret) return false;

  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  return token === secret;
}

export async function POST(req: Request) {
  try {
    // 1) Auth (recommended)
    if (!isAuthorized(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = (await req.json()) as BrevoMarketingUnsubEvent;

    // 2) Handle only blocking events
    const event = payload.event;

    const blockingEvents = ["unsubscribe", "hard_bounce", "spam", "deleted"];

    if (!blockingEvents.includes(event ?? "")) {
      // Ignore events like opened, clicked, delivered, soft_bounce
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const email = (payload.email ?? "").trim().toLowerCase();
    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    // Determine reason based on event type
    let reason = "brevo_event";

    switch (event) {
      case "unsubscribe":
        reason = "brevo_unsubscribe";
        break;
      case "hard_bounce":
        reason = "brevo_hard_bounce";
        break;
      case "spam":
        reason = "brevo_marked_spam";
        break;
      case "deleted":
        reason = "brevo_deleted_contact";
        break;
    }

    const listIdsJson = payload.list_id
      ? JSON.stringify(payload.list_id)
      : null;

    // 3) Update existing row (or create minimal row if it doesn't exist)
    await ovhPool.execute(
      `
      INSERT INTO newsletter_signups
        (email, is_unsubscribed, unsubscribed_at, unsubscribe_reason, unsubscribe_list_ids)
      VALUES (?, 1, UTC_TIMESTAMP(), ?, CAST(? AS JSON))
      ON DUPLICATE KEY UPDATE
        is_unsubscribed = 1,
        unsubscribed_at = UTC_TIMESTAMP(),
        unsubscribe_reason = VALUES(unsubscribe_reason),
        unsubscribe_list_ids = COALESCE(VALUES(unsubscribe_list_ids), unsubscribe_list_ids),
        updated_at = CURRENT_TIMESTAMP()
      `,
      [email, reason, listIdsJson]
    );

    return NextResponse.json({ ok: true }, { status: 200 });

  } catch (err) {
    console.error("Brevo webhook error:", err);

    // Return 200 to prevent retry storms unless you specifically want retries
    return NextResponse.json({ ok: true }, { status: 200 });
  }
}