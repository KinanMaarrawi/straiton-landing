import { ELIGIBILITY } from '@/content/copy';
import { CheckIcon } from '@/components/ui/icons';
import { Section } from './Section';
import s from './sections.module.css';

/** Who the pilot is for: plain text with check glyphs, not pills. */
export function Eligibility() {
  return (
    <Section run="strip" lane="left" surface="surface" className={s.strip} labelledBy="eligibility-title">
      <div className={s.stripContent}>
        <p id="eligibility-title" className={s.stripLead}>
          {ELIGIBILITY.leadIn}
        </p>
        <ul className={s.stripList}>
          {ELIGIBILITY.items.map((item) => (
            <li key={item}>
              <CheckIcon size={16} className={s.check} />
              {item}
            </li>
          ))}
        </ul>
        <p className={s.stripSmall}>{ELIGIBILITY.small}</p>
      </div>
    </Section>
  );
}
