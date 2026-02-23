"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IconX, IconSparkles, IconPhoto, IconPalette } from "@tabler/icons-react";
import { PortfolioHeader } from "./branding/branding-client";
import { ScrollableBentoGrid } from "../bento/scrollable-bento-grid";
import { BentoGridItemImage } from "../bento/bento-grid";
import { BrandInAction } from "./branding/brand-in-action";
import { LogosSection } from "./branding/logos";

import type { BrandingPortfolioItem } from "@/app/lib/portfolio/branding";

type PortfolioModalProps = {
  open: boolean;
  project: BrandingPortfolioItem | null;
  onClose: () => void;
};

function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // prevent layout shift when scrollbar disappears
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [locked]);
}

function SectionHeading({ 
  children,
  icon
}: { 
  children: React.ReactNode,
  icon?: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-lime-200/60 text-green-500">
        {icon || <IconSparkles className="h-5 w-5" />}
      </span>
      <h3 className="!text-md2 font-semibold text-navy-500 !my-2">{children}</h3>
    </div>
  );
}

function InfoCard({
  title,
  body,
  variant = "default",
}: {
  title: string;
  body: string;
  variant?: "default" | "variant1" | "variant2";
}) {
  const bgClass = 
    variant === "variant1" 
      ? "bg-gradient-to-br from-[#F7F9EE] to-[#E8EBE0]"
      : variant === "variant2"
      ? "bg-gradient-to-br from-[#BFEE3C]/20 to-[#BFEE3C]/5"
      : "bg-lime-100/80";
  
  const borderClass = 
    variant === "variant1"
      ? "border-[#E8EBE0]/60"
      : variant === "variant2"
      ? "border-[#BFEE3C]/40"
      : "border-lime-200/40";

  const lineClass = 
    variant === "variant1"
      ? "bg-lime-400/80"
      : variant === "variant2"
      ? "bg-slate-800/30"
      : "bg-lime-400/80";

  return (
    <div className={`rounded-xl ${bgClass} border ${borderClass} shadow-sm p-5`}>
      <div className="text-md font-gentium-book-plus font-semibold text-navy-500">{title}</div>
      <p className="mt-2 !text-sm md:!text-base !text-neutral-800 !font-maven-pro !text-left leading-relaxed">{body}</p>
      <div className={`mt-3 h-[2px] w-6 rounded ${lineClass}`} />
    </div>
  );
}

function ColorCard({
  name,
  hex,
  rgb,
  swatchColor,
}: {
  name: string;
  hex: string;
  rgb: string;
  swatchColor: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl shadow-sm border border-neutral-200">
      <div className="h-24 w-full" style={{ backgroundColor: swatchColor }} />
      <div className="p-2 md:p-2 bg-white border-t-1 border-neutral-200">
        <div className="text-xs md:text-sm font-maven-pro font-semibold text-navy-500">{name}</div>
        <div className="text-[11px] md:text-[12px] text-neutral-700 font-maven-pro">{hex}</div>
        <div className="text-[11px] md:text-[12px] text-neutral-700 font-maven-pro">{rgb}</div>
      </div>
    </div>
  );
}

function LogoCard({
  name,
  image,
}: {
  name: string;
  image: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-neutral-200">
      <div className="relative w-full aspect-square">
        <Image
          src={image}
          alt={name + " logo"}
          fill
          className="object-contain object-center"
          sizes="200px"
        />
      </div>
    </div>
  );
}

