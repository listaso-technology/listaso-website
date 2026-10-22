"use client";

import { type PointerEvent, type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { cx } from "@/lib/utils/cx";
import styles from "./HomeCapabilities.module.css";

const WIDE = "(min-width: 64rem)";
/** Time each card stays open during autoplay; the progress bars use it too. */
const INTERVAL = 6_500;
/** Matches the card resize transition: pointer changes wait for it to settle. */
const SETTLE = 650;

type CapabilityRailProps = {
  id: string;
  titles: readonly string[];
  className?: string;
  children: ReactNode;
};

/**
 * Desktop behavior for the capability cards (progressive enhancement).
 *
 * - Marks one card `data-active`. Before hydration CSS opens the first one.
 * - A real pointer movement over a card opens it; changes are held while the
 *   row resizes, so the shifting layout cannot open the neighbor (no flicker).
 * - Focus inside a card or a click opens it, so keyboard and touch work.
 * - Autoplay advances when the active progress bar finishes. The bar pauses on
 *   hover, focus, off-screen or a hidden tab, and resumes
 *   where it stopped. No autoplay below 1024px or with reduced motion.
 */
export function CapabilityRail({ id, titles, className, children }: CapabilityRailProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const lockedUntil = useRef(0);
  const [active, setActive] = useState(0);
  const [wide, setWide] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [inView, setInView] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);

  const autoplay = wide && !reduceMotion;
  const playing = autoplay && !interacting && inView && documentVisible;

  const open = useCallback((index: number) => {
    setActive((current) => {
      if (current !== index) lockedUntil.current = performance.now() + SETTLE;
      return index;
    });
  }, []);

  // Reflect the active card on the server-rendered items.
  useEffect(() => {
    const items = Array.from(listRef.current?.children ?? []);
    items.forEach((item, index) => item.toggleAttribute("data-active", index === active));
  }, [active]);

  useEffect(() => {
    const wideQuery = window.matchMedia(WIDE);
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setWide(wideQuery.matches);
      setReduceMotion(reduceQuery.matches);
    };
    const updateVisibility = () => setDocumentVisible(!document.hidden);

    update();
    updateVisibility();
    wideQuery.addEventListener("change", update);
    reduceQuery.addEventListener("change", update);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      wideQuery.removeEventListener("change", update);
      reduceQuery.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.4,
    });
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  const indexOf = (target: EventTarget | null) => {
    const list = listRef.current;
    const item = (target as Element | null)?.closest("li");
    if (!list || !item || item.parentElement !== list) return -1;
    return Array.from(list.children).indexOf(item);
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!wide || event.pointerType !== "mouse" || performance.now() < lockedUntil.current) return;
    const index = indexOf(event.target);
    if (index >= 0) open(index);
  };

  return (
    <>
      <ul
        ref={listRef}
        id={id}
        data-reveal="group"
        className={className}
        onPointerMove={onPointerMove}
        onPointerEnter={(event) => event.pointerType === "mouse" && setInteracting(true)}
        onPointerLeave={() => setInteracting(false)}
        onFocus={(event) => {
          setInteracting(true);
          const index = indexOf(event.target);
          if (index >= 0) open(index);
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteracting(false);
        }}
        onClick={(event) => {
          const index = indexOf(event.target);
          if (wide && index >= 0) open(index);
        }}
      >
        {children}
      </ul>

      {autoplay ? (
        <div className={styles.controls}>
          <div className={styles.segments}>
            {titles.map((title, index) => (
              <button
                key={title}
                type="button"
                aria-controls={id}
                aria-current={index === active ? "true" : undefined}
                className={cx(styles.segment, index === active && styles.segmentActive)}
                onClick={() => open(index)}
              >
                <span className={styles.segmentLabel}>{title}</span>
                <span className={styles.segmentTrack}>
                  <span
                    key={index === active ? `run-${active}` : "idle"}
                    className={styles.segmentFill}
                    style={{ animationDuration: `${INTERVAL}ms` }}
                    data-playing={playing ? "" : undefined}
                    onAnimationEnd={() => open((active + 1) % titles.length)}
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
