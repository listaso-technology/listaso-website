import { Fragment, type CSSProperties } from "react";
import { Container } from "@/components/layout/Container";
import { proof } from "@/content/home/en";
import { cx } from "@/lib/utils/cx";
import styles from "./MetricOdometer.module.css";

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

/** Renders a value such as "$1.8B+" with rolling digit columns; words never split. */
function OdometerValue({ value }: { value: string }) {
  let order = 0;

  return (
    <>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className={cx(styles.value, "font-bold text-fg-heading")}>
        {value.split(" ").map((word, wordIndex) => (
          <Fragment key={wordIndex}>
            {/* The space sits between the no-wrap words, so lines break only there. */}
            {wordIndex > 0 ? " " : null}
            <span className={styles.word}>
              {[...word].map((char, index) => {
                if (!/\d/.test(char)) {
                  return <span key={index}>{char}</span>;
                }
                const style = { "--digit": Number(char), "--order": order++ } as CSSProperties;
                return (
                  <span key={index} className={styles.digit}>
                    <span className={styles.column} style={style}>
                      {DIGITS.map((digit) => (
                        <span key={digit}>{digit}</span>
                      ))}
                    </span>
                  </span>
                );
              })}
            </span>
          </Fragment>
        ))}
      </span>
    </>
  );
}

type MetricOdometerProps = {
  tone?: "page" | "alt" | "band";
  className?: string;
};

/**
 * Brand figures as large cards with odometer digits (Good Fella, Symboolic).
 * Same approved data as the Homepage figures (DEC-013); a visual variation of
 * `ProofStrip`, not a replacement.
 *
 * Placement (Erick, 13 October 2026): the figures appear only on the Homepage
 * and on About us. Not used on Products or Integrations; kept for About us.
 */
export function MetricOdometer({ tone = "alt", className }: MetricOdometerProps) {
  return (
    <section
      aria-label={proof.label}
      data-story-section
      {...(tone === "band" ? { "data-surface": "band" } : null)}
      className={cx(
        "py-16 lg:py-20",
        tone === "alt" && "border-y border-line-subtle bg-surface-alt",
        className,
      )}
    >
      <Container width="wide">
        {/* 2 columns, then 3 + 2 on laptops, then one row of 5 on wide screens. */}
        <ul data-reveal="group" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-5">
          {proof.items.map((item, index) => (
            <li
              data-reveal-item
              key={item.value}
              className={cx(
                "flex min-h-48 flex-col justify-between gap-8 rounded-lg border border-line-subtle p-6",
                tone === "band" ? "bg-surface-band" : "bg-surface-raised",
                index === 0 && "sm:col-span-2",
                index < 3 ? "lg:col-span-2" : "lg:col-span-3",
                "xl:col-span-1",
              )}
            >
              <span aria-hidden="true" className="text-small font-bold text-fg-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex flex-col gap-3">
                <OdometerValue value={item.value} />
                <span className="text-small text-fg-muted">{item.label}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
