// app/ui/booking/booking.tsx
"use client";

import Script from "next/script";

export function BookingWidget() {
  return (
    <div className="bg-alice-blue-500 flex flex-col w-full justify-center items-center pt-20">
      {/* GoHighLevel booking widget */}
      <div className="w-full h-full gap-8 justify-between align-center self-center p-4">
        <div className="flex flex-col w-full py-4 rounded-lg max-w-screen md:max-w-[700px] lg:max-w-[1000px] mx-auto">
          <iframe
            src="https://api.leadconnectorhq.com/widget/booking/Lfpb6Nj3LGlg36C3Y0yu"
            style={{ width: "100%", border: "none", overflow: "hidden" }}
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
