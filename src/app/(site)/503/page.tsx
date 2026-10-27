import type { Metadata } from "next";
import { StatePage } from "@/components/sections/errors/StatePage";
import { unavailable as content } from "@/content/site/error-pages";

export const metadata: Metadata = {
  title: `${content.eyebrow} | Listaso`,
  robots: { index: false, follow: false },
};

export default function Page() {
  return <StatePage content={content} showSupport />;
}
