// app/(site)/layout.tsx

import Navbar from "@/app/ui/layout/navbar/navbar";
import dynamic from "next/dynamic";
const Toaster = dynamic(() => import("@/app/ui/components/toaster"), { ssr: false });

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="fixed top-0 z-50 w-full">
        <Navbar />
        <Toaster />
      </main>
      <div>
        {children}
      </div>
    </>
  );
}
