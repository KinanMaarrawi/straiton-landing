import { FAQ } from '@/content/copy';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from './Reveal';
import { Section, layout } from './Section';
import { StageHeader } from './StageHeader';
import s from './sections.module.css';

/** FAQ: six independent items; the first is open, as in the frames. */
export function Faq() {
  return (
    <Section id="faq" run="faq" lane="right" className={s.faq} labelledBy="faq-title">
      <div className={layout.content}>
        <Reveal>
          <StageHeader eyebrow={FAQ.eyebrow} title={FAQ.h2} titleId="faq-title" />
        </Reveal>
        <div className={s.faqList}>
          <Accordion items={FAQ.items} defaultOpen={[0]} />
        </div>
      </div>
    </Section>
  );
}
