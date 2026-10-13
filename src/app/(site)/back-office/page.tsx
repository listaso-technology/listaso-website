import { FinalCta } from "@/components/sections/home/FinalCta";
import { HomeMotion } from "@/components/sections/home/HomeMotion";
import { DashboardPanel } from "@/components/sections/product/back-office/BackOfficeHeroMedia";
import { BetterDecisions } from "@/components/sections/product/back-office/BetterDecisions";
import { IntegrationsBand } from "@/components/sections/product/IntegrationsBand";
import { RelatedRail } from "@/components/sections/product/RelatedRail";
import { BentoFeatures } from "@/components/sections/variants/BentoFeatures";
import { HeroStatement } from "@/components/sections/variants/HeroStatement";
import { NextPage } from "@/components/sections/variants/NextPage";
import { sectionMedia } from "@/content/media/sections";
import { features, hero, metadata as content, related } from "@/content/products/back-office";
import { pageMetadata } from "@/lib/page-metadata";

// Content: docs/PRODUCT_CONTENT_CONTRACT.md. Layout variants: docs/SECTION_VARIANTS.md.
export const metadata = pageMetadata(content);

export default function BackOfficePage() {
  return (
    <>
      <HeroStatement
        content={hero}
        icon="analytics"
        location="back-office-hero"
        photo={sectionMedia.officeCharts}
        overlay={<DashboardPanel />}
      />
      <BentoFeatures
        id="features-title"
        section={features}
        photos={[sectionMedia.accountingDesk, sectionMedia.warehouseAerial]}
      />
      <BetterDecisions />
      <RelatedRail products={related} />
      <IntegrationsBand tone="alt" />
      <NextPage group="Products" current={content.path} />
      <FinalCta />
      <HomeMotion />
    </>
  );
}
