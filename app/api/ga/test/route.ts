import { getMonthlyReportData, getPreviousMonthRange, getYesterdayRange } from "@/lib/ga";

export async function GET() {
  const propertyId = process.env.GA_PROPERTY_ID!;
  const range = getYesterdayRange();

  const data = await getMonthlyReportData(propertyId, range);

  return Response.json({ ok: true, propertyId, ...data });
}