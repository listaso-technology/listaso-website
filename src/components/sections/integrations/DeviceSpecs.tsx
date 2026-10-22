"use client";

import { type CSSProperties, type KeyboardEvent, useRef, useState } from "react";
import { BrandAsset } from "@/components/brand/BrandAsset";
import { Icon } from "@/components/icons/Icon";
import { cx } from "@/lib/utils/cx";
import styles from "./DeviceSpecs.module.css";

type DeviceGroup = { title: string; items: readonly string[] };

/**
 * Supported devices: a platform switch (ARIA tabs: click, arrows, Home/End)
 * beside a device illustration that changes with it (a phone and a tablet
 * for the first group, a phone for the others; decorative). Each panel lists
 * its requirements as ruled rows that enter in turn. All panels stay in the
 * DOM; inactive ones are hidden.
 */
export function DeviceSpecs({ groups, label }: { groups: readonly DeviceGroup[]; label: string }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) => {
    setActive(index);
    tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const last = groups.length - 1;
    const next: Record<string, number> = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in next)) return;
    event.preventDefault();
    select(next[event.key]);
  };

  const withTablet = active === 0;

  return (
    <div className={styles.layout}>
      <div aria-hidden="true" data-reveal="media" className={styles.stage}>
        <span className={styles.glow} />
        <div key={active} className={cx(styles.devices, withTablet && styles.devicesPair)}>
          {withTablet ? (
            <span className={styles.tablet}>
              <span className={styles.screen}>
                <BrandAsset id="listaso-symbol-multicolor" height={40} alt="" className="rounded-md" />
                <span className={styles.lines}>
                  <span />
                  <span />
                  <span />
                </span>
              </span>
            </span>
          ) : null}
          <span className={styles.phone}>
            <span className={styles.notch} />
            <span className={styles.screen}>
              <BrandAsset id="listaso-symbol-multicolor" height={32} alt="" className="rounded-md" />
              <span className={styles.lines}>
                <span />
                <span />
              </span>
            </span>
          </span>
        </div>
      </div>

      <div className={styles.side}>
        <div role="tablist" aria-label={label} className={styles.tabs} onKeyDown={onKeyDown}>
          <span aria-hidden="true" className={styles.thumb} style={{ translate: `${active * 100}% 0`, width: `calc(${100 / groups.length}% - 0.25rem)` }} />
          {groups.map((group, index) => (
            <button
              key={group.title}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={`device-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls={`device-panel-${index}`}
              tabIndex={index === active ? 0 : -1}
              className={cx(styles.tab, index === active && styles.tabActive)}
              onClick={() => setActive(index)}
            >
              {group.title}
            </button>
          ))}
        </div>

        {groups.map((group, index) => (
          <div
            key={group.title}
            id={`device-panel-${index}`}
            role="tabpanel"
            aria-labelledby={`device-tab-${index}`}
            hidden={index !== active}
            className={styles.panel}
          >
            <h3 className="sr-only">{group.title}</h3>
            <ol className={styles.specs}>
              {group.items.map((item, itemIndex) => (
                <li key={item} className={styles.spec} style={{ "--i": itemIndex } as CSSProperties}>
                  <span aria-hidden="true" className={styles.specIndex}>
                    {String(itemIndex + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.specText}>{item}</span>
                  <span aria-hidden="true" className={styles.specCheck}>
                    <Icon name="check" size={16} />
                  </span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}
