import type { CSSProperties } from "react";
import { BrandAsset } from "@/components/brand/BrandAsset";
import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { systemPageCopy, type IntegrationSystem } from "@/content/integrations/systems";
import { cx } from "@/lib/utils/cx";
import { SectionHeader } from "../../SectionHeader";
import { ProductSection } from "../../product/ProductSection";
import { splitSyncItem } from "../SyncFacts";
import { syncGroups, systemSummary } from "../syncData";
import styles from "./SyncLanes.module.css";

const ICONS = { in: "arrow-right", out: "arrow-left", both: "sync" } as const;

/**
 * Sage 100 sync as a switchboard: Sage 100 and Listaso as two pillars and
 * one horizontal lane per direction between them (from Sage, both ways, from
 * Listaso). Each lane carries its rows as chips over a track whose pulses
 * run the data's way: once when the board reveals, and continuously while
 * the lane is hovered. Each lane is a list headed by its direction.
 */
export function SyncLanes({ system }: { system: IntegrationSystem }) {
  const copy = systemPageCopy.sync(system.name);
  const order = ["in", "both", "out"] as const;
  const groups = syncGroups(system).sort((a, b) => order.indexOf(a.direction) - order.indexOf(b.direction));

  return (
    <ProductSection labelledBy="sync-title">
      <Container width="wide" className={styles.layout}>
        <div className={styles.head}>
          <SectionHeader id="sync-title" eyebrow={copy.eyebrow} title={copy.title} />
          <p data-reveal="fade" className={styles.summary}>
            <span className={styles.summaryLabel}>{system.hero.eyebrow}</span>
            <span className={styles.summaryText}>{systemSummary(system)}</span>
          </p>
        </div>

        <div data-reveal="fade" className={styles.board}>
          <div aria-hidden="true" className={cx(styles.pillar, styles.pillarSystem)}>
            <span className={styles.pillarName}>{system.name}</span>
          </div>

          <div className={styles.lanes}>
            {groups.map((group, laneIndex) => (
              <section
                key={group.direction}
                aria-label={group.label}
                className={cx(styles.lane, styles[group.direction])}
                style={{ "--lane-i": laneIndex } as CSSProperties}
              >
                <h3 className={styles.laneTitle}>
                  <span aria-hidden="true" className={styles.laneIcon}>
                    <Icon name={ICONS[group.direction]} size={16} />
                  </span>
                  {group.label}
                  <span aria-hidden="true" className={styles.laneCount}>
                    {group.rows.length}
                  </span>
                </h3>
                <div className={styles.track}>
                  <span aria-hidden="true" className={styles.rail}>
                    <span className={styles.pulse} />
                    <span className={cx(styles.pulse, styles.pulseLate)} />
                  </span>
                  <ul className={styles.chips}>
                    {group.rows.map((row, index) => {
                      const { main, detail } = splitSyncItem(row.item);
                      return (
                        <li key={row.item} className={styles.chip} style={{ "--i": index } as CSSProperties}>
                          <span aria-hidden="true" className={styles.chipIcon}>
                            <Icon name={ICONS[group.direction]} size={16} />
                          </span>
                          {main}
                          {detail ? <span className={styles.chipDetail}> {detail}</span> : null}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </section>
            ))}
          </div>

          <div aria-hidden="true" className={cx(styles.pillar, styles.pillarListaso)}>
            <BrandAsset id="listaso-symbol-multicolor" height={48} alt="" className="rounded-md" />
            <span className={styles.pillarName}>Listaso</span>
          </div>
        </div>
      </Container>
    </ProductSection>
  );
}
