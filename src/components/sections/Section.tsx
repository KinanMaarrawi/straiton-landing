import type { ReactNode } from 'react';
import s from './layout.module.css';

type SectionProps = {
  id?: string;
  /** Route anchor: the route threads this section's content box. */
  run?: string;
  /** Side the route travels on (content sits on the other side). */
  lane: 'left' | 'right';
  surface?: 'white' | 'surface' | 'dark';
  labelledBy?: string;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
};

export function Section({ id, run, lane, surface = 'white', labelledBy, className, innerClassName, children }: SectionProps) {
  const cls = [s.section, s[lane], surface === 'surface' && s.surface, surface === 'dark' && s.dark, className]
    .filter(Boolean)
    .join(' ');
  return (
    <section
      id={id}
      className={cls}
      data-run={run}
      data-lane={lane}
      data-surface={surface === 'dark' ? 'dark' : undefined}
      aria-labelledby={labelledBy}
    >
      <div className={[s.inner, innerClassName].filter(Boolean).join(' ')}>{children}</div>
    </section>
  );
}

export const layout = s;
