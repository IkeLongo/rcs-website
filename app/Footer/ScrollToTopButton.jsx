"use client";

import Image from "next/image";

export default function ScrollToTopButton() {
  const scrollToTop = (e) => {
    e.preventDefault();
    const duration = 1000; // Duration in milliseconds
    const start = window.scrollY;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    const scroll = () => {
      const currentTime = 'now' in window.performance ? performance.now() : new Date().getTime();
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, start, -start, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  };

  return (
    <button className="absolute bottom-8 right-5" onClick={scrollToTop}>
      <Image
        src="/footer-arrow-up.svg"
        alt="Arrow Up Icon"
        width={30}
        height={30}
      />
    </button>
  );
};