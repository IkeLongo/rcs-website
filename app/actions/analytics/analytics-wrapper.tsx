// app/actions/analytics/analytics-wrapper.tsx
"use client";

import dynamic from "next/dynamic";

const Analytics = dynamic(() => import("./analytics"), { ssr: false });

export default function AnalyticsWrapper() {
  return <Analytics />;
}
