import { SystemPage } from "@/components/sections/integrations/SystemPage";
import { sectionMedia } from "@/content/media/sections";
import { getIntegrationSystem } from "@/content/integrations/systems";
import { pageMetadata } from "@/lib/page-metadata";

// Content, sources and viability notes: docs/INTEGRATIONS_CONTENT_CONTRACT.md.
const system = getIntegrationSystem("sap");

export const metadata = pageMetadata({ ...system.metadata, path: system.path });

export default function SapPage() {
  return <SystemPage slug="sap" photo={sectionMedia.highwayAerial} />;
}
