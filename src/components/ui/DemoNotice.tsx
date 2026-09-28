'use client';

import { CloseIcon } from './icons';
import { Tag } from './Tag';
import styles from './DemoNotice.module.css';

type DemoNoticeProps = {
  open: boolean;
  message: string;
  onDismiss: () => void;
  dismissLabel?: string;
};

/**
 * Inline "demo contact" notice under the contact buttons (DESIGN.md §9).
 * The role="status" region is always mounted so the message is announced
 * without moving focus. Opening it again never stacks a second notice.
 */
export function DemoNotice({ open, message, onDismiss, dismissLabel = 'Dismiss' }: DemoNoticeProps) {
  return (
    <div role="status" className={styles.region}>
      {open && (
        <div className={styles.panel}>
          <Tag variant="demo" />
          <p className={styles.message}>{message}</p>
          <button type="button" className={styles.dismiss} onClick={onDismiss} aria-label={dismissLabel}>
            <CloseIcon size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
