"use client";

import { useEffect, useRef, useState } from "react";
import { getZohoFormId } from "@/lib/zoho/isZohoFormUrl";

const INITIAL_HEIGHT = 900;

type SamiZohoEmbedProps = {
  formUrl: string;
};

/** Zoho's iframe embed with its resize message scoped to this form and origin. */
export function SamiZohoEmbed({ formUrl }: SamiZohoEmbedProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(INITIAL_HEIGHT);
  const [loadFailed, setLoadFailed] = useState(false);
  const formId = getZohoFormId(formUrl);

  useEffect(() => {
    if (!formId) return;
    const formOrigin = new URL(formUrl).origin;

    const onMessage = (event: MessageEvent) => {
      if (
        event.origin !== formOrigin ||
        event.source !== frameRef.current?.contentWindow ||
        typeof event.data !== "string"
      ) return;

      const parts = event.data.split("|");
      if ((parts.length !== 2 && parts.length !== 3) || parts[0] !== formId || !/^\d+$/.test(parts[1])) return;

      const nextHeight = Number(parts[1]) + 15;
      if (nextHeight >= 250 && nextHeight <= 5000) setHeight(nextHeight);
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [formId, formUrl]);

  if (!formId) {
    return (
      <p role="status" className="border-t border-line-subtle pt-6 text-body text-fg-muted">
        The Zoho form is not configured yet. This preview is not accepting requests.
      </p>
    );
  }

  return (
    <div className="min-w-0 border-t border-line-subtle pt-6">
      <p className="pb-4 text-small text-fg-muted">
        Having trouble filling out the form? {" "}
        <a className="font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-focus-ring" href={formUrl} target="_blank" rel="noopener noreferrer">
          Open it in a new tab
        </a>
        .
      </p>
      <iframe
        ref={frameRef}
        src={formUrl}
        title="Start Your 14-Day SAMI Free Trial"
        aria-label="Start Your 14-Day SAMI Free Trial"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        onError={() => setLoadFailed(true)}
        className="block w-full border-0 rounded-md transition-[height] duration-500 motion-reduce:transition-none"
        style={{ height }}
      />
      {loadFailed ? (
        <p role="alert" className="pt-4 text-body text-fg-muted">
          The form could not be loaded.
        </p>
      ) : null}
    </div>
  );
}
