"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

export function BookingModalWidget() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Resize iframe when GHL posts updated height.
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
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="w-full max-h-[70dvh] overflow-y-auto">
      <iframe
        ref={iframeRef}
        src="https://api.leadconnectorhq.com/widget/booking/Lfpb6Nj3LGlg36C3Y0yu"
        style={{
          width: "100%",
          border: "none",
          overflow: "auto",
          minHeight: "760px",
          height: "auto",
        }}
        scrolling="yes"
        id="Lfpb6Nj3LGlg36C3Y0yu_modal"
      ></iframe>
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        type="text/javascript"
        strategy="afterInteractive"
      />
    </div>
  );
}
