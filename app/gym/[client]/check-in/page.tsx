// app/gym/[client]/check-in/page.tsx
//
// Route: /gym/[client]/check-in
// Example: https://rivercitycreatives.com/gym/maximstrong/check-in

import { notFound } from "next/navigation";
import CheckInForm from "./CheckInForm";
import Image from "next/image";
import type { Metadata } from "next";
import { getGHLClientConfig, ClientNotFoundError } from "@/lib/ghl/clients";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ client: string }>;
}): Promise<Metadata> {
  const { client } = await params;
  let name = "Gym";
  try {
    const config = getGHLClientConfig(client);
    name = config.name;
  } catch {
    // Unknown or misconfigured client — notFound() will fire in the page body
  }
  return {
    title: `Member Check-In | ${name}`,
    description: `Check in to your ${name} session.`,
    robots: { index: false, follow: false },
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function GymCheckInPage({
  params,
}: {
  params: Promise<{ client: string }>;
}) {
  const { client } = await params;

  // In development, fall back to "maximstrong" if the slug is somehow absent.
  // With a dynamic route param this won't normally happen, but it keeps local
  // testing forgiving if the URL is mis-typed.
  const clientSlug =
    !client && process.env.NODE_ENV === "development" ? "maximstrong" : client;

  // Validate against the client registry.
  // ClientNotFoundError  → 404
  // ClientConfigError    → 500 (missing env vars — let it bubble)
  try {
    getGHLClientConfig(clientSlug);
  } catch (err) {
    if (err instanceof ClientNotFoundError) {
      notFound();
    }
    throw err;
  }

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
        className="absolute inset-0 bg-gradient-to-b from-black-900/80 to-black-900/70"
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
                Enter your info to log today&apos;s session.
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
