"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Booking() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex justify-center items-center bg-grey-500">
      <div className="flex flex-col w-full gap-8 justify-between align-center self-center m-4 pt-5">
        <Link href="/" passHref>
          <div className='flex flex-row w-full gap-2 justify-center cursor-pointer'>
            <Image
              src="/back arrow.svg"
              alt="Logo"
              width={10}
              height={10}
            />
            <p className='self-center font-avenir text-[14px]'>Back to River City Design Studios</p>
          </div>
        </Link>
        <div className='flex flex-col w-full bg-white py-4 rounded-lg'>
          <h1 className='text-center text-black font-maven-pro tracking-tighter pt-2 pb-2 text-[22px] font-bold'>What to discuss our service options?<br />Book a meeting with our team!</h1>
          <div className="calendly-inline-widget w-full h-screen" data-url="https://calendly.com/isaac-longoria9136/30min?primary_color=46C1E3" style={{ width: '100%', height: '70vh', minWidth: '320px'}}></div>
        </div>
      </div>
    </div>
  );
}