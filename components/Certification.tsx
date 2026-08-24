import { GACC } from '@/lib/contacts';
import type { Dictionary } from '@/i18n/types';

/**
 * GACC ro'yxati — kompaniya profilidagi yagona tasdiqlangan sertifikat.
 * Raqamlar tilga bog'liq emas, shuning uchun lug'atda emas, lib/contacts.ts da.
 */
export default function Certification({ dict }: { dict: Dictionary }) {
  const c = dict.certification;

  return (
    <section className="cert" id="certification">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow reveal-up">{c.sectionTitle}</span>
          <h2 className="h2 reveal-up">{c.sectionSubtitle}</h2>
        </div>

        <div className="cert__inner">
          <div className="cert__badge reveal-up">
            <span className="cert__mark">GACC</span>
            <h3 className="cert__title">{c.gaccTitle}</h3>
            <p className="cert__body">{c.gaccBody}</p>
          </div>

          <dl className="spectable reveal-up">
            <div className="spectable__row">
              <dt>{c.chinaRegLabel}</dt>
              <dd>{GACC.chinaRegNo}</dd>
            </div>
            <div className="spectable__row">
              <dt>{c.foreignRegLabel}</dt>
              <dd>{GACC.foreignRegNo}</dd>
            </div>
            <div className="spectable__row">
              <dt>{c.coveredLabel}</dt>
              <dd>{GACC.coveredHsCodes.map((hs) => `HS ${hs}`).join(' · ')}</dd>
            </div>
          </dl>
        </div>

        <p className="cert__note reveal-up">{c.coveredNote}</p>
      </div>
    </section>
  );
}
