/**
 * Temporary photography for the product pages (DEC-009).
 *
 * Same format as `placeholders.ts`. Every file is a self-hosted, optimized
 * Unsplash placeholder (free Unsplash License, never Unsplash+; license
 * checked through the photo's download endpoint on 2026-10-12). They show
 * generic operations and never represent a Listaso customer, employee or
 * documented deployment. Crops avoid visible third-party brands.
 */
export type PhotoSlot = {
  src: string;
  width: number;
  height: number;
  alt: string;
  unsplashUrl: string;
  photographer: string;
  photographerUrl: string;
  downloadedOn: string;
  status: "placeholder" | "requested" | "replaced";
  designBrief: string;
};

const downloadedOn = "2026-10-12";

export const productMedia = {
  preSalesTablet: {
    src: "/images/products/presales-tablet-order.webp",
    width: 1000,
    height: 1250,
    alt: "A person reviewing a list of orders on a tablet",
    unsplashUrl: "https://unsplash.com/photos/37UYj2pnRac",
    photographer: "Björn Antonissen",
    photographerUrl: "https://unsplash.com/@bjornftw",
    downloadedOn,
    status: "placeholder",
    designBrief:
      "Sales rep with a tablet inside a customer's store, reviewing the catalog with the owner; warm light, no visible third-party brands.",
  },
  dsdCrates: {
    src: "/images/products/dsd-produce-crates.webp",
    width: 1000,
    height: 1250,
    alt: "Workers unloading crates of fresh produce from a truck",
    unsplashUrl: "https://unsplash.com/photos/txJVNc4sBIU",
    photographer: "Ali Nuredini",
    photographerUrl: "https://unsplash.com/@alinuredini",
    downloadedOn,
    status: "placeholder",
    designBrief:
      "Route driver delivering product from the truck straight to a store, with a handheld printer or phone in view.",
  },
  inventoryFloor: {
    src: "/images/products/inventory-warehouse-floor.webp",
    width: 1000,
    height: 1250,
    alt: "Warehouse staff walking between rows of pallet racks",
    unsplashUrl: "https://unsplash.com/photos/c_4eaGRDSVU",
    photographer: "Adrian Sulyok",
    photographerUrl: "https://unsplash.com/@sulyok_imaging",
    downloadedOn,
    status: "placeholder",
    designBrief:
      "Distribution warehouse with a picker scanning product; deep aisle perspective, food and beverage stock.",
  },
  inventoryForklift: {
    src: "/images/products/inventory-forklift.webp",
    width: 640,
    height: 800,
    alt: "A forklift parked inside a clean warehouse",
    unsplashUrl: "https://unsplash.com/photos/HbUhHmGCB-w",
    photographer: "Homa Appliances",
    photographerUrl: "https://unsplash.com/@homaappliances",
    downloadedOn,
    status: "placeholder",
    designBrief:
      "Cold storage or fresh product area with labeled lots and expiration dates, without readable brand packaging.",
  },
  deliveryHandTruck: {
    src: "/images/products/delivery-hand-truck.webp",
    width: 1000,
    height: 1250,
    alt: "A delivery worker moving a stack of boxes on a hand truck",
    unsplashUrl: "https://unsplash.com/photos/GgmZ23grWNY",
    photographer: "Richard Stachmann",
    photographerUrl: "https://unsplash.com/@stachmann",
    downloadedOn,
    status: "placeholder",
    designBrief:
      "Driver completing a delivery at a store's back door, capturing the customer's signature on a phone.",
  },
  deliveryDriver: {
    src: "/images/products/delivery-driver-van.webp",
    width: 880,
    height: 660,
    alt: "A smiling driver at the wheel of a delivery van",
    unsplashUrl: "https://unsplash.com/photos/zxsh85YyplA",
    photographer: "Polina Kuzovkova",
    photographerUrl: "https://unsplash.com/@p_kuzovkova",
    downloadedOn,
    status: "placeholder",
    designBrief: "Delivery driver on route, phone mounted in the cab showing the day's stops.",
  },
  backOfficeDashboards: {
    src: "/images/products/backoffice-dashboards.webp",
    width: 1000,
    height: 1250,
    alt: "A person working on a laptop that shows sales charts",
    unsplashUrl: "https://unsplash.com/photos/KNQUEQwTCY4",
    photographer: "Apex Virtual Education",
    photographerUrl: "https://unsplash.com/@apexvirtualeducation",
    downloadedOn,
    status: "placeholder",
    designBrief:
      "Distributor's office team reviewing the Listaso Back Office on a desktop screen; real workspace, no staged meeting.",
  },
  formsShelf: {
    src: "/images/products/forms-produce-shelf.webp",
    width: 640,
    height: 800,
    alt: "Fresh produce on refrigerated store shelves",
    unsplashUrl: "https://unsplash.com/photos/sn4P-PL79ow",
    photographer: "Hanz Dela Cruz",
    photographerUrl: "https://unsplash.com/@hanz_dc",
    downloadedOn,
    status: "placeholder",
    designBrief:
      "Rep photographing a shelf during a store visit; product placement visible, no readable third-party packaging.",
  },
  customWhiteboard: {
    src: "/images/products/custom-whiteboard.webp",
    width: 1200,
    height: 900,
    alt: "Two people sketching a screen design on a whiteboard",
    unsplashUrl: "https://unsplash.com/photos/26MJGnCM0Wc",
    photographer: "Kaleidico",
    photographerUrl: "https://unsplash.com/@kaleidico",
    downloadedOn,
    status: "placeholder",
    designBrief:
      "Listaso team and a distributor mapping a custom report or workflow together; collaborative, not a staged meeting.",
  },
} as const satisfies Record<string, PhotoSlot>;

export type ProductMediaId = keyof typeof productMedia;
