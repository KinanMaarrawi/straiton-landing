'use client';

import type { ReactNode } from 'react';
import { DirhamSign } from './DirhamSign';
import { Stamp } from './Stamp';
import { useRevealOnce } from './useRevealOnce';
import styles from './QuoteDocument.module.css';

type QuoteDocumentProps = {
  /** e.g. "AED 250,000" from the hero; falls back to "Your amount". */
  amount?: string | null;
};

type Row = { label: string; value: ReactNode; money?: boolean; highlight?: boolean };

/**
 * Quote anatomy, styled like a remittance advice (DESIGN.md §9, §10).
 * Illustrative only: no live rates. Rows appear in sequence (60ms
 * stagger) the first time it scrolls into view.
 */
export function QuoteDocument({ amount }: QuoteDocumentProps) {
  const { ref, state } = useRevealOnce<HTMLDivElement>();
  const rows: Row[] = [
    { label: 'You send', value: amount || 'Your amount', money: Boolean(amount) },
    { label: 'FX rate', value: 'Transaction-specific quote' },
    { label: 'Fee', value: 'Shown where applicable' },
    { label: 'Supplier receives', value: 'INR amount, shown before you fund', highlight: true },
    { label: 'Expected timing', value: 'Confirmed for the approved payment' },
  ];

  return (
    <div ref={ref} className={styles.doc} data-reveal={state}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span className={styles.titleText}>Quote anatomy</span>
          <span className={styles.pair}>
            <DirhamSign />
            <span aria-hidden="true">→ ₹</span>
            <span className="visually-hidden">to INR</span>
          </span>
        </div>
        <span className={styles.illustrative}>Illustrative · no live rates</span>
      </div>
      <dl className={styles.rows}>
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={[styles.row, row.highlight && styles.highlight].filter(Boolean).join(' ')}
            style={{ ['--i' as string]: i }}
          >
            <dt className={styles.label}>{row.label}</dt>
            <span className={styles.leader} aria-hidden="true" />
            <dd className={row.money ? `${styles.value} ${styles.money}` : styles.value}>{row.value}</dd>
          </div>
        ))}
      </dl>
      <Stamp label="Before you fund" className={styles.stamp} />
    </div>
  );
}
