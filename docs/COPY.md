# COPY.md — Straiton · UAE → India landing page

Every word on the page, in order. **Use this text verbatim.** Don't add claims, numbers or adjectives. If a string you need isn't here, write the plainest possible version and flag it with `TODO(copy)`.

Conventions: UK/International English. Currency codes in caps. `[tag: …]` marks a visual tag (see DESIGN.md §10). `→` in link text is rendered as the arrow glyph.

---

## Meta

- **Title:** Straiton — Pay suppliers in India from the UAE
- **Description:** UAE-to-India business payments, prepared before you fund: a transaction-specific quote, a document checklist and a dedicated India payments manager.

---

## Skip link

Skip to assessment

---

## Nav

- Wordmark: STRAITON
- Links: How it works · Quote · Documents · FAQ
- Button: Request an assessment
- Mobile menu button label (aria): Open menu / Close menu

---

## 1. Hero

- Eyebrow: UAE → India business payments `[tag: India pilot]`
- **H1:** Same sea. Better paperwork.
- Lead: Straiton prepares your supplier payments from the UAE to India before you fund them: a transaction-specific quote, a checklist of what this payment needs, and a dedicated India payments manager you can actually reach.

**Amount starter**
- Label: How much are you sending?
- Currency toggle: AED · USD
- Placeholder: 250,000
- Hint: A rough figure is fine. You can change it later.
- Primary button: Request a payment assessment
- Tertiary link: Already have a bank quote? Compare it with us →
- Microcopy: No sign-up required. Direct access to an India payments manager.

**Departure map**
- Point label: You, in Dubai / Payment starts
- Caption: Until 1966, the rupee was legal tender on this coast.

---

## 2. Eligibility strip

- Lead-in: The India pilot is currently for
- Items: UAE companies · Genuine B2B payments · Indian business beneficiaries · Documented commercial purpose
- Small print: Final eligibility is subject to compliance review.

---

## 3. Why payments stall (navy)

- Eyebrow: Why payments to India stall
- **H2:** Most delays are decided before the money moves.
- Lead: A cross-border payment rarely goes wrong on the day it's sent. It goes wrong on a detail nobody checked the week before.

**Numbered list**
1. **Returned for missing or inconsistent information.** A name, account or purpose that doesn't line up, and the payment comes back.
2. **Documents requested after submission.** The invoice or contract gets asked for once the payment is already moving.
3. **Beneficiary mismatch.** The details you hold don't match your supplier's bank records.
4. **Compliance back-and-forth.** Questions arrive one at a time, and every round adds time.
5. **A missed cut-off.** One late answer, and execution slips.

- Closing line: Straiton does the checking first, so it isn't happening while your supplier waits.

---

## 4. Stage 01 — Share

- Waypoint label: Mina Rashid
- Eyebrow: 01 — Share
- **H2:** Tell us about the payment.
- Lead: Start with the basics. No account, no onboarding, no commitment.

**Definition list**
- **Amount** — What you plan to send.
- **Funding currency** — AED or USD.
- **Payment type** — A supplier payment, an invoice payment or another eligible business payment.
- **The context** — The invoice or contract behind it.
- **Who you're paying** — Your supplier's business details in India.

---

## 5. Stage 02 — Assess

- Waypoint label: Strait of Hormuz
- Eyebrow: 02 — Assess
- **H2:** Know what your supplier receives before you fund.
- Lead: You get an assessment of this specific payment: how it would be quoted, what it needs, and what could slow it down.

**Quote document**
- Title: Quote anatomy `[tag: Illustrative · no live rates]`

| Row | Value |
|---|---|
| You send | *{hero amount, e.g. AED 250,000}* — fallback: Your amount |
| FX rate | Transaction-specific quote |
| Fee | Shown where applicable |
| Supplier receives | INR amount, shown before you fund *(highlighted row)* |
| Expected timing | Confirmed for the approved payment |

- Footnote: Same-day execution may be available where supported. Pricing and timing are specific to each transaction.

**Checklist**
- Heading: What we check upfront
- Items: Company information · Invoice or contract context · Beneficiary details · Payment purpose · Supporting documents, where required
- Footnote: What's needed depends on the transaction, and everything remains subject to review. Preparation reduces avoidable friction; it doesn't guarantee approval or execution timing.

---

## 6. Stage 03 — Complete

- Waypoint label: Muscat
- Eyebrow: 03 — Complete
- **H2:** Onboard once. Fund the approved payment.
- Lead: When the assessment is agreed, you complete onboarding and fund the transaction in AED or USD. Your supplier receives INR.

