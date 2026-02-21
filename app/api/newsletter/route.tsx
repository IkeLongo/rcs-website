// /app/api/newsletter/route.ts
export const runtime = "nodejs";
import fs from "node:fs/promises";
import path from "node:path";

import nodemailer from "nodemailer";
import { renderToBuffer } from "@react-pdf/renderer";
import { WebsiteRevenueChecklistPdf } from "@/app/lib/pdfs/WebsiteRevenueChecklistPdf";
import { getWebsiteRevenueChecklistEmailHtml } from "@/app/lib/email/getWebsiteRevenueChecklistEmailHtml";
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

async function publicFileToDataUri(publicRelativePath: string) {
  // publicRelativePath example: "logo-rivercity-creatives-horizontal-green-blue.png"
  const filePath = path.join(process.cwd(), "public", publicRelativePath);

  const buf = await fs.readFile(filePath);

  // minimal mime mapping
  const ext = path.extname(publicRelativePath).toLowerCase();
  const mime =
    ext === ".png" ? "image/png" :
    ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" :
    ext === ".webp" ? "image/webp" :
    "application/octet-stream";

  return `data:${mime};base64,${buf.toString("base64")}`;
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

    // 6) Send checklist email + attach PDF (after Brevo success)
    try {
      const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://rivercitycreatives.com";

      // If you don’t collect websiteUrl yet, you can use pageUrl or default to your domain.
      // Strong recommendation: add `websiteUrl` to the body later (but you said don’t alter current code).
      const websiteUrl = pageUrl || SITE;

      // Create a hosted URL to the checklist (optional) AND attach the PDF
      const checklistUrl = `${SITE}/founder-website-revenue-checklist`; // or wherever you host it
      const bookingUrl = `${SITE}/booking`;

      // Build assets as data URIs (safe for react-pdf render on server)
      const logoDataUri = await publicFileToDataUri(
        "logo-rivercity-creatives-horizontal-green-blue.png"
      );
      const portraitDataUri = await publicFileToDataUri("isaac-headshot-avatar.png");

      // Generate PDF buffer
      const pdfBuffer = await renderToBuffer(
        <WebsiteRevenueChecklistPdf
          websiteUrl={websiteUrl}
          siteUrl={SITE}
          callUrl={bookingUrl}
          logoSrc={logoDataUri}
          portraitSrc={portraitDataUri}
        />
      );

      // Create transporter (same config as SEO route)
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST!,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER!,
          pass: process.env.SMTP_PASS!,
        },
        logger: true,
        debug: true,
        connectionTimeout: 20_000,
        greetingTimeout: 20_000,
        socketTimeout: 20_000,
      });

      await transporter.verify();

      const emailHtml = getWebsiteRevenueChecklistEmailHtml({
        websiteUrl,
        checklistUrl,
        bookingUrl,
        firstName: firstName || undefined,
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM!,
        to: email,
        subject: "Your Founder Website Revenue Checklist (PDF)",
        text: `Here’s your Website Revenue Checklist for ${websiteUrl}. (PDF attached)`,
        html: emailHtml,
        attachments: [
          {
            filename: "founder-website-revenue-checklist.pdf",
            content: pdfBuffer,
            contentType: "application/pdf",
          },
        ],
      });
    } catch (mailErr: any) {
      console.error("Checklist email send error:", mailErr);

      // Optional: store delivery failure (does NOT block signup)
      await ovhPool.execute(
        `UPDATE newsletter_signups SET last_checklist_error=?, updated_at=CURRENT_TIMESTAMP() WHERE email=?`,
        [mailErr?.message || "Checklist email failed", email]
      );
    }

    return NextResponse.json({ success: true, resubscribed: wasUnsubscribed }, { status: 200 });
  } catch (err) {
    console.error("Newsletter API error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}