import type { ReactNode } from 'react';
import styles from './Tag.module.css';

export type TagVariant = 'pilot' | 'tbc' | 'illustrative' | 'demo';

type TagProps = {
  variant: TagVariant;
  /** Defaults to the canonical label for the variant. */
  children?: ReactNode;
  /** sm = 20px tall / 12px, used beside field labels and footer headings. */
  size?: 'md' | 'sm';
  className?: string;
};

const DEFAULT_LABEL: Record<TagVariant, string> = {
  pilot: 'India pilot',
  tbc: 'To be confirmed',
  illustrative: 'Illustrative',
  demo: 'Demo',
};

/** Status tags always carry words, so state never relies on colour. */
export function Tag({ variant, children, size = 'md', className }: TagProps) {
  const cls = [styles.tag, styles[variant], size === 'sm' && styles.sm, className]
    .filter(Boolean)
    .join(' ');
  return <span className={cls}>{children ?? DEFAULT_LABEL[variant]}</span>;
}
