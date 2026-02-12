// app/ui/sections/branding.tsx  (SERVER — no "use client")
import { brandingPortfolioItems } from "@/app/lib/portfolio/branding";
import BrandingPortfolioBentoSectionClient from "./branding-client";

export default function BrandingPortfolioBentoSection() {
  return <BrandingPortfolioBentoSectionClient items={brandingPortfolioItems} />;
}
