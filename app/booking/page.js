"use client";

import { useEffect } from 'react';

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
      <div className="flex flex-col w-full h-screen justify-center align-center m-4">
        <h1 className='self-center'>Book a meeting</h1>
        <div className="calendly-inline-widget w-full" data-url="https://calendly.com/isaac-longoria9136/30min" style={{ width: '100%', height: '100vh', minWidth: '320px' }}></div>
      </div>
    </div>
  );
}