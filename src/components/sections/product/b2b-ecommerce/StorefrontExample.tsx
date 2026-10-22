"use client";

import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { hero as homeHero } from "@/content/home/en";
import { storefrontExample } from "@/content/products/b2b-ecommerce";
import { cx } from "@/lib/utils/cx";
import styles from "./StorefrontExample.module.css";

const STEP = 650;

/** Quantities and line totals of the same example order (Homepage hero). */
const lines = homeHero.example.order.lines.map((line) => ({
  qty: line.detail.split(" ×")[0],
  total: line.total,
  amount: Number(line.total.replace(/[^0-9.]/g, "")),
}));

const money = (value: number) => `$${value.toFixed(2)}`;

/**
 * Illustrative storefront (light product UI over the brand band) that plays a
 * reorder once when it scrolls into view: "Repeat last order" lights up, each
 * product gets its quantity and line total, the cart counts up to the order
 * total, and a phone shows the order placed online. Clicking "Repeat last
 * order" replays it (pointer only; the whole composition is one image to
 * assistive technology). Reduced motion and no-JS: the final state.
 */
export function StorefrontExample() {
  const example = storefrontExample;
  const rootRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  // -1 idle (button highlighted), 0..n-1 lines added, n = order placed.
  const [step, setStep] = useState(lines.length);
  const [cart, setCart] = useState(lines.reduce((sum, line) => sum + line.amount, 0));

  const clear = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  };

  const play = useCallback(() => {
    clear();
    setStep(-1);
    setCart(0);
    let running = 0;
    lines.forEach((line, index) => {
      timers.current.push(
        window.setTimeout(() => {
          running += line.amount;
          setStep(index);
          setCart(running);
        }, 700 + index * STEP),
      );
    });
    timers.current.push(window.setTimeout(() => setStep(lines.length), 700 + lines.length * STEP + 200));
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        play();
      },
      { threshold: 0.4 },
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
      clear();
    };
  }, [play]);

  const placed = step >= lines.length;

  return (
    <div ref={rootRef} data-reveal="media" className={styles.stage}>
      <div role="img" aria-label={example.label} data-theme="light" className={styles.browser}>
        <div aria-hidden="true">
          <div className={styles.chrome}>
            <span />
            <span />
            <span />
            <span className={styles.address} />
          </div>

          <div className={styles.storeHead}>
            <span className={styles.storeName}>
              <span className={styles.storeLabel}>{example.store}</span>
              <span className={styles.customer}>{example.customer}</span>
            </span>
            <span className={cx(styles.cart, step >= 0 && !placed && styles.cartBusy)}>
              <Icon name="cart" size={16} />
              {example.cart.label} · <span className={styles.cartTotal}>{money(cart)}</span>
            </span>
          </div>

          <div className={styles.body}>
            <span className={styles.search}>
              <Icon name="search" size={16} />
              {example.search}
            </span>
            <button
              type="button"
              tabIndex={-1}
              className={cx(styles.reorder, step === -1 && styles.reorderActive)}
              onClick={play}
            >
              <Icon name="reorder" size={16} />
              {example.reorder}
            </button>

            <span className={styles.products}>
              {example.products.map((product, index) => {
                const added = index <= step;
                return (
                  <span
                    key={product.name}
                    className={cx(styles.product, added && styles.productAdded)}
                    style={{ "--i": index } as CSSProperties}
                  >
                    <span className={styles.productIcon}>
                      <Icon name="box" size={24} />
                    </span>
                    <span className={styles.productText}>
                      <span className={styles.productName}>{product.name}</span>
                      <span className={styles.productMeta}>
                        {example.priceLabel} · {product.price}
                      </span>
                    </span>
                    <span className={styles.productRight}>
                      <span className={styles.lineTotal}>{lines[index]?.total}</span>
                      <span className={styles.qty}>
                        <span className={styles.qtyPlus}>
                          <Icon name="plus" size={16} />
                        </span>
                        <span className={styles.qtyCount}>× {lines[index]?.qty}</span>
                      </span>
                    </span>
                  </span>
                );
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Phone: the same order, placed online. */}
      <div aria-hidden="true" data-theme="light" className={cx(styles.phone, placed && styles.phoneShown)}>
        <span className={styles.phoneNotch} />
        <span className={styles.phoneCheck}>
          <Icon name="check" size={20} />
        </span>
        <span className={styles.phoneTitle}>{example.placed}</span>
        <span className={styles.phoneCustomer}>{example.customer}</span>
        <span className={styles.phoneTotal}>{example.cart.total}</span>
      </div>
    </div>
  );
}
