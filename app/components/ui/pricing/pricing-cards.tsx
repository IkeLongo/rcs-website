"use client";
import Image from "next/image";
import { IconCheck, IconPlus } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export type PlanData = {
  id: string;
  name: string;
  audience: string;
  setupFee: number;
  monthlyPrice: number;
  currency: string;
  featured?: boolean;
  description: string;
  features: string[];
  additionalFeatures?: string[];
  buttonText: string;
};

export function PricingCards({ plans }: { plans: PlanData[] }) {
  return (
    <div
      className={cn(
        "mx-auto mt-20 grid grid-cols-1 gap-4",
        "mx-auto max-w-7xl md:grid-cols-2 xl:grid-cols-3",
      )}
    >
      {plans.map((tier) => (
        <Card
          key={tier.id}
          plan={tier}
          onClick={() => console.log(tier.id)}
        />
      ))}
    </div>
  );
}

const Card = ({ plan, onClick }: { plan: PlanData; onClick: () => void }) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-gray-100 bg-alice-blue-500 p-1 sm:p-4 md:p-4 dark:border-neutral-800 dark:bg-neutral-900",
        plan.featured && "border-transparent bg-transparent dark:bg-transparent",
      )}
    >
      {plan.featured && (
        <Image
          src="/premium-pricing-bg.png"
          alt=""
          fill
          quality={100}
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-center"
        />
      )}
      <div className="relative z-10 flex h-full flex-col justify-start gap-4">
        <div
          className={cn(
            "shadow-input w-full rounded-2xl bg-white p-4 dark:bg-neutral-800 dark:shadow-[0px_-1px_0px_0px_var(--neutral-700)]",
            plan.featured && "bg-transparent shadow-none dark:bg-transparent",
          )}
        >
          {/* Header row: title left, badge right */}
          <div className="flex items-center justify-between">
            <p className={cn("text-lg font-medium !text-navy-500", plan.featured && "!text-white")}>
              {plan.name}
            </p>
            {plan.featured && (
              <div className="relative shrink-0 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-navy-500">
                <div className="absolute inset-x-0 bottom-0 mx-auto h-px w-3/4 bg-gradient-to-r from-transparent via-royal-blue to-transparent"></div>
                Featured
              </div>
            )}
          </div>

          {/* Subtitle row: centered */}
          <p className={cn("mt-1 !text-left text-sm font-normal !text-navy-500", plan.featured && "!text-white/80")}>
            {plan.audience}
          </p>

          {/* Price row: centered */}
          <div className="mt-6 flex flex-col items-center">
            <div className="flex items-end">
              <span className={cn("text-lg font-bold !text-navy-500", plan.featured && "!text-white")}>
                {plan.currency}
              </span>
              <span className={cn("text-3xl font-bold !text-navy-500 md:text-7xl", plan.featured && "!text-white")}>
                {plan.monthlyPrice}
              </span>
              <span className={cn("mb-1 text-base font-normal text-navy-500 md:mb-2", plan.featured && "text-white/80")}>
                /month
              </span>
            </div>
            <p className={cn("text-sm !text-navy-500", plan.featured && "!text-white/80")}>
              + {plan.currency}{plan.setupFee.toLocaleString()} one-time setup fee
            </p>
          </div>

          {/* Description */}
          <p className={cn("mt-4 text-center text-sm leading-relaxed !text-navy-500", plan.featured && "!text-white/90")}>
            {plan.description}
          </p>
          <button
            className={cn(
              "mt-10 mb-4 w-full rounded-lg px-2 py-2 font-medium md:w-full",
              plan.featured
                ? "bg-gradient-to-b from-neutral-100 to-neutral-200 text-navy-500"
                : "bg-gradient-to-b from-blue-800 to-blue-900 text-white"
            )}
            onClick={onClick}
          >
            {plan.buttonText}
          </button>
        </div>
        <div className="mt-1 p-4">
          {plan.features.map((feature, idx) => (
            <Step key={idx} featured={plan.featured}>{feature}</Step>
          ))}
        </div>
        {plan.additionalFeatures && plan.additionalFeatures.length > 0 && (
          <Divider />
        )}
        <div className="p-4">
          {plan.additionalFeatures?.map((feature, idx) => (
            <Step additional featured={plan.featured} key={idx}>
              {feature}
            </Step>
          ))}
        </div>
      </div>
    </div>
  );
};

const Step = ({
  children,
  additional,
  featured,
}: {
  children: React.ReactNode;
  additional?: boolean;
  featured?: boolean;
}) => {
  const isWhite = additional && featured;
  const isNavy = additional && !featured;
  return (
    <div className="my-4 flex items-start justify-start gap-2">
      <div
        className={cn(
          "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
          isWhite
            ? "bg-white"
            : additional
            ? "bg-light-green-500"
            : "bg-navy-500"
        )}
      >
        <IconCheck className={cn("h-3 w-3 stroke-[4px]", isWhite ? "text-navy-500" : isNavy ? "text-navy-500" : "text-neutral-300")} />
      </div>
      <div className={cn("text-sm font-medium", featured || isWhite ? "text-white" : "text-black dark:text-white")}> 
        {children}
      </div>
    </div>
  );
};

const Divider = () => {
  return (
    <div className="relative">
      <div className={cn("h-px w-full bg-white dark:bg-neutral-950")} />
      <div className={cn("h-px w-full bg-neutral-200 dark:bg-neutral-800")} />
      <div
        className={cn(
          "absolute inset-0 m-auto flex h-5 w-5 items-center justify-center rounded-xl bg-white shadow-[0px_-1px_0px_0px_var(--neutral-200)] dark:bg-neutral-800 dark:shadow-[0px_-1px_0px_0px_var(--neutral-700)]",
        )}
      >
        <IconPlus
          className={cn(
            "h-3 w-3 stroke-[4px] text-black dark:text-neutral-300",
          )}
        />
      </div>
    </div>
  );
};
