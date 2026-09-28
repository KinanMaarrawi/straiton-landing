import type { ReactNode } from 'react';
import styles from './SpecTable.module.css';

export type SpecRow = {
  label: string;
  value: ReactNode;
  /** Value is (or starts with) a tag: centre-align and give it room. */
  tag?: boolean;
};

type SpecTableProps = {
  rows: SpecRow[];
  /** Desktop: split into two side-by-side columns (DESIGN.md §9, 03 Complete). */
  columns?: 1 | 2;
};

/**
 * Spec table: no outer card, hairline separators, label column 40%.
 * Stacks label above value in narrow containers.
 */
export function SpecTable({ rows, columns = 1 }: SpecTableProps) {
  const perColumn = Math.ceil(rows.length / columns);
  return (
    <div className={styles.wrap}>
    <dl
      data-stagger="tight"
      className={[styles.table, columns === 2 && styles.two].filter(Boolean).join(' ')}
      style={{ ['--rows' as string]: perColumn }}
    >
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={[styles.row, row.tag && styles.hasTag].filter(Boolean).join(' ')}
          data-col-end={columns === 2 && (i === perColumn - 1 || i === rows.length - 1) ? '' : undefined}
        >
          <dt className={styles.label}>{row.label}</dt>
          <dd className={styles.value}>{row.value}</dd>
        </div>
      ))}
    </dl>
    </div>
  );
}
