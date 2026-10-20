/**
 * Copy shared by the English product pages. Source: start-version/source/
 * build/pages.py (`R`, `related`, `int_section`) and lsbuild.py (`phero`,
 * `crumbs`). Labels follow the editorial pass already applied to the site
 * navigation (for example "Forms and surveys" instead of "Forms & surveys").
 *
 * Do not edit claims here without an approved source.
 */
import type { IconName } from "@/components/icons/Icon";
import { externalLinks, mainNav, type NavGroup } from "@/content/site/navigation";
import type { ProductSlug, SectionCopy } from "./types";

export const productCtas = {
  demo: { href: externalLinks.demo, label: "Book a Demo" },
  pricing: { href: "/plans/", label: "See Pricing" },
} as const;

export const breadcrumbLabels = {
  nav: "Breadcrumb",
  home: "Home",
} as const;

export type ProductSummary = {
  href: `/${ProductSlug}/`;
  name: string;
  summary: string;
  icon: IconName;
};

/** Short product descriptions used by the "Works together" cards. */
export const productCatalog = {
  "pre-sales": {
    href: "/pre-sales/",
    name: "Pre-sales",
    summary: "Reps take orders in the field with a photo catalog and each customer's prices.",
    icon: "orders",
  },
  "direct-sales": {
    href: "/direct-sales/",
    name: "Direct store delivery",
    summary: "Sell, invoice and collect right from the truck.",
    icon: "truck",
  },
  inventory: {
    href: "/inventory/",
    name: "Inventory",
    summary: "Receive, pick, count and move stock with a scanner.",
    icon: "warehouse",
  },
  delivery: {
    href: "/delivery/",
    name: "Delivery",
    summary: "Routes, proof of delivery and payments for your drivers.",
    icon: "delivery",
  },
  "back-office": {
    href: "/back-office/",
    name: "Back Office",
    summary: "Customers, prices, orders and reports in one place.",
    icon: "analytics",
  },
  "b2b-ecommerce": {
    href: "/b2b-ecommerce/",
    name: "B2B e-Commerce",
    summary: "Your customers order and pay online, 24/7.",
    icon: "store",
  },
  forms: {
    href: "/forms/",
    name: "Forms and surveys",
    summary: "Shelf photos, checklists and signatures at every visit.",
    icon: "forms",
  },
  sami: {
    href: "/sami/",
    name: "SAMI AI",
    summary: "Ask your business anything and get answers in seconds.",
    icon: "ai",
  },
  "custom-development": {
    href: "/custom-development/",
    name: "Custom development",
    summary: "Reports and features built for your operation.",
    icon: "report",
  },
} as const satisfies Record<ProductSlug, ProductSummary>;

export const relatedSection = {
  eyebrow: "Works together",
  title: { emphasis: "Pairs well", rest: "with" },
  linkLabel: "Learn More",
} as const satisfies SectionCopy & { linkLabel: string };

const integrationsGroup = mainNav.find(
  (entry): entry is NavGroup => "links" in entry && entry.label === "Integrations",
);

/** The eight accounting systems, read from the site navigation (single source). */
export const accountingSystems = (integrationsGroup?.links ?? []).filter(
  (link) => !link.description,
);

export const integrationsSection = {
  eyebrow: "Integrations",
  title: { emphasis: "Connected", rest: "to the accounting system you already use" },
  lead: "No double entry: orders, invoices and payments flow into your books on their own.",
  cta: { href: "/integrations/", label: "See How It Works" },
  listLabel: "Accounting systems that work with Listaso",
} as const;
