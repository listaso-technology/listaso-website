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
  downloadedOn = "2026-10-13",
): SectionPhoto => ({
  base: `/images/sections/${base}`,
  width: 1920,
  height: 1280,
  alt,
  unsplashUrl: `https://unsplash.com/photos/${unsplashId}`,
  photographer,
  photographerUrl: `https://unsplash.com/@${username}`,
  downloadedOn,
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
  industryFlowers: slot(
    "industry-flowers",
    "Buckets of tulips on a wooden table",
    "B26usF-2A3k",
    "Robert | Visual Diary",
    "robert_lens",
    "Flower distributor preparing same-day orders; buckets and wrapped bouquets.",
    "2026-10-14",
  ),
  industryWine: slot(
    "industry-wine",
    "Rows of wine barrels in a cellar",
    "27G8PF-fjrs",
    "David Goldman",
    "davidjessephoto",
    "Wine and spirits distributor stock; no readable labels or brands.",
    "2026-10-14",
  ),
  industryTires: slot(
    "industry-tires",
    "Stacks of car tires",
    "WHPOFFzY9gU",
    "Robert Laursoo",
    "robineero",
    "Auto parts or tire distributor stock; no visible brand names.",
    "2026-10-14",
  ),
  industryPackaging: slot(
    "industry-packaging",
    "A pile of brown cardboard boxes with tape",
    "qO2ztAz5g7A",
    "Rohit Choudhari",
    "iamrohitchoudhari",
    "Paper, packaging and janitorial supplies staged for delivery.",
    "2026-10-14",
  ),
  industryHousewares: slot(
    "industry-housewares",
    "Stainless steel cookware on a kitchen shelf",
    "W1BG159xt5Q",
    "Adam Dachis",
    "awkwardhuman",
    "Housewares distributor products; cookware without visible brands.",
    "2026-10-14",
  ),
  industryBeauty: slot(
    "industry-beauty",
    "An amber glass bottle with a blank label",
    "gdUxNykbuZc",
    "Katrin Hauf",
    "trine",
    "Health and beauty products with blank or Listaso-safe labels.",
    "2026-10-14",
  ),
  officeMiami: slot(
    "office-miami",
    "The Miami skyline across the water at sunset",
    "KTdzeb28jyo",
    "Muzammil Soorma",
    "muzammilo",
    "Miami office context (Rickenbacker Causeway view). Replace with the real office or team when approved.",
    "2026-10-14",
  ),
  officeElSalvador: slot(
    "office-el-salvador",
    "San Salvador at sunset with a volcano in the background",
    "cCXoS9uAKbc",
    "Oswaldo Martinez",
    "oemartinez",
    "El Salvador office context (San Salvador). Replace with the real office or team when approved.",
    "2026-10-14",
  ),
} as const satisfies Record<string, SectionPhoto>;

export type SectionMediaId = keyof typeof sectionMedia;
