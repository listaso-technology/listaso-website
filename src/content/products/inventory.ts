/**
 * Inventory (/inventory/). Source: start-version/source/build/pages.py,
 * product_page("inventory"). Example products reuse the illustrative
 * Homepage data (src/content/home/en.ts).
 */
import { hero as homeHero } from "@/content/home/en";
import type { FeatureSection, ProductHeroContent, ProductMetadata, SectionCopy } from "./types";

const [tortillas, queso, horchata] = homeHero.example.order.lines;

export const metadata: ProductMetadata = {
  path: "/inventory/",
  title: "Warehouse & Inventory App for Distributors | Listaso",
  description:
    "Receive, pick, count and transfer stock with a scanner. Catch-weight products, multiple warehouses, truck stock, lot and expiration tracking.",
};

export const hero: ProductHeroContent = {
  breadcrumb: "Inventory",
  eyebrow: "Inventory app",
  title: { emphasis: "Know what you have", rest: "in every warehouse and every truck" },
  lead: "Your warehouse team receives, picks, counts and moves stock from a phone or scanner. No paper lists and no guessing.",
  plan: "Included from Professional. Lot tracking, multi-bin and truck loading in Enterprise 360.",
};

/** Illustrative pick list shown over the hero photo. */
export const pickExample = {
  label: "Example of a pick list in the Listaso inventory app, grouped by warehouse location",
  title: "Pick list",
  customer: homeHero.example.order.customer,
  rows: [
    { product: tortillas.product, location: "A-03-2", qty: "12", done: true },
    { product: queso.product, location: "C-01-4", qty: "4", done: true },
    { product: horchata.product, location: "B-07-1", qty: "6", done: false },
  ],
  progress: "2 of 3 picked",
} as const;

export const features: FeatureSection = {
  eyebrow: "Features",
  title: { emphasis: "A tidy warehouse", rest: "starts with one app" },
  items: [
    { icon: "receive", title: "Receive from vendors", text: "Scan products as they arrive. No typing quantities by hand." },
    { icon: "checklist", title: "Smart order picking", text: "Group or split orders by location to pick faster." },
    { icon: "reorder", title: "Replenishment", text: "Organized picking routes and better use of overstock." },
    { icon: "timeline", title: "Traceability", text: "Know where every product is and how it moved." },
    { icon: "refresh", title: "Cycle counts", text: "Scheduled counts that take less effort and stay accurate." },
    { icon: "data-grid", title: "Physical inventory", text: "Keep your records right and your differences small." },
    { icon: "price", title: "Catch-weight products", text: "Sell and bill by weight, with flexible sales units." },
    { icon: "box", title: "Pick and pack", text: "Assign products to boxes for faster, accurate orders." },
    { icon: "print", title: "Custom labels", text: "Print labels in seconds to keep stock organized." },
  ],
};

export const freshProduct: SectionCopy & { checks: readonly string[] } = {
  eyebrow: "Built for food distribution",
  title: { emphasis: "Fresh product,", rest: "under control" },
  lead: "When products expire, you need to know which lot is where and ship the oldest first.",
  checks: [
    "Lot numbers and expiration dates",
    "Multi-bin storage with stock rotation (FIFO)",
    "Load trucks and connect with the delivery app",
    "Blind receiving and supervisor review",
    "Photo logs when receiving and picking",
    "Backorder and Kardex reports",
  ],
};

/** Illustrative lot rotation table: oldest lot ships first (FIFO). */
export const lotExample = {
  label: "Example of lots for one product sorted by expiration date, with the oldest lot marked to ship first",
  product: queso.product,
  columns: ["Lot", "Expires", "Location", "Cases"],
  rows: [
    { lot: "L-2291", expires: "Oct 18", location: "C-01-4", qty: "8", first: true },
    { lot: "L-2304", expires: "Oct 25", location: "C-01-5", qty: "14", first: false },
    { lot: "L-2317", expires: "Nov 2", location: "C-02-1", qty: "20", first: false },
  ],
  firstLabel: "Ships first",
} as const;

export const plans = {
  tagline: "Which plan?",
  rows: [
    {
      plan: "Professional",
      text: "Receiving, picking, counts, pick and pack, catch weight, multiple warehouses, photo logs, Kardex",
    },
    {
      plan: "Enterprise 360",
      text: "Everything in Professional, plus lots and expiration dates, multi-bin and truck loading",
    },
  ],
  cta: { href: "/plans/", label: "Compare plans" },
} as const;

export const related = ["delivery", "direct-sales", "back-office"] as const;
