import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/utils/cx";
import styles from "./GlassPanel.module.css";

type GlassPanelProps = HTMLAttributes<HTMLDivElement> & {
  /** `light` over brand gradients or imagery; `sami` only in SAMI/AI spaces. */
  tone?: "light" | "sami";
  children: ReactNode;
};

/**
 * Decorative glass surface, to be used sparingly (DEC-008): it must sit over a
 * varied backdrop, never nest, and never hold forms, tables or long text.
 */
export function GlassPanel({ tone = "light", className, children, ...rest }: GlassPanelProps) {
  return (
    <div className={cx(styles.panel, styles[tone], className)} {...rest}>
      {children}
    </div>
  );
}
