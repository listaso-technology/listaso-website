import Image from "next/image";
import type { CSSProperties } from "react";
import { Icon, type IconName } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { board, compare, hero } from "@/content/pricing/plans";
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

/** Icon per app group of the comparison table. */
const APP_ICONS: Record<string, IconName> = {
  "Sales app": "orders",
  "Warehouse app": "warehouse",
  "Delivery app": "delivery",
  "B2B e-Commerce": "store",
  "Back Office": "dashboard",
};

/** Decorative icons for the three notes (setup, no contract, onboarding). */
const NOTE_ICONS: IconName[] = ["sync", "calendar", "support"];

/** An app counts as in a plan when any of its rows is included ("y"). */
const apps = compare.groups.map((group) => ({
  name: group.group,
  icon: APP_ICONS[group.group] ?? "check",
  plans: [0, 1, 2].map((plan) => group.rows.some((row) => row.plans[plan] === "y")),
}));

const allRows = compare.groups.flatMap((group) => group.rows);

/** Share of comparison rows included in a plan (0–1), for the meter. */
const coverageFor = (plan: number) =>
  Number((allRows.filter((row) => row.plans[plan] === "y").length / allRows.length).toFixed(3));

/*
 * The SAMI add-on sentence, split for display only (same words): the three
 * tiers ("Name: detail", separated by " · ") and the closing note.
 */
const samiText = board.samiAddon.text;
const samiSplit = samiText.indexOf(". ", samiText.lastIndexOf(" · "));
const samiNote = samiText.slice(samiSplit + 2);
const samiTiers = samiText
  .slice(0, samiSplit)
  .split(" · ")
  .map((tier) => {
    const [name, ...detail] = tier.split(": ");
    return { name, detail: detail.join(": ") };
  });

/**
 * Pricing stage (/plans/): hero, billing switch with the Sami logo as the
 * knob, the three plans in a ruled dossier frame (the featured one on the
 * navy band), notes and the Sami add-on, all over the footer's animated grid
 * pattern (light and dark). Each plan shows the apps it includes (from the
 * comparison table) with a coverage meter; with yearly billing the monthly
 * price shows struck through. Benefits enter in turn when the plans reveal.
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
            <span className={cx(styles.saving, "rounded-full bg-status-success px-2 text-caption tracking-normal text-fg-on-status normal-case")}>
              {board.billing.yearlySaving}
            </span>
          </label>
        </fieldset>

        <ol data-reveal="group" className={styles.plans}>
          {board.plans.map((plan, index) => (
            <li data-reveal-item key={plan.name.emphasis} className={styles.planItem}>
              <div data-surface={plan.featured ? "band" : undefined} className={cx(styles.plan, plan.featured && styles.featured)}>
                <div className="flex min-h-6 items-center justify-between gap-4">
                  <span aria-hidden="true" className="text-small font-bold text-fg-accent">
                    /{String(index + 1).padStart(2, "0")}
                  </span>
                  {"tag" in plan ? <span className={cx(dossier.bracket, styles.tag)}>{plan.tag}</span> : null}
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
                    <span className="flex flex-col pb-1">
                      {/* With yearly billing, the monthly price it replaces, struck through. */}
                      <s aria-hidden="true" className={styles.was}>
                        ${plan.monthly}
                      </s>
                      <span className="text-small text-fg-muted">{board.perUser}</span>
                    </span>
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

                {/* Apps in the plan, from the comparison table: lit when included. */}
                <div className={styles.appsBlock}>
                  <span aria-hidden="true" className={styles.meter}>
                    <span className={styles.meterFill} style={{ "--cover": coverageFor(index) } as CSSProperties} />
                  </span>
                  <ul className={styles.apps}>
                    {apps.map((app, appIndex) => {
                      const included = app.plans[index];
                      return (
                        <li
                          key={app.name}
                          className={cx(styles.app, !included && styles.appOff)}
                          style={{ "--i": appIndex } as CSSProperties}
                        >
                          <Icon name={app.icon} size={16} />
                          {app.name}
                          {included ? null : <span className="sr-only"> ({compare.notIncluded})</span>}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <ul className={styles.features}>
                  {plan.features.map((feature, featureIndex) =>
                    feature.endsWith(":") ? (
                      <li key={feature} className={styles.featureLead} style={{ "--i": featureIndex } as CSSProperties}>
                        <Icon name="plus" size={16} />
                        {feature}
                      </li>
                    ) : (
                      <li key={feature} className={styles.feature} style={{ "--i": featureIndex } as CSSProperties}>
                        <span className={styles.check}>
                          <Icon name="check" size={16} />
                        </span>
                        {feature}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <ul data-reveal="group" className={styles.notes}>
          {board.notes.map((note, index) => (
            <li data-reveal-item key={note.title} className={styles.noteItem}>
              <div className={styles.note}>
                <span aria-hidden="true" className={styles.noteIcon}>
                  <Icon name={NOTE_ICONS[index] ?? "check"} size={20} />
                </span>
                <strong className="text-small font-bold tracking-wide text-fg-heading uppercase">{note.title}</strong>
                <span className="text-body text-fg-muted">{note.text}</span>
              </div>
            </li>
          ))}
        </ul>

        <div data-reveal="fade" data-surface="sami" className={styles.sami}>
          <div className={styles.samiHead}>
            <span className={styles.samiLogo}>
              <Image src="/brand/sami/sami-logo.webp" alt="" width={64} height={64} className="size-16" />
            </span>
            <p className="text-body text-fg-muted">
              <strong className="block text-h4 font-bold text-fg-heading">{board.samiAddon.title}</strong>
              <span className="sr-only">{samiTiers.map((tier) => `${tier.name}: ${tier.detail}`).join(" · ")}. </span>
              {samiNote}
            </p>
          </div>
          <ul aria-hidden="true" className={styles.samiTiers}>
            {samiTiers.map((tier) => (
              <li key={tier.name} className={styles.samiTier}>
                <span className={styles.samiTierName}>{tier.name}</span>
                <span className={styles.samiTierDetail}>{tier.detail}</span>
              </li>
            ))}
          </ul>
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
