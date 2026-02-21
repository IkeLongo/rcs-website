export const runtime = "nodejs";
import fs from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { renderToBuffer } from "@react-pdf/renderer";
import { ovhPool } from "@/app/lib/mysql";
import { enrichIssues } from "@/app/lib/seo/fixLibrary";
import crypto from "crypto";
import { getSeoReportEmailHtml } from "@/app/lib/email/getSeoReportHtml";
import { SeoReportPdf } from "@/app/lib/seo/SeoReportPdf";

import type { ResultSetHeader } from "mysql2";

type SeoLeadBody = {
  email?: string;
  firstName?: string;
  consent?: boolean;   // REQUIRED now
  source?: string;
  pageUrl?: string;
  scan?: any;
};

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v || "").trim());
}

function scoreBorder(score: number | null) {
  if (score === null) return "#e5e7eb"; // neutral gray
  if (score >= 90) return "#22c55e";    // green
  if (score >= 80) return "#facc15";    // yellow
  return "#ef4444";                     // red
}

function scoreBg(score: number | null) {
  if (score === null) return "#f9fafb";
  if (score >= 90) return "#ecfdf5";    // light green
  if (score >= 80) return "#fffbeb";    // light yellow
  return "#fef2f2";                     // light red
}

function makeToken() {
  return crypto.randomBytes(32).toString("hex"); // 64 chars
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

async function upsertNewsletterPending(opts: {
  email: string;
  firstName: string | null;
  consent: boolean;
  source: string | null;
  pageUrl: string | null;
}) {
  const { email, firstName, consent, source, pageUrl } = opts;

  // check unsub status
  const [rows] = await ovhPool.execute(
    `SELECT is_unsubscribed FROM newsletter_signups WHERE email = ? LIMIT 1`,
    [email]
  );
  const existing = (rows as any[])[0];
  const wasUnsubscribed = existing?.is_unsubscribed === 1;

  // upsert base record as pending
  await ovhPool.execute(
    `
    INSERT INTO newsletter_signups
      (email, first_name, consent_marketing, consent_at, source, page_url, brevo_status, brevo_error)
    VALUES
      (?, ?, ?, UTC_TIMESTAMP(), ?, ?, 'pending', NULL)
    ON DUPLICATE KEY UPDATE
      first_name = COALESCE(VALUES(first_name), first_name),
      consent_marketing = VALUES(consent_marketing),
      consent_at = UTC_TIMESTAMP(),
      source = COALESCE(VALUES(source), source),
      page_url = COALESCE(VALUES(page_url), page_url),
      brevo_status = 'pending',
      brevo_error = NULL,
      updated_at = CURRENT_TIMESTAMP()
    `,
    [email, firstName, consent ? 1 : 0, source, pageUrl]
  );

  // If they were unsubscribed and they are explicitly opting in again -> resubscribe locally
  if (wasUnsubscribed && consent) {
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
      [source ?? "seo-report-form", email]
    );
  }

  return { wasUnsubscribed };
}

async function subscribeToBrevo(opts: {
  email: string;
  firstName: string | null;
  listId: number;
  apiKey: string;
  wasUnsubscribed: boolean;
}) {
  const { email, firstName, listId, apiKey, wasUnsubscribed } = opts;

  // Use SOURCE attribute if you want segmentation (create in Brevo contact attributes)
  const attributes: Record<string, any> = {
    ...(firstName ? { FIRSTNAME: firstName } : {}),
    SOURCE: "seo-report",
  };

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

    return { ok: false as const, errorMsg };
  }

  const brevoId = brevoData?.id != null ? String(brevoData.id) : null;
  return { ok: true as const, brevoId };
}

