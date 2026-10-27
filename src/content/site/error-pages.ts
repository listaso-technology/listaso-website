/**
 * Copy for error and warning pages (English). Generic interface text: it makes
 * no product or commercial claims. Contact data comes from navigation.ts.
 */
import type { IconName } from "@/components/icons/Icon";

export type StatePageContent = {
  /** Status code shown as the large numeral. */
  code: string;
  eyebrow: string;
  title: string;
  lead: string;
  icon: IconName;
  /** `warning` for recoverable states, `error` for failures. */
  tone: "warning" | "error";
};

export const stateLabels = {
  home: "Back to home",
  retry: "Try again",
  contactSupport: "Contact support",
  suggestedTitle: "Where would you like to go?",
  statusCode: "Status code",
} as const;

export const suggestedLinks = [
  { href: "/", label: "Home", description: "Start from the beginning" },
  { href: "/pre-sales/", label: "Products", description: "See what Listaso does" },
  { href: "/plans/", label: "Plans", description: "Compare pricing" },
  { href: "/support/", label: "Support", description: "Get help from our team" },
] as const;

export const notFound: StatePageContent = {
  code: "404",
  eyebrow: "Page not found",
  title: "We can't find that page.",
  lead: "The link may be broken or the page may have moved. Check the address, or pick one of the options below.",
  icon: "search",
  tone: "warning",
};

export const unauthorized: StatePageContent = {
  code: "401",
  eyebrow: "Sign-in required",
  title: "You need to sign in to continue.",
  lead: "This page is only available to signed-in users. Sign in with your Listaso account and try again.",
  icon: "lock",
  tone: "warning",
};

export const forbidden: StatePageContent = {
  code: "403",
  eyebrow: "Access denied",
  title: "You don't have access to this page.",
  lead: "Your account doesn't have permission to view this content. If you think this is a mistake, contact support.",
  icon: "security",
  tone: "error",
};

export const tooManyRequests: StatePageContent = {
  code: "429",
  eyebrow: "Too many requests",
  title: "Slow down for a moment.",
  lead: "We received too many requests from your connection. Wait a few minutes and try again.",
  icon: "history",
  tone: "warning",
};

export const serverError: StatePageContent = {
  code: "500",
  eyebrow: "Something went wrong",
  title: "We hit an unexpected problem.",
  lead: "It's on our side, not yours. Try again in a moment. If it keeps happening, let our support team know.",
  icon: "error",
  tone: "error",
};

export const unavailable: StatePageContent = {
  code: "503",
  eyebrow: "Temporarily unavailable",
  title: "We'll be right back.",
  lead: "The site is down for maintenance or is handling more traffic than usual. Please try again shortly.",
  icon: "refresh",
  tone: "warning",
};
