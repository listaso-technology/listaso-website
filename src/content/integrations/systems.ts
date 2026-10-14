/**
 * Accounting system integrations (/quickbooks/, /sage/, /acumatica/, /sap/,
 * /netsuite/, /zoho/, /acctivate/, /accountmate/). Source: start-version/
 * source/build/pages_more.py, erp_page() and integrations_body().
 *
 * The same claims (certified, two-way, real time, GPS, Zoho CRM) are already
 * published on the WordPress pages of these URLs. Sync tables are technical
 * facts: REQUIERE VALIDACIÓN DEV before cutover
 * (docs/INTEGRATIONS_CONTENT_CONTRACT.md).
 */
import { customers } from "@/content/home/en";
import type { Feature, ProductHeroContent, SectionCopy } from "@/content/products/types";

export type SyncDirection = "in" | "out" | "both";

export type SyncRow = { item: string; direction: SyncDirection };

export type SystemQuote = { text: string; cite: string };

export type IntegrationSystem = {
  slug: string;
  path: `/${string}/`;
  name: string;
  /** One-line description for the hub card. */
  summary: string;
  metadata: { title: string; description: string };
  hero: ProductHeroContent;
  features: readonly Feature[];
  sync: readonly SyncRow[];
  quote?: SystemQuote;
};

const hero = (name: string, title: ProductHeroContent["title"], lead: string, plan?: string): ProductHeroContent => ({
  breadcrumb: name,
  eyebrow: `${name} integration`,
  title,
  lead,
  plan,
});

