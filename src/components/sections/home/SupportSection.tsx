import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { support } from "@/content/home/en";
import { SectionHeader } from "../SectionHeader";
import { Stars } from "./Stars";

/** Published support response times, hours and support proof. */
export function SupportSection() {
  return (
    <section aria-labelledby="support-title" data-story-section className="border-y border-line-subtle bg-surface-alt py-16 lg:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeader id="support-title" eyebrow={support.eyebrow} title={support.title} lead={support.lead} />

        <div data-reveal="group" className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div data-reveal-item className="flex flex-col gap-6">
            <table aria-labelledby="support-title" className="w-full border-collapse overflow-hidden rounded-md bg-surface-raised text-left">
              <thead>
                <tr className="border-b border-line-subtle">
                  {support.table.columns.map((column, index) => (
                    <th
                      key={column}
                      scope="col"
                      className={`p-4 text-small font-semibold text-fg-heading ${index === 1 ? "text-right" : ""}`}
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line-subtle">
                {support.table.rows.map((row) => (
                  <tr key={row.level}>
                    <th scope="row" className="p-4 text-left align-top font-normal">
                      <span className="block text-body font-semibold text-fg-default">{row.level}</span>
                      <span className="block text-small text-fg-muted">{row.detail}</span>
                    </th>
                    <td className="p-4 text-right align-top text-body font-bold whitespace-nowrap text-fg-heading">
                      {row.response}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

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
