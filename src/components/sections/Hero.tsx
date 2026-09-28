'use client';

import type { MouseEvent } from 'react';
import { HERO, PRIMARY_CTA } from '@/content/copy';
import { project } from '@/lib/geo';
import { AmountField } from '@/components/ui/AmountField';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { usePageState } from '@/components/state/PageState';
import { Section } from './Section';
import s from './Hero.module.css';

// Dubai Creek in the hero map's viewBox (606 × 680), as percentages.
const [DX, DY] = project('hero', [55.3, 25.27]);
const START = { left: `${(DX / 606) * 100}%`, top: `${(DY / 680) * 100}%` };

export function Hero() {
  const { amount, setAmount, currency, setCurrency, goToAssessment } = usePageState();

  function onPrimary(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    goToAssessment();
  }

  function onCompare(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    goToAssessment('bankQuote');
  }

  return (
    <Section id="top" run="hero" lane="left" className={s.hero} labelledBy="hero-title">
      <div className={s.text}>
        <p className={s.eyebrowRow} data-pt="start">
          <span className="t-eyebrow">{HERO.eyebrow}</span>
          <Tag variant="pilot" />
        </p>
        <h1 id="hero-title" className={`t-display ${s.h1}`}>
          <span className={s.line}>Same sea.</span> <span className={s.line}>Better paperwork.</span>
        </h1>
        <p className={`t-lead ${s.lead}`}>{HERO.lead}</p>
        <div className={s.starter}>
          <AmountField
            label={HERO.amountLabel}
            hint={HERO.hint}
            placeholder={HERO.placeholder}
            digits={amount}
            onDigitsChange={setAmount}
            currency={currency}
            onCurrencyChange={setCurrency}
            name="hero-amount"
            currencyName="hero-currency"
          />
          <div className={s.actions}>
            <Button href="#assessment" size="lg" className={s.primary} onClick={onPrimary}>
              {PRIMARY_CTA}
            </Button>
            <Button href="#assessment" variant="tertiary" onClick={onCompare}>
              {HERO.bankQuoteLink}
            </Button>
            <p className={s.micro}>{HERO.micro}</p>
          </div>
        </div>
      </div>
      <div className={s.mapCol}>
        <div className={s.map} data-map="hero" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element -- static decorative SVG */}
          <img src="/maps/hero.svg" alt="" width={606} height={680} className={s.mapImg} />
          <span className={s.startDot} style={START} />
          <span className={s.startLabel} style={START}>
            <strong>{HERO.pointTitle}</strong>
            <span>{HERO.pointSub}</span>
          </span>
        </div>
        <p className={s.caption}>{HERO.caption}</p>
      </div>
    </Section>
  );
}
