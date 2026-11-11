import { FinalCta } from "@/components/sections/home/FinalCta";
import { HomeMotion } from "@/components/sections/home/HomeMotion";
import { CustomDevProcess } from "@/components/sections/product/custom-development/CustomDevSections";
import { IntegrationsBand } from "@/components/sections/product/IntegrationsBand";
import { RelatedRail } from "@/components/sections/product/RelatedRail";
import { FeatureIndex } from "@/components/sections/variants/FeatureIndex";
import { HeroCaseStudy } from "@/components/sections/variants/HeroCaseStudy";
import { NextPage } from "@/components/sections/variants/NextPage";
import { sectionMedia } from "@/content/media/sections";
import { features, hero, metadata as content, related } from "@/content/products/custom-development";
import { pageMetadata } from "@/lib/page-metadata";

// Content: docs/PRODUCT_CONTENT_CONTRACT.md. Layout variants: docs/SECTION_VARIANTS.md.
export const metadata = pageMetadata(content);

export default function CustomDevelopmentPage() {
  return (
    <>
      <HeroCaseStudy
        content={hero}
        icon="report"
        location="custom-development-hero"
        photo={sectionMedia.codeLaptop}
      />
      <FeatureIndex id="features-title" section={features} tone="alt" />
      <CustomDevProcess />
      <RelatedRail products={related} />
      <IntegrationsBand tone="alt" />
      <NextPage group="Products" current={content.path} />
      <FinalCta />
      <HomeMotion />
    </>
  );
}
