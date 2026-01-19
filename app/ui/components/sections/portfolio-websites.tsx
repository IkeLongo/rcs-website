"use client";

// app/ui/sections/PortfolioBentoSection.tsx
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "@/app/ui/components/bento/bento-grid";
import { IconChefHat, IconCross, IconBolt, IconBarbell, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { GiWeightLiftingUp } from "react-icons/gi";

// import { CountdownStandingsHeader } from "../../portfolios/headers/countdown-standings-header";

type PortfolioItem = {
  image?: string;
  name: string;
  link: string;
  description?: string;
  icon?: React.ReactNode;
  featured?: boolean;
  accentClass?: string;
  badgeColor?: "white" | "gray";

  /**
   * Optional per-item header override.
   * If provided, it replaces the default PortfolioHeader.
   */
  header?: React.ReactNode;
};

function PortfolioHeader({
  image,
  name,
  badgeColor = "white",
}: {
  image: string;
  name: string;
  badgeColor?: "white" | "gray";
}) {
  return (
    <div className="relative w-full h-[210px] rounded-xl overflow-hidden">
      <Image
        src={image}
        alt={`${name} preview`}
        fill
        sizes="352px"
        className="object-cover object-center"
        draggable={false}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div
        className={
          `absolute left-3 top-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1 text-xs ` +
          (badgeColor === "gray" ? "text-neutral-800" : "text-white")
        }
      >
        Website
      </div>
    </div>
  );
}

const portfolioItems: PortfolioItem[] = [
  {
    image: "/portfolio-countdown-fantasy-image.webp",
    name: "Countdown Fantasy Sports",
    link: "https://countdownfantasy.com",
    description: "Fantasy tournament hub with live standings + team pages.",
    icon: <IconBolt className="h-4 w-4 text-neutral-500" />,
    featured: true,
    badgeColor: "white",
  },
  {
    image: "/portfolio-maximstrong-image.webp",
    name: "Maximstrong",
    link: "https://maximstrong.com",
    description: "Gritty fitness landing page built to convert local gym leads.",
    icon: <IconBarbell className="h-4 w-4 text-neutral-500" />,
    badgeColor: "white",
  },
  {
    image: "/portfolio-mitsurin-wagyu-image.webp",
    name: "Mitsurin Wagyu",
    link: "https://mitsurinwagyu.com",
    description: "Premium Wagyu beef brand focused on craftsmanship and quality.",
    icon: <IconChefHat  className="h-4 w-4 text-neutral-500" />,
    badgeColor: "white",
  },
  {
    image: "/portfolio-collenback-strength-image.webp",
    name: "Collenback Strength",
    link: "https://collenbackstrength.com",
    description: "Personal training site centered on athlete development and coaching.",
    icon: <GiWeightLiftingUp className="h-4 w-4 text-neutral-500" />,
    badgeColor: "white",
  },
  {
    image: "/portfolio-oblate-academy-image.webp",
    name: "Oblate Academy",
    link: "https://oblateacademy.com",
    description: "Catholic education platform designed for children, teachers and families.",
    icon: <IconCross className="h-4 w-4 text-neutral-500" />,
    badgeColor: "gray",
  },
];

export default function PortfolioBentoSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      return () => {
        ref.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 368; // card width (352) + gap (16)
      const newScrollLeft =
        scrollRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <BentoGrid ref={scrollRef}>
        {portfolioItems.map((item) => {

          const headerNode =
            item.header ??
            (item.image ? (
              <PortfolioHeader image={item.image} name={item.name} badgeColor={item.badgeColor} />
            ) : null);

          return (
            <a
              key={item.name}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block no-underline snap-start w-[352px] max-w-[calc(100vw-2rem)] h-[346px] shrink-0"
            >
              <BentoGridItem
                title={item.name}
                description={item.description ?? "View project"}
                header={headerNode}
                icon={item.icon}
                className={item.featured ? "md:col-span-2" : ""}
              />
            </a>
          );
        })}
      </BentoGrid>
      
      {/* Scroll buttons below grid */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-neutral-200 hover:bg-neutral-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Scroll left"
        >
          <IconChevronLeft className="h-5 w-5 text-neutral-700" />
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-neutral-200 hover:bg-neutral-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Scroll right"
        >
          <IconChevronRight className="h-5 w-5 text-neutral-700" />
        </button>
      </div>
    </div>
  );
}
