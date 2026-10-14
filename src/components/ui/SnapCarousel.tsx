"use client";

import {
  Children,
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Icon } from "@/components/icons/Icon";
import styles from "./SnapCarousel.module.css";

type SnapCarouselProps = {
  children: ReactNode;
  label: string;
  variant?: "stats" | "support" | "reviews" | "pricing";
};

/**
 * Progressive carousel: every item remains in the DOM and readable without
 * JavaScript, while touch, keyboard and explicit controls share one scroll
 * position when JavaScript is available.
 */
export function SnapCarousel({ children, label, variant = "reviews" }: SnapCarouselProps) {
  const items = Children.toArray(children);
  const trackRef = useRef<HTMLUListElement>(null);
  const scrollFrame = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const syncActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const children = Array.from(track.children) as HTMLElement[];
    const nextIndex = children.reduce(
      (closest, item, index) =>
        Math.abs(item.offsetLeft - track.scrollLeft) <
        Math.abs(children[closest].offsetLeft - track.scrollLeft)
          ? index
          : closest,
      0,
    );
    setActiveIndex(nextIndex);
  }, []);

  useEffect(() => () => window.cancelAnimationFrame(scrollFrame.current), []);

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const target = track?.children.item(index) as HTMLElement | null;
      if (!track || !target) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      track.scrollTo({
        left: target.offsetLeft,
        behavior: reduceMotion ? "auto" : "smooth",
      });
      setActiveIndex(index);
    },
    [],
  );

  const onScroll = () => {
    window.cancelAnimationFrame(scrollFrame.current);
    scrollFrame.current = window.requestAnimationFrame(syncActiveIndex);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    goTo(Math.max(0, Math.min(items.length - 1, activeIndex + direction)));
  };

  return (
    <div className={styles.root} data-variant={variant} role="region" aria-label={label}>
      <ul
        ref={trackRef}
        className={styles.track}
        aria-label={`${label} items`}
        tabIndex={0}
        onScroll={onScroll}
        onKeyDown={onKeyDown}
      >
        {items.map((item, index) => (
          <li className={styles.item} key={index}>
            {item}
          </li>
        ))}
      </ul>

      {items.length > 1 ? (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.control}
            aria-label="Previous item"
            disabled={activeIndex === 0}
            onClick={() => goTo(activeIndex - 1)}
          >
            <Icon name="chevron-left" size={20} />
          </button>
          <p className={styles.position} aria-live="polite" aria-atomic="true">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <span aria-hidden="true"> / </span>
            <span>{String(items.length).padStart(2, "0")}</span>
          </p>
          <button
            type="button"
            className={styles.control}
            aria-label="Next item"
            disabled={activeIndex === items.length - 1}
            onClick={() => goTo(activeIndex + 1)}
          >
            <Icon name="chevron-right" size={20} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
