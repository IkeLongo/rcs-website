"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function AnalyticsGA4() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_ID) return;
    // Route change pageview
    // @ ts-expect-error gtag injected by GA script
    window.gtag?.("event", "page_view", { page_path: pathname });
  }, [pathname]);

  if (!GA_ID) return null;

  return (
    <>
      {/* Load GA as late as possible */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="lazyOnload"
      />
      <Script id="ga-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
