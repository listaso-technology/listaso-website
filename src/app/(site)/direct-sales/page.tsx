import { FinalCta } from "@/components/sections/home/FinalCta";
import { HomeMotion } from "@/components/sections/home/HomeMotion";
import { DriversSection } from "@/components/sections/product/direct-sales/DriversSection";
import { ConnectedSolutions } from "@/components/sections/product/direct-sales/ConnectedSolutions";
import { FeatureCategories } from "@/components/sections/product/direct-sales/FeatureCategories";
import { TruckStockPanel } from "@/components/sections/product/direct-sales/DsdHeroMedia";
import { IntegrationsBand } from "@/components/sections/product/IntegrationsBand";
import { HeroStatement } from "@/components/sections/variants/HeroStatement";
import { NextPage } from "@/components/sections/variants/NextPage";
import { sectionMedia } from "@/content/media/sections";
import { featureCategories, features, hardware, hero, metadata as content } from "@/content/products/direct-sales";
import { HardwareSection } from "@/components/sections/product/direct-sales/HardwareSection";
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
      <FeatureCategories section={features} categories={featureCategories} />
      <DriversSection />
      <HardwareSection content={hardware} />
      <ConnectedSolutions />
      <IntegrationsBand tone="alt" />
      <NextPage group="Products" current={content.path} />
      <FinalCta />
      <HomeMotion />
    </>
  );
}
