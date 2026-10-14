import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { productCtas } from "@/content/products/shared";
import type { ProductHeroContent } from "@/content/products/types";
import backdrops from "../backdrops.module.css";
import { Signature } from "../Signature";
import { Breadcrumbs, type BreadcrumbLink } from "./Breadcrumbs";

type ProductHeroProps = {
  content: ProductHeroContent;
  icon: IconName;
  /** Right column: photo stage or product example. */
  media: ReactNode;
  /** Analytics location prefix, e.g. "pre-sales-hero". */
  location: string;
  /** Levels between Home and this page, e.g. Integrations. */
  trail?: readonly BreadcrumbLink[];
  /** Hide the demo and pricing CTAs (start-version `ctas=False`). */
  ctas?: boolean;
};

/**
 * Product page hero on the brand band (same surface as the Homepage hero):
 * breadcrumb, eyebrow, signature H1, lead, plan line and the two
 * start-version CTAs (demo and pricing).
 */
export function ProductHero({ content, icon, media, location, trail, ctas = true }: ProductHeroProps) {
  return (
    <section
      aria-labelledby="hero-title"
      data-surface="band"
      data-story-section
      className={`${backdrops.brandMesh} overflow-hidden`}
    >
      <Container
        width="wide"
        className="grid items-center gap-16 py-16 lg:min-h-[calc(88svh-4.5rem)] lg:grid-cols-[0.95fr_1.05fr] lg:py-24"
      >
        <div data-reveal="group" className="relative z-10 flex flex-col gap-6">
          <Breadcrumbs data-reveal-item current={content.breadcrumb} trail={trail} />
          <p data-reveal-item className="flex items-center gap-3 text-eyebrow font-bold uppercase text-fg-accent">
            <span className="flex size-10 items-center justify-center rounded-full border border-line-subtle text-icon-accent">
              <Icon name={icon} size={20} />
            </span>
            {content.eyebrow}
          </p>
          <h1 id="hero-title" data-reveal="mask" className="overflow-hidden text-h1 text-balance text-fg-heading">
            <span data-reveal-content className="block">
              <Signature text={content.title} />
            </span>
          </h1>
          <p data-reveal-item className="max-w-2xl text-lead text-fg-muted">
            {content.lead}
          </p>
          {content.plan ? (
            <p
              data-reveal-item
              className="flex w-fit max-w-full items-start gap-2 rounded-md border border-line-subtle px-4 py-3 text-small text-fg-default"
            >
              <Icon name="check" size={20} className="shrink-0 text-icon-accent" />
              {content.plan}
            </p>
          ) : null}
          {ctas ? (
            <div data-reveal-item className="flex flex-wrap gap-4">
              <Button
                href={productCtas.demo.href}
                size="lg"
                data-analytics-event="cta_demo_click"
                data-analytics-location={location}
              >
                {productCtas.demo.label}
              </Button>
              <Button
                href={productCtas.pricing.href}
                variant="secondary"
                size="lg"
                data-analytics-event="cta_secondary_click"
                data-analytics-location={location}
              >
                {productCtas.pricing.label}
              </Button>
            </div>
          ) : null}
        </div>
        <div className="pb-8 lg:pb-0">{media}</div>
      </Container>
    </section>
  );
}
