'use client';

import type { InputHTMLAttributes } from 'react';
import { useAmountInput } from './useAmountInput';
import { useField } from './Field';
import styles from './controls.module.css';

type AmountInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'value' | 'onChange' | 'type'> & {
  digits: string;
  onDigitsChange: (digits: string) => void;
};

/** Plain amount input for the form (currency is a separate field there). */
export function AmountInput({ digits, onDigitsChange, className, ...rest }: AmountInputProps) {
  const { id, describedBy, invalid } = useField();
  const amount = useAmountInput(digits, onDigitsChange);
  return (
    <input
      {...rest}
      {...amount}
      id={id}
      type="text"
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      className={[styles.input, styles.mono, className].filter(Boolean).join(' ')}
    />
  );
}
