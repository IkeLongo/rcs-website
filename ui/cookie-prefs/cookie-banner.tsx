"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// This will split HeroUI Drawer/Button into its own chunk
const CookieBannerUI = dynamic(() => import("./cookie-banner-ui"), {
  loading: () => null,
});

export default function CookieBanner() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const loadedRef = useRef(false);

  useEffect(() => {
    // If we've already decided to load, do nothing.
    if (loadedRef.current) return;

    const triggerLoad = () => {
      if (loadedRef.current) return;
      loadedRef.current = true;
      setShouldLoad(true);
      cleanup();
    };

    // 1) Load after first interaction (fastest real-world win)
    const onFirstInteraction = () => triggerLoad();

    // 2) Fallback: load after a short delay (so it still appears)
    const timeoutId = window.setTimeout(triggerLoad, 2500);

    const cleanup = () => {
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
      window.removeEventListener("scroll", onFirstInteraction);
      window.removeEventListener("touchstart", onFirstInteraction);
      clearTimeout(timeoutId);
    };

    window.addEventListener("pointerdown", onFirstInteraction, { passive: true });
    window.addEventListener("keydown", onFirstInteraction);
    window.addEventListener("scroll", onFirstInteraction, { passive: true });
    window.addEventListener("touchstart", onFirstInteraction, { passive: true });

    return cleanup;
  }, []);

  // Nothing loads until interaction or timeout fires
  if (!shouldLoad) return null;

  return <CookieBannerUI />;
}
