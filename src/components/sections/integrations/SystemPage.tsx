import type { ComponentType } from "react";
import { getIntegrationSystem, systemPageCopy, type IntegrationSlug, type IntegrationSystem } from "@/content/integrations/systems";
import { FinalCta } from "../home/FinalCta";
import { HomeMotion } from "../home/HomeMotion";
import { IntegrationsBand } from "../product/IntegrationsBand";
import { NextPage } from "../variants/NextPage";
import type { AnyPhoto } from "../variants/HeroParts";
import { AccountMateLayout } from "./pages/AccountMateLayout";
import { AcctivateLayout } from "./pages/AcctivateLayout";
import { AcumaticaLayout } from "./pages/AcumaticaLayout";
import { NetSuiteLayout } from "./pages/NetSuiteLayout";
import { QuickBooksLayout } from "./pages/QuickBooksLayout";
import { SageLayout } from "./pages/SageLayout";
import { SapLayout } from "./pages/SapLayout";
import { ZohoLayout } from "./pages/ZohoLayout";

export type SystemLayoutProps = { system: IntegrationSystem; photo: AnyPhoto };

type SystemPageProps = {
  slug: IntegrationSlug;
  /** Photo for the page (placeholder, DEC-009). */
  photo: AnyPhoto;
};

/**
 * Each accounting integration has its own composition (hero, sync view and
 * features format) so the eight pages read as distinct places; all of them
 * show the same kinds of content: hero copy and photo, the sync panel, the
 * summary, every sync row with its direction and every feature. The closing
 * sections (other systems, next integration, CTA) are shared.
 */
const LAYOUTS: Record<IntegrationSlug, ComponentType<SystemLayoutProps>> = {
  quickbooks: QuickBooksLayout,
  sage: SageLayout,
  acumatica: AcumaticaLayout,
  sap: SapLayout,
  netsuite: NetSuiteLayout,
  zoho: ZohoLayout,
  acctivate: AcctivateLayout,
  accountmate: AccountMateLayout,
};

/** Tone of the "other systems" band, so it contrasts with the section above it. */
const TAIL_TONE: Record<IntegrationSlug, "page" | "alt"> = {
  quickbooks: "alt",
  sage: "alt",
  acumatica: "page",
  sap: "page",
  netsuite: "page",
  zoho: "alt",
  acctivate: "alt",
  accountmate: "page",
};

export function SystemPage({ slug, photo }: SystemPageProps) {
  const system = getIntegrationSystem(slug);
  const Layout = LAYOUTS[slug];

  return (
    <>
      <Layout system={system} photo={photo} />
      <IntegrationsBand tone={TAIL_TONE[slug]} copy={systemPageCopy.more} cta={systemPageCopy.moreCta} exclude={system.path} />
      <NextPage group="Integrations" current={system.path} />
      <FinalCta />
      <HomeMotion />
    </>
  );
}
