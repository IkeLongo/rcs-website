// app/ui/components/animations.tsx

'use client';
import Lottie from "lottie-react";
import { CSSProperties } from "react";

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