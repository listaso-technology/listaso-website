"use client";

import { type CSSProperties, type KeyboardEvent, useRef, useState } from "react";
import { cx } from "@/lib/utils/cx";
import styles from "./SupportTriage.module.css";

type Row = { level: string; detail: string; response: string };

type SupportTriageProps = {
  rows: readonly Row[];
  /** Published column names: type of problem, first response. */
  columns: readonly [string, string];
};

/** Severity tone per level, most to least urgent (decorative). */
const tones = ["action", "warning", "link", "accent", "success"] as const;

/** Gauge scale in minutes (log): 10 min to 48 h. */
const SCALE_MIN = 10;
const SCALE_MAX = 48 * 60;
/** 270° arc open at the bottom, from 135° to 405° (SVG angles, y down). */
const CENTER = 120;
const RADIUS = 90;
const ARC_START = 135;
const ARC_SWEEP = 270;
/** Minor bezel ticks every 7.5° along the arc, like a watch bezel. */
const BEZEL_STEPS = 36;

/** "15 minutes" → [15, 15]; "24–48 hours" → [1440, 2880]. */
function toMinutes(response: string): [number, number] {
  const match = response.match(/^(\d+)(?:\s*[–-]\s*(\d+))?\s*(minute|hour)/i);
  if (!match) return [SCALE_MAX, SCALE_MAX];
  const unit = match[3].toLowerCase() === "hour" ? 60 : 1;
  const from = Number(match[1]) * unit;
  return [from, match[2] ? Number(match[2]) * unit : from];
}

const position = (minutes: number) =>
  Math.min(1, Math.max(0.03, Math.log(minutes / SCALE_MIN) / Math.log(SCALE_MAX / SCALE_MIN)));

const point = (angle: number, radius: number) => {
  const radians = (angle * Math.PI) / 180;
  // Rounded so server and client render identical attributes (no hydration mismatch).
  const round = (value: number) => Math.round(value * 100) / 100;
  return [round(CENTER + radius * Math.cos(radians)), round(CENTER + radius * Math.sin(radians))] as const;
};

const [startX, startY] = point(ARC_START, RADIUS);
const [endX, endY] = point(ARC_START + ARC_SWEEP, RADIUS);
const ARC = `M ${startX} ${startY} A ${RADIUS} ${RADIUS} 0 1 1 ${endX} ${endY}`;

const bezel = Array.from({ length: BEZEL_STEPS + 1 }, (_, index) => {
  const angle = ARC_START + (index / BEZEL_STEPS) * ARC_SWEEP;
  const [x1, y1] = point(angle, RADIUS + 14);
  const [x2, y2] = point(angle, RADIUS + (index % 4 === 0 ? 19 : 17));
  return { x1, y1, x2, y2, major: index % 4 === 0 };
});

/** "15 minutes" → { value: "15", unit: "minutes" }. */
function splitResponse(response: string) {
  const match = response.match(/^(\S+)\s+(.+)$/);
  return match ? { value: match[1], unit: match[2] } : { value: response, unit: "" };
}

/** Moves "Typically resolved in X." out of the detail when it is published. */
function splitDetail(detail: string) {
  const match = detail.match(/^(.*?)\s*(Typically resolved in)\s+(.+?)\.?$/);
  return match ? { text: match[1], resolvedLabel: match[2], resolved: match[3] } : { text: detail };
}

/**
 * Support levels as tabs with a response gauge. Every tab shows its level and
 * first-response time, so all five stay readable at a glance; the panel adds
 * the selected level's detail and draws its time on a stopwatch-like arc (log
 * scale, decorative). Pointer hover, click, focus and arrow keys select.
 */
