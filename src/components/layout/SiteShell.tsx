import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { headerLabels } from "@/content/site/navigation";

/** Skip link, header, main landmark and footer shared by every public page. */
export function SiteShell({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-surface-page focus:px-6 focus:py-3 focus:text-body focus:font-semibold focus:text-fg-heading focus:shadow-e3"
      >
        {headerLabels.skipToContent}
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
