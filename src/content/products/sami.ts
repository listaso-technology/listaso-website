/**
 * SAMI (/sami/). Pricing and onboarding terms clarified by Erick on
 * October 22, 2026.
 */
import type { Feature, ProductHeroContent, ProductMetadata, SectionCopy } from "./types";

export const metadata: ProductMetadata = {
  path: "/sami/",
  title: "SAMI AI Assistant for Distributors | Listaso",
  description:
    "Meet SAMI, your Listaso AI Assistant. Ask about sales, customers, inventory and orders in everyday language. Plans start at $59 per team per month, with a 14-day free trial.",
};

export const hero: ProductHeroContent & {
  logoAlt: string;
  badge: { label?: string };
  price: { prefix: string; amount: string; suffix: string };
} = {
  breadcrumb: "SAMI",
  eyebrow: "SAMI",
  logoAlt: "SAMI AI Assistant, Listaso’s assistant",
  badge: {},
  title: { emphasis: "Ask your business anything.", rest: "SAMI has the answers" },
  lead: "Meet SAMI, your Listaso AI Assistant. Ask about your sales, customers, inventory and orders in everyday language. Available in +30 languages",
  price: { prefix: "From", amount: "$59", suffix: "a month" },
};

export const heroCtas = {
  start: { href: "#sami-sales-contact", label: "Start Your 14-Day Free Trial" },
  pricing: { href: "#sami-pricing", label: "Pricing" },
} as const;

export const heroStartNote = "Customer Only";

export const promptsNote = "+100 prompts available to use";

// Exact public form URL from the Zoho embed snippet shared by Erick. The form
// slug is a Zoho identifier and does not change when the promotion copy does.
const samiZohoFormUrl =
  "https://forms.zohopublic.com/listaso1/form/StartYour15DaySAMIFreeTrialClient/formperma/Am_TolIi2CRPzMPaM_S2rOYuMLBMfy0dhmHFjea7v60?zf_rszfm=1";

// Parked with SamiTrialForm (not rendered): Zoho rejects this endpoint. Submit endpoint from the HTML embed export of the same Zoho form (Erick's
// Start_Your_14Day_SAMI_Free_Trial.zip). Field names are fixed by Zoho.
const samiZohoSubmitUrl =
  "https://forms.zohopublic.com/listaso1/form/StartYour15DaySAMIFreeTrialClient/formperma/_Q0lNE5gSvD4dkiYOFpH3-NhdI8GgsFT7D7MFlRJAwQ/htmlRecords/submit";

export const salesContact = {
  id: "sami-sales-contact",
  eyebrow: "Sales",
  title: { emphasis: "Let's talk", rest: "about SAMI" },
  lead: "Contact our team, whether you're already a Listaso customer or exploring it for your business.",
  audienceTitle: "Sales requests for",
  audiences: [
    {
      id: "existing_customer",
      title: "Current customer",
      description: "I want to add SAMI or discuss my account.",
    },
    {
      id: "new_customer",
      title: "New customer",
      description: "I'm interested in Listaso for my business",
    },
  ],
  integrationTitle: "Contact form",
  integrationDescription: "Tell us whether you're a current customer or new to Listaso, then share how we can help.",
  formUrl: samiZohoFormUrl,
  submitUrl: samiZohoSubmitUrl,
  termsUrl: "https://listaso.com/terms-and-conditions/",
  privacyUrl: "https://listaso.com/privacy-policy/",
} as const;

export type SamiConversationExample = {
  label: string;
  name: string;
  tag: string;
  question: string;
  answer: string;
  rows: readonly ({ customer: string; amount: string } | { label: string; value: string })[];
  file?: string;
  followUp?: string;
  inputPlaceholder: string;
};

