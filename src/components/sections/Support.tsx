'use client';

import { useRef, useState } from 'react';
import { SUPPORT } from '@/content/copy';
import { Button } from '@/components/ui/Button';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { Tag } from '@/components/ui/Tag';
import { Reveal } from './Reveal';
import { Section, layout } from './Section';
import { StageHeader } from './StageHeader';
import s from './sections.module.css';

/**
 * Your payments manager. The contact buttons never dial or open anything:
 * they show one inline Demo notice (role="status"), which never stacks.
 */
export function Support() {
  const [notice, setNotice] = useState(false);
  const lastButton = useRef<HTMLButtonElement | null>(null);

  function show(e: React.MouseEvent<HTMLButtonElement>) {
    lastButton.current = e.currentTarget;
    setNotice(true);
  }

  function dismiss() {
    setNotice(false);
    lastButton.current?.focus();
  }

  return (
    <Section id="support" run="support" lane="left" surface="dark" className={s.support} labelledBy="support-title">
      <div className={layout.content}>
        <Reveal>
          <StageHeader
            eyebrow={SUPPORT.eyebrow}
            title={SUPPORT.h2}
            titleId="support-title"
            titleClassName={`${s.maxTitle} ${s.supportTitle}`}
            lead={SUPPORT.lead}
            between={
              <div className={s.person}>
                <span className={s.monogram} aria-hidden="true">
                  {SUPPORT.monogram}
                </span>
                <span className={s.personRole}>{SUPPORT.role}</span>
              </div>
            }
          />
        </Reveal>
        <p className={s.helpsLabel}>{SUPPORT.helpsWithLabel}</p>
        <p className={s.helps}>{SUPPORT.helpsWith}</p>
        <div className={s.demoLine}>
          <Tag variant="demo" />
          <span>{SUPPORT.placeholderNote}</span>
        </div>
        <div className={s.contactButtons}>
          <Button tone="dark" onClick={show} aria-controls="contact-notice">
            {SUPPORT.whatsapp}
          </Button>
          <Button tone="dark" variant="secondary" onClick={show} aria-controls="contact-notice">
            {SUPPORT.callLabel}
            <span className={s.contactDetail}>{SUPPORT.phone}</span>
          </Button>
          <Button tone="dark" variant="secondary" onClick={show} aria-controls="contact-notice">
            {SUPPORT.emailLabel}
            <span className={s.contactDetail}>{SUPPORT.email}</span>
          </Button>
        </div>
        <div id="contact-notice">
          <DemoNotice open={notice} onDismiss={dismiss} message={SUPPORT.notice} />
        </div>
      </div>
    </Section>
  );
}
