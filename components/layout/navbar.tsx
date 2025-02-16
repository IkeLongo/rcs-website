"use client";

import { useState, useEffect, useRef, useContext } from 'react';
import Image from 'next/image';
import {Button, ButtonGroup} from "@nextui-org/button";
import Link from 'next/link';
import lottie from 'lottie-web';
import menuAnimationData from '../../public/Menu.json';
import { ActiveLinkContext } from './../../app/ActiveLinkContext/page';
import {AnimationItem } from 'lottie-web';

export default function Navbar() {
  const { activeLink, setActiveLink } = useContext(ActiveLinkContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentHref, setCurrentHref] = useState('/');
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

  useEffect(() => {
    console.log('activeLink is', activeLink);
  }, [activeLink]);

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/services') {
      setActiveLink('services');
    } else if (path === '/team') {
      setActiveLink('team');
    } else if (path === '/#plan') {
      setActiveLink('plan');
    } else if (path === '/#why') {
      setActiveLink('why');
    } else {
      setActiveLink('none');
    }
  }, []);

  const toggleMenu = () => {
    if (menuOpen) {
      // Play the second half of the animation
      playerRef.current?.playSegments([30, 60], true);
    } else {
      // Play the first half of the animation and stop at frame 30
      playerRef.current?.playSegments([0, 30], true);
      setTimeout(() => {
        playerRef.current?.goToAndStop(27, true);
      }, 490); // Adjust the timing to match the duration of the first half of the animation
    }
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = (link: string, href: string) => {
    setActiveLink(link);
    setCurrentHref(href);

    console.log('href is', href);

    // Navigate to the correct page for "Services" and "Team" links
    if (link === 'services' || link === 'team') {
      window.location.href = href;
    } else if (link === 'plan' || link === 'why') {
      if (window.location.pathname !== '/') {
        window.location.href = href;
      } else {
        scrollToSection(link);
      }
    }
  };

  const handleLogoClick = () => {
    setActiveLink('none');
    setCurrentHref('/');

    //if menu is open, close it
    if (menuOpen) {
      toggleMenu();
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Adjust this value to set the padding
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className='relative w-full'>
      <div className="z-60">
        <div className='w-full align-center md:hidden'>
          <div className='absolute z-20 w-full bg-[#292732] border-x-[1px] border-gray-500'>
            <div className='flex flex-row justify-between h-[65px] px-6 pt-[10px] items-center'>
              <Link href="/" onClick={handleLogoClick}>
                <Image
                  src="/rcc-logo-menu.svg"
                  alt="Logo"
                  width={125}
                  height={100}
                />
              </Link>
              <div onClick={toggleMenu} className="cursor-pointer" id="menu-icon" style={{ height: '50px', width: '50px' }}>
                {/* The Lottie animation will be rendered here */}
              </div>
            </div>
          </div>
          <div className={`absolute top-[70px] w-full h-[250px] flex flex-col justify-between px-6 py-6 bg-[#292732] border-[1px] border-t-0 border-gray-500 rounded-b-[13px] drop-shadow-[0_14px_16.2px_rgba(0,0,0,0.25)] backdrop-blur-[7px] transition-transform duration-500 ease-in-out z-10 ${menuOpen ? '-translate-y-6' : '-translate-y-[240px]'}`}>
            <Link href="/#why" onClick={(e) => { e.preventDefault(); handleLinkClick('why', '/#why'); scrollToSection('why'); toggleMenu(); }} className="font-maven-pro text-white text-[14px] font-bold block mb-2">Why Choose Us?</Link>
            <Link href="/#plan" onClick={(e) => { e.preventDefault(); handleLinkClick('plan', '/#plan'); scrollToSection('plan'); toggleMenu(); }} className="font-maven-pro text-white text-[14px] font-bold block mb-2">Pricing</Link>
            <Link href="/services" onClick={(e) => { e.preventDefault(); handleLinkClick('services', '/services'); toggleMenu(); }} className="font-maven-pro text-white text-[14px] font-bold block mb-2">Services</Link>
            <Link href="/team" onClick={toggleMenu} className="font-maven-pro text-white text-[14px] font-bold block mb-2">Team</Link>
            <Button
              onClick={() => setMenuOpen(false)} // Close the menu when the button is clicked
              className="w-full h-[45px] font-maven-pro text-white text-[14px] font-bold rounded-[20px] bg-green-500 mt-4">
              <Link href="/booking" className="w-full h-full flex items-center justify-center">
                Book a Call
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className='hidden md:w-[700px] md:flex md:flex-col md:pt-[30px] md:justify-center md:gap-[10px]'>
            <div className='flex py-[13px] px-[20px] justify-between items-center self-stretch rounded-[30px] border-[1px] border-gray-500 bg-[#292732]/75 backdrop-blur-[3.5px]'>
              <Link href="/" onClick={handleLogoClick}>
                <Image
                  src="/rcc-logo-menu.svg"
                  alt="Logo"
                  width={125}
                  height={100}
                />
              </Link>
              <Link href="/#why" className={`font-maven-pro text-white text-[14px] ${activeLink === 'why' ? 'font-bold' : 'font-normal'} block lg:text-[16px]`} onClick={(e) => { e.preventDefault(); handleLinkClick('why', '/#why'); scrollToSection('why'); toggleMenu(); }}>Why Choose Us?</Link>
              <Link href="/#plan" className={`font-maven-pro text-white text-[14px] ${activeLink === 'plan' ? 'font-bold' : 'font-normal'} block lg:text-[16px]`} onClick={(e) => { e.preventDefault(); handleLinkClick('plan', '/#plan'); scrollToSection('plan'); toggleMenu(); }}>Pricing</Link>
              <Link href="/services" className={`font-maven-pro text-white text-[14px] ${activeLink === 'services' ? 'font-bold' : 'font-normal'} block lg:text-[16px]`} onClick={(e) => { e.preventDefault(); handleLinkClick('services', '/services'); toggleMenu(); }}>Services</Link>
              <Link href="/team" className={`font-maven-pro text-white text-[14px] ${activeLink === 'team' ? 'font-bold' : 'font-normal'} block lg:text-[16px]`} onClick={toggleMenu}>Team</Link>
              <Button
                onClick={() => setMenuOpen(false)} // Close the menu when the button is clicked
                className="font-maven-pro text-white text-[14px] font-bold lg:font-normal rounded-[13px] bg-green-500 py-2 lg:text-[16px]">
                <Link href="/booking" className="h-full flex items-center justify-center">
                  Book a Call
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}