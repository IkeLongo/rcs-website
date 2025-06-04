"use client";

import { useState, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";

interface StackedCarouselItem {
  image: string;
  title: string;
  alt?: string;
  description: string;
}

interface StackedCarouselProps {
  items: StackedCarouselItem[];
  interval?: number; // ms
  className?: string;
  showDots?: boolean;
}

export default function StackedCarousel({
  items,
  interval = 3000,
  className = "",
  showDots = true,
}: StackedCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance logic
  useEffect(() => {
    if (items.length <= 1 || paused) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, interval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [items.length, interval, paused]);

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrent((prev) => (prev + 1) % items.length);
    },
    onSwipedRight: () => {
      setCurrent((prev) => (prev - 1 + items.length) % items.length);
    },
    trackMouse: true,
  });

  // Pause on touch/click and resume on release
  const handlePointerDown = () => setPaused(true);
  const handlePointerUp = () => setPaused(false);
  const handlePointerLeave = () => setPaused(false);

  if (!items || items.length === 0) return null;

  const { image, title, alt, description } = items[current];

  return (
    <div className={`relative w-full flex flex-col items-center ${className}`}>
      <div
        {...handlers}
        className="flex flex-col items-center justify-center w-full max-w-md mx-auto select-none"
      >
        <img
          src={image}
          alt={alt || title}
          className="object-fit w-20 h-auto min-h-20 p-4 mb-2 rounded-[20px] shadow-md bg-navy-500 touch-none"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          onTouchStart={handlePointerDown}
          onTouchEnd={handlePointerUp}
          draggable={false}
        />
        <h4 className="text-navy-500 font-bold text-center my-2">{title}</h4>
        <p className="text-center text-base text-gray-900 min-h-[84px] flex items-start justify-center">
          {description}
        </p>
      </div>
      {showDots && (
        <div className="flex gap-2 mt-4">
          {items.map((_, idx) => (
            <button
              key={idx}
              className={`w-2 h-2 py-0 rounded-full ${idx === current ? "bg-lime-500" : "bg-gray-300"} transition`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}