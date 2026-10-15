/**
 * English Homepage content. Source: start-version/source/build/home_body.html
 * and lsbuild.py cta_band() (DEC-013). Erick approved the figures, ratings,
 * prices, support times, testimonials and customer logos as published there.
 *
 * Exceptions:
 * - hero.secondaryCta comes from the WordPress Homepage (DEC-013 D2);
 * - FIFOX is omitted (DEC-013).
 *
 * Do not edit claims here without an approved source.
 */
import type { IconName } from "@/components/icons/Icon";
import { contact, externalLinks } from "@/content/site/navigation";

/** Heading with the Listaso signature: `emphasis` renders in 700 italic. */
export type SignatureText = { emphasis: string; rest: string };

export type Link = { href: string; label: string };

export const homeMetadata = {
  title: "Listaso | Sales, Delivery & Inventory App for Distributors",
  description:
    "Connect sales, delivery and inventory in one platform built for distributors and wholesalers. Integrates with QuickBooks, Sage and more.",
  siteName: "Listaso",
  canonical: "https://listaso.com/",
  locale: "en_US",
} as const;

export const hero = {
  eyebrow: "Built for distributors, wholesalers and manufacturers",
  title: { emphasis: "Sell more.", rest: "Deliver on time. Get paid faster." },
  lead: "Connect sales, delivery and inventory in one platform. Keep your field and office teams in sync with your accounting system. Sami helps them find answers in your business data, in English or Spanish.",
  primaryCta: { href: externalLinks.demo, label: "Book a free demo" },
  secondaryCta: { href: "/join-us/", label: "Learn more about Listaso Technology" },
  ratings: [
    { score: "4.7", label: "on Google (42 reviews)" },
    { score: "5.0", label: "on QuickBooks App Store" },
  ],
  /** Illustrative example shown in the hero composition. */
  example: {
    label: "Example of a Listaso order sent to QuickBooks, with an inventory answer from Sami",
    order: {
      title: "New order",
      customer: "Mercado La Esperanza",
      lines: [
        { product: "Tortillas de maíz 30 ct", total: "$86.40", detail: "12 × $7.20" },
        { product: "Queso fresco 5 lb", total: "$71.96", detail: "4 × $17.99" },
        { product: "Horchata 1 gal", total: "$41.94", detail: "6 × $6.99" },
        { product: "Chiles jalapeños #10", total: "$29.97", detail: "3 × $9.99 · Promo" },
      ],
      totalLabel: "Total",
      total: "$230.27",
      action: "Send order",
      sync: "Sent to QuickBooks",
    },
    sami: {
      name: "Sami",
      question: "Which products are running low?",
      answer: "3 items below minimum: Queso fresco (8 cases), Horchata 1 gal (11) and Crema 32 oz (5).",
    },
  },
} as const;

export const proof = {
  label: "Listaso in numbers",
  items: [
    { value: "Since 2015", label: "Supporting distributors for over a decade" },
    { value: "400+", label: "Distributors across the US, Puerto Rico and Canada" },
    { value: "2,000+", label: "Sales reps, drivers and office users" },
    { value: "2M+", label: "Orders processed each year" },
    { value: "$1.8B+", label: "Customer sales processed in 2025" },
  ],
} as const;

