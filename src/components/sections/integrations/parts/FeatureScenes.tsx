import type { CSSProperties, ReactNode } from "react";
import { BrandAsset } from "@/components/brand/BrandAsset";
import { Icon, type IconName } from "@/components/icons/Icon";
import { cx } from "@/lib/utils/cx";
import styles from "./FeatureScenes.module.css";

/**
 * One decorative scene per integration feature (keyed by the feature icon),
 * so each tab shows its own idea instead of a shared diagram. Wordless
 * placeholders (bars, icons) stand in for data; the only words are the two
 * system names. Animations restart whenever the tab panel is shown and are
 * finite; static with reduced motion.
 */
const delay = (index: number, step = 160, start = 200) => ({ "--d": `${start + index * step}ms` }) as CSSProperties;

function Window({ name, rows, mark }: { name: string; rows: number; mark?: boolean }) {
  return (
    <span className={styles.window}>
      <span className={styles.windowHead}>
        {mark ? (
          <span className={styles.windowMark}><BrandAsset id="listaso-symbol-multicolor" height={16} alt="" /></span>
        ) : null}
        {name}
      </span>
      {Array.from({ length: rows }, (_, index) => (
        <span key={index} className={styles.windowRow} style={delay(index, 260, 300)}>
          <span className={styles.dot} />
          <span className={styles.bar} style={{ width: `${[72, 54, 64, 46][index % 4]}%` }} />
        </span>
      ))}
    </span>
  );
}

function SyncScene({ system }: { system: string }) {
  return (
    <span className={styles.syncScene}>
      <Window name="Listaso" rows={4} mark />
      <span className={styles.link}>
        <span className={styles.wire} />
        <span className={styles.hub}><Icon name="sync" size={20} /></span>
      </span>
      <Window name={system} rows={4} />
    </span>
  );
}

function OrderScene({ system }: { system: string }) {
  return (
    <span className={styles.orderScene}>
      <span className={styles.order}>
        <span className={styles.orderHead}><Icon name="orders" size={16} /><span className={styles.bar} style={{ width: "45%" }} /></span>
        {[0, 1, 2].map((index) => (
          <span key={index} className={styles.orderLine} style={delay(index)}>
            <span className={styles.thumb} />
            <span className={styles.bar} style={{ width: `${[60, 44, 52][index]}%` }} />
            <span className={styles.qty} />
          </span>
        ))}
        <span className={styles.orderTotal}><span className={styles.bar} style={{ width: "30%" }} /><span className={styles.barStrong} /></span>
      </span>
      <span className={styles.arrow}><Icon name="arrow-right" size={24} /></span>
      <span className={styles.ledger}>
        <span className={styles.windowHead}>{system}</span>
        {[0, 1, 2, 3].map((index) => (
          <span key={index} className={cx(styles.ledgerRow, index === 0 && styles.ledgerNew)}>
            <span className={styles.bar} style={{ width: `${[58, 70, 48, 62][index]}%` }} />
          </span>
        ))}
        <span className={styles.stamp}><Icon name="check" size={20} /></span>
      </span>
    </span>
  );
}

function InventoryScene() {
  const columns = [78, 52, 88];
  return (
    <span className={styles.inventoryScene}>
      {columns.map((height, index) => (
        <span key={index} className={styles.location}>
          <span className={styles.column}>
            <span
              className={cx(styles.stock, index === 1 && styles.stockAdjust)}
              style={{ height: `${height}%`, ...delay(index, 140, 150) }}
            />
          </span>
          <span className={styles.locationTag}><Icon name="warehouse" size={16} /></span>
        </span>
      ))}
      <span className={styles.syncBadge}><Icon name="sync" size={16} /></span>
    </span>
  );
}

function PriceScene() {
  return (
    <span className={styles.priceScene}>
      {[0, 1, 2].map((index) => (
        <span key={index} className={styles.product} style={delay(index, 180)}>
          <span className={styles.productThumb}><Icon name="box" size={20} /></span>
          <span className={styles.productInfo}>
            <span className={styles.bar} style={{ width: `${[70, 56, 64][index]}%` }} />
            <span className={styles.barSoft} style={{ width: `${[40, 48, 32][index]}%` }} />
          </span>
          <span className={cx(styles.tag, index === 1 && styles.tagNew)}>
            <Icon name="price" size={16} />
            <span className={styles.tagBar} />
          </span>
        </span>
      ))}
    </span>
  );
}

function TransferScene() {
  return (
    <span className={styles.transferScene}>
      <span className={styles.depot}><Icon name="warehouse" size={24} /></span>
      <span className={styles.route}>
        <svg viewBox="0 0 200 60" preserveAspectRatio="none" focusable="false">
          <path d="M0 30 C 50 0, 150 60, 200 30" />
        </svg>
        {[0, 1, 2].map((index) => (
          <span key={index} className={styles.box} style={delay(index, 380, 300)}>
            <Icon name="box" size={16} />
          </span>
        ))}
      </span>
      <span className={styles.depot}><Icon name="warehouse" size={24} /></span>
    </span>
  );
}

function InvoiceScene({ system }: { system: string }) {
  return (
    <span className={styles.invoiceScene}>
      <span className={styles.invoice}>
        <span className={styles.invoiceHead}>
          <Icon name="invoice" size={20} />
          <span className={styles.bar} style={{ width: "40%" }} />
        </span>
        {[0, 1, 2].map((index) => (
          <span key={index} className={styles.invoiceLine} style={delay(index)}>
            <span className={styles.bar} style={{ width: `${[56, 68, 44][index]}%` }} />
            <span className={styles.amount} />
          </span>
        ))}
        <span className={styles.invoiceTotal}>
          <span className={styles.bar} style={{ width: "26%" }} />
          <span className={styles.barStrong} />
        </span>
        <span className={styles.seal}><Icon name="success" size={24} /></span>
      </span>
      <span className={styles.systemChip}><Icon name="sync" size={16} />{system}</span>
    </span>
  );
}

const scenes: Partial<Record<IconName, (system: string) => ReactNode>> = {
  sync: (system) => <SyncScene system={system} />,
  orders: (system) => <OrderScene system={system} />,
  inventory: () => <InventoryScene />,
  price: () => <PriceScene />,
  move: () => <TransferScene />,
  invoice: (system) => <InvoiceScene system={system} />,
};

/** Returns the scene for a feature icon, or null when there is none. */
export function FeatureScene({ icon, system }: { icon: IconName; system: string }) {
  const scene = scenes[icon];
  if (!scene) return null;
  return (
    <div aria-hidden="true" className={styles.stage}>
      <span className={styles.grid} />
      <span className={styles.glow} />
      {scene(system)}
    </div>
  );
}
