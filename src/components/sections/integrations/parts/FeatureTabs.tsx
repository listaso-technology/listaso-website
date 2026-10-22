"use client";

import { type KeyboardEvent, useRef, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import type { Feature } from "@/content/products/types";
import { cx } from "@/lib/utils/cx";
import { FeatureArt } from "../../variants/FeatureArt";
import styles from "./FeatureTabs.module.css";

/**
 * Features as tabs (ARIA tabs: click, arrows, Home/End): the titles as a
 * vertical list on desktop (a scrollable row of chips on small screens), and
 * one large panel with the feature's illustration, number, title and text.
 * Every panel stays in the DOM; inactive ones are hidden.
 */
export function FeatureTabs({ items, idPrefix }: { items: readonly Feature[]; idPrefix: string }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) => {
    setActive(index);
    tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const last = items.length - 1;
    const next: Record<string, number> = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowRight: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in next)) return;
    event.preventDefault();
    select(next[event.key]);
  };

  return (
    <div data-reveal="fade" className={styles.tabs}>
      <div role="tablist" aria-orientation="vertical" className={styles.list} onKeyDown={onKeyDown}>
        {items.map((item, index) => (
          <button
            key={item.title}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            id={`${idPrefix}-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls={`${idPrefix}-panel-${index}`}
            tabIndex={index === active ? 0 : -1}
            className={cx(styles.tab, index === active && styles.tabActive)}
            onClick={() => setActive(index)}
          >
            <span aria-hidden="true" className={styles.tabIcon}>
              <Icon name={item.icon} size={20} />
            </span>
            <span className={styles.tabTitle}>{item.title}</span>
            <span aria-hidden="true" className={styles.tabArrow}>
              <Icon name="arrow-right" size={16} />
            </span>
          </button>
        ))}
      </div>

      <div className={styles.panels}>
        {items.map((item, index) => (
          <div
            key={item.title}
            id={`${idPrefix}-panel-${index}`}
            role="tabpanel"
            aria-labelledby={`${idPrefix}-tab-${index}`}
            hidden={index !== active}
            className={styles.panel}
          >
            <FeatureArt icon={item.icon} />
            <div className={styles.panelBody}>
              <span aria-hidden="true" className={styles.panelNumber}>
                {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
              <h3 className={styles.panelTitle}>{item.title}</h3>
              <p className={styles.panelText}>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
