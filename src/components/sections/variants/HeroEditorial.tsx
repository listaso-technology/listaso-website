import type { ReactNode } from "react";
import type { IconName } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { hero as homeHero } from "@/content/home/en";
import type { ProductHeroContent } from "@/content/products/types";
import { cx } from "@/lib/utils/cx";
import { Stars } from "../home/Stars";
import { Breadcrumbs, type BreadcrumbLink } from "../product/Breadcrumbs";
import { Signature } from "../Signature";
import effects from "./effects.module.css";
import styles from "./HeroEditorial.module.css";
import { FillPhoto, HeroCtas, HeroEyebrow, HeroPlan, type AnyPhoto } from "./HeroParts";

type HeroEditorialProps = {
  content: ProductHeroContent;
  icon: IconName;
  location: string;
  photo: AnyPhoto;
  /** Example panel over the photo (one glass surface at most). */
  overlay?: ReactNode;
  trail?: readonly BreadcrumbLink[];
};

/**
 * Editorial hero (Good Fella): an oversized left-aligned headline with a
 * typing caret on the navy band, a tall photo with a navy halftone screen,
 * and a proof row with the approved ratings at the bottom.
 */
export function HeroEditorial({ content, icon, location, photo, overlay, trail }: HeroEditorialProps) {
  return (
    <section aria-labelledby="hero-title" data-surface="band" data-story-section className={cx(styles.backdrop, "overflow-hidden")}>
      <Container width="wide" className="grid gap-12 pt-12 pb-12 lg:grid-cols-12 lg:gap-8 lg:pt-16">
        <div data-reveal="group" className="flex flex-col gap-8 lg:col-span-7 lg:justify-between lg:pb-8">
          <div className="flex flex-col gap-6">
            <Breadcrumbs data-reveal-item current={content.breadcrumb} trail={trail} />
            <HeroEyebrow icon={icon}>{content.eyebrow}</HeroEyebrow>
          </div>
          <h1 id="hero-title" data-reveal="mask" className={cx(styles.headline, "overflow-hidden text-balance text-fg-heading")}>
            <span data-reveal-content className={cx("block", effects.caret)}>
              <Signature text={content.title} />
            </span>
          </h1>
          <div className="flex flex-col gap-6">
            <p data-reveal-item className="max-w-2xl text-lead text-fg-muted">
              {content.lead}
            </p>
            <HeroPlan>{content.plan}</HeroPlan>
            <HeroCtas location={location} />
          </div>
        </div>

        <div data-reveal="media" className="relative lg:col-span-5">
          <div className={cx(effects.halftone, "relative aspect-[4/5] overflow-hidden rounded-lg bg-surface-soft")}>
            <FillPhoto photo={photo} sizes="(min-width: 1024px) 40vw, 92vw" eager />
          </div>
          {overlay ? (
            <div className="relative z-10 -mt-20 flex justify-center px-4 lg:absolute lg:bottom-8 lg:-left-20 lg:mt-0 lg:block lg:px-0">
              {overlay}
            </div>
          ) : null}
        </div>
      </Container>

      <div className="border-t border-line-subtle">
        <Container width="wide">
          <ul className="flex flex-wrap items-center gap-x-10 gap-y-3 py-6 text-small text-fg-default">
            {homeHero.ratings.map((rating) => (
              <li key={rating.label} className="flex items-center gap-2">
                <Stars />
                <strong className="font-bold">{rating.score}</strong>
                <span className="text-fg-muted">{rating.label}</span>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
