import type { CSSProperties } from "react";
import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { systemPageCopy, type IntegrationSystem } from "@/content/integrations/systems";
import { cx } from "@/lib/utils/cx";
import { SectionHeader } from "../../SectionHeader";
import { ProductSection } from "../../product/ProductSection";
import { Direction } from "../SyncTable";
import { systemSummary } from "../syncData";
import styles from "./SyncRoute.module.css";

const ICONS = { in: "arrow-right", out: "arrow-left", both: "sync" } as const;

/**
 * Acctivate sync as a route: a road runs down the middle and every row is a
 * stop, alternating sides on wide screens. A truck drives the road as the
 * route scrolls through the view (scroll-driven; parked at the end without
 * support or with reduced motion). Each stop shows its direction as text.
 */
export function SyncRoute({ system }: { system: IntegrationSystem }) {
  const copy = systemPageCopy.sync(system.name);

  return (
    <ProductSection labelledBy="sync-title" tone="alt">
      <Container className={styles.layout}>
        <div className={styles.head}>
          <SectionHeader id="sync-title" eyebrow={copy.eyebrow} title={copy.title} />
          <p data-reveal="fade" className={styles.summary}>
            <span className={styles.summaryLabel}>{system.hero.eyebrow}</span>
            {systemSummary(system)}
          </p>
        </div>

        <div className={styles.route}>
          <span aria-hidden="true" className={styles.road}>
            <span className={styles.truck}>
              <Icon name="truck" size={20} />
            </span>
          </span>
          <ol data-reveal="group" className={styles.stops}>
            {system.sync.map((row, index) => (
              <li
                key={row.item}
                data-reveal-item
                className={cx(styles.stop, index % 2 === 1 && styles.stopRight)}
                style={{ "--i": index } as CSSProperties}
              >
                <span aria-hidden="true" className={styles.pin}>
                  <Icon name={ICONS[row.direction]} size={16} />
                </span>
                <span className={styles.card}>
                  <span aria-hidden="true" className={styles.stopNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.stopItem}>{row.item}</span>
                  <span className={styles.stopDirection}>
                    <Direction direction={row.direction} name={system.name} />
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </ProductSection>
  );
}
