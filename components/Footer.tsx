import Logo from './Logo';
import { CONTACTS, SOCIALS } from '@/lib/contacts';
import type { Dictionary } from '@/i18n/types';

export default function Footer({
  dict,
  homeHref = '',
}: {
  dict: Dictionary;
  homeHref?: string;
}) {
  const info = dict.contact.info;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo href={homeHref || '#top'} className="logo--footer" />
            <p className="footer__desc">{dict.footer.description}</p>
          </div>
          <nav className="footer__nav" aria-label={dict.footer.quickLinks}>
            <a href={`${homeHref}#catalog`}>{dict.nav.products}</a>
            <a href={`${homeHref}#about`}>{dict.nav.about}</a>
            <a href={`${homeHref}#geo`}>{dict.strengths.delivery.title}</a>
            <a href={`${homeHref}#contacts`}>{dict.nav.contact}</a>
          </nav>
        </div>

        <div className="offices">
          <div className="office">
            <span className="office__city">{info.addressLabel}</span>
            <a href={CONTACTS.mapsUrl} target="_blank" rel="noopener noreferrer">
              {info.address}
            </a>
          </div>
          <div className="office">
            <span className="office__city">{info.phoneLabel}</span>
            <a href={`tel:${CONTACTS.phoneHref}`}>{info.phone}</a>
            <a href={`mailto:${CONTACTS.email}`}>{info.email}</a>
          </div>
          <div className="office">
            <span className="office__city">{info.hoursLabel}</span>
            <span>{info.hours}</span>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Kokand Dry Fruits. {dict.footer.rights}</span>
          <div className="socials" aria-label={dict.footer.followUs}>
            {SOCIALS.map((social) => (
              <a key={social.label} href={social.href} aria-label={social.label}>
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
