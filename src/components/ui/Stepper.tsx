import { CheckIcon } from './icons';
import styles from './Stepper.module.css';

type Step = { label: string; state: 'done' | 'current' | 'upcoming'; note?: string };

const STATE_TEXT = { done: 'Done', current: 'Current step', upcoming: 'Upcoming' } as const;

/**
 * Illustrative status stepper (04 Track). Horizontal in wide containers,
 * vertical in narrow ones. State is carried by glyph, weight and a hidden
 * text label, never colour alone.
 */
export function Stepper({ steps }: { steps: ReadonlyArray<Step> }) {
  return (
    <div className={styles.wrap}>
      <ol className={styles.steps}>
        {steps.map((step) => (
          <li key={step.label} className={styles.step} data-state={step.state} aria-current={step.state === 'current' ? 'step' : undefined}>
            <span className={styles.rail} aria-hidden="true">
              <span className={styles.dot}>
                {step.state === 'done' && <CheckIcon size={13} />}
                {step.state === 'current' && <span className={styles.pip} />}
              </span>
              <span className={styles.line} />
            </span>
            <span className={styles.text}>
              <span className={styles.label}>
                {step.label}
                <span className="visually-hidden"> ({STATE_TEXT[step.state]})</span>
              </span>
              {step.note && <span className={styles.note}>{step.note}</span>}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
