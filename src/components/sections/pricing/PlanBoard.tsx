import Image from "next/image";
import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { board, hero } from "@/content/pricing/plans";
import { cx } from "@/lib/utils/cx";
import { Signature } from "../Signature";
import { Breadcrumbs } from "../product/Breadcrumbs";
import dossier from "../variants/dossier.module.css";
import { GridPattern } from "./GridPattern";
import styles from "./PlanBoard.module.css";

/*
 * Monthly/yearly without JavaScript: a native radio group (#plans-monthly,
 * #plans-yearly). The `group/plans` stage shows the yearly values when the
 * yearly radio is checked; hidden values are display:none, so assistive
 * technology reads only the active price. The visual price roll is
 * aria-hidden.
 */
const showWhenMonthly = "group-has-[#plans-yearly:checked]/plans:hidden";
const showWhenYearly = "hidden group-has-[#plans-yearly:checked]/plans:inline";

const optionClass = cx(
  "inline-flex min-h-12 cursor-pointer flex-col items-start justify-center gap-1 text-small font-bold tracking-wide text-fg-muted uppercase sm:flex-row sm:items-center sm:gap-2",
  "transition-colors duration-(--listaso-duration-fast)",
  "has-checked:text-fg-heading has-focus-visible:underline has-focus-visible:underline-offset-4",
);

/**
 * Pricing stage (/plans/): hero, billing switch with the Sami logo as the
 * knob, the three plans in a ruled dossier frame, notes and the Sami add-on,
 * all over the footer's animated grid pattern (light and dark).
 */
