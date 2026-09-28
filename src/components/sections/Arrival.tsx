'use client';

import { ARRIVAL } from '@/content/copy';
import { project } from '@/lib/geo';
import { AssessmentForm } from '@/components/form/AssessmentForm';
import { usePageState } from '@/components/state/PageState';
import { Reveal } from './Reveal';
import { Section } from './Section';
import { StageHeader } from './StageHeader';
import s from './Arrival.module.css';

// Mumbai in the arrival map's viewBox (606 × 720), as percentages.
const [MX, MY] = project('arr', [72.84, 18.94]);
const END = { left: `${(MX / 606) * 100}%`, top: `${(MY / 720) * 100}%` };

/** Arrival: the India map on the left, the assessment form on the right. */
export function Arrival() {
  const { arrived } = usePageState();
  return (
    <Section id="assessment" run="arrival" lane="left" surface="surface" className={s.arrival} labelledBy="assessment-title">
      <Reveal className={`${s.mapCol} reveal-fade`}>
        <div className={s.map} data-map="arr" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element -- static decorative SVG */}
          <img src="/maps/arr.svg" alt="" width={606} height={720} loading="lazy" className={s.mapImg} />
          <span className={s.endLabel} style={END} data-arrived={arrived || undefined}>
            <strong key={arrived ? 'a' : 'b'} className={s.endTitle}>
              {arrived ? ARRIVAL.arrived : ARRIVAL.pointTitle}
            </strong>
            <span>{ARRIVAL.pointSub}</span>
          </span>
        </div>
      </Reveal>
      <div className={s.content}>
        <Reveal stagger>
          <div data-pt="end" data-stagger="">
            <StageHeader eyebrow={ARRIVAL.eyebrow} title={ARRIVAL.h2} titleId="assessment-title" lead={ARRIVAL.lead} />
          </div>
        </Reveal>
        <Reveal className={s.card}>
          <AssessmentForm />
        </Reveal>
      </div>
      {/* Announce arrival for screen readers; the map itself is decorative. */}
      <p className="visually-hidden" aria-live="polite">
        {arrived ? `${ARRIVAL.arrived}. ${ARRIVAL.pointTitle}.` : ''}
      </p>
    </Section>
  );
}
