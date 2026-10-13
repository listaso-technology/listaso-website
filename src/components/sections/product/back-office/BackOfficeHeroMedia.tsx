import { Icon } from "@/components/icons/Icon";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { dashboardExample } from "@/content/products/back-office";
import { cx } from "@/lib/utils/cx";

/** Illustrative sales dashboard (relative bars, no figures). One glass surface. */
export function DashboardPanel({ className }: { className?: string }) {
  const example = dashboardExample;

  return (
    <GlassPanel role="img" aria-label={example.label} className={cx("flex w-[min(100%,24rem)] flex-col gap-4 p-4", className)}>
      <span aria-hidden="true" className="flex items-center justify-between gap-4">
        <span className="flex flex-col gap-1">
          <span className="text-caption font-semibold uppercase text-fg-muted">{example.period}</span>
          <span className="text-h4 font-semibold text-fg-heading">{example.title}</span>
        </span>
        <Icon name="dashboard" size={24} className="text-icon-accent" />
      </span>
      <span aria-hidden="true" className="flex h-32 items-end gap-3 border-b border-line-subtle pb-2">
        {example.days.map((day) => (
          <span key={day.day} className="flex h-full flex-1 flex-col items-center justify-end">
            <span className="w-full rounded-t-xs bg-fg-heading opacity-90" style={{ height: `${day.value}%` }} />
          </span>
        ))}
      </span>
      <span aria-hidden="true" className="flex gap-3 text-caption font-semibold text-fg-muted">
        {example.days.map((day) => (
          <span key={day.day} className="flex-1 text-center">
            {day.day}
          </span>
        ))}
      </span>
    </GlassPanel>
  );
}
