import type { CSSProperties } from 'react';

type DirhamSignProps = {
  /** Any CSS length. Defaults to 0.95em so it sits with adjacent text. */
  size?: string | number;
  /** Thinner strokes read better at display sizes (1.6 at 96px). */
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * UAE dirham sign (CBUAE, March 2025): a Latin D with two horizontal strokes.
 * Unicode U+20C3 is not in most fonts yet, so it is drawn inline.
 * Handoff: swap to the U+20C3 glyph once target fonts support it.
 */
export function DirhamSign({ size = '0.95em', strokeWidth = 2, className, style }: DirhamSignProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="AED"
      className={className}
      style={{ display: 'inline-block', flex: 'none', verticalAlign: '-0.1em', ...style }}
    >
      <path d="M7 4v16M7 4h3.5c5 0 8.5 3.4 8.5 8s-3.5 8-8.5 8H7M3 10h17.5M3 14h17.5" />
    </svg>
  );
}
