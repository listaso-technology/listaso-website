import { BrandAsset } from "@/components/brand/BrandAsset";
import { Container } from "@/components/layout/Container";
import { systemPageCopy } from "@/content/integrations/systems";
import { SectionHeader } from "../../SectionHeader";
import { ProductSection } from "../../product/ProductSection";
import { SyncBridge } from "../netsuite/SyncBridge";
import { FeatureTabs } from "../parts/FeatureTabs";
import { HeroCentered } from "../parts/HeroCentered";
import { SystemHeroMedia } from "../SystemHeroMedia";
import type { SystemLayoutProps } from "../SystemPage";

/**
 * NetSuite, "field and finance, together": centred hero with the photo
 * flanked by both systems and the sync panel below it, the sync bridge
 * between the two pillars, and the features as tabs.
 */
export function NetSuiteLayout({ system, photo }: SystemLayoutProps) {
  const features = systemPageCopy.features(system.name);

  return (
    <>
      <HeroCentered
        content={system.hero}
        icon="sync"
        location={`${system.slug}-hero`}
        trail={systemPageCopy.trail}
        photo={photo}
        overlay={<SystemHeroMedia system={system} />}
        ends={[
          <BrandAsset key="listaso" id="listaso-symbol-multicolor" height={48} alt="" className="rounded-md" />,
          <span
            key="system"
            className="rounded-md border border-white/30 bg-[#04162a]/80 px-4 py-2 text-body font-bold text-white"
          >
            {system.name}
          </span>,
        ]}
      />
      <SyncBridge system={system} />
      <ProductSection labelledBy="features-title" tone="alt">
        <Container width="wide" className="flex flex-col gap-10">
          <SectionHeader id="features-title" eyebrow={features.eyebrow} title={features.title} />
          <FeatureTabs items={system.features} idPrefix="netsuite-feature" />
        </Container>
      </ProductSection>
    </>
  );
}
