'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * 'static' until hydrated (content visible without JS), then 'pending'
 * if the element is still below the fold, then 'in' the first time it
 * enters view. Never repeats. Skipped entirely under reduced motion or
 * when the element is already on screen at load.
 */
export function useRevealOnce<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [state, setState] = useState<'static' | 'pending' | 'in'>('static');

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;
    setState('pending');
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState('in');
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, state };
}
