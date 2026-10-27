import type { ReactNode } from "react";
import { SiteShell } from "@/components/layout/SiteShell";

/**
 * Shell for the public site pages. The (site) route group does not change
 * URLs; it keeps internal pages such as /foundation/ outside the public shell.
 */
export default function SiteLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <SiteShell>{children}</SiteShell>;
}
