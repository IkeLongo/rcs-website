// next.config.js
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Smaller prod output + faster builds
  productionBrowserSourceMaps: false,

  // Next serves compressed responses when the platform supports it
  compress: true,

  // If you’re using styled-components/emotion/etc. leave this alone
  compiler: {
    // removeConsole reduces JS slightly (only in prod) — optional but helpful
    removeConsole: process.env.NODE_ENV === "production",
  },

  images: {
    // Prefer modern formats
    formats: ["image/avif", "image/webp"],

    // If you only serve local images, this is fine.
    // If you use remote images later, add remotePatterns.
    remotePatterns: [],

    // Helps prevent Next from generating huge variants
    // (tune based on your design breakpoints)
    deviceSizes: [360, 390, 414, 480, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Cache optimized images aggressively (CDN will respect this)
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Good for smaller bundles if you don't need Node polyfills client-side.
  // (Most App Router sites don't.)
  // If something breaks, remove this block.
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },

  async headers() {
    return [
      // Cache immutable Next static assets for 1 year
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache Next image optimizer responses (tune if you update images frequently)
      {
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
