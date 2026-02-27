"use client";

import React, { useRef, useState, useEffect } from "react";
import { BentoGrid } from "@/ui/components/bento/bento-grid";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface ScrollableBentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export const ScrollableBentoGrid: React.FC<ScrollableBentoGridProps> = ({ children, className }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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
    <div className={className ? className : "max-w-6xl mx-auto"}>
      <BentoGrid ref={scrollRef}>{children}</BentoGrid>
      <div className="flex justify-center gap-3 mt-2">
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
};
