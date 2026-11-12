"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { Icon } from "@/components/icons/Icon";
import { Button } from "@/components/ui/Button";

const motionQuery = "(prefers-reduced-motion: reduce)";
const subscribeMotion = (notify: () => void) => {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};
const getReducedMotion = () => window.matchMedia(motionQuery).matches;
const getServerMotion = () => true;

/** Native horizontal scrolling keeps all twelve labels available without copies. */
export function QuestionTypesCarousel({ types }: { types: readonly string[] }) {
  const viewport = useRef<HTMLDivElement>(null);
  const direction = useRef(1);
  const id = useId();
  const reducedMotion = useSyncExternalStore(subscribeMotion, getReducedMotion, getServerMotion);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const element = viewport.current;
    if (!element || !playing || reducedMotion || hovered || focused) return;
    let frame = 0;
    let previous = 0;
    let position = element.scrollLeft;
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(element);
    const advance = (now: number) => {
      const elapsed = previous ? Math.min(now - previous, 50) : 0;
      previous = now;
      if (visible && !document.hidden) {
        const end = element.scrollWidth - element.clientWidth;
        // A slow, linear pass reverses at the ends without jumping or duplicating labels.
        position = Math.max(0, Math.min(end, position + direction.current * elapsed * 0.024));
        element.scrollLeft = position;
        if (position >= end) direction.current = -1;
        if (position <= 0) direction.current = 1;
      }
      frame = requestAnimationFrame(advance);
    };
    frame = requestAnimationFrame(advance);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [playing, reducedMotion, hovered, focused]);

  const move = (step: number) => {
    setPlaying(false);
    const element = viewport.current;
    element?.scrollBy({ left: step * Math.max(240, element.clientWidth * 0.7), behavior: reducedMotion ? "instant" : "smooth" });
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Question types"
      className="min-w-0"
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Button variant="secondary" aria-label="Previous question types" aria-controls={id} onClick={() => move(-1)} className="px-4">
          <Icon name="arrow-left" size={20} />
        </Button>
        <Button variant="secondary" aria-label="Next question types" aria-controls={id} onClick={() => move(1)} className="px-4">
          <Icon name="arrow-right" size={20} />
        </Button>
        <Button
          variant="secondary"
          aria-controls={id}
          disabled={reducedMotion}
          onClick={() => setPlaying((value) => !value)}
        >
          {reducedMotion ? "Auto-scroll off" : playing ? "Pause auto-scroll" : "Resume auto-scroll"}
        </Button>
      </div>
      <div
        ref={viewport}
        id={id}
        tabIndex={0}
        aria-label="All 12 question types"
        className="overflow-x-auto overscroll-x-contain rounded-lg border border-line-subtle bg-surface-page p-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg-accent sm:p-6"
        onPointerDown={() => setPlaying(false)}
        onWheel={() => setPlaying(false)}
        onKeyDown={(event) => {
          setPlaying(false);
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowLeft" ? -1 : 1);
          } else if (event.key === "Home" || event.key === "End") {
            event.preventDefault();
            viewport.current?.scrollTo({ left: event.key === "Home" ? 0 : viewport.current.scrollWidth, behavior: "instant" });
          }
        }}
      >
        <ol className="flex w-max gap-4">
          {types.map((type) => (
            <li key={type} className="flex min-h-28 shrink-0 items-center gap-4 whitespace-nowrap rounded-md border border-line-subtle bg-surface-raised px-6 py-5 text-h4 font-semibold text-fg-heading">
              <Icon name="forms" size={24} className="shrink-0 text-icon-accent" />
              {type}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
