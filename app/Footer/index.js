"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer( {bgGradientClass} ) {
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
    <div className={`relative w-full h-auto shrink-0 px-8 pb-1 z-50 ${bgGradientClass}`}>
      <div className="flex w-full inline-flex justify-between items-center">
        <Link href="/" passHref>
            <Image
              src="/SiteLogo-mobile.svg"
              alt="Logo"
              width={116}
              height={26}
              className='cursor-pointer'
            />
        </Link>
        <Image
          src="/footer-app-dev.gif"
          alt="Mobile Application Developer"
          width={152}
          height={142}
          className="-mr-4"
        />
      </div>
      <div className="flex flex-col gap-[46px]">
        <div className="flex flex-col justify-center gap-[15px]">
          <h4 className="font-roboto text-[12px] font-bold">
            Contact Us
          </h4>
          <div className="flex flex-col justify-center gap-[10px]">
            <div className="flex items-center gap-3">
              <Image
                src="/email.svg"
                alt="Email Icon"
                width={20}
                height={20}
              />
              <p className="font-roboto text-[12px]">
                support@rivercitydesignco.com
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/phone.svg"
                alt="Phone Icon"
                width={20}
                height={20}
              />
              <p className="font-roboto text-[12px]">
                (210) 555-5555
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/location.svg"
                alt="Location Icon"
                width={20}
                height={20}
              />
              <p className="font-roboto text-[12px]">
                San Antonio, Texas
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-[15px]">
          <h4 className="font-roboto text-[12px] font-bold">
            Follow Us
          </h4>
          <div className="flex items-center self-stretch gap-[32px]">
            <Image
              src="/facebook.svg"
              alt="Facebook Icon"
              width={30}
              height={30}
            />
            <Image
              src="/twitter.svg"
              alt="Twitter Icon"
              width={30}
              height={30}
            />
            <Image
              src="/instagram.svg"
              alt="Instagram Icon"
              width={30}
              height={30}
            />
            <Image
              src="/messenger.svg"
              alt="Messenger Icon"
              width={30}
              height={30}
            />
            <Image
              src="/figma.svg"
              alt="Figma Icon"
              width={30}
              height={30}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-[10px] self-stretch">
            <p className="font-roboto text-[12px]">
              Privacy Policy
            </p>
            <p className="font-roboto text-[12px]">
              Terms of Use
            </p>
            <p className="font-roboto text-[12px]">
              Sales and Refunds
            </p>
            <p className="font-roboto text-[12px]">
              Legal
            </p>
            <p className="font-roboto text-[12px]">
              Site Map
            </p>
          </div>
          <div className="flex items-center justify-center">
            <p className="font-roboto text-[11px] font-light">
              © 2024 All Rights Reserved
            </p>
          </div>
        </div>
      </div>
      <button className="absolute bottom-8 right-5" onClick={scrollToTop}>
        <Image
          src="/footer-arrow-up.svg"
          alt="Arrow Up Icon"
          width={30}
          height={30}
        />
      </button>
    </div>
  );
}