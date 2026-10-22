"use client";

import { type CSSProperties, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import type { SyncDirection, SyncRow } from "@/content/integrations/systems";
import { cx } from "@/lib/utils/cx";
import styles from "./SyncFilter.module.css";

export type FilterGroup = { direction: SyncDirection; label: string; count: number };

const ICONS = { in: "arrow-right", out: "arrow-left", both: "sync" } as const;

/**
 * Sync rows with a direction filter: a proportion bar (one segment per
 * direction) and toggle buttons with counts (aria-pressed). Choosing a
 * direction dims and collapses the other rows; choosing it again shows all.
 * Every row stays in the DOM with its direction as text.
 */
export function SyncFilter({
  rows,
  groups,
  directionText,
}: {
  rows: readonly SyncRow[];
  groups: readonly FilterGroup[];
  directionText: Record<SyncDirection, string>;
}) {
  const [filter, setFilter] = useState<SyncDirection | null>(null);
  const total = rows.length;

  return (
    <div data-reveal="fade" className={styles.filter} data-filter={filter ?? undefined}>
      <div aria-hidden="true" className={styles.bar}>
        {groups.map((group) => (
          <span
            key={group.direction}
            className={cx(styles.segment, styles[group.direction])}
            data-off={filter && filter !== group.direction ? "" : undefined}
            style={{ "--share": group.count / total } as CSSProperties}
          />
        ))}
      </div>

      <div className={styles.toggles}>
        {groups.map((group) => {
          const pressed = filter === group.direction;
          return (
            <button
              key={group.direction}
              type="button"
              aria-pressed={pressed}
              className={cx(styles.toggle, styles[group.direction], pressed && styles.togglePressed)}
              onClick={() => setFilter(pressed ? null : group.direction)}
            >
              <span aria-hidden="true" className={styles.toggleIcon}>
                <Icon name={ICONS[group.direction]} size={16} />
              </span>
              {group.label}
              <span className={styles.toggleCount}>{group.count}</span>
            </button>
          );
        })}
      </div>

      <ul className={styles.rows}>
        {rows.map((row, index) => (
          <li
            key={row.item}
            className={cx(styles.row, styles[row.direction])}
            data-off={filter && filter !== row.direction ? "" : undefined}
            style={{ "--i": index } as CSSProperties}
          >
            <span className={styles.rowInner}>
              <span aria-hidden="true" className={styles.rowIcon}>
                <Icon name={ICONS[row.direction]} size={16} />
              </span>
              <span className={styles.rowItem}>{row.item}</span>
              <span className={styles.rowDirection}>{directionText[row.direction]}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
