const { withNextVideo } = require('next-video/process');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // You can place other config options here if needed
  // e.g., reactStrictMode: true,
  productionBrowserSourceMaps: true, // <-- add this
};

// Compose both wrappers
module.exports = withBundleAnalyzer(withNextVideo(nextConfig));
