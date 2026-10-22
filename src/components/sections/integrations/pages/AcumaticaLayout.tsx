import { systemPageCopy } from "@/content/integrations/systems";
import { BentoFeatures } from "../../variants/BentoFeatures";
import { HeroCaseStudy } from "../../variants/HeroCaseStudy";
import { SpecSheet, type SpecItem } from "../../variants/SpecSheet";
import { SyncList, SyncSummary } from "../SyncFacts";
import { SyncTable } from "../SyncTable";
import { SystemHeroMedia } from "../SystemHeroMedia";
import { syncGroups } from "../syncData";
import type { SystemLayoutProps } from "../SystemPage";

/**
 * Acumatica, "one connected workflow": case-study hero with the sync panel
 * on the photo, the fact sheet (summary + one list per direction), the bento
 * of features and the lane table.
 */
export function AcumaticaLayout({ system, photo }: SystemLayoutProps) {
  const facts: SpecItem[] = syncGroups(system).map((group) => ({
    label: group.label,
    value: <SyncList items={group.rows.map((row) => row.item)} both={group.direction === "both"} />,
  }));

  return (
    <>
      <HeroCaseStudy
        content={system.hero}
        icon="sync"
        location={`${system.slug}-hero`}
        trail={systemPageCopy.trail}
        photo={photo}
        overlay={<SystemHeroMedia system={system} />}
      />
      <SpecSheet label={systemPageCopy.sync(system.name).eyebrow} intro={<SyncSummary system={system} />} items={facts} overlap={false} />
      <BentoFeatures
        id="features-title"
        section={{ ...systemPageCopy.features(system.name), items: system.features }}
        photos={[photo]}
      />
      <SyncTable system={system} />
    </>
  );
}
