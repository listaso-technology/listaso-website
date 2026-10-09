import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/utils/cx";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "section" | "li";
  /**
   * `flat` separates with a border (e0). `raised` adds e1 and, when the card
   * contains a link, lifts one level on hover or keyboard focus.
   */
  elevation?: "flat" | "raised";
  children: ReactNode;
};

export function Card({
  as: Element = "div",
  elevation = "flat",
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Element
      className={cx(
        "rounded-md border border-line-subtle bg-surface-raised p-6 text-fg-default",
        elevation === "raised" &&
          "shadow-e1 transition-[box-shadow,translate] duration-(--listaso-duration-standard) " +
            "ease-(--listaso-ease-standard) hover:shadow-e2 focus-within:shadow-e2 " +
            "motion-safe:hover:-translate-y-1 motion-safe:focus-within:-translate-y-1",
        className,
      )}
      {...rest}
    >
      {children}
    </Element>
  );
}
