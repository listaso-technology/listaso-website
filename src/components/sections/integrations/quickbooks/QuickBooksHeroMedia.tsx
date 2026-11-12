import { BrandAsset } from "@/components/brand/BrandAsset";
import { Icon } from "@/components/icons/Icon";
import { quickBooksCertified, systemPageCopy, type IntegrationSystem } from "@/content/integrations/systems";
import { QuickBooksRatingChip } from "../SystemExtras";
import { Direction } from "../SyncTable";
import styles from "./QuickBooksHeroMedia.module.css";

/** Short rows read better in the hero; the full list is in the sync section. */
const HERO_ROW_LIMIT = 5;
const HERO_ROW_MAX_LENGTH = 48;

/**
 * QuickBooks hero composition: Listaso and QuickBooks joined by a sync bar
 * (a pulse travels it a few times), the sync card with the first short rows
 * of the table, the two certified editions and the App Store rating. Product
 * UI stays light over the brand band; QuickBooks is named as text (no logo).
 * Motion is finite; static with reduced motion.
 */
export function QuickBooksHeroMedia({ system }: { system: IntegrationSystem }) {
  const rows = system.sync.filter((row) => row.item.length <= HERO_ROW_MAX_LENGTH).slice(0, HERO_ROW_LIMIT);

  return (
    <div data-reveal="media" className={styles.stage}>
      <svg aria-hidden="true" viewBox="0 0 400 400" className={styles.rings} focusable="false">
        <circle cx="200" cy="200" r="196" />
        <circle cx="200" cy="200" r="150" />
        <circle cx="200" cy="200" r="104" />
      </svg>
      <span aria-hidden="true" className={styles.glow} />

      <div role="img" aria-label={systemPageCopy.exampleLabel(system.name)} data-theme="light" className={styles.card}>
        <span aria-hidden="true" className={styles.bridge}>
          <span className={styles.tile}>
            <BrandAsset id="listaso-symbol-multicolor" height={40} alt="" />
          </span>
          <span className={styles.wire}>
            <span className={styles.pulse} />
            <span className={styles.hub}><Icon name="sync" size={20} /></span>
          </span>
          <span className={styles.systemTile}>{system.name}</span>
        </span>

        <span aria-hidden="true" className={styles.head}>
          <span className={styles.headTitle}>{systemPageCopy.exampleTitle}</span>
          <span className={styles.status}>
            <Icon name="check" size={16} />
            {systemPageCopy.exampleStatus}
          </span>
        </span>

        <span aria-hidden="true" className={styles.rows}>
          {rows.map((row, index) => (
            <span key={row.item} className={styles.row} style={{ animationDelay: `${700 + index * 110}ms` }}>
              <span className={styles.rowDot} />
              <span className={styles.rowItem}>{row.item}</span>
              <span className={styles.rowDirection}>
                <Direction direction={row.direction} name={system.name} />
              </span>
            </span>
          ))}
        </span>
      </div>

      <div aria-hidden="true" data-theme="light" className={styles.editions}>
        {quickBooksCertified.listings.map((listing) => (
          <span key={listing.href} className={styles.edition}>
            <Icon name="success" size={16} />
            {listing.label}
          </span>
        ))}
      </div>

      <QuickBooksRatingChip />
    </div>
  );
}
