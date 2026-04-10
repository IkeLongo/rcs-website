import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PricingCards } from "./pricing-cards";
import { plans } from "@/app/data/pricing";

export function SimplePricingWithThreeTiers() {
  return (
    <div id='pricing' className="relative w-full overflow-hidden">
      <Image
        src="/home-pricing-bg.webp"
        alt=""
        fill
        className="object-cover object-top"
      />
      <div className="relative z-10 isolate mx-auto max-w-7xl bg-transparent px-4 py-24 sm:py-24 lg:px-4">
        <div
          className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
          aria-hidden="true"
        ></div>
        <>
          <h2 className="pt-4 text-center !text-2xl font-bold !text-navy-500 md:text-4xl">
            Clear Pricing for Exceptional People
          </h2>
          <p className="mx-auto mt-4 max-w-md text-center !text-base !text-navy-500/80">
            Not just websites — complete systems built to help you generate leads, 
            follow up faster, and grow consistently.
          </p>
        </>
        <PricingCards plans={plans} />
        <div className="mt-8 text-center">
          <Link
            href="/pricing"
            className="font-roboto text-sm font-medium text-navy-500/70 hover:text-navy-500 transition-colors underline underline-offset-4"
          >
            View full pricing & FAQs →
          </Link>
        </div>
      </div>
    </div>
  );
}

