// app/(site)/(locations)/_locations/location-schema.tsx
import { SITE_URL, type LocationPageConfig } from "./locations.data";

export function LocationSchema({ page }: { page: LocationPageConfig }) {
  const pageUrl = `${SITE_URL}${page.slug}`;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // Simple LocalBusiness schema (keep minimal/accurate)
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "RiverCity Creatives",
    url: SITE_URL,
    areaServed: [page.city, ...(page.nearbyAreas ?? [])],
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Antonio",
      addressRegion: "TX",
      addressCountry: "US",
    },
    sameAs: [], // add socials later if you want
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <link rel="canonical" href={pageUrl} />
    </>
  );
}
