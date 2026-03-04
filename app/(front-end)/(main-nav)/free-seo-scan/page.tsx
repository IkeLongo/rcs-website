import { Suspense } from "react";
import FreeSeoScanClient from "@/ui/home/client/free-seo-scan-client";
import SimpleFooter from "@/ui/layout/footer/simple-footer";

export const metadata = {
  title: "Free SEO Scan | RiverCity Creatives",
  description: "Run a free SEO scan and get a step-by-step fix report.",
};

export default function FreeSeoScanPage() {
  return (
    <>
      <main className="base pt-28 md:pt-28 bg-blue-100 min-h-screen">
        <Suspense fallback={null}>
          <FreeSeoScanClient />
        </Suspense>
      </main>
      <SimpleFooter />
    </>
  );
}