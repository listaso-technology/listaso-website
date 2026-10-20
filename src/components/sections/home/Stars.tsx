import styles from "./Stars.module.css";

/**
 * Five-star rating mark. Decorative by default (the score is written next to
 * it); pass `label` when the stars are the only statement of the rating.
 */
export function Stars({ label }: { label?: string }) {
  const className = `${styles.stars} text-status-warning`;
  return label ? (
    <span role="img" aria-label={label} className={className} />
  ) : (
    <span aria-hidden="true" className={className} />
  );
}
