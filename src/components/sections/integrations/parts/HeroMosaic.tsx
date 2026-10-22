import type { ReactNode } from "react";
import type { IconName } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import type { ProductHeroContent } from "@/content/products/types";
import { Breadcrumbs, type BreadcrumbLink } from "../../product/Breadcrumbs";
import { Signature } from "../../Signature";
import { FillPhoto, HeroCtas, HeroEyebrow, HeroPlan, type AnyPhoto } from "../../variants/HeroParts";
import styles from "./HeroMosaic.module.css";

type HeroMosaicProps = {
  content: ProductHeroContent;
  icon: IconName;
  location: string;
  photo: AnyPhoto;
  /** Tile beside the photo (the sync panel). */
  panel: ReactNode;
  trail?: readonly BreadcrumbLink[];
};

/**
 * Mosaic hero on the page surface (theme aware): copy on the left; on the
 * right a tilted grid of tiles, the photo tall, the sync panel beside it.
 * Tiles straighten on hover. Mobile: copy, photo, then the panel.
 */
export function HeroMosaic({ content, icon, location, photo, panel, trail }: HeroMosaicProps) {
  return (
    <section aria-labelledby="hero-title" data-story-section className={styles.hero}>
      <span aria-hidden="true" className={styles.dots} />
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

        <div data-reveal="media" className={styles.mosaic}>
          <div className={styles.photoTile}>
            <FillPhoto photo={photo} sizes="(min-width: 1024px) 34vw, 100vw" eager />
          </div>
          <div className={styles.panelTile}>{panel}</div>
          <span aria-hidden="true" className={styles.accentTile} />
        </div>
      </Container>
    </section>
  );
}