**Corridor specification**
- Heading: Corridor specification
- Sub: What the UAE → India corridor is designed to support during the pilot. Unconfirmed details are marked, not hidden.

| Label | Value |
|---|---|
| From | United Arab Emirates |
| To | India |
| Funding currencies | AED / USD |
| Supplier receives | INR |
| Beneficiary type | Eligible Indian businesses |
| Payment types | Supplier payments · Invoice payments · Other eligible business payments |
| Expected timing | Same-day where supported |
| Payout | INR business payout, subject to confirmed capability |
| Payout method | `[tag: To be confirmed]` |
| Cut-off | `[tag: To be confirmed]` |
| Minimum / maximum amount | `[tag: To be confirmed]` |
| Required information | Transaction-specific |
| Tracking | Payment status and confirmation |
| Status | `[tag: India pilot]` Pilot preparation |

---

## 7. Stage 04 — Track

- Waypoint label: Arabian Sea
- Eyebrow: 04 — Track
- **H2:** Follow it all the way to confirmation.
- Lead: Every payment has a status, from request to beneficiary confirmation, so "has it gone through?" always has an answer.

**Status component** `[tag: Illustrative interface]`
- Header: Supplier payment · UAE → India
- Steps: Request (done) · Assessment (done) · Funding (current) · Confirmation (upcoming)
- Current-step note: Waiting for funds to be received.

---

## 8. Your payments manager (navy)

