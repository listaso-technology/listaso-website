import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SnapCarousel } from "@/components/ui/SnapCarousel";
import { pricing } from "@/content/home/en";
import { cx } from "@/lib/utils/cx";
import { SectionHeader } from "../SectionHeader";
import { SamiLogoMark } from "./SamiLogoMark";
import styles from "./PricingPlans.module.css";

/*
 * Monthly/yearly switch without JavaScript: a native radio group. The
 * `group/pricing` wrapper shows the yearly values when #billing-yearly is
 * checked (`group-has-*`); the hidden value is display:none, so assistive
 * technology only reads the active price.
 */
const showWhenMonthly = "group-has-[#billing-yearly:checked]/pricing:hidden";
const showWhenYearly = "hidden group-has-[#billing-yearly:checked]/pricing:inline";

const optionClass = cx(
  "inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full px-5 text-small font-semibold text-fg-default",
  "transition-colors duration-(--listaso-duration-fast)",
  "has-checked:bg-fg-heading has-checked:text-surface-page",
  "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-focus",
);

export function PricingPlans() {
  return (
    <section
      aria-labelledby="pricing-title"
      data-story-section
      data-sami-motion-scope
      className={cx(
        styles.section,
        "group/pricing border-y border-line-subtle bg-surface-alt py-16 lg:py-24",
      )}
    >
      <Container className="flex flex-col gap-12">
        <SectionHeader id="pricing-title" eyebrow={pricing.eyebrow} title={pricing.title} lead={pricing.lead} />

        <div data-reveal="fade" className={styles.billingArea}>
          <div aria-hidden="true" className={styles.mascotTrack}>
            <div className={styles.mascot}>
              <SamiLogoMark alt="" />
            </div>
          </div>
          <fieldset className="flex w-fit flex-wrap gap-1 rounded-full border border-line-control bg-surface-raised p-1">
            <legend className="sr-only">{pricing.billing.label}</legend>
            <label className={optionClass}>
              <input id="billing-monthly" type="radio" name="billing" value="monthly" defaultChecked className="sr-only" />
              {pricing.billing.monthly}
            </label>
            <label className={optionClass}>
              <input id="billing-yearly" type="radio" name="billing" value="yearly" className="sr-only" />
              {pricing.billing.yearly}
              <span className="rounded-full bg-status-success px-2 text-caption text-fg-on-status">
                {pricing.billing.yearlySaving}
              </span>
            </label>
          </fieldset>
        </div>

        <div data-reveal="group">
          <SnapCarousel label={pricing.eyebrow} variant="pricing">
            {pricing.plans.map((plan) => (
              <article
                key={plan.name.emphasis}
                data-reveal-item
                className={cx(
                  styles.planCard,
                  "relative flex flex-col gap-6 rounded-md bg-surface-raised p-6",
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
                <div className="flex flex-col gap-1">
                  <p className="flex items-end gap-2">
                    <span className="text-h2 font-bold text-fg-heading">
                      <span className={showWhenMonthly}>${plan.monthly}</span>
                      <span className={showWhenYearly}>${plan.yearly}</span>
                    </span>
                    <span className="pb-2 text-small text-fg-muted">{pricing.perUser}</span>
                  </p>
                  <p className="text-small text-fg-muted">
                    <span className={showWhenYearly}>{pricing.yearlyNote(plan.yearlyTotal)}</span>
                  </p>
                </div>
                <ul className="flex flex-col gap-2">
                  {plan.features.map((feature) =>
                    feature.endsWith(":") ? (
                      <li key={feature} className="text-body font-semibold text-fg-default">
                        {feature}
                      </li>
                    ) : (
                      <li key={feature} className="flex gap-2 text-body text-fg-default">
                        <span className="flex h-6 shrink-0 items-center text-icon-accent">
                          <Icon name="check" size={20} />
                        </span>
                        {feature}
                      </li>
                    ),
                  )}
                </ul>
                <Button
                  href={pricing.planCta.href}
                  variant={plan.featured ? "primary" : "secondary"}
                  className="mt-auto w-full"
                  data-analytics-event="cta_demo_click"
                  data-analytics-location={`pricing-${plan.name.emphasis.toLowerCase()}`}
                >
                  {pricing.planCta.label}
                </Button>
              </article>
            ))}
          </SnapCarousel>
        </div>

        <ul data-reveal="group" className="grid gap-6 md:grid-cols-3">
          {pricing.notes.map((note) => (
            <li data-reveal-item key={note.title} className="flex flex-col gap-1">
              <strong className="text-body font-semibold text-fg-heading">{note.title}</strong>
              <span className="text-small text-fg-muted">{note.text}</span>
            </li>
          ))}
        </ul>

        <Button href={pricing.compareCta.href} variant="secondary" className="w-fit">
          {pricing.compareCta.label}
        </Button>

        <div className="flex flex-col gap-4 rounded-md border border-line-subtle bg-surface-raised p-6 md:flex-row md:items-center">
          <SamiLogoMark alt="" />
          <p className="text-body text-fg-muted md:flex-1">
            <strong className="font-semibold text-fg-default">{pricing.samiAddon.title}</strong> {pricing.samiAddon.text}
          </p>
          <Button href={pricing.samiAddon.cta.href} variant="secondary" className="w-fit">
            {pricing.samiAddon.cta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
