import Image from "next/image";
import Link from "next/link";
import { BrandAsset, ThemedLogo } from "@/components/brand/BrandAsset";
import { aiAssistants } from "@/content/site/ai-assistants";
import {
  contact,
  copyright,
  footerContact,
  footerNav,
  headerLabels,
  legalLinks,
  offices,
  socialLinks,
} from "@/content/site/navigation";
import { Container } from "./Container";
import styles from "./SiteFooter.module.css";

/** Site footer, reorganized as an editorial directory and AI starting point. */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Container width="wide" className="relative z-10 pt-4 md:pt-6 lg:pt-8">
        <div className={styles.panel}>
          <div className={styles.panelMain}>
            <div className={styles.brandColumn}>
              <Link href="/" className={styles.logoLink}>
                <ThemedLogo
                  light="listaso-stacked-navy"
                  dark="listaso-stacked-white"
                  height={40}
                  alt={headerLabels.homeLink}
                />
              </Link>

              <div className={styles.offices}>
                {offices.map((office) => (
                  <address key={office.city} className={styles.office}>
                    <span className={styles.officeName}>{office.city}</span>
                    {office.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                ))}
              </div>
            </div>

            <nav aria-label={headerLabels.footerNav} className={styles.navGrid}>
              {footerNav.map((group) => (
                <div key={group.label} className={styles.navGroup}>
                  <h2 className={styles.navHeading}>{group.label}</h2>
                  <ul className={styles.navList}>
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <a href={link.href} className={styles.panelLink}>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <section className={styles.contactRow} aria-labelledby="footer-contact-title">
            <h2 id="footer-contact-title" className={styles.contactTitle}>
              How can we help? Contact us.
            </h2>
            <ul className={styles.contactLinks}>
              {footerContact.map((item) => (
                <li key={item.label}>
                  {"href" in item ? (
                    <a
                      href={item.href}
                      className={styles.contactPill}
                      data-analytics-event="contact_click"
                      data-analytics-channel={item.href.startsWith("tel:") ? "phone" : "email"}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className={styles.contactNote}>{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <div className={styles.panelMeta}>
            <ul className={styles.socialList} aria-label="Social media">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={styles.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className={styles.metaBottom}>
              <p>{copyright}</p>
              <nav aria-label={headerLabels.legalNav}>
                <ul className={styles.legalList}>
                  {legalLinks.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className={styles.legalLink}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <section className={styles.aiSection} aria-labelledby="ai-footer-title">
          <div>
            <p className={styles.aiEyebrow}>Source-guided AI overview</p>
            <h2 id="ai-footer-title" className={styles.aiTitle}>
              Ask an AI about Listaso.
            </h2>
            <p className={styles.aiLead}>
              Open the same source-guided question in your preferred assistant to explore how
              Listaso connects sales, inventory, warehouse, eCommerce, back-office, and delivery
              workflows.
            </p>
          </div>

          <ul className={styles.assistantList}>
            {aiAssistants.map((assistant) => (
              <li key={assistant.name}>
                <a
                  href={assistant.href}
                  className={styles.assistantLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ask ${assistant.name} about Listaso (opens in a new tab)`}
                  data-analytics-event="ai_assistant_click"
                  data-analytics-provider={assistant.name.toLowerCase()}
                >
                  <span className={styles.assistantIcon} aria-hidden="true">
                    <Image src={assistant.icon} width={24} height={24} alt="" />
                  </span>
                  <span>{assistant.name}</span>
                  <span className={styles.assistantArrow} aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p className={styles.aiNote}>
            AI responses can be incomplete or inaccurate. Verify details on the cited Listaso
            pages or contact Sales at{" "}
            <a
              href={`mailto:${contact.emails.sales}`}
              className={styles.aiNoteLink}
              data-analytics-event="contact_click"
              data-analytics-channel="email"
            >
              {contact.emails.sales}
            </a>
            .
          </p>
        </section>

        <div className={styles.brandStage} aria-hidden="true">
          <BrandAsset
            id="listaso-stacked-white"
            height={156}
            alt=""
            className={styles.brandLockup}
          />
        </div>
      </Container>
    </footer>
  );
}

