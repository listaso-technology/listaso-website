import type { ReactNode } from "react";
import { howSync } from "@/content/integrations/hub";
import type { AnyPhoto } from "../variants/HeroParts";
import { getIntegrationSystem, systemPageCopy, type IntegrationSlug } from "@/content/integrations/systems";
import { FinalCta } from "../home/FinalCta";
import { HomeMotion } from "../home/HomeMotion";
import { IntegrationsBand } from "../product/IntegrationsBand";
import { BentoFeatures } from "../variants/BentoFeatures";
import { HeroCaseStudy } from "../variants/HeroCaseStudy";
import { NextPage } from "../variants/NextPage";
import { SpecSheet, type SpecItem } from "../variants/SpecSheet";
import { SyncTable } from "./SyncTable";
import { SystemHeroMedia } from "./SystemHeroMedia";
import { QuickBooksCertified, QuickBooksRatingChip, SystemQuoteBlock } from "./SystemExtras";

type SystemPageProps = {
  slug: IntegrationSlug;
  /** Wide photo for the case-study hero (placeholder, DEC-009). */
  photo: AnyPhoto;
};

function List({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-1">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/**
 * Accounting integration page as a case study (Thomas Thorstensson): title
 * and lead split, wide photo with the sync panel, a fact sheet built from the
 * sync table, features, the full table, proof, other systems and the next
 * integration. Brand figures stay on the Homepage and About us only.
 */
export function SystemPage({ slug, photo }: SystemPageProps) {
  const system = getIntegrationSystem(slug);
  const isQuickBooks = slug === "quickbooks";
  const into = system.sync.filter((row) => row.direction === "in").map((row) => row.item);
  const out = system.sync.filter((row) => row.direction === "out").map((row) => row.item);
  const both = system.sync.filter((row) => row.direction === "both").map((row) => row.item);

  const facts: SpecItem[] = [
    { label: system.hero.eyebrow, value: system.hero.plan ?? system.summary },
    ...(into.length
      ? [{ label: howSync.toListaso.title.replace("your accounting system", system.name), value: <List items={into} /> }]
      : []),
    ...(out.length
      ? [{ label: howSync.fromListaso.title.replace("your accounting system", system.name), value: <List items={out} /> }]
      : []),
    ...(both.length ? [{ label: systemPageCopy.table.both, value: <List items={both} /> }] : []),
  ];

  const overlay: ReactNode = (
    <SystemHeroMedia system={system}>{isQuickBooks ? <QuickBooksRatingChip /> : null}</SystemHeroMedia>
  );

  return (
    <>
      <HeroCaseStudy
        content={system.hero}
        icon="sync"
        location={`${slug}-hero`}
        trail={systemPageCopy.trail}
        photo={photo}
        overlay={overlay}
      />
      <SpecSheet label={systemPageCopy.sync(system.name).eyebrow} items={facts} />
      <BentoFeatures
        id="features-title"
        section={{ ...systemPageCopy.features(system.name), items: system.features }}
        photos={[photo]}
      />
      <SyncTable system={system} />
      {isQuickBooks ? <QuickBooksCertified /> : null}
      {system.quote ? <SystemQuoteBlock quote={system.quote} /> : null}
      <IntegrationsBand
        tone={isQuickBooks || system.quote ? "alt" : "page"}
        copy={systemPageCopy.more}
        cta={systemPageCopy.moreCta}
        exclude={system.path}
      />
      <NextPage group="Integrations" current={system.path} />
      <FinalCta />
      <HomeMotion />
    </>
  );
}
