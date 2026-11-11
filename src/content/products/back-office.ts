/**
 * BackOffice (/back-office/). Source: start-version/source/build/pages.py,
 * product_page("back-office"). The dashboard and pipeline are illustrative.
 */
import { hero as homeHero, sami as homeSami } from "@/content/home/en";
import type { FeatureSection, ProductHeroContent, ProductMetadata, SectionCopy } from "./types";

export const metadata: ProductMetadata = {
  path: "/back-office/",
  title: "BackOffice for Sales, Inventory & Routes | Listaso",
  description:
    "One web system to manage customers, products, prices, orders, routes, inventory and receivables, with dashboards and reports for better decisions.",
};

export const hero: ProductHeroContent = {
  breadcrumb: "BackOffice",
  eyebrow: "BackOffice",
  title: { emphasis: "One system", rest: "for all your operations" },
  lead: "Get a clear view of your daily operations. Manage orders, monitor inventory, track sales, and keep your team connected from one centralized platform.",
  plan: "Included in every plan",
  secondaryCta: { href: "/plans/", label: "Pricing" },
};

/** Illustrative sales dashboard shown over the hero photo. */
export const dashboardExample = {
  label: "Example of the BackOffice sales dashboard with sales by day of the week",
  title: "Sales Dashboard",
  period: "This week",
  /** Relative bar heights, 0–100. */
  days: [
    { day: "Mon", value: 58 },
    { day: "Tue", value: 72 },
    { day: "Wed", value: 64 },
    { day: "Thu", value: 88 },
    { day: "Fri", value: 100 },
    { day: "Sat", value: 46 },
  ],
} as const;

export const features: FeatureSection = {
  eyebrow: "Features",
  title: { emphasis: "See everything", rest: "from your desk" },
  items: [
    { icon: "dashboard", title: "Sales Dashboard", text: "Sales totals by day, week and month at a glance." },
    { icon: "orders", title: "Order Control", text: "Follow every order from the rep to the delivery truck." },
    { icon: "inventory", title: "Inventory Control", text: "One warehouse or many, always up to date." },
    { icon: "customers", title: "Customers, products and prices", text: "Manage customer information, product catalogs, pricing, and receivables in one place." },
    { icon: "map", title: "Sales Route Planner", text: "Plan your reps' routes. Route optimizer available as an option." },
    { icon: "lock", title: "Users and Permissions", text: "Decide who sees and changes what." },
    { icon: "pdf", title: "PDF Orders and Invoices", text: "Create and share documents instantly. (Available from Professional Package)" },
    { icon: "edit", title: "Custom Templates", text: "Your own order and invoice layouts. (Available from Enterprise 360)" },
    { icon: "forms", title: "Forms Builder", text: "Design the forms your reps fill at each visit. (Available from Enterprise 360)" },
  ],
};

export const decisions: SectionCopy & { checks: readonly string[]; cta: { href: string; label: string } } = {
  eyebrow: "Better decisions",
  title: { emphasis: "Your numbers,", rest: "when you need them" },
  lead: "Stay on top of sales, inventory, orders, and customer balances with reports that give you a clear view of your business. Need answers faster? Ask SAMI, the Listaso AI Assistant.",
  cta: { href: "/sami/", label: "Meet SAMI" },
  checks: [
    "Sales by day, week and month",
    "Orders waiting to be picked, loaded or delivered",
    "Stock by warehouse and by truck",
    "Open invoices and customer balances",
  ],
};

/** Illustrative order pipeline: from the rep to the delivery truck. */
export const pipelineExample = {
  label: "Example of orders moving from the sales rep to the delivery truck in the BackOffice",
  columns: [
    { title: "Sent by rep", orders: [homeHero.example.order.customer, homeSami.example.rows[2].customer] },
    { title: "Picked", orders: [homeSami.example.rows[0].customer] },
    { title: "Loaded", orders: [homeSami.example.rows[1].customer] },
  ],
} as const;

export const related = ["forms", "sami", "custom-development"] as const;
