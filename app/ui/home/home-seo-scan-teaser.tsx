"use client";

import { BackgroundLines } from "../components/backgrounds/background-lines";
import SeoScanForm from "../components/forms/seo-scan-form";

export default function HomeSeoScanTeaser() {
  return (
    <section className="base w-full flex items-center justify-center">
      <BackgroundLines className="flex items-center justify-center w-full h-full">
        <div className="mx-auto max-w-6xl w-full flex flex-col items-center justify-center">
          <div className="px-6 py-10 md:px-10 md:py-12 w-full">
            <div className="text-center">
              <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight !text-white">
                Run a free SEO scan on your website
              </h3>
              <p className="mt-3 text-sm md:text-base text-grey-600 max-w-2xl mx-auto">
                Instantly find SEO issues, missed opportunities, and what’s holding your site back from free, organic traffic.
              </p>
            </div>

            <SeoScanForm />
          </div>
        </div>
      </BackgroundLines>
    </section>
  );
}