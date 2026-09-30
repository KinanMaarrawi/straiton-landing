/**
 * Page strings from docs/COPY.md, verbatim. Short labels that live next to
 * their component stay inline there; lists and repeated content live here.
 */

export const NAV_LINKS = [
  { href: '#share', label: 'How it works', section: 'share' },
  { href: '#assess', label: 'Quote', section: 'assess' },
  { href: '#assess', label: 'Documents', section: 'documents' },
  { href: '#faq', label: 'FAQ', section: 'faq' },
] as const;

/**
 * One page-level disclosure instead of a Demo/Illustrative tag on every item
 * (COPY.md, 2026-09-29).
 */
export const PROTOTYPE_NOTICE =
  'Design prototype. Figures and interface examples are illustrative, contact details are placeholders, and nothing you enter is sent anywhere.';

export const NAV_CTA = 'Request an assessment';

/** Place names beside each stage's waypoint on the route. Desktop only (COPY.md §4–7). */
export const WAYPOINT_PLACES: Record<'01' | '02' | '03' | '04', string> = {
  '01': 'Mina Rashid',
  '02': 'Strait of Hormuz',
  '03': 'Muscat',
  '04': 'Arabian Sea',
};
export const PRIMARY_CTA = 'Request a payment assessment';

export const HERO = {
  eyebrow: 'UAE → India business payments',
  lead: 'Straiton prepares your supplier payments from the UAE to India before you fund them: a transaction-specific quote, a checklist of what this payment needs, and a dedicated India payments manager you can actually reach.',
  amountLabel: 'How much are you sending?',
  placeholder: '250,000',
  hint: 'A rough figure is fine. You can change it later.',
  bankQuoteLink: 'Already have a bank quote? Compare it with us →',
  micro: 'No sign-up required. Direct access to an India payments manager.',
  pointTitle: 'You, in the UAE',
  pointSub: 'Payment starts',
  caption: 'Until 1966, the rupee was legal tender on this coast.',
};

export const ELIGIBILITY = {
  leadIn: 'The India pilot is currently for',
  items: ['UAE companies', 'Genuine B2B payments', 'Indian business beneficiaries', 'Documented commercial purpose'],
  small: 'Final eligibility is subject to compliance review.',
};

export const WHY = {
  eyebrow: 'Why payments to India stall',
  h2: 'Most delays are decided before the money moves.',
  lead: "A cross-border payment rarely goes wrong on the day it's sent. It goes wrong on a detail nobody checked the week before.",
  items: [
    ['Returned for missing or inconsistent information.', "A name, account or purpose that doesn't line up, and the payment comes back."],
    ['Documents requested after submission.', 'The invoice or contract gets asked for once the payment is already moving.'],
    ['Beneficiary mismatch.', "The details you hold don't match your supplier's bank records."],
    ['Compliance back-and-forth.', 'Questions arrive one at a time, and every round adds time.'],
    ['A missed cut-off.', 'One late answer, and execution slips.'],
  ] as const,
  closing: "Straiton does the checking first, so it isn't happening while your supplier waits.",
};

export const SHARE = {
  eyebrow: '01 · Share',
  h2: 'Tell us about the payment.',
  lead: 'Start with the basics. No account, no onboarding, no commitment.',
  items: [
    ['Amount', 'What you plan to send.'],
    ['Funding currency', 'AED or USD.'],
    ['Payment type', 'A supplier payment, an invoice payment or another eligible business payment.'],
    ['The context', 'The invoice or contract behind it.'],
    ["Who you're paying", "Your supplier's business details in India."],
  ] as const,
};

export const ASSESS = {
  eyebrow: '02 · Assess',
  h2: 'Know what your supplier receives before you fund.',
  lead: 'You get an assessment of this specific payment: how it would be quoted, what it needs, and what could slow it down.',
  quoteFootnote: 'Same-day execution may be available where supported. Pricing and timing are specific to each transaction.',
  checklistHeading: 'What we check upfront',
  checklist: [
    'Company information',
    'Invoice or contract context',
    'Beneficiary details',
    'Payment purpose',
    'Supporting documents, where required',
  ],
  checklistFootnote:
    "What's needed depends on the transaction, and everything remains subject to review. Preparation reduces avoidable friction; it doesn't guarantee approval or execution timing.",
};

