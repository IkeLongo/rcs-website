import { Tooltip } from "./tooltip-card";

// Accepts metrics and metricColorClass as props
type Metrics = {
	lcp?: string | number;
	fcp?: string | number;
	cls?: string | number;
	tbt?: string | number;
	speedIndex?: string | number;
};

interface SeoMetricsProps {
	metrics: Metrics;
	metricColorClass: (metric: string, value: string | number) => string;
}

const metricLabels: Record<string, string> = {
	LCP: "Largest Contentful Paint",
	FCP: "First Contentful Paint",
	CLS: "Cumulative Layout Shift",
	TBT: "Total Blocking Time",
	SI: "Speed Index",
};

const metricDescriptions: Record<string, string> = {
  LCP: "Largest Contentful Paint (LCP) measures how long it takes for the main content of the page to become visible. A good LCP is 2.5 seconds or less.",
  FCP: "First Contentful Paint (FCP) measures when the first text or image appears on the screen. A good FCP is 1.8 seconds or less.",
  CLS: "Cumulative Layout Shift (CLS) measures visual stability by tracking unexpected layout shifts during page load. A good CLS score is 0.1 or less.",
  TBT: "Total Blocking Time (TBT) measures how long the page is blocked by JavaScript during loading, preventing user interaction. A good TBT is 200 milliseconds or less.",
  SI: "Speed Index (SI) measures how quickly the page’s content is visually displayed during load. A good Speed Index is 3.4 seconds or less.",
};

export function SeoMetricsCard({ metrics, metricColorClass }: SeoMetricsProps) {
	if (!metrics) return null;
	return (
		<div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2 w-full">
			{[
				{ k: "LCP", v: metrics.lcp ?? "—" },
				{ k: "FCP", v: metrics.fcp ?? "—" },
				{ k: "CLS", v: metrics.cls ?? "—" },
				{ k: "TBT", v: metrics.tbt ?? "—" },
				{ k: "SI", v: metrics.speedIndex ?? "—" },
			].map((m) => (
				<div key={m.k} className="flex flex-col items-start justify-between gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2">
					<span className="tracking-wide !text-small !text-left !text-gray-950">
						<Tooltip
							containerClassName="text-avenir !font-medium"
							content={metricDescriptions[m.k] || ""}
						>
							<span className="font-maven-pro font-semibold">{metricLabels[m.k] || m.k}</span>
						</Tooltip>
					</span>
					<span className={`text-lg font-medium font-avenir ${metricColorClass(m.k, m.v)}`}>{
						m.k === "CLS" && typeof m.v === "number"
							? m.v.toFixed(3)
							: typeof m.v === "string"
								? m.v.replace(/([0-9.]+)s$/, "$1 s")
								: m.v
					}</span>
				</div>
			))}
		</div>
	);
}
