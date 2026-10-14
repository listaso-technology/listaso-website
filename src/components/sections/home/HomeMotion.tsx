"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = "[data-reveal]";
const STORY_SELECTOR = "[data-story-section]";
const FLOW_STEP_SELECTOR = "[data-flow-step]";

/**
 * Progressive enhancement for the Homepage narrative.
 *
 * Content is visible by default. The root class that enables masked states is
 * added only when motion is allowed and removed during cleanup, so failed or
 * delayed JavaScript never hides the page.
 */
export function HomeMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches || !("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    const sections = Array.from(document.querySelectorAll<HTMLElement>(STORY_SELECTOR));
    const flowSteps = Array.from(document.querySelectorAll<HTMLElement>(FLOW_STEP_SELECTOR));

    // Mark the first viewport before enabling hidden states. This prevents the
    // hero from waiting on an observer callback after hydration.
    reveals.forEach((element) => {
      const bounds = element.getBoundingClientRect();
      if (bounds.top < window.innerHeight * 0.92 && bounds.bottom > 0) {
        element.dataset.revealed = "true";
      }
    });

    root.classList.add("home-motion-ready");

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.revealed = "true";
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12%", threshold: 0.14 },
    );

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const active = entry.target as HTMLElement;
          sections.forEach((section) => {
            section.dataset.storyState = section === active ? "active" : section.dataset.storyState ?? "future";
          });
        });
      },
      { rootMargin: "-34% 0px -48%", threshold: 0 },
    );

    const flowObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const active = entry.target as HTMLElement;
          const root = active.closest<HTMLElement>("[data-flow-root]");
          if (!root) return;

          root.dataset.activeStep = active.dataset.flowStep ?? "0";
          flowSteps.forEach((step) => {
            step.dataset.flowActive = step === active ? "true" : "false";
          });
        });
      },
      { rootMargin: "-38% 0px -44%", threshold: 0.08 },
    );

    reveals.forEach((element) => {
      if (element.dataset.revealed !== "true") revealObserver.observe(element);
    });
    sections.forEach((section) => sectionObserver.observe(section));
    flowSteps.forEach((step) => flowObserver.observe(step));

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      flowObserver.disconnect();
      root.classList.remove("home-motion-ready");
      reveals.forEach((element) => delete element.dataset.revealed);
      sections.forEach((section) => delete section.dataset.storyState);
      flowSteps.forEach((step) => delete step.dataset.flowActive);
      document.querySelectorAll<HTMLElement>("[data-flow-root]").forEach((root) => {
        root.dataset.activeStep = "0";
      });
    };
  }, []);

  return null;
}
