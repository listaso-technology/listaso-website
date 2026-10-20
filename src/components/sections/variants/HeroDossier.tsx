import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import type { ProductHeroContent } from "@/content/products/types";
import { cx } from "@/lib/utils/cx";
import { Breadcrumbs, type BreadcrumbLink } from "../product/Breadcrumbs";
import { Signature } from "../Signature";
import dossier from "./dossier.module.css";

type HeroDossierProps = {
  content: ProductHeroContent;
  /** Right column: photo, fact box or contact block. */
  aside?: ReactNode;
  /** Actions under the lead. */
  actions?: ReactNode;
  trail?: readonly BreadcrumbLink[];
};

/**
 * Dossier hero (ddark.dev): on the page surface (light or dark), a
 * bracketed eyebrow, an uppercase display H1 and the lead, with an optional
 * aside such as a framed fact box or a halftone photo.
 */
export function HeroDossier({ content, aside, actions, trail }: HeroDossierProps) {
  return (
    <section aria-labelledby="hero-title" data-story-section className="border-b border-line-subtle pt-12 pb-16 lg:pt-16 lg:pb-24">
      <Container width="wide" className="flex flex-col gap-10">
        <Breadcrumbs current={content.breadcrumb} trail={trail} />
        <div className={cx("grid gap-12 lg:gap-16", aside ? "lg:grid-cols-12 lg:items-end" : "")}>
          <div data-reveal="group" className={cx("flex min-w-0 flex-col gap-6", aside ? "lg:col-span-7" : "max-w-5xl")}>
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
          {aside ? <div className="min-w-0 lg:col-span-5">{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}
