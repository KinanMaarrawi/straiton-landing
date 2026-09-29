import { SHARE } from '@/content/copy';
import { Reveal } from './Reveal';
import { Section, layout } from './Section';
import { StageHeader } from './StageHeader';
import s from './sections.module.css';

/** 01 Share: what the customer provides. Light, because this is the easy step. */
export function Share() {
  return (
    <Section id="share" run="share" lane="left" className={s.share} labelledBy="share-title">
      <div className={layout.content}>
        <Reveal stagger>
          <StageHeader eyebrow={SHARE.eyebrow} waypoint="01" title={SHARE.h2} titleId="share-title" lead={SHARE.lead} />
        </Reveal>
        <Reveal as="dl" stagger className={`${layout.afterLead} ${s.defList}`}>
          {SHARE.items.map(([term, desc]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{desc}</dd>
            </div>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
