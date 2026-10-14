import { Container } from "@/components/layout/Container";
import { productCatalog, relatedSection } from "@/content/products/shared";
import type { ProductSlug } from "@/content/products/types";
import { SectionHeader } from "../SectionHeader";
import { LinkCard } from "./LinkCard";
import { ProductSection } from "./ProductSection";

type RelatedProductsProps = {
  products: readonly ProductSlug[];
  tone?: "page" | "alt";
};

/** "Works together" cards linking to related products. */
export function RelatedProducts({ products, tone }: RelatedProductsProps) {
  return (
    <ProductSection labelledBy="related-title" tone={tone}>
      <Container className="flex flex-col gap-12">
        <SectionHeader id="related-title" eyebrow={relatedSection.eyebrow} title={relatedSection.title} />
        <ul data-reveal="group" className="grid gap-6 md:grid-cols-3">
          {products.map((slug) => {
            const product = productCatalog[slug];
            return (
              <li data-reveal-item key={slug} className="flex">
                <LinkCard
                  href={product.href}
                  title={product.name}
                  text={product.summary}
                  icon={product.icon}
                  linkLabel={relatedSection.linkLabel}
                  analyticsEvent="product_card_click"
                />
              </li>
            );
          })}
        </ul>
      </Container>
    </ProductSection>
  );
}
