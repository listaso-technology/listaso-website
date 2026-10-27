/**
 * English Homepage content. Source: start-version/source/build/home_body.html
 * and lsbuild.py cta_band() (DEC-013). Erick approved the figures, ratings,
 * prices, support times, testimonials and customer logos as published there.
 *
 * Exceptions:
 * - The 19 October 2026 editorial brief from Erick (DEC-020) replaces the hero,
 *   workflow, SAMI, Support and Customers copy, and the hero secondary CTA;
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
  title: "Listaso | Distribution Management Software for Growing Businesses",
  description:
    "Listaso connects sales, inventory, warehousing and delivery workflows in one distribution management platform. Integrates with QuickBooks, Sage and more.",
  siteName: "Listaso",
  canonical: "https://listaso.com/",
  locale: "en_US",
} as const;

export const hero = {
  eyebrow: "Distribution Management Software for Growing Businesses",
  title: { emphasis: "One Platform", rest: "to Run Your Distribution Business." },
  lead: "Listaso connects sales, inventory, warehousing, and delivery workflows in one distribution management platform, helping your team work smarter and stay in control.",
  primaryCta: { href: externalLinks.demo, label: "Book a Demo" },
  /** Same-page anchor to the workflow section (`solutionsAnchor`). */
  secondaryCta: { href: "#solutions", label: "Explore Our Solutions" },
  ratings: [
    { score: "4.7", label: "on Google (42 reviews)" },
    { score: "5.0", label: "on QuickBooks App Store" },
  ],
  /** Illustrative example shown in the hero composition. */
  example: {
    label: "Example of a Listaso order sent to QuickBooks, with an inventory answer from SAMI",
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
      name: "SAMI",
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

/** Stable id of the workflow section, target of the hero secondary CTA. */
export const solutionsAnchor = "solutions";

export const howItWorks = {
  eyebrow: "One connected distribution workflow",
  title: { emphasis: "From sales to delivery,", rest: "keep every step connected." },
  lead: "When your team works with disconnected information, delays and costly mistakes follow. Listaso brings your distribution workflows together, helping your team manage orders, track inventory, coordinate deliveries, and keep your back office informed.",
  steps: [
    {
      icon: "orders",
      title: "Your rep takes the order",
      text: "Show a photo catalog, customer-specific prices, promotions and purchase history. Keep working without an internet connection.",
      link: { href: "/pre-sales/", label: "Sales" },
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
      link: { href: "/delivery/", label: "Delivery and Direct Store Delivery" },
    },
    {
      icon: "analytics",
      title: "Your office stays informed",
      text: "Manage customers, prices, routes, receivables and reports in one place, connected to your accounting system.",
      link: { href: "/back-office/", label: "Back Office" },
    },
  ] satisfies readonly { icon: IconName; title: string; text: string; link: Link }[],
} as const;

/**
 * Four additional capabilities, shown as expandable cards before Customers.
 * `title` reuses the approved navigation labels; `lead`, `text` and `link`
 * keep the approved copy and destinations (formerly `howItWorks.more`).
 */
export const capabilities = {
  /**
   * PROVISIONAL, not approved copy: visually hidden H2 that keeps the heading
   * outline correct. Replace when Marketing supplies a section title (DEC-020).
   */
  label: "More Listaso capabilities",
  items: [
    {
      icon: "store",
      title: "B2B e-Commerce",
      lead: "Let customers order when it works for them.",
      text: "Give each customer a business-to-business online store with their own prices, available from their phone.",
      link: { href: "/b2b-ecommerce/", label: "Learn More" },
    },
    {
      icon: "forms",
      title: "Forms",
      lead: "Capture information at every visit.",
      text: "Use forms and surveys for shelf photos, competitor checks and signatures.",
      link: { href: "/forms/", label: "Learn More" },
    },
    {
      icon: "sync",
      title: "Integrations",
      lead: "Connect your accounting system.",
      text: "Integrate with QuickBooks, Sage 100, Acumatica, SAP, NetSuite, Zoho, Acctivate or AccountMate.",
      link: { href: "/integrations/", label: "Learn More" },
    },
    {
      icon: "industries",
      title: "Industries",
      lead: "Built with food and beverage distribution in mind.",
      text: "Listaso also supports health and beauty, housewares, paper and packaging, and other industries.",
      link: { href: "/industries/", label: "Learn More" },
    },
  ] satisfies readonly { icon: IconName; title: string; lead: string; text: string; link: Link }[],
} as const;

export const sami = {
  logoAlt: "SAMI AI Assistant, Listaso’s assistant",
  badge: { primary: "Meet SAMI,", accent: "Your Listaso Assistant" },
  title: { emphasis: "Your business has questions.", rest: "SAMI has the answers." },
  lead: "Ask SAMI AI Assistant about your sales, customers, inventory or orders in everyday language. Get an answer in seconds, in English or Spanish, without learning a technical tool.",
  chips: [
    "Ask questions in English or Spanish",
    "Generate Excel and PDF reports",
    "Works with Claude and ChatGPT",
    "Get answers from your Listaso data",
  ],
  /** Informational destination until Development/Product confirm trial activation (DEC-020). */
  cta: { href: "/sami/#sami-sales-contact", label: "Start Your 14-Day Free Trial" },
  price: { prefix: "From", amount: "$59", suffix: "a month per team" },
  example: {
    label: "Example of SAMI identifying inactive customers and preparing an Excel report",
    name: "SAMI",
    tag: "Example",
    question: "Which customers haven't ordered in 60 days?",
    answer: "14 customers. The 3 who bought the most last quarter:",
    rows: [
      { customer: "Customer 1", amount: "$4,210" },
      { customer: "Customer 2", amount: "$3,880" },
      { customer: "Customer 3", amount: "$2,940" },
    ],
    file: "inactive-customers.xlsx ready",
    followUp: "Who are my top 10 customers this quarter?",
    inputPlaceholder: "Type your question…",
  },
} as const;

export const support = {
  eyebrow: "Customer Support",
  title: { emphasis: "Real people.", rest: "Clear help when you need it." },
  lead: "When your distribution operation depends on technology, reliable support matters. Our bilingual team is here to help you resolve issues, answer questions, and keep your business moving, with clear response times based on your needs.",
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
    { label: "Monday to Friday:", value: "8:00 a.m. to 8:00 p.m. ET" },
    { label: "Weekends and after hours:", value: `urgent issues only at ${contact.emails.urgent}` },
    { label: "Languages:", value: "English and Spanish" },
  ],
  cta: { href: "/support/", label: "Explore Our Support Services" },
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
  eyebrow: "Customer Testimonials",
  title: { emphasis: "Built for distributors.", rest: "Trusted by their teams." },
  lead: "See how distributors use Listaso to streamline daily operations, connect their teams, and improve the way they manage sales, inventory, and deliveries.",
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
  title: { emphasis: "The right solution", rest: "for every stage of your growth" },
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
      monthly: "59",
      yearly: "49.17",
      yearlyTotal: "590.00",
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
      monthly: "69",
      yearly: "57.50",
      yearlyTotal: "690.00",
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
      monthly: "79",
      yearly: "65.83",
      yearlyTotal: "790.00",
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
  planCta: { href: externalLinks.demo, label: "Book a Demo" },
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
  compareCta: { href: "/plans/", label: "Compare Every Feature" },
  samiAddon: {
    title: "Add SAMI, your AI assistant.",
    text: "Starter: $59 a month for 1 user · Professional: $129 a month for up to 3 users · Business: $299 a month for up to 10 users. SAMI is priced per team, not per user, and includes AI usage. Try any plan free for 14 days.",
    cta: { href: "/sami/", label: "Meet SAMI" },
  },
} as const;

export const finalCta = {
  title: { emphasis: "See Listaso", rest: "with your products and workflow" },
  lead: "In a free demo, we’ll walk through how Listaso fits your operation and provide exact pricing, including setup. Choose English or Spanish.",
  cta: { href: externalLinks.demo, label: "Book a Demo" },
  call: { prefix: "Or call sales:", phone: contact.phoneSales, suffix: "option 2" },
  email: { label: "Sales:", address: contact.emails.sales },
} as const;
