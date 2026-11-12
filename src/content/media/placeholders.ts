/**
 * Temporary photography registry (DEC-009).
 *
 * These files are self-hosted, optimized placeholders. They describe generic
 * operating environments and never represent a Listaso customer, employee or
 * documented deployment.
 */
/** Pexels footage selected by Erick for the Home hero preview, 9 Nov 2026. */
export const homeHeroVideo = {
  src: "/videos/home/warehouse-scanning-4292903.mp4",
  poster: "/images/home/warehouse-scanning-4292903.webp",
  alt: "A warehouse worker scanning stocked products with a handheld barcode scanner",
  sourceUrl: "https://www.pexels.com/video/man-scanning-the-codes-of-the-stocks-in-the-warehouse-4292903/",
  author: "Tiger Lily",
  licenseUrl: "https://www.pexels.com/license/",
  downloadedOn: "2026-11-09",
  width: 1280,
  height: 720,
  status: "preview",
  notes: "Self-hosted 720p conversion via macOS AVFoundation. Illustrative stock footage, not a Listaso deployment. Center crop retains the scanner within the unchanged 4:5 hero frame.",
} as const;

export const homeMedia = {
  heroWarehouse: {
    src: "/images/home/warehouse-aisle.webp",
    width: 1000,
    height: 1250,
    alt: "A warehouse aisle lined with inventory shelving",
    unsplashUrl: "https://unsplash.com/photos/M7G_m5XJ-go",
    photographer: "Russ Murray",
    photographerUrl: "https://unsplash.com/@rmurrayphoto",
    downloadedOn: "2026-10-12",
    status: "placeholder",
    designBrief:
      "Real distribution environment with strong depth and clear aisle geometry; replace with a Listaso customer operation without visible third-party brands.",
  },
  operationsShelving: {
    src: "/images/home/operations-shelving.webp",
    width: 960,
    height: 640,
    alt: "Industrial storage shelving inside a distribution facility",
    unsplashUrl: "https://unsplash.com/photos/rN6zOBGSZjM",
    photographer: "Adrien Olichon",
    photographerUrl: "https://unsplash.com/@adrienolichon",
    downloadedOn: "2026-10-12",
    status: "placeholder",
    designBrief:
      "Wide operational scene with layered shelving and neutral materials; replace with an active Listaso warehouse workflow.",
  },
} as const;
