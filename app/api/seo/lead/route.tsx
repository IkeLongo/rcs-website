export const runtime = "nodejs";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { renderToBuffer } from "@react-pdf/renderer";
import { ovhPool } from "@/app/lib/mysql";
import { enrichIssues } from "@/app/lib/seo/fixLibrary";
import crypto from "crypto";
import { getSeoReportEmailHtml } from "@/app/lib/email/getSeoReportHtml";
import { SeoReportPdf } from "@/app/lib/seo/SeoReportPdf";

import type { ResultSetHeader } from "mysql2";

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

export async function POST(req: Request) {
  try {
    console.log("[SEO Lead] Processing new report request");

    // Validate request payload
    const { email, scan } = await req.json();

    if (!isEmail(email)) {
      console.error("[SEO Lead] Invalid email provided");
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }
    if (!scan?.url || !scan?.scores || !Array.isArray(scan?.issues)) {
      console.error("[SEO Lead] Invalid scan data");
      return NextResponse.json({ error: "Missing scan payload" }, { status: 400 });
    }

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

      // Generate secure 64-char token
      reportToken = makeToken();

      // 14-day expiration
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
    const enrichedScan = {
      ...scan,
      issues: enrichIssues(scan.issues),
    };

    const pdfBuffer = await renderToBuffer(<SeoReportPdf scan={enrichedScan} />);
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
