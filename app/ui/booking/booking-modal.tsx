// app/ui/booking/booking-modal.tsx
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const BookingClient = dynamic(() => import("./booking-client"), { ssr: false });

export default function BookingModal({ triggerText = "Book My Free SEO Strategy Call" }: { triggerText?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="rounded-2xl bg-[#d9e64e] px-5 !py-3 font-bold text-[#091a33] shadow-sm hover:bg-[#bfee3c] transition-colors"
        onClick={() => setOpen(true)}
      >
        {triggerText}
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-500 bg-opacity-70">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 p-2"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <BookingClient />
          </div>
        </div>
      )}
    </>
  );
}
