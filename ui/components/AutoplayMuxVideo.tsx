"use client";

import { useRef, useEffect } from "react";
import MuxPlayer from "@mux/mux-player-react";

interface AutoplayMuxVideoProps {
  playbackId: string;
  className?: string;
  caption?: string;
}

/**
 * MuxPlayer configured to behave like an animated GIF:
 * - Autoplay (muted to comply with browser policies)
 * - Looped
 * - No controls
 * - Preload enabled
 */
export default function AutoplayMuxVideo({ 
  playbackId, 
  className = "",
  caption
}: AutoplayMuxVideoProps) {
  const playerRef = useRef<any>(null); // keep reading for the typed version

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const attemptPlay = async () => {
      try {
        // the underlying HTMLVideoElement
        const media: HTMLVideoElement | undefined = player.media;
        await media?.play();
      } catch (error) {
        console.warn("Autoplay prevented:", error);

        const playOnInteraction = () => {
          const media: HTMLVideoElement | undefined = playerRef.current?.media;
          media?.play().catch(() => {});
        };

        document.addEventListener("click", playOnInteraction, { once: true });
        document.addEventListener("scroll", playOnInteraction, { once: true });
      }
    };

    const t = setTimeout(attemptPlay, 100);
    return () => clearTimeout(t);
  }, [playbackId]);

  return (
    <div className={className}>
      <div className="my-6 rounded-lg overflow-hidden shadow-lg" style={{ display: 'block', lineHeight: 0 }}>
        <MuxPlayer
          ref={playerRef}
          playbackId={playbackId}
          streamType="on-demand"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ 
            width: '100%',
            height: '100%',
            display: 'block'
          }}
          nohotkeys={true}
          // Disable poster to start immediately
          poster=""
          // Disable all interactive UI
          disablePictureInPicture
          // Additional attributes to maximize autoplay success
          metadata={{
            video_title: caption || "Video"
          }}
          className="mux-bg"
        />
      </div>
      {caption && (
        <p className="text-left text-sm text-neutral-600 -mt-4 mb-6 italic">
          {caption}
        </p>
      )}
    </div>
  );
}
