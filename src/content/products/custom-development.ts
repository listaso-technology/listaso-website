/**
 * Custom development (/custom-development/). Source: start-version/source/
 * build/pages.py, product_page("custom-development"). No plan line: the
 * source has none.
 */
import type { FeatureSection, ProductHeroContent, ProductMetadata, SectionCopy, Step } from "./types";

export const metadata: ProductMetadata = {
  path: "/custom-development/",
  title: "Custom Development & Reports for Distributors | Listaso",
  description:
    "Need something special? We analyze, design, build and integrate custom features and reports for your operation, and keep supporting them over time.",
};

export const hero: ProductHeroContent = {
  breadcrumb: "Custom development",
  eyebrow: "Custom development",
  title: { emphasis: "Made for the way", rest: "your business works" },
  lead: "From understanding your needs to designing, building and connecting a solution, we stay with you every step of the way and keep it working as you grow.",
};

export const features: FeatureSection = {
  eyebrow: "What we build",
  title: { emphasis: "Features and reports", rest: "that fit your operation" },
  items: [
    { icon: "report", title: "Custom reports", text: "We pull data from sales, warehouse and delivery to build the report you need." },
    { icon: "sync", title: "Custom integrations", text: "Connect Listaso to the systems you already use." },
    { icon: "new", title: "New features", text: "Workflows built for the way your team really works." },
  ],
};

export const process: SectionCopy & { steps: readonly Step[] } = {
  eyebrow: "How it works",
  title: { emphasis: "From idea", rest: "to working tool" },
  lead: "Tell us what you need on a call. We'll give you a plan and a quote before any work starts.",
  steps: [
    { title: "We listen", text: "We study how your team works and what's missing." },
    { title: "We design", text: "You see and approve the solution before we build it." },
    { title: "We build and connect", text: "We develop it and integrate it with Listaso and your systems." },
    { title: "We support it", text: "We keep it running and adapt it as your business changes." },
  ],
};

export const related = ["back-office", "sami", "forms"] as const;
