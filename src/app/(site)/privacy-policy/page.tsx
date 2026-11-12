import { LegalPage } from "@/components/sections/legal/LegalPage";
import { legalDocuments } from "@/lib/legal-documents";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = {
  ...pageMetadata({ title: legalDocuments.privacy.label, description: legalDocuments.privacy.description, path: legalDocuments.privacy.path }),
  robots: { index: false, follow: false },
};

export default function PrivacyPolicyPage() {
  return <LegalPage documentKey="privacy" />;
}
