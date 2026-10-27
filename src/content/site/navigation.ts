/**
 * Site navigation and contact data (English). Source: start-version/ header
 * and footer (DEC-013), adjusted by DEC-011: Support and Rate Listaso sit in
 * the Company menu, and the blog keeps its current URL /blog/.
 *
 * Several destinations are not implemented in this app yet (see
 * docs/handoffs/2026-10-09-homepage.md). Never add placeholder links ("#").
 */

export type NavLink = {
  href: string;
  label: string;
  /** Short helper line shown in dropdown panels, when the source has one. */
  description?: string;
};

export type NavGroup = {
  label: string;
  links: NavLink[];
};

export type NavEntry = NavLink | NavGroup;

export const externalLinks = {
  demo: "https://calendly.com/ernesto-henriquez-viasql/60min",
  login: "https://app.listaso.com/BOClassic/site/login.aspx",
} as const;

export const contact = {
  phone: { label: "+1 305-912-7770", href: "tel:+13059127770" },
  /** Dials the sales option (2) directly, as in start-version. */
  phoneSales: { label: "+1 305-912-7770", href: "tel:+13059127770,2" },
  emails: {
    sales: "sales@listaso.com",
    support: "cs@listaso.com",
    urgent: "sos@listaso.com",
  },
} as const;

const integrations: NavLink[] = [
  { href: "/quickbooks/", label: "QuickBooks" },
  { href: "/sage/", label: "Sage 100" },
  { href: "/acumatica/", label: "Acumatica" },
  { href: "/sap/", label: "SAP" },
  { href: "/netsuite/", label: "NetSuite" },
  { href: "/zoho/", label: "Zoho" },
  { href: "/acctivate/", label: "Acctivate" },
  { href: "/accountmate/", label: "AccountMate" },
];

export const mainNav: NavEntry[] = [
  {
    label: "Products",
    links: [
      { href: "/pre-sales/", label: "Pre-sales", description: "Take customer orders in the field" },
      { href: "/direct-sales/", label: "Direct store delivery", description: "Sell and create invoices from the truck" },
      { href: "/inventory/", label: "Inventory", description: "Manage stock in warehouses and trucks" },
      { href: "/delivery/", label: "Delivery", description: "Plan routes, confirm delivery and collect payments" },
      { href: "/back-office/", label: "Back Office", description: "Manage your operation from one place" },
      { href: "/b2b-ecommerce/", label: "B2B e-Commerce", description: "Let customers order online at any time" },
      { href: "/forms/", label: "Forms and surveys", description: "Capture information at every visit" },
      { href: "/sami/", label: "SAMI", description: "Get answers from your business data" },
      { href: "/custom-development/", label: "Custom development", description: "Build reports and features for your operation" },
    ],
  },
  {
    label: "Integrations",
    links: [
      ...integrations,
      { href: "/printers-and-scanners/", label: "Printers and scanners", description: "Find compatible hardware" },
      { href: "/integrations/", label: "All Integrations", description: "Learn how Listaso keeps systems in sync" },
    ],
  },
  { href: "/plans/", label: "Pricing" },
  {
    label: "Company",
    links: [
      { href: "/about/", label: "About Listaso", description: "Learn about our company and story" },
      { href: "/industries/", label: "Industries", description: "Solutions for food, beverage and more" },
      { href: "/support/", label: "Support", description: "Get help from our bilingual team" },
      { href: "/listaso-impact/", label: "Listaso Impact", description: "How we give back" },
      { href: "/join-us/", label: "Careers", description: "Join our team" },
      { href: "/rating/", label: "Rate Listaso" },
      { href: "/contact-us/", label: "Contact us", description: "Offices, phones and emails" },
      { href: "/blog/", label: "Blog", description: "Practical insights for distributors" },
    ],
  },
];

export const footerNav: NavGroup[] = [
  {
    label: "Products",
    links: [
      { href: "/pre-sales/", label: "Pre-sales" },
      { href: "/direct-sales/", label: "Direct store delivery" },
      { href: "/inventory/", label: "Inventory" },
      { href: "/delivery/", label: "Delivery" },
      { href: "/back-office/", label: "Back Office" },
      { href: "/b2b-ecommerce/", label: "B2B e-Commerce" },
      { href: "/forms/", label: "Forms and surveys" },
      { href: "/sami/", label: "SAMI" },
      { href: "/custom-development/", label: "Custom development" },
      { href: "/plans/", label: "Pricing" },
    ],
  },
  {
    label: "Integrations",
    links: [...integrations, { href: "/printers-and-scanners/", label: "Printers and scanners" }],
  },
  {
    label: "Company",
    links: [
      { href: "/about/", label: "About Listaso" },
      { href: "/industries/", label: "Industries" },
      { href: "/support/", label: "Support" },
      { href: "/listaso-impact/", label: "Listaso Impact" },
      { href: "/join-us/", label: "Careers" },
      { href: "/blog/", label: "Blog" },
      { href: "/contact-us/", label: "Contact us" },
    ],
  },
];

export const offices = [
  { city: "Miami", lines: ["5966 S Dixie Hwy, Ste 300", "South Miami, FL 33143"] },
  {
    city: "El Salvador",
    lines: ["Plaza Madre Tierra, Edificio 11, Local 10-A", "Santa Elena, Antiguo Cuscatlán, La Libertad"],
  },
] as const;

export const footerContact = [
  { label: contact.phone.label, href: contact.phone.href },
  { label: "Sales: option 2 · Support: option 1" },
  { label: `Sales: ${contact.emails.sales}`, href: `mailto:${contact.emails.sales}` },
  { label: `Support: ${contact.emails.support}`, href: `mailto:${contact.emails.support}` },
  { label: `Urgent: ${contact.emails.urgent}`, href: `mailto:${contact.emails.urgent}` },
] as const;

export const socialLinks = [
  { href: "https://www.linkedin.com/company/listaso/", label: "LinkedIn" },
  { href: "https://www.youtube.com/@ListasoTechnology", label: "YouTube" },
  { href: "https://www.instagram.com/listaso_technology/", label: "Instagram" },
  { href: "https://www.facebook.com/ListasoTechnology/", label: "Facebook" },
] as const;

export const legalLinks = [
  { href: "/privacy-policy/", label: "Privacy Policy" },
  { href: "/subscription-agreement/", label: "Subscription Agreement" },
  { href: "/terms-and-conditions/", label: "Terms & Conditions" },
] as const;

export const copyright = "© 2026 Listaso Inc.";

export const headerLabels = {
  skipToContent: "Skip to content",
  homeLink: "Listaso home",
  mainNav: "Main navigation",
  menu: "Navigation menu",
  login: "Log in",
  demo: "Book a Demo",
  mobileDemo: "Book a Demo",
  footerNav: "Footer navigation",
  legalNav: "Legal information",
} as const;
