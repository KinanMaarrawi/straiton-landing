'use client';

import { useId, useState, type ReactNode } from 'react';
import styles from './Accordion.module.css';

export type AccordionItemData = {
  question: string;
  answer: ReactNode;
};

type AccordionProps = {
  items: AccordionItemData[];
  /** Indices open on first render. Items open and close independently. */
  defaultOpen?: number[];
  headingLevel?: 2 | 3 | 4;
  /** Items cascade in when an ancestor Reveal plays. */
  stagger?: boolean;
};

/**
 * FAQ accordion (DESIGN.md §10). Header is a <button> with aria-expanded
 * and aria-controls; the panel height animates over 240ms (instant under
 * reduced motion). Without JS every panel is shown.
 */
export function Accordion({ items, defaultOpen = [], headingLevel = 3, stagger }: AccordionProps) {
  return (
    <div className={styles.accordion} data-stagger={stagger ? 'tight' : undefined}>
      {items.map((item, i) => (
        <AccordionItem key={item.question} {...item} headingLevel={headingLevel} initiallyOpen={defaultOpen.includes(i)} />
      ))}
    </div>
  );
}

function AccordionItem({
  question,
  answer,
  headingLevel,
  initiallyOpen,
}: AccordionItemData & { headingLevel: 2 | 3 | 4; initiallyOpen: boolean }) {
  const [open, setOpen] = useState(initiallyOpen);
  const uid = useId().replace(/:/g, '');
  const buttonId = `acc-${uid}-button`;
  const panelId = `acc-${uid}-panel`;
  const Heading = `h${headingLevel}` as const;

  return (
    <div className={styles.item} data-open={open}>
      <Heading className={styles.heading}>
        <button
          type="button"
          id={buttonId}
          className={styles.button}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={styles.question}>{question}</span>
          <span className={styles.glyph} aria-hidden="true" />
        </button>
      </Heading>
      <div id={panelId} role="region" aria-labelledby={buttonId} className={styles.panel}>
        <div className={styles.panelInner}>
          <div className={styles.answer}>{answer}</div>
        </div>
      </div>
    </div>
  );
}
