import { forwardRef } from 'react';
import s from './Route.module.css';

type Pt = [number, number];

/**
 * A waypoint on the route (DESIGN.md §8): hidden while upcoming, then a
 * teal ring with a check that draws in and a single ripple as the marker
 * passes, so state never relies on colour alone. Positioned with a
 * transform so it never triggers layout.
 */
export function RouteWaypoint({ x, y, passed, label }: { x: number; y: number; passed: boolean; label?: string }) {
  return (
    <div className={s.wp} data-passed={passed || undefined} style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}>
      <span className={s.ripple} />
      <span className={s.dot}>
        <svg className={s.checkIn} viewBox="0 0 16 16" width="16" height="16">
          <path d="M4.5 8.2l2.5 2.5 4.5-5" pathLength={1} />
        </svg>
      </span>
      {label && <span className={s.wpLabel}>{label}</span>}
    </div>
  );
}

/**
 * The payment marker at the head of the sailed course. The animation loop
 * moves it with translate3d (compositor only) and sets data-side so the
 * label chip flips left near the right edge.
 */
export const RouteMarker = forwardRef<HTMLDivElement, { start: Pt; label?: string; arrived: boolean }>(
  function RouteMarker({ start, label, arrived }, ref) {
    const money = Boolean(label && /\d/.test(label));
    return (
      <div
        ref={ref}
        className={s.marker}
        data-side="right"
        data-arrived={arrived || undefined}
        // Initial position only; the loop owns transform after mount.
        style={{ transform: `translate3d(${start[0]}px, ${start[1]}px, 0)` }}
      >
        <span className={s.markerPulse} />
        <span className={s.markerDot} />
        {label && (
          <span key={label} className={s.chip} data-money={money || undefined}>
            {label}
          </span>
        )}
      </div>
    );
  },
);
