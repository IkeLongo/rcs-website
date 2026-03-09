"use client";

import { useState } from 'react';
import Image from "next/image";
import {Button } from "@heroui/button";
import Link from 'next/link';
import NavLinks from './nav-links';
import MobileMenu from './mobile-menu';
import { TrackedCTA } from '@/app/components/analytics/tracked-cta';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentHref, setCurrentHref] = useState('/');

  const handleLogoClick = () => {
    setCurrentHref('/');
  };

  return (
    (<div className='relative w-full'>
      <div className="z-35">
        <MobileMenu />
        <div className="flex items-center justify-center">
          <div className='hidden md:w-[900px] md:flex md:flex-col md:pt-[30px] md:justify-center md:gap-[10px]'>
            <div className='flex py-[13px] px-[20px] justify-between items-center self-stretch rounded-[30px] border-[1px] bg-alice-blue-200/75 backdrop-blur-[3.5px]'>
              <Link href="/" onClick={handleLogoClick}>
                <Image
                  src="/logo-rivercity-creatives-horizontal-green-blue.png"
                  alt="Logo"
                  width={125}
                  height={100}
                  priority
                  fetchPriority="high"
                />
              </Link>
              <NavLinks 
                onClick={() => setMenuOpen(false)} // Close the menu when a link is clicked
              />
              <TrackedCTA
                href="#"
                cta_id="desktop-navbar-call-now"
                location="navbar-desktop"
                className="font-maven-pro text-white text-[14px] font-bold lg:font-normal rounded-[13px] bg-nav-bar-button py-2 px-4 lg:text-[16px] flex items-center justify-center"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  if (typeof window !== 'undefined') {
                    const result = window.confirm('Would you like to call (210) 730-6232?');
                    if (result) {
                      window.location.href = 'tel:2107306232';
                    }
                  }
                }}
              >
                Call Now
              </TrackedCTA>
              <Button
                onPress={() => setMenuOpen(false)} // Close the menu when the button is clicked
                className="hidden font-maven-pro text-white text-[14px] font-bold lg:font-normal rounded-[13px] bg-gray-500 py-2 lg:text-[16px]">
                <Link href="/login" className="h-full flex items-center justify-center">
                  Login
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>)
  );
}