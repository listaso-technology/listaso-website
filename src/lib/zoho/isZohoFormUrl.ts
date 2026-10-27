export function getZohoFormId(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== "forms.zohopublic.com") return null;
    const match = url.pathname.match(/\/formperma\/([A-Za-z0-9_-]+)$/);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}