export const examples: SectionCopy & { questions: readonly SamiConversationExample[] } = {
  eyebrow: "What you can ask SAMI",
  title: { emphasis: "Ask your business anything.", rest: "SAMI has the answers" },
  questions: [
    {
      label: "Example of SAMI identifying inactive customers and preparing an Excel report",
      name: "SAMI",
      tag: "Illustrative purposes only",
      question: "Which customers haven't ordered in 60 days?",
      answer: "14 customers. The 3 who bought the most last quarter:",
      rows: [
        { customer: "Customer 1", amount: "$4,210" },
        { customer: "Customer 2", amount: "$3,880" },
        { customer: "Customer 3", amount: "$2,940" },
      ],
      file: "inactive-customers.xlsx",
      followUp: "Export the full inactive-customer list to Excel.",
      inputPlaceholder: "Type your question…",
    },
    {
      label: "Illustrative SAMI response about products running low",
      name: "SAMI",
      tag: "Illustrative purposes only",
      question: "Which products are running low?",
      answer: "3 products are below their minimum stock level:",
      rows: [
        { label: "Queso fresco", value: "8 cases" },
        { label: "Horchata 1 gal", value: "11 cases" },
        { label: "Crema 32 oz", value: "5 cases" },
      ],
      file: "low-stock-review.pdf",
      followUp: "Prepare a stock review as a PDF.",
      inputPlaceholder: "Type your question…",
    },
    {
      label: "Illustrative SAMI response about top customers",
      name: "SAMI",
      tag: "Illustrative purposes only",
      question: "Who are my top 10 customers this quarter?",
      answer: "Here are the top 3 of 10 customers by sales this quarter:",
      rows: [
        { customer: "Customer 1", amount: "$18,420" },
        { customer: "Customer 2", amount: "$16,780" },
        { customer: "Customer 3", amount: "$14,350" },
      ],
      file: "top-10-customers.xlsx",
      followUp: "Export all 10 customers to Excel.",
      inputPlaceholder: "Type your question…",
    },
    {
      label: "Illustrative SAMI response about sales by representative",
      name: "SAMI",
      tag: "Illustrative purposes only",
      question: "How much did each rep sell last week?",
      answer: "Last week's sales by representative:",
      rows: [
        { label: "Alex Rivera", value: "$12,460" },
        { label: "Maya Torres", value: "$10,850" },
        { label: "Jordan Lee", value: "$9,320" },
      ],
      file: "weekly-rep-sales.pdf",
      followUp: "Prepare a PDF summary for the team.",
      inputPlaceholder: "Type your question…",
    },
    {
      label: "Illustrative SAMI response about overdue invoices",
      name: "SAMI",
      tag: "Illustrative purposes only",
      question: "Which invoices are more than 30 days past due?",
      answer: "3 invoices in this sample are over 30 days past due:",
      rows: [
        { label: "INV-2048 · Customer 1", value: "$1,280" },
        { label: "INV-2051 · Customer 2", value: "$940" },
        { label: "INV-2057 · Customer 3", value: "$615" },
      ],
      file: "overdue-invoices.pdf",
      followUp: "Put the overdue invoice list in a PDF.",
      inputPlaceholder: "Type your question…",
    },
    {
      label: "Illustrative SAMI response about backorders",
      name: "SAMI",
      tag: "Illustrative purposes only",
      question: "What's on backorder, and who is waiting for it?",
      answer: "These backordered products have customers waiting:",
      rows: [
        { label: "Queso fresco", value: "Customer 1" },
        { label: "Horchata 1 gal", value: "Customer 2" },
        { label: "Crema 32 oz", value: "Customer 3" },
      ],
      file: "backorders-by-customer.xlsx",
      followUp: "Export the backorders by customer to Excel.",
      inputPlaceholder: "Type your question…",
    },
  ],
};

export const included: SectionCopy & { items: readonly Feature[] } = {
  eyebrow: "Features",
  title: { emphasis: "Get the answers", rest: "you need" },
  lead: "Spend less time digging through reports and more time making informed decisions. SAMI gives you direct access to your data through simple questions.",
  items: [
    { icon: "ai", title: "AI Assistant", text: "Ask questions about your business in everyday language and get clear answers based on your Listaso data." },
    { icon: "report", title: "Excel and PDF Reports", text: "Generate downloadable reports from your business data, ready to review or share with your team." },
    { icon: "link", title: "Works with Claude and ChatGPT", text: "Connect your Listaso data to supported AI assistants and work with the tools you're already familiar with." },
    { icon: "customers", title: "Shared Team Usage", text: "Give your team access to a shared monthly usage allowance based on your SAMI plan." },
  ],
};

