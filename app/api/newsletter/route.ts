// /app/api/newsletter/route.ts
import { NextResponse } from "next/server";
import { ovhPool } from "@/app/lib/mysql";

type NewsletterBody = {
  email?: string;
  firstName?: string;
  consent?: boolean;
  source?: string;
  pageUrl?: string;
};

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v || "").trim());
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as NewsletterBody;

    const email = (body.email ?? "").trim().toLowerCase();
    const firstName = (body.firstName ?? "").trim() || null;
    const consent = Boolean(body.consent);
    const source = body.source ?? null;
    const pageUrl = body.pageUrl ?? null;

    if (!isEmail(email) || !firstName) {
      return NextResponse.json(
        { error: "Valid email and first name are required" },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json({ error: "Consent is required" }, { status: 400 });
    }

    // 0) Check if email is currently unsubscribed locally
    const [rows] = await ovhPool.execute(
      `SELECT is_unsubscribed FROM newsletter_signups WHERE email = ? LIMIT 1`,
      [email]
    );
    const existing = (rows as any[])[0];
    const wasUnsubscribed = existing?.is_unsubscribed === 1;

    // 1) Upsert basic signup details + mark brevo sync pending
    await ovhPool.execute(
      `
      INSERT INTO newsletter_signups
        (email, first_name, consent_marketing, consent_at, source, page_url, brevo_status, brevo_error)
      VALUES
        (?, ?, 1, UTC_TIMESTAMP(), ?, ?, 'pending', NULL)
      ON DUPLICATE KEY UPDATE
        first_name = VALUES(first_name),
        consent_marketing = 1,
        consent_at = UTC_TIMESTAMP(),
        source = COALESCE(VALUES(source), source),
        page_url = COALESCE(VALUES(page_url), page_url),
        brevo_status = 'pending',
        brevo_error = NULL,
        updated_at = CURRENT_TIMESTAMP()
      `,
      [email, firstName, source, pageUrl]
    );

    // 2) Brevo config
    const apiKey = process.env.BREVO_API_KEY;
    const listId = Number(process.env.BREVO_LIST_ID);

    if (!apiKey || !listId) {
      await ovhPool.execute(
        `UPDATE newsletter_signups SET brevo_status='failed', brevo_error=? WHERE email=?`,
        ["Missing BREVO env vars", email]
      );
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // 3) Brevo call
    const attributes = { FIRSTNAME: firstName, SOURCE: source ?? "unknown" };

    const brevoRes = wasUnsubscribed
      ? await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", "api-key": apiKey },
          body: JSON.stringify({
            attributes,
            emailBlacklisted: false,
            listIds: [listId],
          }),
        })
      : await fetch("https://api.brevo.com/v3/contacts", {
          method: "POST",
          headers: { "Content-Type": "application/json", "api-key": apiKey },
          body: JSON.stringify({
            email,
            attributes,
            listIds: [listId],
            updateEnabled: true,
          }),
        });

    const brevoData = await brevoRes.json().catch(() => ({}));

    if (!brevoRes.ok) {
      const errorMsg =
        brevoData?.message ||
        brevoData?.error ||
        JSON.stringify(brevoData) ||
        "Brevo request failed";

      await ovhPool.execute(
        `UPDATE newsletter_signups SET brevo_status='failed', brevo_error=? WHERE email=?`,
        [errorMsg, email]
      );

      return NextResponse.json({ error: "Failed to subscribe" }, { status: 502 });
    }

    // 4) If previously unsubscribed, flip local flags ONLY after Brevo success
    if (wasUnsubscribed) {
      await ovhPool.execute(
        `
        UPDATE newsletter_signups
        SET is_unsubscribed = 0,
            unsubscribed_at = NULL,
            unsubscribe_reason = NULL,
            resubscribed_at = UTC_TIMESTAMP(),
            resubscribe_source = COALESCE(?, resubscribe_source),
            updated_at = CURRENT_TIMESTAMP()
        WHERE email = ?
        `,
        [source ?? "modal", email]
      );
    }

    // 5) Store contact id if returned (create endpoint often returns it)
    const brevoId = brevoData?.id != null ? String(brevoData.id) : null;

    await ovhPool.execute(
      `
      UPDATE newsletter_signups
      SET brevo_status='success',
          brevo_error=NULL,
          brevo_contact_id=COALESCE(?, brevo_contact_id),
          updated_at = CURRENT_TIMESTAMP()
      WHERE email=?
      `,
      [brevoId, email]
    );

    return NextResponse.json({ success: true, resubscribed: wasUnsubscribed }, { status: 200 });
  } catch (err) {
    console.error("Newsletter API error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}