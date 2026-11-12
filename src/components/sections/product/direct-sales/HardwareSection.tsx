import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { models } from "@/content/integrations/printers";
import type { hardware } from "@/content/products/direct-sales";
import { ProductSection } from "../ProductSection";
import styles from "./HardwareSection.module.css";

/** Brands from the compatibility table on /printers-and-scanners/ (names as text, DEC-015). */
const brands = [...new Set(models.rows.map((row) => row.brand))];

/**
 * Printers and scanners on a brand-band card: copy, compatible brands and a
 * decorative illustration of a mobile printer feeding an invoice while a
 * scanner reads its barcode. The illustration plays once after the card
 * reveals (finite) and is static with reduced motion or without JavaScript.
 */
export function HardwareSection({ content }: { content: typeof hardware }) {
  return (
    <ProductSection labelledBy="hardware-title" tone="alt">
      <Container>
        <div data-reveal="fade" data-surface="band" className={styles.card}>
          <span aria-hidden="true" className={styles.grid} />
          <div data-reveal="group" className={styles.copy}>
            <span data-reveal-item aria-hidden="true" className={styles.badge}>
              <Icon name="print" size={24} />
            </span>
            <h2 data-reveal-item id="hardware-title" className={styles.title}>{content.title}</h2>
            <p data-reveal-item className={styles.text}>{content.text}</p>
            <ul data-reveal-item className={styles.brands} aria-label="Compatible brands">
              {brands.map((brand) => (
                <li key={brand}>{brand}</li>
              ))}
            </ul>
            <a data-reveal-item href={content.link.href} className={styles.link}>
              {content.link.label}
              <Icon name="arrow-right" size={20} />
            </a>
          </div>

          <div data-reveal="media" className={styles.stage} aria-hidden="true">
            <svg viewBox="0 0 360 300" className={styles.art} focusable="false">
              <defs>
                <clipPath id="hardware-paper-clip">
                  <rect x="0" y="0" width="360" height="152" />
                </clipPath>
                <linearGradient id="hardware-beam" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0" stopColor="#ff3a6a" stopOpacity="0.55" />
                  <stop offset="1" stopColor="#ff3a6a" stopOpacity="0" />
                </linearGradient>
              </defs>

              <circle className={styles.halo} cx="170" cy="160" r="128" />

              <g clipPath="url(#hardware-paper-clip)">
                <g className={styles.paper}>
                  <rect x="95" y="36" width="100" height="124" rx="3" fill="#fff" />
                  <rect x="107" y="50" width="52" height="6" rx="3" fill="#00375b" />
                  <rect x="107" y="63" width="76" height="4" rx="2" fill="#c3cfd9" />
                  <rect x="107" y="72" width="64" height="4" rx="2" fill="#c3cfd9" />
                  <rect x="107" y="81" width="70" height="4" rx="2" fill="#c3cfd9" />
                  <g fill="#0b1b2b">
                    <rect x="108" y="98" width="3" height="28" />
                    <rect x="113" y="98" width="1.5" height="28" />
                    <rect x="117" y="98" width="4" height="28" />
                    <rect x="124" y="98" width="1.5" height="28" />
                    <rect x="128" y="98" width="2.5" height="28" />
                    <rect x="133" y="98" width="4" height="28" />
                    <rect x="140" y="98" width="1.5" height="28" />
                    <rect x="144" y="98" width="3" height="28" />
                    <rect x="150" y="98" width="1.5" height="28" />
                    <rect x="154" y="98" width="4" height="28" />
                    <rect x="161" y="98" width="2" height="28" />
                    <rect x="166" y="98" width="1.5" height="28" />
                    <rect x="170" y="98" width="3.5" height="28" />
                    <rect x="176" y="98" width="1.5" height="28" />
                    <rect x="180" y="98" width="3" height="28" />
                  </g>
                  <rect x="107" y="134" width="40" height="5" rx="2.5" fill="#00bda9" />
                </g>
              </g>

              <rect x="58" y="146" width="174" height="116" rx="24" fill="#0f3a5f" stroke="rgb(255 255 255 / 0.22)" />
              <rect x="82" y="146" width="126" height="10" rx="5" fill="#06192b" />
              <rect x="80" y="178" width="72" height="8" rx="4" fill="rgb(255 255 255 / 0.18)" />
              <rect x="80" y="194" width="48" height="8" rx="4" fill="rgb(255 255 255 / 0.12)" />
              <circle cx="202" cy="232" r="10" fill="#00bda9" />
              <circle className={styles.led} cx="84" cy="236" r="4" fill="#00bda9" />
              <circle cx="98" cy="236" r="4" fill="rgb(255 255 255 / 0.25)" />

              <g className={styles.scanner}>
                <polygon className={styles.beam} points="268,96 182,98 182,128" fill="url(#hardware-beam)" />
                <rect className={styles.laser} x="104" y="111" width="84" height="2" rx="1" fill="#ff3a6a" />
                <path d="M266 84 h44 a12 12 0 0 1 12 12 v18 a12 12 0 0 1 -12 12 h-14 l-8 52 a8 8 0 0 1 -8 7 h-6 a8 8 0 0 1 -8 -9 l6 -50 h-6 a12 12 0 0 1 -12 -12 v-18 a12 12 0 0 1 12 -12 z" fill="#e8eef3" stroke="rgb(0 0 0 / 0.15)" />
                <rect x="262" y="94" width="8" height="22" rx="3" fill="#ff3a6a" />
              </g>
            </svg>
          </div>
        </div>
      </Container>
    </ProductSection>
  );
}
