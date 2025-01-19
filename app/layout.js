"use client";

import localFont from "next/font/local";
import "./globals.css";

import React, { useState } from 'react';
import Navbar from './Navbar';
import { ActiveLinkProvider } from './ActiveLinkContext/page';

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

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ActiveLinkProvider>
          <div className="fixed top-0 z-50 w-full">
            <Navbar />
          </div>
          {children}
        </ActiveLinkProvider>
      </body>
    </html>
  );
}
