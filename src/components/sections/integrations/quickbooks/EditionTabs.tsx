"use client";

import { type KeyboardEvent, useRef, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { cx } from "@/lib/utils/cx";
import styles from "./QuickBooksSync.module.css";

export type Edition = { key: string; label: string; prefix: string; items: readonly string[] };

/**
 * The row that differs by QuickBooks edition (Inventory) with a Desktop /
 * Online switch (ARIA tabs: click, arrows, Home/End). Each panel lists that
 * edition's items as chips; the edition prefix stays as text.
 */
export function EditionTabs({ title, editions }: { title: string; editions: readonly Edition[] }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) => {
    setActive(index);
    tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const last = editions.length - 1;
    const next: Record<string, number> = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in next)) return;
    event.preventDefault();
    select(next[event.key]);
  };

  return (
    <div data-reveal="fade" className={styles.edition}>
      <p className={styles.editionTitle}>
        <span aria-hidden="true" className={styles.editionIcon}>
          <Icon name="inventory" size={20} />
        </span>
        {title}
      </p>
      <div role="tablist" aria-label={title} className={styles.editionTabs} onKeyDown={onKeyDown}>
        <span aria-hidden="true" className={styles.editionThumb} style={{ translate: `${active * 100}% 0` }} />
        {editions.map((edition, index) => (
          <button
            key={edition.key}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            id={`edition-tab-${edition.key}`}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls={`edition-panel-${edition.key}`}
            tabIndex={index === active ? 0 : -1}
            className={cx(styles.editionTab, index === active && styles.editionTabActive)}
            onClick={() => setActive(index)}
          >
            {edition.label}
          </button>
        ))}
      </div>
      {editions.map((edition, index) => (
        <div
          key={edition.key}
          id={`edition-panel-${edition.key}`}
          role="tabpanel"
          aria-labelledby={`edition-tab-${edition.key}`}
          hidden={index !== active}
          className={styles.editionPanel}
        >
          <span className={styles.editionPrefix}>{edition.prefix}</span>
          <ul className={styles.editionItems}>
            {edition.items.map((item, itemIndex) => (
              <li key={item} className={styles.editionItem} style={{ animationDelay: `${itemIndex * 60}ms` }}>
                <Icon name="check" size={16} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
