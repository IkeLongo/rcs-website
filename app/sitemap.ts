// app/sitemap.ts


import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rivercitycreatives.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  // Path to the (locations) folder
  const locationsDir = path.join(process.cwd(), "app", "(site)", "(locations)");
  let locationRoutes: string[] = [];
  try {
    locationRoutes = fs
      .readdirSync(locationsDir, { withFileTypes: true })
      .filter(
        (dirent) =>
          dirent.isDirectory() && dirent.name !== "_locations"
      )
      .map((dirent) => dirent.name);
  } catch (e) {
    // Fallback: no locations found
    locationRoutes = [];
  }

  const baseRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE}/services`,
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
      url: `${SITE}/team`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/booking`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Add location routes
  const locationSitemapEntries = locationRoutes.map((loc) => ({
    url: `${SITE}/${loc}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...baseRoutes, ...locationSitemapEntries];
}