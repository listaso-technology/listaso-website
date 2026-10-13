import { Container } from "@/components/layout/Container";
import { proof } from "@/content/home/en";
import styles from "./ProofStrip.module.css";

/** Key figures (approved start-version content, DEC-013). */
export function ProofStrip() {
  return (
    <section data-story-section aria-label={proof.label} className={styles.section}>
      <Container className={styles.container}>
        <div aria-hidden="true" className={styles.leadLine} />
        <ul data-reveal="group" className={styles.list}>
          {proof.items.map((item) => (
            <li data-reveal-item key={item.value} className={styles.item}>
              <span className={styles.value}>{item.value}</span>
              <span className={styles.label}>{item.label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
