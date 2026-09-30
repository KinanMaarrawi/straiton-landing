import type { ReactNode } from 'react';
import styles from './Tag.module.css';

/** Status tags for product facts: in pilot, or not yet confirmed. */
export type TagVariant = 'pilot' | 'tbc';

type TagProps = {
  variant: TagVariant;
  /** Defaults to the canonical label for the variant. */
  children?: ReactNode;
  className?: string;
};

const DEFAULT_LABEL: Record<TagVariant, string> = {
  pilot: 'India pilot',
  tbc: 'To be confirmed',
};

/** Tags always carry words, so state never relies on colour. */
export function Tag({ variant, children, className }: TagProps) {
  const cls = [styles.tag, styles[variant], className]
    .filter(Boolean)
    .join(' ');
  return <span className={cls}>{children ?? DEFAULT_LABEL[variant]}</span>;
}
