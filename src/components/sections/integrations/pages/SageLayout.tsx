import { systemPageCopy } from "@/content/integrations/systems";
import { HeroStatement } from "../../variants/HeroStatement";
import { FeatureStack } from "../sage/FeatureStack";
import { SyncLanes } from "../sage/SyncLanes";
import { SystemQuoteBlock } from "../SystemExtras";
import { SystemHeroMedia } from "../SystemHeroMedia";
import type { SystemLayoutProps } from "../SystemPage";

/**
 * Sage 100, "your whole operation in sync": statement hero with the photo
 * and the sync panel, the switchboard of lanes by direction, the features as a
 * stack of sticky cards and the customer review.
 */
export function SageLayout({ system, photo }: SystemLayoutProps) {
  return (
    <>
      <HeroStatement
        content={system.hero}
        icon="sync"
        location={`${system.slug}-hero`}
        trail={systemPageCopy.trail}
        photo={photo}
        overlay={<SystemHeroMedia system={system} />}
      />
      <SyncLanes system={system} />
      <FeatureStack id="features-title" section={{ ...systemPageCopy.features(system.name), items: system.features }} />
      {system.quote ? <SystemQuoteBlock quote={system.quote} /> : null}
    </>
  );
}
