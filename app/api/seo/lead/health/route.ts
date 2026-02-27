import { NextResponse } from "next/server";
import { ovhPool } from "@/lib/mysql";

export async function GET() {
  const email = "healthcheck@rivercity.local";
  const url = "https://example.com/healthcheck";

  try {
    // ping
    await ovhPool.query("SELECT 1");

    // insert
    const [insertResult]: any = await ovhPool.execute(
      `INSERT INTO seo_leads (email, url) VALUES (?, ?)`,
      [email, url]
    );
    const insertedId = insertResult?.insertId;

    // read back
    const [rows]: any = await ovhPool.execute(
      `SELECT id, email, url, created_at FROM seo_leads WHERE id = ? LIMIT 1`,
      [insertedId]
    );

    return NextResponse.json({
      ok: true,
      insertedId,
      row: rows?.[0] || null,
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "DB health check failed" },
      { status: 500 }
    );
  }
}
