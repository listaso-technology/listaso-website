import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { features, spotlightTitles } from "@/content/products/b2b-ecommerce";
import { SectionHeader } from "../../SectionHeader";
import { FeatureList } from "../FeatureGrid";
import { ProductSection } from "../ProductSection";

const spotlight = features.items.filter((item) =>
  (spotlightTitles as readonly string[]).includes(item.title),
);
const rest = features.items.filter((item) => !(spotlightTitles as readonly string[]).includes(item.title));

/**
 * Store features: the three customer-facing essentials get large cards; the
 * other six follow in the standard list. Same copy as the source grid.
 */
export function StoreFeatures() {
  return (
    <ProductSection labelledBy="features-title">
      <Container className="flex flex-col gap-12">
        <SectionHeader id="features-title" eyebrow={features.eyebrow} title={features.title} lead={features.lead} />
        <ul data-reveal="group" className="grid gap-6 md:grid-cols-3">
          {spotlight.map((item, index) => (
            <li
              data-reveal-item
              key={item.title}
              className="relative flex flex-col gap-4 overflow-hidden rounded-lg border border-line-subtle bg-surface-alt p-6 lg:p-8"
            >
              <span
                aria-hidden="true"
                className="absolute -top-2 right-4 text-display font-bold text-surface-soft"
              >
                {index + 1}
              </span>
              <span className="relative flex size-14 items-center justify-center rounded-full bg-fg-heading text-surface-page">
                <Icon name={item.icon} size={24} />
              </span>
              <h3 className="relative text-h3 font-semibold text-fg-heading">{item.title}</h3>
              <p className="relative text-body-lg text-fg-muted">{item.text}</p>
            </li>
          ))}
        </ul>
        <FeatureList items={rest} />
      </Container>
    </ProductSection>
  );
}
