import type { CSSProperties } from "react";
import { BrandAsset } from "@/components/brand/BrandAsset";
import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { systemPageCopy, type IntegrationSystem, type SyncDirection } from "@/content/integrations/systems";
import { cx } from "@/lib/utils/cx";
import { SectionHeader } from "../SectionHeader";
import { ProductSection } from "../product/ProductSection";
import { splitSyncItem } from "./SyncFacts";
import styles from "./SyncTable.module.css";

/**
 * Direction as text plus an arrow: "QuickBooks → Listaso". The arrow is
 * decorative; a visually hidden "to" keeps the reading order meaningful.
 */
export function Direction({ direction, name }: { direction: SyncDirection; name: string }) {
  const { table } = systemPageCopy;

  if (direction === "both") {
    return (
      <span className="inline-flex items-center gap-2 font-semibold text-fg-heading">
        <Icon name="sync" size={16} className="text-icon-accent" />
        {table.both}
      </span>
    );
  }

  const [from, to] = direction === "in" ? [name, "Listaso"] : ["Listaso", name];
  return (
    <span className="inline-flex flex-wrap items-center gap-x-2 font-semibold text-fg-heading">
      {from}
      <Icon name="arrow-right" size={16} className="text-icon-accent" />
      <span className="sr-only">{table.to}</span>
      {to}
    </span>
  );
}

const ORDER: readonly SyncDirection[] = ["both", "in", "out"];

/**
 * "How the X sync works": a real data table, never glass (DEC-008).
 * Left, sticky on desktop: the header and a legend that counts the rows per
 * direction. Right: the table; each direction cell draws a lane from the
 * system to Listaso (decorative) whose pulse travels the way the data goes,
 * once when the table reveals and again on row hover, above the direction
 * as text. Long items show their parenthetical detail on a second line.
 */
export function SyncTable({ system }: { system: IntegrationSystem }) {
  const copy = systemPageCopy.sync(system.name);
  const { table } = systemPageCopy;
  const counts = ORDER.map((direction) => ({
    direction,
    count: system.sync.filter((row) => row.direction === direction).length,
  })).filter((entry) => entry.count > 0);

  return (
    <ProductSection labelledBy="sync-title" tone="alt">
      <Container width="wide" className={styles.layout}>
        <div className={styles.aside}>
          <SectionHeader id="sync-title" eyebrow={copy.eyebrow} title={copy.title} />
          <div aria-hidden="true" className={styles.legend}>
            <span className={styles.legendEnds}>
              <span className={styles.legendSystem}>{system.name}</span>
              <span className={styles.legendWire}>
                <Icon name="sync" size={16} />
              </span>
              <BrandAsset id="listaso-symbol-multicolor" height={40} alt="" className="rounded-md" />
            </span>
            <ul className={styles.legendList}>
              {counts.map((entry) => (
                <li key={entry.direction} className={styles.legendItem}>
                  <Direction direction={entry.direction} name={system.name} />
                  <span className={styles.legendCount}>{entry.count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div data-reveal="fade" className={styles.frame}>
          <table aria-labelledby="sync-title" className={styles.table}>
            <thead>
              <tr>
                <th scope="col" className={styles.headItem}>
                  {table.item}
                </th>
                <th scope="col" className={styles.headDirection}>
                  <span>{table.direction}</span>
                  <span aria-hidden="true" className={styles.headEnds}>
                    <span>{system.name}</span>
                    <span>Listaso</span>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {system.sync.map((row, index) => {
                const { main, detail } = splitSyncItem(row.item);
                return (
                  <tr key={row.item} className={styles.row} style={{ "--i": index } as CSSProperties}>
                    <th scope="row" className={styles.item}>
                      <span className={styles.itemInner}>
                        <span aria-hidden="true" className={styles.index}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className={styles.itemCopy}>
                          <span className={styles.itemMain}>{main}</span>
                          {detail ? <span className={styles.itemDetail}> {detail}</span> : null}
                        </span>
                      </span>
                    </th>
                    <td className={styles.direction}>
                      <span aria-hidden="true" className={cx(styles.lane, styles[row.direction])}>
                        <span className={styles.node} />
                        <span className={styles.track}>
                          <span className={styles.pulse} />
                          <span className={cx(styles.arrow, styles.arrowRight)}>
                            <Icon name="chevron-right" size={16} />
                          </span>
                          <span className={cx(styles.arrow, styles.arrowLeft)}>
                            <Icon name="chevron-left" size={16} />
                          </span>
                        </span>
                        <span className={styles.node} />
                      </span>
                      <span className={styles.directionText}>
                        <Direction direction={row.direction} name={system.name} />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </ProductSection>
  );
}
