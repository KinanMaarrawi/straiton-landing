'use client';

import { useLayoutEffect, useRef, type ChangeEvent } from 'react';
import { groupDigits, reformatWithCaret } from '@/lib/amount';

/**
 * Props for an amount <input>: digits only, thousands separators as you
 * type, caret kept after the same digit. `digits` is the stored value.
 */
export function useAmountInput(digits: string, onDigitsChange: (digits: string) => void) {
  const ref = useRef<HTMLInputElement>(null);
  const pendingCaret = useRef<number | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (el && pendingCaret.current !== null && document.activeElement === el) {
      el.setSelectionRange(pendingCaret.current, pendingCaret.current);
    }
    pendingCaret.current = null;
  });

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const el = e.target;
    const next = reformatWithCaret(el.value, el.selectionStart ?? el.value.length);
    pendingCaret.current = next.caret;
    onDigitsChange(next.digits);
  }

  return {
    ref,
    value: groupDigits(digits),
    onChange,
    inputMode: 'numeric' as const,
    autoComplete: 'off',
    spellCheck: false,
  };
}
