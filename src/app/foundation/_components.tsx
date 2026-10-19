import type { ReactNode } from "react";
import { BrandAsset, ThemedLogo } from "@/components/brand/BrandAsset";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FormField } from "@/components/ui/FormField";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { TextLink } from "@/components/ui/TextLink";
import type { BrandAssetId, BrandAssetStatus, BrandBackground } from "@/content/brand/assets";
import { cx } from "@/lib/utils/cx";

export function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="flex scroll-mt-8 flex-col gap-6 border-t border-line-subtle pt-12"
    >
      <div className="flex flex-col gap-2">
        <h2 id={`${id}-title`} className="text-h3 font-semibold text-fg-heading">
          {title}
        </h2>
        {intro ? <div className="max-w-prose text-body text-fg-muted">{intro}</div> : null}
      </div>
      {children}
    </section>
  );
}

const statusLabels: Record<BrandAssetStatus, string> = {
  active: "Vigente",
  temporary: "Temporal",
  legacy: "Histórico",
  discontinued: "Descontinuado",
};

export function StatusBadge({ status }: { status: BrandAssetStatus }) {
  return (
    <span
      className={cx(
        "inline-flex w-fit items-center rounded-full px-3 py-1 text-caption font-semibold",
        status === "active" && "bg-surface-soft text-fg-default",
        status === "temporary" && "bg-status-warning text-fg-on-status",
        (status === "legacy" || status === "discontinued") &&
          "border border-dashed border-line-control text-fg-muted",
      )}
    >
      {statusLabels[status]}
    </span>
  );
}

/** Renders an asset on the background it is approved for. */
export function AssetTile({
  id,
  label,
  variant,
  background,
  status,
  notes,
  logoHeight,
}: {
  id: BrandAssetId;
  label: string;
  variant: string;
  background: BrandBackground;
  status: BrandAssetStatus;
  notes?: string;
  logoHeight: number;
}) {
  const stage =
    background === "dark" ? { "data-surface": "band" } : { "data-theme": "light" as const };

  return (
    <li className="flex flex-col overflow-hidden rounded-md border border-line-subtle bg-surface-raised">
      <div
        {...stage}
        className={cx(
          "flex min-h-40 items-center justify-center p-6",
          background !== "dark" && "bg-surface-alt",
        )}
      >
        <BrandAsset id={id} height={logoHeight} alt={label} />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <p className="text-body font-semibold text-fg-default">{label}</p>
        <p className="text-small text-fg-muted">
          <span lang="en">{variant}</span> · fondo{" "}
          {background === "any" ? "claro u oscuro" : background === "dark" ? "oscuro" : "claro"}
        </p>
        <StatusBadge status={status} />
        {notes ? (
          <p lang="en" className="text-small text-fg-muted">
            {notes}
          </p>
        ) : null}
      </div>
    </li>
  );
}

/**
 * The same component set under a forced theme. Used to review light and dark
 * side by side without a public theme switch.
 */
export function ThemeSample({ theme }: { theme: "light" | "dark" }) {
  const name = theme === "light" ? "claro" : "oscuro";

  return (
    <div
      data-theme={theme}
      className="flex flex-col gap-6 rounded-lg border border-line-subtle bg-surface-page p-6"
    >
      <div className="flex flex-col gap-4">
        <ThemedLogo light="listaso-horizontal-navy" dark="listaso-horizontal-white" height={28} alt="Listaso" />
        <p className="text-eyebrow font-bold uppercase text-fg-accent">Tema {name}</p>
        <h3 className="text-h4 font-semibold text-fg-heading">Superficie y texto</h3>
        <p className="text-body text-fg-default">
          Texto principal con un <TextLink href="#enlaces">enlace de ejemplo</TextLink>.
        </p>
        <p className="text-small text-fg-muted">Texto secundario (muted).</p>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button>Acción principal</Button>
        <Button variant="secondary">Acción secundaria</Button>
      </div>
      <FormField id={`sample-${theme}`} label="Campo de ejemplo" placeholder="Texto de ayuda" />
      <Card>
        <p className="text-small text-fg-muted">Tarjeta sobre surface.raised</p>
      </Card>
      <StatusMessage status="error" title="Error de ejemplo" />
    </div>
  );
}
