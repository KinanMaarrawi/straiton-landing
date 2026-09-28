'use client';

import type { ReactNode } from 'react';
import { useRevealOnce } from '@/components/ui/useRevealOnce';
import s from './layout.module.css';

/** Fades its content up 12px the first time it enters view. Never repeats. */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const { ref, state } = useRevealOnce<HTMLDivElement>(0.1);
  return (
    <div ref={ref} data-reveal={state} className={[s.reveal, className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}
