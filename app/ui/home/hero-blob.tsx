"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeroBlob() {
  const [blobSrc, setBlobSrc] = useState("/home-hero-blob.svg"); // Default to mobile
  const [fallbackSrc, setFallbackSrc] = useState("/home-hero-blob-fallback.svg"); // Default fallback

  useEffect(() => {
    const updateBlob = () => {
      if (window.innerWidth >= 1280) {
        // XL screens
        setBlobSrc("/home-hero-blob-xl.webp");
        setFallbackSrc("/home-hero-blob-xl.png");
      } else if (window.innerWidth >= 768) {
        // Tablet
        setBlobSrc("/home-hero-blob-tablet.webp");
        setFallbackSrc("/home-hero-blob-tablet.png");
      } else {
        // Mobile
        setBlobSrc("/home-hero-blob.webp");
        setFallbackSrc("/home-hero-blob.png");
      }
    };

    updateBlob(); // Run on mount
    window.addEventListener("resize", updateBlob); // Update on resize

    return () => window.removeEventListener("resize", updateBlob); // Cleanup event listener
  }, []);

  const handleImageError = () => {
    // Use fallback image if the primary image fails to load
    setBlobSrc(fallbackSrc);
  };

  return (
    <Image
      src={blobSrc}
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
      onError={handleImageError} // Handle image load errors
    />
  );
}
