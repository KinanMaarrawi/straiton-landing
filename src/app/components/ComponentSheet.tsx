'use client';

import { useState, type ReactNode } from 'react';
import type { Currency } from '@/lib/amount';
import { Accordion } from '@/components/ui/Accordion';
import { AmountField, CURRENCY_OPTIONS } from '@/components/ui/AmountField';
import { AmountInput } from '@/components/ui/AmountInput';
import { Button } from '@/components/ui/Button';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { DirhamSign } from '@/components/ui/DirhamSign';
import { ErrorSummary } from '@/components/ui/ErrorSummary';
import { Field } from '@/components/ui/Field';
import { FileField } from '@/components/ui/FileField';
import { QuoteDocument } from '@/components/ui/QuoteDocument';
import { Segmented } from '@/components/ui/Segmented';
import { Select } from '@/components/ui/Select';
import { SpecTable, type SpecRow } from '@/components/ui/SpecTable';
import { Tag } from '@/components/ui/Tag';
import { Textarea } from '@/components/ui/Textarea';
import { TextInput } from '@/components/ui/TextInput';
import { Stepper } from '@/components/ui/Stepper';
import { PrototypeBar } from '@/components/nav/PrototypeBar';
import { RouteMarker, RouteWaypoint } from '@/components/route/RouteMarks';
import { ManagerChat } from '@/components/sections/ManagerChat';
import { TRACK } from '@/content/copy';
import s from './ComponentSheet.module.css';

const COLOURS: Array<[string, string, string]> = [
  ['navy-900', '#0B2231', 'Ink, dark sections, footer'],
  ['navy-800', '#12303F', 'Raised on dark'],
  ['ink-700', '#3D5260', 'Secondary text'],
  ['ink-500', '#5F707B', 'Captions, hints'],
  ['line-200', '#DCE3E2', 'Hairlines'],
  ['surface-50', '#F3F6F5', 'Alternate sections'],
  ['white', '#FFFFFF', 'Default ground'],
  ['teal-500', '#17B3A0', 'Primary fill, route, passed waypoint. Navy text only.'],
  ['teal-700', '#0B7A6E', 'Teal text on light'],
  ['teal-50', '#E7F4F1', 'Selected, highlight row'],
  ['amber-50', '#FBF1DC', 'Pilot / TBC tag fill'],
  ['amber-800', '#7A5200', 'Pilot / TBC tag text'],
  ['red-700', '#B42318', 'Error text, error border'],
  ['red-50', '#FDECEA', 'Error summary fill'],
];

const SPEC_ROWS: SpecRow[] = [
  { label: 'From', value: 'United Arab Emirates' },
  { label: 'To', value: 'India' },
  { label: 'Funding currencies', value: 'AED / USD' },
  { label: 'Supplier receives', value: 'INR' },
  { label: 'Beneficiary type', value: 'Eligible Indian businesses' },
  { label: 'Payment types', value: 'Supplier payments · Invoice payments · Other eligible business payments' },
  { label: 'Expected timing', value: 'Same-day where supported' },
  { label: 'Payout', value: 'INR business payout, subject to confirmed capability' },
  { label: 'Payout method', value: <Tag variant="tbc" />, tag: true },
  { label: 'Cut-off', value: <Tag variant="tbc" />, tag: true },
  { label: 'Minimum / maximum amount', value: <Tag variant="tbc" />, tag: true },
  { label: 'Required information', value: 'Transaction-specific' },
  { label: 'Tracking', value: 'Payment status and confirmation' },
  {
    label: 'Status',
    value: (
      <>
        <Tag variant="pilot" />
        Pilot preparation
      </>
    ),
    tag: true,
  },
];

const PAYMENT_TYPES = [
  { value: 'supplier', label: 'Supplier payment' },
  { value: 'invoice', label: 'Invoice payment' },
  { value: 'other', label: 'Other eligible business payment' },
];

function Section({ n, title, lead, children, dark }: { n: string; title: string; lead?: ReactNode; children: ReactNode; dark?: boolean }) {
  return (
    <section className={s.section} data-surface={dark ? 'dark' : undefined}>
      <p className="t-eyebrow">{n}</p>
      <h2 className={s.h2}>{title}</h2>
      {lead && <p className={s.lead}>{lead}</p>}
      <div className={s.body}>{children}</div>
    </section>
  );
}

