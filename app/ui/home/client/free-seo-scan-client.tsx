
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@mui/material/Button";
import { AnimatedDotsText } from "../../components/animations/animated-dots";

import { AnimatedCircle } from "@/app/ui/components/animations/animated-circle";
import { SeoMetricsCard } from "@/app/ui/components/cards/seo-metrics-card";

import type { ScanResult, Severity } from "@/types/seo";

function isValidUrlInput(value: string) {
  const v = value.trim();
  if (!v) return false;
  return /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v) || /^https?:\/\//i.test(v);
}

function normalizeUrlForApi(value: string) {
  const v = value.trim();
  if (!/^https?:\/\//i.test(v)) return `https://${v}`;
  return v;
}

function badgeForSeverity(sev: Severity) {
  if (sev === "high") return "bg-red-100 text-red-700 border-red-200";
  if (sev === "med") return "bg-amber-100 text-amber-800 border-amber-200";
  return "bg-emerald-100 text-emerald-800 border-emerald-200";
}

function ringForScore(score: number | null) {
  if (score === null) return "ring-grey-200";
  if (score >= 90) return "ring-emerald-300";
  if (score >= 80) return "ring-amber-300";
  return "ring-red-300";
}

function ringColorHex(score: number | null) {
  if (score === null) return "#e5e7eb"; // grey-200
  if (score >= 90) return "#6ee7b7";    // emerald-300
  if (score >= 80) return "#fde68a";    // amber-300
  return "#fca5a5";                     // red-300
}

export function formatScore(score: number | null) {
  return score === null ? "—" : `${score}`;
}

// Color coding for metrics based on PageSpeed Insights thresholds
function metricColorClass(metric: string, value: string | number) {
  // Normalize value to a number
  let num: number;
  if (typeof value === 'number') {
    num = value;
  } else if (typeof value === 'string') {
    if (value === '—') return 'text-grey-500';
    num = parseFloat(value.replace('s', ''));
  } else {
    return 'text-grey-500';
  }
  if (isNaN(num)) return 'text-grey-500';
  switch (metric) {
    case 'LCP':
      if (num <= 2.5) return 'text-emerald-600';
      if (num <= 4.0) return 'text-amber-500';
      return 'text-red-600';
    case 'FCP':
      if (num <= 1.8) return 'text-emerald-600';
      if (num <= 3.0) return 'text-amber-500';
      return 'text-red-600';
    case 'CLS':
      if (num <= 0.1) return 'text-emerald-600';
      if (num <= 0.25) return 'text-amber-500';
      return 'text-red-600';
    case 'TBT':
      if (num <= 200) return 'text-emerald-600';
      if (num <= 600) return 'text-amber-500';
      return 'text-red-600';
    case 'SI':
      if (num <= 3.4) return 'text-emerald-600';
      if (num <= 5.8) return 'text-amber-500';
      return 'text-red-600';
    default:
      return 'text-grey-500';
  }
}

export default function FreeSeoScanClient() {
  const searchParams = useSearchParams();
  const autoRanRef = useRef(false);
  const inFlightRef = useRef(false);

  const initialUrlFromQuery = useMemo(() => {
    const u = searchParams.get("url");
    return u ? u : "";
  }, [searchParams]);

  const [urlInput, setUrlInput] = useState(initialUrlFromQuery);
  const [scanning, setScanning] = useState(false);
  const [scan, setScan] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [stepIdx, setStepIdx] = useState(0);

  // Email gate
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [sending, setSending] = useState(false);
  const [sentOk, setSentOk] = useState(false);
  const [expandedIssues, setExpandedIssues] = useState<Set<number>>(new Set());
  const [consentChecked, setConsentChecked] = useState(false);
  const [showConsentError, setShowConsentError] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const emailOk = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
    [email]
  );

  const toggleIssue = (idx: number) => {
    setExpandedIssues(prev => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  const steps = [
    "Checking title, meta tags, and headings…",
    "Finding robots.txt and sitemap…",
    "Running Lighthouse SEO scan…",
    "Compiling your results…",
  ];

  async function runScan(rawUrl: string) {
    if (inFlightRef.current) return; // ✅ prevent concurrent calls
    inFlightRef.current = true;

    const cleaned = rawUrl.trim();

    setError(null);
    setScan(null);
    setSentOk(false);

    if (!isValidUrlInput(cleaned)) {
      setError("Please enter a valid website URL (e.g. example.com).");
      inFlightRef.current = false;
      return;
    }

    setScanning(true);
    setStepIdx(0);

    const normalized = normalizeUrlForApi(cleaned);

    const interval = window.setInterval(() => {
      setStepIdx((i) => Math.min(i + 1, steps.length - 1));
    }, 1200);

    try {
      const res = await fetch("/api/seo/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalized }),
      });

      const json = await res.json();

      if (!res.ok) throw new Error(json?.error || "Scan failed");
      setScan(json as ScanResult);
    } catch (e: any) {
      setError(e?.message || "Something went wrong running the scan.");
    } finally {
      inFlightRef.current = false;
      window.clearInterval(interval);
      setScanning(false);
      setStepIdx(steps.length - 1);
    }
  }

  // Auto-run if url query exists
  useEffect(() => {
    if (autoRanRef.current) return;      // ✅ prevents double-run in dev
    autoRanRef.current = true;

    if (initialUrlFromQuery && isValidUrlInput(initialUrlFromQuery)) {
      runScan(initialUrlFromQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []
  );

  async function sendReport() {
    setEmailTouched(true);
    setError(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanFirstName = firstName.trim();

    if (!emailOk) return;
    if (!scan) return;

    // 🔒 Require consent (mandatory)
    if (!consentChecked) {
      setShowConsentError(true);
      return;
    }

    setShowConsentError(false);
    setSending(true);
    setSentOk(false);

    try {
      const res = await fetch("/api/seo/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          firstName: cleanFirstName ?? null, // optional but good
          consent: true,
          source: "seo-report",
          pageUrl: typeof window !== "undefined" ? window.location.href : null,
          scan,
        }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(json?.error || "Failed to send report");
      }

      setSentOk(true);
      setEmail("");
      setEmailTouched(false);
      setConsentChecked(false);
    } catch (e: any) {
      setError(e?.message || "Could not send report.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          Free SEO Scan
        </h1>
        <p className="mt-3 text-sm md:text-base !text-gray-975 max-w-2xl mx-auto">
          Scan your site in seconds. See what’s blocking growth — then get a full fix report PDF if you want it.
        </p>
      </div>

      {/* URL input */}
      <div className="mt-10 rounded-3xl border border-gray-200 bg-white shadow-sm p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-center">
          <div>
            <label className="sr-only" htmlFor="scan-url">
              Website URL
            </label>
            <input
              id="scan-url"
              type="text"
              inputMode="url"
              placeholder="example.com"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className={[
                "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 h-12 md:h-[52px]",
                "text-sm md:text-base !text-gray-950 outline-none focus:ring-2 focus:ring-navy-300",
              ].join(" ")}
            />
            <p className="!text-left mt-2 ml-2 !text-xs !text-gray-950">
              Tip: you can paste a full URL or just the domain.
            </p>
          </div>

          <div className="flex flex-col items-start justify-start h-full">
            <Button
              type="submit"
              variant="contained"
              disableElevation
              disabled={scanning}
              onClick={() => runScan(urlInput)}
              sx={{
                height: { xs: 48, md: 52 },
                px: 3,
                borderRadius: 2,
                fontWeight: 600,
                textTransform: "none",
                fontSize: { xs: "1rem", md: "1.125rem" },
                backgroundColor: "#d9e64e",
                color: "#091a33",
                boxShadow: 1,
                "&:hover": {
                  backgroundColor: "#bfee3c",
                  color: "#091a33",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#d9e64e", // your desired disabled background
                  color: "#091a33",           // your desired disabled text color
                  opacity: 0.7,                 // override default opacity if needed
                  cursor: "not-allowed",
                },
              }}
            >
              {scanning ? <AnimatedDotsText text="Scanning" className="text-navy-700" /> : "Scan My Site"}
            </Button>
          </div>
        </div>

        {/* Loading / errors */}
        {scanning ? (
          <div className="mt-5 rounded-2xl border border-grey-200 bg-grey-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm !text-gray-950">{steps[stepIdx]}</p>
              <div className="h-2 w-32 rounded-full bg-grey-200 overflow-hidden">
                <div
                  className="h-full bg-navy-500 transition-all"
                  style={{ width: `${((stepIdx + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ) : null}

        {error ? (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        ) : null}
      </div>

      {/* Results */}
      {scan ? (
        <section className="mt-10 space-y-6">
          {/* Grade */}
          <div className="rounded-3xl border border-gray-200 bg-white shadow-sm p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-col items-start justify-start">
                <p className="text-xs uppercase tracking-wide !text-gray-950 !font-maven-pro !font-bold">
                  Overall
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold !text-navy-700 !text-left md:!text-center">
                  {scan.grade}
                </h2>
                <p className="mt-2 text-sm !text-gray-950 !text-left">
                  Here are your core scores and the biggest issues we found on the homepage.
                </p>
              </div>

              <div className="flex flex-col items-start lg:items-end justify-end self-start lg:self-end">
                <p className="!text-sm !text-gray-950">Scanned</p>
                <p className="font-semibold !text-sm !text-gray-950 break-all">{scan.url}</p>
              </div>
            </div>
          </div>

          {/* Score cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "SEO", value: scan.scores.seo },
              { label: "Performance", value: scan.scores.performance },
              { label: "Best Practices", value: scan.scores.bestPractices },
              { label: "Accessibility", value: scan.scores.accessibility },
            ].map((c) => (
              <div
                key={c.label}
                className={[
                  "rounded-3xl border border-gray-200 bg-white shadow-sm p-5",
                  "ring-2",
                  ringForScore(c.value),
                ].join(" ")}
              >
                <p className="text-xs uppercase tracking-wide !text-gray-950 !font-maven-pro !font-bold">
                  {c.label}
                </p>
                <AnimatedCircle value={c.value} progressColor={ringColorHex(c.value)} formatScore={formatScore} />
                <p className="mt-2 !text-sm !text-gray-950">
                  {c.value === null
                    ? "Not available"
                    : c.value >= 90
                    ? "Strong"
                    : c.value >= 80
                    ? "Good"
                    : "Needs work"}
                </p>
              </div>
            ))}
          </div>

          {/* Metrics */}
          {scan.metrics ? (
            <SeoMetricsCard
              metrics={{
                lcp: scan.metrics.lcp ?? undefined,
                fcp: scan.metrics.fcp ?? undefined,
                cls: scan.metrics.cls ?? undefined,
                tbt: scan.metrics.tbt ?? undefined,
                speedIndex: scan.metrics.speedIndex ?? undefined,
              }}
              metricColorClass={metricColorClass}
            />
          ) : null}

          {/* Issues */}
          <div className="rounded-3xl border border-gray-200 bg-white shadow-sm p-4 md:p-6">
            <div className="flex items-end justify-between gap-4">
              <div className="flex flex-col items-start justify-start">
                <h3 className="!my-0 text-xl !text-left font-extrabold text-navy-700 !drop-shadow-none">
                  Top issues to fix
                </h3>
                <p className="mt-2 !text-left !text-gray-950">
                  Quick snippets — the PDF includes step-by-step fixes.
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              {scan.issues.map((i, idx) => {
                const isExpanded = expandedIssues.has(idx);
                return (
                  <div
                    key={`${i.key || i.title}-${idx}`}
                    className={`flex flex-col items-start justify-start -ml-2 md:ml-0 px-2 md:px-0 rounded-2xl border-none md:border-1-solid border-gray-200 overflow-hidden ${
                      isExpanded ? 'bg-gray-100' : 'bg-none md:bg-gray-50'
                    }`}
                  >
                    <div 
                      className={`w-full flex items-center justify-between gap-3 p-0 md:pr-4 md:py-2 md:pl-0 cursor-pointer transition-colors ${
                        isExpanded ? '' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => toggleIssue(idx)}
                    >
                      <div className="flex items-center gap-2 flex-1 p-2">
                        <svg
                          className={`w-5 h-5 shrink-0 text-navy-700 transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <p className="font-semibold !text-left !text-navy-700 !text-[14px] md:!text-base">
                          {i.title}
                          <span
                            className={[
                              "shrink-0 rounded-full border ml-2 px-[4px] py-[2px] text-[11px] font-semibold md:hidden",
                              badgeForSeverity(i.severity),
                            ].join(" ")}
                          >
                            {i.severity.toUpperCase()}
                          </span>
                        </p>
                      </div>
                      <span
                        className={[
                          "shrink-0 rounded-full border px-2 py-1 text-[11px] font-semibold hidden md:inline-block",
                          badgeForSeverity(i.severity),
                        ].join(" ")}
                      >
                        {i.severity.toUpperCase()}
                      </span>
                    </div>
                    {isExpanded && i.why && (
                      <div className="px-1 pb-2 md:px-4 md:pb-4">
                        <p className="mt-2 text-sm !text-left !text-gray-950 !text-[14px] md:!text-base">{i.why}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Email gate */}
          <div className="rounded-3xl border border-gray-200 bg-white shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-col items-start justify-start">
                <h3 className="!my-0 text-xl font-extrabold text-navy-700 !text-left !drop-shadow-none">
                  Want the full fix plan PDF?
                </h3>
                <p className="mt-2 text-sm !text-gray-950 !text-left">
                  Get a step-by-step report (prioritized) delivered to your inbox.
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-center">
              <div>
                <label className="sr-only" htmlFor="report-firstname">
                  First name
                </label>
                <input
                  id="report-firstname"
                  type="text"
                  autoComplete="given-name"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-2xl border bg-white px-4 py-3 h-12 md:h-[52px] text-sm md:text-base !text-gray-950 outline-none focus:ring-2 focus:ring-navy-300 border-gray-200 mb-3"
                />

                <label className="sr-only" htmlFor="report-email">
                  Email address
                </label>

                <input
                  id="report-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                  className={[
                    "w-full rounded-2xl border bg-white px-4 py-3 h-12 md:h-[52px]",
                    "text-sm md:text-base !text-gray-950 outline-none focus:ring-2 focus:ring-navy-300",
                    emailTouched && !emailOk ? "border-red-400" : "border-gray-200",
                  ].join(" ")}
                />

                {emailTouched && (!emailOk || email.trim() === "") ? (
                  <p className="mt-2 ml-2 !text-left !text-xs !text-red-600">
                    Enter a valid email.
                  </p>
                ) : (
                  <p className="mt-2 ml-2 !text-left !text-xs !text-gray-950">
                    We’ll email your report + occasional SEO tips. Unsubscribe anytime.
                  </p>
                )}

                {/* ✅ REQUIRED CONSENT (gates the report) */}
                <div className="mt-3 w-full max-w-md self-start">
                  <div className="flex items-start w-full font-avenir">
                    <input
                      id="report-consent"
                      type="checkbox"
                      checked={consentChecked}
                      onChange={(e) => {
                        setConsentChecked(e.target.checked);
                        if (e.target.checked) setShowConsentError(false);
                      }}
                      className="mt-1 mr-2 accent-lime-500"
                      required
                    />
                    <label htmlFor="report-consent" className="text-sm text-gray-700 leading-tight">
                      Send me my SEO report and subscribe me to RiverCity Creatives emails (tips + updates).
                      Unsubscribe anytime. By submitting, you agree to our{" "}
                      <a href="/privacy" className="underline hover:text-navy-700">Privacy Policy</a>{" "}
                      and{" "}
                      <a href="/terms" className="underline hover:text-navy-700">Terms of Service</a>.
                    </label>
                  </div>

                  {showConsentError && (
                    <div className="text-xs text-red-600 mt-2 w-full text-left">
                      Please check the box to receive your report.
                    </div>
                  )}

                  {submitError && (
                    <div className="text-xs text-red-600 mt-2 w-full text-left">
                      {submitError}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-start justify-start h-full">
                <Button
                  type="submit"
                  variant="contained"
                  disableElevation
                  disabled={sending}
                  onClick={(e) => {
                    // ✅ enforce consent + valid email before sending
                    e.preventDefault();
                    setEmailTouched(true);

                    if (!emailOk) return;

                    if (!consentChecked) {
                      setShowConsentError(true);
                      return;
                    }

                    setShowConsentError(false);
                    sendReport();
                  }}
                  sx={{
                    height: { xs: 48, md: 52 },
                    px: 3,
                    borderRadius: 2,
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: { xs: "1rem", md: "1.125rem" },
                    backgroundColor: "#d9e64e",
                    color: "#091a33",
                    boxShadow: 1,
                    "&:hover": {
                      backgroundColor: "#bfee3c",
                      color: "#091a33",
                    },
                    "&.Mui-disabled": {
                      backgroundColor: "#d9e64e",
                      color: "#091a33",
                      opacity: 0.7,
                      cursor: "not-allowed",
                    },
                  }}
                >
                  {sending ? (
                    <AnimatedDotsText text="Sending" className="text-navy-700" />
                  ) : (
                    "Send My Report"
                  )}
                </Button>
              </div>
            </div>

            {sentOk ? (
              <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="!text-sm !text-emerald-800">
                  Report sent! Check your inbox in a minute (and your spam folder just in case).
                </p>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}
    </section>
  );
}
