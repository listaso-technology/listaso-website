/**
 * Pre-sales (/pre-sales/). Source: start-version/source/build/pages.py,
 * product_page("pre-sales"). The order example reuses the illustrative data
 * approved for the Homepage hero (src/content/home/en.ts).
 */
import { hero as homeHero } from "@/content/home/en";
import type { FeatureSection, ProductHeroContent, ProductMetadata, SectionCopy, Step } from "./types";

export const metadata: ProductMetadata = {
  path: "/pre-sales/",
  title: "Mobile Order Taking App for Sales Reps | Listaso",
  description:
    "Take orders in the field with a photo catalog, each customer's prices, promotions and purchase history. Works offline and syncs with QuickBooks, Sage and more.",
};

export const hero: ProductHeroContent = {
  breadcrumb: "Pre-sales",
  eyebrow: "Pre-sales app",
  title: { emphasis: "Take orders faster", rest: "with every customer's prices in hand" },
  lead: "Your reps visit the store, open the catalog and send the order in minutes. The office and the warehouse get it right away, with no paper and no typing it in again.",
  plan: "Included in every plan, from Growth at $59 per user a month",
};

/** Illustrative order shown over the hero photo. */
export const orderExample = {
  label: "Example of an order built in the Listaso sales app, with the customer's prices and a promotion applied",
  title: "New order",
  customer: homeHero.example.order.customer,
  lines: homeHero.example.order.lines.slice(0, 3),
  totalLabel: homeHero.example.order.totalLabel,
  total: homeHero.example.order.total,
  status: "The office and warehouse see it at once",
  offline: "Works without internet",
} as const;

export const features: FeatureSection = {
  eyebrow: "Features",
  title: { emphasis: "Everything a rep needs", rest: "on one tablet" },
  items: [
    { icon: "photo", title: "Photo catalog", text: "Show up to 20,000 products with sharp photos, so customers see exactly what they order." },
    { icon: "price", title: "Each customer's prices", text: "Price per unit, by weight or by tier, set for every customer." },
    { icon: "map", title: "Planned routes", text: "Daily visit routes and time tracking, so reps know where to go next." },
    { icon: "edit", title: "Visit notes and photos", text: "Log every visit with notes and photos to know each customer better." },
    { icon: "history", title: "Order history", text: "See what a customer bought before and repeat the order in seconds." },
    { icon: "promotion", title: "Promotions", text: "Custom deals, free items, bundles and limited-time offers." },
    { icon: "payments", title: "Payment collection", text: "Collect payments, check open invoices and record partial payments." },
    { icon: "sync", title: "Works without internet", text: "Keep selling with no signal. Everything syncs when you're back online." },
    { icon: "user", title: "Full customer view", text: "Purchase history, invoices, notes and more on one screen." },
  ],
};

export const visit: SectionCopy & { steps: readonly (Step & { icon: "user" | "cart" | "payments" | "sync" })[] } = {
  eyebrow: "A store visit",
  title: { emphasis: "Four steps,", rest: "no paperwork" },
  lead: "This is what a visit looks like with Listaso.",
  steps: [
    { icon: "user", title: "Open the customer", text: "See their balance, last orders and notes before you walk in." },
    { icon: "cart", title: "Build the order", text: "Pick from the catalog. Their prices and promotions apply on their own." },
    { icon: "payments", title: "Collect if needed", text: "Record a payment against open invoices, full or partial." },
    { icon: "sync", title: "Send it", text: "The office and warehouse see it at once, and it flows into your accounting." },
  ],
};

export const related = ["direct-sales", "forms", "sami"] as const;
