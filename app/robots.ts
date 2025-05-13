import type { MetadataRoute } from 'next'

const { SITE_NAME_VAR } = process.env;
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/login',
    },
    sitemap: `${SITE_NAME_VAR}/sitemap.xml`,
  }
}