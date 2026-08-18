import type { CSSProperties } from 'react';
import Image from 'next/image';
import { EXPORT_REGIONS } from '@/lib/contacts';
import { localeFlag, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';

/** Bayroq fayllari til kodi bo'yicha nomlangan — kichik harfli davlat kodi mos keladi. */
const FLAG_BY_REGION = Object.fromEntries(
  Object.values(localeFlag).map((code) => [code.toUpperCase(), code]),
);

export default function Geo({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  // Davlat nomlari ICU dan olinadi — lug'atlarda takrorlanmaydi.
  const names = new Intl.DisplayNames([lang], { type: 'region' });

  return (
    <section className="geo" id="geo">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow reveal-up">{dict.strengths.delivery.title}</span>
          <h2 className="h2 reveal-up">{dict.strengths.delivery.description}</h2>
        </div>
        <div className="geo__list">
          {EXPORT_REGIONS.map((region, i) => {
            const flag = FLAG_BY_REGION[region];
            return (
              <span className="reveal-up" key={region} style={{ '--i': i } as CSSProperties}>
                {flag ? (
                  <Image
                    src={`/assets/flags/${flag}.svg`}
                    alt=""
                    width={20}
                    height={14}
                    className="geo__flag"
                  />
                ) : null}
                {names.of(region) ?? region}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
