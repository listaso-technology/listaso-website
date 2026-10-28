/**
 * Integrations hub (/integrations/). Source: start-version/source/build/
 * pages_more.py, integrations_body(). New route approved in DEC-013.
 */
import type { ProductHeroContent, SectionCopy } from "@/content/products/types";

export const metadata = {
  path: "/integrations/",
  title: "Integrations: QuickBooks, Sage, SAP, NetSuite & More | Listaso",
  description:
    "Listaso syncs customers, products, prices, orders, invoices and inventory with QuickBooks, Sage 100, Acumatica, SAP, NetSuite, Zoho, Acctivate and AccountMate.",
} as const;

export const hero: ProductHeroContent = {
  breadcrumb: "Integrations",
  eyebrow: "Integrations",
  title: { emphasis: "Connected", rest: "to the accounting system you already use" },
  lead: "Listaso works with your accounting system, not instead of it. Your data moves between the two on its own, so nobody types the same order twice.",
};

export const hubExample = {
  label:
    "Listaso at the center, connected to QuickBooks, Sage 100, Acumatica, SAP, NetSuite, Zoho, Acctivate and AccountMate",
  center: "Listaso",
} as const;

export const howSync: SectionCopy & {
  toListaso: { title: string; items: readonly string[] };
  fromListaso: { title: string; items: readonly string[] };
  note: string;
} = {
  eyebrow: "How the sync works",
  title: { emphasis: "Two directions,", rest: "zero double entry" },
  toListaso: {
    title: "From your accounting system to Listaso",
    items: ["Customers", "Products, prices and units", "Stock levels", "Lots and barcodes"],
  },
  fromListaso: {
    title: "From Listaso to your accounting system",
    items: ["Sales orders and invoices", "Credits and payments", "Warehouse transfers", "Inventory adjustments"],
  },
  note: "Exactly what syncs, and in which direction, depends on the system. Each page below shows the details.",
};

export const systemsSection: SectionCopy & { linkLabel: string } = {
  eyebrow: "Supported systems",
  title: { emphasis: "Pick", rest: "your system" },
  linkLabel: "Learn More",
};

export const alsoSection: SectionCopy & {
  cards: readonly { href: string; title: string; text: string; icon: "print" | "report" }[];
} = {
  eyebrow: "Also",
  title: { emphasis: "Hardware", rest: "and custom work" },
  cards: [
    {
      href: "/printers-and-scanners/",
      title: "Printers and scanners",
      text: "Bluetooth printers and scanners that work with Listaso.",
      icon: "print",
    },
    {
      href: "/custom-development/",
      title: "Using another system?",
      text: "Ask us about a custom integration.",
      icon: "report",
    },
  ],
};

export const productsBridge = {
  eyebrow: "Explore Listaso",
  title: { emphasis: "See the products", rest: "behind the workflow" },
  lead: "Explore the tools your sales team, warehouse, drivers, customers and office use alongside your accounting system.",
  cta: "Explore all products",
} as const;
