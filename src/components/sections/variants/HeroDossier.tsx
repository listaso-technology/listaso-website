import type { ReactNode } from "react";
import { BrandAsset } from "@/components/brand/BrandAsset";
import { Container } from "@/components/layout/Container";
import type { ProductHeroContent } from "@/content/products/types";
import { cx } from "@/lib/utils/cx";
import { GridPattern } from "../pricing/GridPattern";
import { Breadcrumbs, type BreadcrumbLink } from "../product/Breadcrumbs";
import { Signature } from "../Signature";
import dossier from "./dossier.module.css";
import styles from "./HeroDossier.module.css";

type HeroDossierProps = {
  content: ProductHeroContent;
  /** Right column: photo, fact box or contact block. Defaults to the brand emblem. */
  aside?: ReactNode;
  /** Actions under the lead. */
  actions?: ReactNode;
  trail?: readonly BreadcrumbLink[];
};

/**
 * Decorative brand emblem for dossier heroes without a visual of their own:
 * the official symbol tile inside concentric rings with aqua, magenta and
 * navy arcs (the isotype colors).
 */
export function HeroEmblem({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cx(styles.emblem, className)}>
      <svg viewBox="0 0 400 400" className={styles.rings} focusable="false">
        <circle className={cx(styles.ring, styles.ringDashed)} cx="200" cy="200" r="196" />
        <circle className={styles.ring} cx="200" cy="200" r="160" pathLength={1} />
        <circle className={styles.ring} cx="200" cy="200" r="118" pathLength={1} />
        <circle className={cx(styles.arc, styles.arcAqua)} cx="200" cy="200" r="160" pathLength={100} strokeDasharray="16 84" />
        <circle className={cx(styles.arc, styles.arcMagenta)} cx="200" cy="200" r="196" pathLength={100} strokeDasharray="9 91" strokeDashoffset="-48" />
        <circle className={cx(styles.arc, styles.arcNavy)} cx="200" cy="200" r="118" pathLength={100} strokeDasharray="12 88" strokeDashoffset="-30" />
      </svg>
      <span className={styles.halo} />
      <span className={cx(styles.dot, styles.dotA)} />
      <span className={cx(styles.dot, styles.dotB)} />
      <span className={cx(styles.dot, styles.dotC)} />
      <span className={styles.core}>
        <BrandAsset id="listaso-symbol-multicolor" height={96} alt="" />
      </span>
    </div>
  );
}

/**
 * Dossier hero (ddark.dev): a bracketed eyebrow, an uppercase display H1 and
 * the lead over the footer's grid-and-glow pattern, with the eyebrow repeated
 * as an outlined watermark. The right column holds a photo, fact box or
 * contact block, or the brand emblem when the page has none.
 */
export function HeroDossier({ content, aside, actions, trail }: HeroDossierProps) {
  return (
    <GridPattern
      as="section"
      aria-labelledby="hero-title"
      data-story-section
      className="border-b border-line-subtle pt-12 pb-16 lg:pt-16 lg:pb-24"
    >
      <span aria-hidden="true" className={styles.watermark}>
        {content.eyebrow}
      </span>
      <Container width="wide" className="flex flex-col gap-10">
        <Breadcrumbs current={content.breadcrumb} trail={trail} />
        <div className={cx("grid gap-12 lg:grid-cols-12 lg:gap-16", aside ? "lg:items-end" : "lg:items-center")}>
          <div data-reveal="group" className="flex min-w-0 flex-col gap-6 lg:col-span-7">
            <p data-reveal-item className={cx(dossier.bracket, "text-eyebrow font-bold uppercase text-fg-accent")}>
              {content.eyebrow}
            </p>
            <h1 id="hero-title" data-reveal="mask" className={cx(dossier.display, "overflow-hidden font-bold text-balance text-fg-heading")}>
              <span data-reveal-content className="block">
                <Signature text={content.title} />
              </span>
            </h1>
            <p data-reveal-item className="max-w-2xl text-lead text-fg-muted">
              {content.lead}
            </p>
            {actions ? (
              <div data-reveal-item className="flex flex-wrap gap-4">
                {actions}
              </div>
            ) : null}
          </div>
          <div className="min-w-0 lg:col-span-5">
            {aside ?? <HeroEmblem className="max-w-[14rem] sm:max-w-[20rem] lg:max-w-none" />}
          </div>
        </div>
      </Container>
    </GridPattern>
  );
}
