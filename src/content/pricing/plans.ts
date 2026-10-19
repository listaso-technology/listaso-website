/**
 * Pricing (/plans/). Source: start-version/source/build/pages_more.py
 * (plans_body, COMPARE, PLANS_FAQ). Plans, prices, billing labels, notes and
 * the Sami add-on reuse the approved Homepage pricing (src/content/home/en.ts,
 * DEC-013), so both pages always show the same numbers. The comparison table
 * and FAQ come from start-version and need confirmation before cutover
 * (docs/COMPANY_PRICING_CONTENT_CONTRACT.md).
 */
import { pricing as homePricing } from "@/content/home/en";
import type { ProductHeroContent, SectionCopy } from "@/content/products/types";

export const metadata = {
  path: "/plans/",
  title: "Pricing & Plans | Listaso",
  description:
    "Growth $57.99, Professional $67.99 and Enterprise 360 $77.99 per user a month. No contract, 2-user minimum, 2 months free when paid yearly. Compare every feature.",
} as const;

export const hero: ProductHeroContent = {
  breadcrumb: "Pricing",
  eyebrow: "Pricing",
  title: { emphasis: "Clear prices,", rest: "no surprises" },
  lead: "You pay per user, per month. No contract: cancel anytime. Two-user minimum, and 2 months free when you pay for the year.",
};

export const board = homePricing;

/** "y" included, "n" not included, "o" optional. */
export type Availability = "y" | "n" | "o";

export type CompareGroup = {
  group: string;
  rows: readonly { feature: string; plans: readonly [Availability, Availability, Availability] }[];
};

export const compare: SectionCopy & {
  id: string;
  columns: readonly { name: string; price: string }[];
  featureLabel: string;
  included: string;
  notIncluded: string;
  optional: string;
  groups: readonly CompareGroup[];
} = {
  id: "compare",
  eyebrow: "Compare plans",
  title: { emphasis: "Every feature,", rest: "side by side" },
  featureLabel: "Feature",
  included: "Included",
  notIncluded: "Not included",
  optional: "Optional",
  columns: homePricing.plans.map((plan) => ({
    name: plan.name.rest ? `${plan.name.emphasis} ${plan.name.rest}` : plan.name.emphasis,
    price: `$${plan.monthly}`,
  })),
  groups: [
    {
      group: "Sales app",
      rows: [
        { feature: "Mobile orders and credits", plans: ["y", "y", "y"] },
        { feature: "Customer pricing", plans: ["y", "y", "y"] },
        { feature: "Promotions and discounts", plans: ["y", "y", "y"] },
        { feature: "Photo catalog", plans: ["y", "y", "y"] },
        { feature: "Product purchase history", plans: ["y", "y", "y"] },
        { feature: "Open invoices", plans: ["y", "y", "y"] },
        { feature: "Payment collection", plans: ["y", "y", "y"] },
        { feature: "Timesheet", plans: ["y", "y", "y"] },
        { feature: "Sales route manager", plans: ["y", "y", "y"] },
        { feature: "Photo capture", plans: ["y", "y", "y"] },
        { feature: "Documents and product PDFs", plans: ["y", "y", "y"] },
        { feature: "Accounting system integration", plans: ["y", "y", "y"] },
        { feature: "Works without internet", plans: ["y", "y", "y"] },
        { feature: "Mobile invoices and invoice printing", plans: ["n", "y", "y"] },
        { feature: "Proof of delivery", plans: ["n", "y", "y"] },
        { feature: "Inventory management", plans: ["n", "y", "y"] },
        { feature: "Route compliance", plans: ["n", "y", "y"] },
        { feature: "Random-weight scanning", plans: ["n", "y", "y"] },
        { feature: "Multiple invoice headers", plans: ["n", "y", "y"] },
        { feature: "Activity planner and reminders", plans: ["n", "n", "y"] },
        { feature: "Forms and surveys", plans: ["n", "n", "y"] },
        { feature: "In-store activities", plans: ["n", "n", "y"] },
        { feature: "Sales commission dashboard", plans: ["n", "n", "y"] },
      ],
    },
    {
      group: "Warehouse app",
      rows: [
        { feature: "Receive from vendors", plans: ["n", "y", "y"] },
        { feature: "Order picking", plans: ["n", "y", "y"] },
        { feature: "Physical count", plans: ["n", "y", "y"] },
        { feature: "Blind receiving", plans: ["n", "y", "y"] },
        { feature: "Pick and pack", plans: ["n", "y", "y"] },
        { feature: "Supervisor review (picking and receiving)", plans: ["n", "y", "y"] },
        { feature: "Truck replenishment picking", plans: ["n", "y", "y"] },
        { feature: "Random-weight picking", plans: ["n", "y", "y"] },
        { feature: "Receiving and picking photo logs", plans: ["n", "y", "y"] },
        { feature: "Multiple warehouses", plans: ["n", "y", "y"] },
        { feature: "Backorder and Kardex reports", plans: ["n", "y", "y"] },
        { feature: "Lot numbers and expiration dates", plans: ["n", "n", "y"] },
        { feature: "Multi-bin management", plans: ["n", "n", "y"] },
        { feature: "Load truck", plans: ["n", "n", "y"] },
      ],
    },
    {
      group: "Delivery app",
      rows: [
        { feature: "Delivery route compliance", plans: ["n", "y", "y"] },
        { feature: "Invoice printing", plans: ["n", "y", "y"] },
        { feature: "Payment collection", plans: ["n", "y", "y"] },
        { feature: "Proof of delivery", plans: ["n", "y", "y"] },
      ],
    },
    {
      group: "B2B e-Commerce",
      rows: [
        { feature: "40 customer logins", plans: ["n", "y", "y"] },
        { feature: "Unlimited customer logins", plans: ["n", "o", "y"] },
      ],
    },
    {
      group: "Back Office",
      rows: [
        { feature: "Customers, products, pricing and receivables", plans: ["y", "y", "y"] },
        { feature: "Sales route planner", plans: ["y", "y", "y"] },
        { feature: "Sales route optimizer", plans: ["o", "o", "o"] },
        { feature: "PDF generator", plans: ["n", "y", "y"] },
        { feature: "Custom order and invoice templates", plans: ["n", "n", "y"] },
        { feature: "Delivery route planner", plans: ["n", "n", "y"] },
        { feature: "Delivery route optimizer", plans: ["n", "n", "o"] },
      ],
    },
  ],
};

