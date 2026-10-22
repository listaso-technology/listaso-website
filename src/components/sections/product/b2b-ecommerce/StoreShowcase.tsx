"use client";

import { type CSSProperties, type KeyboardEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { hero as homeHero } from "@/content/home/en";
import { storefrontExample } from "@/content/products/b2b-ecommerce";
import type { Feature } from "@/content/products/types";
import { cx } from "@/lib/utils/cx";
import styles from "./StoreFeatures.module.css";

const INTERVAL = 6_000;

const example = storefrontExample;
/** Quantities of the same example order (Homepage hero). */
const quantities = homeHero.example.order.lines.map((line) => line.detail.split(" ×")[0]);

type StoreShowcaseProps = {
  spotlight: readonly Feature[];
  photo: ReactNode;
};

/**
 * Navy stage: the three spotlight features as an accordion (h3 + button with
 * aria-expanded) beside the store photo. Over the photo, a small light
 * storefront mock illustrates the active feature with the example order
 * (customer prices, repeat last order, the order total paid by card); it is
 * decorative (aria-hidden), the copy lives in the accordion. Autoplay
 * advances when the progress line completes and pauses on hover, focus,
 * off-screen or a hidden tab (none with reduced motion). Click, arrows,
 * Home/End select.
 */
export function StoreShowcase({ spotlight, photo }: StoreShowcaseProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const frame = window.requestAnimationFrame(() => setAutoplay(true));
    const root = rootRef.current;
    const observer =
      root && "IntersectionObserver" in window
        ? new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 })
        : null;
    if (root) observer?.observe(root);
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const playing = autoplay && inView && !paused;
  const count = spotlight.length;

  const select = (index: number, focus = false) => {
    setActive(index);
    if (focus) tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const last = count - 1;
    const next: Record<string, number> = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowRight: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in next)) return;
    event.preventDefault();
    select(next[event.key], true);
  };

  return (
    <div
      ref={rootRef}
      data-surface="band"
      data-reveal="media"
      className={styles.stage}
      onPointerEnter={(event) => event.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div className={styles.accordion} onKeyDown={onKeyDown}>
        <p aria-hidden="true" className={styles.counter}>
          <span className={styles.counterNow}>{String(active + 1).padStart(2, "0")}</span>
          <span className={styles.counterTrack}>
            <span className={styles.counterFill} style={{ "--step": (active + 1) / count } as CSSProperties} />
          </span>
          <span>{String(count).padStart(2, "0")}</span>
        </p>

        {spotlight.map((feature, index) => {
          const isActive = index === active;
          return (
            <div key={feature.title} className={cx(styles.item, isActive && styles.itemActive)}>
              <span aria-hidden="true" className={styles.itemLine}>
                {isActive ? (
                  <span
                    key={`run-${active}`}
                    className={cx(styles.itemLineFill, autoplay && styles.itemLineTimed)}
                    data-playing={playing ? "" : undefined}
                    style={{ animationDuration: `${INTERVAL}ms` }}
                    onAnimationEnd={() => select((active + 1) % count)}
                  />
                ) : null}
              </span>
              <h3 className={styles.itemHeading}>
                <button
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  aria-expanded={isActive}
                  aria-controls={`store-panel-${index}`}
                  className={styles.itemButton}
                  onClick={() => select(index)}
                >
                  <span aria-hidden="true" className={styles.itemIcon}>
                    <Icon name={feature.icon} size={20} />
                  </span>
                  <span className={styles.itemTitle}>{feature.title}</span>
                  <span aria-hidden="true" className={styles.itemChevron}>
                    <Icon name="plus" size={16} />
                  </span>
                </button>
              </h3>
              <div id={`store-panel-${index}`} className={styles.itemPanel}>
                <p className={styles.itemText}>{feature.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.visual} data-active={active}>
        {photo}
        <span aria-hidden="true" className={styles.visualShade} />
        <div aria-hidden="true" data-theme="light" className={styles.mocks}>
          {spotlight.map((feature, index) => (
            <div key={feature.title} className={cx(styles.mock, index === active && styles.mockActive)}>
              <StoreMock icon={feature.icon} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Decorative storefront fragment for one spotlight feature. */
function StoreMock({ icon }: { icon: Feature["icon"] }) {
  if (icon === "reorder") {
    return (
      <>
        <span className={cx(styles.mockAction, styles.row)} style={{ "--r": 0 } as CSSProperties}>
          <Icon name="reorder" size={16} />
          {example.reorder}
        </span>
        <span className={styles.mockList}>
          {example.products.map((product, index) => (
            <span key={product.name} className={cx(styles.mockRow, styles.row)} style={{ "--r": index + 1 } as CSSProperties}>
              <span className={styles.mockCheck}>
                <Icon name="check" size={16} />
              </span>
              <span className={styles.mockName}>{product.name}</span>
              <span className={styles.mockQty}>× {quantities[index]}</span>
            </span>
          ))}
        </span>
        <span className={cx(styles.mockFoot, styles.row)} style={{ "--r": 5 } as CSSProperties}>
          <span className={styles.mockPill}>
            <Icon name="cart" size={16} />
            {example.cart.label} · {example.cart.total}
          </span>
        </span>
      </>
    );
  }

  if (icon === "payments") {
    return (
      <>
        <span className={cx(styles.mockHead, styles.row)} style={{ "--r": 0 } as CSSProperties}>
          <span className={styles.mockLabel}>{example.store}</span>
          <span className={styles.mockCustomer}>{example.customer}</span>
        </span>
        <span className={cx(styles.mockCard, styles.row)} style={{ "--r": 1 } as CSSProperties}>
          <span className={styles.mockChip} />
          <span className={styles.mockCardIcon}>
            <Icon name="payments" size={16} />
          </span>
          <span className={styles.mockDots}>•••• •••• ••••</span>
        </span>
        <span className={cx(styles.mockTotal, styles.row)} style={{ "--r": 2 } as CSSProperties}>
          <span className={styles.mockTotalValue}>{example.cart.total}</span>
          <span className={styles.mockPaid}>
            <Icon name="check" size={16} />
          </span>
        </span>
        <span className={cx(styles.mockMeter, styles.row)} style={{ "--r": 3 } as CSSProperties}>
          <span className={styles.mockMeterFill} />
        </span>
      </>
    );
  }

  return (
    <>
      <span className={cx(styles.mockHead, styles.row)} style={{ "--r": 0 } as CSSProperties}>
        <span className={styles.mockLabel}>{example.store}</span>
        <span className={styles.mockCustomer}>{example.customer}</span>
      </span>
      <span className={styles.mockList}>
        {example.products.slice(0, 3).map((product, index) => (
          <span key={product.name} className={cx(styles.mockRow, styles.row)} style={{ "--r": index + 1 } as CSSProperties}>
            <span className={styles.mockThumb}>
              <Icon name="box" size={16} />
            </span>
            <span className={styles.mockProduct}>
              <span className={styles.mockName}>{product.name}</span>
              <span className={styles.mockPrice}>{example.priceLabel}</span>
            </span>
            <span className={styles.mockAmount}>{product.price}</span>
          </span>
        ))}
      </span>
    </>
  );
}
