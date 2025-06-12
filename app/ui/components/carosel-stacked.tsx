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

type Direction = "left" | "right";

export default function StackedCarousel({
  items,
  interval = 3000,
  className = "",
  showDots = true,
}: StackedCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState<number | null>(null);
  const [direction, setDirection] = useState<Direction>("left");
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance logic
  useEffect(() => {
    if (items.length <= 1 || animating) return;
    intervalRef.current = setInterval(() => {
      handleChange((current + 1) % items.length, "left");
    }, interval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line
  }, [items.length, interval, current, animating]);

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => handleChange((current + 1) % items.length, "left"),
    onSwipedRight: () => handleChange((current - 1 + items.length) % items.length, "right"),
    trackMouse: true,
  });

  // Pause on touch/click and resume on release
  const handlePointerDown = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
  const handlePointerUp = () => {};
  const handlePointerLeave = () => {};

  // Transition logic
  function handleChange(newIdx: number, dir: Direction) {
    if (animating || newIdx === current) return;
    setDirection(dir);
    setNext(newIdx);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(newIdx);
      setNext(null);
      setAnimating(false);
    }, 400); // match transition duration
  }

  if (!items || items.length === 0) return null;

  const renderItem = (item: StackedCarouselItem, key: string, animClass: string) => (
    <div
      key={key}
      className={`absolute top-0 left-0 w-full transition-transform duration-400 ease-in-out ${animClass} flex flex-col items-center justify-center`}
      style={{ zIndex: 1 }}
    >
      <img
        src={item.image}
        alt={item.alt || item.title}
        className="object-fit w-20 h-auto min-h-20 p-4 mb-2 rounded-[20px] shadow-md bg-navy-500 touch-none"
        draggable={false}
      />
      <h4 className="text-navy-500 font-bold text-center my-2">{item.title}</h4>
      <p className="text-center text-base text-gray-900 min-h-[84px] flex items-start justify-center">
        {item.description}
      </p>
    </div>
  );

  // Animation classes
  let currentAnim = "";
  let nextAnim = "";
  if (animating && next !== null) {
    if (direction === "left") {
      currentAnim = "translate-x-0 animate-slide-out-left";
      nextAnim = "translate-x-full animate-slide-in-right";
    } else {
      currentAnim = "translate-x-0 animate-slide-out-right";
      nextAnim = "-translate-x-full animate-slide-in-left";
    }
  } else {
    currentAnim = "translate-x-0";
    nextAnim = "hidden";
  }

  return (
    <div className={`relative w-full flex flex-col items-center overflow-hidden ${className}`} style={{ minHeight: 220 }}>
      <div
        {...handlers}
        className="relative w-full max-w-md mx-auto select-none min-h-[220px] h-full"
        style={{ height: 220 }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onTouchStart={handlePointerDown}
        onTouchEnd={handlePointerUp}
      >
        {/* Current item */}
        {renderItem(items[current], "current", animating ? currentAnim : "transition-none")}
        {/* Next item (only during animation) */}
        {animating && next !== null && renderItem(items[next], "next", nextAnim)}
      </div>
      {showDots && (
        <div className="flex gap-2 mt-4">
          {items.map((_, idx) => (
            <button
              key={idx}
              className={`w-2 h-2 py-0 rounded-full ${idx === current ? "bg-lime-500" : "bg-gray-300"} transition`}
              onClick={() => handleChange(idx, idx > current ? "left" : "right")}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
      {/* Tailwind custom animation styles */}
      <style jsx>{`
        .animate-slide-out-left {
          animation: slideOutLeft 0.4s forwards;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.4s forwards;
        }
        .animate-slide-out-right {
          animation: slideOutRight 0.4s forwards;
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.4s forwards;
        }
        @keyframes slideOutLeft {
          to {
            transform: translateX(-100%);
            opacity: 0.7;
          }
        }
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0.7;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOutRight {
          to {
            transform: translateX(100%);
            opacity: 0.7;
          }
        }
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0.7;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}