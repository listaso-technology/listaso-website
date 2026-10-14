// Review data for /foundation/. Values mirror src/styles/tokens.css and the
// listaso-design-system references; this file documents, it does not style.

export const primitives = [
  { name: "navy", variable: "--listaso-navy", hex: "#00375B" },
  { name: "ink", variable: "--listaso-ink", hex: "#151726" },
  { name: "blue", variable: "--listaso-blue", hex: "#0960FF" },
  { name: "aqua", variable: "--listaso-aqua", hex: "#00BDA9" },
  { name: "magenta", variable: "--listaso-magenta", hex: "#FF3A6A" },
  { name: "red", variable: "--listaso-red", hex: "#DA415D" },
  { name: "green", variable: "--listaso-green", hex: "#03EA78" },
  { name: "yellow", variable: "--listaso-yellow", hex: "#FFC801" },
  { name: "neutral", variable: "--listaso-neutral", hex: "#DFDFDF" },
] as const;

export const semanticTokens = [
  { token: "surface.page", utility: "bg-surface-page", light: "#FFFFFF", dark: "#0D1222" },
  { token: "surface.alt", utility: "bg-surface-alt", light: "#F5F8FB", dark: "#151B2E" },
  { token: "surface.soft", utility: "bg-surface-soft", light: "#E9F3F6", dark: "#14243A" },
  { token: "surface.raised", utility: "bg-surface-raised", light: "#FFFFFF", dark: "#151B2E" },
  { token: "surface.band", utility: "bg-surface-band", light: "#00375B", dark: "#00375B" },
  { token: "text.default", utility: "text-fg-default", light: "#151726", dark: "#E7ECF4" },
  { token: "text.muted", utility: "text-fg-muted", light: "#4A5569", dark: "#A4AFC3" },
  { token: "text.heading", utility: "text-fg-heading", light: "#00375B", dark: "#FFFFFF" },
  { token: "text.accent", utility: "text-fg-accent", light: "#007267", dark: "#3FD9C6" },
  { token: "text.on-band-muted", utility: "(band context)", light: "#B9CBE0", dark: "#B9CBE0" },
  { token: "icon.accent", utility: "text-icon-accent", light: "#008476", dark: "#3FD9C6" },
  { token: "link", utility: "text-link", light: "#0960FF", dark: "#5C93FF" },
  { token: "link.hover", utility: "text-link-hover", light: "#0050E6", dark: "#8DB3FF" },
  { token: "link.on-band", utility: "(band context)", light: "#5FE6D6", dark: "#5FE6D6" },
  { token: "action.primary.bg", utility: "bg-action-primary", light: "#D83553", dark: "#D83553" },
  { token: "action.primary.hover", utility: "bg-action-primary-hover", light: "#BF2A47", dark: "#BF2A47" },
  { token: "border.subtle", utility: "border-line-subtle", light: "#DCE3EC", dark: "#283149" },
  { token: "border.control", utility: "border-line-control", light: "#7A889B", dark: "#6B7894" },
  { token: "focus.ring", utility: "outline (global)", light: "#0960FF", dark: "#70D4FF" },
  { token: "status.success", utility: "bg-status-success", light: "#03EA78", dark: "#03EA78" },
  { token: "status.warning", utility: "bg-status-warning", light: "#FFC801", dark: "#FFC801" },
  { token: "status.error", utility: "text-status-error", light: "#B8243F", dark: "#FF8095" },
] as const;

export const typeScale = [
  { role: "Display", className: "text-display", spec: "clamp(40px, 5vw + 1rem, 72px) / 1.1" },
  { role: "H1", className: "text-h1", spec: "clamp(36px, 4vw + 1rem, 56px) / 1.15" },
  { role: "H2", className: "text-h2", spec: "clamp(32px, 3vw + 1rem, 48px) / 1.2" },
  { role: "H3", className: "text-h3 font-semibold", spec: "24px / 32px" },
  { role: "H4", className: "text-h4 font-semibold", spec: "20px / 28px" },
  { role: "Lead", className: "text-lead", spec: "20px / 32px" },
  { role: "Body large", className: "text-body-lg", spec: "18px / 28px" },
  { role: "Body", className: "text-body", spec: "16px / 24px" },
  { role: "Small", className: "text-small", spec: "14px / 20px" },
  { role: "Eyebrow", className: "text-eyebrow font-bold uppercase", spec: "14px / 20px, tracking .12em" },
  { role: "Caption", className: "text-caption", spec: "12px / 16px" },
] as const;

export const radii = [
  { name: "xs", className: "rounded-xs", px: 4 },
  { name: "sm", className: "rounded-sm", px: 8 },
  { name: "md", className: "rounded-md", px: 16 },
  { name: "lg", className: "rounded-lg", px: 24 },
  { name: "xl", className: "rounded-xl", px: 32 },
  { name: "full", className: "rounded-full", px: 9999 },
] as const;

export const elevations = [
  { name: "e0", className: "border border-line-subtle", spec: "none + border" },
  { name: "e1", className: "shadow-e1", spec: "0 1px 2px / 0 4px 8px, navy 6%" },
  { name: "e2", className: "shadow-e2", spec: "0 8px 24px, navy 12%" },
  { name: "e3", className: "shadow-e3", spec: "0 24px 64px, navy 20%" },
] as const;

export const motionTokens = [
  { name: "fast", variable: "--listaso-duration-fast", value: "150ms" },
  { name: "standard", variable: "--listaso-duration-standard", value: "250ms" },
  { name: "slow", variable: "--listaso-duration-slow", value: "400ms" },
  { name: "ease", variable: "--listaso-ease-standard", value: "cubic-bezier(0.2, 0, 0, 1)" },
] as const;
