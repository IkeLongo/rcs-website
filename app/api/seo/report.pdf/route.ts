export const runtime = "nodejs";

import React from "react";
import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { ovhPool } from "@/lib/mysql";
import { enrichIssues } from "@/lib/seo/fixLibrary";
import { SeoReportPdf } from "@/lib/seo/SeoReportPdf";

type LeadRow = {
  url: string;
  seo_score: number | null;
  perf_score: number | null;
  best_score: number | null;
  a11y_score: number | null;
  issues_json: any;
  psi_meta_json: any;
  report_expires_at: Date | string | null;
};

function safeJson<T>(v: any, fallback: T): T {
  if (v == null) return fallback;
  if (typeof v === "object") return v as T; // mysql2 may already parse JSON
  if (typeof v === "string") {
    try {
      return JSON.parse(v) as T;
    } catch {
      return fallback;
    }
  }
  return fallback;
}

function isExpired(expiresAt: LeadRow["report_expires_at"]) {
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

    const [rows] = await ovhPool.execute(
      `SELECT url, seo_score, perf_score, best_score, a11y_score,
              issues_json, psi_meta_json, report_expires_at
       FROM seo_leads
       WHERE report_token = ?
       LIMIT 1`,
      [token]
    );

    const lead = (rows as LeadRow[])[0];
    if (!lead) {
      return NextResponse.json({ error: "Invalid token" }, { status: 404 });
    }

    if (isExpired(lead.report_expires_at)) {
      return NextResponse.json({ error: "Report expired" }, { status: 410 });
    }

    const issuesRaw = safeJson<any[]>(lead.issues_json, []);
    const psiMeta = safeJson<Record<string, any>>(lead.psi_meta_json, {});

    const scan = {
      url: lead.url,
      grade: "", // optional
      scores: {
        seo: lead.seo_score,
        performance: lead.perf_score,
        bestPractices: lead.best_score,
        accessibility: lead.a11y_score,
      },
      issues: enrichIssues(Array.isArray(issuesRaw) ? issuesRaw : []),
      psiMeta,
    };

    // Use React.createElement instead of JSX in a non-React context
    const pdfBuffer = await renderToBuffer(
      // @ts-ignore
      React.createElement(SeoReportPdf, { scan })
    );

    // Convert Node.js Buffer to Uint8Array for compatibility with the Response constructor
    const pdfArray = new Uint8Array(pdfBuffer);
    
    return new Response(pdfArray, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="seo-fix-report.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (e: any) {
    console.error("[report.pdf] error:", e);
    return NextResponse.json(
      { error: e?.message || "Failed to generate report" },
      { status: 500 }
    );
  }
}
