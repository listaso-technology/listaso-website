import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "../../SectionHeader";
import { ProductSection } from "../ProductSection";
import type { FeatureSection } from "@/content/products/types";
import type { featureCategories } from "@/content/products/direct-sales";

export function FeatureCategories({ section, categories }: { section: FeatureSection; categories: typeof featureCategories }) {
  return (
    <ProductSection labelledBy="features-title" tone="alt">
      <Container className="flex flex-col gap-10">
        <SectionHeader id="features-title" eyebrow={section.eyebrow} title={section.title} lead={section.lead} />
        <div data-reveal="group" className="grid gap-4 lg:grid-cols-3">
          {categories.map((category, index) => (
            <details data-reveal-item key={category.title} open={index === 0} className="group rounded-xl border border-line-subtle bg-surface-page p-5 shadow-e1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md text-fg-heading focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg-accent">
                <h3 className="text-h4 font-semibold">{category.title}</h3>
                <Icon name="arrow-right" size={20} className="shrink-0 transition-transform group-open:rotate-90" />
              </summary>
              <ul className="mt-5 grid gap-3 border-t border-line-subtle pt-5">
                {category.items.map((item) => (
                  <li key={item.title} className="rounded-lg bg-surface-alt p-4">
                    <Icon name={item.icon} size={20} className="mb-3 text-icon-accent" />
                    <h4 className="text-body font-bold text-fg-heading">{item.title}</h4>
                    <p className="mt-2 text-small text-fg-muted">{item.text}</p>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </Container>
    </ProductSection>
  );
}
