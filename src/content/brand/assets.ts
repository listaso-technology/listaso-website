/**
 * Brand asset manifest (Chat 5, 9 October 2026).
 *
 * Files in public/brand/ are byte-identical copies of the deliveries listed in
 * `source`; the hash prefix proves it. Never recolor, deform or rebuild a logo.
 * An alias reuses another entry's file instead of duplicating the SVG.
 */

export type BrandAssetStatus = "active" | "temporary" | "legacy" | "discontinued";
export type BrandBackground = "light" | "dark" | "any";

export type BrandAsset = {
  id: string;
  /** Visible name used in internal review. */
  label: string;
  product: string;
  /** Public path, or the id of the entry whose file this alias reuses. */
  file: string;
  variant: string;
  background: BrandBackground;
  status: BrandAssetStatus;
  /** Intrinsic SVG size (viewBox), used to keep the aspect ratio. */
  width: number;
  height: number;
  /** Original delivery path and the first 12 hex chars of its SHA-256. */
  source: string;
  sha256: string;
  notes?: string;
};

const CUSTOM_IMPORT = "~/Downloads/Custom Import/Brand logos";
const DOWNLOADS = "~/Downloads";
const DOWNLOADS_1X = "~/Downloads/1x";

export const brandAssets = [
  // Listaso master brand. Core lockups say only "Listaso" since 19 October
  // 2026 (delivered by Erick in ~/Downloads/1x; the file names still say
  // "listaso-technology", so they are copied under listaso-logo-*).
  {
    id: "listaso-horizontal-navy",
    label: "Listaso — horizontal",
    product: "Listaso",
    file: "/brand/listaso/horizontal/listaso-logo-horizontal-navy-outlined.svg",
    variant: "horizontal, regular-weight wordmark, navy (#00375B)",
    background: "light",
    status: "active",
    width: 473,
    height: 117,
    source: `${DOWNLOADS_1X}/listaso-technology-logo-horizontal-navy-outlined.svg`,
    sha256: "d250b44dad74",
    notes:
      "Primary logo (header, footer). Symbol on a white tile; the wordmark navy is #00375B here but #003F69 in the stacked file: confirm with Marketing.",
  },
  {
    id: "listaso-horizontal-white",
    label: "Listaso — horizontal (white)",
    product: "Listaso",
    file: "/brand/listaso/horizontal/listaso-logo-horizontal-white.svg",
    variant: "horizontal, regular-weight wordmark, white",
    background: "dark",
    status: "active",
    width: 473,
    height: 117,
    source: `${DOWNLOADS_1X}/listaso-technology-logo-horizontal-white.svg`,
    sha256: "214d9fa12979",
  },
  {
    id: "listaso-stacked-navy",
    label: "Listaso — bold lockup",
    product: "Listaso",
    file: "/brand/listaso/stacked/listaso-logo-stacked-navy.svg",
    variant: "symbol + bold wordmark side by side (delivered as 'stacked'), navy (#003F69)",
    background: "light",
    status: "active",
    width: 569,
    height: 146,
    source: `${DOWNLOADS_1X}/listaso-technology-logo-stacked-navy.svg`,
    sha256: "a8f524f60ecd",
    notes: "The delivery calls it stacked, but the symbol and wordmark sit on one line.",
  },
  {
    id: "listaso-stacked-white",
    label: "Listaso — bold lockup (white)",
    product: "Listaso",
    file: "/brand/listaso/stacked/listaso-logo-stacked-white.svg",
    variant: "symbol + bold wordmark side by side (delivered as 'stacked'), white",
    background: "dark",
    status: "active",
    width: 569,
    height: 146,
    source: `${DOWNLOADS_1X}/listaso-technology-logo-stacked-white.svg`,
    sha256: "95e4825585d8",
    notes: "Footer closing lockup.",
  },
  {
    id: "listaso-symbol-multicolor",
    label: "Listaso symbol — multicolor",
    product: "Listaso",
    file: "/brand/listaso/symbol/listaso-symbol-multicolor-white-main.svg",
    variant: "symbol on white tile",
    background: "any",
    status: "active",
    width: 141,
    height: 141,
    source: `${CUSTOM_IMPORT}/listaso-symbol-multicolor-white-main.svg`,
    sha256: "85c288c28cf9",
    notes: "Official isotype colors: #003F69, #00BDA9, #FF1975.",
  },
  {
    id: "listaso-symbol-white",
    label: "Listaso symbol — white",
    product: "Listaso",
    file: "/brand/listaso/symbol/listaso-symbol-white-transparent.svg",
    variant: "white symbol, transparent background",
    background: "dark",
    status: "active",
    width: 141,
    height: 141,
    source: `${CUSTOM_IMPORT}/listaso-symbol-white-transparent.svg`,
    sha256: "db3de98604dd",
  },
  {
    id: "listaso-wordmark-navy",
    label: "Listaso Technology — wordmark",
    product: "Listaso",
    file: "/brand/listaso/wordmark/listaso-technology-wordmark-horizontal-navy.svg",
    variant: "wordmark only, navy",
    background: "light",
    status: "legacy",
    width: 651,
    height: 86,
    source: `${CUSTOM_IMPORT}/listaso-technology-wordmark-horizontal-navy.svg`,
    sha256: "675d79313296",
    notes:
      "Says Listaso Technology: superseded by the Listaso core logo (19 October 2026). No Listaso-only wordmark was delivered.",
  },

  // Products
  {
    id: "product-sales-order-catalog",
    label: "Sales Order & Catalog",
    product: "Sales Order & Catalog",
    file: "listaso-symbol-multicolor",
    variant: "alias of the multicolor symbol",
    background: "any",
    status: "active",
    width: 141,
    height: 141,
    source: `${CUSTOM_IMPORT}/listaso-sales-order-&-catalog.svg`,
    sha256: "85c288c28cf9",
    notes:
      "Confirmed by Erick: uses the same multicolor symbol. The delivered file is byte-identical, so it is an alias.",
  },
  {
    id: "product-advanced-inventory",
    label: "Advanced Inventory",
    product: "Advanced Inventory",
    file: "/brand/products/advanced-inventory/listaso-advanced-inventory.svg",
    variant: "black tile",
    background: "light",
    status: "active",
    width: 141,
    height: 141,
    source: `${DOWNLOADS}/listaso-advanced-inventory.svg`,
    sha256: "430fd6392a19",
    notes: "Updated official logo. Identical to the Custom Import copy.",
  },
  {
    id: "product-back-office-dark",
    label: "Back Office",
    product: "Back Office",
    file: "/brand/products/back-office/listaso-back-office-dark.svg",
    variant: "lockup, navy artwork",
    background: "light",
    status: "active",
    width: 576,
    height: 172,
    source: `${DOWNLOADS}/listaso-back-office-dark.svg`,
    sha256: "14efa8edb70a",
    notes: "Official. 'dark' refers to the artwork color, for light backgrounds.",
  },
  {
    id: "product-back-office-white",
    label: "Back Office (white)",
    product: "Back Office",
    file: "/brand/products/back-office/listaso-back-office-white.svg",
    variant: "lockup, white artwork",
    background: "dark",
    status: "active",
    width: 576,
    height: 172,
    source: `${DOWNLOADS}/listaso-back-office-white.svg`,
    sha256: "638a803bf203",
    notes: "Official.",
  },
  {
    id: "product-delivery",
    label: "Delivery",
    product: "Delivery",
    file: "/brand/products/delivery/listaso-delivery.svg",
    variant: "navy tile",
    background: "any",
    status: "active",
    width: 141,
    height: 141,
    source: `${CUSTOM_IMPORT}/listaso-delivery.svg`,
    sha256: "bee845391938",
  },
  {
    id: "product-ecommerce",
    label: "eCommerce",
    product: "eCommerce",
    file: "/brand/products/ecommerce/listaso-ecommerce.svg",
    variant: "metallic teal tile (embedded raster)",
    background: "any",
    status: "temporary",
    width: 141,
    height: 141,
    source: `${CUSTOM_IMPORT}/listaso-ecommerce.svg`,
    sha256: "c45a2ff74872",
    notes:
      "Kept as delivered (approved). 749 KB because it embeds a PNG; request a vector version. App vs Web variant not specified.",
  },
  {
    id: "product-van-sales",
    label: "Van Sales",
    product: "Van Sales",
    file: "/brand/products/van-sales/listaso-van-sales.svg",
    variant: "navy symbol, no tile",
    background: "light",
    status: "active",
    width: 141,
    height: 141,
    source: `${CUSTOM_IMPORT}/listaso-van-sales.svg`,
    sha256: "30ce44457d2c",
  },
  {
    id: "product-warehouse-inventory",
    label: "Warehouse Inventory",
    product: "Warehouse Inventory",
    file: "/brand/products/warehouse-inventory/listaso-warehouse-inventory.svg",
    variant: "pink tile",
    background: "any",
    status: "active",
    width: 141,
    height: 141,
    source: `${CUSTOM_IMPORT}/listaso-warehouse-inventory.svg`,
    sha256: "78203ee2d615",
  },

  // SAMI
  {
    id: "sami",
    label: "SAMI",
    product: "SAMI",
    file: "/brand/sami/sami.svg",
    variant: "glossy symbol (embedded raster)",
    background: "dark",
    status: "temporary",
    width: 1115,
    height: 1065,
    source: `${DOWNLOADS}/SAMI.svg`,
    sha256: "d5cf6c95e605",
    notes:
      "Kept as delivered (approved). 735 KB of embedded PNG; request a vector and a light-background version. Complements Listaso, never replaces it.",
  },

  {
    id: "sami-raster",
    label: "SAMI (lightweight)",
    product: "SAMI",
    file: "/brand/sami/sami-logo.webp",
    variant: "glossy symbol, 192 px WebP",
    background: "dark",
    status: "temporary",
    width: 192,
    height: 192,
    source: "start-version/website/assets/sami-logo.webp",
    sha256: "efdae7418d52",
    notes:
      "Same artwork as SAMI.svg at 17 KB instead of 735 KB (DEC-012: performance first). Use it up to 96 px; request a vector version.",
  },

  // Previous core lockups ("Listaso Technology"), kept unchanged as history.
  {
    id: "listaso-technology-horizontal-navy",
    label: "Listaso Technology — horizontal (previous)",
    product: "Listaso",
    file: "/brand/listaso/horizontal/listaso-technology-logo-horizontal-navy-outlined.svg",
    variant: "horizontal, navy wordmark",
    background: "light",
    status: "legacy",
    width: 826,
    height: 117,
    source: `${CUSTOM_IMPORT}/listaso-technology-logo-horizontal-navy-outlined.svg`,
    sha256: "24806623a4eb",
    notes: "Replaced by listaso-horizontal-navy on 19 October 2026. Do not use.",
  },
  {
    id: "listaso-technology-horizontal-white",
    label: "Listaso Technology — horizontal white (previous)",
    product: "Listaso",
    file: "/brand/listaso/horizontal/listaso-technology-logo-horizontal-white.svg",
    variant: "horizontal, white wordmark",
    background: "dark",
    status: "legacy",
    width: 826,
    height: 117,
    source: `${DOWNLOADS}/listaso-technology-logo-horizontal-white.svg`,
    sha256: "47f860c767fd",
    notes: "Replaced by listaso-horizontal-white on 19 October 2026. Do not use.",
  },
  {
    id: "listaso-technology-stacked-navy",
    label: "Listaso Technology — stacked (previous)",
    product: "Listaso",
    file: "/brand/listaso/stacked/listaso-technology-logo-stacked-navy.svg",
    variant: "stacked, navy wordmark",
    background: "light",
    status: "legacy",
    width: 569,
    height: 146,
    source: `${CUSTOM_IMPORT}/listaso-technology-logo-stacked-navy.svg`,
    sha256: "af954d10c2bb",
    notes: "Replaced by listaso-stacked-navy on 19 October 2026. Do not use.",
  },
  {
    id: "listaso-technology-stacked-white",
    label: "Listaso Technology — stacked white (previous)",
    product: "Listaso",
    file: "/brand/listaso/stacked/listaso-technology-logo-stacked-white.svg",
    variant: "stacked, white wordmark",
    background: "dark",
    status: "legacy",
    width: 569,
    height: 146,
    source: `${CUSTOM_IMPORT}/listaso-technology-logo-stacked-white.svg`,
    sha256: "7251f9b7ab21",
    notes: "Replaced by listaso-stacked-white on 19 October 2026. Do not use.",
  },

  // Historical inventory
  {
    id: "product-customer-order-catalog",
    label: "Customer Order Catalog",
    product: "Customer Order Catalog",
    file: "/brand/legacy/listaso-customer-order-catalog.svg",
    variant: "teal tile",
    background: "any",
    status: "discontinued",
    width: 141,
    height: 141,
    source: `${CUSTOM_IMPORT}/listaso-customer-order-catalog.svg`,
    sha256: "48d4915c475f",
    notes: "Being discontinued. Historical record only; do not present as a current product.",
  },
] as const satisfies readonly BrandAsset[];

