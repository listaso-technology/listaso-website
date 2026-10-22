import type { CSSProperties } from "react";
import { BrandAsset } from "@/components/brand/BrandAsset";
import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { systemPageCopy, type IntegrationSystem } from "@/content/integrations/systems";
import { cx } from "@/lib/utils/cx";
import { SectionHeader } from "../../SectionHeader";
import { ProductSection } from "../../product/ProductSection";
import { syncGroups, systemSummary } from "../syncData";
import styles from "./SyncDial.module.css";

const ICONS = { in: "arrow-right", out: "arrow-left", both: "sync" } as const;
const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP = 2;

/**
 * AccountMate sync as a dial: a donut with one segment per direction
 * (share of rows), Listaso in the centre, segments drawing in once revealed.
 * Beside it the rows grouped by direction; hovering a group lights its
 * segment and vice versa. Each group is a list headed by its direction.
 */
export function SyncDial({ system }: { system: IntegrationSystem }) {
  const copy = systemPageCopy.sync(system.name);
  const groups = syncGroups(system);
  const total = system.sync.length;
  const lengths = groups.map((group) => (group.rows.length / total) * CIRCUMFERENCE);
  const segments = groups.map((group, index) => ({
    direction: group.direction,
    dash: Math.max(lengths[index] - GAP, 0),
    offset: lengths.slice(0, index).reduce((sum, length) => sum + length, 0),
  }));
  const round = (value: number) => Math.round(value * 100) / 100;

  return (
    <ProductSection labelledBy="sync-title">
      <Container width="wide" className={styles.layout}>
        <div className={styles.aside}>
          <SectionHeader id="sync-title" eyebrow={copy.eyebrow} title={copy.title} />
          <p data-reveal="fade" className={styles.summary}>
            <span className={styles.summaryLabel}>{system.hero.eyebrow}</span>
            {systemSummary(system)}
          </p>
        </div>

        <div data-reveal="fade" className={styles.dialWrap}>
          <div aria-hidden="true" className={styles.dial}>
            <svg viewBox="0 0 100 100" className={styles.donut}>
              <circle cx="50" cy="50" r={RADIUS} className={styles.track} />
              {segments.map((segment, index) => (
                <circle
                  key={segment.direction}
                  cx="50"
                  cy="50"
                  r={RADIUS}
                  className={cx(styles.segment, styles[segment.direction])}
                  data-direction={segment.direction}
                  strokeDasharray={`${round(segment.dash)} ${round(CIRCUMFERENCE)}`}
                  strokeDashoffset={round(-segment.offset)}
                  style={{ "--i": index } as CSSProperties}
                />
              ))}
            </svg>
            <span className={styles.center}>
              <BrandAsset id="listaso-symbol-multicolor" height={48} alt="" className="rounded-md" />
              <Icon name="sync" size={16} />
              <span className={styles.centerName}>{system.name}</span>
            </span>
          </div>

          <div className={styles.groups}>
            {groups.map((group) => (
              <section
                key={group.direction}
                aria-label={group.label}
                data-direction={group.direction}
                className={cx(styles.group, styles[group.direction])}
              >
                <h3 className={styles.groupTitle}>
                  <span aria-hidden="true" className={styles.groupIcon}>
                    <Icon name={ICONS[group.direction]} size={16} />
                  </span>
                  {group.label}
                  <span aria-hidden="true" className={styles.groupCount}>
                    {group.rows.length}
                  </span>
                </h3>
                <ul className={styles.rows}>
                  {group.rows.map((row) => (
                    <li key={row.item} className={styles.row}>
                      {row.item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </ProductSection>
  );
}
