"use client";

import MobileClient from "./mobile-client";
import { MobilePricingProps } from "@/types/components";

export default function Mobile({ selectedIndex }: MobilePricingProps) {
  return <MobileClient selectedIndex={selectedIndex} />;
}