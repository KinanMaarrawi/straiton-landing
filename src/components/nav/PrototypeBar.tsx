import { PROTOTYPE_NOTICE } from '@/content/copy';
import s from './PrototypeBar.module.css';

/**
 * The page's single demo disclosure (replaces per-item Demo/Illustrative
 * tags). Sits above the sticky nav and scrolls away; the in-the-moment
 * messages (contact notice, form privacy line, receipt) still say that
 * nothing is sent when it matters.
 */
export function PrototypeBar() {
  return (
    <aside className={s.bar} aria-label="About this page">
      <p className={s.text}>{PROTOTYPE_NOTICE}</p>
    </aside>
  );
}
