"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "@/components/icons/Icon";
import { cx } from "@/lib/utils/cx";
import styles from "./BetterDecisions.module.css";

type Zone = "chart" | "pipeline" | "inventory" | "invoices";

type BackOfficeConsoleProps = {
  checks: readonly string[];
  /** Zone of the mock each check points to, in check order. */
  zones: readonly Zone[];
  dashboard: { label: string; title: string; period: string; days: readonly { day: string; value: number }[] };
  pipeline: { label: string; columns: readonly { title: string; orders: readonly string[] }[] };
};

const NAV: { icon: IconName; zone: Zone | null }[] = [
  { icon: "dashboard", zone: "chart" },
  { icon: "orders", zone: "pipeline" },
  { icon: "inventory", zone: "inventory" },
  { icon: "invoice", zone: "invoices" },
];

/**
 * Checks + an illustrative Back Office window (light product UI). On reveal,
 * once: the bars grow, order cards drop into their columns one after another,
 * a pulse runs along the column arrows and the truck lights up. Hovering a
 * check highlights the part of the window it describes. The window keeps the
 * existing role="img" labels; the checks are plain text. Reduced motion:
 * final state at once.
 */
export function BackOfficeConsole({ checks, zones, dashboard, pipeline }: BackOfficeConsoleProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [played, setPlayed] = useState(true);
  const [focus, setFocus] = useState<Zone | null>(null);

  useEffect(() => {
    const target = windowRef.current;
    if (!target || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const frame = window.requestAnimationFrame(() => setPlayed(false));
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        window.requestAnimationFrame(() => setPlayed(true));
      },
      { threshold: 0.35 },
    );
    observer.observe(target);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  let order = 0;

  return (
    <div className={styles.console}>
      <ul className={styles.checks}>
        {checks.map((check, index) => (
          <li
            key={check}
            className={cx(styles.check, focus === zones[index] && styles.checkFocus)}
            onPointerEnter={(event) => event.pointerType === "mouse" && setFocus(zones[index] ?? null)}
            onPointerLeave={() => setFocus(null)}
          >
            <span aria-hidden="true" className={styles.checkIcon}>
              <Icon name="check" size={16} />
            </span>
            {check}
          </li>
        ))}
      </ul>

      <div
        ref={windowRef}
        data-theme="light"
        data-played={played ? "" : undefined}
        data-focus={focus ?? undefined}
        className={styles.window}
      >
        <span aria-hidden="true" className={styles.windowBar}>
          <span />
          <span />
          <span />
        </span>

        <span className={styles.windowBody}>
          <span aria-hidden="true" className={styles.nav}>
            {NAV.map((item) => (
              <span key={item.icon} className={styles.navItem} data-zone={item.zone ?? undefined}>
                <Icon name={item.icon} size={20} />
              </span>
            ))}
          </span>

          <span className={styles.main}>
            <span role="img" aria-label={dashboard.label} className={styles.chart}>
              <span aria-hidden="true" className={styles.chartHead}>
                <span className={styles.chartTitle}>{dashboard.title}</span>
                <span className={styles.chartPeriod}>{dashboard.period}</span>
              </span>
              <span aria-hidden="true" className={styles.bars}>
                {dashboard.days.map((day, index) => (
                  <span
                    key={day.day}
                    className={styles.barCol}
                    style={{ "--h": `${day.value}%`, "--i": index } as CSSProperties}
                  >
                    <span className={styles.bar} />
                    <span className={styles.barDay}>{day.day}</span>
                  </span>
                ))}
              </span>
            </span>

            <span role="img" aria-label={pipeline.label} className={styles.pipeline}>
              {pipeline.columns.map((column, columnIndex) => (
                <span key={column.title} aria-hidden="true" className={styles.column}>
                  <span className={styles.columnHead}>
                    {column.title}
                    {columnIndex < pipeline.columns.length - 1 ? (
                      <span className={styles.flow} style={{ "--i": columnIndex } as CSSProperties}>
                        <Icon name="arrow-right" size={16} />
                      </span>
                    ) : (
                      <span className={styles.truck}>
                        <Icon name="truck" size={16} />
                      </span>
                    )}
                  </span>
                  {column.orders.map((customer) => (
                    <span key={customer} className={styles.order} style={{ "--i": order++ } as CSSProperties}>
                      <span className={styles.orderName}>{customer}</span>
                      <span className={styles.orderMeta}>
                        <Icon name="orders" size={16} />
                        <span className={styles.orderLine} />
                      </span>
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </span>
        </span>
      </div>
    </div>
  );
}
