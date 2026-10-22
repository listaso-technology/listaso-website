import type { CSSProperties } from "react";
import { Icon, type IconName } from "@/components/icons/Icon";
import styles from "./FeatureArt.module.css";

/**
 * Wordless illustration for a feature card, chosen by the feature's icon
 * (decorative, aria-hidden; no copy or data). It assembles once when its
 * reveal group enters the view and lifts slightly on card hover.
 * - report: three sources (orders, warehouse, delivery) feed a bar chart.
 * - sync: a hub linked to four systems.
 * - new: a three-step workflow with a switch that turns on.
 * Any other icon: the icon in rings over the grid.
 */
export function FeatureArt({ icon }: { icon: IconName }) {
  return (
    <span aria-hidden="true" className={styles.art}>
      <span className={styles.grid} />
      {icon === "report" ? <ReportArt /> : icon === "sync" ? <SyncArt /> : icon === "new" ? <WorkflowArt /> : <IconArt icon={icon} />}
    </span>
  );
}

const delay = (step: number) => ({ "--d": step }) as CSSProperties;

function ReportArt() {
  const sources: IconName[] = ["orders", "warehouse", "delivery"];
  const bars = [38, 62, 48, 80, 66, 92];
  return (
    <span className={styles.report}>
      <span className={styles.sources}>
        {sources.map((name, index) => (
          <span key={name} className={styles.source} style={delay(index)}>
            <Icon name={name} size={16} />
          </span>
        ))}
      </span>
      <span className={styles.feed}>
        {sources.map((name, index) => (
          <span key={name} className={styles.feedLine} style={delay(index)} />
        ))}
      </span>
      <span className={styles.sheet}>
        <span className={styles.sheetHead}>
          <span className={styles.sheetIcon}>
            <Icon name="report" size={16} />
          </span>
          <span className={styles.skeleton} />
        </span>
        <span className={styles.bars}>
          {bars.map((height, index) => (
            <span key={index} className={styles.bar} style={{ ...delay(index), "--h": `${height}%` } as CSSProperties} />
          ))}
        </span>
      </span>
    </span>
  );
}

function SyncArt() {
  const systems: IconName[] = ["data-grid", "invoice", "cart", "analytics"];
  return (
    <span className={styles.sync}>
      <svg className={styles.links} viewBox="0 0 200 140" preserveAspectRatio="none">
        <path d="M100 70 L32 24" style={delay(0)} />
        <path d="M100 70 L168 24" style={delay(1)} />
        <path d="M100 70 L32 116" style={delay(2)} />
        <path d="M100 70 L168 116" style={delay(3)} />
      </svg>
      <span className={styles.hub}>
        <Icon name="sync" size={24} />
      </span>
      {systems.map((name, index) => (
        <span key={name} className={styles.node} data-slot={index} style={delay(index)}>
          <Icon name={name} size={16} />
        </span>
      ))}
    </span>
  );
}

function WorkflowArt() {
  const steps: IconName[] = ["checklist", "edit", "check"];
  return (
    <span className={styles.flow}>
      <span className={styles.flowSteps}>
        {steps.map((name, index) => (
          <span key={name} className={styles.flowStep} style={delay(index)}>
            <span className={styles.flowIcon}>
              <Icon name={name} size={16} />
            </span>
            <span className={styles.skeleton} />
            <span className={styles.skeletonShort} />
          </span>
        ))}
      </span>
      <span className={styles.toggleRow}>
        <span className={styles.skeleton} />
        <span className={styles.toggle}>
          <span className={styles.knob} />
        </span>
      </span>
    </span>
  );
}

function IconArt({ icon }: { icon: IconName }) {
  return (
    <span className={styles.single}>
      <span className={styles.ring} />
      <span className={styles.ringOuter} />
      <span className={styles.hub}>
        <Icon name={icon} size={24} />
      </span>
    </span>
  );
}
