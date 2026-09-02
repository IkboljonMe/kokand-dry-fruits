import Image from 'next/image';
import { TEAM } from '@/lib/contacts';
import type { Dictionary } from '@/i18n/types';

/**
 * Oilaviy biznes rahbariyati — sertifikatdan keyin, aloqa formasidan oldin.
 * Ismlar lib/contacts.ts da (atoqli ot, tarjima qilinmaydi), lavozimlar lug'atda.
 */
export default function Team({ dict }: { dict: Dictionary }) {
  const t = dict.team;

  return (
    <section className="team" id="team">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow reveal-up">{t.eyebrow}</span>
          <h2 className="h2 reveal-up">{t.title}</h2>
          <p className="team__lead reveal-up">{t.subtitle}</p>
        </div>

        <ul className="team__grid">
          {TEAM.map((member, i) => (
            <li key={member.key} className="team__card reveal-up">
              <div className="team__photo">
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={900}
                  height={1200}
                  sizes="(max-width:700px) 100vw, (max-width:1024px) 50vw, 33vw"
                  priority={i === 0}
                />
              </div>
              <div className="team__meta">
                <span className="team__role">{t.roles[member.key]}</span>
                <h3 className="team__name">{member.name}</h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
