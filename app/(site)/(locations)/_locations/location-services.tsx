"use client";

import * as React from "react";
import "./location-services.css";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import FadeInUp from "@/app/ui/components/fade-in-up";

type ServiceItem = {
  key: string;
  title: string;
  description: string;
  icon: "penTool" | "bolt" | "search" | "palette"; // expand later
  imageSrc: string;
  imageAlt: string;
};

function ServiceIcon({ name }: { name: ServiceItem["icon"] }) {
  // simple inline icons (no extra deps). Swap to lucide later if you want.
  switch (name) {
    case "penTool":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5z" />
        </svg>
      );
    case "bolt":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    case "search":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      );
    case "palette":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3a9 9 0 1 0 0 18c1.7 0 3-1.3 3-3 0-1-.5-1.9-1.3-2.4-.6-.4-.7-1.2-.2-1.7.6-.6 1.5-.9 2.4-.9 1.7 0 3-1.3 3-3A7 7 0 0 0 12 3z" />
          <circle cx="8" cy="10" r="1" />
          <circle cx="12" cy="8" r="1" />
          <circle cx="15.5" cy="10.5" r="1" />
          <circle cx="10" cy="14.5" r="1" />
        </svg>
      );
    default:
      return null;
  }
}

export default function LocationServices({
  city,
  services,
}: {
  city: string;
  services: ServiceItem[];
}) {
  const [activeKey, setActiveKey] = React.useState(services?.[0]?.key);
  const active = services.find((s) => s.key === activeKey) ?? services[0];

  return (
    <section className="locations w-full py-20 bg-navy-950 text-white">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <FadeInUp>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Services
              </div>

              <h2 className="mt-5 text-4xl lg:text-5xl font-bold tracking-tight">
                Web Design Services for {city}.
              </h2>

              <p className="mt-4 text-white/70 text-md2 max-w-2xl">
                Strategy-led design + modern development—built to look premium, load fast, and convert.
              </p>
            </div>
          </FadeInUp>

          <FadeInUp>
            <Link
              href="/services"
              className="group inline-flex items-center justify-center rounded-full bg-white text-navy-900 px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition"
            >
              Explore More
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </FadeInUp>
        </div>

        {/* Tabs row */}
        <FadeInUp>
          <div className="mt-10">
            <div className="flex gap-2 overflow-x-auto pb-2 tabs-scrollbar">
              {services.map((s) => {
                const isActive = s.key === activeKey;
                return (
                  <button
                    key={s.key}
                    onClick={() => setActiveKey(s.key)}
                    className={[
                      "flex items-center gap-3 whitespace-nowrap rounded-2xl px-5 py-3 text-sm font-semibold transition",
                      "border",
                      isActive
                        ? "bg-white/10 border-white/20 text-white"
                        : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/8 hover:border-white/15",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "grid place-items-center h-9 w-9 rounded-xl border",
                        isActive
                          ? "bg-green-500/15 border-green-500/30 text-green-300"
                          : "bg-white/5 border-white/10 text-white/70",
                      ].join(" ")}
                    >
                      <ServiceIcon name={s.icon} />
                    </span>
                    {s.title}
                  </button>
                );
              })}
            </div>
          </div>
        </FadeInUp>

        {/* Active panel */}
        <div className="mt-8">
          <div className="relative rounded-[28px] border border-white/10 bg-white/5 backdrop-blur shadow-2xl overflow-hidden">
            {/* subtle glow accents */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-green-500/10 blur-[80px]" />
              <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-babyblue-500/10 blur-[90px]" />
            </div>

            <div className="relative grid lg:grid-cols-2 gap-10 p-8 lg:p-12 items-center">
              {/* Left copy */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/75">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Included in every build
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="mt-5 text-3xl lg:text-4xl font-bold">
                      {active.title}
                    </h3>

                    <p className="mt-4 text-white/75 text-sm lg:text-md2 leading-relaxed max-w-xl">
                      {active.description}
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                      <Link
                        href="/booking"
                        className="inline-flex items-center justify-center rounded-full bg-green-500 px-6 py-3 font-semibold text-navy-950 shadow-lg hover:shadow-xl hover:bg-green-300 transition"
                      >
                        Let’s Chat
                        <span className="ml-2">→</span>
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right image */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  <div className="absolute inset-0 bg-gradient-to-br from-navy-900/30 via-transparent to-transparent" />
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.imageSrc}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.28 }}
                      className="relative aspect-[4/3]"
                    >
                      <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                        {/* Image */}
                        <Image
                          src={active.imageSrc}
                          alt={active.imageAlt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />

                        {/* Optional subtle highlight (ties in green/blue brand) */}
                        <div
                          aria-hidden
                          className="pointer-events-none absolute -top-20 -right-24 h-72 w-72 rounded-full bg-green-500/12 blur-[80px]"
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* tiny grid lines (optional premium detail) */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-3xl [mask-image:radial-gradient(circle_at_center,black,transparent_70%)] opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)",
                    backgroundSize: "36px 36px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
