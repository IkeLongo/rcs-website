"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type BentoOutcomeCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;

  // parent controls layout: col-span / row-span / etc.
  className?: string;

  // optional eyebrow / label (e.g., "Outcome")
  label?: string;
};

export default function BentoOutcomeCard({
  title,
  description,
  imageSrc,
  imageAlt = title,
  className,
  label = "Outcome",
}: BentoOutcomeCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={[
        "group relative overflow-hidden rounded-3xl border border-blue-500/20 bg-navy-900/40 backdrop-blur",
        "shadow-[0_18px_60px_rgba(13,34,68,0.35)]",
        "hover:border-blue-400/40",
        "h-full",
        className ?? "",
      ].join(" ")}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-300"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={false}
        />
        {/* overlays to keep text readable */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/85 via-navy-800/70 to-blue-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-900/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative p-7 h-full flex flex-col justify-end">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-400/25 bg-navy-800/60 px-3 py-1 text-xs text-blue-100">
          <span className="h-1.5 w-1.5 rounded-full bg-babyblue-500" />
          {label}
        </div>

        <p className="mt-4 text-sm font-bold text-white leading-tight">
          {title}
        </p>

        <p className="mt-2 text-sm text-alice-blue-100 leading-relaxed max-w-[52ch]">
          {description}
        </p>

        {/* tiny “shine” accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-babyblue-500/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
    </motion.div>
  );
}
