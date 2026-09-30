import type { Metadata } from 'next';
import Link from 'next/link';
import s from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Page not found | Straiton',
  robots: { index: false, follow: false },
};

/**
 * A short course that sets out, circles once (a ship holding position) and
 * stops short: one continuous path, drawn as the route's dots.
 */
const LOST_COURSE =
  'M20 132C80 70 170 58 250 104C270 116 318 124 318 96C318 70 282 64 272 86C264 106 292 124 316 124C334 124 348 130 360 136';

export default function NotFound() {
  return (
    <>
      <header className={s.header}>
        <Link href="/" className={`wordmark ${s.wordmark}`} aria-label="Straiton, home">
          STRAITON
        </Link>
      </header>
      <main className={s.main}>
        <svg className={s.course} viewBox="0 0 400 180" aria-hidden="true" focusable="false">
          <path className={s.dots} d={LOST_COURSE} />
          <circle className={s.marker} cx="360" cy="136" r="7" />
        </svg>
        <p className="t-eyebrow">404</p>
        {/* TODO(copy): 404 page strings are new; not in COPY.md's original draft. */}
        <h1 className={`t-display ${s.title}`}>Off course.</h1>
        <p className={`t-lead ${s.lead}`}>This page isn&apos;t on the route. Your payment starts on the home page.</p>
        <div className={s.actions}>
          <Link href="/" className={s.primary}>
            Back to the start
          </Link>
          <Link href="/#assessment" className={s.tertiary}>
            Request a payment assessment{'\u00a0'}
            <span className="nudge">→</span>
          </Link>
        </div>
      </main>
    </>
  );
}
