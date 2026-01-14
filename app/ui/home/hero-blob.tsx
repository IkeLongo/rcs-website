//"use client";

import Image from "next/image";

export default function HeroBlob() {
  return (
    <Image
      src="/home-hero-blob.webp"
      alt="Colorful background blob"
      width={950}
      height={732}
      priority // ✅ Crucial for LCP
      sizes="(max-width: 768px) 100vw,
             (max-width: 1280px) 75vw,
             50vw"
      className="absolute left-auto -right-20 top-0 max-h-[800px]
                 md:w-[450px] md:h-[647px] md:-right-2 md:-top-32 
                 lg:w-[750px] lg:h-[732px] lg:-right-20 
                 xl:w-[950px] xl:h-auto xl:-right-48"
      style={{
        maxWidth: "100%",
        height: "auto",
      }}
    />
  );
}
