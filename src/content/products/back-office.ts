/**
 * Back Office (/back-office/). Source: start-version/source/build/pages.py,
 * product_page("back-office"). The dashboard and pipeline are illustrative.
 */
import { hero as homeHero, sami as homeSami } from "@/content/home/en";
import type { FeatureSection, ProductHeroContent, ProductMetadata, SectionCopy } from "./types";

export const metadata: ProductMetadata = {
  path: "/back-office/",
  title: "Back Office for Sales, Inventory & Routes | Listaso",
  description:
    "One web system to manage customers, products, prices, orders, routes, inventory and receivables, with dashboards and reports for better decisions.",
};

export const hero: ProductHeroContent = {
  breadcrumb: "Back Office",
  eyebrow: "Back Office",
  title: { emphasis: "One office system", rest: "for all your sales and inventory" },
  lead: "Manage orders from the moment your reps send them until the invoices are loaded for delivery. Set up users, permissions and settings in one place.",
  plan: "Included in every plan",
};

/** Illustrative sales dashboard shown over the hero photo. */
export const dashboardExample = {
  label: "Example of the Back Office sales dashboard with sales by day of the week",
  title: "Sales dashboard",
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
    { icon: "dashboard", title: "Sales dashboard", text: "Sales totals by day, week and month at a glance." },
    { icon: "orders", title: "Order control", text: "Follow every order from the rep to the delivery truck." },
    { icon: "inventory", title: "Inventory control", text: "One warehouse or many, always up to date." },
    { icon: "customers", title: "Customers, products and prices", text: "Plus receivables, all in one place." },
    { icon: "map", title: "Sales route planner", text: "Plan your reps' routes. Route optimizer available as an option." },
    { icon: "lock", title: "Users and permissions", text: "Decide who sees and changes what." },
    { icon: "pdf", title: "PDF orders and invoices", text: "Create and share documents in seconds (from Professional)." },
    { icon: "edit", title: "Custom templates", text: "Your own order and invoice layouts (Enterprise 360)." },
    { icon: "forms", title: "Forms builder", text: "Design the forms your reps fill at each visit (Enterprise 360)." },
  ],
};

export const decisions: SectionCopy & { checks: readonly string[]; cta: { href: string; label: string } } = {
  eyebrow: "Better decisions",
  title: { emphasis: "Your numbers,", rest: "when you need them" },
  lead: "Reports in the Back Office show what's selling, who's buying and what's owed. Add Sami to ask in plain words and get an Excel file back.",
  cta: { href: "/sami/", label: "Meet Sami" },
  checks: [
    "Sales by day, week and month",
    "Orders waiting to be picked, loaded or delivered",
    "Stock by warehouse and by truck",
    "Open invoices and customer balances",
  ],
};

/** Illustrative order pipeline: from the rep to the delivery truck. */
export const pipelineExample = {
  label: "Example of orders moving from the sales rep to the delivery truck in the Back Office",
  columns: [
    { title: "Sent by rep", orders: [homeHero.example.order.customer, homeSami.example.rows[2].customer] },
    { title: "Picked", orders: [homeSami.example.rows[0].customer] },
    { title: "Loaded", orders: [homeSami.example.rows[1].customer] },
  ],
} as const;

export const related = ["forms", "sami", "custom-development"] as const;
