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
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
      <div className="calendly-inline-widget" data-url="https://calendly.com/isaac-longoria9136/30min" style={{ width: '100%', height: '100vh', minWidth: '320px' }}></div>
    </div>
  );
}