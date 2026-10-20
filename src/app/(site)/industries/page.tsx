import { FinalCta } from "@/components/sections/home/FinalCta";
import { HomeMotion } from "@/components/sections/home/HomeMotion";
import { RelatedRail } from "@/components/sections/product/RelatedRail";
import { DossierBox } from "@/components/sections/variants/DossierBox";
import { HeroDossier } from "@/components/sections/variants/HeroDossier";
import { IndexPreview } from "@/components/sections/variants/IndexPreview";
import { NextPage } from "@/components/sections/variants/NextPage";
import { hero, industries, metadata as content, related, specialty, type IndustryId } from "@/content/company/industries";
import { productMedia } from "@/content/media/products";
import { sectionMedia } from "@/content/media/sections";
import { pageMetadata } from "@/lib/page-metadata";

// Content: docs/COMPANY_PRICING_CONTENT_CONTRACT.md. Layout variants: docs/SECTION_VARIANTS.md.
export const metadata = pageMetadata(content);

/** Placeholder photos per industry (docs/COMPANY_PRICING_CONTENT_CONTRACT.md). */
const photos = {
  food: productMedia.dsdCrates,
  beauty: sectionMedia.industryBeauty,
  housewares: sectionMedia.industryHousewares,
  packaging: sectionMedia.industryPackaging,
  wine: sectionMedia.industryWine,
  flowers: sectionMedia.industryFlowers,
  auto: sectionMedia.industryTires,
} as const satisfies Record<IndustryId, unknown>;

export default function IndustriesPage() {
  return (
    <>
      <HeroDossier
        content={hero}
        aside={
          <DossierBox
            title={specialty.title}
            status={specialty.tag}
            rows={specialty.checks.map((label) => ({ label, check: true }))}
          />
        }
      />
      <IndexPreview
        id="industries-list-title"
        label={hero.eyebrow}
        items={industries.map((industry) => ({ title: industry.title, text: industry.text, photo: photos[industry.id] }))}
      />
      <RelatedRail products={related} tone="alt" />
      <NextPage group="Company" current={content.path} />
      <FinalCta />
      <HomeMotion />
    </>
  );
}
