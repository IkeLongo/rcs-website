"use client";

import { useState, useEffect, useRef } from "react";

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
  interval = 4000,
  className = "",
  showDots = true,
}: StackedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance logic
  useEffect(() => {
    if (items.length <= 1) return;
    
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, interval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [items.length, interval]);

  // Navigation functions
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  // Pause auto-advance on hover
  const handleMouseEnter = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    if (items.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, interval);
    }
  };

  if (!items || items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div 
      className={`relative w-full flex flex-col items-center ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main content area */}
      <div className="relative w-full max-w-md mx-auto min-h-[220px] flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out">
          <img
            src={currentItem.image}
            alt={currentItem.alt || currentItem.title}
            className="w-20 h-20 p-4 mb-4 rounded-[20px] shadow-md bg-navy-500 object-contain"
            draggable={false}
          />
          <h4 className="!text-navy-500 font-bold text-lg mb-2">
            {currentItem.title}
          </h4>
          <p className="!text-gray-900 text-base leading-relaxed min-h-[84px] flex items-start justify-center text-center max-w-xs">
            {currentItem.description}
          </p>
        </div>
      </div>

      {/* Navigation */}
      {showDots && (
        <div className="flex items-center gap-4 mt-4">
          {/* Left Arrow */}
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50"
            onClick={goToPrevious}
            aria-label="Previous slide"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M8.5 10.5L5.5 7L8.5 3.5" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          {/* Dots */}
          <div className="flex gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full border-none transition-all duration-200 ${
                  idx === currentIndex 
                    ? "bg-lime-500 scale-110" 
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          
          {/* Right Arrow */}
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50"
            onClick={goToNext}
            aria-label="Next slide"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5.5 3.5L8.5 7L5.5 10.5" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}