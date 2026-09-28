'use client';

import { useRef, useState, type DragEvent, type RefObject } from 'react';
import { Field, useField } from './Field';
import { FileIcon, UploadIcon } from './icons';
import { Tag } from './Tag';
import styles from './FileField.module.css';

type FileFieldProps = {
  id: string;
  label: string;
  hint: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  error?: string;
  disabled?: boolean;
  chooseLabel?: string;
  dropText?: string;
  keptNote?: string;
  removeLabel?: string;
  accept?: string;
};

/**
 * Bank-quote attach (DESIGN.md §10). Drop zone plus button on wider
 * cards; a single full-width "Choose file" button on mobile. The file
 * never leaves the browser, and the field is tagged Demo.
 */
export function FileField({
  id,
  label,
  hint,
  file,
  onFileChange,
  error,
  disabled,
  chooseLabel = 'Choose file',
  dropText = 'or drag it here',
  keptNote = 'Stays in your browser',
  removeLabel = 'Remove',
  accept = 'application/pdf,image/*',
}: FileFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    const f = e.dataTransfer.files?.[0];
    if (f) onFileChange(f);
  }

  function remove() {
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = '';
    // The Remove button unmounts; hand focus back to the picker.
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  return (
    <Field id={id} label={label} hint={hint} error={error} labelAside={<Tag variant="demo" size="sm" />}>
      <FileInput inputRef={inputRef} accept={accept} disabled={disabled} inert={Boolean(file)} onPick={onFileChange} />
      {file ? (
        <div className={styles.selected}>
          <span className={styles.fileInfo}>
            <FileIcon className={styles.fileIcon} />
            <span className={styles.fileText}>
              <span className={styles.fileName}>{file.name}</span>
              <span className={styles.kept}>{keptNote}</span>
            </span>
          </span>
          <button type="button" className={styles.remove} onClick={remove} disabled={disabled}>
            {removeLabel}
            <span className="visually-hidden"> {file.name}</span>
          </button>
        </div>
      ) : (
        <div
          className={styles.drop}
          data-dragging={dragging || undefined}
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled) setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          {/* Mouse/touch target; keyboard and AT use the real input. */}
          <label htmlFor={id} className={styles.choose} aria-hidden="true">
            <UploadIcon className={styles.uploadIcon} />
            {chooseLabel}
          </label>
          <span className={styles.dropText} aria-hidden="true">
            {dropText}
          </span>
        </div>
      )}
    </Field>
  );
}

/** The real control: visually hidden but focusable; its focus ring is drawn on the button. */
function FileInput({
  inputRef,
  accept,
  disabled,
  inert,
  onPick,
}: {
  inputRef: RefObject<HTMLInputElement | null>;
  accept: string;
  disabled?: boolean;
  /** A file is selected: the picker leaves the tab order until Remove. */
  inert: boolean;
  onPick: (f: File | null) => void;
}) {
  const { id, describedBy, invalid } = useField();
  return (
    <input
      ref={inputRef}
      id={id}
      type="file"
      accept={accept}
      disabled={disabled}
      tabIndex={inert ? -1 : undefined}
      aria-hidden={inert || undefined}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      className={`visually-hidden ${styles.input}`}
      onChange={(e) => onPick(e.target.files?.[0] ?? null)}
    />
  );
}
