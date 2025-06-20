"use client";

import { useEffect } from 'react';

export async function BookingWidget() {
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
      <div className="flex flex-col w-full h-50vh justify-center items-center bg-navy-500">
  
        <div className="w-full h-full gap-8 justify-between align-center self-center px-4 pt-32">
          <div className="flex flex-col w-full bg-white py-4 rounded-lg max-w-screen md:max-w-[700px] lg:max-w-[1000px] mx-auto">
            <h1 className="text-center text-navy-500 font-maven-pro tracking-tight pt-2 pb-2 text-[22px] font-bold mx-8">
              Want to discuss our service options? Book a meeting with our team!
            </h1>
            <div
              className="calendly-inline-widget w-full h-screen"
              data-url="https://calendly.com/isaac-longoria9136/30min?hide_gdpr_banner=1primary_color=46C1E3"
              style={{ width: "100%", height: "60vh", minWidth: "320px" }}
            ></div>
          </div>
        </div>
    </div>
  );
}