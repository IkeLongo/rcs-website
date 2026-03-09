import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { clients } from "@/lib/analytics/clients";
import { getMonthlyReportData, getPreviousMonthRange } from "@/lib/analytics/ga-functions";
import { renderMonthlyReportEmailHtml } from "@/lib/email/get-monthly-report-email-html";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getYesterdayRange() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const fmt = (x: Date) => x.toISOString().split("T")[0];
  const y = fmt(d);
  return { startDate: y, endDate: y };
}

export async function GET(req: Request) {
  const url = new URL(req.url);

  // Query params
  const dryRun = url.searchParams.get("dryRun") === "1";
  const testEmail = url.searchParams.get("testEmail")?.trim() || null;
  const clientSlug = url.searchParams.get("client")?.trim() || null;
  const rangeMode = url.searchParams.get("range") || "prevMonth"; // "prevMonth" | "yesterday"

  const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://rivercitycreatives.com";
  const bookingUrl = `${SITE}/booking`;

  // Choose date range
  const range =
    rangeMode === "yesterday" ? getYesterdayRange() : getPreviousMonthRange();

  // Filter clients (optional)
  const selectedClients = clientSlug
    ? clients.filter((c) => slugify(c.name) === clientSlug)
    : clients;

  if (!selectedClients.length) {
    return NextResponse.json(
      {
        ok: false,
        error: clientSlug
          ? `No client found for slug '${clientSlug}'.`
          : "No clients configured.",
      },
      { status: 400 }
    );
  }

  const sent: any[] = [];
  const failed: any[] = [];

  // Loop through clients
  for (const client of selectedClients) {
    const recipients = testEmail ? [testEmail] : client.emails;

    try {
      // 1) Pull report data from GA (previous month by default)
      const report = await getMonthlyReportData(client.propertyId, range);

      // 2) Optionally skip if there is basically no data
      // (keeps you from sending empty reports early on)
      const hasAnyData =
        (report.traffic?.pageViews ?? 0) > 0 ||
        (report.ctas?.total ?? 0) > 0 ||
        (report.forms?.submitSuccessTotal ?? 0) > 0;

      if (!hasAnyData) {
        sent.push({
          client: client.name,
          propertyId: client.propertyId,
          recipients,
          range,
          status: "skipped_no_data",
        });
        continue;
      }

      // 3) Send email (unless dry run)
      if (!dryRun) {
        // Create nodemailer transporter
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST!,
          port: Number(process.env.SMTP_PORT || 587),
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: {
            user: process.env.SMTP_USER!,
            pass: process.env.SMTP_PASS!,
          },
        });

        // Generate email HTML
        const emailHtml = renderMonthlyReportEmailHtml({
          clientName: client.name,
          report,
          bookingUrl,
          websiteUrl: SITE, // optional; replace with client.websiteUrl later when you add it to clients[]
        });

        // Send email to all recipients
        await transporter.sendMail({
          from: process.env.SMTP_FROM!,
          to: recipients.join(", "),
          subject: `Monthly Website Performance Report — ${client.name}`,
          html: emailHtml,
        });
      }

      sent.push({
        client: client.name,
        propertyId: client.propertyId,
        recipients,
        range,
        status: dryRun ? "dry_run_ok" : "sent",
        diagnostics: {
          pageViews: report.traffic.pageViews,
          ctaTotal: report.ctas.total,
          ctaNotSet: report.ctas.notSet ?? 0,
          formSuccess: report.forms.submitSuccessTotal,
        },
      });
    } catch (e: any) {
      failed.push({
        client: client.name,
        propertyId: client.propertyId,
        recipients,
        range,
        error: e?.message ?? String(e),
      });
    }
  }

  return NextResponse.json({
    ok: failed.length === 0,
    dryRun,
    testEmail,
    range,
    summary: {
      selectedClients: selectedClients.map((c) => c.name),
      sent: sent.length,
      failed: failed.length,
    },
    sent,
    failed,
  });
}