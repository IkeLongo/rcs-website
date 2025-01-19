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
      <div className="flex flex-col w-full justify-between align-center self-center m-4">
        <Link href="/" passHref>
          <div className='flex flex-row w-full gap-2 justify-center cursor-pointer'>
            <Image
              src="/back arrow.svg"
              alt="Logo"
              width={10}
              height={10}
            />
            <p className='self-center'>Back to River City Design Studios</p>
          </div>
        </Link>
        <div className='flex flex-col w-full'>
          <h1 className='self-center'>Book a Meeting</h1>
          <div className="calendly-inline-widget w-full h-screen" data-url="https://calendly.com/isaac-longoria9136/30min" style={{ width: '100%', height: '80vh', minWidth: '320px'}}></div>
        </div>
      </div>
    </div>
  );
}