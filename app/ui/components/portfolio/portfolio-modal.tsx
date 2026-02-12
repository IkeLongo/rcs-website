"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { IconX, IconSparkles, IconPhoto, IconPalette } from "@tabler/icons-react";
import { PortfolioHeader } from "./branding/branding-client";
import { ScrollableBentoGrid } from "../bento/scrollable-bento-grid";
import { BentoGridItemImage } from "../bento/bento-grid";

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
      <h3 className="!text-md2 font-semibold text-navy-500">{children}</h3>
    </div>
  );
}

function InfoCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl bg-lime-100/80 border border-lime-200/40 shadow-sm p-5">
      <div className="text-base font-gentium-book-plus font-semibold text-navy-500">{title}</div>
      <p className="mt-2 !text-sm !text-neutral-500 !text-left leading-relaxed">{body}</p>
      <div className="mt-3 h-[2px] w-6 rounded bg-lime-400/80" />
    </div>
  );
}

function ColorCard({
  name,
  hex,
  rgb,
  swatchClass,
}: {
  name: string;
  hex: string;
  rgb: string;
  swatchClass: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-neutral-200">
      <div className={`h-24 ${swatchClass}`} />
      <div className="p-2 md:p-4">
        <div className="text-xs font-semibold text-navy-500">{name}</div>
        <div className="text-[11px] text-neutral-700 font-maven-pro">{hex}</div>
        <div className="text-[11px] text-neutral-700 font-maven-pro">{rgb}</div>
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

  if (!open || !project) return null;

  // You can later move these into project.caseStudy
  const overviewSubtitle =
    project.description ||
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
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
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

        {/* Top bar (sticky) */}
        <div className="relative flex items-center justify-between px-6 py-4 bg-gradient-to-t from-navy-500/80 to-transparent">
          <div className="min-w-0">
            <div className="text-sm font-maven-pro font-semibold text-navy-500">Branding Project</div>
            <h2
              id="portfolio-modal-title"
              className="!text-md2 font-semibold text-navy-500 truncate"
            >
              {project.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-sm border border-neutral-200 transition"
            aria-label="Close"
          >
            <IconX className="h-5 w-5 text-navy-500" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="relative px-6 pb-6 overflow-y-auto max-h-[calc(min(90vh,860px)-72px)]">
          {/* Brand Mockups */}
          <div className="mt-2">
            <SectionHeading icon={<IconPhoto className="h-5 w-5" />}>
              Brand Mockups
            </SectionHeading>

            <ScrollableBentoGrid>
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
            </ScrollableBentoGrid>
          </div>

          {/* Logo Design */}
          <div className="mt-6">
            <SectionHeading>Logo Design</SectionHeading>

            <div className="mt-4 rounded-2xl overflow-hidden shadow-xl border border-neutral-200">
              <div className="relative bg-gradient-to-r from-[#0b1b34] to-[#0c2a47] p-6">
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {project.logos && project.logos.length > 0 ? (
                    project.logos.map((logo, idx) => (
                      <LogoCard
                        key={logo}
                        name={project.name + ' Logo ' + (idx + 1)}
                        image={logo}
                      />
                    ))
                  ) : (
                    <div className="text-neutral-400 text-center py-8 w-full col-span-4">No logos available.</div>
                  )}
                </div>
                <p className="mt-4 text-center !text-xs !text-neutral-300">
                  {project.logoDescription || "A bold, energetic logo was crafted to capture the competitive spirit of fantasy sports. The dynamic typography and lightning bolt icon evoke excitement and movement, while the vibrant electric blue color palette reinforces the brand's modern, tech-forward identity."}
                </p>
              </div>
            </div>
          </div>

          {/* Color Palette */}
          <div className="mt-6">
            <SectionHeading icon={<IconPalette className="h-5 w-5" />}>
              Color Palette
            </SectionHeading>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.colors && project.colors.length > 0 ? (
                project.colors.map((color) => (
                  <ColorCard
                    key={color.hex}
                    name={color.name}
                    hex={color.hex}
                    rgb={color.rgb}
                    swatchClass={`bg-[${color.hex}]`}
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

            <p className="!text-sm !text-neutral-500 !text-left max-w-2xl leading-relaxed">
              {overviewSubtitle}
            </p>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard
                title="The Challenge"
                body={project.challenge || "Create a premium brand that appeals to discerning diners while maintaining approachability."}
              />
              <InfoCard
                title="The Solution"
                body={project.solution || "Developed a refined visual language with classic typography and a warm color palette."}
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
              <div className="bg-gradient-to-r from-[#0b1b34] to-[#0c2a47] px-6 py-8 text-center">
                <div className="text-lg font-gentium-book-plus font-semibold text-white">
                  Interested in Similar Work?
                </div>
                <div className="mt-2 text-sm text-white/70">
                  Let’s discuss how we can create an impactful brand for your business.
                </div>

                <div className="mt-5 flex justify-center">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-lg bg-lime-300 px-5 py-3 text-sm font-semibold text-navy-500 hover:bg-lime-200 transition shadow"
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
