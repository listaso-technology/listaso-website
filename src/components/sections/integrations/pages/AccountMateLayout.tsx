import { Container } from "@/components/layout/Container";
import { systemPageCopy } from "@/content/integrations/systems";
import { SectionHeader } from "../../SectionHeader";
import { ProductSection } from "../../product/ProductSection";
import { Marquee } from "../../variants/Marquee";
import { FeatureTimeline } from "../accountmate/FeatureTimeline";
import { SyncDial } from "../accountmate/SyncDial";
import { HeroMirror } from "../parts/HeroMirror";
import { SystemHeroMedia } from "../SystemHeroMedia";
import type { SystemLayoutProps } from "../SystemPage";

const ICONS = { in: "arrow-right", out: "arrow-left", both: "sync" } as const;

/**
 * AccountMate, "your data on the road": mirrored hero (arched photo left,
 * sync panel over its edge) with a marquee of what syncs underneath, the
 * sync dial, and the features as a scroll-filled timeline.
 */
export function AccountMateLayout({ system, photo }: SystemLayoutProps) {
  const copy = systemPageCopy.sync(system.name);
  const features = systemPageCopy.features(system.name);

  return (
    <>
      <HeroMirror
        content={system.hero}
        icon="sync"
        location={`${system.slug}-hero`}
        trail={systemPageCopy.trail}
        photo={photo}
        panel={<SystemHeroMedia system={system} />}
        strip={
          <Marquee
            items={system.sync.map((row) => ({ label: row.item, icon: ICONS[row.direction] }))}
            label={copy.eyebrow}
            tone="alt"
          />
        }
      />
      <SyncDial system={system} />
      <ProductSection labelledBy="features-title" tone="alt">
        <Container className="flex flex-col gap-10">
          <SectionHeader id="features-title" eyebrow={features.eyebrow} title={features.title} />
          <FeatureTimeline items={system.features} />
        </Container>
      </ProductSection>
    </>
  );
}
