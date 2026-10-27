import type { CSSProperties, ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { cx } from "@/lib/utils/cx";
import styles from "./SpecSheet.module.css";

export type SpecItem = {
  label: string;
  value: ReactNode;
  /** Takes a wider column on desktop (e.g. a step list). */
  wide?: boolean;
};

type SpecSheetProps = {
  /** Accessible name for the facts list. */
  label: string;
  items: readonly SpecItem[];
  /** Intro text beside the sheet (Thorstensson's "Challenge" column). */
  intro?: ReactNode;
  /**
   * Pull the card up over the bottom of the `HeroCaseStudy` photo. Off when
   * the hero pins its own panel there (integration pages).
   */
  overlap?: boolean;
  className?: string;
};

/**
 * Project sheet (Thomas Thorstensson's project details box) as a raised card
 * that (by default) overlaps the bottom of the `HeroCaseStudy` photo:
 * optional intro, then
 * a description list whose columns are split by hairlines. Values come from
 * the page copy; nothing new is claimed here. It fades in with HomeMotion and
 * exposes `data-revealed` so values can stage their own entrance.
 */
export function SpecSheet({ label, items, intro, overlap = true, className }: SpecSheetProps) {
  return (
    <div data-story-section className={cx(styles.wrap, overlap && styles.overlap, className)}>
      <Container width="wide">
        <div data-reveal="fade" className={cx(styles.sheet, intro ? styles.withIntro : null)}>
          {intro ? <div className={styles.intro}>{intro}</div> : null}
          <dl
            aria-label={label}
            className={styles.facts}
            style={
              {
                "--cols": items.map((item) => (item.wide ? "minmax(0, 1.6fr)" : "minmax(0, 1fr)")).join(" "),
              } as CSSProperties
            }
          >
            {items.map((item) => (
              <div key={item.label} className={styles.fact}>
                <dt className={styles.label}>{item.label}</dt>
                <dd className={styles.value}>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </div>
  );
}
