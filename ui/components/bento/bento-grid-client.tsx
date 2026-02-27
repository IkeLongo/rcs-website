"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { useState, useEffect } from "react";

function useIsDesktop(breakpointPx = 768) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpointPx}px)`);
    const onChange = () => setIsDesktop(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [breakpointPx]);

  return isDesktop;
}

export const BentoGridItemAnimation = ({
  className,
  title,
  description,
  header,
  icon,
  onViewProject,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  onViewProject?: () => void;
}) => {
  const isDesktop = useIsDesktop(); // md breakpoint
  const [open, setOpen] = useState(false);

  // Optional: close when switching to desktop (so hover controls it)
  useEffect(() => {
    if (isDesktop) setOpen(false);
  }, [isDesktop]);

  return (
    <div
      className={cn(
        "w-full h-full group/bento-animation row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-4 transition duration-200 hover:shadow-xl overflow-hidden",
        className
      )}
      onClick={() => {
        if (!isDesktop) setOpen((v) => !v);
      }}
      role={!isDesktop ? "button" : undefined}
      tabIndex={!isDesktop ? 0 : undefined}
      onKeyDown={(e) => {
        if (!isDesktop && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          setOpen((v) => !v);
        }
      }}
    >
      {header}

      <div className="relative overflow-hidden rounded-lg">
        {/* CONTENT: hover on desktop, state on mobile */}
        <div
          className={cn(
            "transition-transform duration-300",
            // desktop hover behavior
            "md:group-hover/bento-animation:-translate-x-full",
            // mobile/tablet tap behavior
            open && "translate-x-[-100%] md:translate-x-0"
          )}
        >
          {icon}
          <div className="mt-2 mb-2 font-sans font-bold text-navy-500">
            {title}
          </div>
          <div className="font-sans text-xs font-normal text-gray-700">
            {description}
          </div>
        </div>

        {/* BUTTON: hover on desktop, state on mobile */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onViewProject) onViewProject();
          }}
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-navy-500 text-white font-bold rounded-lg transition-transform duration-300",
            // start off-screen
            "translate-x-full",
            // desktop hover brings it in
            "md:group-hover/bento-animation:translate-x-0",
            // mobile/tablet tap brings it in
            open && "translate-x-0 md:translate-x-full"
          )}
        >
          View Project
        </button>
      </div>
    </div>
  );
};