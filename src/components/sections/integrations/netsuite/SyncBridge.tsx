import type { CSSProperties } from "react";
import { BrandAsset } from "@/components/brand/BrandAsset";
import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { systemPageCopy, type IntegrationSystem } from "@/content/integrations/systems";
import { SectionHeader } from "../../SectionHeader";
import { ProductSection } from "../../product/ProductSection";
import { Direction } from "../SyncTable";
import { directionLabel, systemSummary } from "../syncData";
import styles from "./SyncBridge.module.css";

/**
 * NetSuite sync as a bridge: NetSuite on the left pillar, Listaso on the
 * right, and every row as a capsule on the deck between them, offset toward
 * where it goes, with arrows that run its way once revealed. Hovering a
 * capsule lights the pillar it comes from. Each capsule keeps its direction
 * as text.
 */
export function SyncBridge({ system }: { system: IntegrationSystem }) {
  const copy = systemPageCopy.sync(system.name);
  const { table } = systemPageCopy;

  return (
    <ProductSection labelledBy="sync-title">
      <Container width="wide" className={styles.layout}>
        <div className={styles.head}>
          <SectionHeader id="sync-title" eyebrow={copy.eyebrow} title={copy.title} />
          <p data-reveal="fade" className={styles.summary}>
            <span className={styles.summaryLabel}>{system.hero.eyebrow}</span>
            {systemSummary(system)}
          </p>
        </div>

        <div data-reveal="fade" className={styles.bridge}>
          <div aria-hidden="true" className={`${styles.pillar} ${styles.pillarSystem}`}>
            <span className={styles.pillarName}>{system.name}</span>
            <span className={styles.pillarNote}>{directionLabel("in", system)}</span>
          </div>

          <div className={styles.deck}>
            <p aria-hidden="true" className={styles.deckHead}>
              <span>{table.item}</span>
              <span>{table.direction}</span>
            </p>
            <ul className={styles.capsules}>
              {system.sync.map((row, index) => (
                <li
                  key={row.item}
                  data-direction={row.direction}
                  className={styles.capsuleRow}
                  style={{ "--i": index } as CSSProperties}
                >
                  <span className={styles.capsule}>
                    <span aria-hidden="true" className={styles.arrows}>
                      <Icon name={row.direction === "out" ? "chevron-left" : row.direction === "in" ? "chevron-right" : "sync"} size={16} />
                    </span>
                    <span className={styles.capsuleItem}>{row.item}</span>
                    <span className={styles.capsuleDirection}>
                      <Direction direction={row.direction} name={system.name} />
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div aria-hidden="true" className={`${styles.pillar} ${styles.pillarListaso}`}>
            <BrandAsset id="listaso-symbol-multicolor" height={44} alt="" className="rounded-md" />
            <span className={styles.pillarNote}>{directionLabel("out", system)}</span>
          </div>
        </div>
      </Container>
    </ProductSection>
  );
}
