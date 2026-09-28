'use client';

import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { useField } from './Field';
import styles from './controls.module.css';

type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, rows = 3, ...rest },
  ref,
) {
  const { id, describedBy, invalid } = useField();
  return (
    <textarea
      ref={ref}
      id={id}
      rows={rows}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      className={[styles.input, styles.textarea, className].filter(Boolean).join(' ')}
      {...rest}
    />
  );
});
