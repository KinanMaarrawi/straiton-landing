'use client';

import { ASSESS } from '@/content/copy';
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
          <StageHeader eyebrow={ASSESS.eyebrow} waypoint="02" title={ASSESS.h2} titleId="assess-title" titleClassName={s.maxTitle} lead={ASSESS.lead} />
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
                  {/* A checkbox whose tick draws in as the list is read (decorative). */}
                  <span className={s.box} aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="16" height="16">
                      <path d="M3.5 8.4l2.8 2.8L12.5 5" pathLength={1} />
                    </svg>
                  </span>
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
