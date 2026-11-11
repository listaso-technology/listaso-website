"use client";

import { usePathname } from "next/navigation";

/** Keep the page-specific editorial update out of other routes. */
export function FormsProductLabel({ fallback }: { fallback: string }) {
  const pathname = usePathname();
  return pathname === "/forms" || pathname === "/forms/" ? "Forms and Surveys" : fallback;
}
