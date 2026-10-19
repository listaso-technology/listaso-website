/**
 * Direct store delivery (/direct-sales/). Source: start-version/source/build/
 * pages.py, product_page("direct-sales"). Example rows reuse the illustrative
 * Homepage order (src/content/home/en.ts).
 */
import { hero as homeHero } from "@/content/home/en";
import type { FeatureSection, ProductHeroContent, ProductMetadata, SectionCopy } from "./types";

export const metadata: ProductMetadata = {
  path: "/direct-sales/",
  title: "Direct Store Delivery (DSD) & Van Sales App | Listaso",
  description:
    "Route accounting and DSD software: sell, invoice and print from the truck, with live truck inventory, route planning, proof of delivery and payments.",
};

export const hero: ProductHeroContent = {
  breadcrumb: "Direct store delivery",
  eyebrow: "Direct store delivery (DSD)",
  title: { emphasis: "Sell, invoice and collect", rest: "right from the truck" },
  lead: "Your drivers carry the stock, print the invoice at the store and collect on the spot. Every sale updates the truck's inventory and your books.",
  plan: "Included from Professional, $67.99 per user a month",
};

/** Illustrative truck stock and printed invoice shown in the hero. */
export const truckExample = {
  label: "Example of live truck inventory updating after a sale, and the invoice printed at the store",
  title: "Live truck inventory",
  unit: "cases",
  rows: [
    { product: homeHero.example.order.lines[0].product, before: 48, after: 36 },
    { product: homeHero.example.order.lines[1].product, before: 26, after: 22 },
    { product: homeHero.example.order.lines[2].product, before: 40, after: 34 },
  ],
  invoice: {
    title: "Invoice printed at the store",
    customer: homeHero.example.order.customer,
    total: homeHero.example.order.total,
    status: "Collected on the spot",
  },
} as const;

export const features: FeatureSection = {
  eyebrow: "Features",
  title: { emphasis: "Your go-to tool", rest: "for selling on the route" },
  items: [
    { icon: "truck", title: "Live truck inventory", text: "Your team always knows exactly what's on each truck." },
    { icon: "move", title: "Inventory transfers", text: "The warehouse is ready to load or unload the moment trucks arrive." },
    { icon: "map", title: "Route planner", text: "Plan better routes and track visit times with ease." },
    { icon: "signature", title: "Proof of delivery", text: "Signatures, notes and photos at every stop." },
    { icon: "history", title: "Purchase history", text: "See past purchases in seconds for quick reorders." },
    { icon: "promotion", title: "Promotions", text: "Personal discounts, free items, bundles and limited-time offers." },
    { icon: "payments", title: "Payment collection", text: "Collect on the spot, manage open invoices and log partial payments." },
    { icon: "sync", title: "Works without internet", text: "Keep selling anywhere. Data syncs the moment you're back online." },
    { icon: "print", title: "Print and scan", text: "Bluetooth printers, scanners or the device camera." },
  ],
};

export const drivers: SectionCopy & { checks: readonly string[] } = {
  eyebrow: "For your drivers",
  title: { emphasis: "Less paperwork,", rest: "more stops per day" },
  lead: "Drivers spend their time selling, not writing invoices or calling the office.",
  checks: [
    "Print the invoice at the store with a Bluetooth printer",
    "Scan products with a scanner or the phone's camera",
    "Customer prices, reorders and discounts built in",
    "Restock the truck from the warehouse with one request",
  ],
};

export const hardware = {
  tagline: "Compatible hardware",
  title: "Printers and scanners",
  text: "Zebra, Bixolon, Woosim, Star Micronics, Socket Mobile and Brother models that work with Listaso.",
  link: { href: "/printers-and-scanners/", label: "See the List" },
} as const;

/** Printed receipt illustration for the drivers section. */
export const receiptExample = {
  label: "Example of an invoice printed at the store with a Bluetooth printer",
  heading: "Invoice",
  customer: homeHero.example.order.customer,
  lines: homeHero.example.order.lines,
  totalLabel: homeHero.example.order.totalLabel,
  total: homeHero.example.order.total,
} as const;

export const related = ["inventory", "delivery", "pre-sales"] as const;
