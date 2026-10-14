import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/utils/cx";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  /** `content` (1200px) for sections, `wide` (1440px) for the header. */
  width?: "content" | "wide";
  children: ReactNode;
};

/** Centered page container with the approved gutters (16 / 24 / 32px). */
export function Container({ width = "content", className, children, ...rest }: ContainerProps) {
  return (
    <div
      className={cx(
        "mx-auto w-full px-4 md:px-6 lg:px-8",
        width === "content" ? "max-w-content" : "max-w-wide",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