export const howItWorks = {
  eyebrow: "One system, start to finish",
  title: { emphasis: "From order", rest: "to payment, all connected" },
  lead: "Keep every team connected as an order moves through your business. Enter information once, then use it across sales, inventory, delivery and accounting.",
  steps: [
    {
      icon: "orders",
      title: "Your rep takes the order",
      text: "Show a photo catalog, customer-specific prices, promotions and purchase history. Keep working without an internet connection.",
      link: { href: "/pre-sales/", label: "Sales and pre-sales" },
    },
    {
      icon: "warehouse",
      title: "Your warehouse prepares it",
      text: "Receive the order right away. Use a scanner to receive, pick and count inventory, including products sold by variable weight.",
      link: { href: "/inventory/", label: "Inventory" },
    },
    {
      icon: "delivery",
      title: "Your driver delivers and collects",
      text: "Follow the day’s route, print the invoice at the store, capture a signature and collect payment at delivery.",
      link: { href: "/delivery/", label: "Delivery and direct store delivery" },
    },
    {
      icon: "analytics",
      title: "Your office stays informed",
      text: "Manage customers, prices, routes, receivables and reports in one place, connected to your accounting system.",
      link: { href: "/back-office/", label: "Back Office" },
    },
  ] satisfies readonly { icon: IconName; title: string; text: string; link: Link }[],
  more: [
    {
      icon: "store",
      lead: "Let customers order when it works for them.",
      text: "Give each customer a business-to-business online store with their own prices, available from their phone.",
      link: { href: "/b2b-ecommerce/", label: "Online store" },
    },
    {
      icon: "forms",
      lead: "Capture information at every visit.",
      text: "Use forms and surveys for shelf photos, competitor checks and signatures.",
      link: { href: "/forms/", label: "Forms" },
    },
    {
      icon: "sync",
      lead: "Connect your accounting system.",
      text: "Integrate with QuickBooks, Sage 100, Acumatica, SAP, NetSuite, Zoho, Acctivate or AccountMate.",
      link: { href: "/integrations/", label: "Integrations" },
    },
    {
      icon: "industries",
      lead: "Built with food and beverage distribution in mind.",
      text: "Listaso also supports health and beauty, housewares, paper and packaging, and other industries.",
      link: { href: "/industries/", label: "Industries" },
    },
  ] satisfies readonly { icon: IconName; lead: string; text: string; link: Link }[],
} as const;

export const sami = {
  logoAlt: "Sami, Listaso’s AI assistant",
  badge: { tag: "New", label: "AI assistant" },
  title: { emphasis: "Meet Sami.", rest: "Get answers from your business data." },
  lead: "Ask Sami about your sales, customers, inventory or orders in everyday language. Get an answer in seconds, in English or Spanish, without learning a technical tool.",
  chips: ["Excel and PDF reports", "Uses your Listaso data", "Works with ChatGPT and Claude", "Share access with your team"],
  cta: { href: "/sami/", label: "Meet Sami" },
  price: { prefix: "From", amount: "$57.99", suffix: "a month · first month free" },
  example: {
    label: "Example of Sami identifying inactive customers and preparing an Excel report",
    name: "Sami",
    tag: "Example",
    question: "Which customers haven't ordered in 60 days?",
    answer: "14 customers. The 3 who bought the most last quarter:",
    rows: [
      { customer: "Tienda El Sol", amount: "$4,210" },
      { customer: "Carnicería Jalisco", amount: "$3,880" },
      { customer: "Panadería La Fe", amount: "$2,940" },
    ],
    file: "inactive-customers.xlsx ready",
    followUp: "Who are my top 10 customers this quarter?",
    inputPlaceholder: "Type your question…",
  },
} as const;

export const support = {
  eyebrow: "Support",
  title: { emphasis: "Real people.", rest: "Clear help when you need it." },
  lead: "Our bilingual support team helps you keep your operation moving. See our first-response targets below, so you know what to expect when you contact us.",
  table: {
    columns: ["Type of problem", "First response"],
    rows: [
      { level: "Urgent", detail: "You cannot sell, deliver or collect. Typically resolved in 3.5 hours.", response: "15 minutes" },
      { level: "Critical", detail: "A key feature is unavailable for many users. Typically resolved in 8 hours.", response: "30 minutes" },
      { level: "Important", detail: "A problem affects your work, but your team can continue using an alternative.", response: "2 hours" },
      { level: "Normal", detail: "A problem affects one user or a secondary feature.", response: "8 hours" },
      { level: "Questions and requests", detail: "How-to questions, changes or improvement requests.", response: "24–48 hours" },
    ],
  },
  hours: [
    { label: "Monday through Friday:", value: "8:00 a.m. to 8:00 p.m. Eastern Time" },
    { label: "Weekends and after hours:", value: `urgent issues only at ${contact.emails.urgent}` },
    { label: "Languages:", value: "English and Spanish" },
  ],
  cta: { href: "/support/", label: "How support works" },
  quote: {
    text: "“The support team is always available, responds quickly, and truly makes sure everything runs smoothly.”",
    cite: "AH, Quickchoice · QuickBooks App Store review, March 2026",
  },
  scores: [
    { score: "4.7", label: "Google · 42 reviews" },
    { score: "5.0", label: "QuickBooks App Store" },
  ],
} as const;

