'use client';

import { useEffect, useRef, type MouseEvent, type RefObject } from 'react';
import { NAV_CTA, NAV_LINKS } from '@/content/copy';
import { Button } from '@/components/ui/Button';
import { usePageState } from '@/components/state/PageState';
import s from './Nav.module.css';

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  /** The header's menu button: it stays visible, becomes "Close menu" and is part of the trap. */
  toggleRef: RefObject<HTMLButtonElement | null>;
};

/**
 * Full-height sheet under the mobile header (DESIGN.md §10).
 * Focus moves to the toggle (now Close menu), is trapped between it and
 * the sheet, Esc closes, body scroll is locked, and focus returns to the
 * toggle on close.
 */
export function MobileMenu({ open, onClose, toggleRef }: MobileMenuProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const { goToAssessment } = usePageState();

  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    toggle?.focus();

    function focusables(): HTMLElement[] {
      const inSheet = sheetRef.current
        ? Array.from(sheetRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
        : [];
      return toggle ? [toggle, ...inSheet] : inSheet;
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const list = focusables();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      const i = list.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && (i <= 0)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (i === -1 || i === list.length - 1)) {
        e.preventDefault();
        first.focus();
      }
    }

    // Close if the viewport grows past the mobile breakpoint.
    const mq = window.matchMedia('(min-width: 960px)');
    const onMq = () => mq.matches && onClose();

    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
      root.style.overflow = prevOverflow;
      toggle?.focus({ preventScroll: true });
    };
  }, [open, onClose, toggleRef]);

  function go(e: MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    onClose();
    // Wait for the scroll lock to lift before jumping.
    requestAnimationFrame(() => {
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    });
  }

  return (
    <div
      id="mobile-menu"
      ref={sheetRef}
      className={s.sheet}
      data-open={open || undefined}
      hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <nav aria-label="Main">
        <ul className={s.sheetLinks}>
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <a href={l.href} className={s.sheetLink} onClick={(e) => go(e, l.href)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className={s.sheetFoot}>
        <Button
          href="#assessment"
          size="lg"
          fullWidth
          onClick={(e) => {
            e.preventDefault();
            onClose();
            requestAnimationFrame(() => goToAssessment());
          }}
        >
          {NAV_CTA}
        </Button>
      </div>
    </div>
  );
}