function Caption({ children }: { children: ReactNode }) {
  return <p className={s.caption}>{children}</p>;
}

export function ComponentSheet() {
  const [heroDigits, setHeroDigits] = useState('250000');
  const [heroCurrency, setHeroCurrency] = useState<Currency>('AED');
  const [formDigits, setFormDigits] = useState('');
  const [currency, setCurrency] = useState<Currency>('AED');
  const [contact, setContact] = useState<'email' | 'whatsapp' | 'call'>('email');
  const [mode, setMode] = useState<'planning' | 'bankQuote'>('planning');
  const [file, setFile] = useState<File | null>(null);
  const [demoFile] = useState(() =>
    typeof File === 'undefined' ? null : new File(['demo'], 'bank-quote-march.pdf', { type: 'application/pdf' }),
  );
  const [notice, setNotice] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <main className={s.page}>
      <header className={s.top}>
        <div>
          <p className={`wordmark ${s.wordmark}`}>STRAITON</p>
          <h1 className={s.h1}>Component sheet</h1>
        </div>
        <p className={s.meta}>
          UAE → India landing · built components
          <br />
          Source of truth: DESIGN.md
        </p>
      </header>

      <Section n="01 · Colour" title="Tokens" lead="Mostly white and navy ink. Teal means act or progress, nothing else. Amber marks what's unconfirmed.">
        <div className={s.swatches}>
          {COLOURS.map(([name, hex, role]) => (
            <div key={name}>
              <div className={s.swatch} style={{ background: `var(--${name})` }} />
              <p className={s.swatchName}>{name}</p>
              <p className={s.swatchHex}>{hex}</p>
              <p className={s.swatchRole}>{role}</p>
            </div>
          ))}
        </div>
        <div className={s.contrast}>
          <div className={s.contrastTeal}>
            <span>Navy on teal-500</span>
            <span>≈ 6:1 · Pass</span>
          </div>
          <div className={s.contrastNavy}>
            <span>Teal-500 on navy</span>
            <span>≈ 6:1 · Pass</span>
          </div>
        </div>
      </Section>

      <Section n="02 · Type" title="Scale" lead="Newsreader for headlines only. Plex Sans for everything readable. Plex Mono for money only. Fluid between 390 and 1440.">
        <div className={s.typeRows}>
          {[
            ['display', <p key="d" className="t-display">Same sea.</p>, 'Newsreader 300 · 90 / 52 · lh 0.98 · −0.02em'],
            ['h2', <p key="h" className="t-h2">Straight answers.</p>, 'Newsreader 350 · 60 / 36 · lh 1.04 · −0.015em'],
            ['h3', <p key="3" className="t-h3">What we check upfront</p>, 'Newsreader 400 · 30 / 24 · lh 1.2 · −0.01em'],
            ['lead', <p key="l" className="t-lead">Start with the basics. No account, no onboarding, no commitment.</p>, 'Plex Sans 400 · 21 / 18 · lh 1.5'],
            ['body', <p key="b" className="t-body">The details you hold don&apos;t match your supplier&apos;s bank records.</p>, 'Plex Sans 400 · 17 / 16 · lh 1.6 · max 62ch'],
            ['small', <p key="s" className="t-small">Final eligibility is subject to compliance review.</p>, 'Plex Sans 400 · 14'],
            ['label', <p key="la" className="t-label">How much are you sending?</p>, 'Plex Sans 500 · 14'],
            ['eyebrow', <p key="e" className="t-eyebrow">02 · Assess</p>, 'Plex Sans 500 · 14 · teal-700'],
            ['figure-lg', <p key="f" className="t-figure-lg">AED 250,000</p>, 'Plex Mono 400 · 32 / 24 · money only'],
            ['figure', <p key="fi" className="t-figure">250,000</p>, 'Plex Mono 400 · 16 / 15 · tabular'],
          ].map(([name, sample, spec]) => (
            <div key={name as string} className={s.typeRow}>
              <span className="t-label">{name}</span>
              <div className={s.typeSample}>{sample}</div>
              <span className={s.caption}>{spec}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section n="03 · Actions" title="Buttons" lead="One primary per view. Hover darkens about 6%, with no movement. Focus is always visible: tab through this row.">
        <div className={s.buttonGrid}>
          <span />
          <Caption>Default (hover, press, tab)</Caption>
          <Caption>Large (hero)</Caption>
          <Caption>Disabled</Caption>
          <Caption>Loading</Caption>

          <span className="t-label">Primary</span>
          <Button>Send request</Button>
          <Button size="lg">Request a payment assessment</Button>
          <Button disabled>Send request</Button>
          <Button loading={loading} onClick={() => setLoading(true)}>
            {loading ? 'Send request' : 'Click to load'}
          </Button>

          <span className="t-label">Secondary</span>
          <Button variant="secondary">Back</Button>
          <Button variant="secondary" size="lg">
            Start another request
          </Button>
          <Button variant="secondary" disabled>
            Back
          </Button>
          <Button variant="secondary" onClick={() => setLoading(false)}>
            Reset loading
          </Button>

          <span className="t-label">Tertiary</span>
          <Button variant="tertiary" href="#">
            Compare it with us →
          </Button>
          <span />
          <span />
          <span />
        </div>
        <div className={s.darkPanel} data-surface="dark">
          <span className="t-label">On navy</span>
          <Button tone="dark">WhatsApp</Button>
          <Button tone="dark" variant="secondary">
            Call
          </Button>
          <Button tone="dark" variant="secondary">
            Email
          </Button>
        </div>
      </Section>

      <Section n="04 · Input" title="Fields" lead="Label above, hint below, error below that. 48px tall, 16px text. Errors carry an icon and words, never just red.">
        <div className={s.fieldGrid}>
          <div>
            <Caption>Default · hover · focus (interact)</Caption>
            <Field label="Company name">
              <TextInput />
            </Field>
          </div>
          <div>
            <Caption>Filled</Caption>
            <Field label="Work email">
              <TextInput type="email" defaultValue="finance@company.com" />
            </Field>
          </div>
          <div>
            <Caption>Error</Caption>
            <Field label="Work email" error="Enter an email address like name@company.com.">
              <TextInput type="email" defaultValue="priya@" />
            </Field>
          </div>
          <div>
            <Caption>Disabled</Caption>
            <Field label="Company name">
              <TextInput disabled />
            </Field>
          </div>
          <div>
            <Caption>Read-only (sending)</Caption>
            <Field label="Full name">
              <TextInput readOnly defaultValue="Priya Nair" />
            </Field>
          </div>
          <div>
            <Caption>Amount (form) · digits only, separators as you type</Caption>
            <Field label="Payment amount">
              <AmountInput digits={formDigits} onDigitsChange={setFormDigits} placeholder="250,000" />
            </Field>
          </div>
          <div>
            <Caption>Amount + currency (hero, 56px)</Caption>
            <AmountField
              label="How much are you sending?"
              hint="A rough figure is fine. You can change it later."
              placeholder="250,000"
              digits={heroDigits}
              onDigitsChange={setHeroDigits}
              currency={heroCurrency}
              onCurrencyChange={setHeroCurrency}
            />
          </div>
          <div>
            <Caption>Select (native)</Caption>
            <Field label="Payment type">
              <Select options={PAYMENT_TYPES} placeholder="Select a payment type" defaultValue="" />
            </Field>
          </div>
          <div>
            <Caption>Segmented · arrow keys move</Caption>
            <Field label="How should we reach you?" as="group">
              <Segmented
                name="contact-demo"
                value={contact}
                onChange={setContact}
                options={[
                  { value: 'email', label: 'Email' },
                  { value: 'whatsapp', label: 'WhatsApp' },
                  { value: 'call', label: 'Call' },
                ]}
              />
            </Field>
          </div>
          <div>
            <Caption>Segmented · funding currency</Caption>
            <Field label="Funding currency" as="group">
              <Segmented name="currency-demo" value={currency} onChange={setCurrency} options={CURRENCY_OPTIONS} />
            </Field>
          </div>
          <div>
            <Caption>Mode switch</Caption>
            <Segmented
              name="mode-demo"
              legend="Request type"
              variant="mode"
              value={mode}
              onChange={setMode}
              options={[
                { value: 'planning', label: 'Planning a payment' },
                { value: 'bankQuote', label: 'I have a bank quote' },
              ]}
            />
          </div>
          <div>
            <Caption>Textarea</Caption>
            <Field label="Anything we should know about it? (optional)">
              <Textarea placeholder="e.g. the rate, fees or timing your bank quoted" />
            </Field>
          </div>
          <div className={s.span2}>
            <Caption>File attach (bank-quote mode): empty · live</Caption>
            <FileField
              id="file-demo"
              label="Your bank quote (optional)"
              hint="PDF, image or screenshot. In this demo, it stays in your browser."
              file={file}
              onFileChange={setFile}
            />
          </div>
          <div>
            <Caption>File attach: selected</Caption>
            <FileField
              id="file-demo-selected"
              label="Your bank quote (optional)"
              hint="PDF, image or screenshot. In this demo, it stays in your browser."
              file={demoFile}
              onFileChange={() => {}}
            />
          </div>
          <div>
            <Caption>File attach: too large</Caption>
            <FileField
              id="file-demo-error"
              label="Your bank quote (optional)"
              hint="PDF, image or screenshot. In this demo, it stays in your browser."
              file={null}
              onFileChange={() => {}}
              error="Choose a file under 10 MB."
            />
          </div>
          <div className={s.span2}>
            <Caption>Error summary</Caption>
            <ErrorSummary
              errors={[
                { fieldId: 'f-demo-amount', label: 'Payment amount' },
                { fieldId: 'f-demo-type', label: 'Payment type' },
              ]}
            />
          </div>
        </div>
      </Section>

      <div className={s.twoUp}>
        <Section n="05 · Labels" title="Tags" lead="Plex Sans 500, 13px, sentence case, 4px radius. Tags mark product facts that are unconfirmed or in pilot, in words, never colour alone.">
          <div className={s.tagRows}>
            <p>
              <Tag variant="pilot" /> <Tag variant="tbc" /> <span className={s.caption}>Unconfirmed or pilot status</span>
            </p>
            <p className={s.caption}>
              Demo and illustrative content is not tagged item by item. One page-level notice discloses it (section 14), backed
              by in-the-moment messages; the quote card and example chat keep a quiet plain-text label.
            </p>
          </div>
        </Section>
        <Section n="06 · Currency" title="Dirham sign" lead={'Inline SVG until fonts ship U+20C3. Sized in em, uses currentColor, role="img" aria-label="AED".'}>
          <div className={s.dirhams}>
            <figure>
              <DirhamSign size={96} strokeWidth={1.6} />
              <figcaption className={s.caption}>96px · display</figcaption>
            </figure>
            <figure>
              <DirhamSign size={32} />
              <figcaption className={s.caption}>32px · figure-lg</figcaption>
            </figure>
            <figure>
              <span className={s.inlinePair}>
                <DirhamSign />
                AED → ₹
              </span>
              <figcaption className={s.caption}>1em · inline, selectors</figcaption>
            </figure>
          </div>
        </Section>
      </div>

      <Section n="07 · Documents" title="Quote document and spec table">
        <div className={s.docs}>
          <div>
            <QuoteDocument amount="AED 250,000" />
            <div style={{ height: 24 }} />
            <QuoteDocument />
            <Caption>Fallback without a hero amount</Caption>
          </div>
          <div className={s.narrow}>
            <Caption>Narrow container: stacked</Caption>
            <QuoteDocument amount="USD 68,000" />
            <div style={{ height: 24 }} />
            <SpecTable rows={SPEC_ROWS.slice(6, 9)} />
          </div>
        </div>
        <div style={{ marginTop: 48 }}>
          <Caption>Spec table · two columns of seven rows (desktop)</Caption>
          <SpecTable rows={SPEC_ROWS} columns={2} />
        </div>
      </Section>

      <div className={s.twoUp}>
        <Section n="08 · Disclosure" title="Accordion" lead="Independent items. The glyph turns from + to − and the panel opens in 240ms (instant under reduced motion).">
          <Accordion
            defaultOpen={[1]}
            items={[
              {
                question: 'Do I need to hold or manage crypto?',
                answer:
                  'No. You fund in AED or USD and your supplier receives INR. Straiton can use stablecoins internally as a settlement layer, but you never hold, buy or manage crypto.',
              },
              {
                question: 'Do you guarantee same-day execution?',
                answer:
                  "No. Same-day execution may be available where supported, but timing depends on eligibility, documentation, cut-offs and review. We'll tell you what to expect before you fund.",
              },
              {
                question: 'What does my supplier receive?',
                answer:
                  'INR, paid to an eligible Indian business. Payout is subject to confirmed capability, and the payout method is being confirmed for the pilot.',
              },
            ]}
          />
        </Section>
        <Section n="09 · Route" title="Waypoints and line" lead="Only water already crossed is drawn. Waypoints stay hidden until the marker reaches them, then appear as a teal ring whose check draws in, with one ripple.">
          <div className={s.routeDemo} aria-hidden="true">
            <span className={s.routeCaption} style={{ top: 12 }}>Sailed course</span>
            <svg className={s.routeLine} viewBox="0 0 350 8" preserveAspectRatio="none">
              <path d="M4 4 H346" stroke="var(--teal-500)" strokeWidth="3.5" strokeDasharray="0 8" strokeLinecap="round" />
            </svg>
            <span className={s.routeCaption} style={{ top: 72 }}>Waypoint, passed</span>
            <RouteWaypoint x={178} y={80} passed />
            <span className={s.routeCaption} style={{ top: 142 }}>Marker, with the hero amount</span>
            <RouteMarker start={[178, 170]} label="AED 250,000" arrived={false} />
            <span className={s.routeCaption} style={{ top: 222 }}>Marker, no amount entered</span>
            <RouteMarker start={[178, 250]} label="Your payment" arrived={false} />
          </div>
        </Section>
      </div>

      <div className={s.twoUp}>
        <Section n="10 · Status" title="Stepper" lead="The Track stage's illustrative status. Horizontal in wide containers, vertical in narrow ones; it plays its progress once on first view.">
          <div className={s.card}>
            <p className={s.cardHead}>
              {TRACK.header} · <span style={{ fontWeight: 400 }}>{TRACK.corridor}</span>
            </p>
            <Stepper steps={TRACK.steps} />
          </div>
        </Section>
        <Section n="11 · Conversation" title="Example chat" lead="An illustrative exchange with the India payments manager. Every reply restates a fact the page already makes; the first message uses the reader's hero amount.">
          <div className={s.navyCard} data-surface="dark">
            <ManagerChat />
          </div>
        </Section>
      </div>

      <div className={s.twoUp}>
        <Section n="12 · Space" title="Spacing scale" lead="4px base. Section padding is 128 on desktop and 96 on mobile. Heading to lead is 24, lead to content is 48.">
          <div className={s.spaces}>
            {[4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160].map((n) => (
              <div key={n} className={s.spaceRow}>
                <span className={s.spaceNum}>{n}</span>
                <span className={s.spaceBar} style={{ width: n }} />
              </div>
            ))}
          </div>
          <p className={s.caption} style={{ marginTop: 24 }}>
            Grid: 12 cols · 1200 max · 24 gutters · 120 margins (desktop). 4 cols · 48 / 20 gutters, alternating (mobile).
            <br />
            Radius: 4 tags · 6 fields and buttons · 10 cards · 999 pills.
          </p>
        </Section>
        <Section n="13 · Feedback" title="Contact demo notice" lead='Appears inline under the contact buttons when any one of them is clicked. role="status", so it is announced without moving focus. Clicking again never stacks a second one.'>
          <div className={s.navyCard} data-surface="dark">
            <div className={s.contactRow}>
              <Button tone="dark" onClick={() => setNotice(true)}>
                WhatsApp an India payments manager
              </Button>
              <Button tone="dark" variant="secondary" onClick={() => setNotice(true)}>
                Call
              </Button>
              <Button tone="dark" variant="secondary" onClick={() => setNotice(true)}>
                Email
              </Button>
            </div>
            <DemoNotice
              open={notice}
              onDismiss={() => setNotice(false)}
              message="This is a design prototype. In the live site, this would open WhatsApp, your phone or your email. Nothing has been sent."
            />
          </div>
        </Section>
      </div>

      <Section n="14 · Notice" title="Prototype notice" lead="The page's single demo disclosure, above the nav. It replaces per-item Demo and Illustrative tags; contact, form and receipt messages still say nothing is sent when it matters.">
        <div className={s.barFrame}>
          <PrototypeBar />
        </div>
      </Section>
    </main>
  );
}