export const COMPLETE = {
  eyebrow: '03 · Complete',
  h2: 'Onboard once. Fund the approved payment.',
  lead: 'When the assessment is agreed, you complete onboarding and fund the transaction in AED or USD. Your supplier receives INR.',
  specHeading: 'Corridor specification',
  specSub: 'What the UAE → India corridor is designed to support during the pilot. Unconfirmed details are marked, not hidden.',
};

export const TRACK = {
  eyebrow: '04 · Track',
  h2: 'Follow it all the way to confirmation.',
  lead: 'Every payment has a status, from request to beneficiary confirmation, so "has it gone through?" always has an answer.',
  header: 'Supplier payment',
  corridor: 'UAE → India',
  steps: [
    { label: 'Request', state: 'done' },
    { label: 'Assessment', state: 'done' },
    { label: 'Funding', state: 'current', note: 'Waiting for funds to be received.' },
    { label: 'Confirmation', state: 'upcoming' },
  ] as const,
};

export const SUPPORT = {
  eyebrow: 'Your payments manager',
  monogram: 'IN',
  h2: 'A person who knows this corridor.',
  lead: 'Speak directly with an India payments manager before onboarding, during the payment, and whenever something needs attention.',
  helpsWithLabel: 'Helps with',
  helpsWith: 'Quotes · Onboarding · Documents · Payment setup · Status · Exceptions',
  whatsapp: 'WhatsApp an India payments manager',
  callLabel: 'Call',
  emailLabel: 'Email',
  notice:
    'This is a design prototype. In the live site, this would open WhatsApp, your phone or your email. Nothing has been sent.',
  /** Illustrative conversation (COPY.md §8, trial). Every line restates a fact already on the page. */
  chat: {
    title: 'India payments manager',
    label: 'Example',
    caption: 'Illustrative conversation with an India payments manager',
    youLabel: 'You',
    managerLabel: 'India payments manager',
    sampleAmount: 'AED 250,000',
    messages: [
      { from: 'you', text: 'We need to pay a supplier in India. The invoice is {amount}.' },
      { from: 'manager', text: "Thanks. Before you fund anything, I'll send you a transaction-specific quote and a checklist for this payment." },
      { from: 'manager', text: "For an invoice payment, that's usually the invoice, your supplier's business details and the payment purpose." },
      { from: 'you', text: 'Can it go same-day?' },
      { from: 'manager', text: "Same-day execution may be available where supported. I'll confirm the timing for this payment before you fund." },
    ] as const,
  },
};

export const FAQ = {
  eyebrow: 'FAQ',
  h2: 'Straight answers.',
  items: [
    {
      question: 'How fast can a UAE to India business payment be?',
      answer:
        'Same-day execution may be available where supported. Actual timing depends on eligibility, payment details, documentation, cut-offs and compliance review. Your assessment tells you what to expect for your specific payment.',
    },
    {
      question: 'What does my supplier receive?',
      answer:
        'INR, paid to an eligible Indian business. Payout is subject to confirmed capability, and the payout method is being confirmed for the pilot.',
    },
    {
      question: 'Can I speak to someone before onboarding?',
      answer: 'Yes. You can reach an India payments manager before you onboard, by WhatsApp, phone or email.',
    },
    {
      question: "Can you compare this with my bank's quote?",
      answer:
        "Send us the quote you already have. We'll review the execution path for the same payment and show you how our quote is structured.",
    },
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
  ],
};

export const ARRIVAL = {
  pointTitle: 'Your supplier, in India',
  pointSub: 'Receives INR',
  arrived: 'Arrived',
  eyebrow: 'Arrival · India',
  h2: 'Start with one real payment.',
  lead: 'Share the details and an India payments manager comes back with an assessment: the quote structure and a document checklist for that payment.',
};

