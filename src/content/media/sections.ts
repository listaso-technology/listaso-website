/**
 * Temporary section photography (DEC-009), served responsively.
 *
 * Each slot has three self-hosted WebP widths named `<base>-<width>.webp`
 * (768, 1280 and 1920 px, 3:2), so `ResponsivePhoto` can offer a real
 * `srcset` in the static export. Free Unsplash License only (checked through
 * each photo's download endpoint on 2026-10-13); crops avoid visible
 * third-party brands. Never presented as a Listaso customer or deployment.
 */
export const SECTION_WIDTHS = [768, 1280, 1920] as const;

export type SectionPhoto = {
  base: string;
  /** Intrinsic size of the largest file. */
  width: 1920;
  height: 1280;
  alt: string;
  unsplashUrl: string;
  photographer: string;
  photographerUrl: string;
  downloadedOn: string;
  status: "placeholder" | "requested" | "replaced";
  designBrief: string;
};

const slot = (
  base: string,
  alt: string,
  unsplashId: string,
  photographer: string,
  username: string,
  designBrief: string,
): SectionPhoto => ({
  base: `/images/sections/${base}`,
  width: 1920,
  height: 1280,
  alt,
  unsplashUrl: `https://unsplash.com/photos/${unsplashId}`,
  photographer,
  photographerUrl: `https://unsplash.com/@${username}`,
  downloadedOn: "2026-10-13",
  status: "placeholder",
  designBrief,
});

export const sectionMedia = {
  storeCounter: slot(
    "store-counter",
    "Two shop owners standing behind their store counter",
    "uRnRa8XXtrI",
    "Vitaly Gariev",
    "silverkblack",
    "A Listaso customer's store: owner at the counter receiving a rep's visit.",
  ),
  truckMountain: slot(
    "truck-mountain",
    "A delivery truck on an open road",
    "OVKRxZub9f4",
    "Joseph Corl",
    "jcorl",
    "A route truck on the way to the next store, wide and calm.",
  ),
  highwayAerial: slot(
    "highway-aerial",
    "Aerial view of a truck driving on a highway",
    "lZZ_yiDelrA",
    "Bernd Dittrich",
    "hdbernd",
    "Aerial route shot of a distributor's truck; reads as a map from above.",
  ),
  accountingDesk: slot(
    "accounting-desk",
    "Hands using a calculator next to a keyboard on an office desk",
    "JhevWHCbVyw",
    "Towfiqu barbhuiya",
    "towfiqu999999",
    "Office team reconciling invoices and payments; accounting system on screen.",
  ),
  warehouseAerial: slot(
    "warehouse-aerial",
    "Aerial view of a warehouse floor filled with crates and shelving",
    "sczNLg6rrhQ",
    "Adrian Sulyok",
    "sulyok_imaging",
    "Distribution warehouse from above, organized aisles and staged orders.",
  ),
  warehouseRacks: slot(
    "warehouse-racks",
    "Pallet racks stacked with boxes, seen from below",
    "DU2ybvshovg",
    "Ali Mkumbwa",
    "mkumbwajr",
    "Tall racks with labeled lots; strong geometry, no readable brands.",
  ),
  tabletWarehouse: slot(
    "tablet-warehouse",
    "Gloved hands holding a tablet inside a warehouse",
    "hwiKaoCIGbo",
    "Toon Lambrechts",
    "mycellhub",
    "Warehouse worker checking a pick list or form on a rugged tablet.",
  ),
  codeLaptop: slot(
    "code-laptop",
    "A laptop screen showing code",
    "8qEB0fTe9Vw",
    "Mohammad Rahmani",
    "afgprogrammer",
    "Listaso developers building a custom report or integration.",
  ),
  officeCharts: slot(
    "office-charts",
    "A person working on a laptop that shows sales charts",
    "KNQUEQwTCY4",
    "Apex Virtual Education",
    "apexvirtualeducation",
    "Back Office dashboard on a real desk; the same source as the product hero, wide crop.",
  ),
} as const satisfies Record<string, SectionPhoto>;

export type SectionMediaId = keyof typeof sectionMedia;
