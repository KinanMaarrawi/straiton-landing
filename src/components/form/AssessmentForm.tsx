'use client';

import { useEffect, useRef, useState, type ClipboardEvent, type FormEvent } from 'react';
import { FORM } from '@/content/copy';
import { formatMoney } from '@/lib/amount';
import { AmountInput } from '@/components/ui/AmountInput';
import { CURRENCY_OPTIONS } from '@/components/ui/AmountField';
import { Button } from '@/components/ui/Button';
import { ErrorSummary, type SummaryError } from '@/components/ui/ErrorSummary';
import { Field } from '@/components/ui/Field';
import { FileField } from '@/components/ui/FileField';
import { CheckIcon } from '@/components/ui/icons';
import { Segmented } from '@/components/ui/Segmented';
import { Select } from '@/components/ui/Select';
import { Tag } from '@/components/ui/Tag';
import { Textarea } from '@/components/ui/Textarea';
import { TextInput } from '@/components/ui/TextInput';
import { FORM_FOCUS_ID, usePageState, type FormMode } from '@/components/state/PageState';
import {
  MAX_FILE_BYTES,
  STEP1_FIELDS,
  STEP2_FIELDS,
  validateField,
  validateFields,
  type ContactBy,
  type Errors,
  type FieldName,
  type Values,
} from './validate';
import s from './AssessmentForm.module.css';

type Step = 1 | 2 | 'sending' | 'done';

/** Field ids: the error summary links to these. */
const ID: Record<FieldName, string> = {
  amount: 'fa-amount',
  paymentType: 'fa-type',
  file: 'fa-file',
  fullName: 'fa-name',
  email: 'fa-email',
  company: 'fa-company',
  phone: 'fa-phone',
};

const LABEL: Record<FieldName, string> = {
  amount: FORM.amountLabel,
  paymentType: FORM.typeLabel,
  file: FORM.fileLabel,
  fullName: FORM.nameLabel,
  email: FORM.emailLabel,
  company: FORM.companyLabel,
  phone: FORM.phoneLabel,
};

const EMPTY = { paymentType: '', notes: '', fullName: '', email: '', company: '', phone: '', contactBy: 'email' as ContactBy };

/**
 * Two-step assessment request (DESIGN.md §10, README state model).
 * Nothing is sent: "sending" is a ~900ms simulation, then a local receipt.
 */
