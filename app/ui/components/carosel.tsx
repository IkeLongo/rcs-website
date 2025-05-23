"use client";

import { useState } from "react";
import React from "react";

interface CarouselProps {
  images: { src: string; alt?: string }[];
  interval?: number; // in ms
  className?: string;
  showDots?: boolean; // New prop to control dot visibility
}

export default function Carousel({
  images,
  interval = 4000,
  className = "",
  showDots = true, // Default to true for backward compatibility
}: CarouselProps) {
  const [current, setCurrent] = useState(0);

  // Auto-advance
  React.useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  const goTo = (idx: number) => setCurrent(idx);

  if (!images || images.length === 0) return null;

  return (
    <div className={`relative w-full flex flex-col items-center ${className}`}>
      <div className="w-full h-64 flex items-center justify-center overflow-hidden rounded-lg">
        <img
          src={images[current].src}
          alt={images[current].alt || `Carousel image ${current + 1}`}
          className="object-contain w-full h-full transition-all duration-500"
        />
      </div>
      {showDots && (
        <div className="flex gap-2 mt-4">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full ${idx === current ? "bg-lime-500" : "bg-gray-300"} transition`}
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}