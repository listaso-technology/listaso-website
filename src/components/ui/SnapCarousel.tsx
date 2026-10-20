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
  autoPlay?: boolean;
  autoPlayInterval?: number;
};

/**
 * Progressive carousel: every item remains in the DOM and readable without
 * JavaScript, while touch, keyboard and explicit controls share one scroll
 * position when JavaScript is available.
 */
export function SnapCarousel({
  children,
  label,
  variant = "reviews",
  autoPlay = false,
  autoPlayInterval = 6_500,
}: SnapCarouselProps) {
  const items = Children.toArray(children);
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const scrollFrame = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(!autoPlay);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [lastReachableIndex, setLastReachableIndex] = useState(Math.max(0, items.length - 1));

  const getLastReachableIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return Math.max(0, items.length - 1);

    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    const children = Array.from(track.children) as HTMLElement[];
    let lastReachable = 0;
    children.forEach((item, index) => {
      if (item.offsetLeft <= maxScroll + 2) lastReachable = index;
    });
    return lastReachable;
  }, [items.length]);

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
    setLastReachableIndex(getLastReachableIndex());
  }, [getLastReachableIndex]);

  useEffect(() => () => window.cancelAnimationFrame(scrollFrame.current), []);

  useEffect(() => {
    const updateLayout = () => {
      setLastReachableIndex(getLastReachableIndex());
      syncActiveIndex();
    };
    const frame = window.requestAnimationFrame(updateLayout);
    window.addEventListener("resize", updateLayout);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateLayout);
    };
  }, [getLastReachableIndex, syncActiveIndex]);

  useEffect(() => {
    if (!autoPlay) return;
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) {
      const frame = window.requestAnimationFrame(() => setInView(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "0px 0px -12%",
      threshold: 0.35,
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, [autoPlay]);

  useEffect(() => {
    if (!autoPlay) return;
    const updateVisibility = () => setDocumentVisible(!document.hidden);
    const frame = window.requestAnimationFrame(updateVisibility);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, [autoPlay]);

  useEffect(() => {
    if (!autoPlay) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(media.matches);
    const frame = window.requestAnimationFrame(updatePreference);
    media.addEventListener("change", updatePreference);
    return () => {
      window.cancelAnimationFrame(frame);
      media.removeEventListener("change", updatePreference);
    };
  }, [autoPlay]);

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

  const goPrevious = () => {
    const lastIndex = getLastReachableIndex();
    goTo(autoPlay && activeIndex === 0 ? lastIndex : Math.max(0, activeIndex - 1));
  };

  const goNext = useCallback(() => {
    const lastIndex = getLastReachableIndex();
    goTo(autoPlay && activeIndex >= lastIndex ? 0 : Math.min(lastIndex, activeIndex + 1));
  }, [activeIndex, autoPlay, getLastReachableIndex, goTo]);

  useEffect(() => {
    if (
      !autoPlay ||
      userPaused ||
      interactionPaused ||
      reduceMotion ||
      !inView ||
      !documentVisible ||
      items.length < 2
    ) {
      return;
    }

    const timer = window.setTimeout(goNext, autoPlayInterval);
    return () => window.clearTimeout(timer);
  }, [
    activeIndex,
    autoPlay,
    autoPlayInterval,
    documentVisible,
    goNext,
    inView,
    interactionPaused,
    items.length,
    reduceMotion,
    userPaused,
  ]);

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
    <div
      ref={rootRef}
      className={styles.root}
      data-variant={variant}
      data-autoplay={autoPlay || undefined}
      role="region"
      aria-label={label}
      onMouseEnter={() => setInteractionPaused(true)}
      onMouseLeave={() => setInteractionPaused(false)}
      onFocusCapture={() => setInteractionPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setInteractionPaused(false);
        }
      }}
      onPointerDown={() => setInteractionPaused(true)}
      onPointerUp={() => setInteractionPaused(false)}
      onPointerCancel={() => setInteractionPaused(false)}
    >
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
          {autoPlay && !reduceMotion ? (
            <button
              type="button"
              className={styles.autoplayControl}
              aria-pressed={userPaused}
              onClick={() => setUserPaused((current) => !current)}
            >
              {userPaused ? "Play autoplay" : "Pause autoplay"}
            </button>
          ) : null}
          <button
            type="button"
            className={styles.control}
            aria-label="Previous item"
            disabled={!autoPlay && activeIndex === 0}
            onClick={goPrevious}
          >
            <Icon name="chevron-left" size={20} />
          </button>
          <p
            className={styles.position}
            aria-live={autoPlay && !userPaused ? "off" : "polite"}
            aria-atomic="true"
          >
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <span aria-hidden="true"> / </span>
            <span>{String(items.length).padStart(2, "0")}</span>
          </p>
          <button
            type="button"
            className={styles.control}
            aria-label="Next item"
            disabled={!autoPlay && activeIndex === lastReachableIndex}
            onClick={goNext}
          >
            <Icon name="chevron-right" size={20} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
