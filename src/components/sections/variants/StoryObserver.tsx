"use client";

import { useEffect } from "react";

/**
 * Marks the step closest to the middle of the viewport as active in a
 * `StickyStory`, by setting `data-active` on the story root. Progressive
 * enhancement: without it every step stays fully visible and the first media
 * shows. Disconnects on unmount.
 */
export function StoryObserver({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root || !("IntersectionObserver" in window)) return;

    const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-story-step]"));
    if (steps.length === 0) return;

    root.dataset.storyReady = "true";
    root.dataset.active = "0";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            root.dataset.active = (entry.target as HTMLElement).dataset.storyStep ?? "0";
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    steps.forEach((step) => observer.observe(step));

    return () => {
      observer.disconnect();
      delete root.dataset.storyReady;
      delete root.dataset.active;
    };
  }, [rootId]);

  return null;
}
