'use client';

import type { ReactNode } from 'react';
import { useRevealOnce } from '@/components/ui/useRevealOnce';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Render as a list or definition list so semantics are kept. */
  as?: 'div' | 'ol' | 'ul' | 'dl';
  /** Children cascade in one after another instead of fading as one block. */
  stagger?: boolean | 'tight';
  id?: string;
};

/**
 * Plays its reveal the first time it scrolls into view (motion.css).
 * Content that's already on screen at load, or everything without JS or
 * under reduced motion, simply shows.
 */
export function Reveal({ children, className, as: Tag = 'div', stagger, id }: RevealProps) {
  const { ref, state } = useRevealOnce<HTMLElement>();
  return (
    <Tag
      ref={ref as never}
      id={id}
      data-reveal={state}
      data-stagger={stagger === 'tight' ? 'tight' : stagger ? '' : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
