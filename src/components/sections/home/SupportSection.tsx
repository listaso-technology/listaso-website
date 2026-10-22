import { Icon, type IconName } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { support } from "@/content/home/en";
import { SectionHeader } from "../SectionHeader";
import { Stars } from "./Stars";
import { SupportTriage } from "./SupportTriage";
import styles from "./SupportSection.module.css";

/**
 * Published support response times, hours and support proof.
 *
 * Reading order: header, then the response console (SupportTriage: all five
 * levels with their first-response times, most urgent first, plus a gauge for
 * the selected one), then the aside with ratings, the review and hours.
 */

const hourIcons: IconName[] = ["calendar", "warning", "support"];

export function SupportSection() {
  return (
    <section aria-labelledby="support-title" data-story-section className={styles.section}>
      <Container className={styles.layout}>
        <SectionHeader
          id="support-title"
          eyebrow={support.eyebrow}
          title={support.title}
          lead={support.lead}
          className={styles.header}
        />

        {/* 1. Response console: the main reading path. */}
        <div data-reveal="fade" className={styles.console}>
          <SupportTriage rows={support.table.rows} columns={support.table.columns} />
        </div>

        {/* 2. Aside: proof first, then when and how to reach the team. */}
        <div data-reveal="group" className={styles.aside}>
          <div data-reveal-item className={styles.proof}>
            <ul className={styles.scores}>
              {support.scores.map((score) => (
                <li key={score.label} className={styles.score}>
                  <span className={styles.scoreValue}>{score.score}</span>
                  <Stars />
                  <span className={styles.scoreLabel}>{score.label}</span>
                </li>
              ))}
            </ul>
            <figure className={styles.quote}>
              <blockquote>
                <p>{support.quote.text}</p>
              </blockquote>
              <figcaption>{support.quote.cite}</figcaption>
            </figure>
          </div>

          <ul data-reveal-item className={styles.hours}>
            {support.hours.map((item, index) => (
              <li key={item.label} className={styles.hour}>
                <span className={styles.hourIcon}>
                  <Icon name={hourIcons[index % hourIcons.length]} size={20} />
                </span>
                <span>
                  <strong className={styles.hourLabel}>{item.label}</strong>{" "}
                  <span className={styles.hourValue}>{item.value}</span>
                </span>
              </li>
            ))}
          </ul>

          <div data-reveal-item>
            <Button href={support.cta.href} variant="secondary" className="w-full sm:w-fit lg:w-full">
              {support.cta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
