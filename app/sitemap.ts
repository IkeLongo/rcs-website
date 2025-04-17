import { MetadataRoute } from "next";
const { SITE_NAME_VAR } = process.env;

export default async function sitempa(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${SITE_NAME_VAR}`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_NAME_VAR}/services`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_NAME_VAR}/team`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_NAME_VAR}/terms`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_NAME_VAR}/privacy`,
      lastModified: new Date(),
    },
  ];
}