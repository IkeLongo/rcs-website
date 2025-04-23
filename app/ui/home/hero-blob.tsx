"use client";

import Image from "next/image";

export default function HeroBlob() {
  return (
    <picture>
      {/* XL Screens */}
      <source
        srcSet="/home-hero-blob-xl.webp"
        type="image/webp"
        media="(min-width: 1280px)"
      />
      <source
        srcSet="/home-hero-blob-xl.svg"
        type="image/svg+xml"
        media="(min-width: 1280px)"
      />

      {/* Tablet Screens */}
      <source
        srcSet="/home-hero-blob-tablet.webp"
        type="image/webp"
        media="(min-width: 768px)"
      />
      <source
        srcSet="/home-hero-blob-tablet.svg"
        type="image/svg+xml"
        media="(min-width: 768px)"
      />

      {/* Mobile Screens */}
      <source
        srcSet="/home-hero-blob.webp"
        type="image/webp"
      />
      <source
        srcSet="/home-hero-blob.svg"
        type="image/svg+xml"
      />

      {/* Fallback Image */}
      <Image
        src="/home-hero-blob.svg"
        alt="Colorful background blob image"
        width={950}
        height={732}
        priority
        className="absolute left-auto -right-20 top-0 max-h-[800px]
                   md:w-[450px] md:h-[647px] md:-right-2 md:-top-32 
                   lg:w-[750px] lg:h-[732px] lg:-right-20 
                   xl:w-[950px] xl:h-auto xl:-right-48"
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
    </picture>
  );
}
