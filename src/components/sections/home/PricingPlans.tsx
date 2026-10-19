import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SnapCarousel } from "@/components/ui/SnapCarousel";
import { pricing } from "@/content/home/en";
import { cx } from "@/lib/utils/cx";
import { SectionHeader } from "../SectionHeader";
import styles from "./PricingPlans.module.css";

/** Compact Homepage preview; /plans/ owns billing and full comparisons. */
export function PricingPlans() {
  return (
    <section
      aria-labelledby="pricing-title"
      data-story-section
      className={cx(styles.section, "border-y border-line-subtle bg-surface-alt py-16 lg:py-20")}
    >
      <Container className="flex flex-col gap-8 lg:gap-10">
        <SectionHeader id="pricing-title" eyebrow={pricing.eyebrow} title={pricing.title} lead={pricing.lead} />

        <div data-reveal="group">
          <SnapCarousel label={pricing.eyebrow} variant="pricing">
            {pricing.plans.map((plan) => (
              <article
                key={plan.name.emphasis}
                data-reveal-item
                className={cx(
                  styles.planCard,
                  "relative flex flex-col gap-5 overflow-hidden rounded-md bg-surface-raised p-6",
                  plan.featured ? "border-2 border-action-primary shadow-e2" : "border border-line-subtle",
                )}
              >
                {"tag" in plan ? (
                  <span className="w-fit rounded-full bg-action-primary px-3 py-1 text-caption font-bold uppercase text-fg-on-action">
                    {plan.tag}
                  </span>
                ) : null}
                <div className="flex flex-col gap-2">
                  <h3 className="text-h3 text-fg-heading">
                    <span className="font-bold">{plan.name.emphasis}</span>
                    {plan.name.rest ? ` ${plan.name.rest}` : null}
                  </h3>
                  <p className="text-body text-fg-muted">{plan.audience}</p>
                </div>
                <p className="mt-auto flex flex-wrap items-end gap-x-2 gap-y-1">
                  <span className="text-h2 font-bold text-fg-heading">${plan.monthly}</span>
                  <span className="pb-2 text-small text-fg-muted">{pricing.perUser}</span>
                </p>
              </article>
            ))}
          </SnapCarousel>
        </div>

        <Button href={pricing.compareCta.href} variant="secondary" className="w-fit">
          {pricing.compareCta.label}
        </Button>
      </Container>
    </section>
  );
}
