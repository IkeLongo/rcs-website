"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

const GHL_BOOKING_URL =
  "https://links.rivercitycreatives.com/widget/bookings/discovery-call-us";

type ChatBookingWidgetProps = {
  onConfirm: () => Promise<void>;
  disabled?: boolean;
};

export function ChatBookingWidget({ onConfirm, disabled }: ChatBookingWidgetProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // Resize iframe when GHL posts updated height
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (
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

  if (confirmed) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
        ✓ You're booked! We'll see you soon.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-navy-100 bg-white shadow-sm overflow-hidden">
      <p className="text-xs font-semibold text-navy-700 uppercase tracking-wide px-4 pt-3 pb-2">
        Book a Discovery Call
      </p>

      <div className="w-full overflow-y-auto" style={{ maxHeight: "420px" }}>
        <iframe
          ref={iframeRef}
          src={GHL_BOOKING_URL}
          title="Book a Discovery Call"
          style={{
            width: "100%",
            border: "none",
            minHeight: "400px",
            display: "block",
          }}
          scrolling="yes"
        />
        <Script
          src="https://link.msgsndr.com/js/form_embed.js"
          strategy="afterInteractive"
        />
      </div>

      <div className="px-4 pb-3 pt-2 border-t border-neutral-100">
        <button
          type="button"
          disabled={disabled || confirming}
          onClick={async () => {
            setConfirming(true);
            await onConfirm();
            setConfirmed(true);
            setConfirming(false);
          }}
          className="w-full rounded-lg bg-navy-800 py-2 text-sm font-medium text-white transition hover:bg-navy-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {confirming ? "Confirming…" : "I've Booked My Call ✓"}
        </button>
      </div>
    </div>
  );
}
