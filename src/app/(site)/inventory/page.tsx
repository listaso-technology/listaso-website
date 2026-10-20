import { FinalCta } from "@/components/sections/home/FinalCta";
import { HomeMotion } from "@/components/sections/home/HomeMotion";
import { IntegrationsBand } from "@/components/sections/product/IntegrationsBand";
import { FreshProduct } from "@/components/sections/product/inventory/FreshProduct";
import { InventoryHeroMedia } from "@/components/sections/product/inventory/InventoryHeroMedia";
import { ProductHero } from "@/components/sections/product/ProductHero";
import { RelatedRail } from "@/components/sections/product/RelatedRail";
import { BentoFeatures } from "@/components/sections/variants/BentoFeatures";
import { NextPage } from "@/components/sections/variants/NextPage";
import { PixelDivider } from "@/components/sections/variants/PixelDivider";
import { sectionMedia } from "@/content/media/sections";
import { features, hero, metadata as content, related } from "@/content/products/inventory";
import { pageMetadata } from "@/lib/page-metadata";

// Content: docs/PRODUCT_CONTENT_CONTRACT.md. Layout variants: docs/SECTION_VARIANTS.md.
export const metadata = pageMetadata(content);

export default function InventoryPage() {
  return (
    <>
      <ProductHero content={hero} icon="warehouse" location="inventory-hero" media={<InventoryHeroMedia />} />
      <BentoFeatures
        id="features-title"
        section={features}
        photos={[sectionMedia.warehouseRacks, sectionMedia.tabletWarehouse]}
      />
      <PixelDivider from="page" to="alt" />
      <FreshProduct />
      <RelatedRail products={related} />
      <IntegrationsBand tone="alt" />
      <NextPage group="Products" current={content.path} />
      <FinalCta />
      <HomeMotion />
    </>
  );
}