export function SupportTriage({ rows, columns }: SupportTriageProps) {
  const [typeLabel, responseLabel] = columns;
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const row = rows[active];
  const tone = tones[active % tones.length];
  const [from, to] = toMinutes(row.response);
  const start = position(from) * 100;
  const end = position(to) * 100;
  const isRange = to > from;
  const startAngle = ARC_START + (start / 100) * ARC_SWEEP;
  const endAngle = ARC_START + (end / 100) * ARC_SWEEP;
  const response = splitResponse(row.response);
  const detail = splitDetail(row.detail);

  const select = (index: number, focus = false) => {
    setActive(index);
    if (focus) tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const last = rows.length - 1;
    const next: Record<string, number> = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowRight: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in next)) return;
    event.preventDefault();
    select(next[event.key], true);
  };

  return (
    <div data-tone={tone} className={styles.triage} style={{ "--active": active } as CSSProperties}>
      <div className={styles.tabsWrap}>
        <p aria-hidden="true" className={styles.caption}>
          {typeLabel}
        </p>
        <div
          role="tablist"
          aria-label={typeLabel}
          aria-orientation="vertical"
          className={styles.tabs}
          onKeyDown={onKeyDown}
        >
          <span aria-hidden="true" className={styles.indicator} />
          {rows.map((item, index) => (
            <button
              key={item.level}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={`support-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls="support-panel"
              tabIndex={index === active ? 0 : -1}
              data-tone={tones[index % tones.length]}
              className={cx(styles.tab, index === active && styles.tabActive)}
              onClick={() => select(index)}
              onPointerEnter={(event) => event.pointerType === "mouse" && select(index)}
            >
              <span aria-hidden="true" className={styles.dot} />
              <span className={styles.tabText}>
                <span className={styles.tabLevel}>{item.level}</span>
                <span className={styles.tabTime}>
                  <span className="sr-only">{responseLabel}: </span>
                  {item.response}
                </span>
              </span>
              <span aria-hidden="true" className={styles.tabRank}>
                {String(index + 1).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div
        id="support-panel"
        role="tabpanel"
        aria-labelledby={`support-tab-${active}`}
        className={styles.panel}
      >
        <div className={styles.gauge}>
          <svg aria-hidden="true" viewBox="0 0 240 240" className={styles.dial} focusable="false">
            {bezel.map((tick, index) => (
              <line
                key={index}
                x1={tick.x1}
                y1={tick.y1}
                x2={tick.x2}
                y2={tick.y2}
                className={cx(styles.bezel, tick.major && styles.bezelMajor)}
              />
            ))}
            {rows.map((item, index) => {
              const angle = ARC_START + position(toMinutes(item.response)[0]) * ARC_SWEEP;
              const [x1, y1] = point(angle, RADIUS + 12);
              const [x2, y2] = point(angle, RADIUS + 24);
              return (
                <line
                  key={item.level}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  className={cx(styles.tick, index === active && styles.tickActive)}
                />
              );
            })}
            <path d={ARC} pathLength={100} className={styles.track} />
            <path d={ARC} pathLength={100} className={styles.glow} style={{ strokeDasharray: `${end} 100` }} />
            <path d={ARC} pathLength={100} className={styles.fill} style={{ strokeDasharray: `${end} 100` }} />
            <path
              d={ARC}
              pathLength={100}
              className={styles.range}
              style={{ strokeDasharray: `0 ${start} ${end - start} 100` }}
            />
            {/* Range start marker (24–48 hours) and the hand on the current time. */}
            <g
              className={styles.hand}
              data-hidden={isRange ? undefined : ""}
              style={{ transform: `rotate(${startAngle}deg)` }}
            >
              <circle cx={CENTER + RADIUS} cy={CENTER} r={4} className={styles.startDot} />
            </g>
            <g className={styles.hand} style={{ transform: `rotate(${endAngle}deg)` }}>
              <line x1={CENTER + 64} y1={CENTER} x2={CENTER + 78} y2={CENTER} className={styles.needle} />
              <circle cx={CENTER + RADIUS} cy={CENTER} r={7} className={styles.handDot} />
            </g>
          </svg>
          <div className={styles.readout}>
            <span className={styles.readoutLabel}>{responseLabel}</span>
            <span key={active} data-long={response.value.length > 3 ? "" : undefined} className={styles.readoutValue}>
              {response.value}
            </span>
            <span className={styles.readoutUnit}>{response.unit}</span>
          </div>
        </div>

        <div key={active} className={styles.panelCopy}>
          <h3 className={styles.level}>{row.level}</h3>
          <p className={styles.detail}>{detail.text}</p>
          {"resolved" in detail ? (
            <p className={styles.resolved}>
              <span>{detail.resolvedLabel}</span>
              <strong>{detail.resolved}</strong>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