export const FORM = {
  title: 'Payment assessment',
  modes: { planning: 'Planning a payment', bankQuote: 'I have a bank quote' },
  modeLegend: 'Request type', // visually hidden legend for the mode switch
  progress: (n: 1 | 2) => `Step ${n} of 2`,
  amountLabel: 'Payment amount',
  amountPlaceholder: '250,000',
  currencyLabel: 'Funding currency',
  typeLabel: 'Payment type',
  typePlaceholder: 'Select a payment type',
  types: [
    { value: 'supplier', label: 'Supplier payment' },
    { value: 'invoice', label: 'Invoice payment' },
    { value: 'other', label: 'Other eligible business payment' },
  ],
  fileLabel: 'Your bank quote (optional)',
  fileChoose: 'Choose file',
  fileDrop: 'or drag it here',
  fileHint: 'PDF, image or screenshot. In this demo, it stays in your browser.',
  fileKept: 'Stays in your browser',
  fileRemove: 'Remove',
  notesLabel: 'Anything we should know about it? (optional)',
  notesPlaceholder: 'e.g. the rate, fees or timing your bank quoted',
  continue: 'Continue',
  nameLabel: 'Full name',
  emailLabel: 'Work email',
  emailPlaceholder: 'name@company.com',
  companyLabel: 'Company name',
  phoneLabel: 'Phone or WhatsApp (optional)',
  phonePlaceholder: '+971 50 000 0000',
  contactLabel: 'How should we reach you?',
  contactOptions: [
    { value: 'email', label: 'Email' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'call', label: 'Call' },
  ],
  noScript: 'This demo form needs JavaScript to run. Nothing is sent from this prototype.',
  back: 'Back',
  send: 'Send request',
  sending: 'Sending…',
  privacy: "We'll use these details only to respond to this request.",
  privacyAfter: 'Nothing is sent from this prototype.',
  errors: {
    amountEmpty: 'Enter the amount you plan to send.',
    amountInvalid: 'Use numbers only, for example 250000.',
    amountZero: 'Enter an amount greater than zero.',
    typeEmpty: 'Choose a payment type.',
    nameEmpty: 'Enter your full name.',
    emailEmpty: 'Enter your work email.',
    emailInvalid: 'Enter an email address like name@company.com.',
    companyEmpty: 'Enter your company name.',
    phoneInvalid: 'Enter a phone number with the country code, for example +971 50 000 0000.',
    phoneRequired: 'Add a phone number so we can reach you by WhatsApp or call.',
    fileTooLarge: 'Choose a file under 10 MB.',
  },
  done: {
    heading: 'Request received',
    line: 'This is a design prototype: nothing was sent.',
    receiptTitle: 'Your request',
    rows: {
      amount: 'Amount',
      currency: 'Funding currency',
      type: 'Payment type',
      attached: 'Bank quote attached',
      contact: 'Contact by',
    },
    yes: 'Yes',
    no: 'No',
    next: 'In the live service, an India payments manager reviews your request and replies with the quote structure and a document checklist for this payment.',
    again: 'Start another request',
  },
};

export const FOOTER = {
  descriptor: 'Business payments from the UAE to India, prepared before you fund.',
  routeHeading: 'The route',
  routeLinks: [
    { href: '#share', label: 'Share' },
    { href: '#assess', label: 'Assess' },
    { href: '#complete', label: 'Complete' },
    { href: '#track', label: 'Track' },
  ],
  helpHeading: 'Help',
  helpLinks: [
    { href: '#faq', label: 'FAQ' },
    { href: '#support', label: 'Your payments manager' },
    { href: '#assessment', label: 'Request an assessment' },
  ],
  regulatoryHeading: 'Straiton / Regulatory information',
  regulatory:
    'Design placeholder. Approved legal entity and regulatory disclosures will be supplied separately. Do not infer licensing, coverage or guaranteed execution from this prototype.',
  bottom: '© 2026 Straiton · Design prototype',
};
