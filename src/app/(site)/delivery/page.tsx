import { FinalCta } from "@/components/sections/home/FinalCta";
import { HomeMotion } from "@/components/sections/home/HomeMotion";
import { StopPanel } from "@/components/sections/product/delivery/DeliveryHeroMedia";
import { WhyItMatters } from "@/components/sections/product/delivery/WhyItMatters";
import { IntegrationsBand } from "@/components/sections/product/IntegrationsBand";
import { RelatedProducts } from "@/components/sections/product/RelatedProducts";
import { FeatureIndex } from "@/components/sections/variants/FeatureIndex";
import { HeroEditorial } from "@/components/sections/variants/HeroEditorial";
import { ImageBand } from "@/components/sections/variants/ImageBand";
import { NextPage } from "@/components/sections/variants/NextPage";
import { productMedia } from "@/content/media/products";
import { sectionMedia } from "@/content/media/sections";
import { features, hero, metadata as content, related } from "@/content/products/delivery";
import { pageMetadata } from "@/lib/page-metadata";

// Content: docs/PRODUCT_CONTENT_CONTRACT.md. Layout variants: docs/SECTION_VARIANTS.md.
export const metadata = pageMetadata(content);

export default function DeliveryPage() {
  return (
    <>
      <HeroEditorial
        content={hero}
        icon="delivery"
        location="delivery-hero"
        photo={productMedia.deliveryHandTruck}
        overlay={<StopPanel />}
      />
      <FeatureIndex id="features-title" section={features} />
      <ImageBand photo={sectionMedia.highwayAerial} />
      <WhyItMatters />
      <RelatedProducts products={related} />
      <IntegrationsBand />
      <NextPage group="Products" current={content.path} />
      <FinalCta />
      <HomeMotion />
    </>
  );
}
