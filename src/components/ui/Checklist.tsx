'use client';

import { useRevealOnce } from './useRevealOnce';
import styles from './Checklist.module.css';

/**
 * A list whose checkboxes tick one after another the first time it scrolls
 * into view ("What we check upfront"). The boxes are decorative: the list
 * reads as a plain list. Already ticked without JS, under reduced motion,
 * or when it's on screen at load.
 */
export function Checklist({ items, className }: { items: readonly string[]; className?: string }) {
  const { ref, state } = useRevealOnce<HTMLUListElement>();
  return (
    <ul ref={ref} data-reveal={state} data-stagger="" className={[styles.list, className].filter(Boolean).join(' ')}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          <span className={styles.box} aria-hidden="true">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path d="M3.5 8.4l2.8 2.8L12.5 5" pathLength={1} />
            </svg>
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
