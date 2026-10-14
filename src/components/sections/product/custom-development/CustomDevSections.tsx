import { Icon } from "@/components/icons/Icon";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { productMedia } from "@/content/media/products";
import { sectionMedia } from "@/content/media/sections";
import { process } from "@/content/products/custom-development";
import { cx } from "@/lib/utils/cx";
import { StoryPhoto } from "../../variants/ImageBand";
import { StickyStory, type StoryStep } from "../../variants/StickyStory";

/**
 * The four project steps as a progress card. Purely illustrative (the steps
 * are listed with their text further down), so hidden from assistive tech.
 */
export function PlanProgressPanel({ className }: { className?: string }) {
  return (
    <GlassPanel aria-hidden="true" className={cx("flex w-[min(100%,20rem)] flex-col gap-2 p-4", className)}>
      {process.steps.map((step, index) => (
        <span key={step.title} className="flex items-center gap-3 text-small font-semibold">
          <span
            className={cx(
              "flex size-6 shrink-0 items-center justify-center rounded-full",
              index < 2 ? "bg-fg-heading text-fg-on-action" : "border border-line-control text-fg-muted",
            )}
          >
            {index < 2 ? <Icon name="check" size={16} /> : <span className="text-caption">{index + 1}</span>}
          </span>
          <span className={index < 2 ? "text-fg-heading" : "text-fg-default"}>{step.title}</span>
        </span>
      ))}
    </GlassPanel>
  );
}

const STEP_PHOTOS = [
  sectionMedia.storeCounter,
  productMedia.customWhiteboard,
  sectionMedia.codeLaptop,
  sectionMedia.officeCharts,
] as const;

/** "From idea to working tool": sticky story with one visual per step. */
export function CustomDevProcess() {
  const steps: StoryStep[] = process.steps.map((step, index) => ({
    ...step,
    media: <StoryPhoto photo={STEP_PHOTOS[index]} />,
  }));

  return <StickyStory id="process-title" copy={process} steps={steps} tone="alt" mediaFirst />;
}
