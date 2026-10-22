"use client";

import { type CSSProperties, useState } from "react";
import { Icon, type IconName } from "@/components/icons/Icon";
import { cx } from "@/lib/utils/cx";
import styles from "./ModelFinder.module.css";

type ModelRow = { brand: string; model: string; apps: readonly string[] };

const APP_ICONS: Record<string, IconName> = { Sales: "orders", Inventory: "warehouse", Delivery: "delivery" };

/**
 * Compatible models as a styled data table with a "Works with" filter
 * (toggle buttons with model counts, aria-pressed). Rows are grouped by
 * brand (one tbody per brand, the brand cell spanning its rows); each row
 * shows the apps as pills in fixed slots, so the columns line up. Choosing
 * an app dims the rows that do not work with it and lights its pills;
 * choosing it again shows all. Hovering a brand group highlights it.
 */
export function ModelFinder({
  rows,
  columns,
  labelledBy,
}: {
  rows: readonly ModelRow[];
  columns: readonly [string, string, string];
  labelledBy: string;
}) {
  const [filter, setFilter] = useState<string | null>(null);
  const apps = Array.from(new Set(rows.flatMap((row) => row.apps)));
  const brands = Array.from(new Set(rows.map((row) => row.brand)));
  const matches = (row: ModelRow) => !filter || row.apps.includes(filter);

  return (
    <div className={styles.finder}>
      <div role="group" aria-label={columns[2]} className={styles.filters}>
        <span aria-hidden="true" className={styles.filterLabel}>
          {columns[2]}
        </span>
        {apps.map((app) => {
          const pressed = filter === app;
          return (
            <button
              key={app}
              type="button"
              aria-pressed={pressed}
              className={cx(styles.filter, pressed && styles.filterOn)}
              onClick={() => setFilter(pressed ? null : app)}
            >
              <span aria-hidden="true" className={styles.filterIcon}>
                <Icon name={APP_ICONS[app] ?? "check"} size={16} />
              </span>
              {app}
              <span aria-hidden="true" className={styles.filterCount}>
                {rows.filter((row) => row.apps.includes(app)).length}
              </span>
            </button>
          );
        })}
      </div>

      <div data-reveal="fade" className={styles.frame}>
        <table aria-labelledby={labelledBy} className={styles.table}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column} scope="col" className={styles.head}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          {brands.map((brand, brandIndex) => {
            const models = rows.filter((row) => row.brand === brand);
            const any = models.some(matches);
            return (
              <tbody
                key={brand}
                className={cx(styles.group, !any && styles.groupOff)}
                style={{ "--g": brandIndex } as CSSProperties}
              >
                {models.map((row, index) => (
                  <tr key={row.model} className={cx(styles.row, !matches(row) && styles.rowOff)}>
                    {index === 0 ? (
                      <th scope="rowgroup" rowSpan={models.length} className={styles.brand}>
                        <span className={styles.brandInner}>
                          <span aria-hidden="true" className={styles.brandMark}>
                            {brand.slice(0, 1)}
                          </span>
                          <span className={styles.brandName}>{brand}</span>
                        </span>
                      </th>
                    ) : null}
                    <td className={styles.model}>{row.model}</td>
                    <td className={styles.apps}>
                      <span className={styles.pills}>
                        {apps.map((app) =>
                          row.apps.includes(app) ? (
                            <span key={app} className={cx(styles.pill, filter === app && styles.pillHit)}>
                              <Icon name={APP_ICONS[app] ?? "check"} size={16} />
                              {app}
                            </span>
                          ) : (
                            <span key={app} aria-hidden="true" className={styles.slot} />
                          ),
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}
