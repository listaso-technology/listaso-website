import type { ReactNode } from "react";
import type { IconName } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import type { ProductHeroContent } from "@/content/products/types";
import { Breadcrumbs, type BreadcrumbLink } from "../../product/Breadcrumbs";
import { Signature } from "../../Signature";
import { FillPhoto, HeroCtas, HeroEyebrow, HeroPlan, type AnyPhoto } from "../../variants/HeroParts";
import styles from "./HeroMirror.module.css";

type HeroMirrorProps = {
  content: ProductHeroContent;
  icon: IconName;
  location: string;
  photo: AnyPhoto;
  /** Panel overlapping the photo's right edge, toward the copy. */
  panel?: ReactNode;
  /** Full-width strip under the hero (e.g. a marquee). */
  strip?: ReactNode;
  trail?: readonly BreadcrumbLink[];
};

/**
 * Mirrored split hero on the page surface (theme aware): the photo on the
 * left in a tall arched frame, the panel overlapping its edge toward the
 * copy on the right, and an optional full-width strip underneath. Mobile:
 * copy first, then the photo with the panel below it.
 */
export function HeroMirror({ content, icon, location, photo, panel, strip, trail }: HeroMirrorProps) {
  return (
    <section aria-labelledby="hero-title" data-story-section className={styles.hero}>
      <Container width="wide" className={styles.layout}>
        <div data-reveal="media" className={styles.visual}>
          <div className={styles.frame}>
            <FillPhoto photo={photo} sizes="(min-width: 1024px) 42vw, 100vw" eager />
          </div>
          {panel ? <div className={styles.panel}>{panel}</div> : null}
        </div>
        <div data-reveal="group" className={styles.copy}>
          <Breadcrumbs data-reveal-item current={content.breadcrumb} trail={trail} />
          <HeroEyebrow icon={icon}>{content.eyebrow}</HeroEyebrow>
          <h1 id="hero-title" data-reveal="mask" className={styles.title}>
            <span data-reveal-content className="block">
              <Signature text={content.title} />
            </span>
          </h1>
          <p data-reveal-item className={styles.lead}>
            {content.lead}
          </p>
          <HeroPlan>{content.plan}</HeroPlan>
          <HeroCtas location={location} />
        </div>
      </Container>
      {strip}
    </section>
  );
}
