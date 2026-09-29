/**
 * Shared JSX for generated images (link preview, Apple touch icon).
 * Rendered by next/og's ImageResponse at build time; plain inline styles
 * because it is not HTML.
 */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const NAVY = '#0B2231';
export const TEAL = '#17B3A0';
export const TEAL_700 = '#0B7A6E';
export const INK_700 = '#3D5260';
export const ON_DARK = '#EEF3F4';

export async function ogFonts() {
  const dir = join(process.cwd(), 'src/assets/og');
  const [serif, sans500, sans600] = await Promise.all([
    readFile(join(dir, 'newsreader-300.woff')),
    readFile(join(dir, 'plex-sans-500.woff')),
    readFile(join(dir, 'plex-sans-600.woff')),
  ]);
  return [
    { name: 'Newsreader', data: serif, weight: 300 as const, style: 'normal' as const },
    { name: 'Plex', data: sans500, weight: 500 as const, style: 'normal' as const },
    { name: 'Plex', data: sans600, weight: 600 as const, style: 'normal' as const },
  ];
}

/** The route mark: a trail of dots ending in the payment marker. */
export function RouteMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill={NAVY} />
      <circle cx="12" cy="44" r="2.4" fill={TEAL} />
      <circle cx="18" cy="37" r="2.4" fill={TEAL} />
      <circle cx="25" cy="32" r="2.4" fill={TEAL} />
      <circle cx="33" cy="30" r="2.4" fill={TEAL} />
      <circle cx="44" cy="28" r="8" fill={TEAL} stroke={ON_DARK} strokeWidth="3" />
    </svg>
  );
}
