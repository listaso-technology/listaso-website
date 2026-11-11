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
  lead: "Stop relying on disconnected processes during routes. With Listaso DSD, your team can manage truck inventory, create invoices, and collect payments directly at each stop, keeping sales and inventory information connected to your operation.",
  plan: "Included from Professional, $69 per user a month",
  secondaryCta: { href: "#features-title", label: "Explore Features" },
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
  lead: "Give your team the tools to handle daily sales operations directly from the field.",
  items: [
    { icon: "truck", title: "Live Truck Inventory", text: "Know what's available on each truck as products are sold throughout the route." },
    { icon: "move", title: "Inventory Transfers", text: "Manage stock transfers between the warehouse and trucks to keep inventory organized." },
    { icon: "map", title: "Route Planner", text: "Plan better routes and organize customer stops to enhance your team's time." },
    { icon: "signature", title: "Proof of Delivery", text: "Capture signatures, photos, and notes to document deliveries at each stop." },
    { icon: "history", title: "Purchase History", text: "See past purchases in seconds for quick reorders." },
    { icon: "promotion", title: "Promotions", text: "Apply customer discounts, bundles, and available promotions directly when creating orders." },
    { icon: "payments", title: "Payment Collection", text: "Collect payments during customer visits and record full or partial payments against outstanding invoices." },
    { icon: "sync", title: "Work Offline", text: "Continue selling without an internet connection and sync your data once you're back online." },
    { icon: "print", title: "Print and Scan", text: "Print invoices and scan products using compatible Bluetooth printers, scanners, or your device's camera." },
  ],
};

export const featureCategories = [
  { title: "Truck Inventory Under Control", items: features.items.slice(0, 3) },
  { title: "More Productive Stops", items: features.items.slice(3, 6) },
  { title: "Move Sales and Payments", items: features.items.slice(6, 9) },
] as const;

export const drivers = {
  eyebrow: "Built for your drivers",
  title: { emphasis: "Less paperwork,", rest: "more stops per day" },
  lead: "Give your drivers more time to focus on customers, not manual tasks. With Listaso DSD, they can manage sales, print invoices, and record payments directly at each stop.",
  benefitsTitle: "Everything your drivers need on the route",
  benefits: [
    { emphasis: "Invoice on the spot:", text: "print customer invoices directly at the store." },
    { emphasis: "Scan products faster:", text: "use compatible scanners or your device's camera." },
    { emphasis: "Sell with the right information:", text: "access customer-specific pricing, purchase history, and promotions." },
    { emphasis: "Request truck restocking:", text: "coordinate inventory replenishment with the warehouse." },
  ],
} as const satisfies SectionCopy & { benefitsTitle: string; benefits: readonly { emphasis: string; text: string }[] };

export const hardware = {
  title: "Printers and Scanners",
  text: "Connect compatible printer and scanner models from Zebra, Bixolon, Woosim, Star Micronics, Socket Mobile, and Brother, helping your team print invoices and scan products directly on the route.",
  link: { href: "/printers-and-scanners/", label: "More info" },
} as const;

export const connectedSolutions = {
  eyebrow: "More than DSD",
  title: { emphasis: "Part of a", rest: "connected operation" },
  lead: "Connect your truck sales with inventory management, deliveries, and field sales to keep your teams working with the information they need.",
  items: [
    { href: "/inventory/", icon: "warehouse", title: "Inventory", text: "Keep warehouse and truck inventory organized, with tools to receive, count, and transfer stock." },
    { href: "/delivery/", icon: "delivery", title: "Delivery", text: "Coordinate delivery routes, capture proof of delivery, and record payments from the field." },
    { href: "/pre-sales/", icon: "orders", title: "Sales", text: "Give your reps access to customer pricing, product catalogs, and order taking directly from the field." },
  ],
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
