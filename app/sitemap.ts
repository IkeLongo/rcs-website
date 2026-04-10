// app/sitemap.ts

import { MetadataRoute } from "next";
import { client } from "../sanity-studio/lib/client";
import { locations } from "@/app/data/locations";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rivercitycreatives.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  // Fetch all published blog post slugs from Sanity
  let blogSlugs: string[] = [];
  try {
    const posts = await client.fetch(
      `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`
    );
    blogSlugs = posts.map((post: { slug: string }) => post.slug);
  } catch (e) {
    blogSlugs = [];
  }

  const baseRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE}/booking`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.9,
    },
    {
      url: `${SITE}/newsletter`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE}/free-seo-scan`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE}/learn`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE}/services`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/services/web-design-development`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/services/branding-visual-identity`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/services/lead-capture-growth-systems`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/service-areas`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE}/team`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  // Add service area location routes derived from centralized data
  const locationSitemapEntries = locations.map((loc) => ({
    url: `${SITE}/service-areas/${loc.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Add blog post routes
  const blogSitemapEntries = blogSlugs.map((slug) => ({
    url: `${SITE}/learn/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...baseRoutes, ...locationSitemapEntries, ...blogSitemapEntries];
}