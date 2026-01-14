// app/(site)/layout.tsx

import Navbar from "@/app/ui/layout/navbar/navbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed top-0 z-50 w-full">
        <Navbar />
      </div>

      <div>{children}</div>
    </>
  );
}