export type BrandAssetId = (typeof brandAssets)[number]["id"];

/**
 * Delivered items that are not published, because their product or role
 * could not be confirmed, or because a vector equivalent already exists.
 */
export const unresolvedBrandAssets = [
  {
    source: `${CUSTOM_IMPORT}/listaso-van-sales-1.svg`,
    sha256: "f210bc29e35a",
    product: "unknown",
    status: "legacy",
    notes:
      "Glass-effect tri-color tile (850 KB embedded PNG). The name says Van Sales, but the artwork matches the guide's glass app icon. It may be Sales Advanced. Not published until Erick confirms.",
  },
  {
    source: "(no file delivered)",
    sha256: "",
    product: "Sales Advanced",
    status: "active",
    notes:
      "Erick confirmed listaso-sales = Sales Advanced, but no file with that name was delivered. Pending asset.",
  },
  {
    source: "~/Documents/LOGO-LISTASO.png",
    sha256: "cc405db8e5c9",
    product: "Listaso",
    status: "legacy",
    notes:
      "944×944 raster isotype, identical to LOGO-LISTASO.png on origin/main. Reference only; the SVG symbol replaces it.",
  },
] as const;

export function getBrandAsset(id: BrandAssetId) {
  const asset = brandAssets.find((entry) => entry.id === id);
  if (!asset) throw new Error(`Unknown brand asset: ${id}`);
  // Aliases point at another entry's id instead of a public path.
  if (!asset.file.startsWith("/")) {
    const target = brandAssets.find((entry) => entry.id === asset.file);
    if (!target) throw new Error(`Broken brand alias: ${id}`);
    return { ...asset, file: target.file };
  }
  return asset;
}
