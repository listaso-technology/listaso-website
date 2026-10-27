import type { CSSProperties } from "react";
import { BrandAsset } from "@/components/brand/BrandAsset";
import { Icon } from "@/components/icons/Icon";
import type { IntegrationSystem } from "@/content/integrations/systems";
import styles from "./SyncFacts.module.css";

/**
 * Intro of the integration fact sheet: the system summary under the hero
 * eyebrow, with the Listaso ⇄ system link drawn as in the hero panel
 * (decorative; the system name is text, not a third-party logo).
 */
export function SyncSummary({ system }: { system: IntegrationSystem }) {
  return (
    <>
      <span aria-hidden="true" className={styles.link}>
        <BrandAsset id="listaso-symbol-multicolor" height={40} alt="" className="rounded-md" />
        <span className={styles.wire} />
        <span className={styles.hub}>
          <Icon name="sync" size={20} />
        </span>
        <span className={styles.wire} />
        <span className={styles.system}>{system.name}</span>
      </span>
      <span className={styles.summaryBlock}>
        <span className={styles.summaryLabel}>{system.hero.eyebrow}</span>
        <span className={styles.summary}>{system.hero.plan ?? system.summary}</span>
      </span>
    </>
  );
}

/**
 * Splits "Inventory (Desktop: …)" into the item and its parenthetical
 * detail, for a second muted line. Same words; items without a trailing
 * parenthetical come back whole.
 */
export function splitSyncItem(item: string): { main: string; detail: string | null } {
  const open = item.indexOf(" (");
  return open > 0 && item.endsWith(")") ? { main: item.slice(0, open), detail: item.slice(open + 1) } : { main: item, detail: null };
}

/**
 * One sync direction as rows. A parenthetical detail ("Inventory (Desktop:
 * …)") is shown as a second, muted line: same words, easier to scan. Long
 * lists flow into two columns on wide screens.
 */
export function SyncList({ items, both = false }: { items: readonly string[]; both?: boolean }) {
  return (
    <ul className={styles.list} data-columns={items.length > 5 ? "" : undefined}>
      {items.map((item, index) => {
        const { main, detail } = splitSyncItem(item);
        return (
          <li key={item} className={styles.row} style={{ "--i": index } as CSSProperties}>
            <span aria-hidden="true" className={styles.rowIcon}>
              <Icon name={both ? "sync" : "arrow-right"} size={16} />
            </span>
            <span className={styles.rowCopy}>
              <span className={styles.rowMain}>{main}</span>
              {detail ? <span className={styles.rowDetail}> {detail}</span> : null}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
