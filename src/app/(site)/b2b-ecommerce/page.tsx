import { FinalCta } from "@/components/sections/home/FinalCta";
import { HomeMotion } from "@/components/sections/home/HomeMotion";
import { StoreFeatures } from "@/components/sections/product/b2b-ecommerce/StoreFeatures";
import { StorefrontExample } from "@/components/sections/product/b2b-ecommerce/StorefrontExample";
import { IntegrationsBand } from "@/components/sections/product/IntegrationsBand";
import { ProductHero } from "@/components/sections/product/ProductHero";
import { RelatedProducts } from "@/components/sections/product/RelatedProducts";
import { Marquee } from "@/components/sections/variants/Marquee";
import { NextPage } from "@/components/sections/variants/NextPage";
import { features, hero, metadata as content, related } from "@/content/products/b2b-ecommerce";
import { pageMetadata } from "@/lib/page-metadata";

// Content: docs/PRODUCT_CONTENT_CONTRACT.md. Layout variants: docs/SECTION_VARIANTS.md.
export const metadata = pageMetadata(content);

export default function B2bEcommercePage() {
  return (
    <>
      <ProductHero content={hero} icon="store" location="b2b-ecommerce-hero" media={<StorefrontExample />} />
      <Marquee
        items={features.items.map((item) => ({ label: item.title, icon: item.icon }))}
        label={features.eyebrow}
        rows={2}
        tone="alt"
      />
      <StoreFeatures />
      <RelatedProducts products={related} />
      <IntegrationsBand />
      <NextPage group="Products" current={content.path} />
      <FinalCta />
      <HomeMotion />
    </>
  );
}
