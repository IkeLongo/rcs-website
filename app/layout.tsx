import localFont from "next/font/local";
import "./globals.css";
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
        <ToastContainer limit={1} theme="dark" />
        {children}
      </body>
    </html>
  );
}
