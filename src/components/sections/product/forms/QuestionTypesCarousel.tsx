"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { Icon } from "@/components/icons/Icon";
import styles from "./QuestionTypesCarousel.module.css";

const motionQuery = "(prefers-reduced-motion: reduce)";
const subscribeMotion = (notify: () => void) => {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};
const getReducedMotion = () => window.matchMedia(motionQuery).matches;
const getServerMotion = () => true;

/**
 * Decorative miniature of each field, keyed by the approved type label
 * (content/products/forms.ts). Values are illustrative placeholders.
 */
const previews: Record<string, ReactNode> = {
  "Single line": (
    <span className={styles.input}><span className={styles.textLine} style={{ width: "58%" }} /><span className={styles.caret} /></span>
  ),
  "Multi line": (
    <span className={styles.textarea}>
      <span className={styles.textLine} style={{ width: "88%" }} />
      <span className={styles.textLine} style={{ width: "72%" }} />
      <span className={styles.textLine} style={{ width: "40%" }} />
    </span>
  ),
  "Whole number": (
    <span className={styles.stepper}><span>−</span><strong>12</strong><span>+</span></span>
  ),
  "Decimal number": (
    <span className={styles.input}><strong className={styles.value}>4.75</strong></span>
  ),
  "Yes / No": (
    <span className={styles.segmented}><span data-on="true">Yes</span><span>No</span></span>
  ),
  "Single choice": (
    <span className={styles.options}>
      <span><span className={styles.radio} /><span className={styles.textLine} style={{ width: "60%" }} /></span>
      <span><span className={styles.radio} data-on="true" /><span className={styles.textLine} style={{ width: "74%" }} /></span>
      <span><span className={styles.radio} /><span className={styles.textLine} style={{ width: "48%" }} /></span>
    </span>
  ),
  Dropdown: (
    <span className={styles.input}><span className={styles.textLine} style={{ width: "54%" }} /><span className={styles.chevron}><Icon name="chevron-right" size={16} /></span></span>
  ),
  "Multiple choice": (
    <span className={styles.options}>
      <span><span className={styles.checkbox} data-on="true"><Icon name="check" size={16} /></span><span className={styles.textLine} style={{ width: "62%" }} /></span>
      <span><span className={styles.checkbox} data-on="true"><Icon name="check" size={16} /></span><span className={styles.textLine} style={{ width: "50%" }} /></span>
      <span><span className={styles.checkbox} /><span className={styles.textLine} style={{ width: "70%" }} /></span>
    </span>
  ),
  Date: (
    <span className={styles.calendar}>
      {Array.from({ length: 14 }, (_, day) => (
        <span key={day} data-on={day === 9 ? "true" : undefined} />
      ))}
    </span>
  ),
  Time: (
    <span className={styles.input}><Icon name="stopwatch" size={16} /><strong className={styles.value}>09:30</strong></span>
  ),
  Photo: (
    <span className={styles.photo}>
      <svg viewBox="0 0 120 56" preserveAspectRatio="none" focusable="false">
        <circle cx="92" cy="16" r="7" />
        <path d="M0 56 L34 22 L58 44 L76 30 L120 56 Z" />
      </svg>
      <span className={styles.photoBadge}><Icon name="photo" size={16} /></span>
    </span>
  ),
  Signature: (
    <span className={styles.signature}>
      <svg viewBox="0 0 120 40" preserveAspectRatio="none" focusable="false">
        <path pathLength={1} d="M6 28 C 16 6, 24 6, 28 22 S 40 34, 48 16 S 62 4, 68 20 S 82 32, 94 14 S 108 10, 114 18" />
      </svg>
    </span>
  ),
};

/** Pixels per millisecond of the continuous pass (30 px/s). */
const SPEED = 0.03;
/** Idle time after a manual interaction before the loop resumes. */
const RESUME_AFTER = 3500;

/**
 * Infinite carousel (instruction of 12 November 2026): the twelve types loop
 * continuously in one direction. A decorative copy of the list (aria-hidden,
 * inert) makes the loop seamless; assistive technology reads one list. It
 * pauses on hover, focus, off-screen or in a hidden tab, and briefly after
 * manual navigation; with reduced motion it does not move and has no copy.
 */
