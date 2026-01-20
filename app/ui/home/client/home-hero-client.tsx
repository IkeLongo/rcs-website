// app/ui/pages/home/client/home-hero-client.tsx (CLIENT)
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import TransChip from "../../components/trans-chip";

const leftChips = [
  { label: "Web Design", pos: "10%" },
  { label: "Web Development", pos: "3%" },
  { label: "Brand Strategy", pos: "18%" },
  { label: "Visual Identity", pos: "5%" },
  { label: "UI/UX Design", pos: "12%" },
  { label: "Logo Design", pos: "22%" },
  { label: "Creative Direction", pos: "15%" },
  { label: "Responsive Design", pos: "7%" },
];

const rightChips = [
  { label: "SEO Optimization", pos: "10%" },
  { label: "Hosting", pos: "24%" },
  { label: "Content Strategy", pos: "8%" },
  { label: "Custom Code", pos: "20%" },
  { label: "Storytelling", pos: "12%" },
  { label: "Style Guides", pos: "20%" },
  { label: "Conversion Strategy", pos: "2%" },
  { label: "Pixel Precision", pos: "18%" },
];

export default function HomeHeroEffects() {
  const PARALLAX_RATE = 0.6;
  const CHIP_RAIN_DURATION = 12;

  const CHIP_DELAY = useMemo(
    () => CHIP_RAIN_DURATION / leftChips.length,
    []
  );

  const [mounted, setMounted] = useState(false);
  const [enableRain, setEnableRain] = useState(false);

  // Desktop parallax element ref (avoid setState on scroll)
  const chipsWrapRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Mark mounted
  useEffect(() => setMounted(true), []);

  // ✅ Only attach scroll parallax on desktop
  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;

    const elSection = document.querySelector<HTMLElement>("[data-hero-section]");
    sectionRef.current = elSection;

    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const section = sectionRef.current;
        const chipsEl = chipsWrapRef.current;
        if (!section || !chipsEl) return;

        const rect = section.getBoundingClientRect();
        const sectionTopAbs = rect.top + window.scrollY;
        const sectionH = section.offsetHeight;

        const scrolledInsideRaw = window.scrollY - sectionTopAbs;
        const scrolledInside = Math.max(0, Math.min(sectionH, scrolledInsideRaw));

        const y = -scrolledInside * PARALLAX_RATE;
        chipsEl.style.transform = `translateY(${y}px)`;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // ✅ Delay rain until idle / after initial paint
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof w.requestIdleCallback === "function") {
      idleId = w.requestIdleCallback(() => setEnableRain(true), { timeout: 1200 });
    } else {
      timeoutId = setTimeout(() => setEnableRain(true), 600);
    }

    return () => {
      if (idleId !== undefined && typeof w.cancelIdleCallback === "function") {
        w.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      {/* hook for parallax measuring */}
      <div data-hero-section />

      {/* Mobile raining chips (deferred) */}
      {enableRain && (
        <div className="absolute inset-0 -top-20 z-20 flex flex-row justify-between md:hidden pointer-events-none w-full">
          <div className="relative w-1/2 h-full flex flex-col items-center">
            {leftChips.map((chip, i) => (
              <div
                key={chip.label}
                className="chip-anim"
                style={{
                  animation: `chipRain ${CHIP_RAIN_DURATION}s linear ${i * CHIP_DELAY}s infinite`,
                  position: "absolute",
                  left: chip.pos,
                  top: 0,
                  zIndex: 20,
                }}
              >
                <TransChip label={chip.label} variant="mobile" />
              </div>
            ))}
          </div>

          <div className="relative w-1/2 h-full flex flex-col items-center">
            {rightChips.map((chip, i) => (
              <div
                key={chip.label}
                className="chip-anim"
                style={{
                  animation: `chipRain ${CHIP_RAIN_DURATION}s linear ${i * CHIP_DELAY + CHIP_DELAY / 2}s infinite`,
                  position: "absolute",
                  right: chip.pos,
                  top: 0,
                  zIndex: 20,
                }}
              >
                <TransChip label={chip.label} variant="mobile" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Desktop chip columns (parallax, no React re-renders) */}
      <div className="hidden md:block">
        <div
          ref={chipsWrapRef}
          className="absolute inset-0 top-[950px] md:top-[800px] pointer-events-none mx-auto w-full max-w-[1120px] z-20"
          style={{ willChange: "transform" }}
        >
          <div
            className={[
              "absolute right-0 top-0 flex h-full w-1/2 -translate-x-4 flex-col items-end justify-center gap-6",
              "transition-all duration-700 ease-out",
              mounted ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0",
            ].join(" ")}
          >
            <TransChip label="Web Design" className="mb-20 relative left-4" />
            <TransChip label="Web Development" className="mb-20 relative -left-10 z-10" />
            <TransChip label="Brand Strategy" className="mb-20 relative left-0" />
            <TransChip label="Visual Identity" className="mb-20 relative -left-6" />
            <TransChip label="UI/UX Design" className="mb-20 relative left-10" />
            <TransChip label="Logo Design" className="mb-20 relative left-1" />
            <TransChip label="Creative Direction" className="mb-20 relative left-6" />
            <TransChip label="Responsive Design" className="mb-20 relative left-3" />
          </div>

          <div
            className={[
              "absolute left-0 top-0 flex h-full w-1/2 translate-x-4 flex-col items-start justify-center gap-6",
              "transition-all duration-700 ease-out",
              mounted ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0",
            ].join(" ")}
          >
            <TransChip label="SEO Optimization" className="mb-20 relative right-4" />
            <TransChip label="Hosting" className="mb-20 relative -right-4" />
            <TransChip label="Content Strategy" className="mb-20 relative -right-12" />
            <TransChip label="Custom Code" className="mb-20 relative right-2" />
            <TransChip label="Storytelling" className="mb-20 relative right-10" />
            <TransChip label="Style Guides" className="mb-20 relative right-1" />
            <TransChip label="Conversion Strategy" className="mb-20 relative right-6" />
            <TransChip label="Pixel Precision" className="mb-20 relative right-3" />
          </div>
        </div>
      </div>
    </>
  );
}