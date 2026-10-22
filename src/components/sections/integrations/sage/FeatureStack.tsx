import type { CSSProperties } from "react";
import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import type { FeatureSection } from "@/content/products/types";
import { SectionHeader } from "../../SectionHeader";
import { ProductSection } from "../../product/ProductSection";
import { FeatureArt } from "../../variants/FeatureArt";
import styles from "./FeatureStack.module.css";

/**
 * Sage 100 features as a stack: on wide screens the header stays in a
 * sticky column while each feature card sticks a little lower than the one
 * before, so they pile up as the page scrolls (CSS sticky only, driven by
 * the normal vertical scroll). Each card has its number, icon, title, text
 * and a wordless illustration. Narrow screens: a plain list of cards.
 */
export function FeatureStack({ id, section }: { id: string; section: FeatureSection }) {
  const count = section.items.length;

  return (
    <ProductSection labelledBy={id} tone="alt">
      <Container width="wide" className={styles.layout}>
        <div className={styles.aside}>
          <SectionHeader id={id} eyebrow={section.eyebrow} title={section.title} lead={section.lead} />
        </div>
        <ol className={styles.stack} style={{ "--count": count } as CSSProperties}>
          {section.items.map((item, index) => (
            <li key={item.title} className={styles.item} style={{ "--i": index } as CSSProperties}>
              <article className={styles.card}>
                <div className={styles.copy}>
                  <span aria-hidden="true" className={styles.top}>
                    <span className={styles.icon}>
                      <Icon name={item.icon} size={24} />
                    </span>
                    <span className={styles.number}>
                      {String(index + 1).padStart(2, "0")}
                      <span className={styles.total}> / {String(count).padStart(2, "0")}</span>
                    </span>
                  </span>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.text}>{item.text}</p>
                </div>
                <div className={styles.art}>
                  <FeatureArt icon={item.icon} />
                </div>
              </article>
            </li>
          ))}
        </ol>
      </Container>
    </ProductSection>
  );
}
