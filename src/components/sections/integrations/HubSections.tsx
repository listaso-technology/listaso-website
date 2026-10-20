import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { alsoSection, howSync, systemsSection } from "@/content/integrations/hub";
import { integrationSystems, systemPageCopy, type IntegrationSystem } from "@/content/integrations/systems";
import { cx } from "@/lib/utils/cx";
import backdrops from "../backdrops.module.css";
import { CheckList } from "../product/CheckList";
import { LinkCard } from "../product/LinkCard";
import { ProductSection } from "../product/ProductSection";
import { SectionHeader } from "../SectionHeader";
import { LinkIndex, type IndexLink } from "../variants/FeatureIndex";
import { IntegrationHubMedia } from "./IntegrationHubMedia";

/**
 * "Two directions, zero double entry" on the brand band: what flows into
 * Listaso on one side, what flows back on the other, and the hub diagram in
 * the middle (Symboolic's focus layout).
 */
export function SyncDirections() {
  return (
    <section
      aria-labelledby="sync-title"
      data-surface="band"
      data-story-section
      className={cx(backdrops.brandMesh, "py-16 lg:py-24")}
    >
      <Container width="wide" className="flex flex-col gap-12">
        <SectionHeader id="sync-title" eyebrow={howSync.eyebrow} title={howSync.title} />
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.15fr_1fr]">
          <SyncPanel title={howSync.toListaso.title} items={howSync.toListaso.items} icon="download" />
          <IntegrationHubMedia />
          <SyncPanel title={howSync.fromListaso.title} items={howSync.fromListaso.items} icon="sync" />
        </div>
        <p data-reveal="fade" className="max-w-3xl text-body text-fg-muted">
          {howSync.note}
        </p>
      </Container>
    </section>
  );
}

function SyncPanel({ title, items, icon }: { title: string; items: readonly string[]; icon: "download" | "sync" }) {
  return (
    <div data-reveal="fade" data-theme="light" className="flex flex-col gap-6 rounded-lg bg-surface-raised p-6 shadow-e3 lg:p-8">
      <h3 className="flex items-center gap-3 text-h4 font-semibold text-fg-heading">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-surface-soft text-icon-accent">
          <Icon name={icon} size={20} />
        </span>
        {title}
      </h3>
      <CheckList items={items} />
    </div>
  );
}

/** Direction tags for a system, from its sync table ("Both ways", etc.). */
function directionTags(system: IntegrationSystem): string[] {
  const directions = new Set(system.sync.map((row) => row.direction));
  const tags: string[] = [];
  if (directions.has("in")) tags.push(`${system.name} → Listaso`);
  if (directions.has("out")) tags.push(`Listaso → ${system.name}`);
  if (directions.has("both")) tags.push(systemPageCopy.table.both);
  return tags;
}

/** "Pick your system" as a large index with direction tags (Good Fella). */
export function SystemIndex() {
  const items: IndexLink[] = integrationSystems.map((system) => ({
    href: system.path,
    title: system.name,
    text: system.summary,
    tags: directionTags(system),
  }));

  return (
    <LinkIndex
      id="systems-title"
      copy={systemsSection}
      items={items}
      analyticsEvent="integration_card_click"
      tone="alt"
    />
  );
}

/** "Hardware and custom work": printers and custom integrations. */
export function AlsoSection() {
  return (
    <ProductSection labelledBy="also-title">
      <Container className="flex flex-col gap-12">
        <SectionHeader id="also-title" eyebrow={alsoSection.eyebrow} title={alsoSection.title} />
        <ul data-reveal="group" className="grid gap-6 md:grid-cols-2">
          {alsoSection.cards.map((card) => (
            <li data-reveal-item key={card.href} className="flex">
              <LinkCard
                href={card.href}
                title={card.title}
                text={card.text}
                icon={card.icon}
                linkLabel={systemsSection.linkLabel}
                analyticsEvent="integration_card_click"
              />
            </li>
          ))}
        </ul>
      </Container>
    </ProductSection>
  );
}