export const integrationSystems = [
  {
    slug: "quickbooks",
    path: "/quickbooks/",
    name: "QuickBooks",
    summary: "Certified app for QuickBooks Desktop and Online.",
    metadata: {
      title: "QuickBooks Integration for Distributors | Listaso",
      description:
        "Certified QuickBooks Desktop and Online app. Sync customers, items, price levels, inventory, orders, invoices and payments. No double entry for distributors.",
    },
    hero: hero(
      "QuickBooks",
      { emphasis: "Listaso + QuickBooks:", rest: "certified for 4+ years" },
      "Sync your QuickBooks customers and products to Listaso in minutes. Take orders anywhere, drop the paper, and get paid faster, from your sales team to the warehouse.",
      "Works with QuickBooks Desktop and QuickBooks Online",
    ),
    features: [
      { icon: "customers", title: "Customer information", text: "Search and link your QuickBooks customers from the app." },
      { icon: "inventory", title: "Items and inventory", text: "Your full item list, from one warehouse or many." },
      { icon: "history", title: "Product history", text: "Reps see when, how much and at what price they sold each item." },
      { icon: "photo", title: "Visits, notes and photos", text: "Log visits, add notes, take photos and tag customers." },
      { icon: "print", title: "Mobile printing", text: "Bluetooth printers give customers a signed copy of their invoice." },
      { icon: "invoice", title: "Credit memos", text: "Reps create credit memos that go back to QuickBooks." },
      { icon: "map", title: "GPS tracking", text: "“Ride along” with each rep during work hours, from anywhere." },
      { icon: "timeline", title: "Lots and barcodes", text: "Lot numbers and UPC scanning for precise tracking." },
      { icon: "warehouse", title: "Warehouse tasks", text: "Pick orders, receive from vendors and move stock between warehouses and trucks." },
    ],
    sync: [
      { item: "Customers", direction: "both" },
      { item: "Product information (custom fields, tax, UPC)", direction: "both" },
      { item: "Price levels", direction: "both" },
      {
        item: "Inventory (Desktop: multiple warehouses, purchase orders, physical counts, adjustments, DSD transfers · Online: product inventory, purchase orders)",
        direction: "both",
      },
      { item: "Units of measure", direction: "both" },
      { item: "Orders, invoices, estimates and credits", direction: "both" },
      { item: "Payments", direction: "both" },
      { item: "Custom developments", direction: "both" },
    ],
  },
  {
    slug: "sage",
    path: "/sage/",
    name: "Sage 100",
    summary: "Two-way sync with Sage 100.",
    metadata: {
      title: "Sage 100 Integration for Distributors | Listaso",
      description:
        "Two-way sync between Listaso and Sage 100: field sales orders, real-time inventory, products and pricing, transfers and adjustments, lots and UPCs.",
    },
    hero: hero(
      "Sage 100",
      { emphasis: "Listaso + Sage 100:", rest: "your whole operation in sync" },
      "Connect your field sales, warehouse and office teams with data that flows between Listaso and Sage 100. More accuracy, no manual entry.",
    ),
    features: [
      { icon: "sync", title: "Two-way sync", text: "Sales, inventory and customer data stay updated in both systems." },
      { icon: "orders", title: "Orders from the field", text: "Orders placed in Listaso go straight into Sage. No typing." },
      { icon: "inventory", title: "Live inventory", text: "Stock changes show up across warehouses and locations." },
      { icon: "price", title: "Products and pricing", text: "Your team always has the latest products and prices." },
      { icon: "move", title: "Transfers and adjustments", text: "Warehouse movements in Listaso are recorded in Sage." },
      { icon: "map", title: "GPS tracking", text: "“Ride along” with each rep during work hours, from anywhere." },
    ],
    sync: [
      { item: "Customers", direction: "in" },
      { item: "Products and pricing", direction: "in" },
      { item: "Sales orders", direction: "out" },
      { item: "Inventory levels", direction: "both" },
      { item: "Transfers and adjustments", direction: "out" },
      { item: "Lots and UPCs", direction: "in" },
    ],
    // Approved Homepage testimonial (DEC-013), the same text as start-version.
    quote: { text: customers.testimonials[0].quote, cite: `${customers.testimonials[0].name} · ${customers.testimonials[0].source}` },
  },
  {
    slug: "acumatica",
    path: "/acumatica/",
    name: "Acumatica",
    summary: "Orders, inventory, lots and serials.",
    metadata: {
      title: "Acumatica Integration for Distributors | Listaso",
      description:
        "Connect Listaso with Acumatica: customers, products and pricing, sales orders, inventory levels, warehouse transfers, adjustments, lots and serials.",
    },
    hero: hero(
      "Acumatica",
      { emphasis: "Listaso + Acumatica:", rest: "one connected workflow" },
      "Sales, warehouse and operations teams work from the same data, with no manual entry between Listaso and Acumatica.",
    ),
    features: [
      { icon: "customers", title: "Customer sync", text: "Reps see up-to-date customer information from Acumatica." },
      { icon: "price", title: "Products and pricing", text: "Catalogs and prices come from Acumatica, the same everywhere." },
      { icon: "orders", title: "Sales orders", text: "Orders created in Listaso arrive in Acumatica automatically." },
      { icon: "inventory", title: "Inventory levels", text: "Live quantities to avoid stockouts and overselling." },
      { icon: "move", title: "Warehouse transfers and adjustments", text: "Stock moves and counts update Acumatica right away." },
      { icon: "timeline", title: "Lots and serials", text: "Lot numbers, serials and expiration dates for perishable goods." },
    ],
    sync: [
      { item: "Customers", direction: "in" },
      { item: "Products and pricing", direction: "in" },
      { item: "Sales orders", direction: "out" },
      { item: "Inventory levels", direction: "both" },
      { item: "Warehouse transfers", direction: "out" },
      { item: "Inventory adjustments", direction: "out" },
      { item: "Lot and serial numbers", direction: "in" },
    ],
  },
  {
    slug: "sap",
    path: "/sap/",
    name: "SAP",
    summary: "Real-time sales and inventory with SAP.",
    metadata: {
      title: "SAP Integration: Sales & Inventory App | Listaso",
      description:
        "Listaso syncs sales, inventory and operations with SAP in real time: orders, customers and pricing, product catalog, warehouse and bin locations, lots and UPCs.",
    },
    hero: hero(
      "SAP",
      { emphasis: "Listaso + SAP:", rest: "sales and stock in real time" },
      "Data moves between Listaso and SAP on its own, so your team spends less time typing and makes fewer mistakes.",
    ),
    features: [
      { icon: "sync", title: "Two-way sync", text: "Changes in one system show up in the other." },
      { icon: "inventory", title: "Live inventory", text: "Stock movements synced across warehouses and channels." },
      { icon: "orders", title: "Sales orders", text: "Orders from the field go straight into SAP." },
      { icon: "customers", title: "Customers and pricing", text: "Your team works with current data from SAP." },
      { icon: "receive", title: "Purchase orders and transfers", text: "Transfers between warehouses kept up to date in SAP." },
      { icon: "box", title: "Product catalog", text: "SKUs, descriptions and prices stay the same everywhere." },
      { icon: "warehouse", title: "Warehouses and bins", text: "Track stock by location with live updates." },
      { icon: "route", title: "Your workflows", text: "Set up for DSD, B2B, inventory and warehouse work." },
      { icon: "timeline", title: "Lots and barcodes", text: "Lot numbers and UPC scanning." },
    ],
    sync: [
      { item: "Customers", direction: "in" },
      { item: "Products and pricing", direction: "in" },
      { item: "Sales orders", direction: "out" },
      { item: "Inventory levels", direction: "both" },
      { item: "Warehouse transfers", direction: "in" },
      { item: "Inventory adjustments", direction: "out" },
      { item: "Lot and serial tracking", direction: "in" },
    ],
  },
  {
    slug: "netsuite",
    path: "/netsuite/",
    name: "NetSuite",
    summary: "Field sales and finance, connected.",
    metadata: {
      title: "NetSuite Integration for Field Sales & Inventory | Listaso",
      description:
        "Unify field sales and finance: Listaso syncs orders, inventory, products, pricing, warehouse transfers, invoices, lots and serials with NetSuite.",
    },
    hero: hero(
      "NetSuite",
      { emphasis: "Listaso + NetSuite:", rest: "field and finance, together" },
      "Sales, inventory and warehouse data flow between Listaso and NetSuite, so you can decide faster with numbers you trust.",
    ),
    features: [
      { icon: "sync", title: "Automatic sync", text: "Orders, inventory and sales stay the same in both systems." },
      { icon: "orders", title: "Sales orders", text: "Orders from Listaso go straight into NetSuite." },
      { icon: "inventory", title: "Inventory", text: "Adjustments in Listaso update NetSuite across locations." },
      { icon: "price", title: "Products and pricing", text: "NetSuite products and prices reach your field team." },
      { icon: "move", title: "Warehouse transfers", text: "Movements recorded as they happen." },
      { icon: "invoice", title: "Invoices and billing", text: "Billing from Listaso flows into NetSuite." },
    ],
    sync: [
      { item: "Customers", direction: "in" },
      { item: "Product catalog", direction: "in" },
      { item: "Sales orders", direction: "out" },
      { item: "Inventory quantities", direction: "both" },
      { item: "Warehouse transfers", direction: "out" },
      { item: "Inventory adjustments", direction: "out" },
      { item: "Lot, serial and expiration data", direction: "in" },
    ],
  },
  {
    slug: "zoho",
    path: "/zoho/",
    name: "Zoho",
    summary: "Zoho Books and Zoho Inventory.",
    metadata: {
      title: "Zoho Books & Zoho Inventory Integration | Listaso",
      description:
        "Connect field sales to Zoho Books and Zoho Inventory: customers, catalog, price lists, sales orders, invoices, multi-warehouse stock, lots and expiration dates.",
    },
    hero: hero(
      "Zoho",
      { emphasis: "Listaso + Zoho:", rest: "your field team, connected" },
      "Bridge the gap between the street and your Zoho system. Control your sales, inventory and customer data from one connected platform.",
      "Works with Zoho Books and Zoho Inventory",
    ),
    features: [
      { icon: "customers", title: "Zoho CRM contacts", text: "Reps see contact and account details and notes." },
      { icon: "invoice", title: "Zoho Books invoices", text: "Invoices created in the field sync to Zoho Books." },
      { icon: "search", title: "Stock lookup", text: "Live stock from Zoho while selling." },
      { icon: "map", title: "Rep routes", text: "Daily routes built from customer locations in Zoho." },
      { icon: "edit", title: "Custom fields", text: "Zoho tags and payment terms carried into Listaso." },
      { icon: "warehouse", title: "Multiple warehouses", text: "Manage each Zoho Inventory warehouse on its own." },
      { icon: "report", title: "Sales reporting", text: "Order and customer data feeds your Zoho dashboards." },
      { icon: "timeline", title: "Lots and barcodes", text: "Lot numbers and UPC scanning." },
    ],
    sync: [
      { item: "Customers", direction: "in" },
      { item: "Product catalog", direction: "in" },
      { item: "Price lists", direction: "in" },
      { item: "Sales orders", direction: "out" },
      { item: "Inventory quantities", direction: "both" },
      { item: "Warehouse transfers", direction: "out" },
      { item: "Lot and expiration data", direction: "in" },
    ],
  },
  {
    slug: "acctivate",
    path: "/acctivate/",
    name: "Acctivate",
    summary: "Mobile, DSD and field sales into Acctivate.",
    metadata: {
      title: "Acctivate Integration for Mobile & DSD Sales | Listaso",
      description:
        "Bring mobile, DSD and field sales into Acctivate: offline orders, van stock, invoice status, credit limits, bundles, lots and barcodes.",
    },
    hero: hero(
      "Acctivate",
      { emphasis: "Listaso + Acctivate:", rest: "mobile work, connected" },
      "Reps send orders right away and the warehouse updates stock as it moves, all flowing into Acctivate on its own.",
    ),
    features: [
      { icon: "orders", title: "All sales in one place", text: "Mobile, DSD and field sales go into Acctivate." },
      { icon: "sync", title: "Works without internet", text: "Create orders offline. They sync when you reconnect." },
      { icon: "truck", title: "Van stock", text: "Track truck inventory and reduce shrinkage." },
      { icon: "invoice", title: "Invoice status", text: "Reps see what's paid and what's pending." },
      { icon: "lock", title: "Credit limits", text: "Acctivate credit data stops orders over the limit." },
      { icon: "promotion", title: "Bundles", text: "Synced bundle deals help reps upsell." },
    ],
    sync: [
      { item: "Customers", direction: "in" },
      { item: "Products and inventory", direction: "in" },
      { item: "Sales orders", direction: "out" },
      { item: "Order status updates", direction: "in" },
      { item: "Warehouse transfers", direction: "out" },
      { item: "Inventory adjustments", direction: "out" },
      { item: "Barcodes and lots", direction: "in" },
    ],
  },
  {
    slug: "accountmate",
    path: "/accountmate/",
    name: "AccountMate",
    summary: "Your AccountMate data on the road.",
    metadata: {
      title: "AccountMate Integration for Distributors | Listaso",
      description:
        "Real-time sync between Listaso and AccountMate: mobile sales orders, inventory updates, products and pricing, warehouse transfers, lots and barcode scanning.",
    },
    hero: hero(
      "AccountMate",
      { emphasis: "Listaso + AccountMate:", rest: "your data on the road" },
      "Field teams, warehouse staff and the office work on one platform, with no repeated data entry.",
    ),
    features: [
      { icon: "sync", title: "Two-way sync", text: "Orders and inventory sync on their own." },
      { icon: "orders", title: "Mobile sales orders", text: "Orders from the field reach AccountMate right away." },
      { icon: "inventory", title: "Live inventory", text: "Stock changes show up in both systems at once." },
      { icon: "price", title: "Products and pricing", text: "Updated catalogs come from AccountMate." },
      { icon: "move", title: "Transfers and adjustments", text: "Warehouse moves sync immediately." },
      { icon: "timeline", title: "Lots and barcodes", text: "Better tracking with fewer errors." },
    ],
    sync: [
      { item: "Customers", direction: "in" },
      { item: "Products and pricing", direction: "in" },
      { item: "Sales orders", direction: "out" },
      { item: "Inventory adjustments", direction: "out" },
      { item: "Inventory transfers", direction: "out" },
      { item: "Inventory levels", direction: "both" },
      { item: "UPC and lot tracking", direction: "in" },
    ],
  },
] as const satisfies readonly IntegrationSystem[];

