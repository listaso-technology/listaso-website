"use client";

import { useState } from "react";
import { Icon } from "@/components/icons/Icon";
import type { Feature } from "@/content/products/types";
import { cx } from "@/lib/utils/cx";
import styles from "./PhoneFeatures.module.css";

/**
 * Features shown on a phone (mobile work): a list of buttons (aria-pressed)
 * on one side and a light phone mock on the other whose screen shows the
 * chosen feature. The list carries every title and text; the phone is a
 * decorative mirror of the selected one.
 */
export function PhoneFeatures({ items }: { items: readonly Feature[] }) {
  const [active, setActive] = useState(0);
  const item = items[active];

  return (
    <div className={styles.layout}>
      <ul data-reveal="group" className={styles.list}>
        {items.map((feature, index) => (
          <li key={feature.title} data-reveal-item>
            <button
              type="button"
              aria-pressed={index === active}
              className={cx(styles.option, index === active && styles.optionActive)}
              onClick={() => setActive(index)}
              onPointerEnter={(event) => event.pointerType === "mouse" && setActive(index)}
            >
              <span aria-hidden="true" className={styles.optionIcon}>
                <Icon name={feature.icon} size={20} />
              </span>
              <span className={styles.optionCopy}>
                <span className={styles.optionTitle}>{feature.title}</span>
                <span className={styles.optionText}>{feature.text}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div aria-hidden="true" data-reveal="media" className={styles.stage}>
        <div data-theme="light" className={styles.phone}>
          <span className={styles.notch} />
          <span className={styles.statusBar}>
            <span className={styles.statusDots}>
              <span />
              <span />
              <span />
            </span>
          </span>
          <span key={active} className={styles.screen}>
            <span className={styles.screenIcon}>
              <Icon name={item.icon} size={32} />
            </span>
            <span className={styles.screenTitle}>{item.title}</span>
            <span className={styles.screenText}>{item.text}</span>
            <span className={styles.screenLines}>
              <span />
              <span />
              <span />
            </span>
          </span>
          <span className={styles.dock}>
            {items.map((feature, index) => (
              <span key={feature.title} className={cx(styles.dockIcon, index === active && styles.dockActive)}>
                <Icon name={feature.icon} size={16} />
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
