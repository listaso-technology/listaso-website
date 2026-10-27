"use client";

import { useEffect, useState } from "react";
import type { faq } from "@/content/products/sami";
import { Icon } from "@/components/icons/Icon";
import { SamiBrandText } from "./SamiBrandText";
import styles from "./SamiFaqAccordion.module.css";

type FaqItem = (typeof faq.items)[number];

export function SamiFaqAccordion({ items }: { items: readonly FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pausedByUser, setPausedByUser] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (reduceMotion || hovering || focused || pausedByUser || items.length < 2) return;

    const timer = window.setInterval(() => {
      setOpenIndex((current) => (current + 1) % items.length);
    }, 9_000);
    return () => window.clearInterval(timer);
  }, [focused, hovering, items.length, pausedByUser, reduceMotion]);

  return (
    <div
      className="flex flex-col border-t border-line-subtle"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setFocused(false);
        }
      }}
    >
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const answerId = `sami-faq-answer-${index}`;
        return (
          <div key={item.question} className="border-b border-line-subtle">
            <h3 className="m-0">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={answerId}
                className="flex min-h-20 w-full items-center justify-between gap-6 py-6 text-left text-h4 font-semibold text-fg-heading focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring"
                onClick={() => {
                  setOpenIndex(isOpen ? -1 : index);
                  setPausedByUser(true);
                }}
              >
                <span className="min-w-0 flex-1">
                  <SamiBrandText text={item.question} />
                </span>
                <span
                  aria-hidden="true"
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full border border-line-subtle text-icon-accent transition-transform duration-(--listaso-duration-standard) ${isOpen ? "rotate-45" : ""}`}
                >
                  <Icon name="plus" size={20} />
                </span>
              </button>
            </h3>
            <div id={answerId} aria-hidden={!isOpen} className={styles.answer} data-open={isOpen ? "true" : undefined}>
              <div className={styles.answerInner}>
                <p className="max-w-2xl pb-6 text-body-lg text-fg-muted">
                  <SamiBrandText text={item.answer} />
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
