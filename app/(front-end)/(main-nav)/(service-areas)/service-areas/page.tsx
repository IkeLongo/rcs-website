// app/(front-end)/(main-nav)/(service-areas)/service-areas/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowRight, IconMapPin } from "@tabler/icons-react";
import { locations } from "@/app/data/locations";
import { TrackedCTA } from "@/app/components/analytics/tracked-cta";
import Footer from "@/app/components/layouts/footer/footer";

export const metadata: Metadata = {
  title: "Service Areas | RiverCity Creatives",
  description:
    "We build websites and brands for small businesses across San Antonio, Boerne, Leon Springs, and surrounding Texas Hill Country communities.",
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreasPage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-navy-500 via-navy-600 to-navy-700 text-white">
        {/* Noise overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{ backgroundImage: "url('/noise.png')" }}
        />
        {/* Glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-lime-500/20 blur-[120px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-100px] right-[-100px] h-[400px] w-[400px] rounded-full bg-babyblue-300/20 blur-[130px]"
        />

        <div className="relative mx-auto max-w-5xl px-6 pt-40 pb-20 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/10 backdrop-blur text-sm font-medium mb-6">
            <IconMapPin className="w-4 h-4 text-lime-400" />
            Greater San Antonio &amp; Texas Hill Country
          </span>

          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold font-maven-pro leading-tight mb-6">
            Our{" "}
            <span className="relative inline-block">
              <span className="absolute inset-x-0 -bottom-1 h-3 bg-lime-500/25 blur-[6px]" />
              <span className="relative text-lime-200">Service Areas</span>
            </span>
          </h1>

          <p className="text-lg text-alice-blue-100 leading-relaxed max-w-2xl mx-auto mb-10">
            We partner with small businesses across the San Antonio metro and
            Texas Hill Country — delivering custom websites and brand systems
            built to convert, rank locally, and grow with you.
          </p>

          <TrackedCTA
            href="/booking"
            cta_id="service-areas-hub-hero"
            location="service-areas-hub-hero"
            className="inline-flex items-center justify-center px-8 py-4 bg-lime-500 text-navy-500 rounded-xl font-bold text-md hover:bg-lime-400 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Book a Free Discovery Call
            <IconArrowRight className="ml-2 w-5 h-5" />
          </TrackedCTA>
        </div>
      </section>

      {/* ── Intro + Grid ───────────────────────────────────────────────────── */}
      <section className="w-full bg-alice-blue-500 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold font-maven-pro text-navy-900 mb-4">
              Where We Work
            </h2>
            <p className="text-md2 text-navy-600 font-roboto max-w-2xl mx-auto">
              Each location page is built with local search intent in
              mind — helping area businesses show up, stand out, and turn
              site visitors into real clients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/service-areas/${loc.slug}`}
                className="group flex flex-col gap-3 p-6 bg-white rounded-2xl border border-navy-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-maven-pro text-navy-900">
                      {loc.name}
                    </h3>
                    <p className="text-sm font-roboto text-navy-500">
                      {loc.state}
                      {loc.areaLabel ? ` · ${loc.areaLabel}` : ""}
                    </p>
                  </div>
                  <IconArrowRight className="w-5 h-5 text-navy-300 group-hover:text-lime-500 transition-colors shrink-0 mt-1" />
                </div>

                {loc.nearbyAreas && loc.nearbyAreas.length > 0 && (
                  <p className="text-xs font-roboto text-navy-400 leading-relaxed">
                    Near:{" "}
                    {loc.nearbyAreas.slice(0, 3).join(", ")}
                  </p>
                )}

                <span className="text-xs font-semibold font-roboto text-lime-600 mt-auto">
                  View service area →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="relative w-full bg-navy-500 text-white overflow-hidden py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-lime-500/10 blur-[120px]"
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold font-maven-pro mb-5">
            Don&apos;t see your city?
          </h2>
          <p className="text-md2 text-alice-blue-100 font-roboto leading-relaxed mb-8">
            We serve businesses throughout the Greater San Antonio region and
            surrounding Hill Country. Reach out — we&apos;d love to learn
            about your business regardless of where you&apos;re located.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TrackedCTA
              href="/booking"
              cta_id="service-areas-hub-bottom"
              location="service-areas-hub-bottom"
              className="inline-flex items-center justify-center px-8 py-4 bg-lime-500 text-navy-500 rounded-xl font-bold text-md hover:bg-lime-400 transition-all shadow-lg"
            >
              Book a Free Discovery Call
            </TrackedCTA>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white rounded-xl font-semibold text-md hover:bg-white/10 transition-all"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>
      <Footer bgGradientClass="bg-footer-bg-gradient" />
    </>
  );
}
