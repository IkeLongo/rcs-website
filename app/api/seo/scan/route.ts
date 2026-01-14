import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

import type { Severity, Issue } from "@/types/seo";

const PSI_ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const PSI_KEY = process.env.PAGESPEED_API_KEY!;

function normalizeUrlInput(input: string) {
  const trimmed = (input || "").trim();
  if (!trimmed) throw new Error("URL is required");
  if (!/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`;
  return trimmed;
}

// v1 SSRF guard (basic). Good enough for launch.
function isLikelyUnsafeTarget(urlStr: string) {
  const lower = urlStr.toLowerCase();
  return (
    lower.includes("localhost") ||
    lower.includes("127.0.0.1") ||
    lower.includes("0.0.0.0") ||
    lower.includes("169.254.") // link-local
  );
}

async function fetchWithTimeout(url: string, ms = 12000) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), ms);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: { "User-Agent": "RiverCitySEOScanner/1.0" },
    });
    return response;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error(`[SEO Scan] Fetch timeout after ${ms}ms for:`, url);
      throw new Error(`Request timeout after ${ms}ms`);
    }
    console.error("[SEO Scan] Fetch error for:", url, error.message);
    throw error;
  } finally {
    clearTimeout(t);
  }
}

function scoreToPercent(score: unknown): number | null {
  if (typeof score !== "number") return null; // Lighthouse scores are 0..1
  return Math.round(score * 100);
}

function buildIssuesFromChecks(checks: any): Issue[] {
  const issues: Issue[] = [];


  if (!checks.titleOk) issues.push({
    key: "hygiene-title",
    title: "Missing or weak title tag",
    severity: "high",
    source: "hygiene",
    why: "Optimizing your title tag helps search engines understand page relevance and improves click-through rates.",
    fix: [],
    verify: [],
  });

  if (!checks.metaDescriptionOk) issues.push({
    key: "hygiene-meta-description",
    title: "Missing meta description",
    severity: "med",
    source: "hygiene",
    why: "A clear meta description helps users understand the page before clicking and can improve search click-through rates.",
    fix: [],
    verify: [],
  });

  if (checks.noindex) issues.push({
    key: "hygiene-noindex",
    title: "Page is set to noindex",
    severity: "high",
    source: "hygiene",
    why: "Pages with 'noindex' will not appear in search results.",
    fix: [],
    verify: [],
  });

  if (!checks.canonicalOk) issues.push({
    key: "hygiene-canonical",
    title: "Missing canonical tag",
    severity: "low",
    source: "hygiene",
    why: "A canonical tag helps prevent duplicate content issues by indicating the preferred URL.",
    fix: [],
    verify: [],
  });

  if (checks.h1Count === 0) {
    issues.push({
      key: "hygiene-h1-missing",
      title: "H1 not detected in initial HTML",
      severity: "low",
      source: "hygiene",
      why: "A primary H1 helps search engines and users understand the main topic of the page.",
      fix: [],
      verify: [],
    });
  } else if (checks.h1Count > 1) {
    issues.push({
      key: "hygiene-h1-multiple",
      title: "Multiple H1 tags found",
      severity: "low",
      source: "hygiene",
      why: "Multiple H1s can confuse search engines about the main topic.",
      fix: [],
      verify: [],
    });
  }

  if (checks.imagesMissingAlt > 0) issues.push({
    key: "hygiene-images-missing-alt",
    title: `${checks.imagesMissingAlt} images missing alt text`,
    severity: "low",
    source: "hygiene",
    why: "Alt text improves accessibility and helps search engines understand images.",
    fix: [],
    verify: [],
  });

  if (!checks.robotsOk) issues.push({
    key: "hygiene-robots-txt",
    title: "robots.txt not found",
    severity: "low",
    source: "hygiene",
    why: "A valid robots.txt helps guide search engine crawlers and prevents indexing issues.",
    fix: [],
    verify: [],
  });

  if (!checks.sitemapFound) issues.push({
    key: "hygiene-sitemap-missing",
    title: "Sitemap not detected",
    severity: "low",
    source: "hygiene",
    why: "A sitemap helps search engines discover and index your pages more efficiently.",
    fix: [],
    verify: [],
  });

  return issues;
}

function msToSeconds(ms?: number) {
  if (typeof ms !== "number") return null;
  return Math.round((ms / 1000) * 10) / 10;
}

function formatAuditValue(a: any) {
  if (!a) return null;
  // many perf audits use numericValue in ms
  if (typeof a.numericValue === "number") {
    if (a.numericUnit === "millisecond") return `${msToSeconds(a.numericValue)}s`;
    if (a.numericUnit === "unitless") return `${a.numericValue}`;
    return `${Math.round(a.numericValue)}`;
  }
  return null;
}

const PSI_AUDIT_EXPLANATIONS: Record<string, string> = {
  "largest-contentful-paint":
    "Improving Largest Contentful Paint helps the main content appear faster, which improves perceived load speed and user engagement.",

  "first-contentful-paint":
    "Reducing First Contentful Paint helps users see content sooner, making the page feel faster and more responsive.",

  "cumulative-layout-shift":
    "Reducing layout shifts improves visual stability, preventing content from jumping as the page loads.",

  "total-blocking-time":
    "Reducing Total Blocking Time helps the page respond faster to user input by minimizing JavaScript blocking during load.",

  "render-blocking-resources":
    "Removing render-blocking resources allows the browser to paint content sooner, improving FCP and often LCP.",

  "unused-css-rules":
    "Removing unused CSS reduces file size and speeds up page rendering.",

  "unused-javascript":
    "Reducing unused JavaScript lowers download, parse, and execution time—improving load speed and responsiveness (often improving TBT).",

  "uses-text-compression":
    "Enabling compression (Brotli/Gzip) reduces transfer size for text assets and speeds up page load.",

  "uses-optimized-images":
    "Optimizing image sizes reduces download time, improving perceived load time and LCP.",

  "modern-image-formats":
    "Serving images in modern formats (WebP/AVIF) reduces file size while preserving quality.",

  "uses-responsive-images":
    "Serving appropriately sized images prevents unnecessary downloads and improves performance on mobile devices.",

  "efficient-animated-content":
    "Optimizing animated content reduces CPU and network usage, improving performance and battery life.",

  "server-response-time":
    "A faster initial server response (TTFB) helps the browser start rendering sooner, improving perceived speed and often improving LCP.",

  // SEO / crawl
  "is-crawlable":
    "Ensuring the page is crawlable allows search engines to properly index your content.",

  "document-title":
    "Optimizing the title tag helps search engines understand page relevance and improves click-through rates.",

  "meta-description":
    "A clear meta description helps users understand the page before clicking and can improve search click-through rates.",

  "robots-txt":
    "A valid robots.txt helps guide search engine crawlers and prevents indexing issues.",

  "canonical":
    "A canonical tag helps prevent duplicate content issues by indicating the preferred URL.",

  "viewport":
    "A proper viewport configuration ensures the page displays correctly on mobile devices.",

  "redirects":
    "Avoiding multiple redirects reduces time before the browser can start downloading and rendering the final page, improving load time and LCP.",

  "unminified-css":
    "Minifying CSS reduces file size so styles download faster, improving render speed and time-to-content.",

  "unminified-javascript":
    "Minifying JavaScript reduces transfer size and can speed up load time—especially on mobile connections.",
};

const IMPORTANT_AUDITS = [
  // performance wins
  "largest-contentful-paint",
  "first-contentful-paint",
  "cumulative-layout-shift",
  "total-blocking-time",
  "render-blocking-resources",
  "unused-css-rules",
  "unused-javascript",
  "uses-text-compression",
  "uses-optimized-images",
  "modern-image-formats",
  "uses-responsive-images",
  "efficient-animated-content",
  "server-response-time",
  // SEO / crawl
  "is-crawlable",
  "document-title",
  "meta-description",
  "robots-txt",
  "canonical",
  "viewport",
];

function extractFailedAudits(audits: any, limit = 5): Issue[] {
  return IMPORTANT_AUDITS
    .map((k) => audits[k])
    .filter(Boolean)
    .filter((a: any) => a.score !== null && a.score < 0.9)
    .slice(0, limit)
    .map((a: any) => {
      const severity: Severity = a.score < 0.5 ? "high" : "med";
      return makePsiIssue(a, severity);
    });
}

function friendlyExplanation(a: any) {
  // 1) Prefer your curated map
  const mapped = PSI_AUDIT_EXPLANATIONS[a.id];
  if (mapped) return mapped;

  // 2) Fall back to Lighthouse description, trimmed
  const desc: string | undefined = a?.description;
  if (desc && desc.length) {
    // keep it short and tool-like
    const clean = desc.replace(/\s+/g, " ").trim();
    return clean.length > 160 ? clean.slice(0, 160) + "…" : clean;
  }

  // 3) Last resort
  return "Improving this issue can enhance performance, usability, or search visibility.";
}

function extractTopOpportunities(audits: any, limit = 5): Issue[] {
  return Object.values(audits)
    .filter((a: any) => a?.details?.type === "opportunity")
    .filter((a: any) => typeof a?.details?.overallSavingsMs === "number")
    .sort((a: any, b: any) => b.details.overallSavingsMs - a.details.overallSavingsMs)
    .slice(0, limit)
    .map((a: any) => makePsiIssue(a, "high"));
}

function makePsiIssue(a: any, severity: Severity): Issue {
  const savingsMs = a?.details?.overallSavingsMs;
  const savings = typeof savingsMs === "number" ? msToSeconds(savingsMs) : null;

  const key = a.id || (a.title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return {
    key,                         // ✅ stable key
    title: `${a.title}${savings ? ` (est. ${savings}s faster)` : ""}`,
    severity,
    source: "psi",
    why: friendlyExplanation(a), // ✅ rename “fix” → “why”
    fix: [],                     // will be filled by fix library
    verify: [],
    data: {
      id: a.id,
      score: a.score,
      displayValue: a.displayValue,
      numericValue: a.numericValue,
      details: a.details,
    },
  };
}

export async function POST(req: Request) {
  try {
    console.log("[SEO Scan] Starting new scan request");
    
    if (!PSI_KEY) {
      console.error("[SEO Scan] Missing PAGESPEED_API_KEY environment variable");
      return NextResponse.json({ error: "Missing PAGESPEED_API_KEY" }, { status: 500 });
    }

    const { url: inputUrl } = await req.json();
    console.log("[SEO Scan] Input URL:", inputUrl);
    
    const url = normalizeUrlInput(inputUrl);
    console.log("[SEO Scan] Normalized URL:", url);

    if (isLikelyUnsafeTarget(url)) {
      console.warn("[SEO Scan] Blocked unsafe target:", url);
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    // 1) Fetch HTML and do quick SEO checks
    console.log("[SEO Scan] Fetching HTML...");
    const htmlRes = await fetchWithTimeout(url, 12000);
    console.log("[SEO Scan] HTML fetch status:", htmlRes.status);
    
    if (!htmlRes.ok) {
      console.error("[SEO Scan] Failed to fetch HTML:", htmlRes.status);
      return NextResponse.json(
        { error: `Could not fetch site (${htmlRes.status})` },
        { status: 400 }
      );
    }

    const html = await htmlRes.text();
    const $ = cheerio.load(html);

    const title = ($("title").first().text() || "").trim();
    const metaDescription = ($("meta[name='description']").attr("content") || "").trim();
    const canonical = ($("link[rel='canonical']").attr("href") || "").trim();
    const robotsMeta = ($("meta[name='robots']").attr("content") || "").toLowerCase();

    const h1Count = $("h1").length;

    const imagesMissingAlt = $("img").filter((_, el) => {
      const alt = ($(el).attr("alt") || "").trim();
      return alt.length === 0;
    }).length;

    const checks = {
      titleOk: title.length >= 10,
      metaDescriptionOk: metaDescription.length >= 50,
      canonicalOk: canonical.length > 0,
      h1Count,
      imagesMissingAlt,
      noindex: robotsMeta.includes("noindex"),
      robotsOk: false,
      sitemapFound: false,
      sitemapUrl: null as string | null,
    };

    // 2) robots.txt + sitemap detection
    try {
      const robotsUrl = new URL("/robots.txt", url).toString();
      const robotsRes = await fetchWithTimeout(robotsUrl, 8000);
      if (robotsRes.ok) {
        checks.robotsOk = true;
        const robotsText = await robotsRes.text();
        const sitemapLine = robotsText
          .split("\n")
          .find((l) => l.toLowerCase().startsWith("sitemap:"));
        if (sitemapLine) {
          const sitemapUrl = sitemapLine.split(":").slice(1).join(":").trim();
          if (sitemapUrl) {
            checks.sitemapFound = true;
            checks.sitemapUrl = sitemapUrl;
          }
        }
      }
    } catch {}

    if (!checks.sitemapFound) {
      for (const p of ["/sitemap.xml", "/sitemap_index.xml"]) {
        try {
          const sUrl = new URL(p, url).toString();
          const sRes = await fetchWithTimeout(sUrl, 8000);
          if (sRes.ok) {
            checks.sitemapFound = true;
            checks.sitemapUrl = sUrl;
            break;
          }
        } catch {}
      }
    }

    // 3) PageSpeed Insights / Lighthouse
    console.log("[SEO Scan] Starting PageSpeed Insights scan...");
    const psiUrl =
      `${PSI_ENDPOINT}?url=${encodeURIComponent(url)}` +
      `&key=${encodeURIComponent(PSI_KEY)}` +
      `&strategy=mobile&category=performance&category=seo&category=accessibility&category=best-practices`;

    const psiRes = await fetchWithTimeout(psiUrl, 60000);
    console.log("[SEO Scan] PSI response status:", psiRes.status);
    
    if (!psiRes.ok) {
      const errorText = await psiRes.text().catch(() => "Unable to read error");
      console.error("[SEO Scan] PSI request failed:", psiRes.status, errorText);
      return NextResponse.json({ 
        error: `PSI scan failed with status ${psiRes.status}`,
        details: errorText 
      }, { status: 502 });
    }

    const psi = await psiRes.json();

    const audits = psi?.lighthouseResult?.audits || {};

    const metrics = {
      lcp: formatAuditValue(audits["largest-contentful-paint"]),
      fcp: formatAuditValue(audits["first-contentful-paint"]),
      cls: audits["cumulative-layout-shift"]?.numericValue ?? null,
      tbt: formatAuditValue(audits["total-blocking-time"]),
      speedIndex: formatAuditValue(audits["speed-index"]),
    };
    
    // Check if PSI returned an error in the response body
    if (psi.error) {
      console.error("[SEO Scan] PSI API error:", psi.error);
      return NextResponse.json({ 
        error: "PageSpeed API error",
        details: psi.error.message || JSON.stringify(psi.error)
      }, { status: 502 });
    }
    
    console.log("[SEO Scan] PSI scan completed successfully");
    const categories = psi?.lighthouseResult?.categories;

    const scores = {
      performance: scoreToPercent(categories?.performance?.score),
      seo: scoreToPercent(categories?.seo?.score),
      accessibility: scoreToPercent(categories?.accessibility?.score),
      bestPractices: scoreToPercent(categories?.["best-practices"]?.score),
    };

    const psiOpportunities = extractTopOpportunities(audits, 4);
    const psiFailed = extractFailedAudits(audits, 4);

    const hygiene = buildIssuesFromChecks(checks).map((i) => ({
      ...i,
      source: "hygiene" as const,
    }));

    // PSI first, hygiene last
    const issues = [...psiOpportunities, ...psiFailed, ...hygiene].slice(0, 8);

    const grade =
      (scores.seo ?? 0) >= 90 && (scores.performance ?? 0) >= 80
        ? "Ready for Growth"
        : (scores.seo ?? 0) >= 80
        ? "Can Be Optimized"
        : "Needs Attention";

    console.log("[SEO Scan] Scan completed successfully for:", url);
    return NextResponse.json({
      url,
      grade,
      scores,
      metrics,
      checks,
      issues,
      psiMeta: {
        finalUrl: psi?.lighthouseResult?.finalUrl ?? null,
        fetchTime: psi?.lighthouseResult?.fetchTime ?? null,
      },
    });
  } catch (e: any) {
    console.error("[SEO Scan] Unhandled error:", e);
    console.error("[SEO Scan] Error stack:", e?.stack);
    return NextResponse.json({ 
      error: e?.message || "Error",
      details: e?.stack || "No stack trace available"
    }, { status: 500 });
  }
}
