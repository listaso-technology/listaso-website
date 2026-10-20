import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { TextLink } from "@/components/ui/TextLink";
import { capabilities } from "@/content/home/en";
import { CapabilityDisclosures } from "./CapabilityDisclosures";
import styles from "./HomeCapabilities.module.css";

/**
 * Four additional capabilities as expandable cards. Each card is a native
 * <details> in one exclusive group, so click, tap, Enter and Space work and
 * the expanded state is announced without JavaScript. Wide screens lay them
 * out as one horizontal row where the open card grows; narrow screens stack
 * them as an accordion. CapabilityDisclosures only keeps one card open on
 * wide screens.
 */
export function HomeCapabilities() {
  return (
    <section aria-labelledby="capabilities-title" data-story-section className="py-16 lg:py-20">
      <Container>
        <h2 id="capabilities-title" className="sr-only">
          {capabilities.label}
        </h2>
        <div id="home-capabilities" data-reveal="group" data-capability-group className={styles.group}>
          {capabilities.items.map((item, index) => (
            <details
              key={item.link.href}
              name="home-capabilities"
              open={index === 0}
              data-reveal-item
              className={styles.card}
            >
              <summary className={styles.summary}>
                <span className={styles.icon}>
                  <Icon name={item.icon} size={32} />
                </span>
                <h3 className={styles.title}>{item.title}</h3>
                <Icon name="chevron-right" size={20} className={styles.chevron} />
              </summary>
              <div className={styles.panel}>
                <p className={styles.lead}>{item.lead}</p>
                <p className="text-body text-fg-muted">{item.text}</p>
                <TextLink href={item.link.href} className="w-fit">
                  {item.link.label}
                  <Icon name="arrow-right" size={16} className="self-center" />
                </TextLink>
              </div>
              <Icon name={item.icon} size={48} className={styles.watermark} />
            </details>
          ))}
        </div>
        <CapabilityDisclosures groupId="home-capabilities" />
      </Container>
    </section>
  );
}
