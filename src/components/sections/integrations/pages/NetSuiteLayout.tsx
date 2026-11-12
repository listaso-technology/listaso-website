import { Container } from "@/components/layout/Container";
import { systemPageCopy } from "@/content/integrations/systems";
import { SectionHeader } from "../../SectionHeader";
import { ProductSection } from "../../product/ProductSection";
import { NetSuiteHero } from "../netsuite/NetSuiteHero";
import { SyncBridge } from "../netsuite/SyncBridge";
import { FeatureTabs } from "../parts/FeatureTabs";
import type { SystemLayoutProps } from "../SystemPage";

/**
 * NetSuite, "field and finance, together": split hero (field photo | finance
 * ledger joined by a sync seam), the sync bridge between the two pillars, and
 * the features as tabs.
 */
export function NetSuiteLayout({ system, photo }: SystemLayoutProps) {
  const features = systemPageCopy.features(system.name);

  return (
    <>
      <NetSuiteHero system={system} photo={photo} />
      <SyncBridge system={system} />
      <ProductSection labelledBy="features-title" tone="alt">
        <Container width="wide" className="flex flex-col gap-10">
          <SectionHeader id="features-title" eyebrow={features.eyebrow} title={features.title} />
          <FeatureTabs items={system.features} idPrefix="netsuite-feature" system={system.name} />
        </Container>
      </ProductSection>
    </>
  );
}
