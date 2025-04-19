"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeroBlob() {
  const [blobSrc, setBlobSrc] = useState("/home-hero-blob.svg"); // Default to mobile

  useEffect(() => {
    const updateBlob = () => {
      if (window.innerWidth >= 1280) { // XL screens
        setBlobSrc("/home-hero-blob-xl.svg");
      } else if (window.innerWidth >= 768) { // Tablet
        setBlobSrc("/home-hero-blob-tablet.svg");
      } else { // Mobile
        setBlobSrc("/home-hero-blob.svg");
      }
    };

    updateBlob(); // Run on mount
    window.addEventListener("resize", updateBlob); // Update on resize

    return () => window.removeEventListener("resize", updateBlob); // Cleanup event listener
  }, []);

  return (
    <Image
      src={blobSrc}
      alt="Background Blob"
      // Set max width for XL screens
      width={950}
      height={732}
      priority
      className="absolute left-auto -right-20 top-0 max-h-[800px]
                 md:w-[450px] md:h-[647px] md:-right-2 md:-top-32 
                 lg:w-[750px] lg:h-[732px] lg:-right-20 
                 xl:w-[950px] xl:h-auto xl:-right-48"
      style={{
        maxWidth: "100%",
        height: "auto"
      }} />
  );
}
