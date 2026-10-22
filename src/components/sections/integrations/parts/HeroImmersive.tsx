import type { ReactNode } from "react";
import type { IconName } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import type { ProductHeroContent } from "@/content/products/types";
import { Breadcrumbs, type BreadcrumbLink } from "../../product/Breadcrumbs";
import { Signature } from "../../Signature";
import effects from "../../variants/effects.module.css";
import { FillPhoto, HeroCtas, HeroEyebrow, HeroPlan, type AnyPhoto } from "../../variants/HeroParts";
import styles from "./HeroImmersive.module.css";

type HeroImmersiveProps = {
  content: ProductHeroContent;
  icon: IconName;
  location: string;
  photo: AnyPhoto;
  /** Panel on the right over the photo (below the copy on small screens). */
  panel?: ReactNode;
  trail?: readonly BreadcrumbLink[];
};

/**
 * Immersive hero: the page photo full bleed behind the copy (scroll
 * parallax), darkened toward the copy side, with the band's text roles so
 * it reads the same in both themes; the sync panel sits on the right.
 */
export function HeroImmersive({ content, icon, location, photo, panel, trail }: HeroImmersiveProps) {
  return (
    <section aria-labelledby="hero-title" data-surface="band" data-story-section className={`${styles.hero} ${effects.parallaxFrame}`}>
      <div aria-hidden="true" className={`${effects.parallaxMedia} ${styles.media}`}>
        <FillPhoto photo={photo} sizes="100vw" eager />
      </div>
      <span aria-hidden="true" className={styles.shade} />
      <Container width="wide" className={styles.layout}>
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
        {panel ? (
          <div data-reveal="media" className={styles.panel}>
            {panel}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
