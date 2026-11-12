"use client";

import { usePathname } from "next/navigation";

/** The approved spelling applies only on BackOffice; other pages keep their copy. */
export function BackOfficeFooterLabel({ fallback }: { fallback: string }) {
  const pathname = usePathname();
  return pathname === "/back-office" || pathname === "/back-office/" ? "BackOffice" : fallback;
}
