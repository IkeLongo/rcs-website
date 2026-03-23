// app/ui/components/sticky-button-bottom.tsx

import { TrackedCTA } from "@/app/components/analytics/tracked-cta";
import { Calendar } from "lucide-react";
import { Source_Sans_3 } from "next/font/google";

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-sans-3",
  display: "swap",
});

export default function StickyBottomButton() {
  return (
    <div
      className="fixed z-50 flex pointer-events-none left-6 bottom-6 md:top-1/2 md:-left-16 md:bottom-auto md:transform md:-translate-y-1/2"
    >
      <div
        className="pointer-events-auto flex justify-center"
        style={{ overflow: "visible" }}
      >
        <TrackedCTA
          href="/booking"
          cta_id="sticky-bottom-connect"
          location="sticky-button-left"
          label="Book a Call"
          className="flex justify-center"
        >
          <button
            className="w-36 h-12 bg-navy-500 hover:bg-navy-800 text-white hover:text-white/70 font-bold text-base flex items-center justify-center rounded-t-full rounded-b-full shadow-lg transition md:w-32 md:h-44"
            style={{
              boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
              borderBottomLeftRadius: "9999px",
              borderBottomRightRadius: "9999px",
              borderTopLeftRadius: "9999px",
              borderTopRightRadius: "9999px",
              marginLeft: 0,
            }}
          >
            <span
              className="text-[14px] md:ml-12 md:text-[22px]"
              style={{
                display: "inline-block",
                transform: "rotate(0deg)",
                whiteSpace: "nowrap",
              }}
            >
              <span className="hidden md:inline-block" style={{ transform: "rotate(-90deg)" }}>
                Book a Call
              </span>
              <span className={`${sourceSans3.className} md:hidden flex items-center gap-1 font-medium`}>
                Book a Call
                <Calendar className="ml-1 w-5 h-5" />
              </span>
            </span>
          </button>
        </TrackedCTA>
      </div>
    </div>
  );
}