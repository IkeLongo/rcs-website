
import { BlinkingLight } from "@/ui/animations/blinking-light";
import { TestimonialsWithCarousel } from "@/ui/components/testimonials/TestimonialsWithCarousel";
import Image from "next/image";
import { NewsLetterSignUp } from "@/ui/components/input/NewsLetterSignUp";

export default function NewsletterPage() {
  return (
    <div className="bg-blue-50">
      <main className="base flex items-start justify-center bg-gradient-to-b from-blue-100 to-white px-4">
        <div className="w-full max-w-6xl p-0 md:p-10 flex flex-col md:flex-row gap-10 md:gap-14">
          {/* Left column */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-navy-100 px-3 py-1 text-sm font-avenir text-navy-500 capitalize mb-4">
              <BlinkingLight />
              Weekly founder online strategy
            </div>

            <h1 className="!text-2xl md:text-4xl !text-left font-bold text-navy-500 leading-tight">
              Steal My Founder Website Revenue Checklist
            </h1>

            <p className="text-lg !text-gray-975 !text-md mt-4 !text-left">
              Fix the most common website leaks that stop founders from getting qualified leads.
              Get the checklist instantly — plus weekly, no-fluff revenue notes.
            </p>

            {/* What’s inside */}
            <ul className="mt-6 space-y-3">
              <li className="flex gap-3 !text-gray-975 !text-md !text-left">
                <span className="mt-2 h-2 w-2 rounded-full bg-neongreen-700 shrink-0" />
                15-point audit to spot conversion + clarity leaks fast
              </li>
              <li className="flex gap-3 !text-gray-975 !text-md !text-left">
                <span className="mt-2 h-2 w-2 rounded-full bg-neongreen-700 shrink-0" />
                Homepage messaging formulas founders can copy/paste
              </li>
              <li className="flex gap-3 !text-gray-975 !text-md !text-left">
                <span className="mt-2 h-2 w-2 rounded-full bg-neongreen-700 shrink-0" />
                CTA + lead capture placements that actually drive inquiries
              </li>
              <li className="flex gap-3 !text-gray-975 !text-md !text-left">
                <span className="mt-2 h-2 w-2 rounded-full bg-neongreen-700 shrink-0" />
                Quick wins you can implement in under 30 minutes
              </li>
            </ul>

            <NewsLetterSignUp />
          </div>

          {/* Right column */}
          <div className="flex-1 flex items-center justify-center relative pb-10 md:pb-0">
            {/* Glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-72 w-72 md:h-80 md:w-80 rounded-full bg-lime-300/25 blur-3xl" />
            </div>

            {/* Image + chips */}
            <div className="relative">
              <Image
                src="/founder-website-revenue-checklist.webp"
                alt="Founder Website Revenue Checklist"
                width={440}
                height={440}
                className="rounded-2xl object-contain w-full h-auto max-w-xs md:max-w-2xl drop-shadow"
                priority
              />
            </div>
          </div>
        </div>
      </main>
      <TestimonialsWithCarousel />
    </div>
  );
}
