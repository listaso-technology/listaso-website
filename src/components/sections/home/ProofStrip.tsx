import { Container } from "@/components/layout/Container";
import { SnapCarousel } from "@/components/ui/SnapCarousel";
import { proof } from "@/content/home/en";
import { ProofCounter } from "./ProofCounter";
import styles from "./ProofStrip.module.css";

/** Key figures (approved start-version content, DEC-013). */
export function ProofStrip() {
  return (
    <section data-story-section aria-label={proof.label} className={styles.section}>
      <Container className={styles.container}>
        <div aria-hidden="true" className={styles.leadLine} />
        <SnapCarousel label={proof.label} variant="stats">
          {proof.items.map((item) => (
            <article data-reveal-item key={item.value} className={styles.item}>
              <ProofCounter className={styles.value} value={item.value} />
              <span className={styles.label}>{item.label}</span>
            </article>
          ))}
        </SnapCarousel>
      </Container>
    </section>
  );
}
