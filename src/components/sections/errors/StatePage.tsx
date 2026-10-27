import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/icons/Icon";
import { Button } from "@/components/ui/Button";
import { stateLabels, suggestedLinks, type StatePageContent } from "@/content/site/error-pages";
import { contact } from "@/content/site/navigation";
import { cx } from "@/lib/utils/cx";

type StatePageProps = {
  content: StatePageContent;
  /** Replaces the default "Back to home" action, e.g. a retry button. */
  actions?: ReactNode;
  /** Shows the suggested destinations (useful for 404). */
  showSuggestions?: boolean;
  /** Shows the support contact link. */
  showSupport?: boolean;
  /** Small technical detail such as an error digest. */
  detail?: string;
};

const toneStyles = {
  warning: "bg-status-warning text-fg-on-status",
  error: "bg-status-error text-fg-on-error",
} as const;

/**
 * Full-width status page for HTTP and runtime states. The numeral is decorative
 * and hidden from screen readers; the code is also exposed in the eyebrow text.
 */
export function StatePage({ content, actions, showSuggestions = false, showSupport = false, detail }: StatePageProps) {
  return (
    <section aria-labelledby="state-title" className="py-16 lg:py-24">
      <Container width="wide" className="flex flex-col gap-12">
        <div className="relative flex max-w-4xl flex-col gap-6">
          <span
            aria-hidden="true"
            className="pointer-events-none select-none text-[clamp(6rem,22vw,14rem)] leading-none font-extrabold tracking-tight text-transparent [-webkit-text-stroke:2px_var(--listaso-text-heading)] forced-colors:text-[CanvasText] forced-colors:[-webkit-text-stroke:0]"
          >
            {content.code}
          </span>
          <div className="flex items-center gap-3">
            <span
              className={cx(
                "flex size-10 shrink-0 items-center justify-center rounded-full forced-colors:border forced-colors:border-[CanvasText]",
                toneStyles[content.tone],
              )}
            >
              <Icon name={content.icon} size={24} />
            </span>
            <p className="text-eyebrow font-bold uppercase text-fg-accent">
              <span className="sr-only">{stateLabels.statusCode} </span>
              {content.code} · {content.eyebrow}
            </p>
          </div>
          <h1 id="state-title" className="text-h1 font-bold text-balance text-fg-heading">
            {content.title}
          </h1>
          <p className="max-w-2xl text-lead text-fg-muted">{content.lead}</p>
          <div className="flex flex-wrap gap-4">
            {actions ?? null}
            <Button href="/" variant={actions ? "secondary" : "primary"} size="lg">
              {stateLabels.home}
            </Button>
            {showSupport ? (
              <Button href="/support/" variant="tertiary" size="lg" icon="arrow-right">
                {stateLabels.contactSupport}
              </Button>
            ) : null}
          </div>
          {showSupport ? (
            <p className="text-small text-fg-muted">
              <a className="font-semibold text-link underline-offset-4 hover:underline" href={`mailto:${contact.emails.support}`}>
                {contact.emails.support}
              </a>
            </p>
          ) : null}
          {detail ? <p className="text-caption text-fg-muted">{detail}</p> : null}
        </div>

        {showSuggestions ? (
          <nav aria-labelledby="state-suggestions" className="flex flex-col gap-6 border-t border-line-subtle pt-10">
            <h2 id="state-suggestions" className="text-h4 font-bold text-fg-heading">
              {stateLabels.suggestedTitle}
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {suggestedLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group flex h-full flex-col gap-2 rounded-md border border-line-subtle bg-surface-raised p-5 transition-colors hover:border-fg-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                  >
                    <span className="flex items-center justify-between gap-2 text-body font-semibold text-fg-heading">
                      {link.label}
                      <Icon name="arrow-right" size={20} className="transition-transform motion-safe:group-hover:translate-x-1" />
                    </span>
                    <span className="text-small text-fg-muted">{link.description}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </Container>
    </section>
  );
}
