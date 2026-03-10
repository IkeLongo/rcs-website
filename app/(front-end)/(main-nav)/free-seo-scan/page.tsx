import { Suspense } from "react";
import FreeSeoScanClient from "@/app/components/layouts/home/client/free-seo-scan-client";
import SimpleFooter from "@/app/components/layouts/footer/simple-footer";

export const metadata = {
  title: "Free SEO Scan",
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