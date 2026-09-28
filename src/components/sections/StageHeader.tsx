import type { ReactNode } from 'react';
import s from './layout.module.css';

type StageHeaderProps = {
  eyebrow: string;
  /** Waypoint place name: shown in the eyebrow on mobile only. */
  place?: string;
  /** Route anchor for this stage's waypoint (e.g. "01"). */
  waypoint?: string;
  title: ReactNode;
  titleId?: string;
  titleClassName?: string;
  lead?: ReactNode;
  /** Extra content between eyebrow and title (the manager monogram). */
  between?: ReactNode;
};

/** Eyebrow + h2 + lead. The stage number lives only in the eyebrow. */
export function StageHeader({ eyebrow, place, waypoint, title, titleId, titleClassName, lead, between }: StageHeaderProps) {
  return (
    <>
      <p className={s.eyebrowRow} data-wp={waypoint}>
        <span className="t-eyebrow">{eyebrow}</span>
        {place && (
          <span className={s.place}>
            <span className="visually-hidden">· </span>
            {place}
          </span>
        )}
      </p>
      {between}
      <h2 id={titleId} className={['t-h2', s.h2, titleClassName].filter(Boolean).join(' ')}>
        {title}
      </h2>
      {lead && <p className={`t-lead ${s.lead}`}>{lead}</p>}
    </>
  );
}
