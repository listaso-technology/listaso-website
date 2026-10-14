import { productCatalog, relatedSection } from "@/content/products/shared";
import type { ProductSlug } from "@/content/products/types";
import { ScrollRail } from "../variants/ScrollRail";

/** "Works together" as a horizontal rail (variant of `RelatedProducts`). */
export function RelatedRail({ products, tone }: { products: readonly ProductSlug[]; tone?: "page" | "alt" }) {
  const cards = products.map((slug) => {
    const product = productCatalog[slug];
    return { href: product.href, title: product.name, text: product.summary, icon: product.icon };
  });

  return (
    <ScrollRail
      id="related-title"
      copy={relatedSection}
      cards={cards}
      linkLabel={relatedSection.linkLabel}
      analyticsEvent="product_card_click"
      tone={tone}
    />
  );
}
