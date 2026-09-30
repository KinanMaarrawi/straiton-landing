import styles from './Stamp.module.css';

/**
 * An outlined, slightly rotated stamp, like one pressed onto a paper
 * document. Decorative: the fact it states is already said in the text.
 * - inside a Reveal (the quote document), it presses in once on first view;
 * - with `pressOnMount` (the form receipt), it presses in when it appears.
 */
export function Stamp({ label, pressOnMount, className }: { label: string; pressOnMount?: boolean; className?: string }) {
  return (
    <span
      className={[styles.stamp, pressOnMount && styles.onMount, className].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      {label}
    </span>
  );
}
