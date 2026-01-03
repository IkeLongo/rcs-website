// app/sitemap.ts

import { MetadataRoute } from "next";
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rivercitycreatives.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  return [
    {
      url: `${SITE}`,
      lastModified,
      changeFrequency: "monthly", // Indicates the homepage is updated frequently
      priority: 1.0, // Highest priority for the homepage
    },
    {
      url: `${SITE}/services`,
      lastModified,
      changeFrequency: "monthly", // Services page might be updated less frequently
      priority: 0.8,
    },
    {
      url: `${SITE}/team`,
      lastModified,
      changeFrequency: "monthly", // Team page might change less often
      priority: 0.6,
    },
    {
      url: `${SITE}/booking`,
      lastModified,
      changeFrequency: "yearly", // Privacy policy rarely changes
      priority: 0.3,
    },
  ];
}