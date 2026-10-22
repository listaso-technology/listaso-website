import type { CSSProperties } from "react";
import { Icon } from "@/components/icons/Icon";
import type { Feature } from "@/content/products/types";
import styles from "./FeatureTimeline.module.css";

/**
 * Features as a numbered timeline: a rail on the left fills as the list
 * scrolls through the view (scroll-driven; full without support or with
 * reduced motion) and each entry's marker lights when the fill reaches it.
 * Wide screens split each entry into title and text columns.
 */
export function FeatureTimeline({ items }: { items: readonly Feature[] }) {
  return (
    <div className={styles.timeline}>
      <span aria-hidden="true" className={styles.rail}>
        <span className={styles.railFill} />
      </span>
      <ol data-reveal="group" className={styles.entries}>
        {items.map((item, index) => (
          <li key={item.title} data-reveal-item className={styles.entry} style={{ "--i": index } as CSSProperties}>
            <span aria-hidden="true" className={styles.marker}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className={styles.body}>
              <h3 className={styles.title}>
                <span aria-hidden="true" className={styles.icon}>
                  <Icon name={item.icon} size={20} />
                </span>
                {item.title}
              </h3>
              <p className={styles.text}>{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