export const faq: SectionCopy & { items: readonly { question: string; answer: string }[] } = {
  eyebrow: "Questions",
  title: { emphasis: "Pricing", rest: "questions, answered" },
  items: [
    {
      question: "Is there a contract?",
      answer: "No. You pay month to month and can cancel anytime. If you pay for the full year, you get 2 months free.",
    },
    {
      question: "What counts as a user?",
      answer:
        "Each person on your team who uses Listaso, such as a sales rep, driver or warehouse worker. The minimum is 2 users.",
    },
    {
      question: "Is there a setup fee?",
      answer:
        "Yes, a one-time onboarding fee that covers setting up your system and training your team. It depends on your accounting system (QuickBooks, Sage, SAP and others), and we quote it on your demo call before you decide.",
    },
    {
      question: "Can I try it before I pay?",
      answer: "Book a Demo and we'll show you Listaso with the way you work. SAMI AI includes a 15-day free trial.",
    },
    {
      question: "Which accounting systems do you work with?",
      answer: "QuickBooks (Desktop and Online), Sage 100, Acumatica, SAP, NetSuite, Zoho, Acctivate and AccountMate.",
    },
    {
      question: "What devices do I need?",
      answer:
        "iPhone 13 or newer, or iPads with iOS 16 or later. Android phones and tablets with Android 8.1 or later and at least 3 GB of RAM.",
    },
    {
      question: "Is support included?",
      answer:
        "Yes. Our bilingual team answers Monday to Friday, 8 am to 8 pm Eastern. For emergencies after hours or on weekends, write to sos@listaso.com.",
    },
  ],
};
