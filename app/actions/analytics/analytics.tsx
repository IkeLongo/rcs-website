'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pageview } from '@/app/lib/gtag';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (GA_ID) {
      // Send a pageview event to Google Analytics whenever the pathname changes
      window.gtag('config', GA_ID, {
        page_path: pathname,
      });
      pageview(pathname); // Optional: If you have a custom `pageview` function
    }
  }, [pathname]);

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
