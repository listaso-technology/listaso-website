import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { quickBooksCertified, type SystemQuote } from "@/content/integrations/systems";
import { SectionHeader } from "../SectionHeader";
import { Stars } from "../home/Stars";
import { ProductSection } from "../product/ProductSection";

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

/**
 * Approved customer review that mentions the integration. A plain block, not
 * a landmark: it has no heading of its own.
 */
export function SystemQuoteBlock({ quote }: { quote: SystemQuote }) {
  return (
    <div data-story-section className="py-16 lg:py-24">
      <Container>
        <div className="max-w-4xl">
          <QuoteCard quote={quote} />
        </div>
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
