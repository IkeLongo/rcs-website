// app/(site)/(logo-nav)/layout.tsx

import LogoNavbar from "@/app/ui/layout/navbar/logo-navbar";
import SimpleFooter from "@/app/ui/layout/footer/simple-footer";

export default function LogoNavLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="top-4 z-50 w-full bg-blue-100">
        <LogoNavbar />
      </div>
      <div>{children}</div>
      <SimpleFooter />
    </>
  );
}