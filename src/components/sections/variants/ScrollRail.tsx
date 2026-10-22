import { Container } from "@/components/layout/Container";
import type { SectionCopy } from "@/content/products/types";
import { ProductSection } from "../product/ProductSection";
import { LinkCard } from "../product/LinkCard";
import { SectionHeader } from "../SectionHeader";
import type { IconName } from "@/components/icons/Icon";

export type RailCard = { href: string; title: string; text: string; icon?: IconName };

type ScrollRailProps = {
  id: string;
  copy: SectionCopy;
  cards: readonly RailCard[];
  linkLabel: string;
  analyticsEvent?: string;
  tone?: "page" | "alt";
};

/**
 * Horizontal card rail (Stavros Symeonidis' service carousel) with native
 * scroll snapping: swipe on touch, Shift+wheel or keyboard on desktop. The
 * scroller is focusable and named so keyboard users can scroll it.
 */
export function ScrollRail({ id, copy, cards, linkLabel, analyticsEvent, tone }: ScrollRailProps) {
  return (
    <ProductSection labelledBy={id} tone={tone} className="overflow-hidden">
      <Container className="flex flex-col gap-12">
        <SectionHeader id={id} eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead} />
      </Container>
      <div
        role="region"
        aria-labelledby={id}
        tabIndex={0}
        className="mt-10 snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-px-4 pt-2 pb-6 [scrollbar-width:thin] md:scroll-px-6 lg:scroll-px-8"
      >
        <ul data-reveal="group" className="flex w-max gap-6 px-4 md:px-6 lg:px-[max(2rem,calc((100vw-75rem)/2+2rem))]">
          {cards.map((card) => (
            <li data-reveal-item key={card.href} className="flex w-[min(80vw,22rem)] snap-start">
              <LinkCard
                href={card.href}
                title={card.title}
                text={card.text}
                icon={card.icon}
                linkLabel={linkLabel}
                analyticsEvent={analyticsEvent}
                className="min-h-64"
              />
            </li>
          ))}
        </ul>
      </div>
    </ProductSection>
  );
}
