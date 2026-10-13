import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { cx } from "@/lib/utils/cx";

export type SpecItem = { label: string; value: ReactNode };

type SpecSheetProps = {
  /** Accessible name for the facts list. */
  label: string;
  items: readonly SpecItem[];
  /** Intro text beside the sheet (Thorstensson's "Challenge" column). */
  intro?: ReactNode;
  className?: string;
};

/**
 * Framed fact sheet (Thomas Thorstensson's project details box): a
 * description list in a bordered frame, with optional intro text beside it.
 * Values come from the page copy; nothing new is claimed here.
 */
export function SpecSheet({ label, items, intro, className }: SpecSheetProps) {
  return (
    <div data-story-section className={cx("py-16 lg:py-20", className)}>
      <Container width="wide" className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        {intro ? <div className="flex flex-col gap-4 lg:col-span-6">{intro}</div> : null}
        <dl
          aria-label={label}
          data-reveal="fade"
          className={cx(
            "grid gap-px overflow-hidden rounded-lg border border-line-subtle bg-line-subtle sm:grid-cols-2",
            // An odd last fact spans the row, so no empty hairline cell shows.
            "sm:[&>div:last-child:nth-child(odd)]:col-span-2",
            intro
              ? "lg:col-span-6"
              : cx(
                  "lg:col-span-12 lg:[&>div:last-child:nth-child(odd)]:col-span-1",
                  // One desktop column per fact (up to four), so every row is full.
                  ["lg:grid-cols-1", "lg:grid-cols-2", "lg:grid-cols-3", "lg:grid-cols-4"][Math.min(items.length, 4) - 1],
                ),
          )}
        >
          {items.map((item) => (
            <div key={item.label} className="flex flex-col gap-2 bg-surface-page p-6">
              <dt className="text-eyebrow font-bold uppercase text-fg-accent">{item.label}</dt>
              <dd className="text-body text-fg-default">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </div>
  );
}
