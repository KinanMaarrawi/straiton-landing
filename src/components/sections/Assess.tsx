'use client';

import { ASSESS } from '@/content/copy';
import { CheckIcon } from '@/components/ui/icons';
import { QuoteDocument } from '@/components/ui/QuoteDocument';
import { usePageState } from '@/components/state/PageState';
import { Reveal } from './Reveal';
import { Section, layout } from './Section';
import { StageHeader } from './StageHeader';
import s from './sections.module.css';

/** 02 Assess: the centrepiece. Quote anatomy plus the upfront checklist. */
export function Assess() {
  const { amountLabel } = usePageState();
  return (
    <Section id="assess" run="assess" lane="right" className={s.assess} labelledBy="assess-title">
      <div className={layout.content}>
        <Reveal stagger>
          <StageHeader eyebrow={ASSESS.eyebrow} place={ASSESS.waypoint} waypoint="02" title={ASSESS.h2} titleId="assess-title" titleClassName={s.maxTitle} lead={ASSESS.lead} />
        </Reveal>
        <div className={`${layout.afterLead} ${s.assessGrid}`}>
          <div>
            <QuoteDocument amount={amountLabel} />
            <p className={s.footnote}>{ASSESS.quoteFootnote}</p>
          </div>
          <div id="documents">
            <h3 className={`t-h3 ${s.checkHeading}`}>{ASSESS.checklistHeading}</h3>
            <Reveal as="ul" stagger className={s.checklist}>
              {ASSESS.checklist.map((item) => (
                <li key={item}>
                  <CheckIcon size={16} className={s.check} />
                  {item}
                </li>
              ))}
            </Reveal>
            <p className={s.checkFootnote}>{ASSESS.checklistFootnote}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
