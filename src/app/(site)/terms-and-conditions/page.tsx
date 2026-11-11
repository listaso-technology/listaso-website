import { LegalPage } from "@/components/sections/legal/LegalPage";
import { legalDocuments } from "@/lib/legal-documents";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = {
  ...pageMetadata({ title: legalDocuments.terms.label, description: legalDocuments.terms.description, path: legalDocuments.terms.path }),
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return <LegalPage documentKey="terms" />;
}
