import Image from "next/image";
import { cn } from "@/lib/utils";
import { PricingCards, type PlanData } from "./pricing-cards";

const plans: PlanData[] = [
  {
    id: "hobby",
    name: "Hobby",
    price: 99,
    subText: "/month",
    currency: "$",
    features: [
      "Access to basic analytics reports",
      "Up to 10,000 data points per month",
      "Email support",
      "Community forum access",
      "Cancel anytime",
    ],
    buttonText: "Get Hobby",
  },
  {
    id: "starter",
    name: "Starter",
    price: 299,
    subText: "/month",
    currency: "$",
    featured: true,
    features: [
      "Advanced analytics dashboard",
      "Customizable reports and charts",
      "Real-time data tracking",
      "Integration with third-party tools",
    ],
    buttonText: "Get Starter",
    additionalFeatures: ["Everything in Hobby Plan"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 1490,
    subText: "/month",
    currency: "$",
    features: [
      "Unlimited data storage",
      "Customizable dashboards",
      "Advanced data segmentation",
      "Real-time data processing",
      "AI-powered insights and recommendations",
    ],
    additionalFeatures: ["Everything in Hobby Plan", "Everything in Pro Plan"],
    buttonText: "Get Pro",
  },
];

export function SimplePricingWithThreeTiers() {
  return (
    <div className="relative w-full overflow-hidden">
      <Image
        src="/home-pricing-bg.webp"
        alt=""
        fill
        className="object-cover object-top"
      />
      <div className="relative z-10 isolate mx-auto max-w-7xl bg-transparent px-4 py-0 sm:py-10 lg:px-4">
        <div
          className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
          aria-hidden="true"
        ></div>
        <>
          <h2 className="pt-4 text-center text-lg font-bold text-neutral-800 md:text-4xl dark:text-neutral-100">
            Simple pricing for advanced people
          </h2>
          <p className="mx-auto mt-4 max-w-md text-center text-base text-neutral-600 dark:text-neutral-300">
            Our pricing is designed for advanced people who need more features and
            more flexibility.
          </p>
        </>
        <PricingCards plans={plans} />
      </div>
    </div>
  );
}