- Eyebrow: Your payments manager
- ~~Monogram tile: IN — India payments manager~~ (removed 2026-09-29: the illustrative conversation below carries the manager's identity; its avatar uses the IN initials)
- **H2:** A person who knows this corridor.
- Lead: Speak directly with an India payments manager before onboarding, during the payment, and whenever something needs attention.
- Helps with: Quotes · Onboarding · Documents · Payment setup · Status · Exceptions

**Contact actions** `[tag: Demo]`
- Primary button: WhatsApp an India payments manager
- Secondary: Call +971 00 000 0000
- Secondary: Email india@straiton.example
- Demo notice (shown on click): This is a design prototype. In the live site, this would open WhatsApp, your phone or your email. Nothing has been sent.

**Illustrative conversation** `[tag: Illustrative]` *(added 2026-09-29, trial; every line restates a fact already on the page)*
- Card title: India payments manager
- Caption (visually hidden): Illustrative conversation with an India payments manager
- You: We need to pay a supplier in India. The invoice is *{hero amount, fallback AED 250,000}*.
- Manager: Thanks. Before you fund anything, I'll send you a transaction-specific quote and a checklist for this payment.
- Manager: For an invoice payment, that's usually the invoice, your supplier's business details and the payment purpose.
- You: Can it go same-day?
- Manager: Same-day execution may be available where supported. I'll confirm the timing for this payment before you fund.

---

## 9. FAQ

- Eyebrow: FAQ
- **H2:** Straight answers.

1. **How fast can a UAE–India business payment be?**
   Same-day execution may be available where supported. Actual timing depends on eligibility, payment details, documentation, cut-offs and compliance review. Your assessment tells you what to expect for your specific payment.

2. **What does my supplier receive?**
   INR, paid to an eligible Indian business. Payout is subject to confirmed capability, and the payout method is being confirmed for the pilot.

3. **Can I speak to someone before onboarding?**
   Yes. You can reach an India payments manager before you onboard, by WhatsApp, phone or email.

4. **Can you compare this with my bank's quote?**
   Send us the quote you already have. We'll review the execution path for the same payment and show you how our quote is structured.

5. **Do I need to hold or manage crypto?**
   No. You fund in AED or USD and your supplier receives INR. Straiton can use stablecoins internally as a settlement layer, but you never hold, buy or manage crypto.

6. **Do you guarantee same-day execution?**
   No. Same-day execution may be available where supported, but timing depends on eligibility, documentation, cut-offs and review. We'll tell you what to expect before you fund.

---

## 10. Arrival — Assessment form

- Map point label: Your supplier, in India / Receives INR
- Map point label (after submit): Arrived
- Eyebrow: Arrival · India
- **H2:** Start with one real payment.
- Lead: Share the details and an India payments manager comes back with an assessment: the quote structure and a document checklist for that payment.

**Form card**
- Card title: Payment assessment
- Mode switch: Planning a payment · I have a bank quote
- Progress: Step 1 of 2 · Step 2 of 2

**Step 1 — The payment**
- Amount — label: Payment amount · placeholder: 250,000
- Funding currency — label: Funding currency · options: AED, USD
- Payment type — label: Payment type · placeholder: Select a payment type · options: Supplier payment · Invoice payment · Other eligible business payment
- *(Bank-quote mode only)* Attach — label: Your bank quote (optional) · button: Choose file · drop text: or drag it here · hint: PDF, image or screenshot. In this demo, it stays in your browser. `[tag: Demo]` · selected-file note: Stays in your browser · remove link: Remove
- *(Bank-quote mode only)* Notes — label: Anything we should know about it? (optional) · placeholder: e.g. the rate, fees or timing your bank quoted
- Button: Continue

**Step 2 — How to reach you**
- Full name — label: Full name
- Work email — label: Work email · placeholder: name@company.com
- Company — label: Company name
- Phone — label: Phone or WhatsApp (optional) · placeholder: +971 50 000 0000
- Preferred contact — label: How should we reach you? · options: Email · WhatsApp · Call
- Buttons: Back · Send request
- Submitting label: Sending…
- Privacy line: We'll use these details only to respond to this request. `[tag: Demo]` Nothing is sent from this prototype.

**Errors**
- Summary heading: Check {n} field(s) before continuing
- Amount (empty): Enter the amount you plan to send.
- Amount (invalid): Use numbers only, for example 250000.
- Amount (zero): Enter an amount greater than zero.
- Payment type (empty): Choose a payment type.
- Full name (empty): Enter your full name.
- Work email (empty): Enter your work email.
- Work email (invalid): Enter an email address like name@company.com.
- Company (empty): Enter your company name.
- Phone (invalid): Enter a phone number with the country code, for example +971 50 000 0000.
- Phone (required by method): Add a phone number so we can reach you by WhatsApp or call.
- File (too large, >10 MB): Choose a file under 10 MB.

**Confirmation**
- Heading: Request received `[tag: Demo]`
- Line: This is a design prototype: nothing was sent.
- Receipt title: Your request
- Receipt rows: Amount · Funding currency · Payment type · Bank quote attached (Yes / No) · Contact by
- What happens next: In the live service, an India payments manager reviews your request and replies with the quote structure and a document checklist for this payment.
- Button: Start another request

---

## 11. Mobile sticky CTA

Request a payment assessment

---

## 12. Footer (navy)

- Wordmark: STRAITON
- Descriptor: Business payments from the UAE to India, prepared before you fund.
- Column **The route** (heading in sentence case): Share · Assess · Complete · Track
- Column **Help:** FAQ · Your payments manager · Request an assessment
- Column **Contact** `[tag: Demo]`: WhatsApp · +971 00 000 0000 · india@straiton.example
- **Regulatory block:**
  **Straiton / Regulatory information**
  Design placeholder. Approved legal entity and regulatory disclosures will be supplied separately. Do not infer licensing, coverage or guaranteed execution from this prototype.
- Bottom line: © 2026 Straiton · Design prototype

---

## Messaging rationale (for the submission write-up)

- **Headline:** "Same sea. Better paperwork." The Gulf and India's west coast have traded across the Arabian Sea for centuries; the route isn't new. What goes wrong today is preparation: the quote, the documents, the details. The headline names the real problem in four words, and the lead line explains the product plainly.
- **Tone: consultative, not sales.** The buyer is a finance or ops lead who has been burned by returned payments and opaque quotes. They respond to precision and honesty, not hype. The page talks like a payments manager across a desk.
- **Honesty as a feature.** The corridor is in pilot and several details are unconfirmed. Instead of hiding that, the page marks unconfirmed items openly ("To be confirmed", "Illustrative"). For a finance audience, visible candour builds more trust than confident vagueness.
- **One conversion path.** The prototype offered four competing CTAs. Here there's one primary action (request an assessment) with the bank-quote comparison as a *mode of the same form*, and WhatsApp in the manager section for people who want a human first.
- **Crypto kept in its place.** Stablecoins are internal plumbing, so they appear once, in an FAQ answer that leads with what the customer holds: AED/USD in, INR out, no crypto to manage.
- **The route.** The page is structured as the payment's journey from you, in Dubai, to your supplier, in India. The four stages sit at recognisable points on the passage (Mina Rashid, Strait of Hormuz, Muscat, Arabian Sea), so the metaphor is grounded in real geography, not decoration. The metaphor lives in structure, place names and visuals only; the copy never gets cute about it.
- **Cut for length.** FAQs on funding currencies, payment types and documents were removed because the corridor specification and the checklist already answer them.
