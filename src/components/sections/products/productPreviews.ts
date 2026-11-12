/**
 * Products hub explorer previews, assembled on the server from existing
 * content only: each product page's hero headline and hero photo (the same
 * media registered for that page) and its first three capabilities. Nothing
 * here is new copy. SAMI has no photo; its preview reuses the first example
 * question from the SAMI page.
 */
import type { SignatureText } from "@/content/home/en";
import { magnificMedia } from "@/content/media/magnific";
import { preSalesMedia } from "@/content/media/pre-sales";
import { productMedia } from "@/content/media/products";
import { sectionMedia } from "@/content/media/sections";
import * as b2bEcommerce from "@/content/products/b2b-ecommerce";
import * as backOffice from "@/content/products/back-office";
import * as customDevelopment from "@/content/products/custom-development";
import * as delivery from "@/content/products/delivery";
import * as directSales from "@/content/products/direct-sales";
import * as forms from "@/content/products/forms";
import * as inventory from "@/content/products/inventory";
import * as preSales from "@/content/products/pre-sales";
import * as sami from "@/content/products/sami";
import type { Feature, ProductSlug } from "@/content/products/types";
import type { AnyPhoto } from "../variants/HeroParts";

export type ProductPreview = {
  headline: SignatureText;
  photo?: AnyPhoto;
  /** Example question shown in a chat scene when there is no photo. */
  question?: string;
  highlights: readonly Pick<Feature, "icon" | "title">[];
};

const top = (items: readonly Feature[]) => items.slice(0, 3).map(({ icon, title }) => ({ icon, title }));

export const productPreviews: Record<ProductSlug, ProductPreview> = {
  "pre-sales": { headline: preSales.hero.title, photo: preSalesMedia.hero, highlights: top(preSales.features.items) },
  "direct-sales": { headline: directSales.hero.title, photo: sectionMedia.truckMountain, highlights: top(directSales.features.items) },
  inventory: { headline: inventory.hero.title, photo: productMedia.inventoryFloor, highlights: top(inventory.features.items) },
  delivery: { headline: delivery.hero.title, photo: productMedia.deliveryHandTruck, highlights: top(delivery.features.items) },
  "back-office": { headline: backOffice.hero.title, photo: sectionMedia.officeCharts, highlights: top(backOffice.features.items) },
  "b2b-ecommerce": { headline: b2bEcommerce.hero.title, photo: magnificMedia.designerLaptop, highlights: top(b2bEcommerce.features.items) },
  forms: { headline: forms.hero.title, photo: sectionMedia.tabletWarehouse, highlights: top(forms.ideas.items) },
  sami: { headline: sami.hero.title, question: sami.examples.questions[0]?.question, highlights: top(sami.included.items) },
  "custom-development": { headline: customDevelopment.hero.title, photo: sectionMedia.codeLaptop, highlights: top(customDevelopment.features.items) },
};
