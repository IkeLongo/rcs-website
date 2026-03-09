// app/(site)/layout.tsx

import Navbar from "@/app/components/layouts/navbar/navbar";

export default function MainNavLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed top-0 z-40 w-full">
        <Navbar />
      </div>

      <div>{children}</div>
    </>
  );
}
