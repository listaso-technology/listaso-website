import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import type { SignatureText } from "@/content/products/types";
import { cx } from "@/lib/utils/cx";
import { Breadcrumbs } from "../product/Breadcrumbs";
import { SamiBrandText } from "../product/sami/SamiBrandText";
import styles from "./HeroDisplay.module.css";

type HeroDisplayProps = {
  breadcrumb: string;
  title: SignatureText;
  lead: ReactNode;
  /** Status row under the headline (badges, price). */
  status: ReactNode;
  actions: ReactNode;
  /** Brand mark shown above the headline. */
  mark?: ReactNode;
};

/**
 * Display hero (Stavros Symeonidis) on the SAMI canvas: centered uppercase
 * headline over a dotted sphere, a status row, and actions with the lead
 * split below. SAMI context only (DEC-007).
 */
export function HeroDisplay({ breadcrumb, title, lead, status, actions, mark }: HeroDisplayProps) {
  return (
    <section aria-labelledby="hero-title" data-surface="sami" data-story-section data-sami-motion-scope className={styles.canvas}>
      <div aria-hidden="true" className={styles.backdrop}>
        <Image src="/images/sami/hero-bg.webp" alt="" fill priority sizes="100vw" className={styles.silk} />
      </div>
      <div aria-hidden="true" className={styles.sphere}>
        <div className={styles.dots} />
      </div>
      <Container width="wide" className="flex min-h-[calc(88svh-4.5rem)] flex-col gap-10 py-12 lg:py-16">
        <Breadcrumbs current={breadcrumb} />
        <div data-reveal="group" className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
          {mark ? <div data-reveal-item>{mark}</div> : null}
          <h1 id="hero-title" data-reveal="mask" className={cx(styles.headline, "overflow-hidden text-balance text-fg-heading")}>
            <span data-reveal-content className="block">
              <span className={styles.headlineLead}><SamiBrandText text={title.emphasis} /></span>
              <span className={styles.headlineAnswer}><SamiBrandText text={title.rest} /></span>
            </span>
          </h1>
          <div data-reveal-item className="flex flex-wrap items-center justify-center gap-3">
            {status}
          </div>
        </div>
        <div data-reveal="group" className="grid items-end gap-8 border-t border-line-subtle pt-8 xl:grid-cols-[auto_minmax(0,1fr)]">
          <div data-reveal-item className="flex min-w-0 flex-wrap items-start gap-4">
            {actions}
          </div>
          <p data-reveal-item className="max-w-3xl text-balance text-body-lg text-fg-muted">
            {lead}
          </p>
        </div>
      </Container>
    </section>
  );
}
