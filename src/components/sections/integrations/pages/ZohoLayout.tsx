import { Container } from "@/components/layout/Container";
import { systemPageCopy } from "@/content/integrations/systems";
import { SectionHeader } from "../../SectionHeader";
import { ProductSection } from "../../product/ProductSection";
import { HeroMosaic } from "../parts/HeroMosaic";
import { SystemHeroMedia } from "../SystemHeroMedia";
import { syncGroups, systemSummary } from "../syncData";
import type { SystemLayoutProps } from "../SystemPage";
import { FeatureMosaic } from "../zoho/FeatureMosaic";
import { SyncFilter } from "../zoho/SyncFilter";

/**
 * Zoho, "your field team, connected": mosaic hero on the page surface (photo
 * and sync panel as tilted tiles), the sync rows with a direction filter
 * beside the summary, and the features as a mosaic.
 */
export function ZohoLayout({ system, photo }: SystemLayoutProps) {
  const copy = systemPageCopy.sync(system.name);
  const features = systemPageCopy.features(system.name);
  const groups = syncGroups(system).map((group) => ({ direction: group.direction, label: group.label, count: group.rows.length }));

  return (
    <>
      <HeroMosaic
        content={system.hero}
        icon="sync"
        location={`${system.slug}-hero`}
        trail={systemPageCopy.trail}
        photo={photo}
        panel={<SystemHeroMedia system={system} />}
      />
      <ProductSection labelledBy="sync-title" tone="alt">
        <Container width="wide" className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-16">
          <div className="flex flex-col gap-6 lg:sticky lg:top-28">
            <SectionHeader id="sync-title" eyebrow={copy.eyebrow} title={copy.title} />
            <p data-reveal="fade" className="flex flex-col gap-2 border-t border-line-subtle pt-6">
              <span className="text-eyebrow font-bold tracking-wide text-fg-accent uppercase">{system.hero.eyebrow}</span>
              <span className="text-h4 font-bold text-fg-heading">{systemSummary(system)}</span>
            </p>
          </div>
          <SyncFilter
            rows={system.sync}
            groups={groups}
            directionText={{
              in: `${system.name} → Listaso`,
              out: `Listaso → ${system.name}`,
              both: systemPageCopy.table.both,
            }}
          />
        </Container>
      </ProductSection>
      <ProductSection labelledBy="features-title">
        <Container width="wide" className="flex flex-col gap-10">
          <SectionHeader id="features-title" eyebrow={features.eyebrow} title={features.title} />
          <FeatureMosaic items={system.features} />
        </Container>
      </ProductSection>
    </>
  );
}
