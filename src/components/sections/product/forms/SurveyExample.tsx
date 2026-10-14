import Image from "next/image";
import { Icon } from "@/components/icons/Icon";
import { productMedia } from "@/content/media/products";
import { surveyExample } from "@/content/products/forms";
import { cx } from "@/lib/utils/cx";

/**
 * The survey screen as a rep sees it on the tablet (start-version mock).
 * Product UI: always light. One image to assistive technology.
 */
export function SurveyScreen({ compact = false, className }: { compact?: boolean; className?: string }) {
  const example = surveyExample;
  const shelf = productMedia.formsShelf;
  const steps = Array.from({ length: example.totalSteps }, (_, index) => index + 1);

  return (
    <div
      role="img"
      aria-label={example.label}
      data-theme="light"
      className={cx("overflow-hidden rounded-lg bg-surface-page text-fg-default", className)}
    >
      <div aria-hidden="true" className={cx("flex flex-col", compact ? "gap-4 p-4" : "gap-5 p-5 sm:p-6")}>
        <span className="flex items-center justify-between gap-4 text-small text-fg-muted">
          <span className="font-semibold">{example.customer}</span>
          <span>{example.step}</span>
        </span>
        <span className={cx("font-semibold text-fg-heading", compact ? "text-body" : "text-h4")}>{example.title}</span>
        <span className="flex items-center">
          {steps.map((step) => (
            <span key={step} className="flex flex-1 items-center last:flex-none">
              <span
                className={cx(
                  "flex shrink-0 items-center justify-center rounded-full font-bold",
                  compact ? "size-6 text-caption" : "size-8 text-small",
                  step <= example.currentStep ? "bg-fg-heading text-fg-on-action" : "border border-line-control text-fg-muted",
                )}
              >
                {step}
              </span>
              {step < example.totalSteps ? (
                <span className={cx("h-0.5 flex-1", step < example.currentStep ? "bg-fg-heading" : "bg-line-subtle")} />
              ) : null}
            </span>
          ))}
        </span>
        <span className={cx("font-semibold", compact ? "text-small" : "text-body")}>{example.question}</span>
        <span className="grid grid-cols-2 gap-3">
          <span className={cx("relative overflow-hidden rounded-md bg-surface-soft", compact ? "aspect-square" : "aspect-[4/5]")}>
            <Image src={shelf.src} alt="" fill sizes="220px" className="object-cover" />
          </span>
          <span
            className={cx(
              "flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-line-control text-small font-semibold text-fg-muted",
              compact ? "aspect-square" : "aspect-[4/5]",
            )}
          >
            <Icon name="photo" size={compact ? 24 : 32} className="text-icon-accent" />
            {example.addPhoto}
          </span>
        </span>
        <span className="flex items-center justify-between border-t border-line-subtle pt-4 text-small font-semibold">
          <span className="text-fg-muted">{example.back}</span>
          <span className="rounded-full bg-action-primary px-5 py-2 text-fg-on-action">{example.next}</span>
        </span>
      </div>
    </div>
  );
}

/** The survey framed as a tablet, for large placements. */
export function SurveyExample() {
  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-line-subtle bg-surface-band p-3 shadow-e3">
      <SurveyScreen />
    </div>
  );
}
