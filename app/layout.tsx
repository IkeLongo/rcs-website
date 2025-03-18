import localFont from "next/font/local";
import "./globals.css";
import Navbar from '@/components/layout/navbar/navbar';
//import { ActiveLinkProvider } from './ActiveLinkContext/page';
import CookieBanner from "@/components/cookie-banner";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ReactNode } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en">
      <head>
        <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden bg-gray-900`}
      >
          <CookieBanner />
          <main className="fixed top-0 z-50 w-full">
            <Navbar />
            <ToastContainer
              limit={1}
              theme="dark"
            />
          </main>
          {children}
      </body>
    </html>
  );
}
