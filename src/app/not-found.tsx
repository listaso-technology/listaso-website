import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { StatePage } from "@/components/sections/errors/StatePage";
import { notFound as content } from "@/content/site/error-pages";

export const metadata: Metadata = {
  title: `${content.eyebrow} | Listaso`,
  robots: { index: false, follow: false },
};

/** Exported as /404.html. It sits outside the (site) group, so it adds the shell itself. */
export default function NotFound() {
  return (
    <SiteShell>
      <StatePage content={content} showSuggestions showSupport />
    </SiteShell>
  );
}
