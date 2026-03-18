export const runtime = "nodejs";

import React from "react";
import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { ovhPool } from "@/lib/db/mysql";
import { WebsiteRevenueChecklistPdf } from "@/lib/pdfs/website-revenue-checklist-pdf";

function safeJson<T>(v: any, fallback: T): T {
  if (v == null) return fallback;
  if (typeof v === "object") return v as T;
  if (typeof v === "string") {
    try {
      return JSON.parse(v) as T;
    } catch {
      return fallback;
    }
  }
  return fallback;
}

function isExpired(expiresAt: Date | string | null) {
  if (!expiresAt) return false;
  const d = expiresAt instanceof Date ? expiresAt : new Date(expiresAt);
  const t = d.getTime();
  return Number.isFinite(t) ? t < Date.now() : false;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = (searchParams.get("token") || "").trim();

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    // Fetch the lead/checklist info from DB (adjust table/fields as needed)
    const [rows] = await ovhPool.execute(
      `SELECT first_name, report_expires_at
       FROM newsletter_signups
       WHERE report_token = ?
       LIMIT 1`,
      [token]
    );

    const lead = (rows as any[])[0];
    if (!lead) {
      return NextResponse.json({ error: "Invalid token" }, { status: 404 });
    }

    if (isExpired(lead.report_expires_at)) {
      return NextResponse.json({ error: "Report expired" }, { status: 410 });
    }

    // Prepare props for WebsiteRevenueChecklistPdf
    const websiteUrl = lead.website_url || "";
    const businessName = lead.business_name || undefined;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || undefined;
    // Optionally, you could fetch logoSrc/portraitSrc from config or use defaults in the PDF component
    const logoSrc = undefined;
    const portraitSrc = undefined;
    const callUrl = siteUrl ? `${siteUrl}/booking` : undefined;

    // Use React.createElement instead of JSX in a non-React context
    const pdfBuffer = await renderToBuffer(
      // @ts-ignore
      React.createElement(WebsiteRevenueChecklistPdf, {
        websiteUrl,
        siteUrl,
        logoSrc,
        portraitSrc,
        callUrl,
        businessName,
      })
    );

    // Convert Node.js Buffer to Uint8Array for compatibility with the Response constructor
    const pdfArray = new Uint8Array(pdfBuffer);

    return new Response(pdfArray, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=\"website-revenue-checklist.pdf\"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (e: any) {
    console.error("[newsletter/report.pdf] error:", e);
    return NextResponse.json(
      { error: e?.message || "Failed to generate report" },
      { status: 500 }
    );
  }
}
