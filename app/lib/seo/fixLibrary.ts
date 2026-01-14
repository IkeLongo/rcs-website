import type { Issue } from "@/types/seo";

type FixTemplate = {
  why?: string;
  fix: string[];
  verify: string[];
  platformHints?: Record<string, string[]>;
};

/**
 * KEYING RULE:
 * - Prefer Lighthouse audit IDs (a.id)
 * - Fallback keys should be normalized slugs
 */

export const FIX_LIBRARY: Record<string, FixTemplate> = {
  /* ================================
     PERFORMANCE / CORE WEB VITALS
     ================================ */

  "largest-contentful-paint": {
    fix: [
      "Identify the Largest Contentful Paint (LCP) element (usually a hero image or headline).",
      "Optimize the LCP asset (compress images, serve modern formats, reduce file size).",
      "Ensure the LCP element is not delayed by render-blocking scripts or styles.",
      "Avoid lazy-loading the LCP image.",
    ],
    verify: [
      "Re-run PageSpeed Insights and confirm LCP is under 2.5s.",
      "Check Chrome DevTools → Performance to confirm earlier paint timing.",
    ],
  },

  "first-contentful-paint": {
    fix: [
      "Reduce render-blocking CSS and JavaScript.",
      "Minimize critical CSS and defer non-essential scripts.",
      "Ensure the server responds quickly so rendering can begin sooner.",
    ],
    verify: [
      "Confirm FCP improves in PSI.",
      "Use DevTools → Performance to observe earlier first paint.",
    ],
  },

  "cumulative-layout-shift": {
    fix: [
      "Set explicit width and height for images and embedded elements.",
      "Reserve space for ads, banners, and dynamic content.",
      "Avoid injecting content above existing content during page load.",
    ],
    verify: [
      "Confirm CLS score is below 0.1 in PSI.",
      "Visually inspect page load for layout jumping.",
    ],
  },

  "total-blocking-time": {
    fix: [
      "Reduce JavaScript execution during initial page load.",
      "Split large JavaScript bundles and defer non-critical code.",
      "Limit heavy third-party scripts that block the main thread.",
    ],
    verify: [
      "Confirm Total Blocking Time drops in PSI.",
      "Check DevTools → Performance for reduced long tasks.",
    ],
  },

  "render-blocking-resources": {
    fix: [
      "Inline or preload critical CSS needed for above-the-fold content.",
      "Defer or async non-critical JavaScript files.",
      "Remove unused CSS and JS from initial load.",
    ],
    verify: [
      "Confirm render-blocking resources audit passes.",
      "Check Network waterfall for fewer blocking requests.",
    ],
  },

  /* ================================
     JAVASCRIPT / CSS OPTIMIZATION
     ================================ */

  "unused-javascript": {
    fix: [
      "Remove unused libraries and scripts that are not required for the page.",
      "Defer non-critical scripts so they load after initial render.",
      "Split JavaScript bundles so only necessary code loads per page.",
    ],
    verify: [
      "Re-run PSI and confirm unused JavaScript savings decrease.",
      "Check Chrome Coverage tab for reduced unused code.",
    ],
    platformHints: {
      "WordPress": [
        "Disable or remove unnecessary plugins.",
        "Use a performance plugin to defer or delay scripts.",
      ],
      "Shopify": [
        "Remove unused apps and theme scripts.",
        "Limit third-party tracking scripts.",
      ],
      "Custom / Next.js": [
        "Use dynamic imports and route-based code splitting.",
        "Audit third-party scripts and remove unused dependencies.",
      ],
    },
  },

  "unused-css-rules": {
    fix: [
      "Remove unused CSS rules from stylesheets.",
      "Use a build tool or purge process to strip unused styles.",
      "Avoid loading large global styles when only a subset is needed.",
    ],
    verify: [
      "Confirm CSS file sizes are smaller in DevTools.",
      "Re-run PSI and confirm unused CSS warnings are reduced.",
    ],
  },

  "unminified-css": {
    fix: [
      "Enable CSS minification in your build or hosting settings.",
      "Remove unnecessary whitespace and comments from CSS files.",
    ],
    verify: [
      "Confirm CSS file size decreases.",
      "Re-run PSI and ensure 'Minify CSS' passes.",
    ],
  },

  "unminified-javascript": {
    fix: [
      "Enable JavaScript minification in your build pipeline.",
      "Remove unnecessary comments and whitespace from JS files.",
    ],
    verify: [
      "Confirm JS bundle size decreases.",
      "Re-run PSI and ensure 'Minify JavaScript' passes.",
    ],
  },

  /* ================================
     IMAGES & MEDIA
     ================================ */

  "uses-optimized-images": {
    fix: [
      "Compress large images to reduce file size.",
      "Resize images to match their display dimensions.",
      "Avoid serving oversized images for small viewports.",
    ],
    verify: [
      "Confirm image transfer size decreases.",
      "Re-run PSI and ensure image optimization warnings are reduced.",
    ],
  },

  "modern-image-formats": {
    fix: [
      "Serve images in modern formats like WebP or AVIF.",
      "Ensure fallback formats are available for unsupported browsers.",
    ],
    verify: [
      "Check image requests in DevTools to confirm modern formats are used.",
      "Re-run PSI and ensure this audit passes.",
    ],
  },

  "uses-responsive-images": {
    fix: [
      "Use responsive image techniques (srcset / sizes).",
      "Serve different image sizes based on viewport width.",
    ],
    verify: [
      "Inspect image requests at different screen sizes.",
      "Re-run PSI and confirm responsive image warnings are resolved.",
    ],
  },

  "efficient-animated-content": {
    fix: [
      "Replace large GIFs with video formats (MP4/WebM) when possible.",
      "Reduce animation size and duration.",
    ],
    verify: [
      "Confirm animated assets are smaller and load faster.",
      "Re-run PSI and ensure animation-related audits improve.",
    ],
  },

  /* ================================
     SERVER & DELIVERY
     ================================ */

  "server-response-time": {
    fix: [
      "Enable server-side caching to reduce Time to First Byte (TTFB).",
      "Optimize backend logic and database queries.",
      "Use a CDN to reduce latency and improve delivery speed.",
    ],
    verify: [
      "Check TTFB in DevTools → Network → Timing.",
      "Re-run PSI and confirm server response time improves.",
    ],
  },

  "redirects": {
    fix: [
      "Remove unnecessary redirect chains.",
      "Update internal links to point directly to the final URL.",
      "Ensure only one redirect is used when required.",
    ],
    verify: [
      "Check Network tab to confirm fewer redirects.",
      "Re-run PSI and ensure redirect warnings are resolved.",
    ],
  },

  /* ================================
     SEO & CRAWLABILITY
     ================================ */

  "document-title": {
    fix: [
      "Add a unique and descriptive title tag for the page.",
      "Keep title length between 50–60 characters.",
      "Include primary keyword and brand name where relevant.",
    ],
    verify: [
      "View page source to confirm updated title tag.",
      "Re-run PSI or inspect page with SEO tools.",
    ],
  },

  "meta-description": {
    fix: [
      "Add a clear, compelling meta description.",
      "Keep description between 140–160 characters.",
      "Align description with page intent and content.",
    ],
    verify: [
      "View page source to confirm meta description.",
      "Check search snippets once indexed.",
    ],
  },

  "robots-txt": {
    fix: [
      "Create a valid robots.txt file if one does not exist.",
      "Ensure important pages are not blocked from crawling.",
      "Reference your sitemap within robots.txt.",
    ],
    verify: [
      "Visit /robots.txt to confirm accessibility.",
      "Use Google Search Console robots testing tools.",
    ],
  },

  "canonical": {
    fix: [
      "Add a canonical link tag to specify the preferred URL.",
      "Ensure canonical URLs are consistent across pages.",
    ],
    verify: [
      "View page source to confirm canonical tag.",
      "Check Search Console for duplicate URL signals.",
    ],
  },

  "is-crawlable": {
    fix: [
      "Ensure the page is not blocked by robots.txt or meta noindex.",
      "Verify that the page returns a 200 HTTP status code.",
    ],
    verify: [
      "Use URL Inspection in Google Search Console.",
      "Confirm page is accessible to crawlers.",
    ],
  },
};

/* ================================
   FALLBACK TEMPLATE
   ================================ */

const DEFAULT_TEMPLATE: FixTemplate = {
  fix: [
    "Review the audit details to identify the cause of this issue.",
    "Apply recommended optimizations to improve performance, usability, or SEO.",
  ],
  verify: [
    "Re-run the SEO scan and confirm this issue improves.",
  ],
};

export function enrichIssues(issues: Issue[]): Issue[] {
  return issues.map((issue) => {
    const tpl = FIX_LIBRARY[issue.key] ?? DEFAULT_TEMPLATE;

    return {
      ...issue,
      why: tpl.why ?? issue.why,
      fix: tpl.fix,
      verify: tpl.verify,
      platformHints: tpl.platformHints,
    };
  });
}

