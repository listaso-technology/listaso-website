import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import type { FeatureSection, SectionCopy } from "@/content/products/types";
import { cx } from "@/lib/utils/cx";
import { ProductSection } from "../product/ProductSection";
import { SectionHeader } from "../SectionHeader";
import { TextRoll } from "./TextRoll";

type FeatureIndexProps = {
  id: string;
  section: FeatureSection;
  tone?: "page" | "alt";
};

/**
 * Features as an index of large numbered rows (Good Fella's case list). The
 * header stays beside the list on desktop.
 */
export function FeatureIndex({ id, section, tone }: FeatureIndexProps) {
  return (
    <ProductSection labelledBy={id} tone={tone}>
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeader
          id={id}
          eyebrow={section.eyebrow}
          title={section.title}
          lead={section.lead}
          className="lg:sticky lg:top-28 lg:h-fit"
        />
        <ol data-reveal="group" className="border-t border-line-subtle">
          {section.items.map((item, index) => (
            <li
              data-reveal-item
              data-roll-trigger
              key={item.title}
              className="group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-start gap-x-4 border-b border-line-subtle py-6 sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] sm:py-8"
            >
              <span aria-hidden="true" className="pt-1 text-small font-bold text-fg-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-h3 font-semibold text-fg-heading">
                  <TextRoll>{item.title}</TextRoll>
                </h3>
                <p className="max-w-xl text-body text-fg-muted">{item.text}</p>
              </div>
              <span className="flex size-12 items-center justify-center rounded-full border border-line-subtle text-icon-accent transition-[background-color,color] duration-(--listaso-duration-standard) group-hover:bg-fg-heading group-hover:text-surface-page">
                <Icon name={item.icon} size={20} />
              </span>
            </li>
          ))}
        </ol>
      </Container>
    </ProductSection>
  );
}

export type IndexLink = {
  href: string;
  title: string;
  text: string;
  tags?: readonly string[];
};

type LinkIndexProps = {
  id: string;
  copy: SectionCopy;
  items: readonly IndexLink[];
  analyticsEvent?: string;
  tone?: "page" | "alt";
};

/**
 * Index of links with bracket tags (Good Fella's "[MARKETING SITE] —
 * [SPORTS]"). Each row is one link named by its title.
 */
export function LinkIndex({ id, copy, items, analyticsEvent, tone }: LinkIndexProps) {
  return (
    <ProductSection labelledBy={id} tone={tone}>
      <Container width="wide" className="flex flex-col gap-12">
        <SectionHeader id={id} eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead} />
        <ul data-reveal="group" className="border-t border-line-subtle">
          {items.map((item, index) => (
            <li data-reveal-item key={item.href}>
              <a
                href={item.href}
                className={cx(
                  "group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-x-4 border-b border-line-subtle py-6",
                  "sm:grid-cols-[3.5rem_minmax(0,1.1fr)_minmax(0,1fr)_auto] sm:py-8",
                  "transition-colors duration-(--listaso-duration-standard) hover:bg-surface-alt",
                )}
                {...(analyticsEvent ? { "data-analytics-event": analyticsEvent, "data-analytics-label": item.title } : null)}
              >
                <span aria-hidden="true" className="text-small font-bold text-fg-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 text-h3 font-bold break-words text-fg-heading sm:text-h2">
                  <TextRoll>{item.title}</TextRoll>
                </span>
                <span className="col-start-2 flex flex-col gap-2 pt-2 sm:col-start-auto sm:pt-0">
                  <span className="text-body text-fg-muted">{item.text}</span>
                  {item.tags?.length ? (
                    <span className="text-small font-semibold tracking-wide text-fg-default uppercase">
                      {item.tags.map((tag) => `[${tag}]`).join(" — ")}
                    </span>
                  ) : null}
                </span>
                <span
                  aria-hidden="true"
                  className="col-start-3 row-start-1 flex size-12 items-center justify-center rounded-full border border-line-subtle text-fg-heading transition-[background-color,color,rotate] duration-(--listaso-duration-standard) group-hover:bg-fg-heading group-hover:text-surface-page motion-safe:group-hover:-rotate-45 sm:col-start-4"
                >
                  <Icon name="arrow-right" size={20} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </ProductSection>
  );
}
