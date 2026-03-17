// app/ui/booking/booking.tsx
"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

export function BookingWidget() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Listen for messages from the iframe to adjust height dynamically
    const handleMessage = (e: MessageEvent) => {
      if (
        e.origin === "https://api.leadconnectorhq.com" &&
        e.data &&
        typeof e.data === "object" &&
        e.data.height &&
        iframeRef.current
      ) {
        iframeRef.current.style.height = `${e.data.height}px`;
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className="bg-alice-blue-500 flex flex-col w-full justify-center items-center pt-20">
      {/* GoHighLevel booking widget */}
      <div className="w-full gap-8 justify-between align-center self-center p-4">
        <div className="flex flex-col w-full py-4 rounded-lg max-w-screen md:max-w-[700px] lg:max-w-[1000px] mx-auto">
          <iframe
            ref={iframeRef}
            src="https://api.leadconnectorhq.com/widget/booking/Lfpb6Nj3LGlg36C3Y0yu"
            style={{ 
              width: "100%", 
              border: "none", 
              overflow: "hidden",
              minHeight: "1200px",
              height: "auto"
            }}
            scrolling="no"
            id="Lfpb6Nj3LGlg36C3Y0yu_1773330295777"
          ></iframe>
          <Script
            src="https://link.msgsndr.com/js/form_embed.js"
            type="text/javascript"
            strategy="afterInteractive"
          />
        </div>
      </div>
    </div>
  );
}
