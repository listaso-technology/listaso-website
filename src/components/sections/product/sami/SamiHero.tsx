import { Button } from "@/components/ui/Button";
import { hero, heroCtas } from "@/content/products/sami";
import { SamiLogoMark } from "../../home/SamiLogoMark";
import { HeroDisplay } from "../../variants/HeroDisplay";

/**
 * Sami hero: display variant (Stavros Symeonidis) on the SAMI canvas, with
 * the approved badge, price and CTAs. The conversation moves to the examples
 * section below.
 */
export function SamiHero() {
  return (
    <HeroDisplay
      breadcrumb={hero.breadcrumb}
      title={hero.title}
      lead={hero.lead}
      mark={<SamiLogoMark alt={hero.logoAlt} />}
      status={
        <>
          <span className="rounded-full bg-action-primary px-3 py-1 text-caption font-bold uppercase text-fg-on-action">
            {hero.badge.tag}
          </span>
          <span className="rounded-full border border-line-subtle px-4 py-1 text-eyebrow font-bold uppercase text-fg-accent">
            {hero.badge.label}
          </span>
          <span className="rounded-full border border-line-subtle px-4 py-1 text-small text-fg-muted">
            {hero.price.prefix} <strong className="font-bold text-fg-heading">{hero.price.amount}</strong> {hero.price.suffix}
          </span>
        </>
      }
      actions={
        <>
          <Button
            href={heroCtas.start.href}
            size="lg"
            data-analytics-event="cta_demo_click"
            data-analytics-location="sami-hero"
          >
            {heroCtas.start.label}
          </Button>
          <Button href={heroCtas.pricing.href} variant="secondary" size="lg">
            {heroCtas.pricing.label}
          </Button>
        </>
      }
    />
  );
}