export function AssessmentForm() {
  const { amount, setAmount, currency, setCurrency, mode, setMode, setArrived } = usePageState();
  const [step, setStep] = useState<Step>(1);
  const [rest, setRest] = useState(EMPTY);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | undefined>();
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [summary, setSummary] = useState<SummaryError[] | null>(null);
  const [amountPasteError, setAmountPasteError] = useState(false);

  const summaryRef = useRef<HTMLDivElement>(null);
  const doneHeadingRef = useRef<HTMLHeadingElement>(null);
  const pendingFocus = useRef<string | null>(null);

  const values: Values = { amount, ...rest };
  const sending = step === 'sending';

  // Move focus after the DOM for the new state exists.
  useEffect(() => {
    const id = pendingFocus.current;
    if (!id) return;
    pendingFocus.current = null;
    if (id === '@summary') summaryRef.current?.focus();
    else if (id === '@done') doneHeadingRef.current?.focus();
    else document.getElementById(id)?.focus();
  });

  // Simulated send.
  useEffect(() => {
    if (step !== 'sending') return;
    const t = window.setTimeout(() => {
      setStep('done');
      setArrived(true);
      pendingFocus.current = '@done';
    }, 900);
    return () => window.clearTimeout(t);
  }, [step, setArrived]);

  function errorFor(name: FieldName): string | undefined {
    if (name === 'amount' && amountPasteError) return FORM.errors.amountInvalid;
    return touched[name] ? errors[name] : undefined;
  }

  /** Revalidate a field that's already showing an error, so it clears as you fix it. */
  function update<K extends keyof typeof EMPTY>(key: K, value: (typeof EMPTY)[K]) {
    const next = { ...rest, [key]: value };
    setRest(next);
    const v = { amount, ...next };
    setErrors((prev) => {
      const out = { ...prev };
      for (const n of Object.keys(prev) as FieldName[]) {
        if (n === 'file') continue;
        const msg = validateField(n, v);
        if (msg) out[n] = msg;
        else delete out[n];
      }
      // Changing the contact method can make phone required (or not).
      if (key === 'contactBy' && touched.phone) {
        const msg = validateField('phone', v);
        if (msg) out.phone = msg;
        else delete out.phone;
      }
      return out;
    });
  }

  function onAmount(digits: string) {
    setAmount(digits);
    setAmountPasteError(false);
    if (errors.amount) {
      const msg = validateField('amount', { ...values, amount: digits });
      setErrors((p) => {
        const o = { ...p };
        if (msg) o.amount = msg;
        else delete o.amount;
        return o;
      });
    }
  }

  function onAmountPaste(e: ClipboardEvent<HTMLInputElement>) {
    const text = e.clipboardData.getData('text');
    // Digits, grouping commas and spaces are fine. Anything else (decimals, letters) is not.
    if (/[^\d,\s]/.test(text.replace(/^\s*(AED|USD)\s*/i, ''))) {
      e.preventDefault();
      setAmountPasteError(true);
      setTouched((t) => ({ ...t, amount: true }));
    }
  }

  /*
   * Blur validation waits until any pointer press is released. Otherwise a
   * new error message shifts the layout between mousedown and mouseup, and
   * the click the user aimed (Continue, a contact option) misses its target.
   */
  const pointerDown = useRef(false);
  const pendingBlur = useRef<Set<FieldName>>(new Set());
  const valuesRef = useRef(values);
  valuesRef.current = values;

  function applyBlur(name: FieldName) {
    setTouched((t) => ({ ...t, [name]: true }));
    const msg = validateField(name, valuesRef.current);
    setErrors((p) => {
      const o = { ...p };
      if (msg) o[name] = msg;
      else delete o[name];
      return o;
    });
  }

  useEffect(() => {
    const up = () => {
      if (!pointerDown.current) return;
      pointerDown.current = false;
      // Let the click (and any submit) run first, then show deferred errors.
      window.setTimeout(() => {
        pendingBlur.current.forEach(applyBlur);
        pendingBlur.current.clear();
      }, 0);
    };
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    return () => {
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- applyBlur reads refs only
  }, []);

  function blur(name: FieldName) {
    if (pointerDown.current) pendingBlur.current.add(name);
    else applyBlur(name);
  }

  function onFile(f: File | null) {
    if (f && f.size > MAX_FILE_BYTES) {
      setFile(null);
      setFileError(FORM.errors.fileTooLarge);
      return;
    }
    setFileError(undefined);
    setFile(f);
  }

  function check(fields: FieldName[]): boolean {
    const found = validateFields(fields, values);
    if (fields.includes('amount') && amountPasteError && !found.amount) found.amount = FORM.errors.amountInvalid;
    setErrors((p) => ({ ...p, ...found }));
    setTouched((t) => ({ ...t, ...Object.fromEntries(fields.map((f) => [f, true])) }));
    const list = fields.filter((f) => found[f]).map((f) => ({ fieldId: ID[f], label: LABEL[f] }));
    if (list.length) {
      setSummary(list);
      pendingFocus.current = '@summary';
      return false;
    }
    setSummary(null);
    return true;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (step === 1) {
      if (!check(STEP1_FIELDS)) return;
      setStep(2);
      pendingFocus.current = ID.fullName;
    } else if (step === 2) {
      if (!check(STEP2_FIELDS)) return;
      setStep('sending');
    }
  }

  function back() {
    setSummary(null);
    setStep(1);
    pendingFocus.current = ID.amount;
  }

  function reset() {
    setRest(EMPTY);
    setFile(null);
    setFileError(undefined);
    setErrors({});
    setTouched({});
    setSummary(null);
    setAmountPasteError(false);
    setAmount('');
    setCurrency('AED');
    setMode('planning');
    setArrived(false);
    setStep(1);
    pendingFocus.current = FORM_FOCUS_ID;
  }

  if (step === 'done') {
    const typeLabel = FORM.types.find((t) => t.value === rest.paymentType)?.label ?? '';
    const contactLabel = FORM.contactOptions.find((c) => c.value === rest.contactBy)?.label ?? '';
    return (
      <div className={`${s.card} ${s.enter}`} id="assessment-card">
        <div className={s.doneHead}>
          <span className={s.doneIcon} aria-hidden="true">
            <CheckIcon size={14} />
          </span>
          <h3 ref={doneHeadingRef} tabIndex={-1} className={s.doneTitle}>
            {FORM.done.heading}
          </h3>
        </div>
        <p className={s.doneLine}>{FORM.done.line}</p>
        <div className={s.receipt}>
          <p className={s.receiptTitle}>{FORM.done.receiptTitle}</p>
          <dl>
            <div>
              <dt>{FORM.done.rows.amount}</dt>
              <dd className={s.money}>{formatMoney(currency, amount)}</dd>
            </div>
            <div>
              <dt>{FORM.done.rows.currency}</dt>
              <dd>{currency}</dd>
            </div>
            <div>
              <dt>{FORM.done.rows.type}</dt>
              <dd>{typeLabel}</dd>
            </div>
            <div>
              <dt>{FORM.done.rows.attached}</dt>
              <dd>{mode === 'bankQuote' && file ? FORM.done.yes : FORM.done.no}</dd>
            </div>
            <div>
              <dt>{FORM.done.rows.contact}</dt>
              <dd>{contactLabel}</dd>
            </div>
          </dl>
        </div>
        <p className={s.doneNext}>{FORM.done.next}</p>
        <div className={s.doneActions}>
          <Button variant="secondary" onClick={reset}>
            {FORM.done.again}
          </Button>
        </div>
      </div>
    );
  }

  const onStep1 = step === 1;

  return (
    <form
      className={s.card}
      id="assessment-card"
      noValidate
      onSubmit={onSubmit}
      onPointerDownCapture={() => {
        pointerDown.current = true;
      }} aria-busy={sending || undefined} aria-labelledby={FORM_FOCUS_ID}>
      <div className={s.head}>
        <h3 id={FORM_FOCUS_ID} tabIndex={-1} className={s.title}>
          {FORM.title}
        </h3>
        <p className={s.progressText} aria-live="polite">
          {FORM.progress(onStep1 ? 1 : 2)}
        </p>
      </div>
      <div className={s.bar} aria-hidden="true">
        <span data-on />
        <span data-on={!onStep1 || undefined} />
      </div>

      {summary && (
        <div className={s.summary}>
          <ErrorSummary ref={summaryRef} errors={summary} />
        </div>
      )}

      {onStep1 ? (
        <div key="step1" className={s.step}>
          <div className={s.mode}>
            <Segmented<FormMode>
              name="mode"
              legend={FORM.modeLegend}
              variant="mode"
              value={mode}
              onChange={setMode}
              options={[
                { value: 'planning', label: FORM.modes.planning },
                { value: 'bankQuote', label: FORM.modes.bankQuote },
              ]}
            />
          </div>
          <div className={s.fields}>
            <Field id={ID.amount} label={FORM.amountLabel} error={errorFor('amount')}>
              <AmountInput
                name="amount"
                digits={amount}
                onDigitsChange={onAmount}
                onPaste={onAmountPaste}
                onBlur={() => blur('amount')}
                placeholder={FORM.amountPlaceholder}
              />
            </Field>
            <Field label={FORM.currencyLabel} as="group">
              <Segmented name="currency" value={currency} onChange={setCurrency} options={CURRENCY_OPTIONS} />
            </Field>
            <Field id={ID.paymentType} label={FORM.typeLabel} error={errorFor('paymentType')}>
              <Select
                name="paymentType"
                options={FORM.types}
                placeholder={FORM.typePlaceholder}
                value={rest.paymentType}
                onChange={(e) => update('paymentType', e.target.value)}
                onBlur={() => blur('paymentType')}
              />
            </Field>
            {mode === 'bankQuote' && (
              <>
                <FileField
                  id={ID.file}
                  label={FORM.fileLabel}
                  hint={FORM.fileHint}
                  file={file}
                  onFileChange={onFile}
                  error={fileError}
                  chooseLabel={FORM.fileChoose}
                  dropText={FORM.fileDrop}
                  keptNote={FORM.fileKept}
                  removeLabel={FORM.fileRemove}
                />
                <Field label={FORM.notesLabel}>
                  <Textarea
                    name="notes"
                    placeholder={FORM.notesPlaceholder}
                    value={rest.notes}
                    onChange={(e) => update('notes', e.target.value)}
                  />
                </Field>
              </>
            )}
          </div>
          <div className={s.actions}>
            <Button type="submit" fullWidth>
              {FORM.continue}
            </Button>
          </div>
        </div>
      ) : (
        <div key="step2" className={s.step}>
          <div className={s.fields}>
            <Field id={ID.fullName} label={FORM.nameLabel} error={errorFor('fullName')}>
              <TextInput
                name="name"
                autoComplete="name"
                value={rest.fullName}
                readOnly={sending}
                onChange={(e) => update('fullName', e.target.value)}
                onBlur={() => blur('fullName')}
              />
            </Field>
            <Field id={ID.email} label={FORM.emailLabel} error={errorFor('email')}>
              <TextInput
                name="email"
                type="email"
                autoComplete="email"
                placeholder={FORM.emailPlaceholder}
                value={rest.email}
                readOnly={sending}
                onChange={(e) => update('email', e.target.value)}
                onBlur={() => blur('email')}
              />
            </Field>
            <Field id={ID.company} label={FORM.companyLabel} error={errorFor('company')}>
              <TextInput
                name="organization"
                autoComplete="organization"
                value={rest.company}
                readOnly={sending}
                onChange={(e) => update('company', e.target.value)}
                onBlur={() => blur('company')}
              />
            </Field>
            <Field id={ID.phone} label={FORM.phoneLabel} error={errorFor('phone')}>
              <TextInput
                name="tel"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder={FORM.phonePlaceholder}
                value={rest.phone}
                readOnly={sending}
                onChange={(e) => update('phone', e.target.value)}
                onBlur={() => blur('phone')}
              />
            </Field>
            <Field label={FORM.contactLabel} as="group">
              <Segmented<ContactBy>
                name="contactBy"
                value={rest.contactBy}
                onChange={(v) => update('contactBy', v)}
                disabled={sending}
                options={FORM.contactOptions as Array<{ value: ContactBy; label: string }>}
              />
            </Field>
          </div>
          <div className={`${s.actions} ${s.pair}`}>
            <Button variant="secondary" onClick={back} disabled={sending}>
              {FORM.back}
            </Button>
            <Button type="submit" loading={sending} loadingLabel={FORM.sending}>
              {FORM.send}
            </Button>
          </div>
          <p className={s.privacy}>
            {FORM.privacy} {FORM.privacyAfter}
          </p>
        </div>
      )}
    </form>
  );
}
