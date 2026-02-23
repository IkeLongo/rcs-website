"use client";

// app/ui/sections/PortfolioBentoSection.tsx
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { BentoGrid } from "@/app/ui/components/bento/bento-grid";
import { ScrollableBentoGrid } from "@/app/ui/components/bento/scrollable-bento-grid";
import { BentoGridItemAnimation } from "@/app/ui/components/bento/bento-grid-client";
import { IconChefHat, IconCross, IconBolt, IconBarbell, IconChevronLeft, IconChevronRight, IconBallBaseball, IconShirt } from "@tabler/icons-react";
import { BicepsFlexed } from 'lucide-react';
import PortfolioModal from ".././portfolio-modal";

import type { BrandingPortfolioItem, PortfolioBadgeColor } from "@/app/lib/portfolio/branding";

function iconFor(key: BrandingPortfolioItem["iconKey"]) {
  switch (key) {
    case "bolt":
      return <IconBolt className="h-4 w-4 text-neutral-500" />;
    case "chef":
      return <IconChefHat className="h-4 w-4 text-neutral-500" />;
    case "shirt":
      return <IconShirt className="h-4 w-4 text-neutral-500" />;
    case "barbell":
      return <IconBarbell className="h-4 w-4 text-neutral-500" />;
    case "baseball":
      return <IconBallBaseball className="h-4 w-4 text-neutral-500" />;
    case "biceps":
      return <BicepsFlexed className="h-4 w-4 text-neutral-500" />;
    case "cross":
      return <IconCross className="h-4 w-4 text-neutral-500" />;
    default:
      return null;
  }
}

export function PortfolioHeader({
  image,
  name,
  badgeColor = "white",
}: {
  image: string;
  name: string;
  badgeColor?: PortfolioBadgeColor;
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

export default function BrandingPortfolioBentoSectionClient({
  items,
}: {
  items: BrandingPortfolioItem[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<BrandingPortfolioItem | null>(null);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (!ref) return;

    ref.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      ref.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  // const scroll = (direction: "left" | "right") => {
  //   if (scrollRef.current) {
  //     const scrollAmount = 368; // card width (352) + gap (16)
  //     const newScrollLeft =
  //       scrollRef.current.scrollLeft +
  //       (direction === "left" ? -scrollAmount : scrollAmount);
  //     scrollRef.current.scrollTo({
  //       left: newScrollLeft,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  const onViewProject = (item: BrandingPortfolioItem) => {
    setActiveProject(item);
    setModalOpen(true);
  };

  const onCloseModal = () => {
    setModalOpen(false);
    // optional: clear after close animation
    setTimeout(() => setActiveProject(null), 150);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <ScrollableBentoGrid>
        {items.map((item) => {
          const headerNode = item.cardImage ? (
            <PortfolioHeader image={item.cardImage} name={item.name} badgeColor={item.badgeColor} />
          ) : null;

          return (
            <div
              key={item.id}
              className="block no-underline snap-start w-[352px] max-w-[calc(100vw-2rem)] h-[346px] shrink-0"
            >
              <BentoGridItemAnimation
                title={item.name}
                description={item.cardDescription ?? "View project"}
                header={headerNode}
                icon={iconFor(item.iconKey)}
                className={item.featured ? "md:col-span-2" : ""}
                onViewProject={() => onViewProject(item)}
              />
            </div>
          );
        })}
      </ScrollableBentoGrid>
      
      {/* Scroll buttons below grid */}
      {/* <div className="flex justify-center gap-3">
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
      </div> */}

      <PortfolioModal open={modalOpen} project={activeProject} onClose={onCloseModal} />
    </div>
  );
}