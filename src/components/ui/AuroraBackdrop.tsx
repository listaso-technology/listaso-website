import { useId } from "react";
import { cx } from "@/lib/utils/cx";
import styles from "./AuroraBackdrop.module.css";

type AuroraBackdropProps = {
  /** Mirrors the composition horizontally. */
  side?: "left" | "right";
  /** `soft` lowers the curtains so text can sit over them. */
  intensity?: "soft" | "full";
  /** Slow ambient sway. Always static under reduced motion. */
  animated?: boolean;
  className?: string;
};

/**
 * One aurora curtain: `crest` is the glowing edge, the body fades downward and
 * is striated by a vertical mask. Edit the paths or the colors to reshape it.
 */
const CURTAINS = [
  {
    key: "a",
    crest: "M-120 430 C 180 250 400 540 700 340 S 1160 190 1560 390",
    tone: ["aqua", "blue", "magenta"],
    fade: [200, 620],
    opacity: 1,
  },
  {
    key: "b",
    crest: "M-120 590 C 280 410 520 660 830 480 S 1230 380 1560 540",
    tone: ["blue", "violet", "magenta"],
    fade: [400, 760],
    opacity: 0.8,
  },
  {
    key: "c",
    crest: "M620 -60 C 860 130 1080 20 1560 250",
    tone: ["aqua", "aqua", "blue"],
    fade: [-60, 330],
    opacity: 0.65,
  },
] as const;

const COLOR: Record<string, string> = {
  aqua: "var(--aurora-aqua-light)",
  blue: "var(--aurora-blue-light)",
  violet: "var(--aurora-violet)",
  magenta: "var(--aurora-magenta)",
};

/**
 * Brand background in the manner of an aurora borealis: a deep navy base with
 * flowing curtains of light in Listaso aqua, blue and magenta, built from
 * editable SVG paths and CSS custom properties (`--aurora-*`, see the module).
 * No raster images.
 *
 * Usage: the parent must be `position: relative` with `isolation: isolate` and
 * `overflow: hidden`; the backdrop sits at `z-index: -1` behind the content.
 * It is decorative (`aria-hidden`), static under `prefers-reduced-motion`, and
 * only animates `transform` and `opacity`.
 */
export function AuroraBackdrop({
  side = "right",
  intensity = "full",
  animated = true,
  className,
}: AuroraBackdropProps) {
  const uid = useId().replace(/:/g, "");
  const id = (name: string) => `${uid}-${name}`;

  return (
    <div
      aria-hidden="true"
      data-side={side}
      data-intensity={intensity}
      data-animated={animated ? "true" : "false"}
      className={cx(styles.root, className)}
    >
      <span className={cx(styles.glow, styles.glowA)} />
      <span className={cx(styles.glow, styles.glowB)} />
      <svg className={styles.svg} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" focusable="false">
        <defs>
          {/* Vertical striations: the rays that make a curtain read as aurora. */}
          <pattern id={id("rays")} width="46" height="10" patternUnits="userSpaceOnUse">
            <rect width="46" height="10" fill={`url(#${id("ray")})`} />
          </pattern>
          <pattern id={id("rays2")} width="83" height="10" x="19" patternUnits="userSpaceOnUse">
            <rect width="83" height="10" fill={`url(#${id("ray")})`} opacity="0.7" />
          </pattern>
          <linearGradient id={id("ray")} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0.4" />
            <stop offset="0.4" stopColor="#fff" stopOpacity="1" />
            <stop offset="0.7" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#fff" stopOpacity="0.35" />
          </linearGradient>
          <filter id={id("rayblur")} x="0" y="0" width="100%" height="100%">
            <feGaussianBlur stdDeviation="4 0" />
          </filter>
          <filter id={id("soft")} x="-10%" y="-20%" width="120%" height="140%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <filter id={id("glow")} x="-10%" y="-60%" width="120%" height="220%">
            <feGaussianBlur stdDeviation="9" />
          </filter>

          {CURTAINS.map((c) => (
            <g key={c.key}>
              <linearGradient id={id(`edge-${c.key}`)} x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor={COLOR[c.tone[0]]} />
                <stop offset="0.5" stopColor={COLOR[c.tone[1]]} />
                <stop offset="1" stopColor={COLOR[c.tone[2]]} />
              </linearGradient>
              <linearGradient id={id(`body-${c.key}`)} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={c.fade[0]} y2={c.fade[1]}>
                <stop offset="0" stopColor={COLOR[c.tone[1]]} stopOpacity="0.5" />
                <stop offset="0.5" stopColor={COLOR[c.tone[2]]} stopOpacity="0.18" />
                <stop offset="1" stopColor={COLOR[c.tone[2]]} stopOpacity="0" />
              </linearGradient>
              <mask id={id(`mask-${c.key}`)} maskUnits="userSpaceOnUse" x="-200" y="-100" width="1840" height="1100">
                <g filter={`url(#${id("rayblur")})`}>
                  <rect x="-200" y="-100" width="1840" height="1100" fill={`url(#${id("rays")})`} />
                  <rect x="-200" y="-100" width="1840" height="1100" fill={`url(#${id("rays2")})`} />
                </g>
              </mask>
            </g>
          ))}
        </defs>

        {CURTAINS.map((c) => (
          <g key={c.key} className={cx(styles.curtain, styles[`curtain-${c.key}`])} opacity={c.opacity}>
            {/* Striated body, fading downward from the crest. */}
            <g mask={`url(#${id(`mask-${c.key}`)})`}>
              <path d={`${c.crest} L1560 960 L-120 960 Z`} fill={`url(#${id(`body-${c.key}`)})`} filter={`url(#${id("soft")})`} />
            </g>
            {/* Smooth wash under the rays so the body never looks hollow. */}
            <path d={`${c.crest} L1560 960 L-120 960 Z`} fill={`url(#${id(`body-${c.key}`)})`} opacity="0.35" filter={`url(#${id("soft")})`} />
            {/* Crest: glow plus a hairline of light. */}
            <path d={c.crest} fill="none" stroke={`url(#${id(`edge-${c.key}`)})`} strokeWidth="16" strokeLinecap="round" opacity="0.7" filter={`url(#${id("glow")})`} />
            <path d={c.crest} fill="none" stroke={`url(#${id(`edge-${c.key}`)})`} strokeWidth="2.5" strokeLinecap="round" />
            <path d={c.crest} fill="none" stroke="#fff" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
          </g>
        ))}
      </svg>
    </div>
  );
}
