import Image from "next/image";
import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SmoothDisclosures } from "@/components/ui/SmoothDisclosures";
import { examples, faq, included, pricing } from "@/content/products/sami";
import { cx } from "@/lib/utils/cx";
import { SectionHeader } from "../../SectionHeader";
import { SamiConversation } from "../../home/SamiConversation";
import { BentoFeatures } from "../../variants/BentoFeatures";
import { ProductSection } from "../ProductSection";
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
      <Container width="wide" className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className={cx(examplesStyles.stage, "min-w-0 lg:sticky lg:top-28 lg:h-fit")}>
          <SamiConversation />
        </div>
        <div className="flex min-w-0 flex-col gap-10">
          <SectionHeader id="examples-title" eyebrow={examples.eyebrow} title={examples.title} lead={examples.lead} />
          <ol data-reveal="group" className={examplesStyles.prompts}>
            {examples.questions.map((question, index) => (
              <li data-reveal-item key={question} className={examplesStyles.promptItem}>
                <div className={examplesStyles.prompt}>
                  <span aria-hidden="true" className={examplesStyles.index}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className={examplesStyles.question}>
                    “{question}”
                    <span aria-hidden="true" className={examplesStyles.caret} />
                  </p>
                  <span aria-hidden="true" className={examplesStyles.action}>
                    <span className={examplesStyles.sparkle}>
                      <Icon name="ai" size={20} />
                    </span>
                    <span className={examplesStyles.send}>
                      <Icon name="arrow-right" size={20} className="-rotate-90" />
                    </span>
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
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
    <ProductSection id={pricing.id} labelledBy="sami-pricing-title" tone="alt" className="scroll-mt-24">
      <Container className="flex flex-col gap-12">
        <SectionHeader id="sami-pricing-title" eyebrow={pricing.eyebrow} title={pricing.title} lead={pricing.lead} />
        <ul data-reveal="group" className="grid gap-6 lg:grid-cols-3">
          {pricing.plans.map((plan) => (
            <li
              data-reveal-item
              key={plan.name}
              className={cx(
                "flex flex-col gap-6 rounded-md bg-surface-raised p-6",
                plan.featured ? "border-2 border-action-primary shadow-e2" : "border border-line-subtle",
              )}
            >
              {plan.featured ? (
                <span className="w-fit rounded-full bg-action-primary px-3 py-1 text-caption font-bold uppercase text-fg-on-action">
                  {pricing.featuredTag}
                </span>
              ) : null}
              <div className="flex flex-col gap-2">
                <h3 className="text-h3 font-bold text-fg-heading">{plan.name}</h3>
                <p className="text-body text-fg-muted">{plan.users}</p>
              </div>
              <p className="flex items-end gap-2">
                <span className="text-h2 font-bold text-fg-heading">{plan.price}</span>
                <span className="pb-2 text-small text-fg-muted">{pricing.perTeam}</span>
              </p>
              <p className="text-small font-semibold text-fg-default">{plan.limits}</p>
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
        <div data-reveal="fade" className="flex flex-col gap-4 rounded-md border border-line-subtle bg-surface-raised p-6 sm:flex-row sm:items-center">
          <Image src="/brand/sami/sami-logo.webp" alt={pricing.addon.logoAlt} width={44} height={44} />
          <p className="text-body text-fg-muted">
            <strong className="font-semibold text-fg-default">{pricing.addon.title}</strong> {pricing.addon.text}
          </p>
        </div>
      </Container>
    </ProductSection>
  );
}

/** "Sami, explained simply": native disclosures, no JavaScript. */
export function SamiFaq() {
  return (
    <ProductSection labelledBy="faq-title">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeader id="faq-title" eyebrow={faq.eyebrow} title={faq.title} className="lg:sticky lg:top-28 lg:h-fit" />
        <SmoothDisclosures className="border-t border-line-subtle">
          <div data-reveal="group" className="flex flex-col">
            {faq.items.map((item) => (
              <details data-reveal-item key={item.question} className="group border-b border-line-subtle">
                <summary className="cursor-pointer list-none py-6 marker:hidden [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-6 text-h4 font-semibold text-fg-heading">
                    {item.question}
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line-subtle text-icon-accent transition-transform duration-(--listaso-duration-standard) group-[[open]:not([data-closing])]:rotate-45">
                      <Icon name="plus" size={20} />
                    </span>
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 text-body-lg text-fg-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </SmoothDisclosures>
      </Container>
    </ProductSection>
  );
}
