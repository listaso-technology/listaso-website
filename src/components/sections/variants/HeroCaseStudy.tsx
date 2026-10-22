import type { ReactNode } from "react";
import type { IconName } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import type { ProductHeroContent } from "@/content/products/types";
import { cx } from "@/lib/utils/cx";
import { Breadcrumbs, type BreadcrumbLink } from "../product/Breadcrumbs";
import { Signature } from "../Signature";
import effects from "./effects.module.css";
import styles from "./HeroCaseStudy.module.css";
import { FillPhoto, HeroCtas, HeroEyebrow, HeroPlan, type AnyPhoto } from "./HeroParts";

type HeroCaseStudyProps = {
  content: ProductHeroContent;
  icon: IconName;
  location: string;
  photo: AnyPhoto;
  /** Example panel pinned to the lower right corner of the photo. */
  overlay?: ReactNode;
  trail?: readonly BreadcrumbLink[];
  ctas?: boolean;
};

/**
 * Case-study hero (Thomas Thorstensson): eyebrow and title on the left, lead
 * and CTAs on the right behind a hairline, over a faint theme-aware grid;
 * then a wide framed photo with a gentle scroll parallax and a soft fade at
 * the bottom where `SpecSheet` overlaps it.
 */
export function HeroCaseStudy({ content, icon, location, photo, overlay, trail, ctas = true }: HeroCaseStudyProps) {
  return (
    <section aria-labelledby="hero-title" data-story-section className={styles.hero}>
      <span aria-hidden="true" className={styles.grid} />
      <Container width="wide" className="flex flex-col gap-10">
        <Breadcrumbs current={content.breadcrumb} trail={trail} />
        <div data-reveal="group" className={styles.head}>
          <div className={styles.headTitle}>
            <HeroEyebrow icon={icon}>{content.eyebrow}</HeroEyebrow>
            <h1 id="hero-title" data-reveal="mask" className="overflow-hidden text-display text-balance text-fg-heading">
              <span data-reveal-content className="block">
                <Signature text={content.title} />
              </span>
            </h1>
          </div>
          <div className={styles.headAside}>
            <p data-reveal-item className="text-lead text-fg-muted">
              {content.lead}
            </p>
            <HeroPlan>{content.plan}</HeroPlan>
            {ctas ? <HeroCtas location={location} /> : null}
          </div>
        </div>
      </Container>

      <Container width="wide" className="mt-12 lg:mt-16">
        <div data-reveal="media" className="relative">
          <div className={cx(effects.parallaxFrame, styles.frame)}>
            <div className={cx(effects.parallaxMedia, "absolute inset-0")}>
              <FillPhoto photo={photo} sizes="(min-width: 1440px) 1376px, 96vw" eager />
            </div>
            <span aria-hidden="true" className={styles.frameShade} />
          </div>
          {overlay ? (
            <div className="relative z-10 -mt-16 flex justify-center px-4 sm:px-8 lg:absolute lg:right-10 lg:bottom-10 lg:mt-0 lg:block lg:px-0">
              {overlay}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
