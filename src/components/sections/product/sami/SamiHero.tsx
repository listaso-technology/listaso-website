import { Button } from "@/components/ui/Button";
import { hero, heroCtas, heroStartNote } from "@/content/products/sami";
import { SamiLogoMark } from "../../home/SamiLogoMark";
import { HeroDisplay } from "../../variants/HeroDisplay";
import { SamiBrandText } from "./SamiBrandText";
import styles from "./SamiHero.module.css";

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
      lead={<SamiBrandText text={hero.lead} />}
      mark={
        <div data-sami-intro-lockup className={styles.lockup}>
          <SamiLogoMark alt="" size="lockup" />
          <span className={styles.name}><SamiBrandText text="SAMI" /></span>
          <span className={styles.lockupTagline}>Your Listaso AI Assistant</span>
        </div>
      }
      status={
        <>
          {hero.badge.label ? (
            <span className="rounded-full border border-line-subtle px-4 py-1 text-eyebrow font-bold uppercase text-fg-accent">
              {hero.badge.label}
            </span>
          ) : null}
          <span className={styles.priceChip}>
            {hero.price.prefix} <strong className="font-bold">{hero.price.amount}</strong> {hero.price.suffix}
          </span>
        </>
      }
      actions={
        <>
          <div className={styles.startCta}>
          <Button
            href={heroCtas.start.href}
            size="lg"
            className="w-full max-w-full text-center max-sm:px-4 sm:w-auto"
            data-analytics-event="cta_demo_click"
            data-analytics-location="sami-hero"
          >
            {heroCtas.start.label}
          </Button>
          <span className={styles.startNote}>{heroStartNote}</span>
          </div>
          <Button href={heroCtas.pricing.href} variant="secondary" size="lg" className="w-full max-w-full text-center sm:w-auto">
            {heroCtas.pricing.label}
          </Button>
        </>
      }
    />
  );
}
