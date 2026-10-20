import { Container } from "@/components/layout/Container";
import { SnapCarousel } from "@/components/ui/SnapCarousel";
import { proof } from "@/content/home/en";
import { cx } from "@/lib/utils/cx";
import proofCards from "../ProofCards.module.css";
import { proofTone } from "../proofTones";
import { ProofCounter } from "./ProofCounter";
import styles from "./ProofStrip.module.css";

/**
 * Key figures (approved start-version content, DEC-013). A swipeable row of
 * tinted cards on small screens; one framed composition with shared dividers
 * from 1024px.
 */
export function ProofStrip() {
  return (
    <section data-story-section aria-label={proof.label} className={styles.section}>
      <Container className={styles.container}>
        <div className={styles.frame}>
          <SnapCarousel label={proof.label} variant="stats">
            {proof.items.map((item, index) => (
              <article
                data-reveal-item
                data-tone={proofTone(index)}
                key={item.value}
                className={cx(proofCards.card, styles.item)}
              >
                <span aria-hidden="true" className={styles.index}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <ProofCounter className={styles.value} value={item.value} />
                <span className={cx(proofCards.label, styles.label)}>{item.label}</span>
              </article>
            ))}
          </SnapCarousel>
        </div>
      </Container>
    </section>
  );
}
