import { SystemPage } from "@/components/sections/integrations/SystemPage";
import { sectionMedia } from "@/content/media/sections";
import { getIntegrationSystem } from "@/content/integrations/systems";
import { pageMetadata } from "@/lib/page-metadata";

// Content, sources and viability notes: docs/INTEGRATIONS_CONTENT_CONTRACT.md.
const system = getIntegrationSystem("zoho");

export const metadata = pageMetadata({ ...system.metadata, path: system.path });

export default function ZohoPage() {
  return <SystemPage slug="zoho" photo={sectionMedia.storeCounter} />;
}
