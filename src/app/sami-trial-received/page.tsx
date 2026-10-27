import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request received | Listaso",
  robots: { index: false, follow: false },
};

/**
 * Landing target of Zoho's redirect after a successful SAMI trial submission.
 * It loads inside a hidden iframe: the form reads this path to confirm Zoho
 * accepted the record, since Zoho's own response is cross-origin and unreadable.
 */
export default function SamiTrialReceivedPage() {
  return <p>Request received.</p>;
}
