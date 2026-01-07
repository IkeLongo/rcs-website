"use client";

import * as React from "react";
import "./location-why-choose-us.css";
import Image from "next/image";
// import FadeInUp from "@/app/ui/components/fade-in-up";
import type { WhyChooseUsCard } from "./locations.data";

export default function LocationWhyChooseUs({
  cards,
}: {
  cards: WhyChooseUsCard[];
}) {
  return (
    <section className="locations w-full py-20 bg-gradient-to-br from-alice-blue-500 via-babyblue-300/40 to-alice-blue-500">
      <div className="mx-auto max-w-6xl px-6">
        {/* Stage container */}
        <div className="rounded-[20px] md:rounded-[40px] border border-navy-100 bg-white backdrop-blur shadow-[0_40px_120px_rgba(12,34,68,0.15)] overflow-visible">
          {/* Header */}
          <div className="px-6 md:px-10 pt-12 pb-10 text-center">
            {/* <FadeInUp> */}
              <h2 className="text-4xl lg:text-5xl font-bold text-navy-900 mb-4">
                Why Choose RiverCity Creatives
              </h2>
              <p className="text-md2 text-navy-600 max-w-3xl mx-auto">
                We deliver exceptional results that drive your business forward
              </p>
            {/* </FadeInUp> */}
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-8 px-2 sm:px-6 pb-2 lg:pb-12">
            {cards.map((card) => (
              <div key={card.key} className="flex flex-col items-center group">
                <div className="w-full aspect-[4/5] relative mb-0 lg:mb-4 min-h-[280px] max-h-[450px] md:min-h-0">
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    fill
                    className="object-cover rounded-2xl"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Overlay panel with shimmer */}
                  <div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] rounded-2xl px-3 py-3 flex flex-col items-center backdrop-blur-md bg-white/40 bg-gradient-to-t from-white/70 via-white/30 to-white/10 border border-white/30 overflow-hidden location-why-choose-us-panel group-hover:shimmer"
                  >
                    <span className="text-xs font-semibold font-avenir uppercase tracking-wide text-navy-700 drop-shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-80">
                      {card.stat}
                    </span>
                    <span className="text-base font-bold font-maven-pro text-navy-900 drop-shadow-sm text-center transition-all duration-300 group-hover:-translate-y-1 group-hover:text-navy-800">
                      {card.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
