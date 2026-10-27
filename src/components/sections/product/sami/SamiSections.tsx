import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { examples, faq, included, pricing, salesContact } from "@/content/products/sami";
import { cx } from "@/lib/utils/cx";
import { SectionHeader } from "../../SectionHeader";
import { SamiExampleSelector } from "./SamiExampleSelector";
import { BentoFeatures } from "../../variants/BentoFeatures";
import { ProductSection } from "../ProductSection";
import { SamiBrandText } from "./SamiBrandText";
import { SamiFaqAccordion } from "./SamiFaqAccordion";
import { SamiSalesContact as SamiSalesContactSection } from "./SamiSalesContact";
import examplesStyles from "./SamiExamples.module.css";

/**
 * "Questions you can ask today", still inside the SAMI space: the animated
 * conversation from the Homepage (sticky, with a soft halo) beside the
 * example questions as prompt cards.
 */
export function SamiExamples() {
  return (
    <section
      aria-labelledby="examples-title"
      data-surface="sami"
      data-story-section
      className={cx(examplesStyles.section, "border-t border-line-subtle bg-surface-alt py-16 lg:py-24")}
    >
      <span aria-hidden="true" className={examplesStyles.atmosphere}>
        <span className={examplesStyles.dots} />
      </span>
      <Container width="wide" className="flex flex-col gap-10">
        <SectionHeader id="examples-title" eyebrow={examples.eyebrow} title={examples.title} lead={examples.lead} />
        <SamiExampleSelector />
      </Container>
    </section>
  );
}

/** "Everything you need to start": what every Sami plan includes, as a bento. */
export function SamiIncluded() {
  return <BentoFeatures id="included-title" section={included} />;
}

/** Sami plans, priced per team, plus the SAMI Credit add-on. */
export function SamiPricing() {
  return (
    <ProductSection id={pricing.id} labelledBy="sami-pricing-title" tone="alt" className="scroll-mt-24 pt-22 lg:pt-30">
      <Container className="flex flex-col gap-12">
        <SectionHeader id="sami-pricing-title" eyebrow={pricing.eyebrow} title={pricing.title} lead={pricing.lead} />
        <aside
          aria-label={pricing.trialNoteLabel}
          className="flex w-fit max-w-full flex-col gap-1 rounded-md border-l-4 border-action-primary bg-surface-sami px-5 py-4"
        >
          <p className="text-eyebrow font-bold uppercase text-fg-accent">{pricing.trialNoteLabel}</p>
          <p className="text-body text-fg-default">
            {pricing.trialNote.split(/(?<=\.)\s+/).map((sentence, index) => (
              <span key={sentence} className={index === 0 ? "block font-bold" : "block"}>
                {sentence}
              </span>
            ))}
          </p>
        </aside>
        <ul data-reveal="group" className="grid items-stretch gap-4 lg:grid-cols-3">
          {pricing.plans.map((plan) => (
            <li
              data-reveal-item
              key={plan.name}
              className={cx(
                "flex h-full min-w-0 flex-col gap-4 rounded-md bg-surface-raised p-4 sm:p-6",
                plan.featured ? "border-2 border-action-primary shadow-e2" : "border border-line-subtle",
              )}
            >
              <div className="flex h-8 items-center">
                {plan.featured ? (
                  <span className="w-fit rounded-full bg-action-primary px-3 py-1 text-caption font-bold uppercase text-fg-on-action">
                    {pricing.featuredTag}
                  </span>
                ) : null}
              </div>
              <div className="flex min-h-8 flex-col gap-0.5">
                <h3 className="text-h3 font-bold text-fg-heading"><SamiBrandText text={plan.name} /></h3>
                <p className="text-body text-fg-muted">{plan.users}</p>
              </div>
              <p className="flex min-h-8 items-end gap-2">
                <span className="text-h2 font-bold text-fg-heading">{plan.price}</span>
                <span className="pb-2 text-small text-fg-muted">{pricing.perTeam}</span>
              </p>
              <p className="min-h-4 text-small font-semibold text-fg-default">{plan.limits}</p>
              <p className="min-h-8 text-small text-fg-muted">Onboarding {plan.onboarding}</p>
              <ul className="flex flex-col gap-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-body text-fg-default">
                    <span className="flex h-6 shrink-0 items-center text-icon-accent">
                      <Icon name="check" size={20} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                href={pricing.cta.href}
                variant={plan.featured ? "primary" : "secondary"}
                className="mt-auto w-full"
                data-analytics-event="cta_demo_click"
                data-analytics-location={`sami-pricing-${plan.name.toLowerCase()}`}
              >
                {pricing.cta.label}
              </Button>
            </li>
          ))}
        </ul>
        <p data-reveal="fade" className="max-w-4xl text-body leading-relaxed text-fg-muted">{pricing.onboardingNote}</p>
      </Container>
    </ProductSection>
  );
}

/** SAMI sales intake; the Zoho form embed is pending its dedicated URL. */
export function SamiSalesContact() {
  return <SamiSalesContactSection section={salesContact} />;
}

/** "Sami, explained simply": native disclosures, no JavaScript. */
export function SamiFaq() {
  return (
    <ProductSection labelledBy="faq-title">
      <Container className="grid min-w-0 gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <SectionHeader id="faq-title" eyebrow={faq.eyebrow} title={faq.title} className="lg:sticky lg:top-28 lg:h-fit" />
        <SamiFaqAccordion items={faq.items} />
      </Container>
    </ProductSection>
  );
}
