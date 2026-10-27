"use client";

import "./globals.css";
import { StatePage } from "@/components/sections/errors/StatePage";
import { Button } from "@/components/ui/Button";
import { serverError, stateLabels } from "@/content/site/error-pages";

/**
 * Last-resort boundary: replaces the root layout, so it renders its own html
 * and body without the site header or footer.
 */
export default function GlobalError({
  error,
  unstable_retry,
}: Readonly<{ error: Error & { digest?: string }; unstable_retry: () => void }>) {
  return (
    <html lang="en">
      <body>
        <main id="main">
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
        </main>
      </body>
    </html>
  );
}
