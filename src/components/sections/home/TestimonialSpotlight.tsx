"use client";

import { type KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { cx } from "@/lib/utils/cx";
import { Stars } from "./Stars";
import styles from "./CustomerProof.module.css";

type Testimonial = { quote: string; name: string; source: string };

type TestimonialSpotlightProps = {
  testimonials: readonly Testimonial[];
  /** Accessible name of the reviewer list (page copy). */
  label: string;
  starsLabel: string;
};

/** Time each review stays featured during autoplay; the avatar ring uses it too. */
const INTERVAL = 8_000;
/** Long quotes get a smaller type step so every review fits the same stage. */
const LONG_QUOTE = 220;

/** "Mark Somwaru" → "MS", "Eduardo Ch." → "EC" (decorative avatar). */
function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

/**
 * Featured review + reviewer selector (ARIA tabs). All six reviews stay in
 * the HTML, stacked in one grid cell so the stage keeps the tallest height
 * (no jump between quotes); inactive ones are visibility-hidden. Autoplay
 * advances when the active avatar's progress ring completes and pauses on
 * hover, focus, off-screen or a hidden tab. Reduced motion:
 * no autoplay.
 */
export function TestimonialSpotlight({ testimonials, label, starsLabel }: TestimonialSpotlightProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(true);
  const [interacting, setInteracting] = useState(false);
  const [inView, setInView] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);

  const autoplay = !reduceMotion;
  const playing = autoplay && !interacting && inView && documentVisible;
  const count = testimonials.length;
  const pad = (value: number) => String(value).padStart(2, "0");

  const select = useCallback((index: number, focus = false) => {
    setActive(index);
    if (focus) tabRefs.current[index]?.focus();
  }, []);

  useEffect(() => {
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(reduceQuery.matches);
    const updateVisibility = () => setDocumentVisible(!document.hidden);
    update();
    updateVisibility();
    reduceQuery.addEventListener("change", update);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      reduceQuery.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  // Narrow screens: keep the active chip visible inside the sideways row
  // (scrolls the row only, never the page).
  useEffect(() => {
    const list = listRef.current;
    const tab = tabRefs.current[active];
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const offset = tab.getBoundingClientRect().left - list.getBoundingClientRect().left;
    list.scrollTo({ left: list.scrollLeft + offset - 8, behavior: smooth ? "smooth" : "auto" });
  }, [active]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const onKeyDown = (event: KeyboardEvent) => {
    const last = count - 1;
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
    <div
      ref={rootRef}
      className={styles.spotlight}
      onPointerEnter={(event) => event.pointerType === "mouse" && setInteracting(true)}
      onPointerLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteracting(false);
      }}
    >
      {/* Featured review: navy brand stage in both themes. */}
      <div data-surface="band" className={styles.stage}>
        <span aria-hidden="true" className={styles.stageGrid} />
        <span aria-hidden="true" className={styles.quoteMark}>
          ”
        </span>
        <div className={styles.stageMeta}>
          <Stars label={starsLabel} />
          <span aria-hidden="true" className={styles.counter}>
            <span key={active} className={styles.counterCurrent}>
              {pad(active + 1)}
            </span>{" "}
            / {pad(count)}
          </span>
        </div>

        <div className={styles.quotes}>
          {testimonials.map((item, index) => (
            <figure
              key={item.name}
              id={`review-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`review-tab-${index}`}
              data-active={index === active ? "" : undefined}
              className={styles.quote}
            >
              <blockquote
                data-long={item.quote.length > LONG_QUOTE ? "" : undefined}
                className={styles.quoteText}
              >
                <p>{item.quote}</p>
              </blockquote>
              <figcaption className={styles.author}>
                <span aria-hidden="true" className={styles.authorAvatar}>
                  {initials(item.name)}
                </span>
                <span className={styles.authorText}>
                  <span className={styles.authorName}>{item.name}</span>
                  <span className={styles.authorSource}>{item.source}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Reviewer selector. */}
      <div className={styles.selector}>
        <div
          ref={listRef}
          role="tablist"
          aria-label={label}
          aria-orientation="vertical"
          className={styles.people}
          onKeyDown={onKeyDown}
        >
          {testimonials.map((item, index) => {
            const isActive = index === active;
            return (
              <button
                key={item.name}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                id={`review-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`review-panel-${index}`}
                tabIndex={isActive ? 0 : -1}
                className={cx(styles.person, isActive && styles.personActive)}
                onClick={() => select(index)}
              >
                <span aria-hidden="true" className={styles.ring}>
                  {isActive && autoplay ? (
                    <span
                      key={`run-${active}`}
                      className={styles.ringProgress}
                      style={{ animationDuration: `${INTERVAL}ms` }}
                      data-playing={playing ? "" : undefined}
                      onAnimationEnd={() => select((active + 1) % count)}
                    />
                  ) : null}
                  <span className={styles.avatar}>{initials(item.name)}</span>
                </span>
                <span className={styles.personText}>
                  <span className={styles.personName}>{item.name}</span>
                  <span className={styles.personSource}>{item.source}</span>
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
