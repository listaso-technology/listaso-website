import { FinalCta } from "@/components/sections/home/FinalCta";
import { HomeMotion } from "@/components/sections/home/HomeMotion";
import { DriversSection } from "@/components/sections/product/direct-sales/DriversSection";
import { TruckStockPanel } from "@/components/sections/product/direct-sales/DsdHeroMedia";
import { IntegrationsBand } from "@/components/sections/product/IntegrationsBand";
import { RelatedProducts } from "@/components/sections/product/RelatedProducts";
import { FeatureIndex } from "@/components/sections/variants/FeatureIndex";
import { HeroStatement } from "@/components/sections/variants/HeroStatement";
import { Marquee } from "@/components/sections/variants/Marquee";
import { NextPage } from "@/components/sections/variants/NextPage";
import { sectionMedia } from "@/content/media/sections";
import { features, hero, metadata as content, related } from "@/content/products/direct-sales";
import { pageMetadata } from "@/lib/page-metadata";

// Content: docs/PRODUCT_CONTENT_CONTRACT.md. Layout variants: docs/SECTION_VARIANTS.md.
export const metadata = pageMetadata(content);

export default function DirectSalesPage() {
  return (
    <>
      <HeroStatement
        content={hero}
        icon="truck"
        location="direct-sales-hero"
        photo={sectionMedia.truckMountain}
        overlay={<TruckStockPanel />}
      />
      <Marquee
        items={features.items.map((item) => ({ label: item.title }))}
        label={features.eyebrow}
        rows={2}
        tone="alt"
      />
      <FeatureIndex id="features-title" section={features} />
      <DriversSection />
      <RelatedProducts products={related} />
      <IntegrationsBand tone="alt" />
      <NextPage group="Products" current={content.path} />
      <FinalCta />
      <HomeMotion />
    </>
  );
}
