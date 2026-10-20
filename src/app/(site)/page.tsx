import type { Metadata } from "next";
import { CustomerProof } from "@/components/sections/home/CustomerProof";
import { FinalCta } from "@/components/sections/home/FinalCta";
import { HomeCapabilities } from "@/components/sections/home/HomeCapabilities";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { HowItWorks } from "@/components/sections/home/HowItWorks";
import { HomeMotion } from "@/components/sections/home/HomeMotion";
import { PricingPlans } from "@/components/sections/home/PricingPlans";
import { ProofStrip } from "@/components/sections/home/ProofStrip";
import { SamiSpotlight } from "@/components/sections/home/SamiSpotlight";
import { SupportSection } from "@/components/sections/home/SupportSection";
import { homeMetadata } from "@/content/home/en";

// Content and decisions: docs/HOME_CONTENT_CONTRACT.md, DEC-013 and DEC-020.
export const metadata: Metadata = {
  title: { absolute: homeMetadata.title },
  description: homeMetadata.description,
  alternates: { canonical: homeMetadata.canonical },
  openGraph: {
    type: "website",
    url: homeMetadata.canonical,
    siteName: homeMetadata.siteName,
    title: homeMetadata.title,
    description: homeMetadata.description,
    locale: homeMetadata.locale,
  },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ProofStrip />
      <HowItWorks />
      <SamiSpotlight />
      <SupportSection />
      <HomeCapabilities />
      <CustomerProof />
      <PricingPlans />
      <FinalCta />
      <HomeMotion />
    </>
  );
}
