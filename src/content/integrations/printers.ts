/**
 * Printers and scanners (/printers-and-scanners/). Source: start-version/
 * source/build/pages_more.py, printers_body(). Model compatibility and device
 * requirements are technical facts: REQUIERE VALIDACIÓN DEV.
 */
import type { FeatureSection, ProductHeroContent, SectionCopy } from "@/content/products/types";

export const metadata = {
  path: "/printers-and-scanners/",
  title: "Compatible Printers & Scanners | Listaso",
  description:
    "Zebra, Bixolon, Woosim, Star Micronics, Socket Mobile and Brother printers and scanners that work with Listaso, plus iOS and Android device requirements.",
} as const;

export const hero: ProductHeroContent = {
  breadcrumb: "Printers and scanners",
  eyebrow: "Hardware",
  title: { emphasis: "Print and scan", rest: "wherever you are" },
  lead: "Print orders and invoices at the store and scan products in the warehouse with equipment that works with Listaso.",
};

export const printingOptions: FeatureSection = {
  eyebrow: "Printing options",
  title: { emphasis: "Three ways", rest: "to print" },
  items: [
    { icon: "print", title: "AirPrint", text: "Print from your iPhone or iPad to any AirPrint printer." },
    { icon: "sync", title: "Android printing", text: "Print from any Android device to your full-size printer in seconds." },
    { icon: "invoice", title: "Bluetooth thermal printers", text: "Print orders and invoices in seconds on the route." },
  ],
};

const SALES = "Sales";
const INVENTORY = "Inventory";
const DELIVERY = "Delivery";

export const models: SectionCopy & {
  columns: readonly [string, string, string];
  rows: readonly { brand: string; model: string; apps: readonly string[] }[];
  note: string;
} = {
  eyebrow: "Compatible models",
  title: { emphasis: "Printers and scanners", rest: "we support" },
  columns: ["Brand", "Model", "Works with"],
  rows: [
    { brand: "Zebra", model: "Series 300", apps: [SALES, INVENTORY, DELIVERY] },
    { brand: "Zebra", model: "400", apps: [INVENTORY, DELIVERY] },
    { brand: "Zebra", model: "Series 500", apps: [SALES, INVENTORY, DELIVERY] },
    { brand: "Zebra", model: "TC22 / TC27", apps: [SALES, INVENTORY, DELIVERY] },
    { brand: "Bixolon", model: "SPP-R310", apps: [SALES] },
    { brand: "Bixolon", model: "SRP-R410", apps: [SALES] },
    { brand: "Woosim", model: "SPP-R310", apps: [SALES] },
    { brand: "Woosim", model: "WSP-i350", apps: [SALES, DELIVERY] },
    { brand: "Woosim", model: "WSP-i450", apps: [SALES, DELIVERY] },
    { brand: "Star Micronics", model: "SM-T300", apps: [SALES] },
    { brand: "Star Micronics", model: "SM-T400", apps: [SALES] },
    { brand: "Socket Mobile", model: "S700 (1D)", apps: [SALES, INVENTORY] },
    { brand: "Brother", model: "QL-1110NWB", apps: [INVENTORY] },
  ],
  note: "Listaso Inventory also works with Bluetooth scanners on iOS devices.",
};

export const devices: SectionCopy & {
  groups: readonly { title: string; items: readonly string[] }[];
} = {
  eyebrow: "Devices",
  title: { emphasis: "Phones and tablets", rest: "that run Listaso" },
  groups: [
    {
      title: "Apple",
      items: ["iPhone 13 or newer, iOS 16 or later", "iPad and iPad mini, iPadOS 16 or later"],
    },
    {
      title: "Android (minimum)",
      items: [
        "Android 8.1 or later",
        "Quad-core processor and 3 GB of RAM",
        "720p screen",
        "3G connection or better",
        "3,000 mAh battery",
      ],
    },
  ],
};
