import { CareersBenefits, CareersCulture, CareersOpenings } from "@/components/sections/company/CareersSections";
import { HomeMotion } from "@/components/sections/home/HomeMotion";
import { HeroDossier } from "@/components/sections/variants/HeroDossier";
import { NextPage } from "@/components/sections/variants/NextPage";
import { hero, metadata as content, trail } from "@/content/company/careers";
import { pageMetadata } from "@/lib/page-metadata";

// Content: docs/COMPANY_PRICING_CONTENT_CONTRACT.md. The source page has no closing CTA band.
export const metadata = pageMetadata(content);

export default function CareersPage() {
  return (
    <>
      <HeroDossier content={hero} trail={trail} />
      <CareersCulture />
      <CareersBenefits />
      <CareersOpenings />
      <NextPage group="Company" current={content.path} />
      <HomeMotion />
    </>
  );
}
