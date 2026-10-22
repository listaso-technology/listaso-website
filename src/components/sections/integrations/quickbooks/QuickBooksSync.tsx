import type { CSSProperties } from "react";
import { BrandAsset } from "@/components/brand/BrandAsset";
import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { quickBooksCertified, systemPageCopy, type IntegrationSystem } from "@/content/integrations/systems";
import { SectionHeader } from "../../SectionHeader";
import { ProductSection } from "../../product/ProductSection";
import { splitSyncItem } from "../SyncFacts";
import { systemSummary } from "../syncData";
import { EditionTabs, type Edition } from "./EditionTabs";
import styles from "./QuickBooksSync.module.css";

/**
 * Edition details of a row such as "Inventory (Desktop: … · Online: …)":
 * one entry per edition, matched to the App Store listing label that names
 * it ("QuickBooks Desktop"). Same words, only split.
 */
function editionsOf(detail: string | null): Edition[] {
  if (!detail) return [];
  return detail
    .replace(/^\(|\)$/g, "")
    .split(" · ")
    .map((part) => {
      const [edition, list = ""] = part.split(": ");
      const listing = quickBooksCertified.listings.find((entry) => entry.label.endsWith(edition));
      return { key: edition, label: listing?.label ?? edition, prefix: `${edition}:`, items: list.split(", ") };
    })
    .filter((edition) => edition.items.length > 0);
}

/**
 * QuickBooks sync: everything syncs both ways, so the rows orbit a single
 * Listaso ⇄ QuickBooks hub (lines draw in when revealed; a hovered row lights
 * its line). Beside it, the summary and the one row that differs by edition
 * (Inventory), with a Desktop / Online switch. Every row is listed as text
 * with its direction for assistive technology.
 */
export function QuickBooksSync({ system }: { system: IntegrationSystem }) {
  const copy = systemPageCopy.sync(system.name);
  const rows = system.sync.map((row) => ({ ...row, ...splitSyncItem(row.item) }));
  const edition = rows.find((row) => editionsOf(row.detail).length > 1);
  const count = rows.length;

  // Ellipse positions (percent), first row at the top, rounded for hydration.
  const place = (index: number) => {
    const angle = (index / count) * 2 * Math.PI - Math.PI / 2;
    return {
      "--x": `${Math.round((50 + 40 * Math.cos(angle)) * 100) / 100}%`,
      "--y": `${Math.round((50 + 40 * Math.sin(angle)) * 100) / 100}%`,
      "--i": index,
    } as CSSProperties;
  };

  return (
    <ProductSection labelledBy="sync-title" tone="alt">
      <Container width="wide" className={styles.layout}>
        <div className={styles.aside}>
          <SectionHeader id="sync-title" eyebrow={copy.eyebrow} title={copy.title} />
          <div data-reveal="fade" className={styles.summary}>
            <span className={styles.summaryLabel}>{system.hero.eyebrow}</span>
            <p className={styles.summaryText}>{systemSummary(system)}</p>
          </div>
          {edition ? <EditionTabs title={edition.main} editions={editionsOf(edition.detail)} /> : null}
        </div>

        <div data-reveal="fade" className={styles.orbit}>
          <svg aria-hidden="true" className={styles.lines} viewBox="0 0 100 100" preserveAspectRatio="none">
            {rows.map((row, index) => {
              const angle = (index / count) * 2 * Math.PI - Math.PI / 2;
              const x = Math.round((50 + 40 * Math.cos(angle)) * 100) / 100;
              const y = Math.round((50 + 40 * Math.sin(angle)) * 100) / 100;
              return (
                <line key={row.item} x1="50" y1="50" x2={x} y2={y} pathLength={1} style={{ "--i": index } as CSSProperties} />
              );
            })}
          </svg>

          <div aria-hidden="true" className={styles.hub}>
            <BrandAsset id="listaso-symbol-multicolor" height={44} alt="" className="rounded-md" />
            <span className={styles.hubSync}>
              <Icon name="sync" size={20} />
            </span>
            <span className={styles.hubSystem}>{system.name}</span>
            <span className={styles.hubBoth}>
              <Icon name="sync" size={16} />
              {systemPageCopy.table.both}
            </span>
          </div>

          <ul aria-label={copy.eyebrow} className={styles.nodes}>
            {rows.map((row, index) => (
              <li key={row.item} className={styles.node} style={place(index)}>
                <span className={styles.nodeMain}>{row.main}</span>
                {row.detail && row !== edition ? <span className={styles.nodeDetail}>{row.detail}</span> : null}
                {row === edition ? <span className="sr-only"> {row.detail}</span> : null}
                <span className="sr-only">: {systemPageCopy.table.both}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </ProductSection>
  );
}
