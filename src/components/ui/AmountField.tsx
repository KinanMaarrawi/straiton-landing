'use client';

import { useId } from 'react';
import type { Currency } from '@/lib/amount';
import { DirhamSign } from './DirhamSign';
import { Segmented } from './Segmented';
import { useAmountInput } from './useAmountInput';
import styles from './AmountField.module.css';

type AmountFieldProps = {
  label: string;
  hint?: string;
  placeholder?: string;
  digits: string;
  onDigitsChange: (digits: string) => void;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  /** Field names for no-JS submission. */
  name?: string;
  currencyName?: string;
};

export const CURRENCY_OPTIONS = [
  {
    value: 'AED' as const,
    label: (
      <>
        <DirhamSign />
        AED
      </>
    ),
  },
  { value: 'USD' as const, label: '$ USD' },
];

/**
 * Hero amount starter: mono tabular input with the AED | USD toggle
 * attached on the left (DESIGN.md §10 Amount field). 56px tall.
 */
export function AmountField({
  label,
  hint,
  placeholder,
  digits,
  onDigitsChange,
  currency,
  onCurrencyChange,
  name = 'amount',
  currencyName = 'currency',
}: AmountFieldProps) {
  const uid = useId().replace(/:/g, '');
  const inputId = `amount-${uid}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const amount = useAmountInput(digits, onDigitsChange);

  return (
    <div className={styles.field}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <div className={styles.box}>
        <Segmented
          name={currencyName}
          legend="Currency"
          variant="attached"
          options={CURRENCY_OPTIONS}
          value={currency}
          onChange={onCurrencyChange}
        />
        <input
          {...amount}
          id={inputId}
          name={name}
          type="text"
          placeholder={placeholder}
          aria-describedby={hintId}
          className={styles.input}
        />
      </div>
      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
    </div>
  );
}