export type SamiPlan = {
  name: string;
  users: string;
  limits: string;
  price: string;
  onboarding: string;
  features: readonly string[];
  featured?: boolean;
};

export const pricing: SectionCopy & {
  id: string;
  perTeam: string;
  trialNote: string;
  trialNoteLabel: string;
  onboardingNote: string;
  featuredTag: string;
  cta: { href: string; label: string };
  plans: readonly SamiPlan[];
  addon: { title: string; text: string; logoAlt: string };
} = {
  id: "sami-pricing",
  eyebrow: "Pricing",
  title: { emphasis: "One price per team.", rest: "SAMI included." },
  lead: "Connecting Claude or ChatGPT doesn't have an extra fee.",
  trialNoteLabel: "Free trial and onboarding",
  trialNote: "Try any plan for a 14-day free trial. Onboarding is free through December 31, 2026.",
  onboardingNote: "Onboarding covers your QuickBooks connection, history import, data check and team training. It’s free for teams that sign up by December 31, 2026, and always free when you pay annually. Need more SAMI in a busy month? Add a $10 SAMI Credit. Multiple company files or data cleanup are quoted separately.",
  perTeam: "a month",
  featuredTag: "Most popular",
  cta: { href: "#sami-sales-contact", label: "Start your 14-day free trial" },
  plans: [
    {
      name: "Starter",
      users: "1 user",
      limits: "Up to 500 customers and 250 items",
      price: "$59",
      onboarding: "$199 one time. Free through Dec 31, 2026 or with annual billing.",
      features: ["SAMI, with AI usage included", "1 year of history", "Data refreshed daily", "Email support"],
    },
    {
      name: "Professional",
      users: "Up to 3 users",
      limits: "Up to 1,000 customers and 1,000 items",
      price: "$129",
      onboarding: "$299 one time. Free through Dec 31, 2026 or with annual billing.",
      features: ["SAMI, with AI usage included", "Up to 3 years of history", "Data refreshed daily", "Setup and training session"],
      featured: true,
    },
    {
      name: "Business",
      users: "Up to 10 users",
      limits: "1,000+ customers and items",
      price: "$299",
      onboarding: "$499 one time. Free through Dec 31, 2026 or with annual billing.",
      features: ["SAMI, with AI usage included", "Up to 3 years of history", "Data refreshed daily", "Priority phone support and a monthly check-in"],
    },
  ],
  addon: {
    title: "Need more?",
    text: "A $10 SAMI Credit adds extra use for your whole team in a busy month.",
    logoAlt: "",
  },
};

export const faq: SectionCopy & { items: readonly { question: string; answer: string }[] } = {
  eyebrow: "Frequently Asked Questions",
  title: { emphasis: "SAMI,", rest: "explained simply" },
  items: [
    {
      question: "Do I need to know about AI or technology?",
      answer:
        "Not at all. Simply ask SAMI a question in everyday language, just like you would ask someone on your team. No technical knowledge required.",
    },
    {
      question: "Does SAMI work in Spanish?",
      answer: "Yes. You can ask SAMI questions in English or Spanish and receive answers in the same language.",
    },
    {
      question: "Where does SAMI get its answers?",
      answer: "SAMI uses your business data from Listaso, including sales, customers, products, inventory, and orders, to provide relevant answers to your questions.",
    },
    {
      question: "How is SAMI priced?",
      answer: "SAMI is priced per team, not per seat. Choose a plan with SAMI usage included and try it free for 14 days. Connecting Claude or ChatGPT costs nothing extra.",
    },
    {
      question: "What does “use included” mean?",
      answer:
        "Each plan includes SAMI usage for your team. If you need more in a busy month, add a $10 SAMI Credit.",
    },
    {
      question: "Can I use my Listaso data in Claude or ChatGPT?",
      answer: "Yes. Connecting Claude or ChatGPT costs nothing extra. Your SAMI plan is priced per team.",
    },
  ],
};
