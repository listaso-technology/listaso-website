import type { ReactNode } from "react";
import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { customers } from "@/content/home/en";
import { quickBooksCertified, type SystemQuote } from "@/content/integrations/systems";
import { SectionHeader } from "../SectionHeader";
import { Stars } from "../home/Stars";
import { ProductSection } from "../product/ProductSection";
import quoteStyles from "./SystemQuote.module.css";

const NEW_TAB = "(opens in a new tab)";

function QuoteCard({ quote, rating }: { quote: SystemQuote; rating?: { score: string; label: string } }) {
  return (
    <Card as="div" data-reveal="fade" className="flex flex-col gap-6 p-6 lg:p-8">
      {rating ? (
        <p className="flex items-center gap-2 text-small text-fg-default">
          <Stars />
          <strong className="font-bold">{rating.score}</strong>
          {rating.label}
        </p>
      ) : null}
      <figure className="flex flex-col gap-4">
        <blockquote className="text-h4 font-semibold text-fg-heading">{quote.text}</blockquote>
        <figcaption className="text-small text-fg-muted">{quote.cite}</figcaption>
      </figure>
    </Card>
  );
}

/** QuickBooks: certified app listings, App Store rating and a review. */
export function QuickBooksCertified() {
  const copy = quickBooksCertified;

  return (
    <ProductSection labelledBy="certified-title">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHeader id="certified-title" eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead} />
          <div data-reveal="fade" className="flex flex-wrap gap-4">
            {copy.listings.map((listing) => (
              <Button
                key={listing.href}
                href={listing.href}
                variant="secondary"
                icon="external-link"
                target="_blank"
                rel="noopener noreferrer"
                data-analytics-event="external_appstore_click"
                data-analytics-label={listing.label}
              >
                {listing.label}
                <span className="sr-only">{NEW_TAB}</span>
              </Button>
            ))}
          </div>
        </div>
        <QuoteCard quote={copy.quote} rating={copy.rating} />
      </Container>
    </ProductSection>
  );
}

/** Splits "Name · Source" into its two parts. */
function splitCite(cite: string) {
  const [name, ...rest] = cite.split(" · ");
  return { name, source: rest.join(" · ") };
}

/** Wraps the first mention of `highlight` in the quote with a brand mark. */
function highlightQuote(text: string, highlight?: string): ReactNode {
  if (!highlight) return text;
  const index = text.indexOf(highlight);
  if (index < 0) return text;
  return (
    <>
      {text.slice(0, index)}
      <mark className={quoteStyles.mark}>{highlight}</mark>
      {text.slice(index + highlight.length)}
    </>
  );
}

/**
 * Customer review on a brand-band card: gradient quote mark, the approved
 * five-star line, the quote with the system name highlighted and the author
 * with initials. Copy comes from the Homepage testimonials (DEC-013).
 */
export function SystemQuoteBlock({ quote, highlight }: { quote: SystemQuote; highlight?: string }) {
  const { name, source } = splitCite(quote.cite);
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div data-story-section className="py-16 lg:py-24">
      <Container>
        <figure data-reveal="fade" data-surface="band" className={quoteStyles.card}>
          <span aria-hidden="true" className={quoteStyles.glyph}>“</span>
          <div className={quoteStyles.top}>
            <p className={quoteStyles.eyebrow}>{customers.eyebrow}</p>
            <p className={quoteStyles.rating}>
              <Stars label={customers.starsLabel} />
            </p>
          </div>
          <blockquote className={quoteStyles.quote}>{highlightQuote(quote.text, highlight)}</blockquote>
          <figcaption className={quoteStyles.author}>
            <span aria-hidden="true" className={quoteStyles.avatar}>{initials}</span>
            <span className={quoteStyles.who}>
              <span className={quoteStyles.name}>{name}</span>
              {source ? <span className={quoteStyles.source}>{source}</span> : null}
            </span>
          </figcaption>
        </figure>
      </Container>
    </div>
  );
}

/** Glass chip with the QuickBooks App Store rating, for the hero. */
export function QuickBooksRatingChip() {
  const { rating } = quickBooksCertified;

  return (
    <GlassPanel
      aria-hidden="true"
      className="absolute bottom-0 left-4 flex max-w-[calc(100%-2rem)] flex-wrap items-center gap-x-2 gap-y-1 rounded-lg px-4 py-3 sm:left-8 sm:rounded-full sm:px-5 lg:-left-12"
    >
      <Stars />
      <span className="text-small font-bold text-fg-heading">{rating.score}</span>
      <span className="text-small text-fg-default">{rating.label}</span>
      <Icon name="success" size={16} className="text-icon-accent" />
    </GlassPanel>
  );
}
