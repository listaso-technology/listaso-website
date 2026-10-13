"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { sami } from "@/content/home/en";
import styles from "./SamiConversation.module.css";

const FINAL_PHASE = 4;
const OUTRO_PHASE = 5;

/**
 * Adapted from `Guide Sami Listaso AI/components/sami-conversation.tsx`.
 * The original loops forever. This version keeps that explanatory loop while
 * in view, pauses outside the viewport or in a hidden tab, and exposes one
 * stable description to assistive tech instead of announcing every character.
 */
export function SamiConversation() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [phase, setPhase] = useState(0);
  const [letters, setLetters] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const { example } = sami;

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
    if (reduceMotion) {
      const timer = window.setTimeout(() => {
        setLetters(example.question.length);
        setPhase(FINAL_PHASE);
      }, 0);
      return () => window.clearTimeout(timer);
    }

    if (!inView || !documentVisible || paused) {
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
  }, [documentVisible, example.question.length, inView, letters, paused, phase, reduceMotion]);

  return (
    <div ref={rootRef} data-reveal="media" className={styles.frame}>
      <GlassPanel tone="sami" className={styles.conversation}>
        <div className={styles.heading}>
          <span>
            <Image src="/brand/sami/sami-logo.webp" alt="" width={30} height={30} />
            {example.name}
          </span>
          <span className={styles.controls}>
            <small>{example.tag}</small>
            {!reduceMotion ? (
              <button
                type="button"
                className={styles.pause}
                aria-pressed={paused}
                onClick={() => setPaused((current) => !current)}
              >
                {paused ? "Play animation" : "Pause animation"}
              </button>
            ) : null}
          </span>
        </div>

        <p className="sr-only">{example.label}</p>

        <div
          aria-hidden="true"
          className={styles.sequence}
          data-outro={phase === OUTRO_PHASE ? "true" : undefined}
        >
          <div className={styles.messages}>
            <div className={`${styles.message} ${styles.outgoing} ${phase >= 1 ? styles.sent : ""}`}>
              {phase >= 1 ? example.question : ""}
            </div>

            {phase === 2 ? (
              <div className={styles.typing}>
                <i />
                <i />
                <i />
              </div>
            ) : null}

            {phase >= 3 ? (
              <div className={`${styles.message} ${styles.incoming}`}>
                <p>{example.answer}</p>
                {example.rows.map((row) => (
                  <div className={styles.row} key={row.customer}>
                    <span>{row.customer}</span>
                    <strong>{row.amount}</strong>
                  </div>
                ))}
                <span className={styles.export}>
                  <Icon name="download" size={16} />
                  {example.file}
                </span>
              </div>
            ) : null}

            {phase >= FINAL_PHASE ? (
              <div className={`${styles.message} ${styles.outgoing}`}>{example.followUp}</div>
            ) : null}
          </div>

          <div className={styles.input}>
            <span>
              {phase === 0 ? example.question.slice(0, letters) : example.inputPlaceholder}
              {phase === 0 && inView && documentVisible && !paused ? (
                <i className={styles.caret} />
              ) : null}
            </span>
            <span className={`${styles.send} ${phase === 1 ? styles.sending : ""}`}>
              <Icon name="arrow-right" size={16} className="-rotate-90" />
            </span>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
