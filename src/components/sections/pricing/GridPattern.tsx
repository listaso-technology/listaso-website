import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/utils/cx";
import styles from "./GridPattern.module.css";

type GridPatternProps = HTMLAttributes<HTMLElement> & {
  as?: "section" | "div";
  children: ReactNode;
};

/**
 * Stage with the footer's grid-and-glow pattern, theme aware and animated
 * (see the module). The decoration is aria-hidden and sits behind content.
 */
export function GridPattern({ as: Element = "div", className, children, ...rest }: GridPatternProps) {
  return (
    <Element className={cx(styles.stage, className)} {...rest}>
      <div aria-hidden="true" className={styles.grid} />
      <div aria-hidden="true" className={cx(styles.glow, styles.glowAqua)} />
      <div aria-hidden="true" className={cx(styles.glow, styles.glowMagenta)} />
      {children}
    </Element>
  );
}
