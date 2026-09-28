'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { useField } from './Field';
import styles from './controls.module.css';

type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  /** Plex Mono + tabular figures. Money only. */
  mono?: boolean;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { mono, className, type = 'text', ...rest },
  ref,
) {
  const { id, describedBy, invalid } = useField();
  return (
    <input
      ref={ref}
      id={id}
      type={type}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      className={[styles.input, mono && styles.mono, className].filter(Boolean).join(' ')}
      {...rest}
    />
  );
});
