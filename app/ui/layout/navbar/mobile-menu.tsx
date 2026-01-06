"use client";

import Link from 'next/link';
import Image from "next/image";
import lottie from 'lottie-web';
import menuAnimationData from 'public/Menu.json';
import { AnimationItem } from 'lottie-web';
import { useEffect, useRef, useState } from 'react';
import NavLinks from './nav-links';
import {Button} from "@nextui-org/button";

export default function MobileMenu () {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const playerRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    const container = document.querySelector("#menu-icon");
    if (!container) return; // ✅ If container is null, exit early
  
    playerRef.current = lottie.loadAnimation({
      container, // ✅ Now TypeScript knows this will be an Element
      animationData: menuAnimationData,
      renderer: "svg",
      loop: false,
      autoplay: false,
    });
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
    setMenuOpen((prev) => !prev); // Toggle menu state
  };

  const handleLogoClick = () => {
    // setActiveLink('none');
    // setCurrentHref('/');

    //if menu is open, close it
    if (menuOpen) {
      toggleMenu();
    }
  };

  return (
    (<div className='w-full align-center md:hidden'>
      <div className='absolute z-20 w-full bg-navy-500 border-x-[1px] border-blue-800'>
        <div className='flex flex-row justify-between h-[65px] px-6 pt-[10px] items-center'>
          <Link href="/" onClick={handleLogoClick}>
            <Image
              src="/logo-rivercity-creatives-horizontal-green-white.png"
              alt="Logo"
              width={125}
              height={100}
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
          </Link>
          <div onClick={toggleMenu} className="cursor-pointer" id="menu-icon" style={{ height: '50px', width: '50px' }}>
            {/* The Lottie animation will be rendered here */}
          </div>
        </div>
      </div>
      <div className={`absolute top-[20px] w-full h-[300px] flex flex-col justify-between px-6 py-6 bg-navy-500 border-[1px] border-t-0 border-blue-800 rounded-b-[13px] drop-shadow-[0_14px_16.2px_rgba(0,0,0,0.25)] backdrop-blur-[7px] transition-transform duration-500 ease-in-out z-10 ${menuOpen ? 'translate-y-8' : '-translate-y-[240px]'}`}>
        <NavLinks 
          onClick={toggleMenu}  // Close the menu when a link is clicked and toggle the menu state
        />
        <Button
          onPress={() => {
            setMenuOpen(false);
            if (typeof window !== 'undefined') {
              const action = window.confirm('Would you like to call or text 210-730-6232? Click OK to call, Cancel to text.');
              if (action) {
                window.location.href = 'tel:2107306232';
              } else {
                window.location.href = 'sms:2107306232';
              }
            }
          }}
          className="font-maven-pro text-white text-[14px] font-bold lg:font-normal rounded-[13px] bg-nav-bar-button py-2 lg:text-[16px]">
          <span className="h-full flex items-center justify-center">
            Call Now
          </span>
        </Button>
      </div>
    </div>)
  );
}