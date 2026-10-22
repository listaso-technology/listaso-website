import type { ReactNode } from "react";
import type { IconName } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import type { ProductHeroContent } from "@/content/products/types";
import { cx } from "@/lib/utils/cx";
import { Breadcrumbs, type BreadcrumbLink } from "../product/Breadcrumbs";
import { Signature } from "../Signature";
import styles from "./HeroStatement.module.css";
import { FillPhoto, HeroCtas, HeroEyebrow, HeroPlan, type AnyPhoto } from "./HeroParts";

type HeroStatementProps = {
  content: ProductHeroContent;
  icon: IconName;
  location: string;
  photo: AnyPhoto;
  /** Example panel anchored to the photo frame (over its lower corner). */
  overlay?: ReactNode;
  trail?: readonly BreadcrumbLink[];
  ctas?: boolean;
};

/**
 * Split hero (shared by Products and Integrations pages) on the navy band in
 * both themes: copy on the left, the page photo in a large rounded frame on
 * the right (sized so the self-hosted image stays sharp), and the example
 * panel overlapping the frame's lower-left corner so it reads as part of the
 * composition. Mobile: copy, then the frame with the panel over its bottom.
 */
export function HeroStatement({ content, icon, location, photo, overlay, trail, ctas = true }: HeroStatementProps) {
  return (
    <section aria-labelledby="hero-title" data-surface="band" data-story-section className={styles.hero}>
      <span aria-hidden="true" className={styles.grid} />

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
          {ctas ? <HeroCtas location={location} /> : null}
        </div>

        <div data-reveal="media" className={cx(styles.visual, Boolean(overlay) && styles.withOverlay)}>
          <div className={styles.frame}>
            <FillPhoto photo={photo} sizes="(min-width: 1024px) 64vw, 100vw" eager className={styles.photo} />
            <span aria-hidden="true" className={styles.frameShade} />
          </div>
          {overlay ? <div className={styles.overlay}>{overlay}</div> : null}
        </div>
      </Container>
    </section>
  );
}
