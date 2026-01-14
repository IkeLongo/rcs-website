import { NextResponse } from "next/server";

const PSI_ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url") || "https://rivercitycreatives.com";

    const key = process.env.PAGESPEED_API_KEY;
    if (!key) {
      return NextResponse.json({ ok: false, error: "Missing PAGESPEED_API_KEY" }, { status: 500 });
    }

    const psiUrl =
      `${PSI_ENDPOINT}?url=${encodeURIComponent(url)}` +
      `&key=${encodeURIComponent(key)}` +
      `&strategy=mobile&category=seo`;

    const res = await fetch(psiUrl);
    const json = await res.json();

    const hasLighthouse = Boolean(json?.lighthouseResult?.categories?.seo);

    return NextResponse.json({
      ok: res.ok && hasLighthouse,
      status: res.status,
      testedUrl: url,
      hasSeoCategory: hasLighthouse,
      fetchTime: json?.lighthouseResult?.fetchTime || null,
    }, { status: res.ok && hasLighthouse ? 200 : 502 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Error" }, { status: 500 });
  }
}
