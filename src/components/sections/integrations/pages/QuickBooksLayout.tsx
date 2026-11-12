import { systemPageCopy } from "@/content/integrations/systems";
import { ProductHero } from "../../product/ProductHero";
import { FeatureIndex } from "../../variants/FeatureIndex";
import { QuickBooksHeroMedia } from "../quickbooks/QuickBooksHeroMedia";
import { QuickBooksSync } from "../quickbooks/QuickBooksSync";
import { QuickBooksCertified } from "../SystemExtras";
import type { SystemLayoutProps } from "../SystemPage";

/**
 * QuickBooks, "certified": split hero on the brand band with the sync panel
 * and the App Store rating, the certified listings and review right after,
 * the two-way orbit with the Desktop / Online switch, then the features
 * explorer over the page photo.
 */
export function QuickBooksLayout({ system, photo }: SystemLayoutProps) {
  return (
    <>
      <ProductHero
        content={system.hero}
        icon="sync"
        location={`${system.slug}-hero`}
        trail={systemPageCopy.trail}
        media={<QuickBooksHeroMedia system={system} />}
      />
      <QuickBooksCertified />
      <QuickBooksSync system={system} />
      <FeatureIndex id="features-title" section={{ ...systemPageCopy.features(system.name), items: system.features }} photo={photo} />
    </>
  );
}
