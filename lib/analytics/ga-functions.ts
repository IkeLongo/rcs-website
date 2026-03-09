import { BetaAnalyticsDataClient } from "@google-analytics/data";

export type DateRange = { startDate: string; endDate: string };

const client = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

function assertEnv() {
  if (!process.env.GA_CLIENT_EMAIL || !process.env.GA_PRIVATE_KEY) {
    throw new Error("Missing GA_CLIENT_EMAIL or GA_PRIVATE_KEY env vars.");
  }
}

export function getPreviousMonthRange(): DateRange {
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const last = new Date(now.getFullYear(), now.getMonth(), 0);

  const fmt = (d: Date) => d.toISOString().split("T")[0];
  return { startDate: fmt(first), endDate: fmt(last) };
}

export function getYesterdayRange(): DateRange {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const fmt = (d: Date) => d.toISOString().split("T")[0];
  const day = fmt(yesterday);
  return { startDate: day, endDate: day };
}

export async function getTrafficSnapshot(propertyId: string, range: DateRange) {
  assertEnv();

  const [res] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [range],
    metrics: [{ name: "activeUsers" }, { name: "sessions" }, { name: "screenPageViews" }],
  });

  const row = res.rows?.[0];
  return {
    activeUsers: Number(row?.metricValues?.[0]?.value ?? 0),
    sessions: Number(row?.metricValues?.[1]?.value ?? 0),
    pageViews: Number(row?.metricValues?.[2]?.value ?? 0),
  };
}

/**
 * Total count of an event (e.g. "cta_click") in a date range.
 */
export async function getEventTotal(propertyId: string, range: DateRange, eventName: string) {
  assertEnv();

  const [res] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [range],
    metrics: [{ name: "eventCount" }],
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        stringFilter: { matchType: "EXACT", value: eventName },
      },
    },
  });

  return Number(res.rows?.[0]?.metricValues?.[0]?.value ?? 0);
}

/**
 * Breakdown of an event by a custom event parameter, e.g.
 * - eventName: "cta_click", paramName: "cta_id"  => dimension "customEvent:cta_id"
 * - eventName: "form_submit_success", paramName: "form_id" => "customEvent:form_id"
 *
 * Requires the parameter to be registered as a Custom Dimension in GA4.
 */
export async function getEventBreakdownByParam(
  propertyId: string,
  range: DateRange,
  eventName: string,
  paramName: string,
  limit = 20
) {
  assertEnv();

  const dimension = `customEvent:${paramName}`;

  const [res] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [range],
    dimensions: [{ name: dimension }],
    metrics: [{ name: "eventCount" }],
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        stringFilter: { matchType: "EXACT", value: eventName },
      },
    },
    orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
    limit,
  });

  return (
    res.rows?.map((r) => ({
      key: r.dimensionValues?.[0]?.value ?? "(not set)",
      count: Number(r.metricValues?.[0]?.value ?? 0),
    })) ?? []
  );
}

export async function getTopPages(propertyId: string, range: DateRange, limit = 5) {
  assertEnv();

  const [res] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [range],
    dimensions: [{ name: "pagePath" }],
    metrics: [{ name: "screenPageViews" }],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit,
  });

  return (
    res.rows?.map((r) => ({
      path: r.dimensionValues?.[0]?.value ?? "/",
      views: Number(r.metricValues?.[0]?.value ?? 0),
    })) ?? []
  );
}

/**
 * v1 report aggregator for email.
 * Keeps the surface area tiny.
 */
export async function getMonthlyReportData(propertyId: string, range = getPreviousMonthRange()) {
  const [traffic, ctaTotal, ctaById, formSuccessTotal, formSuccessById, topPages] = await Promise.all([
    getTrafficSnapshot(propertyId, range),
    getEventTotal(propertyId, range, "cta_click"),
    getEventBreakdownByParam(propertyId, range, "cta_click", "cta_id", 10),
    getEventTotal(propertyId, range, "form_submit_success"),
    getEventBreakdownByParam(propertyId, range, "form_submit_success", "form_id", 10),
    getTopPages(propertyId, range, 5),
  ]);

  // Exclude "(not set)" from leaderboard, but keep it as a diagnostic
  const ctaLeaderboard = ctaById.filter((x) => x.key && x.key !== "(not set)");
  const notSet = ctaById.find((x) => x.key === "(not set)")?.count ?? 0;
  const formLeaderboard = formSuccessById.filter((x) => x.key && x.key !== "(not set)");

  return {
    range,
    traffic,
    topPages,
    ctas: {
      total: ctaTotal,
      notSet,
      leaderboard: ctaLeaderboard,
    },
    forms: {
      submitSuccessTotal: formSuccessTotal,
      byId: formLeaderboard,
    },
  };
}