export type IntegrationSlug = (typeof integrationSystems)[number]["slug"];

export function getIntegrationSystem(slug: IntegrationSlug): IntegrationSystem {
  const system = integrationSystems.find((entry) => entry.slug === slug);
  if (!system) throw new Error(`Unknown integration: ${slug}`);
  return system;
}

/** Copy shared by every system page. */
export const systemPageCopy = {
  trail: [{ href: "/integrations/", label: "Integrations" }],
  features: (name: string): SectionCopy => ({
    eyebrow: "Features",
    title: { emphasis: "What you get", rest: `with Listaso and ${name}` },
  }),
  sync: (name: string): SectionCopy => ({
    eyebrow: "Sync details",
    title: { emphasis: `How the ${name} sync`, rest: "works" },
  }),
  table: {
    item: "What syncs",
    direction: "Direction",
    both: "Both ways",
    to: "to",
  },
  more: {
    eyebrow: "More integrations",
    title: { emphasis: "Other systems", rest: "we connect to" },
  } satisfies SectionCopy,
  moreCta: { href: "/integrations/", label: "All integrations" },
  /** Hero example: the first rows of the sync table. */
  exampleLabel: (name: string) => `Example of data syncing between Listaso and ${name}`,
  exampleTitle: "Sync",
  exampleStatus: "No double entry",
} as const;

/** QuickBooks only: certified app listings and an App Store review. */
export const quickBooksCertified: SectionCopy & {
  listings: readonly { href: string; label: string }[];
  quote: SystemQuote;
  rating: { score: string; label: string };
} = {
  eyebrow: "Certified partner",
  title: { emphasis: "Find us", rest: "in the QuickBooks App Store" },
  lead: "Listaso is a certified app for both versions of QuickBooks, rated 5.0 by our customers in the QuickBooks App Store.",
  listings: [
    { href: "https://desktop.apps.com/apps/140500/sales-app#!overview", label: "QuickBooks Desktop" },
    { href: "https://quickbooks.intuit.com/app/apps/appdetails/listaso/", label: "QuickBooks Online" },
  ],
  quote: {
    text: "“Listaso has been the all-in-one solution we were looking for. The integration with QuickBooks is seamless and has significantly simplified our entire workflow.”",
    cite: "AH, Quickchoice · QuickBooks App Store review",
  },
  rating: { score: "5.0", label: "on QuickBooks App Store" },
};
