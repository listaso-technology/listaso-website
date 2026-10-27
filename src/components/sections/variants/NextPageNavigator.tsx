"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import type { NavLink } from "@/content/site/navigation";
import { cx } from "@/lib/utils/cx";
import styles from "./NextPage.module.css";
import { TextRoll } from "./TextRoll";

type NextPageNavigatorProps = {
  group: "Products" | "Integrations" | "Company";
  links: readonly NavLink[];
  currentIndex: number;
};

/** A number previews a page; the large title and description open it. */
export function NextPageNavigator({ group, links, currentIndex }: NextPageNavigatorProps) {
  const [selectedIndex, setSelectedIndex] = useState((currentIndex + 1) % links.length);
  const previewId = useId();
  const stepsRef = useRef<HTMLOListElement>(null);
  const initialized = useRef(false);
  const selected = links[selectedIndex];
  const position = `${String(selectedIndex + 1).padStart(2, "0")} / ${String(links.length).padStart(2, "0")}`;

  useEffect(() => {
    const alignSelected = (behavior: ScrollBehavior) => {
      const list = stepsRef.current;
      const step = list?.querySelector<HTMLElement>('[data-selected="true"]');
      if (!list || !step || list.scrollWidth <= list.clientWidth) return;

      const listRect = list.getBoundingClientRect();
      const stepRect = step.getBoundingClientRect();
      const center = stepRect.left - listRect.left + list.scrollLeft + stepRect.width / 2;
      list.scrollTo({ left: Math.max(0, center - list.clientWidth / 2), behavior });
    };

    const frame = window.requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      alignSelected(initialized.current && !reduceMotion ? "smooth" : "auto");
      initialized.current = true;
    });
    const onResize = () => alignSelected("auto");
    window.addEventListener("resize", onResize);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [selectedIndex]);

  return (
    <nav aria-label={group} data-story-section className={styles.section}>
      <Container width="wide">
        <div className={styles.card}>
          <span className={styles.meta}>
            <span>{group}</span>
            <span aria-hidden="true" className={styles.position}>{position}</span>
          </span>

          <ol ref={stepsRef} className={styles.steps}>
            {links.map((link, linkIndex) => (
              <li
                key={link.href}
                data-selected={linkIndex === selectedIndex ? "true" : undefined}
                className={cx(
                  styles.step,
                  linkIndex < currentIndex && styles.visited,
                  linkIndex === currentIndex && styles.current,
                  linkIndex === selectedIndex && styles.selected,
                )}
              >
                <button
                  type="button"
                  aria-current={linkIndex === currentIndex ? "page" : undefined}
                  aria-pressed={linkIndex === selectedIndex}
                  aria-controls={previewId}
                  className={styles.stepLink}
                  onClick={() => setSelectedIndex(linkIndex)}
                >
                  <span aria-hidden="true" className={styles.dot}>
                    {String(linkIndex + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.stepLabel}>{link.label}</span>
                </button>
              </li>
            ))}
          </ol>

          <a
            id={previewId}
            href={selected.href}
            className={styles.mainLink}
            data-analytics-event="next_page_click"
            data-analytics-label={selected.label}
          >
            <span className={styles.copy} aria-live="polite" aria-atomic="true">
              <span className={styles.title}>
                <TextRoll>{selected.label}</TextRoll>
              </span>
              {selected.description ? <span className={styles.description}>{selected.description}</span> : null}
            </span>
            <span aria-hidden="true" className={styles.arrow}>
              <Icon name="arrow-right" size={24} />
            </span>
          </a>
        </div>
      </Container>
    </nav>
  );
}
