import { ImpactAreas, ImpactPartners, ImpactPosts } from "@/components/sections/company/ImpactSections";
import { HomeMotion } from "@/components/sections/home/HomeMotion";
import { DossierPhoto } from "@/components/sections/variants/DossierPhoto";
import { HeroDossier } from "@/components/sections/variants/HeroDossier";
import { NextPage } from "@/components/sections/variants/NextPage";
import { hero, metadata as content, trail } from "@/content/company/impact";
import { sectionMedia } from "@/content/media/sections";
import { pageMetadata } from "@/lib/page-metadata";

// Content: docs/COMPANY_PRICING_CONTENT_CONTRACT.md. The source page has no closing CTA band.
export const metadata = pageMetadata(content);

export default function ImpactPage() {
  return (
    <>
      <HeroDossier content={hero} trail={trail} aside={<DossierPhoto photo={sectionMedia.officeElSalvador} eager />} />
      <ImpactAreas />
      <ImpactPosts />
      <ImpactPartners />
      <NextPage group="Company" current={content.path} />
      <HomeMotion />
    </>
  );
}
