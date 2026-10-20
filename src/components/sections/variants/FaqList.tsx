import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import type { SectionCopy } from "@/content/products/types";
import { ProductSection } from "../product/ProductSection";
import { DossierHeader } from "./DossierHeader";

type FaqListProps = {
  id: string;
  copy: SectionCopy;
  items: readonly { question: string; answer: string }[];
  tone?: "page" | "alt";
};

/**
 * Two-column FAQ (Good Fella and ddark.dev): sticky header on the left,
 * native disclosures on the right (no JavaScript), questions in uppercase.
 */
export function FaqList({ id, copy, items, tone }: FaqListProps) {
  return (
    <ProductSection labelledBy={id} tone={tone}>
      <Container width="wide" className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <DossierHeader id={id} eyebrow={copy.eyebrow} title={copy.title} className="lg:sticky lg:top-28 lg:h-fit" />
        <div data-reveal="group" className="flex flex-col border-t-2 border-fg-heading">
          {items.map((item) => (
            <details data-reveal-item key={item.question} className="group border-b border-line-subtle">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 marker:hidden [&::-webkit-details-marker]:hidden">
                <span className="text-body font-bold tracking-wide text-fg-heading uppercase">{item.question}</span>
                <span
                  aria-hidden="true"
                  className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line-subtle text-icon-accent transition-transform duration-(--listaso-duration-standard) group-open:rotate-45"
                >
                  <Icon name="plus" size={20} />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 text-body-lg text-fg-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </ProductSection>
  );
}
