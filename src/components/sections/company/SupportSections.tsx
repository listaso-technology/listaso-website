import { Container } from "@/components/layout/Container";
import { reach, responseTimes, urgent, voices } from "@/content/company/support";
import { cx } from "@/lib/utils/cx";
import { Stars } from "../home/Stars";
import { ProductSection } from "../product/ProductSection";
import { Chronology } from "../variants/Chronology";
import { DossierHeader } from "../variants/DossierHeader";
import { NoteGrid } from "../variants/NoteGrid";
import dossier from "../variants/dossier.module.css";

/**
 * Response times as a ruled table: problem type with its description, and
 * the first-response target in brackets. Hours sit in a dossier box.
 */
export function SupportTimes() {
  return (
    <ProductSection labelledBy="times-title" tone="alt">
      <Container width="wide" className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-10 lg:col-span-5">
          <DossierHeader id="times-title" eyebrow={responseTimes.eyebrow} title={responseTimes.title} />
          <dl data-reveal="group" className="border-t-2 border-fg-heading">
            {responseTimes.hours.map((row) => (
              <div data-reveal-item key={row.label} className="flex flex-col gap-1 border-b border-line-subtle py-4">
                <dt className="text-small font-bold tracking-widest text-fg-heading uppercase">{row.label.replace(/:$/, "")}</dt>
                <dd className="text-body text-fg-muted">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div data-reveal="fade" className="lg:col-span-7">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              {responseTimes.title.emphasis} {responseTimes.title.rest}
            </caption>
            <thead>
              <tr className="border-b-2 border-fg-heading">
                {responseTimes.columns.map((column, index) => (
                  <th
                    key={column}
                    scope="col"
                    className={cx("py-3 text-small font-bold tracking-widest text-fg-muted uppercase", index === 1 && "text-right")}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {responseTimes.rows.map((row, index) => (
                <tr key={row.level} className={cx("border-b border-line-subtle", index === 0 && "border-l-2 border-l-action-primary")}>
                  <th scope="row" className={cx("py-6 pr-6 align-top font-normal", index === 0 ? "pl-4" : "pl-0")}>
                    <span className="block text-h4 font-bold text-fg-heading uppercase">{row.level}</span>
                    <span className="mt-2 block text-body text-fg-muted">{row.detail}</span>
                  </th>
                  <td className="py-6 text-right align-top">
                    <span className={cx(dossier.bracket, "text-body font-bold whitespace-nowrap text-fg-accent")}>{row.response}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </ProductSection>
  );
}

/** "If you can't sell, we drop everything": the four steps as a chronology. */
export function SupportUrgent() {
  return (
    <ProductSection labelledBy="urgent-title">
      <Container width="wide" className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <DossierHeader
          id="urgent-title"
          eyebrow={urgent.eyebrow}
          title={urgent.title}
          lead={urgent.lead}
          className="lg:sticky lg:top-28 lg:col-span-5 lg:h-fit"
        />
        <div className="lg:col-span-7">
          <Chronology
            items={urgent.steps.map((step, index) => ({ ...step, meta: String(index + 1).padStart(2, "0") }))}
            highlight={1}
          />
        </div>
      </Container>
    </ProductSection>
  );
}

/** Scores and customer quotes in a ruled note grid. */
export function SupportVoices() {
  return (
    <ProductSection labelledBy="voices-title" tone="alt">
      <Container width="wide" className="flex flex-col gap-12">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <DossierHeader id="voices-title" eyebrow={voices.eyebrow} title={voices.title} />
          <ul data-reveal="group" className="flex flex-wrap gap-x-10 gap-y-6">
            {reach.scores.map((item) => (
              <li data-reveal-item key={item.label} className="flex flex-col gap-2">
                <span className="text-display leading-none font-bold text-fg-heading">{item.score}</span>
                <Stars />
                <span className="text-small font-semibold tracking-widest text-fg-muted uppercase">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <NoteGrid quotes notes={voices.quotes.map((quote) => ({ title: quote.name, subtitle: quote.source, text: quote.quote }))} />
      </Container>
    </ProductSection>
  );
}
