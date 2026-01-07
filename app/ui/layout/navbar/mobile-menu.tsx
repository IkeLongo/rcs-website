"use client";

import Link from "next/link";
import Image from "next/image";
import menuAnimationData from "public/Menu.json";
import { useEffect, useRef, useState } from "react";
import NavLinks from "./nav-links";
import { Button } from "@nextui-org/button";
import type { AnimationItem } from "lottie-web";

export default function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    let destroyed = false;

    (async () => {
      if (!containerRef.current) return;

      // ✅ Only loads in the browser
      const lottie = (await import("lottie-web")).default;

      if (destroyed) return;

      playerRef.current = lottie.loadAnimation({
        container: containerRef.current,
        animationData: menuAnimationData,
        renderer: "svg",
        loop: false,
        autoplay: false,
      });
    })();

    return () => {
      destroyed = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  const toggleMenu = () => {
    if (menuOpen) {
      playerRef.current?.playSegments([30, 60], true);
    } else {
      playerRef.current?.playSegments([0, 30], true);
      setTimeout(() => {
        playerRef.current?.goToAndStop(27, true);
      }, 490);
    }
    setMenuOpen((prev) => !prev);
  };

  const handleLogoClick = () => {
    if (menuOpen) toggleMenu();
  };

  return (
    <div className="w-full align-center md:hidden">
      <div className="absolute z-20 w-full bg-navy-500 border-x-[1px] border-blue-800">
        <div className="flex flex-row justify-between h-[65px] px-6 pt-[10px] items-center">
          <Link href="/" onClick={handleLogoClick}>
            <Image
              src="/logo-rivercity-creatives-horizontal-green-white.png"
              alt="Logo"
              width={125}
              height={100}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Link>

          <div
            onClick={toggleMenu}
            className="cursor-pointer"
            ref={containerRef}
            style={{ height: "50px", width: "50px" }}
          />
        </div>
      </div>

      <div
        className={`absolute top-[20px] w-full h-[300px] flex flex-col justify-between px-6 py-6 bg-navy-500 border-[1px] border-t-0 border-blue-800 rounded-b-[13px] drop-shadow-[0_14px_16.2px_rgba(0,0,0,0.25)] backdrop-blur-[7px] transition-transform duration-500 ease-in-out z-10 ${
          menuOpen ? "translate-y-8" : "-translate-y-[240px]"
        }`}
      >
        <NavLinks onClick={toggleMenu} />

        <Button
          onPress={toggleMenu}
          className="w-full h-[45px] font-maven-pro text-white text-[14px] font-bold rounded-[20px] bg-green-500 mt-4"
        >
          <Link href="/booking" className="w-full h-full flex items-center justify-center">
            Book a Call
          </Link>
        </Button>
      </div>
    </div>
  );
}
