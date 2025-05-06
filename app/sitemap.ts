import { MetadataRoute } from "next";
const { SITE_NAME_VAR } = process.env;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${SITE_NAME_VAR}`,
      lastModified: "2025-05-06",
      changeFrequency: "monthly", // Indicates the homepage is updated frequently
      priority: 1.0, // Highest priority for the homepage
    },
    {
      url: `${SITE_NAME_VAR}/services`,
      lastModified: "2025-05-06",
      changeFrequency: "monthly", // Services page might be updated less frequently
      priority: 0.8,
    },
    {
      url: `${SITE_NAME_VAR}/team`,
      lastModified: "2025-05-06",
      changeFrequency: "monthly", // Team page might change less often
      priority: 0.6,
    },
    {
      url: `${SITE_NAME_VAR}/terms`,
      lastModified: "2025-05-06",
      changeFrequency: "yearly", // Terms and conditions rarely change
      priority: 0.3,
    },
    {
      url: `${SITE_NAME_VAR}/privacy`,
      lastModified: "2025-05-06",
      changeFrequency: "yearly", // Privacy policy rarely changes
      priority: 0.3,
    },
    {
      url: `${SITE_NAME_VAR}/booking`,
      lastModified: "2025-05-06",
      changeFrequency: "yearly", // Privacy policy rarely changes
      priority: 0.3,
    },
  ];
}