"use client";

import { useState } from 'react';
import Image from "next/image";
import {Button, ButtonGroup} from "@heroui/button";
import Link from 'next/link';
import NavLinks from './nav-links';
import MobileMenu from './mobile-menu';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentHref, setCurrentHref] = useState('/');

  const handleLogoClick = () => {
    setCurrentHref('/');
  };

  return (
    (<div className='relative w-full'>
      <div className="z-60">
        <MobileMenu />
        <div className="flex items-center justify-center">
          <div className='hidden md:w-[800px] md:flex md:flex-col md:pt-[30px] md:justify-center md:gap-[10px]'>
            <div className='flex py-[13px] px-[20px] justify-between items-center self-stretch rounded-[30px] border-[1px] border-gray-500 bg-[#292732]/75 backdrop-blur-[3.5px]'>
              <Link href="/" onClick={handleLogoClick}>
                <Image
                  src="/rcc-logo-menu.svg"
                  alt="Logo"
                  width={125}
                  height={100}
                  style={{
                    maxWidth: "100%",
                    height: "auto"
                  }} />
              </Link>
              <NavLinks 
                onClick={() => setMenuOpen(false)} // Close the menu when a link is clicked
              />
              <Button
                onPress={() => setMenuOpen(false)} // Close the menu when the button is clicked
                className="font-maven-pro text-white text-[14px] font-bold lg:font-normal rounded-[13px] bg-green-500 py-2 lg:text-[16px]">
                <Link href="/booking" className="h-full flex items-center justify-center">
                  Book a Call
                </Link>
              </Button>
              <Button
                onPress={() => setMenuOpen(false)} // Close the menu when the button is clicked
                className="font-maven-pro text-white text-[14px] font-bold lg:font-normal rounded-[13px] bg-gray-500 py-2 lg:text-[16px]">
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