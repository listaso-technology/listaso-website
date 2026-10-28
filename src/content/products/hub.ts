/**
 * Products index. Product descriptions come from the approved product catalog.
 * Store destinations were checked against the Listaso, Inc. listings on
 * Apple App Store and Google Play on 27 October 2026.
 *
 * Media briefs describe replaceable frames. Design will provide final assets;
 * the page currently renders an accessible vector illustration in each frame.
 */
import type { ProductSlug } from "./types";

export const metadata = {
  path: "/products/",
  title: "Products for Distribution Operations | Listaso",
  description:
    "Explore Listaso products for field sales, inventory, delivery, B2B ordering, Back Office, forms, SAMI and custom development.",
} as const;

export const hero = {
  eyebrow: "Products",
  title: { emphasis: "From the first order", rest: "to the final delivery" },
  lead: "Explore the Listaso tools for your sales team, warehouse, drivers, customers and office.",
  explore: "Explore products",
  integrations: "See integrations",
} as const;

export const explorer = {
  eyebrow: "Explore Listaso",
  title: { emphasis: "Find the tools", rest: "for your operation" },
  lead: "Choose an area to see the products, then open a product page for the details.",
  productLink: "Explore product",
  storeLabel: "Official mobile apps",
  appStore: "App Store",
  googlePlay: "Google Play",
} as const;

export const productGroups = [
  { id: "sales", label: "Field sales", products: ["pre-sales", "direct-sales"] },
  { id: "operations", label: "Inventory & delivery", products: ["inventory", "delivery"] },
  { id: "customers", label: "Customer ordering", products: ["b2b-ecommerce"] },
  { id: "office", label: "Office & more", products: ["back-office", "forms", "sami", "custom-development"] },
] as const satisfies readonly { id: string; label: string; products: readonly ProductSlug[] }[];

export type StoreLink = {
  name: string;
  store: "apple" | "google";
  href: string;
};

export const productStoreLinks: Partial<Record<ProductSlug, readonly StoreLink[]>> = {
  "pre-sales": [
    { name: "Listaso Sales", store: "apple", href: "https://apps.apple.com/us/app/listaso-sales/id6739146401" },
    { name: "Listaso Sales", store: "google", href: "https://play.google.com/store/apps/details?id=com.listaso.ListasoSalesRenewed" },
    { name: "Listaso Sales Order & Catalog", store: "apple", href: "https://apps.apple.com/us/app/listaso-sales-order-catalog/id1065999275" },
    { name: "Listaso Sales Order & Catalog", store: "google", href: "https://play.google.com/store/apps/details?id=com.viasql.classic" },
  ],
  "direct-sales": [
    { name: "Listaso Van Sales", store: "apple", href: "https://apps.apple.com/us/app/listaso-van-sales/id1071930619" },
    { name: "Listaso Van Sales", store: "google", href: "https://play.google.com/store/apps/details?id=com.listaso.sales" },
  ],
  inventory: [
    { name: "Listaso Advanced Inventory", store: "google", href: "https://play.google.com/store/apps/details?id=com.listaso.wms.advance" },
  ],
  delivery: [
    { name: "Listaso Delivery", store: "google", href: "https://play.google.com/store/apps/details?id=com.listaso.delivery" },
  ],
  "b2b-ecommerce": [
    { name: "Listaso eCommerce", store: "apple", href: "https://apps.apple.com/us/app/listaso-ecommerce/id6615064938" },
    { name: "Listaso eCommerce", store: "google", href: "https://play.google.com/store/apps/details?id=com.listaso.ecommerce" },
    { name: "Listaso B2B Sales", store: "apple", href: "https://apps.apple.com/us/app/listaso-b2b-sales/id1272253789" },
  ],
};

export const additionalApp = {
  name: "Listaso Advanced",
  description: "Explore another official Listaso mobile app.",
  store: "apple",
  href: "https://apps.apple.com/us/app/listaso-advanced/id1625366159",
} as const satisfies StoreLink & { description: string };

export const mediaBriefs: Record<ProductSlug, string> = {
  "pre-sales": "Sales representative taking an order at a store; product screen visible and no customer or third-party branding.",
  "direct-sales": "Driver selling from a stocked truck, with product and invoice context.",
  inventory: "Warehouse worker scanning inventory, showing the workflow rather than a generic warehouse.",
  delivery: "Driver confirming a delivery at the customer location.",
  "b2b-ecommerce": "Customer placing an order in the B2B storefront on mobile.",
  "back-office": "Back Office dashboard or order management screen from the real product.",
  forms: "Store visit with a survey or photo capture screen from the real product.",
  sami: "SAMI conversation using approved illustrative business data.",
  "custom-development": "Approved project example or interface created for a specific workflow, without customer data.",
};

export const connection = {
  eyebrow: "Works with your systems",
  title: { emphasis: "Your products", rest: "and your accounting system" },
  lead: "See how Listaso connects with the accounting system you already use, and check the details for each supported system.",
  cta: "Explore integrations",
} as const;
