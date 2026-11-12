/**
 * Stock photography used only by /pre-sales/. It illustrates generic field
 * sales workflows and never represents a Listaso customer or interface.
 */
export type PreSalesPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  sourceUrl: string;
  photographer: string;
  licenseUrl: string;
  downloadedOn: string;
  status: "replaced";
  designBrief: string;
};

const pexelsLicense = "https://www.pexels.com/license/";
const downloadedOn = "2026-11-10";

function photo(
  src: string,
  width: number,
  height: number,
  alt: string,
  slug: string,
  photographer: string,
  designBrief: string,
): PreSalesPhoto {
  return {
    src,
    width,
    height,
    alt,
    sourceUrl: `https://www.pexels.com/photo/${slug}/`,
    photographer,
    licenseUrl: pexelsLicense,
    downloadedOn,
    status: "replaced",
    designBrief,
  };
}

export const preSalesMedia = {
  hero: photo(
    "/images/products/pre-sales/hero-tablet-store.webp",
    1000,
    1250,
    "Two people reviewing products and an order on a tablet at a store counter",
    "two-women-choosing-product-at-the-store-6925906",
    "Tom Tillhub",
    "A field rep and store customer reviewing a product catalog on a tablet; warm retail context with no visible third-party brands.",
  ),
  catalog: photo(
    "/images/products/pre-sales/catalog-display.webp",
    1280,
    960,
    "A person using a phone to photograph products on a store display",
    "a-person-holding-smartphone-6115031",
    "cottonbro studio",
    "A representative documenting a product display during a store visit.",
  ),
  payment: photo(
    "/images/products/pre-sales/payment-signature.webp",
    1280,
    960,
    "A customer signing on a handheld device after a delivery",
    "customer-signing-in-cellphone-after-receiving-parcel-from-delivery-courier-6721914",
    "Kampus Production",
    "A customer confirming a transaction on a handheld device; no visible third-party branding.",
  ),
  visitOrder: photo(
    "/images/products/pre-sales/visit-order-tablet.webp",
    1280,
    960,
    "Two people using a tablet to review products at a store counter",
    "women-looking-at-products-on-a-tablet-6925907",
    "Tom Tillhub",
    "A sales rep building an order with a customer from a digital catalog.",
  ),
  visitOffice: photo(
    "/images/products/pre-sales/visit-office-orders.webp",
    1280,
    960,
    "An office worker reviewing order documents beside a laptop",
    "black-woman-working-with-documents-in-office-5668879",
    "Sora Shimazaki",
    "Back-office review of order information after a field visit.",
  ),
} as const satisfies Record<string, PreSalesPhoto>;

/** Existing local Pexels clip, used as an illustrative warehouse handoff. */
export const preSalesVideo = {
  src: "/videos/home/warehouse-picking-4292299.mp4",
  sourceUrl: "https://www.pexels.com/video/man-working-inside-the-warehouse-4292299/",
  photographer: "Tiger Lily",
  licenseUrl: pexelsLicense,
  downloadedOn,
  notes: "First seven seconds; loaded only when the final visit step is active and not shown with reduced motion.",
} as const;
