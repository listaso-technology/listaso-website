import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  // Absolute base for canonical and Open Graph URLs (production domain).
  metadataBase: new URL("https://listaso.com"),
  title: { default: "Listaso", template: "%s | Listaso" },
  description: "Listaso website foundation.",
  robots: { index: false, follow: false },
};

type RootLayoutProps = Readonly<{ children: ReactNode }>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
