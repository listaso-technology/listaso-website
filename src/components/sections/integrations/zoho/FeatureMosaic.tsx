import type { CSSProperties } from "react";
import { Icon } from "@/components/icons/Icon";
import type { Feature } from "@/content/products/types";
import { cx } from "@/lib/utils/cx";
import styles from "./FeatureMosaic.module.css";

/**
 * Features as a mosaic: the first two as wide tiles with a large icon
 * watermark, the rest as compact tiles. On hover a tile fills from its
 * corner with the accent and its icon turns; all text is always visible.
 */
export function FeatureMosaic({ items }: { items: readonly Feature[] }) {
  return (
    <ul data-reveal="group" className={styles.mosaic}>
      {items.map((item, index) => (
        <li key={item.title} data-reveal-item className={cx(styles.item, index < 2 && styles.wide)}>
          <div className={styles.tile} style={{ "--i": index } as CSSProperties}>
            <span aria-hidden="true" className={styles.watermark}>
              <Icon name={item.icon} size={48} />
            </span>
            <span aria-hidden="true" className={styles.icon}>
              <Icon name={item.icon} size={20} />
            </span>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.text}>{item.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
