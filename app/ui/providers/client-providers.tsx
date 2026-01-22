"use client";

import ToastProvider from "@/app/ui/providers/toast-provider";

// Add other client-only providers here if you want (e.g. cookies banner, etc.)
export default function ClientProviders() {
  return (
    <>
      <ToastProvider />
    </>
  );
}