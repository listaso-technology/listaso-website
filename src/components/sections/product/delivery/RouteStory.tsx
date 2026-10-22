"use client";

import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { cx } from "@/lib/utils/cx";
import styles from "./WhyItMatters.module.css";

type Stop = { customer: string; status: string; state: "done" | "next" };

type RouteStoryProps = {
  checks: readonly string[];
  route: { label: string; title: string; stops: readonly Stop[] };
  /** Benefit index → stop index it illustrates. */
  links: readonly number[];
  photo: ReactNode;
};

const STEP = 900;

/**
 * Benefits + the day's route as one story. When the route scrolls into view
 * a truck travels down the timeline once; each stop it reaches is marked and
 * the benefit it illustrates lights up. Hovering a benefit highlights its
 * stop. Reduced motion: final state at once. The route card keeps its
 * role="img" label; the benefits list is plain text.
 */
export function RouteStory({ checks, route, links, photo }: RouteStoryProps) {
  // Observe the visual: on desktop the story wrapper is `display: contents` (no box).
  const visualRef = useRef<HTMLDivElement>(null);
  const last = route.stops.length - 1;
  // Before hydration and with reduced motion, the route shows its final state.
  const [reached, setReached] = useState(last);
  const [focusStop, setFocusStop] = useState<number | null>(null);

  useEffect(() => {
    const root = visualRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    let timer = 0;
    const frame = window.requestAnimationFrame(() => setReached(-1));
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let step = 0;
        const tick = () => {
          setReached(step);
          step += 1;
          if (step <= last) timer = window.setTimeout(tick, STEP);
        };
        timer = window.setTimeout(tick, 400);
      },
      { threshold: 0.45 },
    );
    observer.observe(root);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [last]);

  // The stop in focus: hovered benefit first, otherwise the truck's position.
  const highlighted = focusStop ?? reached;
  const progress = Math.max(0, reached) / last;

  return (
    <div className={styles.story}>
      <ul className={styles.checks}>
        {checks.map((check, index) => {
          const stop = links[index];
          const lit = stop !== undefined && stop <= reached;
          return (
            <li
              key={check}
              className={cx(styles.check, lit && styles.checkLit, focusStop === stop && styles.checkFocus)}
              onPointerEnter={(event) => event.pointerType === "mouse" && setFocusStop(stop ?? null)}
              onPointerLeave={() => setFocusStop(null)}
            >
              <span aria-hidden="true" className={styles.checkIcon}>
                <Icon name="check" size={16} />
              </span>
              {check}
            </li>
          );
        })}
      </ul>

      <div ref={visualRef} className={styles.visual}>
        <figure className={styles.photo}>{photo}</figure>

        <div
          role="img"
          aria-label={route.label}
          data-theme="light"
          className={styles.route}
          style={{ "--progress": progress } as CSSProperties}
        >
          <span aria-hidden="true" className={styles.routeTitle}>
            <Icon name="route" size={16} />
            {route.title}
          </span>
          <span aria-hidden="true" className={styles.stops}>
            <span className={styles.track}>
              <span className={styles.trackFill} />
              <span className={styles.truck}>
                <Icon name="truck" size={16} />
              </span>
            </span>
            {route.stops.map((stop, index) => (
              <span
                key={stop.customer}
                className={cx(
                  styles.stop,
                  index <= reached && styles.stopReached,
                  stop.state === "next" && styles.stopNext,
                  index === highlighted && styles.stopFocus,
                )}
              >
                <span className={styles.stopDot}>
                  {stop.state === "done" ? <Icon name="check" size={16} /> : null}
                </span>
                <span className={styles.stopText}>
                  <span className={styles.stopName}>{stop.customer}</span>
                  <span className={styles.stopStatus}>{stop.status}</span>
                </span>
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
