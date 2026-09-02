import Logo from './Logo';
import { ACTIVE_SOCIALS } from '@/lib/contacts';
import { SOCIAL_ICONS } from './Icons';
import type { Dictionary } from '@/i18n/types';

export default function Footer({
  dict,
  homeHref = '',
}: {
  dict: Dictionary;
  homeHref?: string;
}) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <Logo href={homeHref || '#top'} className="logo--footer" />
          <nav className="footer__nav" aria-label={dict.footer.quickLinks}>
            <a href={`${homeHref}#catalog`}>{dict.nav.products}</a>
            <a href={`${homeHref}#about`}>{dict.nav.about}</a>
            <a href={`${homeHref}#geo`}>{dict.strengths.delivery.title}</a>
            <a href={`${homeHref}#contacts`}>{dict.nav.contact}</a>
          </nav>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Kokand Dry Fruits. {dict.footer.rights}</span>
          <div className="socials" aria-label={dict.footer.followUs}>
            {ACTIVE_SOCIALS.map((social) => {
              const Icon = SOCIAL_ICONS[social.label];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  title={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {Icon ? <Icon /> : social.label}
                </a>
              );
            })}
          </div>
          <span className="credit">
            {dict.footer.madeBy}{' '}
            <a href="https://1is4me.com" target="_blank" rel="noopener noreferrer">
              1is4me
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
