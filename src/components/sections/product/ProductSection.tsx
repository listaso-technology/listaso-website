import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/utils/cx";

type ProductSectionProps = HTMLAttributes<HTMLElement> & {
  /** id of the section's h2. */
  labelledBy: string;
  /** `page` (default) or `alt` for the alternating band. */
  tone?: "page" | "alt";
  children: ReactNode;
};

/** Section wrapper with the approved rhythm (64px mobile, 96px desktop). */
export function ProductSection({ labelledBy, tone = "page", className, children, ...rest }: ProductSectionProps) {
  return (
    <section
      aria-labelledby={labelledBy}
      data-story-section
      className={cx(
        "py-16 lg:py-24",
        tone === "alt" && "border-y border-line-subtle bg-surface-alt",
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
}
