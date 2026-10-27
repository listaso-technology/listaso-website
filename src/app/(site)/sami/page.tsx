import { FinalCta } from "@/components/sections/home/FinalCta";
import { HomeMotion } from "@/components/sections/home/HomeMotion";
import { SamiHero } from "@/components/sections/product/sami/SamiHero";
import { SamiExamples, SamiFaq, SamiIncluded, SamiPricing, SamiSalesContact } from "@/components/sections/product/sami/SamiSections";
import { NextPage } from "@/components/sections/variants/NextPage";
import { metadata as content } from "@/content/products/sami";
import { pageMetadata } from "@/lib/page-metadata";

// Content: docs/PRODUCT_CONTENT_CONTRACT.md. Layout variants: docs/SECTION_VARIANTS.md.
export const metadata = pageMetadata(content);

export default function SamiPage() {
  return (
    <>
      <span hidden data-cta-scope="sami" />
      <SamiHero />
      <SamiExamples />
      <SamiIncluded />
      <SamiPricing />
      <SamiSalesContact />
      <SamiFaq />
      <NextPage group="Products" current={content.path} />
      <FinalCta />
      <HomeMotion />
    </>
  );
}