export default function PortfolioModal({ open, project, onClose }: PortfolioModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const scrollableRef = useRef<HTMLDivElement | null>(null);
  const [isScrolled, setIsScrolled] = React.useState(false);

  useLockBodyScroll(open);

  // ESC to close
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // When opened, focus the panel so screen readers/users have context
  useEffect(() => {
    if (!open) return;
    setTimeout(() => panelRef.current?.focus(), 0);
  }, [open]);

  // Track scroll position to shrink top bar
  useEffect(() => {
    const scrollableEl = scrollableRef.current;
    if (!scrollableEl) return;

    const handleScroll = () => {
      setIsScrolled(scrollableEl.scrollTop > 0);
    };

    scrollableEl.addEventListener('scroll', handleScroll);
    return () => scrollableEl.removeEventListener('scroll', handleScroll);
  }, [open]);

  if (!open || !project) return null;

  // You can later move these into project.caseStudy
  const overviewSubtitle =
    project.overview ||
    "A modern brand identity designed to communicate clarity, trust, and momentum.";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      aria-labelledby="portfolio-modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <button
        aria-label="Close modal"
        className="absolute inset-0 bg-slate-800/75 backdrop-blur-[2px] !rounded-none"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className="
          relative z-[101]
          w-[min(1000px,calc(100vw-2rem))]
          max-h-[min(90vh,860px)]
          rounded-2xl
          bg-[#fbfbfb]
          shadow-2xl
          border border-white/10
          outline-none
          overflow-hidden
          animate-in fade-in zoom-in-95 duration-200
          flex flex-col
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle dotted/circle pattern background */}
        <div
          className="absolute inset-0 opacity-[0.22] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20px 20px, rgba(15,23,42,0.10) 2px, transparent 2px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Responsive CSS variables for header heights */}
        <style dangerouslySetInnerHTML={{__html: `
          .header-responsive {
            --header-expanded: 240px;
            --header-collapsed: 120px;
          }
          
          @media (min-width: 640px) {
            .header-responsive {
              --header-expanded: 320px;
              --header-collapsed: 128px;
            }
          }
          
          @media (min-width: 1024px) {
            .header-responsive {
              --header-expanded: 384px;
              --header-collapsed: 160px;
            }
          }
        `}} />

        {/* Top bar (sticky) */}
        <motion.div 
          className="relative flex flex-col items-start justify-between px-6 py-4 shrink-0 overflow-hidden border-b-2 border-white/10 header-responsive"
          animate={{ 
            height: isScrolled ? 'var(--header-collapsed)' : 'var(--header-expanded)'
          }}
          transition={{ 
            duration: 0.3,
            ease: "easeInOut"
          }}
        >
          {/* Background image */}
          {project.headerImage && (
            <Image
              src={project.headerImage}
              alt={project.name + ' header'}
              fill
              className="object-cover object-top z-0"
              priority
              sizes="100vw"
            />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-navy-500/80 to-transparent" />
          <button
            onClick={onClose}
            className="inline-flex h-10 !w-10 items-center justify-center self-end rounded-full bg-white/80 hover:bg-white shadow-sm border border-neutral-200 transition relative z-20"
            aria-label="Close"
          >
            <IconX className="h-5 w-5 text-navy-500" />
          </button>

          {/* Content */}
          <motion.div 
            className="w-full max-w-full min-w-0 mt-auto relative z-20"
            animate={{
              opacity: isScrolled ? 0.9 : 1
            }}
            transition={{
              duration: 0.3
            }}
          >
            <motion.h2
              id="portfolio-modal-title"
              className="!text-xl md:!text-2xl !font-normal !text-left truncate max-w-full overflow-hidden"
              animate={{
                fontSize: isScrolled ? "1.25rem" : "1.5rem"
              }}
              transition={{
                duration: 0.3
              }}
            >
              {project.name}
            </motion.h2>
            <motion.p 
              className="!text-sm md:!text-base !font-maven-pro !font-normal !text-left !text-gray-100 max-w-full"
              animate={{
                opacity: isScrolled ? 0 : 1,
                height: isScrolled ? 0 : "auto",
                marginTop: isScrolled ? 0 : "0.25rem"
              }}
              transition={{
                duration: 0.3
              }}
            >
              {project.headerDescription || overviewSubtitle}
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Scrollable content */}
        <div ref={scrollableRef} className="relative pt-4 px-2 md:px-6 pb-6 overflow-y-auto flex-1 min-h-0">
          {/* Brand Mockups */}
          <div className="mt-2">
            <SectionHeading icon={<IconPhoto className="h-5 w-5" />}>
              Brand in Action
            </SectionHeading>

            {/* <ScrollableBentoGrid>
              {project.mockups && project.mockups.length > 0 ? (
                project.mockups.map((mockup, idx) => (
                  <div
                    key={mockup}
                    className="block no-underline snap-start w-[352px] max-w-[calc(100vw-5.2rem)] aspect-square shrink-0"
                  >
                    <BentoGridItemImage
                      header={
                        <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                          <Image
                            src={mockup}
                            alt={`${project.name} mockup ${idx + 1}`}
                            fill
                            sizes="352px"
                            className="object-cover object-center"
                            draggable={false}
                            loading="lazy"
                          />
                        </div>
                      }
                      className={project.featured ? "md:col-span-2" : ""}
                    />
                  </div>
                ))
              ) : (
                <div className="text-neutral-400 text-center py-8 w-full">No mockups available.</div>
              )}
            </ScrollableBentoGrid> */}
          </div>

          <div className="mt-2">
            <BrandInAction projectName={project.name} mockups={project.mockups} />
          </div>

          {/* Logo Design */}
          <div className="mt-6">
            <SectionHeading>Logo Design</SectionHeading>

            {/* LogosSection replaces logo grid and description */}
            <LogosSection
              logos={project.logos}
              projectName={project.name}
              description={project.logoDescription}
              bgA={project.logoBackgrounds?.[0]}
              bgB={project.logoBackgrounds?.[1]}
            />
          </div>

          {/* Color Palette */}
          <div className="mt-6">
            <SectionHeading icon={<IconPalette className="h-5 w-5" />}>
              Color Palette
            </SectionHeading>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {project.colors && project.colors.length > 0 ? (
                project.colors.map((color) => (
                  <ColorCard
                    key={color.hex}
                    name={color.name}
                    hex={color.hex}
                    rgb={color.rgb}
                    swatchColor={color.hex}
                  />
                ))
              ) : (
                <div className="text-neutral-400 text-center py-8 w-full col-span-4">No colors available.</div>
              )}
            </div>
          </div>

          {/* Project Overview */}
          <div className="mt-6">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-10 rounded bg-lime-400/80" />
              <h3 className="!text-md2 font-semibold text-navy-500">
                Project Overview
              </h3>
            </div>

            <p className="!text-sm md:!text-base !text-neutral-800 !text-left !font-maven-pro leading-relaxed">
              {overviewSubtitle}
            </p>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard
                title="The Challenge"
                body={project.challenge || "Create a premium brand that appeals to discerning diners while maintaining approachability."}
                variant="variant1"
              />
              <InfoCard
                title="The Solution"
                body={project.solution || "Developed a refined visual language with classic typography and a warm color palette."}
                variant="variant2"
              />
            </div>
          </div>

          {/* Brand Assets */}
          {/* <div className="mt-10">
            <SectionHeading>Brand Assets</SectionHeading>

            <div className="mt-4 rounded-2xl bg-white shadow-sm border border-neutral-200 overflow-hidden">
              <div className="relative w-full aspect-[16/7]">
                <Image
                  src={project.header}
                  alt={`${project.name} brand assets preview`}
                  fill
                  className="object-cover object-center"
                  sizes="900px"
                />
              </div>
            </div>
          </div> */}

          {/* CTA */}
          <div className="mt-12">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-neutral-200">
              <div className="bg-gradient-to-b from-[#002145] via-[#003366] to-[#002145] px-6 py-8 text-center">
                <div className="text-lg font-gentium-book-plus font-semibold text-white">
                  Interested in Similar Work?
                </div>
                <div className="mt-2 text-sm lg:text-base text-white/70 font-maven-pro">
                  Let’s discuss how we can create an impactful brand for your business.
                </div>

                <div className="mt-5 flex justify-center">
                  <a
                    href="/booking"
                    className="inline-flex items-center justify-center rounded-lg bg-gradient-to-b from-[#BFEE3C] to-[#E2EAED] px-5 py-3 text-sm md:text-base font-semibold text-navy-500 hover:bg-lime-200 transition shadow"
                  >
                    Get in Touch
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="h-4" />
        </div>
      </div>
    </div>
  );
}
