// app/(front-end)/(main-nav)/(pricing)/pricing/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { IconCheck } from "@tabler/icons-react";
import { IconArrowRight } from "@tabler/icons-react";
import { PricingCards } from "@/app/components/ui/pricing/pricing-cards";
import { TrackedCTA } from "@/app/components/analytics/tracked-cta";
import { plans, pricingFaqs } from "@/app/data/pricing";
import Footer from "@/app/components/layouts/footer/footer";

export const metadata: Metadata = {
  title: "Pricing | RiverCity Creatives",
  description:
    "Transparent, month-to-month pricing for small business websites, branding, and lead-capture systems in San Antonio and beyond. No long-term contracts.",
  alternates: { canonical: "/pricing" },
};

// ─── What's included data ──────────────────────────────────────────────────────

const included = [
  {
    title: "Custom Design",
    description:
      "Every website is designed from scratch to match your brand — no cookie-cutter templates.",
  },
  {
    title: "Mobile-First Build",
    description:
      "Your site looks and works great on every device, from phone to desktop.",
  },
  {
    title: "Hosting & Maintenance",
    description:
      "We handle uptime, security updates, and performance so you never have to worry.",
  },
  {
    title: "On-Page SEO",
    description:
      "Every page is optimized with proper titles, meta descriptions, headings, and schema markup.",
  },
  {
    title: "SMS & Email Automations",
    description:
      "Automatic follow-ups when someone fills out your form — so leads never slip through the cracks.",
  },
  {
    title: "Dedicated Support",
    description:
      "You get a real person to contact — not a support ticket queue.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-navy-500 via-navy-600 to-navy-700 text-white">
        {/* Noise overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{ backgroundImage: "url('/noise.png')" }}
        />
        {/* Glow accents */}
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
            Month-to-month · No contracts · Cancel any time
          </span>

          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold font-maven-pro leading-tight mb-6">
            Clear Pricing for{" "}
            <span className="relative inline-block">
              <span className="absolute inset-x-0 -bottom-1 h-3 bg-lime-500/25 blur-[6px]" />
              <span className="relative text-lime-200">Exceptional People</span>
            </span>
          </h1>

          <p className="text-lg text-alice-blue-100 leading-relaxed max-w-2xl mx-auto mb-10">
            Not just websites — complete systems built to help your business
            generate leads, follow up faster, and grow consistently. One fixed
            monthly price covers design, hosting, support, and more.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <TrackedCTA
              href="/booking"
              cta_id="pricing-hero-book"
              location="pricing-page-hero"
              className="inline-flex items-center gap-2 rounded-xl bg-lime-500 px-6 py-3 font-semibold text-navy-800 hover:bg-lime-400 transition-colors"
            >
              Book a Free Strategy Call
              <IconArrowRight className="w-4 h-4" />
            </TrackedCTA>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur hover:bg-white/20 transition-colors"
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </section>

      {/* ── Pricing Cards ─────────────────────────────────────────────────── */}
      <section id="plans" className="w-full bg-alice-blue-100 py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <PricingCards plans={plans} />
        </div>
      </section>

      {/* ── What's Included ───────────────────────────────────────────────── */}
      <section className="w-full bg-white py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl lg:text-4xl font-bold font-maven-pro text-navy-500 text-center mb-4">
            Every Plan Includes
          </h2>
          <p className="text-center text-navy-500/70 max-w-xl mx-auto mb-14">
            No matter which tier you choose, these are the foundations we build
            every site on.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {included.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="mt-1 shrink-0 w-6 h-6 rounded-full bg-lime-500/15 flex items-center justify-center">
                  <IconCheck className="w-4 h-4 text-lime-600" />
                </div>
                <div>
                  <p className="font-semibold text-navy-500 mb-1">{item.title}</p>
                  <p className="text-sm text-navy-500/65 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-alice-blue-100 py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl lg:text-4xl font-bold font-maven-pro text-navy-500 text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-navy-500/70 max-w-xl mx-auto mb-14">
            Have a question not covered here?{" "}
            <Link href="/contact" className="text-royal-blue hover:underline">
              Reach out any time.
            </Link>
          </p>
          <div className="flex flex-col divide-y divide-navy-500/10">
            {pricingFaqs.map((faq) => (
              <details
                key={faq.q}
                className="group py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between gap-4 font-semibold text-navy-500 select-none">
                  {faq.q}
                  <span
                    aria-hidden
                    className="shrink-0 text-navy-500/40 transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-navy-500/70 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-navy-500 via-navy-600 to-navy-700 py-24 px-6 text-white text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{ backgroundImage: "url('/noise.png')" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-[-80px] left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-lime-500/20 blur-[100px]"
        />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl lg:text-4xl font-bold font-maven-pro mb-4">
            Ready to grow your business online?
          </h2>
          <p className="text-alice-blue-100 text-lg mb-10 leading-relaxed">
            Book a free 30-minute strategy call and we'll recommend the right
            plan for where you are right now.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <TrackedCTA
              href="/booking"
              cta_id="pricing-bottom-cta-book"
              location="pricing-page-bottom-cta"
              className="inline-flex items-center gap-2 rounded-xl bg-lime-500 px-7 py-3 font-semibold text-navy-800 hover:bg-lime-400 transition-colors"
            >
              Book a Free Call
              <IconArrowRight className="w-4 h-4" />
            </TrackedCTA>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3 font-semibold text-white backdrop-blur hover:bg-white/20 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      <Footer bgGradientClass="bg-footer-bg-gradient" />
    </>
  );
}
