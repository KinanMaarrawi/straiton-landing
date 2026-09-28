import { WHY } from '@/content/copy';
import { Reveal } from './Reveal';
import { Section, layout } from './Section';
import { StageHeader } from './StageHeader';
import s from './sections.module.css';

/** Why payments stall: typographic, a numbered list, one line that turns the page. */
export function Why() {
  return (
    <Section id="why" run="why" lane="right" surface="dark" className={s.why} labelledBy="why-title">
      <div className={layout.content}>
        <Reveal>
          <StageHeader eyebrow={WHY.eyebrow} title={WHY.h2} titleId="why-title" titleClassName={s.whyTitle} lead={WHY.lead} />
        </Reveal>
        <ol className={`${layout.afterLead} ${s.whyList}`}>
          {WHY.items.map(([title, body], i) => (
            <li key={title}>
              <span className={s.whyNum} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p className={s.whyItemTitle}>{title}</p>
                <p className={s.whyItemBody}>{body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className={`t-h3 ${s.whyClosing}`}>{WHY.closing}</p>
      </div>
    </Section>
  );
}
