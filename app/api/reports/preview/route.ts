// /app/api/reports/preview/route.ts
import { NextResponse } from "next/server";
import { clients } from "@/lib/analytics/clients";
import { getMonthlyReportData, getPreviousMonthRange, getYesterdayRange } from "@/lib/analytics/ga-functions";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const clientSlug = url.searchParams.get("client");

    const client =
      (clientSlug
        ? clients.find((c) => slugify(c.name) === clientSlug)
        : null) ?? clients[0];

    if (!client) {
      return NextResponse.json(
        { ok: false, error: "No clients configured." },
        { status: 400 }
      );
    }

    const range = getYesterdayRange();
    const data = await getMonthlyReportData(client.propertyId, range);

    return NextResponse.json({
      ok: true,
      client: {
        name: client.name,
        propertyId: client.propertyId,
        emails: client.emails,
      },
      ...data,
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}