export function QuestionTypesCarousel({ types }: { types: readonly string[] }) {
  const viewport = useRef<HTMLDivElement>(null);
  const firstList = useRef<HTMLOListElement>(null);
  const copyList = useRef<HTMLOListElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const resumeAt = useRef(0);
  const id = useId();
  const reducedMotion = useSyncExternalStore(subscribeMotion, getReducedMotion, getServerMotion);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  /** Width of one full set (list + gap); 0 when there is no copy. */
  const loopWidth = () => (copyList.current && firstList.current ? copyList.current.offsetLeft - firstList.current.offsetLeft : 0);

  // Position within one set, drawn without re-rendering (two segments cover the wrap).
  const syncProgress = () => {
    const element = viewport.current;
    const bar = progress.current;
    if (!element || !bar) return;
    const span = loopWidth() || element.scrollWidth;
    bar.style.setProperty("--size", String(Math.min(1, element.clientWidth / span)));
    bar.style.setProperty("--offset", String((element.scrollLeft % span) / span));
  };

  const holdLoop = () => {
    resumeAt.current = performance.now() + RESUME_AFTER;
  };

  useEffect(() => {
    syncProgress();
    window.addEventListener("resize", syncProgress);
    return () => window.removeEventListener("resize", syncProgress);
  });

  useEffect(() => {
    const element = viewport.current;
    if (!element || reducedMotion || hovered || focused) return;
    let frame = 0;
    let previous = 0;
    let position = element.scrollLeft;
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(element);
    const advance = (now: number) => {
      const elapsed = previous ? Math.min(now - previous, 50) : 0;
      previous = now;
      const span = loopWidth();
      if (Math.abs(element.scrollLeft - position) > 2) position = element.scrollLeft;
      if (span > 0 && visible && !document.hidden && now >= resumeAt.current) {
        position += elapsed * SPEED;
        if (position >= span) position -= span;
        element.scrollLeft = position;
      }
      frame = requestAnimationFrame(advance);
    };
    frame = requestAnimationFrame(advance);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [reducedMotion, hovered, focused]);

  const move = (step: number) => {
    holdLoop();
    const element = viewport.current;
    if (!element) return;
    const distance = Math.max(240, element.clientWidth * 0.7);
    const span = loopWidth();
    // Jump by one set (invisible: both sets are identical) so the move never hits an edge.
    if (span > 0 && step < 0 && element.scrollLeft < distance) element.scrollLeft += span;
    if (span > 0 && step > 0 && element.scrollLeft + distance > element.scrollWidth - element.clientWidth) element.scrollLeft -= span;
    element.scrollBy({ left: step * distance, behavior: reducedMotion ? "instant" : "smooth" });
  };

  const renderCards = () =>
    types.map((type, index) => (
      <li key={type} className={styles.card}>
        <span aria-hidden="true" className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
        <span className={styles.name}>{type}</span>
        <span aria-hidden="true" className={styles.preview}>{previews[type] ?? null}</span>
      </li>
    ));

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Question types"
      className="min-w-0"
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={(event) => {
        // Keyboard focus pauses the loop; a mouse click on an arrow does not.
        if ((event.target as HTMLElement).matches(":focus-visible")) setFocused(true);
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div
        ref={viewport}
        id={id}
        tabIndex={0}
        aria-label="All 12 question types"
        className={styles.viewport}
        onScroll={syncProgress}
        onPointerDown={holdLoop}
        onWheel={holdLoop}
        onTouchMove={holdLoop}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowLeft" ? -1 : 1);
          } else if (event.key === "Home" || event.key === "End") {
            event.preventDefault();
            holdLoop();
            const element = viewport.current;
            if (element) element.scrollTo({ left: event.key === "Home" ? 0 : (loopWidth() || element.scrollWidth) - element.clientWidth, behavior: "instant" });
          }
        }}
      >
        <div className={styles.loop}>
          <ol ref={firstList} className={styles.track}>{renderCards()}</ol>
          {reducedMotion ? null : (
            <ol ref={copyList} aria-hidden="true" inert className={styles.track}>{renderCards()}</ol>
          )}
        </div>
      </div>

      <div className={styles.controls}>
        <span aria-hidden="true" className={styles.progress} ref={progress}><span /><span /></span>
        <button type="button" className={styles.control} aria-label="Previous question types" aria-controls={id} onClick={() => move(-1)}>
          <Icon name="arrow-left" size={20} />
        </button>
        <button type="button" className={styles.control} aria-label="Next question types" aria-controls={id} onClick={() => move(1)}>
          <Icon name="arrow-right" size={20} />
        </button>
      </div>
    </div>
  );
}
