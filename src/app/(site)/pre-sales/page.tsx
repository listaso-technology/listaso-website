import { FinalCta } from "@/components/sections/home/FinalCta";
import { HomeMotion } from "@/components/sections/home/HomeMotion";
import { IntegrationsBand } from "@/components/sections/product/IntegrationsBand";
import { OrderPanel } from "@/components/sections/product/pre-sales/PreSalesHeroMedia";
import { StoreVisit } from "@/components/sections/product/pre-sales/StoreVisit";
import { RelatedRail } from "@/components/sections/product/RelatedRail";
import { BentoFeatures } from "@/components/sections/variants/BentoFeatures";
import { HeroEditorial } from "@/components/sections/variants/HeroEditorial";
import { NextPage } from "@/components/sections/variants/NextPage";
import { preSalesMedia } from "@/content/media/pre-sales";
import { magnificMedia } from "@/content/media/magnific";
import { features, hero, metadata as content, related } from "@/content/products/pre-sales";
import { pageMetadata } from "@/lib/page-metadata";

// Content: docs/PRODUCT_CONTENT_CONTRACT.md. Layout variants: docs/SECTION_VARIANTS.md.
export const metadata = pageMetadata(content);

export default function PreSalesPage() {
  return (
    <>
      <HeroEditorial
        content={hero}
        icon="orders"
        location="pre-sales-hero"
        photo={preSalesMedia.hero}
        overlay={<OrderPanel />}
      />
      <BentoFeatures
        id="features-title"
        section={features}
        photos={[magnificMedia.stockWorker, magnificMedia.officeTeam]}
      />
      <StoreVisit />
      <RelatedRail products={related} />
      <IntegrationsBand tone="alt" />
      <NextPage group="Products" current={content.path} />
      <FinalCta />
      <HomeMotion />
    </>
  );
}
