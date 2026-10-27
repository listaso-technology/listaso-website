"use client";

import { type CSSProperties, type ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import type { Feature } from "@/content/products/types";
import styles from "./FeatureIndex.module.css";
import { TextRoll } from "./TextRoll";

type FeatureExplorerProps = {
  items: readonly Feature[];
  /** Section header, placed above the spotlight in the sticky column. */
  header: ReactNode;
  /** Optional photo layer behind the spotlight (decorative). */
  media?: ReactNode;
};

/** Time a row must stay at the viewport middle before it becomes active. */
const SETTLE_MS = 220;

/** useLayoutEffect on the client, no-op warning-free on the server. */
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Feature list with a sticky spotlight (desktop). The active feature follows
 * the row that settles at the middle of the viewport (after a short pause,
 * so fast scrolling does not flicker), or the row under the mouse. Other
 * rows recede on desktop so the active one reads first.
 * - A single highlight slides between rows (list).
 * - Spotlight: an icon strip slides the active icon to the center, the number
 *   rolls like an odometer, the copy enters from below (forward) or above
 *   (backward), and the progress bar follows the scroll continuously. With a
 *   photo, it fills the card and pans with the same scroll progress.
 * The spotlight is aria-hidden; the list is the accessible content.
 */
export function FeatureExplorer({ items, header, media }: FeatureExplorerProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef(false);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [indicator, setIndicator] = useState<{ top: number; height: number } | null>(null);

  const activate = useCallback((index: number) => {
    setActive((current) => {
      if (index !== current) setDirection(index > current ? "up" : "down");
      return index;
    });
  }, []);

  // Scroll-spy: the row crossing the middle band of the viewport becomes
  // active only once it has stayed there briefly, so a quick scroll does not
  // flick through every feature.
  useEffect(() => {
    const list = listRef.current;
    if (!list || !("IntersectionObserver" in window)) return;
    const rows = Array.from(list.querySelectorAll<HTMLElement>(":scope > li"));
    let timer = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (pointerRef.current) return;
        const hit = entries.find((entry) => entry.isIntersecting);
        if (!hit) return;
        const index = rows.indexOf(hit.target as HTMLElement);
        window.clearTimeout(timer);
        timer = window.setTimeout(() => activate(index), SETTLE_MS);
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    rows.forEach((row) => observer.observe(row));
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [activate]);

  // Sliding highlight: follows the active row's box, re-measured whenever the
  // list changes size (fonts loading, breakpoints).
  useIsoLayoutEffect(() => {
    const list = listRef.current;
    const measure = () => {
      const row = list?.querySelectorAll<HTMLElement>(":scope > li")[active];
      if (row) setIndicator({ top: row.offsetTop, height: row.offsetHeight });
    };
    measure();
    const observer = list && "ResizeObserver" in window ? new ResizeObserver(measure) : null;
    if (list) observer?.observe(list);
    window.addEventListener("resize", measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [active]);

  // Continuous progress: how far the list has scrolled past the viewport middle.
  useEffect(() => {
    const list = listRef.current;
    const spot = spotRef.current;
    if (!list || !spot) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = list.getBoundingClientRect();
      const middle = window.innerHeight / 2;
      const progress = Math.min(1, Math.max(0, (middle - bounds.top) / bounds.height));
      spot.style.setProperty("--scroll", progress.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  const item = items[active];
  const count = items.length;
  const pad = (value: number) => String(value).padStart(2, "0");

  return (
    <>
      <div className={styles.aside}>
        {header}
        <div
          ref={spotRef}
          aria-hidden="true"
          className={styles.spotlight}
          data-photo={media ? "" : undefined}
          style={{ "--active": active } as CSSProperties}
        >
          {media ? (
            <span className={styles.spotMedia}>
              {media}
              <span className={styles.spotShade} />
            </span>
          ) : null}
          <span className={styles.spotGrid} />

          <span className={styles.spotTop}>
            {/* Odometer: a column of numbers that rolls to the active one. */}
            <span className={styles.spotCount}>
              <span className={styles.odometer}>
                <span className={styles.odometerColumn}>
                  {items.map((feature, index) => (
                    <span key={feature.title}>{pad(index + 1)}</span>
                  ))}
                </span>
              </span>
              <span className={styles.spotTotal}>/ {pad(count)}</span>
            </span>
          </span>

          {/* Icon strip: the active icon slides to the center. */}
          <span className={styles.strip}>
            <span className={styles.stripTrack}>
              {items.map((feature, index) => (
                <span
                  key={feature.title}
                  className={styles.stripIcon}
                  data-active={index === active ? "" : undefined}
                  data-near={Math.abs(index - active) === 1 ? "" : undefined}
                >
                  <Icon name={feature.icon} size={24} />
                </span>
              ))}
            </span>
          </span>

          <span key={active} className={styles.spotCopy} data-direction={direction}>
            <span className={styles.spotTitle}>{item.title}</span>
            <span className={styles.spotText}>{item.text}</span>
          </span>

          <span className={styles.spotProgress}>
            <span className={styles.spotProgressFill} />
          </span>
        </div>
      </div>

      <div className={styles.listWrap}>
        {indicator ? (
          <span
            aria-hidden="true"
            className={styles.indicator}
            style={{ transform: `translateY(${indicator.top}px)`, height: `${indicator.height}px` }}
          />
        ) : null}
        <ol
          ref={listRef}
          data-reveal="group"
          className={styles.list}
          onPointerLeave={() => {
            pointerRef.current = false;
          }}
        >
          {items.map((feature, index) => (
            <li
              key={feature.title}
              data-reveal-item
              data-roll-trigger
              data-active={index === active ? "" : undefined}
              className={styles.row}
              onPointerEnter={(event) => {
                if (event.pointerType !== "mouse") return;
                pointerRef.current = true;
                activate(index);
              }}
            >
              <div className={styles.rowInner}>
                <span aria-hidden="true" className={styles.number}>
                  {pad(index + 1)}
                </span>
                <div className={styles.rowCopy}>
                  <h3 className={styles.title}>
                    <TextRoll>{feature.title}</TextRoll>
                  </h3>
                  <p className={styles.text}>{feature.text}</p>
                </div>
                <span className={styles.icon}>
                  <Icon name={feature.icon} size={20} />
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
