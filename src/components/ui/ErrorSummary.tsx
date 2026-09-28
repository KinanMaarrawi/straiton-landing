'use client';

import { forwardRef, type MouseEvent } from 'react';
import { ErrorIcon } from './icons';
import styles from './ErrorSummary.module.css';

export type SummaryError = {
  /** id of the invalid control; the link moves focus to it. */
  fieldId: string;
  /** The field's visible label, e.g. "Payment amount". */
  label: string;
};

type ErrorSummaryProps = {
  errors: SummaryError[];
};

/** COPY.md §10: "Check {n} field(s) before continuing". */
export function summaryHeading(n: number): string {
  return `Check ${n} ${n === 1 ? 'field' : 'fields'} before continuing`;
}

/**
 * Error summary at the top of the form card. The form moves focus here
 * on a failed Continue/Send; each link jumps to and focuses its field.
 */
export const ErrorSummary = forwardRef<HTMLDivElement, ErrorSummaryProps>(function ErrorSummary(
  { errors },
  ref,
) {
  function jump(e: MouseEvent<HTMLAnchorElement>, fieldId: string) {
    const el = document.getElementById(fieldId);
    if (!el) return;
    e.preventDefault();
    el.focus({ preventScroll: true });
    el.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  const headingId = 'error-summary-heading';
  return (
    <div ref={ref} className={styles.summary} tabIndex={-1} aria-live="assertive" aria-labelledby={headingId}>
      <p className={styles.heading} id={headingId}>
        <ErrorIcon className={styles.icon} />
        {summaryHeading(errors.length)}
      </p>
      <ul className={styles.list}>
        {errors.map((err) => (
          <li key={err.fieldId}>
            <a href={`#${err.fieldId}`} className={styles.link} onClick={(e) => jump(e, err.fieldId)}>
              {err.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
});
