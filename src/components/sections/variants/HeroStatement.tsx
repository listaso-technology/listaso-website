import type { ReactNode } from "react";
import type { IconName } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import type { ProductHeroContent } from "@/content/products/types";
import backdrops from "../backdrops.module.css";
import { Breadcrumbs, type BreadcrumbLink } from "../product/Breadcrumbs";
import { Signature } from "../Signature";
import effects from "./effects.module.css";
import { FillPhoto, HeroCtas, HeroEyebrow, HeroPlan, type AnyPhoto } from "./HeroParts";

type HeroStatementProps = {
  content: ProductHeroContent;
  icon: IconName;
  location: string;
  photo: AnyPhoto;
  /** Example panel shown over the photo on desktop and under it on mobile. */
  overlay?: ReactNode;
  trail?: readonly BreadcrumbLink[];
  ctas?: boolean;
};

/**
 * Statement hero (Symboolic): a centered headline on the page surface, so it
 * follows the light or dark theme, and a full-bleed photo that grows from an
 * inset card as it scrolls into view. The photo is static without
 * scroll-driven animation support or with reduced motion.
 */
export function HeroStatement({ content, icon, location, photo, overlay, trail, ctas = true }: HeroStatementProps) {
  return (
    <section aria-labelledby="hero-title" data-story-section className="overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
      <Container>
        <div data-reveal="group" className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <Breadcrumbs data-reveal-item current={content.breadcrumb} trail={trail} />
          <HeroEyebrow icon={icon}>{content.eyebrow}</HeroEyebrow>
          <h1 id="hero-title" data-reveal="mask" className="overflow-hidden text-display text-balance text-fg-heading">
            <span data-reveal-content className="block">
              <Signature text={content.title} />
            </span>
          </h1>
          <p data-reveal-item className="max-w-3xl text-lead text-fg-muted">
            {content.lead}
          </p>
          <HeroPlan>{content.plan}</HeroPlan>
          {ctas ? <HeroCtas location={location} className="justify-center" /> : null}
        </div>
      </Container>

      <div className="mt-12 px-4 md:px-6 lg:mt-16 lg:px-8">
        <div className={`${effects.expand} relative mx-auto max-w-wide`}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface-soft sm:aspect-[16/9] lg:aspect-[21/9]">
            <FillPhoto photo={photo} sizes="(min-width: 1440px) 1440px, 100vw" eager />
            <div aria-hidden="true" className={`${backdrops.photoScrim} absolute inset-0`} />
          </div>
          {overlay ? (
            <div className="relative z-10 -mt-16 flex justify-center px-4 sm:px-8 lg:absolute lg:bottom-10 lg:left-10 lg:mt-0 lg:block lg:px-0">
              {overlay}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