export async function POST(req: Request) {
  try {
    console.log("[SEO Lead] Processing new report request");

    // Validate request payload
    const body = (await req.json()) as SeoLeadBody;

    const email = (body.email ?? "").trim().toLowerCase();
    const firstName = (body.firstName ?? "").trim() || null;
    const consent = Boolean(body.consent);
    const source = body.source ?? "seo-report-form";
    const pageUrl = body.pageUrl ?? null;
    const scan = body.scan;

    if (!isEmail(email)) {
      console.error("[SEO Lead] Invalid email provided");
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }
    if (!consent) {
      return NextResponse.json({ error: "Consent is required" }, { status: 400 });
    }
    if (!scan?.url || !scan?.scores || !Array.isArray(scan?.issues)) {
      console.error("[SEO Lead] Invalid scan data");
      return NextResponse.json({ error: "Missing scan payload" }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = Number(process.env.BREVO_LIST_ID);

    if (!apiKey || !listId) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const { wasUnsubscribed } = await upsertNewsletterPending({
      email,
      firstName,
      consent,
      source,
      pageUrl,
    });

    const brevo = await subscribeToBrevo({
      email,
      firstName,
      listId,
      apiKey,
      wasUnsubscribed,
    });

    if (!brevo.ok) {
      await ovhPool.execute(
        `UPDATE newsletter_signups SET brevo_status='failed', brevo_error=? WHERE email=?`,
        [brevo.errorMsg, email]
      );
      return NextResponse.json({ error: "Failed to subscribe. Please try again." }, { status: 502 });
    }

    await ovhPool.execute(
      `UPDATE newsletter_signups
       SET brevo_status='success', brevo_error=NULL, brevo_contact_id=COALESCE(?, brevo_contact_id)
       WHERE email=?`,
      [brevo.brevoId, email]
    );

    const trimmedEmail = email.trim();
    console.log("[SEO Lead] Processing for:", trimmedEmail, "| URL:", scan.url);

    // 1) Store lead + scan snapshot in database
    let reportToken: string | null = null;

    // 1) Store lead + scan snapshot in database
    try {
      const issuesJson = JSON.stringify(scan.issues);
      const psiMetaJson = JSON.stringify(scan.psiMeta || {});

      const [result] = await ovhPool.execute<ResultSetHeader>(
        `INSERT INTO seo_leads
          (email, url, seo_score, perf_score, best_score, a11y_score, issues_json, psi_meta_json)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          trimmedEmail,
          scan.url,
          scan.scores?.seo ?? null,
          scan.scores?.performance ?? null,
          scan.scores?.bestPractices ?? null,
          scan.scores?.accessibility ?? null,
          issuesJson,
          psiMetaJson,
        ]
      );

      const insertId = result.insertId;
      reportToken = makeToken();
      const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

      // Update row with token + expiration
      await ovhPool.execute(
        `UPDATE seo_leads
        SET report_token = ?, report_expires_at = ?
        WHERE id = ?`,
        [reportToken, expiresAt, insertId]
      );

      console.log("[SEO Lead] Saved to database with token:", reportToken);
    } catch (dbError: any) {
      console.error("[SEO Lead] Database error:", dbError);
      // Continue anyway - email is more important than storage
    }

    const reportUrl = reportToken
      ? `https://rivercitycreatives.com/reports/${reportToken}`
      : `https://rivercitycreatives.com/contact`;

    // 2) Generate PDF report
    console.log("[SEO Lead] Generating PDF report");
    const enrichedScan = { ...scan, issues: enrichIssues(scan.issues) };

    const logoDataUri = await publicFileToDataUri("logo-rivercity-creatives-horizontal-green-blue.png");
    const portraitDataUri = await publicFileToDataUri("isaac-headshot-avatar.png");

    const pdfBuffer = await renderToBuffer(
      <SeoReportPdf
        scan={enrichedScan}
        logoSrc={logoDataUri}
        portraitSrc={portraitDataUri}
        callUrl={"https://rivercitycreatives.com/booking"}
      />
    );
    console.log("[SEO Lead] PDF generated successfully");

    // 3) Send email with PDF attachment
    console.log("[SEO Lead] Sending email");
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465, // ✅ important
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
    console.log("[SEO Lead] SMTP verified OK");

    const seoBorder = scoreBorder(scan.scores?.seo ?? null);
    const seoBg = scoreBg(scan.scores?.seo ?? null);

    const perfBorder = scoreBorder(scan.scores?.performance ?? null);
    const perfBg = scoreBg(scan.scores?.performance ?? null);

    const bpBorder = scoreBorder(scan.scores?.bestPractices ?? null);
    const bpBg = scoreBg(scan.scores?.bestPractices ?? null);

    const a11yBorder = scoreBorder(scan.scores?.accessibility ?? null);
    const a11yBg = scoreBg(scan.scores?.accessibility ?? null);

    const emailHtml = getSeoReportEmailHtml({
      scan,
      reportUrl,
      seoBorder,
      seoBg,
      perfBorder,
      perfBg,
      bpBorder,
      bpBg,
      a11yBorder,
      a11yBg,
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM!,
      to: trimmedEmail,
      subject: `Your SEO Audit Results Are In — Here’s What to Fix First`,
      text: `Here's your SEO fix report for ${scan.url}. Your site scored: ${scan.grade}. See the attached PDF for detailed fixes.`,
      html: emailHtml,
      attachments: [
        {
          filename: "seo-fix-report.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    console.log("[SEO Lead] Email sent successfully to:", trimmedEmail);
    return NextResponse.json({ ok: true });

  } catch (e: any) {
    console.error("[SEO Lead] Unhandled error:", e);
    console.error("[SEO Lead] Error stack:", e?.stack);
    return NextResponse.json(
      { error: e?.message || "Failed to send report" },
      { status: 500 }
    );
  }
}
