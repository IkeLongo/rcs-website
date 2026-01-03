// app/robots.ts

import type { MetadataRoute } from 'next'

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rivercitycreatives.com";
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/login",
          "/dashboard",
          "/admin",
          "/admin/dashboard",
          "/api",
        ],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}