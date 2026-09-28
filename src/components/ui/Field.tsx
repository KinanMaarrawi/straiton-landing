'use client';

import { createContext, useContext, useId, type ReactNode } from 'react';
import { ErrorIcon } from './icons';
import styles from './Field.module.css';

type FieldContextValue = {
  id: string;
  describedBy: string | undefined;
  invalid: boolean;
};

const FieldContext = createContext<FieldContextValue | null>(null);

/** Read the ids a control inside <Field> must wire up. */
export function useField(): FieldContextValue {
  const ctx = useContext(FieldContext);
  if (!ctx) throw new Error('useField must be used inside <Field>');
  return ctx;
}

type FieldProps = {
  label: ReactNode;
  /** Pass to control the id (error summary links target it). */
  id?: string;
  hint?: ReactNode;
  error?: string;
  /** Rendered after the label on the same line, e.g. a Demo tag. */
  labelAside?: ReactNode;
  /**
   * Group fields (segmented radios) render a <fieldset>/<legend>
   * instead of <label for>, since there's no single control to label.
   */
  as?: 'field' | 'group';
  children: ReactNode;
  className?: string;
};

/**
 * Label above, hint below, error below that (DESIGN.md §10).
 * Errors carry an icon and words; the control gets aria-invalid and
 * aria-describedby through context.
 */
export function Field({ label, id, hint, error, labelAside, as = 'field', children, className }: FieldProps) {
  const autoId = useId();
  const fieldId = id ?? `f${autoId.replace(/:/g, '')}`;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;
  const ctx: FieldContextValue = { id: fieldId, describedBy, invalid: Boolean(error) };

  const labelEl =
    as === 'group' ? (
      <legend className={styles.label} id={`${fieldId}-label`}>
        {label}
      </legend>
    ) : (
      <label className={styles.label} htmlFor={fieldId}>
        {label}
      </label>
    );

  const body = (
    <>
      {labelAside ? (
        <div className={styles.labelRow}>
          {labelEl}
          {labelAside}
        </div>
      ) : (
        labelEl
      )}
      <div className={styles.control}>{children}</div>
      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className={styles.error}>
          <ErrorIcon className={styles.errorIcon} />
          <span>{error}</span>
        </p>
      )}
    </>
  );

  return (
    <FieldContext.Provider value={ctx}>
      {as === 'group' ? (
        <fieldset
          className={[styles.field, styles.fieldset, className].filter(Boolean).join(' ')}
          aria-describedby={describedBy}
        >
          {body}
        </fieldset>
      ) : (
        <div className={[styles.field, className].filter(Boolean).join(' ')}>{body}</div>
      )}
    </FieldContext.Provider>
  );
}
