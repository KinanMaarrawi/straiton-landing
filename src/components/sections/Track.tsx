import { TRACK } from '@/content/copy';
import { Stepper } from '@/components/ui/Stepper';
import { Tag } from '@/components/ui/Tag';
import { Reveal } from './Reveal';
import { Section, layout } from './Section';
import { StageHeader } from './StageHeader';
import s from './sections.module.css';

/** 04 Track: a small, static, illustrative status component. */
export function Track() {
  return (
    <Section id="track" run="track" lane="right" className={s.track} labelledBy="track-title">
      <div className={layout.content}>
        <Reveal>
          <StageHeader eyebrow={TRACK.eyebrow} place={TRACK.waypoint} waypoint="04" title={TRACK.h2} titleId="track-title" titleClassName={s.maxTitle} lead={TRACK.lead} />
        </Reveal>
        <figure className={`${layout.afterLead} ${s.statusCard}`}>
          <figcaption className={s.statusHead}>
            <span className={s.statusTitle}>
              {TRACK.header} · <span className={s.statusCorridor}>{TRACK.corridor}</span>
            </span>
            <Tag variant="illustrative">Illustrative interface</Tag>
          </figcaption>
          <Stepper steps={TRACK.steps} />
        </figure>
      </div>
    </Section>
  );
}
