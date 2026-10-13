/**
 * B2B online store (/b2b-ecommerce/). Source: start-version/source/build/
 * pages.py, product_page("b2b-ecommerce"). The storefront is illustrative and
 * reuses the Homepage example products (src/content/home/en.ts).
 */
import { hero as homeHero } from "@/content/home/en";
import type { Feature, FeatureSection, ProductHeroContent, ProductMetadata } from "./types";

export const metadata: ProductMetadata = {
  path: "/b2b-ecommerce/",
  title: "B2B Online Store for Distributors | Listaso",
  description:
    "Let your customers order 24/7 from the web or their phone, with their own catalog, prices and promotions. Easy reorders and invoice payments by card.",
};

export const hero: ProductHeroContent = {
  breadcrumb: "B2B online store",
  eyebrow: "B2B online store",
  title: { emphasis: "Take orders", rest: "even while you sleep" },
  lead: "Your customers see their own catalog and prices, repeat past orders and pay their invoices online, from a computer or their phone.",
  plan: "Professional includes 40 customer logins. Enterprise 360: unlimited.",
};

/** Illustrative storefront: the customer's own catalog and prices. */
export const storefrontExample = {
  label: "Example of a distributor's B2B online store showing one customer's catalog, prices and a quick reorder",
  store: "Your store",
  customer: homeHero.example.order.customer,
  search: "Search products",
  /** Unit prices from the Homepage example lines. */
  products: [
    { name: homeHero.example.order.lines[0].product, price: "$7.20" },
    { name: homeHero.example.order.lines[1].product, price: "$17.99" },
    { name: homeHero.example.order.lines[2].product, price: "$6.99" },
    { name: homeHero.example.order.lines[3].product, price: "$9.99" },
  ],
  priceLabel: "Your price",
  reorder: "Repeat last order",
  cart: { label: "Cart", total: homeHero.example.order.total },
  placed: "Order placed online",
} as const;

export const features: FeatureSection = {
  eyebrow: "Features",
  title: { emphasis: "An online store", rest: "your customers will actually use" },
  items: [
    { icon: "cart", title: "Easy ordering", text: "As simple as shopping online, on any device." },
    { icon: "user", title: "Made for each customer", text: "Their own catalog, prices and discounts." },
    { icon: "chart", title: "Live insights", text: "See what's selling online and adjust your strategy." },
    { icon: "edit", title: "Your brand", text: "Use your colors and logo." },
    { icon: "search", title: "Fast search", text: "Search and filters to find products quickly." },
    { icon: "reorder", title: "Quick reorders", text: "Customers repeat past orders in a couple of taps." },
    { icon: "promotion", title: "Targeted promotions", text: "Discounts, bundles and special offers." },
    { icon: "payments", title: "Invoice payments", text: "Customers review their bills and pay one or many by card, in full or in part." },
    { icon: "store", title: "Web and mobile", text: "Online store plus iOS and Android apps that also work offline." },
  ] satisfies readonly Feature[],
};

/**
 * Three features get a larger spotlight; the grid shows the other six.
 * Titles index into `features.items`.
 */
export const spotlightTitles = ["Made for each customer", "Quick reorders", "Invoice payments"] as const;

export const related = ["pre-sales", "back-office", "direct-sales"] as const;
