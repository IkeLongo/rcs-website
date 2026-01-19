"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "../components/image";
import TransChip from "../components/trans-chip";
// import FadeInUp from "../components/fade-in-up";

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

export default function HomeHero() {
  const [mounted, setMounted] = useState(false);
  const PARALLAX_RATE = 0.6;

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [chipsY, setChipsY] = useState(0);

  const CHIP_RAIN_DURATION = 12; // seconds
  const CHIP_COUNT = leftChips.length; // 8

  const CHIP_DELAY = CHIP_RAIN_DURATION / CHIP_COUNT; // 2s

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
      className="relative w-full min-h-[900px]" // set your desired min height here
      style={{ height: "100vh", minHeight: "900px" }} // match the min-h value
    >
      {/* Sticky hero: stays pinned for the first PIN_DISTANCE px of scroll */}
      <div className="absolute bottom-0 w-full h-full overflow-hidden bg-alice-blue-500">

        {/* 1) BACKGROUND SHAPES (moved out of hero content) */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 pointer-events-none z-10 flex w-[1220px] flex-col items-center">
          {/* Ellipse */}
          <Image
            src="/hero-elipse_1.webp"
            alt="Background elipse"
            width={890}
            height={800}
            className="-mt-[600px] select-none"
            style={{ userSelect: "none" }}
            priority
          />
          {/* Blob */}
          <Image
            src="/hero-blob.webp"
            alt="Background blob"
            width={800}
            height={650}
            className="-mt-[500px] select-none"
            style={{ userSelect: "none" }}
            priority
          />
        </div>

        {/* Mobile raining chips */}
        <div className="absolute inset-0 -top-20 z-20 flex flex-row justify-between md:hidden pointer-events-none w-full">
          {/* Left column */}
          <div className="relative w-1/2 h-full flex flex-col items-center">
            {leftChips.map((chip, i) => (
              <div
                key={chip.label}
                style={{
                  animation: `chipRain ${CHIP_RAIN_DURATION}s linear ${i * CHIP_DELAY}s infinite`,
                  position: "absolute",
                  left: chip.pos,
                  top: 0,
                  zIndex: 20,
                }}
              >
                <TransChip label={chip.label} />
              </div>
            ))}
          </div>
          {/* Right column */}
          <div className="relative w-1/2 h-full flex flex-col items-center">
            {rightChips.map((chip, i) => (
              <div
                key={chip.label}
                style={{
                  animation: `chipRain ${CHIP_RAIN_DURATION}s linear ${(i * CHIP_DELAY) + (CHIP_DELAY / 2)}s infinite`,
                  position: "absolute",
                  right: chip.pos,
                  top: 0,
                  zIndex: 20,
                }}
              >
                <TransChip label={chip.label} />
              </div>
            ))}
          </div>
        </div>

        {/* Chips layer: continues to move during pin AND after release */}
        <div className="hidden md:block">
          <div
            className="absolute inset-0 top-[950px] md:top-[800px] pointer-events-none mx-auto w-full max-w-[1120px] z-20"
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
              <TransChip label="Web Development" className="mb-20 relative -left-10 z-10" />
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
        </div>

        {/* Hero content (does not parallax) */}
        <div className="relative flex h-full w-full flex-col items-center p-6 md:top-4 md:px-20">
          <div className="flex w-full flex-col pt-28 md:pt-36 self-center md:items-end md:justify-end">
            <h1 className="w-full max-w-lg text-navy-500 z-40 mx-auto text-center">
              {/* <FadeInUp> */}
                Crafting Powerful <span className="italic text-neongreen-700">Websites</span> and
                <br className="hidden md:block"/>
                <span className="italic text-neongreen-700"> Branding</span> for Your Business
              {/* </FadeInUp> */}
            </h1>

            {/* People (on top) */}
            <div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 z-30 flex w-full items-end justify-center -gap-10">
              <Image src="/barb.webp" alt="Barb" width={350} height={450} className="-mr-8 min-w-[350px] min-h-[450px]" />
              <Image src="/isaac.webp" alt="Isaac" width={300} height={400} className="-ml-8 min-w-[300px] min-h-[400px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
