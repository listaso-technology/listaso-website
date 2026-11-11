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
  breadcrumb: "Custom Development",
  eyebrow: "Custom Development",
  title: { emphasis: "Made for the way", rest: "your business works" },
  lead: "Your business has unique needs. From custom reports and integrations to new features, Listaso builds solutions that enhance your workflows.",
  secondaryCta: { href: "/plans/", label: "Pricing" },
};

export const features: FeatureSection = {
  eyebrow: "What we build",
  title: { emphasis: "Features and reports", rest: "that fit your operation" },
  items: [
    { icon: "report", title: "Custom Reports", text: "Get the reports you need using data from your sales, inventory, and delivery operations." },
    { icon: "sync", title: "Custom Integrations", text: "Connect Listaso to the systems you already use." },
    { icon: "new", title: "New Features", text: "Workflows built for the way your team really works." },
  ],
};

export const process: SectionCopy & { steps: readonly Step[] } = {
  eyebrow: "How it works",
  title: { emphasis: "From idea", rest: "to working tool" },
  lead: "Tell us what your business needs. We'll outline the solution and provide a quote before development begins.",
  steps: [
    { title: "We listen", text: "We study how your team works and what's missing." },
    { title: "We design", text: "You see and approve the solution before we build it." },
    { title: "We build and connect", text: "We develop it and integrate it with Listaso and your systems." },
    { title: "We support it", text: "We keep it running and adapt it as your business changes." },
  ],
};

export const related = ["back-office", "sami", "forms"] as const;
