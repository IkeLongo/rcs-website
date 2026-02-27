import { Suspense } from "react";
import FreeSeoScanClient from "@/ui/home/client/free-seo-scan-client";
import Footer from "@/ui/layout/footer";

export const metadata = {
  title: "Free SEO Scan | RiverCity Creatives",
  description: "Run a free SEO scan and get a step-by-step fix report.",
};

export default function FreeSeoScanPage() {
  return (
    <>
      <main className="base pt-28 md:pt-28 bg-blue-100">
        <Suspense fallback={null}>
          <FreeSeoScanClient />
        </Suspense>
      </main>
      <Footer 
        bgGradientClass='bg-footer-bg-gradient-solid'
      />
    </>
  );
}