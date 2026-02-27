// app/ui/components/animations.tsx
"use client";

import dynamic from "next/dynamic";
import type { CSSProperties } from "react";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => null,
});

interface AnimatedLottieProps {
  animationData: object;
  className?: string;
  style?: CSSProperties;
  loop?: boolean;
  autoplay?: boolean;
}

export default function AnimatedLottie({
  animationData,
  className = "",
  style = {},
  loop = true,
  autoplay = true,
}: AnimatedLottieProps) {
  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
      style={style}
    />
  );
}