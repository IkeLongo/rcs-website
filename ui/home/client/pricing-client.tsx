"use client";

import dynamic from "next/dynamic";

const Pricing = dynamic(() => import("../../pricing/selector"), {
  ssr: false,
  loading: () => null,
});

export default function PricingClient() {
  return <Pricing />;
}