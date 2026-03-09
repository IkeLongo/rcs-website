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
     PERFORMANCE
     ================================ */

  "largest-contentful-paint": {
    fix: [
      "Make sure the main content at the top of your page (usually a large image or headline) loads quickly.",
      "Compress large images so they don’t slow down the first impression.",
      "Remove scripts that delay your page from showing important content.",
      "Avoid delaying your main image from loading immediately.",
    ],
    verify: [
      "Re-run your speed test and confirm the main content appears in under 2–3 seconds.",
      "Open your site on your phone and confirm the top section loads almost instantly.",
    ],
  },

  "first-contentful-paint": {
    fix: [
      "Reduce anything that delays your page from appearing on screen.",
      "Load non-essential features after the main content becomes visible.",
      "Improve server speed so the page begins loading right away.",
    ],
    verify: [
      "Re-run your speed test and confirm your page starts loading faster.",
      "Refresh your site and confirm it feels quicker to appear.",
    ],
  },

  "cumulative-layout-shift": {
    fix: [
      "Make sure images and sections have reserved space so the page doesn’t jump while loading.",
      "Avoid popups or banners that push content down unexpectedly.",
      "Keep your layout stable so visitors can interact comfortably.",
    ],
    verify: [
      "Reload your site and confirm nothing shifts or jumps during load.",
      "Re-run your speed test and confirm layout stability improves.",
    ],
  },

  "total-blocking-time": {
    fix: [
      "Reduce heavy scripts that slow down your site in the first few seconds.",
      "Load non-essential tools after the page becomes usable.",
      "Remove third-party tools that are not actively helping your business.",
    ],
    verify: [
      "Re-run your speed test and confirm your site responds faster.",
      "Click around your site and confirm it feels smoother.",
    ],
  },

  "render-blocking-resources": {
    fix: [
      "Make sure your page shows important content before loading extra styling or features.",
      "Delay scripts that are not required immediately.",
      "Remove unused code that slows down the first view.",
    ],
    verify: [
      "Re-run your speed test and confirm loading time improves.",
      "Confirm your page appears quickly without delay.",
    ],
  },

  /* ================================
     CODE CLEANUP
     ================================ */

  "unused-javascript": {
    fix: [
      "Remove plugins, tools, or scripts your website isn’t actively using.",
      "Only load features on pages where they’re needed.",
      "Simplify your site’s code so it runs more efficiently.",
    ],
    verify: [
      "Re-run your speed test and confirm improvement.",
      "Check that your site loads faster, especially on mobile.",
    ],
  },

  "unused-css-rules": {
    fix: [
      "Remove styling rules that aren’t being used.",
      "Clean up old design elements that are no longer needed.",
      "Avoid loading large styling files when only part of them is used.",
    ],
    verify: [
      "Re-run your speed test and confirm file size decreases.",
      "Confirm your site loads faster after cleanup.",
    ],
  },

  "unminified-css": {
    fix: [
      "Compress your styling files so they load faster.",
      "Remove extra spaces or unnecessary code from styles.",
    ],
    verify: [
      "Re-run your speed test and confirm improvement.",
    ],
  },

  "unminified-javascript": {
    fix: [
      "Compress your scripts so they load more efficiently.",
      "Remove unnecessary comments or extra code.",
    ],
    verify: [
      "Re-run your speed test and confirm faster loading.",
    ],
  },

  /* ================================
     IMAGES & MEDIA
     ================================ */

  "uses-optimized-images": {
    fix: [
      "Compress large images so they don’t slow down your site.",
      "Resize images so they match how they appear on screen.",
      "Avoid uploading oversized images.",
    ],
    verify: [
      "Re-run your speed test and confirm image-related improvements.",
      "Confirm your pages load faster on mobile.",
    ],
  },

  "modern-image-formats": {
    fix: [
      "Use newer image formats that load faster while keeping quality high.",
      "Ensure images are optimized for both speed and clarity.",
    ],
    verify: [
      "Re-run your speed test and confirm improvement.",
    ],
  },

  "uses-responsive-images": {
    fix: [
      "Serve smaller images on mobile devices and larger ones on desktop.",
      "Ensure images adjust properly to different screen sizes.",
    ],
    verify: [
      "Open your site on desktop and mobile to confirm images load appropriately.",
      "Re-run your speed test and confirm improvements.",
    ],
  },

  "efficient-animated-content": {
    fix: [
      "Replace large animated images with lightweight video formats when possible.",
      "Reduce the size or duration of animations.",
    ],
    verify: [
      "Confirm pages load faster after changes.",
      "Re-run your speed test and confirm improvement.",
    ],
  },

  /* ================================
     SERVER & DELIVERY
     ================================ */

  "server-response-time": {
    fix: [
      "Improve how quickly your hosting responds when someone visits your site.",
      "Use caching so returning visitors load pages faster.",
      "Consider upgrading hosting if performance is consistently slow.",
    ],
    verify: [
      "Re-run your speed test and confirm faster initial response time.",
      "Confirm pages begin loading quickly after clicking a link.",
    ],
  },

  "redirects": {
    fix: [
      "Remove unnecessary redirect steps before a page loads.",
      "Link directly to the final version of each page.",
    ],
    verify: [
      "Click links across your site and confirm pages open immediately.",
      "Re-run your speed test and confirm redirect warnings are gone.",
    ],
  },

  /* ================================
     SEO & CRAWLABILITY
     ================================ */

  "document-title": {
    fix: [
      "Write a clear page title that explains exactly what the page offers.",
      "Include your main service and location if relevant.",
      "Keep it concise so it displays properly in search results.",
    ],
    verify: [
      "Search your page title and confirm it appears correctly in search results.",
    ],
  },

  "meta-description": {
    fix: [
      "Add a short summary that encourages people to click your listing in search results.",
      "Clearly describe who you help and what you offer.",
    ],
    verify: [
      "Search your page and confirm the description appears properly.",
    ],
  },

  "robots-txt": {
    fix: [
      "Make sure search engines are allowed to access important pages on your site.",
      "Ensure your sitemap is referenced correctly.",
    ],
    verify: [
      "Visit /robots.txt and confirm it loads properly.",
    ],
  },

  "canonical": {
    fix: [
      "Make sure each page clearly indicates its preferred version.",
      "Avoid duplicate versions of the same content.",
    ],
    verify: [
      "Confirm search engines are indexing the correct page version.",
    ],
  },

  "is-crawlable": {
    fix: [
      "Ensure your page is accessible and not blocked from search engines.",
      "Confirm the page loads properly without errors.",
    ],
    verify: [
      "Use Google Search Console to confirm the page is indexable.",
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