"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./HomeCapabilities.module.css";

const WIDE = "(min-width: 64rem)";
const INTERVAL = 5_500;

/** Desktop progressive enhancement: cycles one open capability at a time. */
export function CapabilityDisclosures({ groupId }: { groupId: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [canAutoplay, setCanAutoplay] = useState(false);

  const openItem = useCallback(
    (index: number) => {
      const group = document.getElementById(groupId);
      const items = Array.from(group?.querySelectorAll("details") ?? []) as HTMLDetailsElement[];
      if (!items.length) return;
      const nextIndex = index % items.length;
      items.forEach((item, itemIndex) => {
        item.open = itemIndex === nextIndex;
      });
      setActiveIndex(nextIndex);
    },
    [groupId],
  );

  useEffect(() => {
    const wide = window.matchMedia(WIDE);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMode = () => setCanAutoplay(wide.matches && !reduce.matches);
    const group = document.getElementById(groupId);
    const updateFromToggle = (event: Event) => {
      const item = event.target;
      if (!(item instanceof HTMLDetailsElement) || !item.open || !group) return;
      setActiveIndex(Array.from(group.querySelectorAll("details")).indexOf(item));
    };
    const keepOpen = (event: MouseEvent) => {
      if (!wide.matches) return;
      const details = (event.target as Element | null)?.closest("summary")?.parentElement;
      if (details instanceof HTMLDetailsElement && details.open) event.preventDefault();
    };
    const pauseInteraction = () => setInteractionPaused(true);
    const resumeInteraction = (event: FocusEvent | PointerEvent) => {
      if (event.type === "focusout" && group?.contains((event as FocusEvent).relatedTarget as Node | null)) return;
      setInteractionPaused(false);
    };

    updateMode();
    wide.addEventListener("change", updateMode);
    reduce.addEventListener("change", updateMode);
    group?.addEventListener("toggle", updateFromToggle, true);
    group?.addEventListener("click", keepOpen);
    group?.addEventListener("pointerenter", pauseInteraction);
    group?.addEventListener("pointerleave", resumeInteraction);
    group?.addEventListener("focusin", pauseInteraction);
    group?.addEventListener("focusout", resumeInteraction);
    return () => {
      wide.removeEventListener("change", updateMode);
      reduce.removeEventListener("change", updateMode);
      group?.removeEventListener("toggle", updateFromToggle, true);
      group?.removeEventListener("click", keepOpen);
      group?.removeEventListener("pointerenter", pauseInteraction);
      group?.removeEventListener("pointerleave", resumeInteraction);
      group?.removeEventListener("focusin", pauseInteraction);
      group?.removeEventListener("focusout", resumeInteraction);
    };
  }, [groupId]);

  useEffect(() => {
    const group = document.getElementById(groupId);
    if (!group || !("IntersectionObserver" in window)) {
      const frame = window.requestAnimationFrame(() => setInView(true));
      return () => window.cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
      rootMargin: "0px 0px -10%",
    });
    observer.observe(group);
    return () => observer.disconnect();
  }, [groupId]);

  useEffect(() => {
    const updateVisibility = () => setDocumentVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (!canAutoplay || userPaused || interactionPaused || !inView || !documentVisible) return;
    const timer = window.setTimeout(() => openItem(activeIndex + 1), INTERVAL);
    return () => window.clearTimeout(timer);
  }, [activeIndex, canAutoplay, documentVisible, inView, interactionPaused, openItem, userPaused]);

  if (!canAutoplay) return null;

  return (
    <div
      ref={rootRef}
      className={styles.autoplayControls}
      onMouseEnter={() => setInteractionPaused(true)}
      onMouseLeave={() => setInteractionPaused(false)}
      onFocusCapture={() => setInteractionPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteractionPaused(false);
      }}
    >
      <button
        type="button"
        className={styles.autoplayButton}
        aria-controls={groupId}
        aria-pressed={userPaused}
        onClick={() => setUserPaused((current) => !current)}
      >
        {userPaused ? "Play Autoplay" : "Pause Autoplay"}
      </button>
      <span className={styles.autoplayPosition} aria-hidden="true">
        {String(activeIndex + 1).padStart(2, "0")} / 04
      </span>
    </div>
  );
}
