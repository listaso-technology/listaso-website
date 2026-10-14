/**
 * Sami AI (/sami/). Source: start-version/source/build/pages_more.py,
 * sami_body() and SAMI_FAQ. Plan prices match the Sami add-on approved for
 * the Homepage (DEC-013). The SAMI Credit ($9.99) comes from the same
 * start-version page; see docs/PRODUCT_CONTENT_CONTRACT.md.
 */
import { externalLinks } from "@/content/site/navigation";
import type { Feature, ProductHeroContent, ProductMetadata, SectionCopy } from "./types";

export const metadata: ProductMetadata = {
  path: "/sami/",
  title: "Sami: AI Assistant for Distributors | Listaso",
  description:
    "Ask about your sales, customers, inventory and orders in plain words and get answers in seconds, plus Excel and PDF reports. From $57.99 a month, first month free.",
};

export const hero: ProductHeroContent & {
  logoAlt: string;
  badge: { tag: string; label: string };
  price: { prefix: string; amount: string; suffix: string };
} = {
  breadcrumb: "Sami AI",
  eyebrow: "AI assistant",
  logoAlt: "Sami, Listaso’s AI assistant",
  badge: { tag: "New", label: "AI assistant" },
  title: { emphasis: "Meet Sami.", rest: "Ask your business anything." },
  lead: "Sami is Listaso's AI assistant. Ask about your sales, customers, inventory and orders in plain words, and get answers in seconds, in English or Spanish.",
  price: { prefix: "From", amount: "$57.99", suffix: "a month · first month free" },
};

export const heroCtas = {
  start: { href: externalLinks.demo, label: "Start my free month" },
  pricing: { href: "#sami-pricing", label: "See pricing" },
} as const;

export const examples: SectionCopy & { questions: readonly string[] } = {
  eyebrow: "Examples",
  title: { emphasis: "Questions", rest: "you can ask today" },
  lead: "No menus and no reports to learn. Just ask.",
  questions: [
    "Who are my top 10 customers this quarter?",
    "Which products are running low?",
    "Which customers haven't ordered in 60 days?",
    "How much did each rep sell last week?",
    "Which invoices are more than 30 days past due?",
    "What's on backorder, and who is waiting for it?",
  ],
};

export const included: SectionCopy & { items: readonly Feature[] } = {
  eyebrow: "Included in every Sami plan",
  title: { emphasis: "Everything", rest: "you need to start" },
  items: [
    { icon: "ai", title: "AI assistant", text: "Chat with Sami in plain language, any time." },
    { icon: "report", title: "Excel and PDF reports", text: "Ask for a report and download it, ready to share." },
    { icon: "link", title: "Works with ChatGPT and Claude", text: "Use your Listaso data in the AI you already use." },
    { icon: "customers", title: "Shared team usage", text: "Monthly use included, shared by your team." },
  ],
};

export type SamiPlan = {
  name: string;
  users: string;
  limits: string;
  price: string;
  features: readonly string[];
  featured?: boolean;
};

export const pricing: SectionCopy & {
  id: string;
  perTeam: string;
  featuredTag: string;
  cta: { href: string; label: string };
  plans: readonly SamiPlan[];
  addon: { title: string; text: string; logoAlt: string };
} = {
  id: "sami-pricing",
  eyebrow: "Sami pricing",
  title: { emphasis: "One price", rest: "for your whole team" },
  lead: "Based on your users, customers and items. Your first month is free.",
  perTeam: "a month per team",
  featuredTag: "Most popular",
  cta: { href: externalLinks.demo, label: "Start my free month" },
  plans: [
    {
      name: "Starter",
      users: "1 user · for small distributors",
      limits: "Up to 500 customers and 250 items",
      price: "$57.99",
      features: ["12 months of history", "Email support", "Light use included"],
    },
    {
      name: "Professional",
      users: "Up to 3 users · for growing teams",
      limits: "Up to 1,000 customers and 1,000 items",
      price: "$127.99",
      features: ["3 years of history", "Setup and training session", "Daily team use included"],
      featured: true,
    },
    {
      name: "Business",
      users: "Up to 10 users · for large distributors",
      limits: "Unlimited customers and items",
      price: "$297.99",
      features: ["Full history", "Priority phone support", "Monthly check-in call", "Heavy use included"],
    },
  ],
  addon: {
    title: "Need more?",
    text: "A SAMI Credit ($9.99) adds extra use for your whole team this month. We'll let you know when you reach 80% of your plan.",
    logoAlt: "",
  },
};

export const faq: SectionCopy & { items: readonly { question: string; answer: string }[] } = {
  eyebrow: "Questions",
  title: { emphasis: "Sami,", rest: "explained simply" },
  items: [
    {
      question: "Do I need to know about AI or technology?",
      answer:
        "No. You write a question the way you'd text an employee, and Sami answers in plain words. If you can send a WhatsApp message, you can use Sami.",
    },
    {
      question: "Does Sami work in Spanish?",
      answer: "Yes. Ask in Spanish or English and Sami answers in the same language.",
    },
    {
      question: "Where does Sami get its answers?",
      answer: "From your own Listaso data: your sales, customers, products, inventory and orders.",
    },
    {
      question: "Is Sami included in my Listaso plan?",
      answer: "Sami is an add-on to any Listaso plan, priced per team. Your first month is free.",
    },
    {
      question: "What does “use included” mean?",
      answer:
        "Each Sami plan includes a monthly amount of use, shared by your whole team. We let you know when you reach 80%. If you need more that month, add a SAMI Credit for $9.99.",
    },
    {
      question: "Can I use my Listaso data in ChatGPT or Claude?",
      answer: "Yes. Every Sami plan lets you connect your Listaso data to the AI you already use.",
    },
  ],
};
