'use client';

import { useId, type ReactNode } from 'react';
import styles from './Segmented.module.css';

export type SegmentedOption<V extends string> = {
  value: V;
  label: ReactNode;
};

type SegmentedProps<V extends string> = {
  /** Radio group name; also used for form submission without JS. */
  name: string;
  options: ReadonlyArray<SegmentedOption<V>>;
  value: V;
  onChange: (value: V) => void;
  /**
   * field    — equal columns inside a form field (funding currency, contact method)
   * mode     — the form's mode switch, on a surface-50 track
   * attached — the hero currency toggle, fused to the amount input
   */
  variant?: 'field' | 'mode' | 'attached';
  /** Standalone use (no <Field as="group">): renders its own fieldset + hidden legend. */
  legend?: string;
  disabled?: boolean;
  /** Pass through from <Field> when the group is described by a hint/error. */
  describedBy?: string;
  className?: string;
};

/**
 * Segmented control built on native radios, so arrow keys, form reset
 * and no-JS submission all work. The selected option carries a ring and
 * a weight change as well as a fill, so state isn't colour-only.
 */
export function Segmented<V extends string>({
  name,
  options,
  value,
  onChange,
  variant = 'field',
  legend,
  disabled,
  describedBy,
  className,
}: SegmentedProps<V>) {
  const uid = useId().replace(/:/g, '');
  const track = (
    <div
      className={[styles.track, styles[variant], className].filter(Boolean).join(' ')}
      style={{ ['--count' as string]: options.length }}
    >
      {options.map((opt) => {
        const id = `${name}-${uid}-${opt.value}`;
        const checked = opt.value === value;
        return (
          <div key={opt.value} className={styles.item}>
            <input
              className={styles.radio}
              type="radio"
              id={id}
              name={name}
              value={opt.value}
              checked={checked}
              disabled={disabled}
              aria-describedby={describedBy}
              onChange={() => onChange(opt.value)}
            />
            <label htmlFor={id} className={styles.option}>
              {opt.label}
            </label>
          </div>
        );
      })}
    </div>
  );

  if (!legend) return track;
  return (
    <fieldset className={styles.fieldset}>
      <legend className="visually-hidden">{legend}</legend>
      {track}
    </fieldset>
  );
}
