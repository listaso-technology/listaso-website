import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import type { Feature, FeatureSection } from "@/content/products/types";
import { cx } from "@/lib/utils/cx";
import { SectionHeader } from "../SectionHeader";
import { ProductSection } from "./ProductSection";

type FeatureListProps = {
  items: readonly Feature[];
  columns?: 3 | 4;
  className?: string;
};

/** Spec-sheet list: icon, title and text separated by a top rule. */
export function FeatureList({ items, columns = 3, className }: FeatureListProps) {
  return (
    <ul
      data-reveal="group"
      className={cx(
        "grid gap-x-8 gap-y-12 sm:grid-cols-2",
        columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4",
        className,
      )}
    >
      {items.map((item) => (
        <li data-reveal-item key={item.title} className="flex flex-col gap-3 border-t border-line-subtle pt-6">
          <span className="flex size-12 items-center justify-center rounded-md bg-surface-soft text-icon-accent">
            <Icon name={item.icon} size={24} />
          </span>
          <h3 className="text-h4 font-semibold text-fg-heading">{item.title}</h3>
          <p className="text-body text-fg-muted">{item.text}</p>
        </li>
      ))}
    </ul>
  );
}

type FeatureGridProps = {
  id: string;
  section: FeatureSection;
  tone?: "page" | "alt";
  columns?: 3 | 4;
};

/** "Features" section of a product page. */
export function FeatureGrid({ id, section, tone, columns }: FeatureGridProps) {
  return (
    <ProductSection labelledBy={id} tone={tone}>
      <Container className="flex flex-col gap-12">
        <SectionHeader id={id} eyebrow={section.eyebrow} title={section.title} lead={section.lead} />
        <FeatureList items={section.items} columns={columns} />
      </Container>
    </ProductSection>
  );
}
