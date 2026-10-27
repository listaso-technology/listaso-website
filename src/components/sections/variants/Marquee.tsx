import type { CSSProperties } from "react";
import { Icon, type IconName } from "@/components/icons/Icon";
import { cx } from "@/lib/utils/cx";
import styles from "./Marquee.module.css";

export type MarqueeItem = { label: string; icon?: IconName };

type MarqueeProps = {
  items: readonly MarqueeItem[];
  /** Accessible name of the list, from the page copy. */
  label: string;
  /** `display` for large words, `pill` for chips. */
  variant?: "pill" | "display";
  /** Two rows moving in opposite directions. */
  rows?: 1 | 2;
  tone?: "page" | "alt" | "band";
  className?: string;
};

function Item({ item, variant }: { item: MarqueeItem; variant: "pill" | "display" }) {
  if (variant === "display") {
    return (
      <span className={styles.word}>
        {item.label}
        <span aria-hidden="true" className={styles.wordDot} />
      </span>
    );
  }

  return (
    <span className={styles.pill}>
      {item.icon ? (
        <span aria-hidden="true" className={styles.pillIcon}>
          <Icon name={item.icon} size={16} />
        </span>
      ) : (
        <span aria-hidden="true" className={styles.pillDot} />
      )}
      {item.label}
    </span>
  );
}

/**
 * Continuous marquee of labels (shared). Each row holds two identical halves
 * that move -50%, so the loop is seamless; the second row runs the other way.
 * One accessible list (the first half of the first row); every copy is
 * aria-hidden. It never pauses (user instruction, DEC-022); with reduced
 * motion it is one static, wrapped list. Rows are capped and centered so
 * zooming out never shows the end of a row.
 */
export function Marquee({ items, label, variant = "pill", rows = 1, tone = "page", className }: MarqueeProps) {
  const rowItems = rows === 2 ? [items, [...items].reverse()] : [items];
  // Each half must be wider than very wide screens: repeat the labels (aria-hidden) as needed.
  const repeats = Math.max(0, Math.ceil((variant === "display" ? 10 : 16) / items.length) - 1);
  // Duration grows with the half's length so the speed stays steady.
  const perItem = variant === "display" ? 6 : 4.5;
  const speed = { "--marquee-duration": `${Math.max(24, items.length * (repeats + 1) * perItem)}s` } as CSSProperties;

  return (
    <div
      data-story-section
      {...(tone === "band" ? { "data-surface": "band" } : null)}
      className={cx(styles.section, styles[tone], variant === "display" && styles.isDisplay, className)}
      style={speed}
    >
      <div className={styles.rows}>
        {rowItems.map((row, rowIndex) => (
          <div key={rowIndex} className={cx(styles.row, rowIndex === 1 && styles.secondRow)}>
            <div className={cx(styles.track, rowIndex === 1 && styles.reverse)}>
              <div className={styles.half}>
                <ul
                  aria-label={rowIndex === 0 ? label : undefined}
                  aria-hidden={rowIndex === 0 ? undefined : true}
                  className={styles.list}
                >
                  {row.map((item) => (
                    <li key={item.label} className={styles.item}>
                      <Item item={item} variant={variant} />
                    </li>
                  ))}
                </ul>
                {Array.from({ length: repeats }, (_, repeat) => (
                  <span key={repeat} aria-hidden="true" className={styles.extra}>
                    {row.map((item) => (
                      <span key={item.label} className={styles.item}>
                        <Item item={item} variant={variant} />
                      </span>
                    ))}
                  </span>
                ))}
              </div>
              <div aria-hidden="true" className={styles.copy}>
                {Array.from({ length: repeats + 1 }, (_, repeat) =>
                  row.map((item) => (
                    <span key={`${repeat}-${item.label}`} className={styles.item}>
                      <Item item={item} variant={variant} />
                    </span>
                  )),
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
