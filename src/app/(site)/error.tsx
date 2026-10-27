"use client";

import { StatePage } from "@/components/sections/errors/StatePage";
import { Button } from "@/components/ui/Button";
import { serverError, stateLabels } from "@/content/site/error-pages";

/** Runtime error boundary for public pages; keeps the header and footer. */
export default function SiteError({
  error,
  unstable_retry,
}: Readonly<{ error: Error & { digest?: string }; unstable_retry: () => void }>) {
  return (
    <StatePage
      content={serverError}
      showSupport
      detail={error.digest ? `Reference: ${error.digest}` : undefined}
      actions={
        <Button size="lg" icon="refresh" onClick={() => unstable_retry()}>
          {stateLabels.retry}
        </Button>
      }
    />
  );
}
