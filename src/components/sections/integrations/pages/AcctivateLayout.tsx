import { Container } from "@/components/layout/Container";
import { systemPageCopy } from "@/content/integrations/systems";
import { SectionHeader } from "../../SectionHeader";
import { ProductSection } from "../../product/ProductSection";
import { PhoneFeatures } from "../acctivate/PhoneFeatures";
import { SyncRoute } from "../acctivate/SyncRoute";
import { HeroImmersive } from "../parts/HeroImmersive";
import { SystemHeroMedia } from "../SystemHeroMedia";
import type { SystemLayoutProps } from "../SystemPage";

/**
 * Acctivate, "mobile work, connected": immersive hero over the road photo
 * with the sync panel, the sync as a route the truck drives along, and the
 * features on a phone.
 */
export function AcctivateLayout({ system, photo }: SystemLayoutProps) {
  const features = systemPageCopy.features(system.name);

  return (
    <>
      <HeroImmersive
        content={system.hero}
        icon="sync"
        location={`${system.slug}-hero`}
        trail={systemPageCopy.trail}
        photo={photo}
        panel={<SystemHeroMedia system={system} />}
      />
      <SyncRoute system={system} />
      <ProductSection labelledBy="features-title">
        <Container width="wide" className="flex flex-col gap-10">
          <SectionHeader id="features-title" eyebrow={features.eyebrow} title={features.title} />
          <PhoneFeatures items={system.features} />
        </Container>
      </ProductSection>
    </>
  );
}
