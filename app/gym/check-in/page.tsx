// app/gym/check-in/page.tsx

import { headers } from "next/headers";
import { resolveClientFromHost } from "@/lib/ghl/resolve-client";
import CheckInForm from "./CheckInForm";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member Check-In | MaximStrong",
  description: "Check in to your MaximStrong session.",
  robots: { index: false, follow: false },
};

export default async function GymCheckInPage() {
  const host = (await headers()).get("host") ?? "";
  const clientSlug = resolveClientFromHost(host) ?? "maximstrong";

  return (
    <main className="relative min-h-dvh flex flex-col items-center justify-start overflow-hidden">
      {/* Background image */}
      <Image
        src="/businesses/maximstrong/media/maximstrong-group-photo.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center"
        aria-hidden="true"
      />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black-900/90 to-black-900/70"
        aria-hidden="true"
      />

      {/* Content — sits above both layers */}
      <div className="relative z-10 flex flex-col items-center w-full px-4 pt-10 pb-16">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="relative flex justify-center items-center">
            {/* Soft white elliptical glow */}
            <div
              className="absolute w-[260px] h-[150px] bg-white/80 rounded-full blur-xl"
              aria-hidden="true"
            />
            <Image
              src="/businesses/maximstrong/logos/maximstrong-logo-ghl.png"
              alt="MaximStrong"
              width={200}
              height={70}
              className="relative z-10"
              priority
            />
          </div>
        </div>

        {/* Card */}
        <div className="w-full max-w-xl">
          <div className="rounded-2xl bg-black/60 backdrop-blur-sm border border-white/10 px-6 py-8 sm:px-10 sm:py-10 shadow-2xl">
            {/* Header */}
            <div className="mb-7 text-center">
              <h1 className="text-2xl font-extrabold tracking-tight text-white leading-tight">
                Member Check-In
              </h1>
              <p className="mt-1.5 text-sm text-zinc-400">
                Enter your info to log today's session.
              </p>
            </div>

            {/* Form — client component */}
            <CheckInForm clientSlug={clientSlug} />
          </div>

          {/* Footer note */}
          <p className="mt-6 text-center text-xs text-zinc-500">
            Questions? See the front desk.
          </p>
        </div>
      </div>
    </main>
  );
}
