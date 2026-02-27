"use client";

import { useEffect, useState } from "react";
import AnimatedLottie from "@/ui/components/animations/lottie-animation-template";

export default function HandshakeLottie({ className = "" }: { className?: string }) {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/lottie/handshake-animation.json", { cache: "force-cache" });
        const json = await res.json();
        if (!cancelled) setAnimationData(json);
      } catch {
        // fail silently
      }
    };

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let idleId: number | null = null;

    if ("requestIdleCallback" in window) {
      idleId = (window as any).requestIdleCallback(load);
    } else {
      timeoutId = setTimeout(load, 1500);
    }

    return () => {
      cancelled = true;

      if (idleId !== null) {
        (window as any).cancelIdleCallback?.(idleId);
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  if (!animationData) return null;

  return (
    <AnimatedLottie
      animationData={animationData}
      className={className}
      style={{ maxWidth: "100%", height: "auto" }}
    />
  );
}