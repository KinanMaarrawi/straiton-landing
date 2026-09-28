'use client';

import { forwardRef, type SelectHTMLAttributes } from 'react';
import { useField } from './Field';
import { ChevronDownIcon } from './icons';
import styles from './controls.module.css';

type Option = { value: string; label: string };

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id' | 'children'> & {
  options: Option[];
  /** Shown as an empty first option, e.g. "Select a payment type". */
  placeholder?: string;
};

/** Native <select> styled to match the inputs. No custom listbox. */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { options, placeholder, className, ...rest },
  ref,
) {
  const { id, describedBy, invalid } = useField();
  return (
    <div className={styles.selectWrap}>
      <select
        ref={ref}
        id={id}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className={[styles.input, styles.select, className].filter(Boolean).join(' ')}
        {...rest}
      >
        {placeholder !== undefined && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className={styles.chevron} />
    </div>
  );
});
