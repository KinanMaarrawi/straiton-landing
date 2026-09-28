import { FORM } from '@/content/copy';

const E = FORM.errors;

export type ContactBy = 'email' | 'whatsapp' | 'call';

export type Values = {
  amount: string;
  paymentType: string;
  notes: string;
  fullName: string;
  email: string;
  company: string;
  phone: string;
  contactBy: ContactBy;
};

export type FieldName = 'amount' | 'paymentType' | 'file' | 'fullName' | 'email' | 'company' | 'phone';
export type Errors = Partial<Record<FieldName, string>>;

export const STEP1_FIELDS: FieldName[] = ['amount', 'paymentType'];
export const STEP2_FIELDS: FieldName[] = ['fullName', 'email', 'company', 'phone'];

export const MAX_FILE_BYTES = 10 * 1024 * 1024;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** "+" then 8–15 digits; spaces, dashes and brackets allowed between. */
export function isValidPhone(v: string): boolean {
  const t = v.trim();
  if (!/^\+[\d\s\-()]+$/.test(t)) return false;
  const digits = t.replace(/\D/g, '').length;
  return digits >= 8 && digits <= 15;
}

export function validateField(name: FieldName, v: Values): string | undefined {
  switch (name) {
    case 'amount':
      if (!v.amount) return E.amountEmpty;
      if (!/^\d+$/.test(v.amount)) return E.amountInvalid;
      if (Number(v.amount) === 0) return E.amountZero;
      return;
    case 'paymentType':
      return v.paymentType ? undefined : E.typeEmpty;
    case 'fullName':
      return v.fullName.trim() ? undefined : E.nameEmpty;
    case 'email':
      if (!v.email.trim()) return E.emailEmpty;
      return EMAIL_RE.test(v.email.trim()) ? undefined : E.emailInvalid;
    case 'company':
      return v.company.trim() ? undefined : E.companyEmpty;
    case 'phone': {
      const needed = v.contactBy === 'whatsapp' || v.contactBy === 'call';
      if (!v.phone.trim()) return needed ? E.phoneRequired : undefined;
      return isValidPhone(v.phone) ? undefined : E.phoneInvalid;
    }
    default:
      return;
  }
}

export function validateFields(names: FieldName[], v: Values): Errors {
  const out: Errors = {};
  for (const n of names) {
    const msg = validateField(n, v);
    if (msg) out[n] = msg;
  }
  return out;
}
