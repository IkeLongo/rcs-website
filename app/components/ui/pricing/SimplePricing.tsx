import Image from "next/image";
import { cn } from "@/lib/utils";
import { PricingCards, type PlanData } from "./pricing-cards";

const plans: PlanData[] = [
  {
    id: "launch",
    name: "Launch",
    audience: "For small businesses getting started online",
    setupFee: 1000,
    monthlyPrice: 97,
    currency: "$",
    description:
      "Build a professional online presence that helps your business look credible and capture new leads.",
    features: [
      "Custom website design",
      "Mobile-friendly layout",
      "Contact form integration",
      "Basic on-page SEO",
      "SMS and Email Automations",
      "Hosting and maintenance",
      "1 website update per month",
    ],
    buttonText: "Choose Launch",
  },
  {
    id: "grow",
    name: "Grow",
    audience: "For businesses ready to generate and manage more leads",
    setupFee: 1500,
    monthlyPrice: 297,
    currency: "$",
    featured: true,
    description:
      "Turn more visitors into opportunities with stronger lead capture, automation, and search visibility.",
    additionalFeatures: ["Everything in Launch"],
    features: [
      "Booking or quote request system",
      "CRM integration",
      "Chat Widget setup",
      "Google review automation tools",
      "Expanded SEO setup",
      "3 website updates per month",
    ],
    buttonText: "Choose Grow",
  },
  {
    id: "scale",
    name: "Scale",
    audience: "For established businesses focused on growth and efficiency",
    setupFee: 2500,
    monthlyPrice: 597,
    currency: "$",
    description:
      "Scale your online presence with deeper automation, stronger visibility, and more customized support.",
    additionalFeatures: ["Everything in Launch", "Everything in Grow"],
    features: [
      "Advanced website customization",
      "Landing page creation",
      "Ongoing SEO support",
      "AI chatbot setup",
      "Advanced workflow automations",
      "Reporting insights",
      "5 website updates per month",
    ],
    buttonText: "Choose Scale",
  },
];

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
      </div>
    </div>
  );
}

