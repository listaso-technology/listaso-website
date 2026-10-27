import { AboutStory, AboutValues } from "@/components/sections/company/AboutSections";
import { FinalCta } from "@/components/sections/home/FinalCta";
import { HomeMotion } from "@/components/sections/home/HomeMotion";
import { ProofStrip } from "@/components/sections/home/ProofStrip";
import { DossierPhoto } from "@/components/sections/variants/DossierPhoto";
import { HeroDossier } from "@/components/sections/variants/HeroDossier";
import { LinkRows } from "@/components/sections/variants/LinkRows";
import { hero, links, metadata as content } from "@/content/company/about";
import { sectionMedia } from "@/content/media/sections";
import { pageMetadata } from "@/lib/page-metadata";

// Content: docs/COMPANY_PRICING_CONTENT_CONTRACT.md. Layout variants: docs/SECTION_VARIANTS.md.
export const metadata = pageMetadata(content);

export default function AboutPage() {
  return (
    <>
      <HeroDossier content={hero} aside={<DossierPhoto photo={sectionMedia.warehouseAerial} eager />} />
      {/* Brand figures: Homepage and About us only (DEC-016 update); same component on both. */}
      <ProofStrip />
      <AboutStory />
      <AboutValues />
      <LinkRows label="Company" links={links} />
      <FinalCta />
      <HomeMotion />
    </>
  );
}
