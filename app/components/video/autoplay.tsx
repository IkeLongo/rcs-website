"use client";

import { useEffect, useRef } from "react";
import MuxPlayer from '@mux/mux-player-react/lazy';

export default function MitsurinHeroVideo() {
  const playerRef = useRef<any>(null);

  useEffect(() => {
    const player = playerRef.current;

    if (!player) return;

    // Ensure autoplay after mount
    const attemptPlay = async () => {
      try {
        await player.play();
      } catch (err) {
        // Autoplay blocked — this is normal on some browsers
        console.warn("Autoplay prevented:", err);
      }
    };

    attemptPlay();
  }, []);

  return (
    <div className="relative mux-bg" style={{ overflow: "hidden", aspectRatio: "16 / 9" }}>
      <MuxPlayer
        ref={playerRef}
        playbackId="Tjk5QAwHflGK9g5jdPzWE3DsAdSj5GJ5jI4bRl3oE5I"
        muted
        loop
        autoPlay
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          top: "60%",
          left: "50%",
          width: "130%",
          height: "125%",
          transform:"translate(-50%, -50%)",
          objectFit: "cover",
          pointerEvents: "none", // 🔥 prevents any interaction
        }}
      />

      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-700/50 via-transparent to-transparent" />
    </div>
  );
}
