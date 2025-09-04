"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "../components/image";
import TransChip from "../components/trans-chip";

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export default function HomeHero() {
  const [mounted, setMounted] = useState(false);
  const PARALLAX_RATE = 0.6;

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [chipsY, setChipsY] = useState(0);

  // Replace your useEffect with this version
  useEffect(() => {
    let raf = 0;
    setMounted(true);

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const sectionTopAbs = rect.top + window.scrollY; // absolute Y of section top
        const sectionH = el.offsetHeight;

        // How much we've scrolled inside this section in document space:
        // 0 when section top hits viewport top, increases as we continue.
        const scrolledInsideRaw = window.scrollY - sectionTopAbs;

        // Keep it within the section's lifespan (prevents runaway values off-screen)
        const scrolledInside = Math.max(0, Math.min(sectionH, scrolledInsideRaw));

        // Constant-speed parallax for the whole time the section is in view
        const y = -scrolledInside * PARALLAX_RATE;

        setChipsY(y);
      });
    };

    onScroll(); // init
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    // Section is taller than the viewport by PIN_DISTANCE so the hero can stay pinned
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: `calc(100vh)` }}
    >
      {/* Sticky hero: stays pinned for the first PIN_DISTANCE px of scroll */}
      <div className="sticky top-0 h-screen overflow-hidden bg-alice-blue-500">
        {/* Chips layer: continues to move during pin AND after release */}
        <div
        className="absolute inset-0 top-[800px] pointer-events-none z-30 mx-auto w-full max-w-[1120px]"
        style={{
          transform: `translateY(${chipsY}px)`,
          willChange: "transform",
        }}
      >
          {/* Left chips */}
          <div
            className={`absolute right-0 top-0 flex h-full w-1/2 -translate-x-4 flex-col items-end justify-center gap-6
              transition-all duration-700 ease-out
              ${mounted ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0"}
            `}
          >            
            <TransChip label="Web Design" className="mb-20 relative left-4" />
            <TransChip label="Web Development" className="mb-20 relative -left-10" />
            <TransChip label="Brand Strategy" className="mb-20 relative left-0" />
            <TransChip label="Visual Identity" className="mb-20 relative -left-6" />
            <TransChip label="UI/UX Design" className="mb-20 relative left-10" />
            <TransChip label="Logo Design" className="mb-20 relative left-1" />
            <TransChip label="Creative Direction" className="mb-20 relative left-6" />
            <TransChip label="Responsive Design" className="mb-20 relative left-3" />
          </div>

          {/* Right chips */}
          <div
            className={`absolute left-0 top-0 flex h-full w-1/2 translate-x-4 flex-col items-start justify-center gap-6
              transition-all duration-700 ease-out
              ${mounted ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0"}
            `}
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

        {/* Hero content (does not parallax) */}
        <div className="relative z-10 flex h-full w-full flex-col items-center p-6 md:top-4 md:px-20">
          <div className="flex w-full flex-col pt-36 self-center md:w-1/2 md:items-end md:justify-end">
            <h1 className="w-full text-navy-500">
              Crafting Powerful <span className="italic text-neongreen-700">Websites</span> and
              <br />
              <span className="italic text-neongreen-700">Branding</span> for Your Business
            </h1>

            {/* Centered visuals */}
            <div className="pointer-events-none absolute left-1/2 bottom-0 z-10 flex w-[1220px] -translate-x-1/2 flex-col items-center">
              <Image
                src="/hero-elipse.webp"
                alt="Background elipse"
                width={890}
                height={800}
                className="-mt-[600px] select-none"
                style={{ userSelect: "none" }}
              />
              <Image
                src="/hero-blob.webp"
                alt="Background blob"
                width={800}
                height={650}
                className="-mt-[500px] select-none"
                style={{ userSelect: "none" }}
              />
              <div className="pointer-events-none absolute left-1/2 bottom-0 z-20 flex w-full -translate-x-1/2 items-end justify-center -gap-10">
                <Image src="/barb.webp" alt="Barb" width={350} height={450} className="-mr-8" />
                <Image src="/isaac.webp" alt="Isaac" width={300} height={400} className="-ml-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

