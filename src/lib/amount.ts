/** Amount helpers. Amounts are stored as a digit string ("250000"). */

export type Currency = 'AED' | 'USD';

/** 12 digits = up to 999,999,999,999. Enough for any B2B payment. */
export const MAX_AMOUNT_DIGITS = 12;

export function digitsOnly(input: string): string {
  return input.replace(/\D+/g, '').replace(/^0+(?=\d)/, '').slice(0, MAX_AMOUNT_DIGITS);
}

/** "250000" → "250,000". Grouping is fixed (not locale) so it matches the design. */
export function groupDigits(digits: string): string {
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/** "AED", "250000" → "AED 250,000". Code + number, per DESIGN.md §6. */
export function formatMoney(currency: Currency, digits: string): string {
  return `${currency} ${groupDigits(digits)}`;
}

/**
 * Reformat a raw input value while keeping the caret after the same digit.
 * Returns the new display value and where the caret should go.
 */
export function reformatWithCaret(raw: string, caret: number): { digits: string; display: string; caret: number } {
  const digitsBeforeCaret = raw.slice(0, caret).replace(/\D/g, '').length;
  const digits = digitsOnly(raw);
  const display = groupDigits(digits);
  // Leading zeros stripped by digitsOnly can shift the count; clamp.
  let seen = 0;
  let pos = 0;
  const target = Math.min(digitsBeforeCaret, digits.length);
  while (pos < display.length && seen < target) {
    if (/\d/.test(display[pos])) seen++;
    pos++;
  }
  return { digits, display, caret: pos };
}
