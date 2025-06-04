"use client";

import { useEffect, useState } from 'react';
import Image from "next/image";
import AccordionItem from "./accordion-item";
import { InfoBlockProps } from '@/types/components';
import targetAnimation from "@/app/lib/assets/target-animation.json";
import dollarAnimation from "@/app/lib/assets/dollar-animation.json";
import checklistAnimation from "@/app/lib/assets/checklist-animation.json";
import calendarAnimation from "@/app/lib/assets/calendar-animation.json";

const accordionBlocks = [
  {
    id: "block-1",
    title: "Web Design & Development",
    accordions: [
      {
        iconRoute: targetAnimation,
        iconDescription: "Target icon animation",
        title: "Who Should Consider This?",
        description:
          "This package is ideal for business owners looking to start or elevate their online presence. From engaging design to custom development, this package covers it all.",
      },
      {
        iconRoute: dollarAnimation,
        iconDescription: "Money icon animation",
        title: "Investment",
        description:
          "We offer three packages: Base - $300/month, Pro - $800/month, Enterprise - $1,300/month. Payment plans are available.",
      },
      {
        iconRoute: checklistAnimation,
        iconDescription: "Check list icon animation",
        title: "What's Included?",
        description:
          "Custom Design, SEO, In-House Development, Security Features, API Integrations, and more.",
      },
      {
        iconRoute: calendarAnimation,
        iconDescription: "Calendar icon animation",
        title: "Timeline",
        description: "Our typical turnaround time is 90 days.",
      },
    ],
  },
  {
    id: "block-2",
    title: "Visual & Identity Systems",
    accordions: [
      {
        iconRoute: targetAnimation,
        iconDescription: "Target icon animation",
        title: "Who Should Consider This?",
        description:
          "Ideal for business owners aiming to elevate their brand’s visual impact, offering a complete branding overhaul.",
      },
      {
        iconRoute: dollarAnimation,
        iconDescription: "Money icon animation",
        title: "Investment",
        description:
          "Base: $200/month, Pro: $450/month, Enterprise: $750/month, with flexible payment options.",
      },
      {
        iconRoute: checklistAnimation,
        iconDescription: "Check list icon animation",
        title: "What's Included?",
        description:
          "Logo, Typography, Color Palettes, Visual Identity Assets, and Optional Add-ons.",
      },
      {
        iconRoute: calendarAnimation,
        iconDescription: "Calendar icon animation",
        title: "Timeline",
        description: "Timeline of 60-90 days depending on customizations.",
      },
    ],
  },
  {
    id: "block-3",
    title: "Hosting, Maintenance & Security",
    accordions: [
      {
        iconRoute: targetAnimation,
        iconDescription: "Target icon animation",
        title: "Who Should Consider This?",
        description:
          "Perfect for business owners who need reliable hosting, security, and maintenance.",
      },
      {
        iconRoute: dollarAnimation,
        iconDescription: "Money icon animation",
        title: "Investment",
        description:
          "Base: $99/month, Pro: $219/month, Enterprise: $599/month with flexible month-to-month payments.",
      },
      {
        iconRoute: checklistAnimation,
        iconDescription: "Check list icon animation",
        title: "What's Included?",
        description:
          "Hosting, Security Updates, Regular Maintenance, and SEO support (Enterprise only).",
      },
      {
        iconRoute: calendarAnimation,
        iconDescription: "Calendar icon animation",
        title: "Timeline",
        description:
          "Setup within 48 hours. Continuous support with real-time updates.",
      },
    ],
  },
];


export default function InfoBlock({
  selectedBlock,
  onBack,
  isTransitioning,
}: InfoBlockProps) {
  useEffect(() => {
    const element = document.getElementById(selectedBlock);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedBlock]);

  const selectedAccordionBlock = accordionBlocks.find(
    (block) => block.id === selectedBlock
  );

  if (!selectedAccordionBlock) return null;

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col w-full items-center max-w-[900px]">
        <div
          id={selectedAccordionBlock.id}
          className={`flex flex-col w-full items-center bg-navy-500 px-4 py-[45px] pt-[100px] md:pt-[120px] gap-[37px] ${
            selectedBlock === selectedAccordionBlock.id ? "block" : "hidden"
          }`}
        >
          {/* Back Button */}
          <div
            className={`flex w-full gap-[11px] self-start cursor-pointer ${
              isTransitioning
                ? "slide-out-left-0"
                : "slide-in-right initial-offscreen"
            }`}
            onClick={onBack}
          >
            <Image
              src="/arrow-left.svg"
              alt="Back Arrow"
              width={6.37}
              height={11.22}
              className="object-contain"
              style={{ maxWidth: "100%", height: "auto" }}
            />
            <p className="text-center font-avenir text-[12px] md:text-[14px] drop-shadow-[2px_10px_4.6px_rgba(0,0,0,0.25)]">
              Back to Services
            </p>
          </div>

          {/* Block Title */}
          <h4
            className={`w-full my-1 font-bold drop-shadow-[2px_10px_4.6px_rgba(0,0,0,0.25)] delay-5 ${
              isTransitioning
                ? "slide-out-left-1"
                : "initial-offscreen slide-in-right"
            }`}
          >
            {selectedAccordionBlock.title}
          </h4>

          {/* Dynamically Render Accordions */}
          <div className="flex flex-col w-full">
            {selectedAccordionBlock.accordions.map((accordion, index) => (
              <AccordionItem
                key={index}
                animation={accordion.iconRoute}
                iconDescription={accordion.iconDescription}
                title={accordion.title}
                description={accordion.description}
                className={`delay-${index + 7} ${
                  isTransitioning
                    ? `slide-out-left-${index + 2}`
                    : "initial-offscreen slide-in-right"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}