export const customers = {
  eyebrow: "Customers",
  title: { emphasis: "Built for distributors.", rest: "Trusted by their teams." },
  lead: "Nearly one in three customers has been with Listaso for more than five years.",
  reviewsLabel: "Customer reviews",
  starsLabel: "5 out of 5 stars",
  testimonials: [
    {
      quote:
        "“Listaso Technologies has been a great partner for our business. Their Sales App, Delivery App, and Back Office platform, along with their seamless integration with Sage 100, have helped streamline our sales, distribution, and accounting processes.”",
      name: "Mark Somwaru",
      source: "Google review",
    },
    {
      quote: "“Listaso is an ally in our operations. Their team listens, improves, and always delivers. I rate them 10 out of 10.”",
      name: "Jesús Nuñez",
      source: "Comercial Mexicana Internacional Inc.",
    },
    {
      quote:
        "“We use Listaso's software in our operation at Cecilia Bakery LLC. Our drivers are happy, it's easy to manage, great customer service. Highly recommend it.”",
      name: "Eduardo Ch.",
      source: "Cecilia Bakery LLC",
    },
    {
      quote:
        "“When it comes to making sales and maintaining inventory, this is a good system that works very well. It has helped us in enhancing the productivity of our processes.”",
      name: "Emeterio Perez",
      source: "Owner, Perez Distributing Fresno Inc.",
    },
    {
      quote:
        "“They've improved report sync times. I timed how long it took me to sync, and it was 03:08.68, which I think is a great reduction in time. It makes the process more efficient for our entire sales team by helping us speed up the sync, and it also means the tablets don't use as much battery for this function. Good job!”",
      name: "Nazly Rojas",
      source: "LADI",
    },
    {
      quote: "“Listaso is a very functional application. With proper training, you can fully exploit the resources it offers.”",
      name: "Evelyn Alvarado",
      source: "Boticas Mexicana",
    },
  ],
  logosLabel: "Customer logos",
  logos: [
    {
      type: "image",
      src: "/customers/diamond-rock.svg",
      alt: "Diamond Rock Food Import",
      width: 238,
      height: 88,
      href: "https://diamondrockfoods.com/",
    },
    {
      type: "image",
      src: "/customers/productos-bredy.png",
      alt: "Productos Bredy",
      width: 240,
      height: 140,
      href: "https://productosbredy.com/",
    },
    { type: "image", src: "/customers/trt-light.webp", alt: "TRT Overseas", width: 258, height: 100 },
    { type: "image", src: "/customers/candesa.webp", alt: "Candesa Aliments Foods", width: 388, height: 120 },
    {
      type: "image",
      src: "/customers/comercial-mexicana.png",
      alt: "Comercial Mexicana Internacional",
      width: 240,
      height: 220,
      href: "https://comercialmexicanaint.com/",
    },
    {
      type: "image",
      src: "/customers/unifoods-light.webp",
      alt: "Unifoods",
      width: 376,
      height: 120,
      href: "https://unifoodsusa.com/",
    },
    {
      type: "image",
      src: "/customers/fabi-saa.png",
      alt: "Fabi Saa",
      width: 240,
      height: 132,
      href: "https://fabisaa.com/es",
    },
    { type: "image", src: "/customers/perez-light.webp", alt: "Perez Distributing Yakima", width: 209, height: 130 },
  ],
} as const;

