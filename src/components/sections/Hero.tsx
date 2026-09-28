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

/** Entrance delay for the hero's one-time load sequence (motion.css). */
const delay = (ms: number) => ({ ['--enter-delay' as string]: `${ms}ms` });

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
        <p className={`${s.eyebrowRow} enter-rise`} data-pt="start" style={delay(0)}>
          <span className="t-eyebrow">{HERO.eyebrow}</span>
          <Tag variant="pilot" />
        </p>
        <h1 id="hero-title" className={`t-display ${s.h1}`}>
          <span className={`${s.line} enter-line`} style={delay(120)}>
            <span>Same sea.</span>
          </span>{' '}
          <span className={`${s.line} enter-line`} style={delay(240)}>
            <span>Better paperwork.</span>
          </span>
        </h1>
        <p className={`t-lead ${s.lead} enter-rise`} style={delay(420)}>
          {HERO.lead}
        </p>
        <div className={`${s.starter} enter-rise`} style={delay(540)}>
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
        <div className={`${s.map} enter-map`} data-map="hero" aria-hidden="true" style={delay(150)}>
          {/* eslint-disable-next-line @next/next/no-img-element -- static decorative SVG */}
          <img src="/maps/hero.svg" alt="" width={606} height={680} className={s.mapImg} />
          <span className={`${s.startDot} enter-fade`} style={{ ...START, ...delay(700) }} />
          <span className={`${s.startLabel} enter-rise`} style={{ ...START, ...delay(820) }}>
            <strong>{HERO.pointTitle}</strong>
            <span>{HERO.pointSub}</span>
          </span>
        </div>
        <p className={`${s.caption} enter-fade`} style={delay(1000)}>
          {HERO.caption}
        </p>
      </div>
    </Section>
  );
}
