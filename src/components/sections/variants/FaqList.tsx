import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import type { SectionCopy } from "@/content/products/types";
import { ProductSection } from "../product/ProductSection";
import { SamiBrandText } from "../product/sami/SamiBrandText";
import { DossierHeader } from "./DossierHeader";
import styles from "./FaqList.module.css";

type FaqListProps = {
  id: string;
  copy: SectionCopy;
  items: readonly { question: string; answer: string }[];
  tone?: "page" | "alt";
};

/**
 * Two-column FAQ (Good Fella and ddark.dev): sticky header on the left,
 * native disclosures on the right (no JavaScript), numbered questions in
 * uppercase. Open answers slide down where the browser can animate
 * `<details>`; the open item gets an accent rule and a filled toggle.
 */
export function FaqList({ id, copy, items, tone }: FaqListProps) {
  return (
    <ProductSection labelledBy={id} tone={tone}>
      <Container width="wide" className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <DossierHeader id={id} eyebrow={copy.eyebrow} title={copy.title} className="lg:sticky lg:top-28 lg:h-fit" />
        <div data-reveal="group" className="flex flex-col border-t-2 border-fg-heading">
          {items.map((item, index) => (
            <div data-reveal-item key={item.question}>
              <details className={styles.item}>
                <summary className={styles.summary}>
                  <span aria-hidden="true" className={styles.number}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.question}><SamiBrandText text={item.question} /></span>
                  <span aria-hidden="true" className={styles.toggle}>
                    <Icon name="plus" size={20} />
                  </span>
                </summary>
                <p className={styles.answer}><SamiBrandText text={item.answer} /></p>
              </details>
            </div>
          ))}
        </div>
      </Container>
    </ProductSection>
  );
}
