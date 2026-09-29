'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { formatMoney, type Currency } from '@/lib/amount';

export type FormMode = 'planning' | 'bankQuote';

type PageState = {
  /** Digit string shared by the hero starter and the form's amount field. */
  amount: string;
  setAmount: (digits: string) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  mode: FormMode;
  setMode: (m: FormMode) => void;
  /** "AED 250,000" once an amount exists; null otherwise. */
  amountLabel: string | null;
  /** The form was submitted: the route settles on the endpoint, label reads "Arrived". */
  arrived: boolean;
  setArrived: (v: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  /** Scroll to the form (optionally switching mode) and move focus into it. */
  goToAssessment: (mode?: FormMode) => void;
};

const Ctx = createContext<PageState | null>(null);

export function usePageState(): PageState {
  const v = useContext(Ctx);
  if (!v) throw new Error('usePageState must be used inside <PageStateProvider>');
  return v;
}

export const FORM_FOCUS_ID = 'assessment-card-title';

export function PageStateProvider({ children }: { children: ReactNode }) {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<Currency>('AED');
  const [mode, setMode] = useState<FormMode>('planning');
  const [arrived, setArrived] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const goToAssessment = useCallback((next?: FormMode) => {
    if (next) setMode(next);
    const section = document.getElementById('assessment');
    if (!section) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Land the form card in view on small screens; the section top on large.
    const target = window.innerWidth < 960 ? document.getElementById('assessment-card') ?? section : section;
    // No hash is written, so a reload still opens at the top of the journey.
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    // Focus without a second jump, once the form has re-rendered for the mode.
    requestAnimationFrame(() => document.getElementById(FORM_FOCUS_ID)?.focus({ preventScroll: true }));
  }, []);

  const value = useMemo<PageState>(
    () => ({
      amount,
      setAmount,
      currency,
      setCurrency,
      mode,
      setMode,
      amountLabel: amount && Number(amount) > 0 ? formatMoney(currency, amount) : null,
      arrived,
      setArrived,
      menuOpen,
      setMenuOpen,
      goToAssessment,
    }),
    [amount, currency, mode, arrived, menuOpen, goToAssessment],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
