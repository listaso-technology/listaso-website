/**
 * Editorial stills selected by Marketing from Magnific's free-video catalog.
 *
 * The site uses the supplied poster frame in this phase so page media stays
 * static and respects reduced-motion preferences. The original clips remain
 * registered per asset for the later motion pass; no video is autoplayed here.
 */
export type MagnificPhoto = {
  src: string;
  width: 740;
  height: 416;
  alt: string;
  sourceUrl: string;
  sourceTitle: string;
  downloadedOn: "2026-11-10";
  usage: "static-poster";
  licenseNote: "Source supplied by Marketing; confirm Magnific terms before production release.";
};

const downloadedOn = "2026-11-10" as const;
const source = "https://www.magnific.com/free-video/";

function photo(name: string, slug: string, sourceTitle: string, alt: string): MagnificPhoto {
  return {
    src: `/images/magnific/${name}.jpg`,
    width: 740,
    height: 416,
    alt,
    sourceUrl: `${source}${slug}`,
    sourceTitle,
    downloadedOn,
    usage: "static-poster",
    licenseNote: "Source supplied by Marketing; confirm Magnific terms before production release.",
  };
}

/** Kept in the order supplied by Marketing. Every assignment is unique. */
export const magnificMedia = {
  designerLaptop: photo("designer-laptop", "caucasian-designer-man-eyeglasses-working-laptop-while-sitting-desk-clothing-shop-warehouse_472127", "Caucasian designer man in eyeglasses working on laptop while sitting at desk in clothing shop warehouse", "A worker using a laptop in a warehouse workspace"),
  warehouseInspector: photo("warehouse-inspector", "serious-safety-inspector-checking-warehouse-with-female-worker_478947", "Serious safety inspector checking warehouse with female worker", "Two workers reviewing an area of a warehouse"),
  vanDriver: photo("van-driver", "portrait-male-van-driver-with-warehouse-delivery_1901022", "Portrait of a male van driver with a warehouse delivery", "A delivery driver at a warehouse"),
  warehouseTeamA: photo("warehouse-team-a", "warehouse-workers-working-together_3108657", "Warehouse workers working together", "Warehouse workers coordinating an order"),
  warehouseTeamB: photo("warehouse-team-b", "warehouse-workers-working-together_3108689", "Warehouse workers working together", "Workers collaborating in a warehouse"),
  supervisorWorker: photo("supervisor-worker", "boss-giving-instructions-worker_1914157", "Boss giving instructions to a worker", "A supervisor and worker discussing an operation"),
  packingBox: photo("packing-box", "warehouse-worker-wearing-helmet-reflective-vest-seals-box-with-duct-tape-blurred-background-woman-is-placing-cardboard-boxes-shelf_170043", "Warehouse worker seals a box while another worker stocks shelves", "A worker sealing a shipment box in a warehouse"),
  warehouseColleagues: photo("warehouse-colleagues", "young-female-male-worker-warehouse_1901005", "Young female male worker in a warehouse", "Two warehouse colleagues during an operation"),
  stockWorker: photo("stock-worker", "focused-african-american-female-employee-working-warehouse-rearranging-cardboard-boxes_478964", "Focused African American female employee working in warehouse and rearranging cardboard boxes", "A worker organizing stock in a warehouse"),
  officeTeam: photo("office-team", "two-female-online-shop-workers-talking-office_477755", "Two female online shop workers talking in office", "Two colleagues reviewing work in an office"),
  clipboardVisit: photo("clipboard-visit", "young-woman-writing-clipboard_1194982", "Young woman writing on a clipboard", "A worker documenting a visit on a clipboard"),
  warehouseStairs: photo("warehouse-stairs", "two-warehouse-workers-talking-stairs-warehouse-4k_2555637", "Two warehouse workers talking on the stairs in a warehouse", "Two warehouse workers coordinating on stairs"),
  tabletFactory: photo("tablet-factory", "caucasian-male-worker-wearing-helmet-using-tablet-looking-around-factory_473919", "Caucasian male worker wearing a helmet using a tablet and looking around in a factory", "A worker checking operations on a tablet"),
  warehouseCollaboration: photo("warehouse-collaboration", "warehouse-worker-working-interacting-with-each-other_2744152", "Warehouse worker working and interacting with each other", "Warehouse workers collaborating on an order"),
  warehousePortrait: photo("warehouse-portrait", "portrait-man-working-warehouse-4k_2555620", "Portrait of man working in a warehouse", "A warehouse worker during an operation"),
  vanBoxes: photo("van-boxes", "rear-view-delivery-man-picking-up-cardboard-boxes-from-van-street_170099", "Rear View Of A Delivery Man Picking Up Cardboard Boxes From A Van On The Street", "A delivery worker collecting boxes from a van"),
  onionUnloading: photo("onion-unloading", "unloading-onions-from-sack-truck_28858", "Unloading Onions From Sack Truck", "A worker unloading fresh produce from a hand truck"),
  workerTablet: photo("worker-tablet", "african-american-male-car-mechanic-standing-warehouse-using-tablet_1928255", "African American male car mechanic standing in a warehouse and using a tablet", "A warehouse worker using a tablet"),
  barcodeScan: photo("barcode-scan", "scanning-barcode-box-warehouse_1901011", "Scanning a barcode on a box in a warehouse", "A worker scanning a barcode on a box"),
  clipboardWarehouse: photo("clipboard-warehouse", "woman-writing-clipboard_2817352", "Woman writing on clipboard", "A worker recording warehouse information on a clipboard"),
  supervisorTablet: photo("supervisor-tablet", "close-up-boss-female-employee-talking-warehouse-checking-documents-tablet_478953", "Close up of boss and female employee talking in warehouse, checking documents on tablet", "Two colleagues reviewing documents on a tablet in a warehouse"),
} as const satisfies Record<string, MagnificPhoto>;
