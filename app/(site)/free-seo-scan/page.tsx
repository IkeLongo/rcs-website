import FreeSeoScanClient from "@/app/ui/home/client/free-seo-scan-client";
import Footer from "@/app/ui/layout/footer";

export const metadata = {
  title: "Free SEO Scan | RiverCity Creatives",
  description: "Run a free SEO scan and get a step-by-step fix report.",
};

export default function FreeSeoScanPage() {
  return (
    <>
      <main className="base pt-28 md:pt-28 bg-blue-100">
        <FreeSeoScanClient />
      </main>
      <Footer 
        bgGradientClass='bg-footer-bg-gradient-solid'
      />
    </>
  );
}