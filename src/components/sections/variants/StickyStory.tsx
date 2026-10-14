import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import type { SectionCopy, Step } from "@/content/products/types";
import { cx } from "@/lib/utils/cx";
import { ProductSection } from "../product/ProductSection";
import { SectionHeader } from "../SectionHeader";
import styles from "./StickyStory.module.css";
import { StoryObserver } from "./StoryObserver";

export type StoryStep = Step & {
  icon?: IconName;
  /** Visual for this step: a photo frame or an illustrative panel. */
  media: ReactNode;
  /** Short caption shown on the media (decorative repeat of the step title). */
  caption?: string;
};

type StickyStoryProps = {
  id: string;
  copy: SectionCopy;
  steps: readonly StoryStep[];
  tone?: "page" | "alt";
  /** Put the media on the left instead of the right. */
  mediaFirst?: boolean;
};

/**
 * Numbered process with a sticky visual that changes with the active step
 * (Good Fella's process, Symboolic's focus cards). Media layers are
 * decorative illustrations of each step; the steps carry the content.
 */
export function StickyStory({ id, copy, steps, tone = "page", mediaFirst = false }: StickyStoryProps) {
  const rootId = `${id}-story`;

  return (
    <ProductSection labelledBy={id} tone={tone}>
      <Container className="flex flex-col gap-12">
        <SectionHeader id={id} eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead} />
        <div id={rootId} className={cx(styles.story, "grid gap-10 lg:grid-cols-2 lg:gap-16")}>
          <div
            aria-hidden="true"
            className={cx("relative lg:sticky lg:top-28 lg:h-[min(72svh,40rem)]", mediaFirst ? "lg:order-first" : "lg:order-last")}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface-soft shadow-e2 lg:aspect-auto lg:h-full">
              {steps.map((step, index) => (
                <div key={step.title} className={cx(styles.media, "absolute inset-0")}>
                  {step.media}
                  <span className="absolute top-4 left-4 rounded-full bg-surface-page px-3 py-1 text-caption font-bold text-fg-heading shadow-e1">
                    {String(index + 1).padStart(2, "0")} · {step.caption ?? step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <ol className="flex flex-col">
            {steps.map((step, index) => (
              <li
                key={step.title}
                data-story-step={index}
                className={cx(styles.step, "grid grid-cols-[3.5rem_1fr] gap-x-6 border-t border-line-subtle py-10 last:border-b lg:py-16")}
              >
                <span
                  className={cx(
                    styles.marker,
                    "flex size-14 items-center justify-center rounded-full border border-line-subtle bg-surface-raised text-fg-heading",
                  )}
                >
                  {step.icon ? (
                    <Icon name={step.icon} size={24} />
                  ) : (
                    <span className="text-body font-bold">{String(index + 1).padStart(2, "0")}</span>
                  )}
                </span>
                <div className="flex flex-col gap-3 pt-2">
                  <span aria-hidden="true" className="text-small font-bold tracking-widest text-fg-accent uppercase">
                    {String(index + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                  </span>
                  <h3 className={cx(styles.title, "text-h3 font-semibold text-fg-heading")}>{step.title}</h3>
                  <p className="max-w-lg text-body-lg text-fg-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <StoryObserver rootId={rootId} />
      </Container>
    </ProductSection>
  );
}
