"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

interface LottieIdleLoaderProps {
  animationData: object;
  className?: string;
  previewSrc?: string; // Static fallback image
  alt?: string;
}

const LazyLottie = dynamic(() => import("./animations"), {
  ssr: false,
  loading: () => null,
});

export default function LottieIdleLoader({
  animationData,
  className = "",
  previewSrc = "/animated-menu.svg",
  alt = "Lottie preview image",
}: LottieIdleLoaderProps) {
  const [loadLottie, setLoadLottie] = useState(false);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => setLoadLottie(true));
    } else {
      setTimeout(() => setLoadLottie(true), 200);
    }
  }, []);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {!loadLottie ? (
        <Image
          src={previewSrc}
          alt={alt}
          fill
          className="object-contain"
          priority
        />
      ) : (
        <LazyLottie
          animationData={animationData}
          className="absolute top-0 left-0 w-full h-full"
        />
      )}
    </div>
  );
}
