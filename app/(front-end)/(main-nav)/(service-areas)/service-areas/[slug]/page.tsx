// app/(front-end)/(main-nav)/(service-areas)/service-areas/[slug]/page.tsx

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LocationTemplate from "@/app/(front-end)/(main-nav)/(locations)/_locations/location-template";
import type { LocationPageConfig, LocationPageKey } from "@/app/(front-end)/(main-nav)/(locations)/_locations/locations.data";
import {
  getLocation,
  getAllLocationSlugs,
  type LocationEntry,
} from "@/app/data/locations";

// ─── Adapter ──────────────────────────────────────────────────────────────────
// Converts a LocationEntry to the shape LocationTemplate expects.
// The full canonical slug `/service-areas/${slug}` is set here so that
// location-schema.tsx emits the correct canonical URL without any changes.

function toPageConfig(entry: LocationEntry): LocationPageConfig {
  return {
    key: entry.slug as unknown as LocationPageKey,
    slug: `/service-areas/${entry.slug}` as `/${string}`,
    service: "web-design",
    city: entry.city,
    state: entry.state,
    areaLabel: entry.areaLabel,
    nearbyAreas: entry.nearbyAreas,
    title: entry.title,
    description: entry.description,
    heroTitle: entry.heroTitle,
    heroSubtitle: entry.heroSubtitle,
    outcomes: entry.outcomes,
    services: entry.services,
    whyChooseUsCards: entry.whyChooseUsCards,
    faqs: entry.faqs,
    proofPoints: entry.proofPoints,
  };
}

// ─── Static generation ────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getAllLocationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let entry: LocationEntry;
  try {
    entry = getLocation(slug);
  } catch {
    return {};
  }
  return {
    title: entry.title,
    description: entry.description,
    alternates: { canonical: `/service-areas/${slug}` },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ServiceAreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let entry: LocationEntry;
  try {
    entry = getLocation(slug);
  } catch {
    notFound();
  }
  return <LocationTemplate page={toPageConfig(entry)} />;
}
