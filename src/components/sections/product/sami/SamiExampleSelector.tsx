"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { examples, promptsNote } from "@/content/products/sami";
import { SamiConversation } from "../../home/SamiConversation";
import { SamiBrandText } from "./SamiBrandText";
import styles from "./SamiExamples.module.css";

export function SamiExampleSelector() {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [previousQuestionIndex, setPreviousQuestionIndex] = useState<number | null>(null);
  const transitionTimeout = useRef<number | null>(null);
  const activeExample = examples.questions[activeQuestionIndex];

  useEffect(() => () => {
    if (transitionTimeout.current !== null) window.clearTimeout(transitionTimeout.current);
  }, []);

  const selectQuestion = (index: number) => {
    if (index === activeQuestionIndex) return;
    if (transitionTimeout.current !== null) window.clearTimeout(transitionTimeout.current);
    setPreviousQuestionIndex(activeQuestionIndex);
    setActiveQuestionIndex(index);
    transitionTimeout.current = window.setTimeout(() => setPreviousQuestionIndex(null), 300);
  };

  return (
    <div className="grid min-w-0 gap-12 lg:grid-cols-2 lg:gap-16">
      <div className={`${styles.stage} order-2 min-w-0 lg:order-1 lg:sticky lg:top-28 lg:h-fit`}>
        {previousQuestionIndex !== null ? (
          <div className={styles.stagePrevious} aria-hidden="true">
            <SamiConversation example={examples.questions[previousQuestionIndex]} mode="interactive" />
          </div>
        ) : null}
        <div key={activeExample.question} className={styles.stageCurrent}>
          <SamiConversation example={activeExample} mode="interactive" />
        </div>
        <p className="relative z-10 mt-4 text-center text-small text-fg-muted">{activeExample.tag}</p>
      </div>
      <div className="order-1 min-w-0 lg:order-2">
      <ol data-reveal="group" className={styles.prompts}>
        {examples.questions.map((item, index) => (
          <li data-reveal-item key={item.question} className={styles.promptItem}>
            <button
              type="button"
              aria-label={`Show example: ${item.question}`}
              aria-pressed={activeQuestionIndex === index}
              data-active={activeQuestionIndex === index ? "true" : undefined}
              className={styles.prompt}
              onFocus={() => selectQuestion(index)}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") selectQuestion(index);
              }}
              onClick={() => selectQuestion(index)}
            >
              <span aria-hidden="true" className={styles.index}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.question}>
                “<SamiBrandText text={item.question} />”
                <span aria-hidden="true" className={styles.caret} />
              </span>
              <span aria-hidden="true" className={styles.action}>
                <span className={styles.sparkle}>
                  <Icon name="ai" size={20} />
                </span>
                <span className={styles.send}>
                  <Icon name="arrow-right" size={20} className="-rotate-90" />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-center text-small font-semibold text-fg-muted">{promptsNote}</p>
      </div>
    </div>
  );
}