export const pricing = {
  eyebrow: "Pricing",
  title: { emphasis: "Clear pricing", rest: "for every stage of growth" },
  lead: "Choose a plan based on how your team works. Pricing is per user, per month, with a two-user minimum. There is no contract, so you can cancel at any time.",
  billing: {
    label: "Billing period",
    monthly: "Monthly",
    yearly: "Yearly",
    yearlySaving: "2 months free",
  },
  perUser: "per user, per month",
  yearlyNote: (amount: string) => `Billed yearly at $${amount} per user`,
  plans: [
    {
      name: { emphasis: "Growth", rest: "" },
      audience: "For teams taking orders in the field.",
      monthly: "57.99",
      yearly: "48.33",
      yearlyTotal: "579.90",
      featured: false,
      features: [
        "Orders and credits on a tablet or phone",
        "Customer-specific prices and promotions",
        "Photo catalog and purchase history",
        "Open invoices and payment collection",
        "Works without internet",
        "Connects to your accounting system",
        "Back Office: customers, products, prices and routes",
      ],
    },
    {
      name: { emphasis: "Professional", rest: "" },
      tag: "Most chosen",
      audience: "For distributors who deliver and run a warehouse.",
      monthly: "67.99",
      yearly: "56.66",
      yearlyTotal: "679.90",
      featured: true,
      features: [
        "Everything in Growth, plus:",
        "Direct store delivery: create and print invoices on the route",
        "Proof of delivery with signature",
        "Warehouse app: receive, pick and count",
        "Delivery app for drivers",
        "Products sold by variable weight and multiple warehouses",
        "Online store for 40 customers",
      ],
    },
    {
      name: { emphasis: "Enterprise", rest: "360" },
      audience: "For larger operations that need full control.",
      monthly: "77.99",
      yearly: "64.99",
      yearlyTotal: "779.90",
      featured: false,
      features: [
        "Everything in Professional, plus:",
        "Forms and surveys at every visit",
        "Visit planner, reminders and in-store activities",
        "Sales commission dashboard",
        "Lot numbers, expiration dates and multiple storage bins",
        "Truck loading and delivery route planner",
        "Online store with unlimited customers",
      ],
    },
  ],
  planCta: { href: externalLinks.demo, label: "Book a demo" },
  notes: [
    {
      title: "Setup tailored to your system",
      text: "A one-time fee covers setup with your accounting system, such as QuickBooks, Sage or SAP, and training for your team. We provide the exact amount during your demo.",
    },
    { title: "No contract", text: "Pay month to month, or pay for the year and get 2 months free." },
    {
      title: "Onboarding in English or Spanish",
      text: "Onboarding includes team training, so your staff can start with clear guidance.",
    },
  ],
  compareCta: { href: "/plans/", label: "Compare every feature" },
  samiAddon: {
    title: "Add Sami, your AI assistant.",
    text: "Starter: $57.99 a month for 1 user · Professional: $127.99 a month for up to 3 users · Business: $297.99 a month for up to 10 users. Sami is priced per team, not per user. The first month is free.",
    cta: { href: "/sami/", label: "Meet Sami" },
  },
} as const;

export const finalCta = {
  title: { emphasis: "See Listaso", rest: "with your products and workflow" },
  lead: "In a free demo, we’ll walk through how Listaso fits your operation and provide exact pricing, including setup. Choose English or Spanish.",
  cta: { href: externalLinks.demo, label: "Book a free demo" },
  call: { prefix: "Or call sales:", phone: contact.phoneSales, suffix: "option 2" },
  email: { label: "Sales:", address: contact.emails.sales },
} as const;
