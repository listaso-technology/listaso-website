"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { sami } from "@/content/home/en";
import type { SamiConversationExample } from "@/content/products/sami";
import { SamiBrandText } from "../product/sami/SamiBrandText";
import styles from "./SamiConversation.module.css";

const FINAL_PHASE = 4;
const OUTRO_PHASE = 5;
const INTERACTIVE_REPORT_PHASE = 9;
const INTERACTIVE_OUTRO_PHASE = 10;

/**
 * Adapted from `Guide Sami Listaso AI/components/sami-conversation.tsx`.
 * The original loops forever. This version keeps that explanatory loop while
 * in view, pauses outside the viewport or in a hidden tab, and exposes one
 * stable description to assistive tech instead of announcing every character.
 */
export function SamiConversation({
  example = sami.example,
  mode = "loop",
}: {
  example?: SamiConversationExample;
  mode?: "loop" | "interactive";
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [phase, setPhase] = useState(0);
  const [interactivePhase, setInteractivePhase] = useState(1);
  const [hovered, setHovered] = useState(false);
  const [letters, setLetters] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const interactive = mode === "interactive";
  const visiblePhase = interactive ? (reduceMotion ? INTERACTIVE_REPORT_PHASE : interactivePhase) : phase;
  const showFollowUp = interactive ? visiblePhase >= 7 : visiblePhase >= FINAL_PHASE;
  const showFile = interactive ? visiblePhase >= INTERACTIVE_REPORT_PHASE : visiblePhase >= 3;
  const visibleRows = interactive
    ? visiblePhase < 4 ? 0 : Math.min(visiblePhase - 3, example.rows.length)
    : example.rows.length;
  const accessibleRows = example.rows.map((row) => {
    const label = "customer" in row ? row.customer : row.label;
    const value = "amount" in row ? row.amount : row.value;
    return `${label}: ${value}`;
  }).join(". ");

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "0px 0px -12%",
      threshold: 0.3,
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () => setDocumentVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(media.matches);
    const initialUpdate = window.setTimeout(updatePreference, 0);

    media.addEventListener("change", updatePreference);
    return () => {
      window.clearTimeout(initialUpdate);
      media.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    if (!interactive || reduceMotion || !inView || !documentVisible || hovered) return;

    // A full example is one question, its answer, an export request and a
    // sample report. Pausing keeps the current step instead of restarting it.
    const delays = [0, 1_200, 750, 850, 550, 550, 900, 950, 700, 4_200, 560];
    const timer = window.setTimeout(() => {
      setInteractivePhase((current) => current === INTERACTIVE_OUTRO_PHASE ? 1 : current + 1);
    }, delays[interactivePhase]);
    return () => window.clearTimeout(timer);
  }, [documentVisible, hovered, inView, interactive, interactivePhase, reduceMotion]);

  useEffect(() => {
    if (interactive) return;
    if (reduceMotion) {
      const timer = window.setTimeout(() => {
        setLetters(example.question.length);
        setPhase(FINAL_PHASE);
      }, 0);
      return () => window.clearTimeout(timer);
    }

    if (!inView || !documentVisible) {
      return;
    }

    let delay = 38;
    let advance = () => setLetters((current) => Math.min(current + 1, example.question.length));

    if (phase === 0 && letters === 0) {
      delay = 320;
    } else if (phase === 0 && letters >= example.question.length) {
      delay = 220;
      advance = () => setPhase(1);
    } else if (phase === 1) {
      delay = 500;
      advance = () => setPhase(2);
    } else if (phase === 2) {
      delay = 900;
      advance = () => setPhase(3);
    } else if (phase === 3) {
      delay = 1_500;
      advance = () => setPhase(FINAL_PHASE);
    } else if (phase === FINAL_PHASE) {
      delay = 2_800;
      advance = () => setPhase(OUTRO_PHASE);
    } else if (phase === OUTRO_PHASE) {
      delay = 560;
      advance = () => {
        setLetters(0);
        setPhase(0);
      };
    }

    const timer = window.setTimeout(advance, delay);
    return () => window.clearTimeout(timer);
  }, [documentVisible, example.question.length, inView, interactive, letters, phase, reduceMotion]);

  return (
    <div
      ref={rootRef}
      data-mode={mode}
      data-reveal={interactive ? undefined : "media"}
      className={styles.frame}
      onPointerEnter={(event) => {
        if (interactive && event.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
    >
      <GlassPanel tone="sami" className={styles.conversation}>
        <div className={styles.heading}>
          <span>
            <Image src="/brand/sami/sami-logo.webp" alt="" width={30} height={30} />
            <SamiBrandText text={example.name} />
          </span>
          {!interactive ? (
            <span className={styles.controls}>
              <small>{example.tag}</small>
            </span>
          ) : null}
        </div>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {example.label}: {example.question} {example.answer} {accessibleRows}
          {interactive && example.file ? ` ${example.followUp} Sample file: ${example.file}. Preview only.` : ""}
        </p>

        <div
          aria-hidden="true"
          className={styles.sequence}
          data-outro={visiblePhase === (interactive ? INTERACTIVE_OUTRO_PHASE : OUTRO_PHASE) ? "true" : undefined}
        >
          <div className={styles.messages}>
            <div className={`${styles.message} ${styles.outgoing} ${visiblePhase >= 1 ? styles.sent : ""}`}>
              {visiblePhase >= 1 ? example.question : ""}
            </div>

            {visiblePhase === 2 ? (
              <div className={styles.typing}>
                <i />
                <i />
                <i />
              </div>
            ) : null}

            {visiblePhase >= 3 ? (
              <div className={`${styles.message} ${styles.incoming}`}>
                <p>{example.answer}</p>
                {example.rows.slice(0, visibleRows).map((row) => {
                  const label = "customer" in row ? row.customer : row.label;
                  const value = "amount" in row ? row.amount : row.value;
                  return (
                    <div className={styles.row} key={label}>
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </div>
                  );
                })}
                {!interactive && example.file ? (
                  <span className={styles.export}>
                    <Icon name="download" size={16} />
                    {example.file}
                  </span>
                ) : null}
              </div>
            ) : null}

            {showFollowUp && example.followUp ? (
              <div className={`${styles.message} ${styles.outgoing}`}>{example.followUp}</div>
            ) : null}

            {interactive && visiblePhase === 8 ? (
              <div className={styles.typing}>
                <i />
                <i />
                <i />
              </div>
            ) : null}

            {interactive && showFile && example.file ? (
              <div className={`${styles.message} ${styles.incoming} ${styles.reportMessage}`}>
                <p>{example.file.endsWith(".pdf") ? "Your sample PDF report is ready." : "Your sample Excel report is ready."}</p>
                <span className={styles.report}>
                  <span aria-hidden="true" className={styles.reportIcon}><Icon name="report" size={20} /></span>
                  <span className={styles.reportDetails}>
                    <strong>{example.file}</strong>
                    <small>Illustrative preview · no download</small>
                  </span>
                  <span aria-hidden="true" className={styles.reportType}>{example.file.endsWith(".pdf") ? "PDF" : "XLSX"}</span>
                </span>
              </div>
            ) : null}
          </div>

          <div className={styles.input}>
            <span>
              {visiblePhase === 0 ? example.question.slice(0, letters) : example.inputPlaceholder}
              {visiblePhase === 0 && inView && documentVisible ? (
                <i className={styles.caret} />
              ) : null}
            </span>
            <span className={styles.inputActions}>
              <svg className={styles.inputTool} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57a4 4 0 0 1 5.66 5.66l-8.58 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
              <svg className={styles.inputTool} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="9" y="2" width="6" height="12" rx="3" />
                <path d="M5 11a7 7 0 0 0 14 0M12 18v4" />
              </svg>
              <span className={`${styles.send} ${visiblePhase === 1 ? styles.sending : ""}`}>
                <Icon name="arrow-right" size={16} className="-rotate-90" />
              </span>
            </span>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
