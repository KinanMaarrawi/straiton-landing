import { TRACK } from '@/content/copy';
import { Stepper } from '@/components/ui/Stepper';
import { Reveal } from './Reveal';
import { Section, layout } from './Section';
import { StageHeader } from './StageHeader';
import s from './sections.module.css';

/** 04 Track: a small, static, illustrative status component. */
export function Track() {
  return (
    <Section id="track" run="track" lane="right" className={s.track} labelledBy="track-title">
      <div className={layout.content}>
        <Reveal stagger>
          <StageHeader eyebrow={TRACK.eyebrow} place={TRACK.waypoint} waypoint="04" title={TRACK.h2} titleId="track-title" titleClassName={s.maxTitle} lead={TRACK.lead} />
        </Reveal>
        <Reveal className={layout.afterLead}>
        <figure className={s.statusCard}>
          <figcaption className={s.statusHead}>
            <span className={s.statusTitle}>
              {TRACK.header} · <span className={s.statusCorridor}>{TRACK.corridor}</span>
            </span>
          </figcaption>
          <Stepper steps={TRACK.steps} />
        </figure>
        </Reveal>
      </div>
    </Section>
  );
}
