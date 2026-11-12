/** Home-only stock media. Never represents actual Listaso customers or software. */
export type HomePhoto = {
  base: string;
  sourceUrl: string;
  author: string;
  alt: string;
};

export const homeMediaLicense = {
  url: "https://www.pexels.com/license/",
  downloadedOn: "2026-11-10",
  status: "preview",
  notes: "Self-hosted responsive WebP images. Illustrative stock; device screens are not Listaso interfaces. Existing frames and copy are preserved.",
} as const;

function photo(name: string, slug: string, author: string, alt: string): HomePhoto {
  return { base: `/images/home/${name}`, sourceUrl: `https://www.pexels.com/photo/${slug}/`, author, alt };
}

export const homeWorkflowMedia = [
  photo("sales", "two-women-choosing-product-at-the-store-6925906", "Tom Tillhub", "Two people reviewing products on a tablet at a store counter"),
  {
    base: "/images/home/inventory",
    sourceUrl: "https://www.pexels.com/video/man-working-inside-the-warehouse-4292299/",
    author: "Tiger Lily",
    alt: "A warehouse worker preparing a box for dispatch",
    video: "/videos/home/warehouse-picking-4292299.mp4",
    notes: "First seven seconds, converted to 960×540 with macOS AVFoundation. Plays only while this workflow step is active and visible.",
  },
  photo("delivery", "customer-signing-in-cellphone-after-receiving-parcel-from-delivery-courier-6721914", "Kampus Production", "A customer signing for a delivery on a handheld device"),
  photo("office", "black-woman-working-with-documents-in-office-5668879", "Sora Shimazaki", "An office worker reviewing documents beside a laptop"),
] as const;

export const homeCapabilityMedia = [
  photo("ecommerce", "person-using-a-laptop-8939513", "Nataliya Vaitkevich", "A phone and laptop beside groceries illustrate online ordering"),
  photo("forms", "a-person-holding-smartphone-6115031", "cottonbro studio", "A person photographing a product display with a phone"),
  photo("integrations", "businessman-person-space-laptop-6779226", "Artem Podrez", "Accounting documents beside a laptop and calculator"),
  photo("industries", "assorted-vegetables-on-crates-1093837", "Min An", "Fresh produce arranged in crates at a food market"),
] as const;
