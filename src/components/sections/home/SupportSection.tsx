import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SnapCarousel } from "@/components/ui/SnapCarousel";
import { support } from "@/content/home/en";
import { SectionHeader } from "../SectionHeader";
import { Stars } from "./Stars";
import styles from "./SupportSection.module.css";

/** Published support response times, hours and support proof. */
export function SupportSection() {
  return (
    <section aria-labelledby="support-title" data-story-section className="border-y border-line-subtle bg-surface-alt py-16 lg:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeader id="support-title" eyebrow={support.eyebrow} title={support.title} lead={support.lead} />

        <div data-reveal="group" className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div data-reveal-item className="min-w-0 flex flex-col gap-6">
            <SnapCarousel label={support.table.columns.join(": ")} variant="support">
              {support.table.rows.map((row, index) => (
                <article className={styles.responseCard} key={row.level}>
                  <div className={styles.cardIndex} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className="text-h3 font-bold text-fg-heading">{row.level}</h3>
                    <p className="text-body text-fg-muted">{row.detail}</p>
                    <dl className={styles.responseTime}>
                      <dt>{support.table.columns[1]}</dt>
                      <dd>{row.response}</dd>
                    </dl>
                  </div>
                </article>
              ))}
            </SnapCarousel>

            <ul className="flex flex-col gap-2 text-body text-fg-default">
              {support.hours.map((item) => (
                <li key={item.label}>
                  <strong className="font-semibold">{item.label}</strong> {item.value}
                </li>
              ))}
            </ul>

            <Button href={support.cta.href} variant="secondary" className="w-fit">
              {support.cta.label}
            </Button>
          </div>

          <div data-reveal-item className="flex flex-col gap-6">
            <Card as="div" className="flex flex-col gap-4">
              <figure className="flex flex-col gap-4">
                <blockquote className="text-body-lg text-fg-default">
                  <p>{support.quote.text}</p>
                </blockquote>
                <figcaption className="text-small text-fg-muted">{support.quote.cite}</figcaption>
              </figure>
            </Card>
            <ul className="grid grid-cols-2 gap-4">
              {support.scores.map((score) => (
                <li key={score.label} className="flex flex-col gap-2 rounded-md border border-line-subtle bg-surface-raised p-6">
                  <span className="text-h2 font-bold text-fg-heading">{score.score}</span>
                  <Stars />
                  <span className="text-small text-fg-muted">{score.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
