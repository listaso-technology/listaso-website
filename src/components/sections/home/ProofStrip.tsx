import type { ComponentType, CSSProperties } from "react";
import { Container } from "@/components/layout/Container";
import { Icon, type IconName } from "@/components/icons/Icon";
import { proof } from "@/content/home/en";
import { cx } from "@/lib/utils/cx";
import { proofTone } from "../proofTones";
import { ProofCounter } from "./ProofCounter";
import { ProofGrid } from "./ProofGrid";
import styles from "./ProofStrip.module.css";

/**
 * Key figures (approved start-version content, DEC-013) as a bento of five
 * cards. Each card pairs its counter with a decorative micro-visual that
 * draws in on reveal and reacts on hover; the last figure closes the row as
 * the featured card. Visuals are aria-hidden and carry no data of their own.
 */

type Visual = "timeline" | "network" | "team" | "orders" | "growth";

/** Visual and icon per figure, in content order (like proofTones). */
const figureArt: { visual: Visual; icon: IconName }[] = [
  { visual: "timeline", icon: "history" },
  { visual: "network", icon: "map" },
  { visual: "team", icon: "customers" },
  { visual: "orders", icon: "orders" },
  { visual: "growth", icon: "chart" },
];

const FOUNDED = 2015;
const BAR_HEIGHTS = [34, 46, 40, 55, 50, 62, 58, 70, 66, 78, 74, 86, 82, 96];
const NETWORK_HUBS = new Set([3, 9, 14, 20, 27, 29]);

/** Staggered delay index for a visual's parts. */
const step = (index: number) => ({ "--i": index }) as CSSProperties;

function TimelineVisual() {
  const thisYear = new Date().getFullYear();
  const years = Array.from({ length: thisYear - FOUNDED + 1 }, (_, index) => index);

  return (
    <div className={styles.timeline}>
      <div className={styles.timelineTrack}>
        <span className={styles.timelineFill} />
        {years.map((year) => (
          <span
            key={year}
            className={cx(styles.timelineTick, (year === 0 || year === years.length - 1) && styles.milestone)}
            style={step(year)}
          />
        ))}
        <span className={styles.timelineDot} />
      </div>
      <div className={styles.timelineYears}>
        <span>{FOUNDED}</span>
        <span>{thisYear}</span>
      </div>
    </div>
  );
}

function NetworkVisual() {
  return (
    <div className={styles.network}>
      {Array.from({ length: 32 }, (_, index) => (
        <span
          key={index}
          className={cx(styles.node, NETWORK_HUBS.has(index) && styles.hub)}
          style={step((index % 8) + Math.floor(index / 8))}
        />
      ))}
    </div>
  );
}

function TeamVisual() {
  const roles: IconName[] = ["user", "truck", "dashboard"];

  return (
    <div className={styles.team}>
      {roles.map((role, index) => (
        <span key={role} className={styles.avatar} style={step(index)}>
          <Icon name={role} size={20} />
        </span>
      ))}
      <span className={cx(styles.avatar, styles.avatarMore)} style={step(roles.length)}>
        <Icon name="plus" size={16} />
      </span>
    </div>
  );
}

function OrdersVisual() {
  return (
    <div className={styles.bars}>
      {BAR_HEIGHTS.map((height, index) => (
        <span
          key={index}
          className={styles.bar}
          style={{ ...step(index), "--h": `${height}%` } as CSSProperties}
        />
      ))}
    </div>
  );
}

function GrowthVisual() {
  const line = "M0 104 C 48 100, 72 92, 112 86 S 176 70, 216 62 S 288 40, 330 28 S 382 12, 400 8";

  return (
    <div className={styles.growthStage}>
      <svg className={styles.growth} viewBox="0 0 400 120" preserveAspectRatio="none" focusable="false">
        <defs>
          <linearGradient id="proof-growth-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" className={styles.growthStop} stopOpacity="0.32" />
            <stop offset="100%" className={styles.growthStop} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className={styles.growthArea} d={`${line} L400 120 L0 120 Z`} fill="url(#proof-growth-fill)" />
        <path className={styles.growthLine} d={line} pathLength={1} />
      </svg>
      <span className={styles.growthDot} />
    </div>
  );
}

const visuals: Record<Visual, ComponentType> = {
  timeline: TimelineVisual,
  network: NetworkVisual,
  team: TeamVisual,
  orders: OrdersVisual,
  growth: GrowthVisual,
};

export function ProofStrip() {
  return (
    <section data-story-section aria-labelledby="proof-title" className={styles.section}>
      <div aria-hidden="true" className={styles.pattern} />
      <Container className={styles.container}>
        <h2 id="proof-title" className={styles.heading}>
          {proof.label}
        </h2>
        <ProofGrid data-reveal="group" className={styles.grid}>
          {proof.items.map((item, index) => {
            const { visual, icon } = figureArt[index % figureArt.length];
            const Visual = visuals[visual];
            const featured = index === proof.items.length - 1;

            return (
              <li key={item.value} data-reveal-item className={cx(styles.cell, featured && styles.featuredCell)}>
                <article
                  data-counter-host
                  data-tone={proofTone(index)}
                  className={cx(styles.card, featured && styles.featured)}
                >
                  <div className={styles.top}>
                    <span aria-hidden="true" className={styles.index}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.chip}>
                      <Icon name={icon} size={20} />
                    </span>
                  </div>
                  <div aria-hidden="true" className={styles.visual}>
                    <Visual />
                  </div>
                  <div className={styles.copy}>
                    <ProofCounter className={styles.value} affixClassName={styles.affix} value={item.value} />
                    <p className={styles.label}>{item.label}</p>
                  </div>
                </article>
              </li>
            );
          })}
        </ProofGrid>
      </Container>
    </section>
  );
}
