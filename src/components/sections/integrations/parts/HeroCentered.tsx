import type { ReactNode } from "react";
import type { IconName } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import type { ProductHeroContent } from "@/content/products/types";
import { Breadcrumbs, type BreadcrumbLink } from "../../product/Breadcrumbs";
import { Signature } from "../../Signature";
import effects from "../../variants/effects.module.css";
import { FillPhoto, HeroCtas, HeroEyebrow, HeroPlan, type AnyPhoto } from "../../variants/HeroParts";
import styles from "./HeroCentered.module.css";

type HeroCenteredProps = {
  content: ProductHeroContent;
  icon: IconName;
  location: string;
  photo: AnyPhoto;
  /** Panel centred over the bottom edge of the photo. */
  overlay?: ReactNode;
  /** Decorative labels pinned to the photo's left and right edges. */
  ends?: readonly [ReactNode, ReactNode];
  trail?: readonly BreadcrumbLink[];
};

/**
 * Centred hero on the navy band: everything stacked on the axis, then a
 * wide photo (scroll parallax) flanked by two end labels, with the example
 * panel centred over its lower edge. Mobile: the panel follows the photo.
 */
export function HeroCentered({ content, icon, location, photo, overlay, ends, trail }: HeroCenteredProps) {
  return (
    <section aria-labelledby="hero-title" data-surface="band" data-story-section className={styles.hero}>
      <span aria-hidden="true" className={styles.glow} />
      <Container width="wide" className={styles.layout}>
        <div className={styles.crumbs}>
          <Breadcrumbs current={content.breadcrumb} trail={trail} />
        </div>
        <div data-reveal="group" className={styles.copy}>
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
          <HeroCtas location={location} className="justify-center" />
        </div>

        <div data-reveal="media" className={styles.stage}>
          <div className={`${effects.parallaxFrame} ${styles.frame}`}>
            <div className={`${effects.parallaxMedia} absolute inset-0`}>
              <FillPhoto photo={photo} sizes="(min-width: 1440px) 1376px, 96vw" eager />
            </div>
            <span aria-hidden="true" className={styles.shade} />
            {ends ? (
              <>
                <span aria-hidden="true" className={`${styles.end} ${styles.endLeft}`}>
                  {ends[0]}
                </span>
                <span aria-hidden="true" className={`${styles.end} ${styles.endRight}`}>
                  {ends[1]}
                </span>
              </>
            ) : null}
          </div>
          {overlay ? <div className={styles.overlay}>{overlay}</div> : null}
        </div>
      </Container>
    </section>
  );
}
