import type { CSSProperties } from "react";
import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import type { SectionPhoto } from "@/content/media/sections";
import { features, hero, process } from "@/content/products/custom-development";
import { cx } from "@/lib/utils/cx";
import backdrops from "../../backdrops.module.css";
import { Breadcrumbs } from "../Breadcrumbs";
import { Signature } from "../../Signature";
import effects from "../../variants/effects.module.css";
import { FillPhoto, HeroCtas, HeroEyebrow } from "../../variants/HeroParts";
import styles from "./CustomDevHero.module.css";

/** Decorative code lines: indent (in steps) and width (%) per line, with a syntax tone. */
const codeLines = [
  { indent: 0, width: 46, tone: "aqua" },
  { indent: 1, width: 62, tone: "white" },
  { indent: 2, width: 38, tone: "magenta" },
  { indent: 2, width: 54, tone: "white" },
  { indent: 1, width: 30, tone: "aqua" },
  { indent: 0, width: 20, tone: "white" },
] as const;

/**
 * Custom Development hero on the brand band: copy and the four process steps
 * on the left; on the right the code photo with a gentle parallax, the three
 * capabilities from "What we build" on a light card and a decorative code
 * window whose lines type in once. All copy comes from the page content.
 */
export function CustomDevHero({ photo, location }: { photo: SectionPhoto; location: string }) {
  return (
    <section aria-labelledby="hero-title" data-surface="band" data-story-section className={cx(backdrops.brandMesh, styles.hero)}>
      <span aria-hidden="true" className={styles.grid} />
      <Container width="wide" className={styles.layout}>
        <div data-reveal="group" className={styles.copy}>
          <Breadcrumbs data-reveal-item current={hero.breadcrumb} />
          <HeroEyebrow icon="report">{hero.eyebrow}</HeroEyebrow>
          <h1 id="hero-title" data-reveal="mask" className="overflow-hidden text-display text-balance text-fg-heading">
            <span data-reveal-content className="block">
              <Signature text={hero.title} />
            </span>
          </h1>
          <p data-reveal-item className="max-w-xl text-lead text-fg-muted">
            {hero.lead}
          </p>
          <HeroCtas location={location} secondary={hero.secondaryCta} />
          <ol data-reveal-item className={styles.steps} aria-label={process.eyebrow}>
            {process.steps.map((step, index) => (
              <li key={step.title}>
                <span aria-hidden="true" className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span>
                {step.title}
              </li>
            ))}
          </ol>
        </div>

        <div data-reveal="media" className={styles.stage}>
          <div className={cx(effects.parallaxFrame, styles.frame)}>
            <div className={cx(effects.parallaxMedia, "absolute inset-0")}>
              <FillPhoto photo={photo} sizes="(min-width: 1024px) 44vw, 92vw" eager />
            </div>
            <span aria-hidden="true" className={styles.shade} />
          </div>

          <div aria-hidden="true" className={styles.code}>
            <span className={styles.codeBar}><span /><span /><span /></span>
            <span className={styles.codeBody}>
              {codeLines.map((line, index) => (
                <span
                  key={index}
                  className={styles.codeLine}
                  data-tone={line.tone}
                  style={{ "--indent": line.indent, "--width": `${line.width}%`, "--i": index } as CSSProperties}
                />
              ))}
            </span>
          </div>

          <div data-theme="light" className={styles.build}>
            <p className={styles.buildTitle}>{features.eyebrow}</p>
            <ul className={styles.buildList}>
              {features.items.map((item) => (
                <li key={item.title}>
                  <span aria-hidden="true" className={styles.buildIcon}><Icon name={item.icon} size={20} /></span>
                  <span className={styles.buildName}>{item.title}</span>
                  <Icon name="check" size={16} className={styles.buildCheck} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
