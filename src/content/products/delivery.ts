/**
 * Delivery (/delivery/). Source: start-version/source/build/pages.py,
 * product_page("delivery"). Example names reuse the illustrative Homepage
 * data (src/content/home/en.ts).
 */
import { hero as homeHero, sami as homeSami } from "@/content/home/en";
import type { FeatureSection, ProductHeroContent, ProductMetadata, SectionCopy } from "./types";

const [elSol, jalisco, laFe] = homeSami.example.rows;

export const metadata: ProductMetadata = {
  path: "/delivery/",
  title: "Delivery App with Routes & Proof of Delivery | Listaso",
  description:
    "Plan delivery routes, adjust invoices at the door, capture signatures and photos, record payments and manage returns from your drivers' phones.",
};

export const hero: ProductHeroContent = {
  breadcrumb: "Delivery",
  eyebrow: "Delivery app",
  title: { emphasis: "Arrive on time", rest: "and prove every delivery" },
  lead: "With Listaso Delivery App, track orders, capture proof of delivery, manage returns, and record payments directly from the field, keeping your office informed throughout the day.",
  plan: "Included from Professional. Delivery route planner in Enterprise 360.",
  secondaryCta: { href: "#features-title", label: "Explore Features" },
};

/** Illustrative proof of delivery shown over the hero photo. */
export const stopExample = {
  label: "Example of a completed stop in the Listaso delivery app, with signature and payment recorded",
  stop: "Stop 3 of 12",
  customer: homeHero.example.order.customer,
  invoice: homeHero.example.order.total,
  signed: "Signed by the customer",
  payment: "Payment recorded at the door",
} as const;

export const features: FeatureSection = {
  eyebrow: "Features",
  title: { emphasis: "Every stop,", rest: "handled from the phone" },
  items: [
    { icon: "route", title: "Delivery Routes", text: "Build routes that save time and fuel." },
    { icon: "invoice", title: "Invoices at the Door", text: "Change quantities, add credits and fix invoices on the spot. No paper." },
    { icon: "stopwatch", title: "Delivery Timing", text: "See where drivers are, when they arrive and how long each stop takes." },
    { icon: "payments", title: "Payments", text: "Record payments and match them to the right invoices." },
    { icon: "signature", title: "Proof of Delivery", text: "Signatures, photos and notes at every stop to avoid disputes." },
    { icon: "return", title: "Returns", text: "Track returned items and adjust inventory to cut losses." },
  ],
};

export const whyItMatters: SectionCopy & { checks: readonly string[] } = {
  eyebrow: "Why it matters",
  title: { emphasis: "Fewer disputes,", rest: "less waste, lower costs" },
  lead: "Missing deliveries, disputed orders, and unrecorded returns can quickly turn into unnecessary costs. With Listaso, keep a clear record of every stop and resolve issues faster.",
  checks: [
    "Signed proof of delivery for every invoice",
    "Returns logged and stock adjusted the same day",
    "Shorter routes and on-time arrivals",
    "Payments recorded at the door, not days later",
  ],
};

/** Illustrative day route: each stop keeps its own record. */
export const routeExample = {
  label: "Example of a delivery route with the status of each stop",
  title: "Today's route",
  stops: [
    { customer: elSol.customer, status: "Delivered · Signed", state: "done" },
    { customer: jalisco.customer, status: "Delivered · 1 return logged", state: "done" },
    { customer: homeHero.example.order.customer, status: "Delivered · Paid at the door", state: "done" },
    { customer: laFe.customer, status: "Next stop", state: "next" },
  ],
} as const;

export const related = ["inventory", "direct-sales", "back-office"] as const;
