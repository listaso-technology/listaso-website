import { LegalPage } from "@/components/sections/legal/LegalPage";
import { legalDocuments } from "@/lib/legal-documents";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = {
  ...pageMetadata({ title: legalDocuments.subscription.label, description: legalDocuments.subscription.description, path: legalDocuments.subscription.path }),
  robots: { index: false, follow: false },
};

export default function SubscriptionAgreementPage() {
  return <LegalPage documentKey="subscription" />;
}
