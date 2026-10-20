import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { benefits, culture, openings } from "@/content/company/careers";
import { cx } from "@/lib/utils/cx";
import { Signature } from "../Signature";
import { ProductSection } from "../product/ProductSection";
import { DossierBox } from "../variants/DossierBox";
import { DossierHeader } from "../variants/DossierHeader";
import dossier from "../variants/dossier.module.css";

/** Culture and growth side by side, split by a rule. */
export function CareersCulture() {
  return (
    <div data-story-section className="py-16 lg:py-24">
      <Container width="wide" className="grid lg:grid-cols-2">
        {culture.map((block, index) => (
          <div
            key={block.eyebrow}
            className={cx(
              "flex flex-col gap-6 py-8 lg:py-0",
              index === 0 ? "lg:pr-16" : "border-t border-line-subtle lg:border-t-0 lg:border-l lg:pl-16",
            )}
          >
            <DossierHeader id={`culture-${index}-title`} eyebrow={block.eyebrow} title={block.title} />
            <p data-reveal="fade" className="max-w-xl text-body-lg text-fg-muted">
              {block.text}
            </p>
          </div>
        ))}
      </Container>
    </div>
  );
}

/** Benefits: header on the left, a dossier box with every benefit on the right. */
export function CareersBenefits() {
  return (
    <ProductSection labelledBy="benefits-title" tone="alt">
      <Container width="wide" className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
        <DossierHeader id="benefits-title" eyebrow={benefits.eyebrow} title={benefits.title} lead={benefits.lead} className="lg:col-span-6" />
        <DossierBox
          title={benefits.eyebrow}
          status={String(benefits.items.length).padStart(2, "0")}
          rows={benefits.items.map((label) => ({ label, check: true }))}
          className="lg:col-span-6"
        />
      </Container>
    </ProductSection>
  );
}

/** Open positions: a large statement with the LinkedIn jobs link. */
export function CareersOpenings() {
  return (
    <ProductSection labelledBy="openings-title">
      <Container width="wide" className="flex flex-col items-start gap-8">
        <h2 id="openings-title" data-reveal="mask" className={cx(dossier.display, "overflow-hidden font-bold text-fg-heading")}>
          <span data-reveal-content className="block">
            <Signature text={openings.title} />
          </span>
        </h2>
        <p data-reveal="fade" className="max-w-2xl text-lead text-fg-muted">
          {openings.lead}
        </p>
        <Button
          href={openings.cta.href}
          size="lg"
          icon="external-link"
          data-analytics-event="careers_linkedin_click"
          data-analytics-location="careers-openings"
        >
          {openings.cta.label}
        </Button>
      </Container>
    </ProductSection>
  );
}
