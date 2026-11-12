import { FinalCta } from "@/components/sections/home/FinalCta";
import { HomeMotion } from "@/components/sections/home/HomeMotion";
import { ProductExplorer } from "@/components/sections/products/ProductExplorer";
import { ProductsConnection } from "@/components/sections/products/ProductsConnection";
import { productPreviews } from "@/components/sections/products/productPreviews";
import { ProductsHero } from "@/components/sections/products/ProductsHero";
import { metadata as content } from "@/content/products/hub";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(content);

export default function ProductsPage() {
  return (
    <>
      <ProductsHero />
      <ProductExplorer previews={productPreviews} />
      <ProductsConnection />
      <FinalCta />
      <HomeMotion />
    </>
  );
}
