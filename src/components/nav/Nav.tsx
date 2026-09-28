'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react';
import { NAV_CTA, NAV_LINKS } from '@/content/copy';
import { Button } from '@/components/ui/Button';
import { usePageState } from '@/components/state/PageState';
import { MobileMenu } from './MobileMenu';
import s from './Nav.module.css';

/** Which nav item is active for each observed section. */
const SECTION_TO_LINK: Record<string, string> = {
  share: 'How it works',
  complete: 'How it works',
  track: 'How it works',
  assess: 'Quote',
  faq: 'FAQ',
};

export function Nav() {
  const { menuOpen, setMenuOpen, goToAssessment } = usePageState();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => setMenuOpen(false), [setMenuOpen]);
  const listRef = useRef<HTMLUListElement>(null);
  const [bar, setBar] = useState<{ x: number; w: number } | null>(null);

  // One underline that slides to whichever link is active.
  useLayoutEffect(() => {
    const place = () => {
      const a = listRef.current?.querySelector<HTMLElement>('a[aria-current]');
      setBar(a ? { x: a.offsetLeft, w: a.offsetWidth } : null);
    };
    place();
    window.addEventListener('resize', place);
    document.fonts?.ready.then(place).catch(() => {});
    return () => window.removeEventListener('resize', place);
  }, [active]);

  // Hairline appears after scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active anchor: the section crossing a line ~40% down the viewport.
  useEffect(() => {
    const ids = ['top', 'why', 'share', 'assess', 'complete', 'track', 'support', 'faq', 'assessment'];
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(SECTION_TO_LINK[e.target.id] ?? null);
        }
      },
      { rootMargin: '-40% 0px -59% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  function onCta(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    goToAssessment();
  }

  return (
    <header className={s.header} data-scrolled={scrolled || menuOpen || undefined}>
      <div className={s.inner}>
        <a href="#top" className={`wordmark ${s.wordmark}`} aria-label="Straiton, back to top">
          STRAITON
        </a>
        <nav className={s.links} aria-label="Main">
          <ul ref={listRef}>
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className={s.link}
                  aria-current={active === l.label ? 'location' : undefined}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li aria-hidden="true" className={s.barSlot}>
              <span
                className={s.bar}
                data-on={bar ? '' : undefined}
                style={bar ? { transform: `translateX(${bar.x}px)`, width: bar.w } : undefined}
              />
            </li>
          </ul>
        </nav>
        <Button href="#assessment" className={s.cta} onClick={onCta}>
          {NAV_CTA}
        </Button>
        <button
          ref={menuButtonRef}
          type="button"
          className={s.menuButton}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={s.burger} data-open={menuOpen || undefined} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
      <MobileMenu open={menuOpen} onClose={closeMenu} toggleRef={menuButtonRef} />
    </header>
  );
}
