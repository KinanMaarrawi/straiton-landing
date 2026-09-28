'use client';

import { useEffect, useState } from 'react';
import { STICKY_CTA } from '@/content/copy';
import { Button } from '@/components/ui/Button';
import { usePageState } from '@/components/state/PageState';
import s from './StickyCta.module.css';

/**
 * Mobile sticky CTA (DESIGN.md §10): slides up once the hero has left the
 * viewport; hidden while #assessment is in view or the menu is open.
 * Hidden on desktop by CSS. Safe-area aware.
 */
export function StickyCta() {
  const { menuOpen, goToAssessment } = usePageState();
  const [heroGone, setHeroGone] = useState(false);
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('top');
    const form = document.getElementById('assessment');
    if (!hero || !form) return;
    const heroIo = new IntersectionObserver(([e]) => setHeroGone(!e.isIntersecting && e.boundingClientRect.top < 0));
    const formIo = new IntersectionObserver(([e]) => setFormInView(e.isIntersecting));
    heroIo.observe(hero);
    formIo.observe(form);
    return () => {
      heroIo.disconnect();
      formIo.disconnect();
    };
  }, []);

  const visible = heroGone && !formInView && !menuOpen;

  return (
    <div className={s.bar} data-visible={visible || undefined} inert={!visible} aria-hidden={!visible || undefined}>
      <Button
        href="#assessment"
        fullWidth
        onClick={(e) => {
          e.preventDefault();
          goToAssessment();
        }}
      >
        {STICKY_CTA}
      </Button>
    </div>
  );
}
