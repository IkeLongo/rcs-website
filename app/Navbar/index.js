"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {Button, ButtonGroup} from "@nextui-org/button";
import Link from 'next/link';
import lottie from 'lottie-web';
import menuAnimationData from '../../public/Menu.json';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    playerRef.current = lottie.loadAnimation({
      container: document.querySelector("#menu-icon"),
      animationData: menuAnimationData,
      renderer: 'svg',
      loop: false,
      autoplay: false,
    });
  }, []);

  const toggleMenu = () => {
    if (menuOpen) {
      // Play the second half of the animation
      playerRef.current.playSegments([30, 60], true);
    } else {
      // Play the first half of the animation and stop at frame 30
      playerRef.current.playSegments([0, 30], true);
      setTimeout(() => {
        playerRef.current.goToAndStop(27, true);
      }, 490); // Adjust the timing to match the duration of the first half of the animation
    }
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="absolute z-30 sticky top-0">
      <div className='w-full align-center bg-[#292732] z-30 sticky top-0'>
        <div className='absolute z-20 w-full bg-[#292732] border-x-[1px] border-gray-500'>
          <div className='flex flex-row justify-between h-[65px] px-6 pt-[10px] items-center'>
            <Link href="/">
              <Image
                src="/SiteLogo-mobile.svg"
                alt="Logo"
                width={100}
                height={100}
              />
            </Link>
            <div onClick={toggleMenu} className="cursor-pointer" id="menu-icon" style={{ height: '50px', width: '50px' }}>
              {/* The Lottie animation will be rendered here */}
            </div>
          </div>
        </div>
        <div className={`absolute top-[70px] w-full h-[250px] flex flex-col justify-between px-6 py-6 bg-[#292732] border-[1px] border-t-0 border-gray-500 rounded-b-[13px] drop-shadow-[0_14px_16.2px_rgba(0,0,0,0.25)] backdrop-blur-[7px] transition-transform duration-500 ease-in-out z-10 ${menuOpen ? '-translate-y-6' : '-translate-y-[240px]'}`}>
          <Link href="#" className="font-maven-pro text-white text-[14px] font-bold block mb-2">Our Why</Link>
          <Link href="/services" className="font-maven-pro text-white text-[14px] font-bold block mb-2">Services</Link>
          <Link href="#" className="font-maven-pro text-white text-[14px] font-bold block mb-2">Pricing</Link>
          <Link href="/team" className="font-maven-pro text-white text-[14px] font-bold block mb-2">Team</Link>
          <Button
            href="#"
            className="w-full h-[45px] font-maven-pro text-white text-[14px] font-bold rounded-[20px] bg-green-500 mt-4">
            Book a Call
          </Button>
        </div>
      </div>
    </div>
  );
}