export function PlanBoard() {
  return (
    <GridPattern
      as="section"
      aria-labelledby="hero-title"
      data-story-section
      data-sami-motion-scope
      className={cx(styles.board, "group/plans border-b border-line-subtle pt-12 pb-16 lg:pt-16 lg:pb-24")}
    >
      <Container width="wide" className="flex flex-col gap-12">
        <Breadcrumbs current={hero.breadcrumb} />

        <div data-reveal="group" className="flex max-w-5xl flex-col gap-6">
          <p data-reveal-item className={cx(dossier.bracket, "text-eyebrow font-bold uppercase text-fg-accent")}>
            {hero.eyebrow}
          </p>
          <h1 id="hero-title" data-reveal="mask" className={cx(dossier.display, "overflow-hidden font-bold text-balance text-fg-heading")}>
            <span data-reveal-content className="block">
              <Signature text={hero.title} />
            </span>
          </h1>
          <p data-reveal-item className="max-w-2xl text-lead text-fg-muted">
            {hero.lead}
          </p>
        </div>

        <fieldset data-reveal="fade" className="-mb-6 flex flex-wrap items-center gap-x-2 gap-y-3 self-start sm:gap-x-4 lg:self-end">
          <legend className="sr-only">{board.billing.label}</legend>
          <label className={optionClass}>
            <input id="plans-monthly" type="radio" name="plans-billing" value="monthly" defaultChecked className="sr-only" />
            {board.billing.monthly}
          </label>
          {/* Decorative switch: a click on the track selects the other option. */}
          <span aria-hidden="true" className={styles.track}>
            <label htmlFor="plans-monthly" className={cx(styles.hit, styles.hitMonthly)} />
            <label htmlFor="plans-yearly" className={cx(styles.hit, styles.hitYearly)} />
            <span className={styles.knob}>
              <Image src="/brand/sami/sami-logo.webp" alt="" width={72} height={72} />
            </span>
          </span>
          <label className={optionClass}>
            <input id="plans-yearly" type="radio" name="plans-billing" value="yearly" className="sr-only" />
            {board.billing.yearly}
            <span className="rounded-full bg-status-success px-2 text-caption tracking-normal text-fg-on-status normal-case">
              {board.billing.yearlySaving}
            </span>
          </label>
        </fieldset>

        <ol data-reveal="group" className="grid border-2 border-fg-heading bg-surface-page lg:grid-cols-3">
          {board.plans.map((plan, index) => (
            <li
              data-reveal-item
              key={plan.name.emphasis}
              className={cx(
                styles.plan,
                plan.featured && styles.featured,
                "flex flex-col gap-6 border-line-subtle p-6 sm:p-8",
                index > 0 && "border-t lg:border-t-0 lg:border-l",
              )}
            >
              <div className="flex min-h-6 items-center justify-between gap-4">
                <span aria-hidden="true" className="text-small font-bold text-fg-accent">
                  /{String(index + 1).padStart(2, "0")}
                </span>
                {"tag" in plan ? (
                  <span className={cx(dossier.bracket, "text-small font-bold tracking-widest text-fg-accent uppercase")}>
                    {plan.tag}
                  </span>
                ) : null}
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="text-[clamp(1.5rem,1.6vw+0.75rem,2.5rem)] leading-tight font-bold break-words text-fg-heading uppercase">
                  {plan.name.emphasis}
                  {plan.name.rest ? ` ${plan.name.rest}` : null}
                </h2>
                <p className="text-body text-fg-muted">{plan.audience}</p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="flex flex-wrap items-end gap-x-3 gap-y-1">
                  <span aria-hidden="true" className="flex items-start text-display font-bold text-fg-heading">
                    <span className="text-h3">$</span>
                    <span className={styles.roll}>
                      <span className={styles.rollInner}>
                        <span>{plan.monthly}</span>
                        <span>{plan.yearly}</span>
                      </span>
                    </span>
                  </span>
                  <span className="sr-only">
                    <span className={showWhenMonthly}>${plan.monthly}</span>
                    <span className={showWhenYearly}>${plan.yearly}</span>
                  </span>
                  <span className="pb-1 text-small text-fg-muted">{board.perUser}</span>
                </p>
                <p className="min-h-5 text-small text-fg-muted">
                  <span className={showWhenYearly}>{board.yearlyNote(plan.yearlyTotal)}</span>
                </p>
              </div>

              <Button
                href={board.planCta.href}
                variant={plan.featured ? "primary" : "secondary"}
                className="w-full"
                data-analytics-event="cta_demo_click"
                data-analytics-location={`plans-${plan.name.emphasis.toLowerCase()}`}
              >
                {board.planCta.label}
              </Button>

              <ul className="flex flex-col gap-3 border-t border-line-subtle pt-6">
                {plan.features.map((feature) =>
                  feature.endsWith(":") ? (
                    <li key={feature} className="text-small font-bold tracking-wide text-fg-heading uppercase">
                      {feature}
                    </li>
                  ) : (
                    <li key={feature} className="flex gap-3 text-body text-fg-default">
                      <span className="flex h-6 shrink-0 items-center text-icon-accent">
                        <Icon name="check" size={20} />
                      </span>
                      {feature}
                    </li>
                  ),
                )}
              </ul>
            </li>
          ))}
        </ol>

        <ul data-reveal="group" className="grid gap-x-8 border-t border-line-subtle md:grid-cols-3">
          {board.notes.map((note) => (
            <li data-reveal-item key={note.title} className="flex flex-col gap-2 border-b border-line-subtle py-6 md:border-b-0">
              <strong className="text-small font-bold tracking-wide text-fg-heading uppercase">{note.title}</strong>
              <span className="text-body text-fg-muted">{note.text}</span>
            </li>
          ))}
        </ul>

        <div
          data-reveal="fade"
          className="grid gap-6 border-2 border-fg-heading bg-surface-page p-6 sm:p-8 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center"
        >
          <Image src="/brand/sami/sami-logo.webp" alt="" width={64} height={64} className="size-16" />
          <p className="text-body text-fg-muted">
            <strong className="font-bold text-fg-heading">{board.samiAddon.title}</strong> {board.samiAddon.text}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href={board.samiAddon.cta.href} variant="secondary" className="w-fit">
              {board.samiAddon.cta.label}
            </Button>
            <Button href="#compare" variant="tertiary" icon="arrow-right" className="w-fit">
              {board.compareCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </GridPattern>
  );
}
