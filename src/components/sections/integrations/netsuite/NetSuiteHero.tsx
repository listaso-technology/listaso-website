import { BrandAsset } from "@/components/brand/BrandAsset";
import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { systemPageCopy, type IntegrationSystem } from "@/content/integrations/systems";
import { cx } from "@/lib/utils/cx";
import backdrops from "../../backdrops.module.css";
import { Breadcrumbs } from "../../product/Breadcrumbs";
import { Signature } from "../../Signature";
import { FillPhoto, HeroCtas, HeroEyebrow, HeroPlan, type AnyPhoto } from "../../variants/HeroParts";
import styles from "./NetSuiteHero.module.css";

/** Rows per side keep the halves balanced; the full list is in the sync bridge. */
const SIDE_LIMIT = 3;

/**
 * NetSuite, "field and finance, together": the copy on the brand band and a
 * card split by a seam. The field half (Listaso, the page photo) holds what
 * Listaso sends to NetSuite; the finance half (NetSuite, a ledger) holds what
 * NetSuite sends to Listaso; the data that syncs both ways sits on the seam.
 * Everything comes from the sync table. Motion is finite (chips slide toward
 * the seam, a pulse runs along it, the hub turns once); static with reduced
 * motion. NetSuite is named as text (no third-party logo).
 */
export function NetSuiteHero({ system, photo }: { system: IntegrationSystem; photo: AnyPhoto }) {
  const toSystem = system.sync.filter((row) => row.direction === "out").slice(0, SIDE_LIMIT);
  const toListaso = system.sync.filter((row) => row.direction === "in").slice(0, SIDE_LIMIT);
  const shared = system.sync.find((row) => row.direction === "both");
  const { hero } = system;

  return (
    <section aria-labelledby="hero-title" data-surface="band" data-story-section className={cx(backdrops.brandMesh, styles.hero)}>
      <span aria-hidden="true" className={styles.grid} />
      <Container width="wide" className={styles.layout}>
        <div data-reveal="group" className={styles.copy}>
          <Breadcrumbs data-reveal-item current={hero.breadcrumb} trail={systemPageCopy.trail} />
          <HeroEyebrow icon="sync">{hero.eyebrow}</HeroEyebrow>
          <h1 id="hero-title" data-reveal="mask" className="overflow-hidden text-display text-balance text-fg-heading">
            <span data-reveal-content className="block">
              <Signature text={hero.title} />
            </span>
          </h1>
          <p data-reveal-item className="max-w-xl text-lead text-fg-muted">
            {hero.lead}
          </p>
          <HeroPlan>{hero.plan}</HeroPlan>
          <HeroCtas location={`${system.slug}-hero`} secondary={hero.secondaryCta} />
        </div>

        <div data-reveal="media" className={styles.stage}>
          <div role="img" aria-label={systemPageCopy.exampleLabel(system.name)} className={styles.split}>
            <div aria-hidden="true" className={cx(styles.half, styles.field)}>
              <div className={styles.photo}>
                <FillPhoto photo={photo} sizes="(min-width: 1024px) 24vw, 50vw" eager />
              </div>
              <span className={styles.fieldShade} />
              <span className={cx(styles.badge, styles.badgeStart)}>
                <span className={styles.badgeMark}>
                  <BrandAsset id="listaso-symbol-multicolor" height={24} alt="" />
                </span>
                Listaso
              </span>
              <span className={cx(styles.chips, styles.chipsOut)}>
                {toSystem.map((row, index) => (
                  <span key={row.item} className={styles.chip} style={{ animationDelay: `${600 + index * 140}ms` }}>
                    {row.item}
                    <Icon name="arrow-right" size={16} />
                  </span>
                ))}
              </span>
            </div>

            <div aria-hidden="true" className={cx(styles.half, styles.finance)}>
              <span className={styles.ledger} />
              <span className={cx(styles.badge, styles.badgeEnd)}>{system.name}</span>
              <span className={cx(styles.chips, styles.chipsIn)}>
                {toListaso.map((row, index) => (
                  <span key={row.item} className={styles.chip} style={{ animationDelay: `${700 + index * 140}ms` }}>
                    <Icon name="arrow-left" size={16} />
                    {row.item}
                  </span>
                ))}
              </span>
            </div>

            <span aria-hidden="true" className={styles.seam}>
              <span className={styles.pulse} />
            </span>
            <span aria-hidden="true" className={styles.hub}>
              <Icon name="sync" size={24} />
            </span>
            {shared ? (
              <span aria-hidden="true" className={styles.shared}>
                <Icon name="sync" size={16} />
                {shared.item}
              </span>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
