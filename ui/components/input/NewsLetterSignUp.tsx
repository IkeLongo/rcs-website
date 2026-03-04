// /ui/components/input/NewsLetterSignUp.tsx
"use client";

import { useCallback, useState } from "react";
import { TrackedCTA } from "@/ui/components/analytics/TrackedCTA";
import confetti from "canvas-confetti";
import { NewsLetterModal } from "@/ui/components/modals/NewsLetterModal";
import { track } from "@/lib/analytics/track";
import { trackFormAttempt, trackFormSuccess } from "@/lib/analytics/events";

function fireConfetti(durationMs = 1200) {
  const end = Date.now() + durationMs;
  const colors = ["#A8DD76", "#0c2244"];

  (function frame() {
    confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 }, colors });
    confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

export function NewsLetterSignUp() {
  const [email, setEmail] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // Optional: keep this only if you want a success banner *outside* the modal too
  const [submitted, setSubmitted] = useState(false);

  const openModal = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(false);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <div className="mt-7">
      <form className="flex flex-col gap-3" onSubmit={openModal}>
        <div className="relative w-full max-w-md">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-xl border-2 border-navy-500 bg-transparent h-12 pl-4 pr-[140px] text-navy-800 text-base focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
          />
          <TrackedCTA
            href="#"
            cta_id="newsletter-signup-start"
            location="newsletter-signup"
            label="Get it"
            className="absolute top-1/2 right-[6px] -translate-y-1/2 bg-lime-500 text-navy-900 font-semibold !rounded-lg px-5 h-9 shadow-sm hover:bg-lime-400 transition-colors flex items-center"
            onClick={e => {
              e.preventDefault();
              setSubmitted(false);
              setModalOpen(true);
            }}
          >
            Get it
          </TrackedCTA>
        </div>

        <p className="!text-sm !text-left !text-gray-950">No spam. Unsubscribe anytime.</p>
      </form>

      <NewsLetterModal
        open={modalOpen}
        onClose={closeModal}
        initialEmail={email}
        onSubmit={async ({ email, firstName }) => {
          trackFormAttempt({
            form_id: "newsletter",
            location: "newsletter-modal",
          });

          const res = await fetch("/api/newsletter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              firstName,
              consent: true,
              source: "newsletter-modal",
              pageUrl: window.location.href,
            }),
          });

          if (!res.ok) {
            throw new Error("Newsletter signup failed");
          }

          trackFormSuccess({
            form_id: "newsletter",
            location: "newsletter-modal",
          });

          // Only do “outside” side-effects after success:
          setSubmitted(true);
          setEmail("");
          fireConfetti(10000);

          // IMPORTANT: don't close the modal here — let it show step 3.
          // The user clicks Close on step 3.
        }}
      />

      {submitted && (
        <div className="mt-4 max-w-md rounded-xl border border-green-200 bg-green-50 p-4">
          <div className="font-semibold text-green-700">You’re in 🎉</div>
          <div className="text-green-700/90 mt-1">
            Check your inbox — the checklist is on the way.
          </div>
        </div>
      )}
    </div>
  );
}
