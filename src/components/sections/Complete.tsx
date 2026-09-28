import { COMPLETE } from '@/content/copy';
import { SpecTable, type SpecRow } from '@/components/ui/SpecTable';
import { Tag } from '@/components/ui/Tag';
import { Reveal } from './Reveal';
import { Section, layout } from './Section';
import { StageHeader } from './StageHeader';
import s from './sections.module.css';

const ROWS: SpecRow[] = [
  { label: 'From', value: 'United Arab Emirates' },
  { label: 'To', value: 'India' },
  { label: 'Funding currencies', value: 'AED / USD' },
  { label: 'Supplier receives', value: 'INR' },
  { label: 'Beneficiary type', value: 'Eligible Indian businesses' },
  { label: 'Payment types', value: 'Supplier payments · Invoice payments · Other eligible business payments' },
  { label: 'Expected timing', value: 'Same-day where supported' },
  { label: 'Payout', value: 'INR business payout, subject to confirmed capability' },
  { label: 'Payout method', value: <Tag variant="tbc" />, tag: true },
  { label: 'Cut-off', value: <Tag variant="tbc" />, tag: true },
  { label: 'Minimum / maximum amount', value: <Tag variant="tbc" />, tag: true },
  { label: 'Required information', value: 'Transaction-specific' },
  { label: 'Tracking', value: 'Payment status and confirmation' },
  {
    label: 'Status',
    value: (
      <>
        <Tag variant="pilot" />
        <span>Pilot preparation</span>
      </>
    ),
    tag: true,
  },
];

/** 03 Complete: onboarding, funding and the corridor specification. */
export function Complete() {
  return (
    <Section id="complete" run="complete" lane="left" surface="surface" className={s.complete} labelledBy="complete-title">
      <div className={layout.content}>
        <Reveal>
          <StageHeader eyebrow={COMPLETE.eyebrow} place={COMPLETE.waypoint} waypoint="03" title={COMPLETE.h2} titleId="complete-title" titleClassName={s.maxTitle} lead={COMPLETE.lead} />
        </Reveal>
        <h3 className={`t-h3 ${s.specHeading}`}>{COMPLETE.specHeading}</h3>
        <p className={s.specSub}>{COMPLETE.specSub}</p>
        <div className={s.specTable}>
          <SpecTable rows={ROWS} columns={2} />
        </div>
      </div>
    </Section>
  );
}
