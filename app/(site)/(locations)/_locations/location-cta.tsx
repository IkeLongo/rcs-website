"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import FadeInUp from "@/app/ui/components/fade-in-up";
import { AnimatedTooltipLocation } from "./location-animated-tooltip";

type StatItem = {
  key: string;
  value: number;          // numeric part for counter
  suffix?: string;        // "+", "%", etc.
  label: string;          // "Years Experience"
  icon?: React.ReactNode; // optional
  subcopy?: string;       // optional small sentence
};

function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, options);

    io.observe(el);
    return () => io.disconnect();
  }, [options]);

  return { ref, inView };
}

function useCountUp(target: number, start: boolean, durationMs = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let raf = 0;
    const startTime = performance.now();
    const from = 0;
    const to = target;

    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / durationMs);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(from + (to - from) * eased);
      setValue(next);

      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, durationMs]);

  return value;
}

function GridBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-25"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
      }}
    />
  );
}

export default function LocationFinalCTA({
  city,
  heading,
  subheading,
  stats,
}: {
  city: string;
  heading?: string;
  subheading?: string;
  stats?: StatItem[];
}) {
  // Custom SVG icons
  const iconYears = (
    <svg className="h-5 w-5 text-lime-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  const iconWebsites = (
    <svg className="h-5 w-5 text-lime-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 9h18" stroke="currentColor" strokeWidth="2" />
      <circle cx="7" cy="7" r="1" fill="currentColor" />
    </svg>
  );
  const iconSatisfaction = (
    <svg className="h-5 w-5 text-lime-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 17.5l-5.09 2.67 1.09-6.36L3 9.24l6.41-.93L12 2.5l2.59 5.81 6.41.93-4.64 4.57 1.09 6.36z" stroke="currentColor" strokeWidth="2" fill="currentColor" />
    </svg>
  );

  const iconMap: Record<string, React.ReactNode> = {
    years: iconYears,
    sites: iconWebsites,
    satisfaction: iconSatisfaction,
  };

  const safeStats = useMemo<StatItem[]>(
    () =>
      (stats ?? [
        { key: "years", value: 5, suffix: "+", label: "Years Experience", subcopy: "Real-world small business builds" },
        { key: "sites", value: 50, suffix: "+", label: "Websites Delivered", subcopy: "Across services & industries" },
        { key: "satisfaction", value: 100, suffix: "%", label: "Client Satisfaction", subcopy: "Clear process + clean results" },
      ]).map(s => ({
        ...s,
        icon: iconMap[s.key] ?? s.icon,
      })),
    [stats]
  );

  const { ref: statsRef, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });

  return (
    <section className="locations relative w-full bg-navy-500 text-white overflow-hidden">
      {/* Background glow elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-lime-500"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-alice-blue-300"></div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <FadeInUp>
            <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                {heading ?? `Ready to Upgrade Your Website in ${city}?`}
              </h2>

              <p className="text-md2 text-alice-blue-100 leading-relaxed mb-8 max-w-3xl mx-auto">
                {subheading ??
                  "Let's talk through your goals and recommend the simplest path to a modern, high-performing site that drives real business results."}
              </p>

              {/* Avatars / tooltip */}
              <div className="mb-8">
                <AnimatedTooltipLocation />
              </div>

              {/* CTA row */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center px-10 py-5 bg-lime-500 text-navy-500 rounded-xl font-bold text-md hover:bg-lime-400 transition-all duration-300 shadow-2xl transform hover:-translate-y-1"
                >
                  Book a Free Discovery Call
                  <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Divider */}
              <div className="mt-10 pt-10 border-t border-white/15">
                {/* STATS BAND (black-grid style) */}
                <div
                  ref={statsRef}
                  className="relative rounded-3xl overflow-hidden border border-white/10 bg-black/45 backdrop-blur-md"
                >
                  <GridBackground />

                  {/* corner accents */}
                  <div aria-hidden className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-lime-500/10 blur-[90px]" />
                    <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-babyblue-300/10 blur-[100px]" />
                    <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
                  </div>

                  <div className="relative grid md:grid-cols-3">
                    {safeStats.map((s, idx) => (
                      <StatTile key={s.key} item={s} animate={inView} showDivider={idx < safeStats.length - 1} />
                    ))}
                  </div>
                </div>
              </div>
              {/* end stats */}
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}

function StatTile({
  item,
  animate,
  showDivider,
}: {
  item: StatItem;
  animate: boolean;
  showDivider?: boolean;
}) {
  const count = useCountUp(item.value, animate, 950);

  return (
    <div className="relative px-8 py-8 pl-10 text-left flex flex-col items-start">
      {/* vertical dividers on desktop */}
      {showDivider ? (
        <div aria-hidden className="hidden md:block absolute top-8 bottom-8 right-0 w-px bg-white/10" />
      ) : null}

      {/* Icon and count inline */}
      <div className="flex items-center gap-3 mb-1 w-full">
        <div className="shrink-0 rounded-2xl border border-white/10 bg-white/5 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
          {/* fallback icon */}
          {item.icon ?? (
            <svg className="h-5 w-5 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19V5" />
              <path d="M20 19V5" />
              <path d="M8 17l4-4 4 4" />
              <path d="M8 7l4 4 4-4" />
            </svg>
          )}
        </div>
        <div className="text-3xl font-bold text-lime-400 font-maven-pro">
          {count}
          {item.suffix ?? ""}
        </div>
      </div>
      <div className="mt-2 text-white/90 font-semibold font-avenir">{item.label}</div>
      {item.subcopy ? <div className="mt-4 text-sm text-white/65 max-w-xs">{item.subcopy}</div> : null}
    </div>
  );
}
