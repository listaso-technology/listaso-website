import type { Metadata } from "next";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Path with trailing slash, e.g. "/pre-sales/". */
  path: string;
};

const SITE_NAME = "Listaso";
const ORIGIN = "https://listaso.com";

/**
 * Metadata for an English public page, following the Homepage pattern:
 * absolute title, canonical on the production domain and basic Open Graph.
 * Indexing stays blocked by the root layout (DEC-006); no hreflang until a
 * Spanish pair exists.
 */
export function pageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const url = `${ORIGIN}${path}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title,
      description,
      locale: "en_US",
    },
  };
}
