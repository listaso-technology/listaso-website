import { Icon } from "@/components/icons/Icon";
import { cx } from "@/lib/utils/cx";
import { TextRoll } from "./TextRoll";

export type Channel = { label: string; value: string; href?: string };

type ChannelListProps = {
  /** Small uppercase label above the list. */
  label: string;
  channels: readonly Channel[];
  /** Large values (contact page) or regular (side panels). */
  size?: "large" | "regular";
};

/**
 * Contact channels (ddark.dev's "Channels"): label on the left, the value as
 * a large link with a rolling hover and an arrow on the right. The label
 * moves above the value when the list itself is narrow (container query),
 * so it also fits in a hero aside.
 */
export function ChannelList({ label, channels, size = "regular" }: ChannelListProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-small font-bold tracking-widest text-fg-muted uppercase">{label}</p>
      <ul data-reveal="group" className="@container border-t border-line-subtle">
        {channels.map((channel) => {
          const value = (
            <span className={cx("font-bold break-words text-fg-heading", size === "large" ? "text-h3 sm:text-h2" : "text-h4")}>
              <TextRoll>{channel.value}</TextRoll>
            </span>
          );
          return (
            <li data-reveal-item key={`${channel.label}-${channel.value}`} className="border-b border-line-subtle">
              {channel.href ? (
                <a
                  href={channel.href}
                  className="group grid min-h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-1 py-4 @xl:grid-cols-[14rem_minmax(0,1fr)_auto]"
                  data-analytics-event="contact_click"
                  data-analytics-channel={channel.href.startsWith("tel:") ? "phone" : "email"}
                >
                  <span className="text-small font-semibold tracking-widest text-fg-muted uppercase">{channel.label}</span>
                  <span className="col-start-1 row-start-2 @xl:col-start-auto @xl:row-start-auto">{value}</span>
                  <span
                    aria-hidden="true"
                    className="col-start-2 row-span-2 row-start-1 flex size-11 items-center justify-center rounded-full border border-line-subtle text-fg-heading transition-[background-color,color] duration-(--listaso-duration-standard) group-hover:bg-fg-heading group-hover:text-surface-page @xl:col-start-auto @xl:row-span-1"
                  >
                    <Icon name="arrow-right" size={20} />
                  </span>
                </a>
              ) : (
                <div className="grid gap-1 py-4 @xl:grid-cols-[14rem_minmax(0,1fr)]">
                  <span className="text-small font-semibold tracking-widest text-fg-muted uppercase">{channel.label}</span>
                  {value}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
