# DESIGN.md — Straiton · UAE → India landing page

The single source of truth for how this page looks, moves and speaks. Used by both the design pass (static frames) and the build (Claude Code). If something isn't specified here, choose the quieter option.

---

## 1. The idea in one line

**Same sea. Better paperwork.**

The page is the payment's route. The visitor starts on the UAE coast at the top and arrives on India's west coast at the bottom. Between them, the page itself is the sea: a single route line is drawn as they scroll, weaving through the page's open space and passing four waypoints, which are the four stages of the payment: **Share → Assess → Complete → Track.** At the bottom, the route reaches India and meets the assessment form.

Why sailing, not flying: sailing is **trade**, meaning cargo, merchants and suppliers. That's B2B. Flying reads as personal travel and consumer remittances, which is the wrong market and invites speed promises we can't make. The metaphor is about **a known route, prepared carefully**, not speed.

**The rule that keeps it tasteful:** the metaphor lives in structure, maps and the route line. It never appears in cute copy. No "boarding pass", no "set sail", no ship emoji. The copy stays plain, precise and adult.

---

## 2. Audience and voice

**Who reads this:** owners, finance managers and ops leads at UAE importers and trading companies who already pay suppliers in India through a bank. Their pains are that they don't see the real FX and fee cost until it's too late, payments come back over missing or mismatched details, compliance asks for documents after the fact, and nobody picks up the phone.

**What they want:** certainty about the quote, clarity about the paperwork, a human who knows this corridor.

**Voice:**
- **Consultative, not salesy.** Speak like an experienced payments manager across a desk, not a growth marketer.
- **Plain and specific.** Short sentences. Concrete nouns such as invoice, beneficiary, purpose code and cut-off, where the brief supports them.
- **Honest about the pilot.** Conditional facts stay conditional ("same-day where supported"). We treat that honesty as a feature: *we tell you what's confirmed and what isn't.*
- **One dry smile allowed per section at most.** The headline has the wit; the body copy doesn't compete with it.
- UK/International English spelling (colour, organisation). Currency codes in caps (AED, USD, INR).

**Never write:** revolutionise, seamless, effortless, lightning-fast, instant, guaranteed, cutting-edge, next-gen, unlock, empower, "the future of payments", "trusted by", or any claim of licensing or regulation.

---

## 3. Content integrity (non-negotiable)

These come straight from the brief. Breaking one of them fails the assignment.

- **Do not invent** capabilities, prices, FX rates, fees, volumes, customer counts, logos, testimonials, partner names, licences or guarantees.
- **Conditional facts stay conditional:**
  - Speed: "Same-day where supported". Never "same-day" alone.
  - Payout: "INR business payout, subject to confirmed capability"
  - FX: "Transaction-specific quote before funding"
  - Timing: "Confirmed for the approved payment"
  - Payout method, cut-off, minimum/maximum amount: **To be confirmed** (shown as a status tag, not hidden)
  - Eligibility: "Final eligibility is subject to compliance review"
  - Preparation "reduces avoidable friction but does not guarantee approval or execution timing"
- **One page-level disclosure** (changed on 2026-09-29 at the client's request; per-item `Demo`/`Illustrative` pills were too noisy): a slim notice above the nav says the page is a design prototype, that figures and interface examples are illustrative, that contact details are placeholders and that nothing entered is sent. It is backed up where it matters by messages at the moment of action: the contact demo notice, the form's privacy line, the file hint ("stays in your browser") and the confirmation ("nothing was sent").
- **Quiet labels, only where a misread is likely:** the quote anatomy keeps "Illustrative · no live rates" and the example conversation keeps "Example", as plain muted text, not pills. The brief asks for illustrative data to be clearly labelled.
- Contact actions show channels only (WhatsApp, Call, Email), not placeholder numbers or addresses.
- **Stablecoins:** never in headlines or hero. Addressed only in one FAQ answer, framed around what the customer holds: they fund in AED/USD, their supplier receives INR, and they don't hold or manage crypto.
- **Regulatory footer** uses the neutral placeholder text supplied in the brief, verbatim in meaning.

---

## 4. Colour

Sampled from the supplied prototype so the page stays recognisably Straiton. **Replace the hex values if official brand assets arrive; keep the roles.**

### Core palette

| Token | Hex | Role |
|---|---|---|
| `--navy-900` | `#0B2231` | Dark sections, primary ink on light, footer |
| `--navy-800` | `#12303F` | Raised surfaces on dark (cards within dark sections) |
| `--ink-700` | `#3D5260` | Secondary text on light |
| `--ink-500` | `#5F707B` | Tertiary text, captions, helper text (AA on white) |
| `--line-200` | `#DCE3E2` | Hairlines, borders, dividers on light |
| `--surface-50` | `#F3F6F5` | Alternate light section background |
| `--white` | `#FFFFFF` | Default background |
| `--teal-500` | `#17B3A0` | Brand teal: primary button fill, route line, active waypoint |
| `--teal-700` | `#0B7A6E` | Teal **text** on light (links, eyebrows, icons): AA on white |
| `--teal-50` | `#E7F4F1` | Teal tint: selected states, highlighted table row |
| `--amber-50` | `#FBF1DC` | "Pilot" / "To be confirmed" tag background |
| `--amber-800` | `#7A5200` | "Pilot" / "To be confirmed" tag text |
| `--red-700` | `#B42318` | Error text and error border |
| `--red-50` | `#FDECEA` | Error summary background |

On dark (`--navy-900`) surfaces: primary text `#EEF3F4`, secondary text `#A9B8BF`, hairlines `rgba(255,255,255,0.12)`, and teal text uses `--teal-500` (≈6:1 on navy).

### Contrast rules (learned from the prototype's mistakes)
- **White text on `--teal-500` fails AA (≈2.6:1).** Primary buttons use **`--navy-900` label text on teal** (≈6:1). Do not put white text on brand teal.
- Teal text on white must be `--teal-700`, never `--teal-500`.
- Body text never goes below `--ink-500` on white.

### How colour is used
- The page is **mostly white and navy ink.** Teal is reserved for **action and progress**: buttons, the route line and the active waypoint. If teal appears somewhere it doesn't mean "act" or "you are here", remove it.
- Dark navy sections are used **at most three times**: the "why payments stall" section, the manager section and the footer. That gives the scroll a rhythm, like light water and deep water.
- **No gradients.** Not on backgrounds, text, buttons or borders. Flat colour and hairlines only.

---

## 5. Typography

| Role | Family | Notes |
|---|---|---|
| Display and headings | **Newsreader** (variable, optical size axis on) | Serif. Headlines only. Weight 300–400. It reads "private bank / trade desk", deliberately distant from crypto aesthetics. |
| UI and body | **IBM Plex Sans** | Everything readable: body, labels, buttons, nav, form fields. |
| Money | **IBM Plex Mono** | **Money only:** amount inputs, amounts in the quote document, the route marker. Tabular figures (`font-variant-numeric: tabular-nums`). Everything else, including eyebrows, tags, waypoint labels, phone numbers and currency codes in running text, is Plex Sans. |

All three are on Google Fonts; load with `next/font`, subset to Latin, and use `display: swap`.

### Scale (fluid between 390px and 1440px)

| Token | Family | Desktop | Mobile | Line height | Tracking |
|---|---|---|---|---|---|
| `display` | Newsreader 300 | 90px | 52px | 0.98 | -0.02em |
| `h2` | Newsreader 350 | 60px | 36px | 1.04 | -0.015em |
| `h3` | Newsreader 400 | 30px | 24px | 1.2 | -0.01em |
| `lead` | Plex Sans 400 | 21px | 18px | 1.5 | 0 |
| `body` | Plex Sans 400 | 17px | 16px | 1.6 | 0 |
| `small` | Plex Sans 400 | 14px | 14px | 1.5 | 0 |
| `label` | Plex Sans 500 | 14px | 14px | 1.3 | 0 |
| `eyebrow` | Plex Sans 500 | 14px | 14px | 1.3 | 0.01em, sentence case |
| `figure-lg` | Plex Mono 400 | 32px | 24px | 1.1 | -0.01em |
| `figure` | Plex Mono 400 | 16px | 15px | 1.4 | 0 |

Implement with `clamp()`, e.g. `display: clamp(52px, 2.4rem + 3.6vw, 90px)`.

**Why 90px, not 104px:** the H1 sets as "Same sea. / Better paperwork." on two lines beside the 5-column departure map. At 104px, "Better paperwork." can't fit in 7 columns and wraps to three lines ("Better / paperwork."), which breaks the phrase and weakens the hierarchy the brief is reviewed on. The map keeps its 5 columns because it's where the route starts.

**Rules**
- Serif **never** appears in buttons, labels, form fields, tables or nav.
- Maximum reading measure: **62ch** for body, **18ch** for display headlines.
- No all-caps anywhere except the STRAITON wordmark and currency codes. No italics except one optional emphasis inside a headline.
- No gradient text, outlined text or text shadows.

---

## 6. Currency symbols

- **AED** uses the official **UAE dirham sign** (Central Bank of the UAE, March 2025; Unicode U+20C3 as of Unicode 18.0, September 2026). Most fonts don't ship the glyph yet, so render it as an **inline SVG component** (`<DirhamSign />`) drawn from the Central Bank's guideline: a Latin D with two horizontal strokes. It is sized in `em`, uses `currentColor`, and takes `role="img" aria-label="AED"`. Handoff note: swap to the U+20C3 glyph once target fonts support it.
- **INR** uses **₹** (U+20B9) as a normal text character. It's already in Plex Mono.
- **USD** uses the `USD` code in running text, and `$` only inside figures when it's unambiguous.
- In figures, prefer **code + number** for clarity (`AED 250,000`). The symbol appears in selectors, the quote document header and the route marker.

---

## 7. Space, layout, shape

### Spacing scale (4px base)
`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160`

Section padding: **128px** top and bottom on desktop, **96px** on mobile. Heading to lead: 24. Lead to content: 48.

### Grid
- **Desktop (1440):** 12 columns, max content width 1200, 24px gutters, 120px outer margins.
- **Tablet (768–1199):** 8 columns, 32px outer margins.
- **Mobile (390):** 4 columns, 20px outer margins.
- Breakpoints: `640 · 960 · 1200 · 1440`. Build mobile-first. **Zero horizontal overflow at any width from 320px up.**

### Lanes (how the route avoids text)
Every section declares a **lane**, the column band where the route line is allowed to travel beside it:

- Desktop: content occupies **7–8 columns** on one side; the route travels in the **remaining 3–4 columns plus the outer margin** on the other side.
- Sections **alternate sides** (content left / lane right, then content right / lane left), so the route crosses the page **only in the vertical gap between sections**, where there is no text.
- Full-width elements (the spec table, the form) sit on a solid background and the route passes **around** them, never behind.
- **Mobile:** sections **alternate gutters** like desktop: a 48px gutter on the route's side, 20px on the other. The route runs down the active gutter (x≈22 left, x≈368 right) with gentle bends, and crosses the full width **only in the gaps between sections** (S-curves). Order: hero + strip L · Why R · Share L · Assess R · Complete L · Track R · Manager L · FAQ R · Arrival L.

### Shape
- Radius: `4` tags · `6` fields and buttons · `10` cards and documents · `999` pills.
- Borders: 1px hairlines (`--line-200` on light, `rgba(255,255,255,.12)` on dark).
- Elevation: none by default. **Only** the form card and the quote document get a shadow: `0 1px 2px rgba(11,34,49,.06), 0 12px 32px rgba(11,34,49,.08)`.

---

## 8. The route system (signature element)

### Geography
The route follows the real sea lane, abstracted:

**Dubai Creek (25.27° N, 55.30° E) → Strait of Hormuz → Gulf of Oman → Arabian Sea → Mumbai (18.94° N, 72.84° E).**

Mumbai is the illustrative endpoint for the drawing only: it's where the Dubai sea lane actually lands on India's west coast. The endpoint is **labelled as the supplier, not the city**, and copy never claims a Mumbai-specific service.

### Three parts
1. **Departure map (hero).** A dotted map zoomed on the UAE coast and the Strait of Hormuz. Land is a grid of small dots (`--navy-900` at 30% opacity, 3px dots on an 8px grid); the sea is empty white. The route begins at Dubai Creek as a small filled teal point with a two-line Plex Sans label on a white chip: **You, in the UAE** / Payment starts. (Changed from "You, in Dubai" on 2026-09-29: the brief frames the product around UAE businesses, not one emirate, and it mirrors the endpoint, which is labelled by country too. The drawn point stays at Dubai Creek as illustrative geography.) The route leaves the map edge heading toward Hormuz and continues into the page. Caption, small and in `ink-500`: *"Until 1966, the rupee was legal tender on this coast."*
2. **Open sea (the page body).** No land and no map, just the route line travelling through the lanes from section to section. The four stage sections each carry an unlabelled **waypoint** on the route: a teal ring with a check. The stage number lives only in the section eyebrow (`01 — Share`). (Place-name labels, Mina Rashid, Strait of Hormuz, Muscat and Arabian Sea, were removed on 2026-09-29 at the client's request: away from a map they read as noise.)
3. **Arrival map (final section).** A dotted map zoomed on India's west coast. The route comes in from the left and ends at Mumbai with the label **Your supplier, in India** / Receives INR. The assessment form sits beside it.

### The line
- **Both courses are dotted**, in the same vocabulary as the map dots.
- **No charted course:** the route ahead is not drawn. The reader only sees water already crossed, so each stretch, and each waypoint, appears as the marker reaches it. (Changed on 2026-09-29 at the client's request; it previously showed the full course at 25% navy.)
- **Sailed course:** `--teal-500` dots (3.5px, same `0 8` pattern) revealed on top as the user scrolls, via a mask or clip driven by scroll progress, because `stroke-dashoffset` is already used by the dot pattern. This is "how far your payment has come".
- **The payment marker:** a small teal-filled circle with a navy outline at the head of the drawn line. If the visitor entered an amount in the hero, the marker carries a mono label with it (`AED 250,000`); otherwise it reads `YOUR PAYMENT`.
- **Waypoints** are hidden while upcoming and appear teal-filled (passed) as the marker reaches them. State is never colour-only: passed waypoints also get a check glyph and their label weight increases.
- Curves are smooth cubic Béziers with generous radii. No sharp corners and no zig-zags. It should feel like a ship's track, not a circuit diagram.
- **Variance:** each lane run swings across its lane (roughly 140–350px from the edge on the left, 1100–1330px on the right) rather than running straight.
- **Four loops** (a ship holding position): in *Why payments stall*, *03 Complete*, *Your payments manager* and *FAQ*. Each is a full circle (radius ~50–65px) with a slight downward drift so the path doesn't cross itself exactly. Loops sit in open lane space, never near a waypoint or text.

### Behaviour
- The drawn length maps to **overall page scroll progress between the hero and the arrival map**, and the marker follows the reader on a critically damped spring: it eases in and out and arrives ~1.5s after the reader, scrolling down or up (80% of the way after 1s, 94% after 1.5s). Changed from a quick lerp on 2026-09-29 at the client's request, so the route trails the reader like a ship rather than snapping to them.
- The path is **one page-level SVG** positioned absolutely behind content (`pointer-events: none`, `aria-hidden="true"`). Its coordinates are recomputed from section and lane positions on resize (debounced), so it always threads the actual gaps.
- **Mobile has no maps.** The route starts at a teal point beside the hero eyebrow (`UAE → India business payments`) and ends with the payment marker beside the arrival eyebrow (`Arrival · India`). The rupee caption and the start and end map labels are desktop-only. There are **two loops** (radius ~40px), placed in the crossings after *Why payments stall* and after *Your payments manager*; those gaps get 144px padding on each side. Waypoints sit in the active gutter as a filled ring with a check (the same mark as desktop).
- **Reduced motion (`prefers-reduced-motion: reduce`):** the full route is shown already drawn, the marker sits at the arrival point, and all waypoints appear as passed. Nothing animates.
- **Static design frames:** show the **full route drawn**, as the end state.
- **Opening the page:** a reload always opens at the top with the marker resting on the start point, at any window height; a shared deep link like `/#faq` is honoured, and the course is shown sailed up to that point without animating down the page.
- **Layout changes** (an FAQ answer opening, the form changing step) re-measure the route every frame, so it stretches with the page. The FAQ loop is placed at fixed offsets from the section top, so opening answers never moves it.
- **Performance:** transform and `stroke-dashoffset` only; one `requestAnimationFrame` loop; no layout reads during scroll other than cached values.

---

## 9. Page architecture

Section IDs are the nav anchors. "Lane" means the side the route travels on desktop.

| # | Section (`id`) | Purpose | Lane | Surface |
|---|---|---|---|---|
| 1 | Nav | Orientation and one CTA | — | White, sticky, hairline bottom border after scroll |
| 2 | Hero `#top` | The proposition and the first input | Map on the right | White |
| 3 | Eligibility strip | Who the pilot is for, honestly | — | `surface-50` band |
| 4 | Why payments stall `#why` | Name the pain the reader already feels | Right | **Navy** |
| 5 | 01 Share `#share` | What you tell us | Left | White |
| 6 | 02 Assess `#assess` | The quote anatomy and document checklist | Right | White |
| 7 | 03 Complete `#complete` | Onboarding, funding, corridor specification | Left | `surface-50` |
| 8 | 04 Track `#track` | Status through to confirmation | Right | White |
| 9 | Your payments manager `#support` | The human, and how to reach them | Left | **Navy** |
| 10 | FAQ `#faq` | Objections, answered plainly | Right | White |
| 11 | Arrival: assessment `#assessment` | The form, beside the India map | Map on the left | `surface-50` |
| 12 | Footer | Links, regulatory placeholder | — | **Navy** |

### Section notes
- **Hero:** eyebrow `UAE → INDIA BUSINESS PAYMENTS` plus an amber `India pilot` tag. H1 **"Same sea. Better paperwork."** A lead line that says plainly what Straiton does. Then the **amount starter**: one amount field with an AED/USD toggle, and the primary button **Request a payment assessment**. The button scrolls to `#assessment` with the amount pre-filled and labels the route marker. Below it, a tertiary link: **Already have a bank quote? Compare it with us.** It goes to the same form in "bank quote" mode. The departure map fills the right 5 columns.
- **Eligibility strip:** one line with four items (UAE companies · Genuine B2B payments · Indian business beneficiaries · Documented commercial purpose) plus the small print "Final eligibility is subject to compliance review." These are plain text with check glyphs, not pills in boxes.
- **Why payments stall:** typographic, not cards. A heading, then the five failure modes from the brief as a numbered list with one line of explanation each (returned for missing or inconsistent information; extra document requests after submission; beneficiary mismatch; compliance back-and-forth; missed cut-off or delayed execution). Close with one line that turns the page: preparation happens before the money moves.
- **01 Share:** what the customer provides (amount, funding currency, payment type, invoice or contract context, beneficiary details) as a short definition list. It should feel light, because this is the easy step.
- **02 Assess:** the centrepiece. Show a **quote document** styled like a remittance advice: a paper-white card, mono figures, hairline rows. Rows: *You send* (their hero amount, or "Your amount"), *FX rate* ("Transaction-specific quote"), *Fee* ("Shown where applicable"), *Supplier receives* (highlighted `teal-50` row, "INR amount shown before you fund"), *Expected timing* ("Confirmed for the approved payment"). Header label (plain muted text): `Illustrative · no live rates`. Beside it, **What we check upfront**: company information, invoice or contract context, beneficiary details, payment purpose, supporting documents where required, plus the review caveat.
- **03 Complete:** onboarding and funding the approved transaction. Then the **corridor specification** as a spec table (label | value) set in **two side-by-side columns of seven rows** on desktop, so it takes half the height. "To be confirmed" values use the amber tag. On mobile it becomes a stacked definition list.
- **04 Track:** a small, static, *illustrative* status component showing Request → Assessment → Funding → Confirmation as a horizontal stepper with one active step. This replaces the prototype's full dashboard section. Covered by the page-level prototype notice; no tag.
- **Your payments manager:** a person-shaped section without a stock photo. Use a monogram tile (`IN` for the India desk) and "India payments manager", the list of things they help with as **one line** (Quotes · Onboarding · Documents · Payment setup · Status · Exceptions), and three contact actions (WhatsApp, Call, Email). These show placeholder details with a `Demo` tag and open a small "demo contact" notice rather than dialling anything. The notice sits **inline under the buttons** on a `navy-800` panel with a `Demo` tag and a 44×44 dismiss button. It uses `role="status"` (announced without moving focus), stays until dismissed, and never stacks.
- **FAQ:** accordion, one open at a time is **not** enforced (independent items). Six questions, drawn from the prototype plus one on crypto; exact copy lives in COPY.md. Questions already answered elsewhere on the page (funding currencies, payment types, documents) are left out. No "related guides" block, since those would be dead links.
- **Arrival:** the India map on the left with the route ending at Mumbai. On the right, the **assessment form** card (Section 10). When the form is submitted, the marker settles on the endpoint and the endpoint label changes to **Arrived**.
- **Footer:** wordmark, a one-line descriptor, anchor links grouped by section and the regulatory placeholder block, verbatim in meaning. (The placeholder contact column was removed on 2026-09-29; "Your payments manager" is linked under Help.)
  > **Straiton / Regulatory information.** Design placeholder. Approved legal entity and regulatory disclosures will be supplied separately. Do not infer licensing, coverage or guaranteed execution from this prototype.

---

## 10. Components

All components are built once and reused. Each lists the states it must support.

### Buttons
| Variant | Look | Use |
|---|---|---|
| Primary | `teal-500` fill, `navy-900` label, 6px radius, 48px tall (56px in hero) | The one main action per view: "Request a payment assessment" |
| Secondary | Transparent, 1px `navy-900` border (on dark: white 30% border, white label) | Paired alternatives: "Compare a bank quote" |
| Tertiary | Text link, `teal-700`, underline on hover and focus, trailing arrow glyph | Low-emphasis navigation |

States: default · hover (fill darkens ~6%, no movement) · active (inset 1px) · **focus-visible** (2px `navy-900` outline, 2px offset; on dark, a 2px white outline) · disabled (40% opacity, `not-allowed`) · loading (label replaced by "Sending…" with a spinner; width locked).

### Fields
- Label above (Plex Sans 500, 14px), optional hint below in `ink-500`, and the error message below that.
- Input: 48px tall, 1px `line-200` border, white fill, 6px radius, 16px text (prevents iOS zoom).
- **Amount field:** mono tabular input with a currency segmented toggle (AED | USD) attached on the left. Formats thousands separators as the user types; accepts only digits.
- Select: native `<select>` styled to match. Don't build a custom listbox.
- File attach (bank-quote mode): a drop zone plus button. The file name is shown after selection, the file never leaves the browser, and its hint says so.
- States: default · hover (border `ink-500`) · focus (2px `teal-700` ring) · filled · **error** (border `red-700`, error icon **and** message text, `aria-invalid`, `aria-describedby`) · disabled.

### Tags
Small Plex Sans 500, 13px, sentence-case pills, 4px radius:
- `India pilot` / `To be confirmed`: amber
- `Illustrative`: `surface-50` fill, `ink-700` text, dotted border
- `Demo`: `surface-50` fill, `ink-700` text, solid border

### Cards and documents
- **Quote document:** white, 10px radius, elevation, header row with title and tag, hairline-separated rows, label in Plex Sans `ink-500` and value in Plex Mono `navy-900`.
- **Spec table:** no outer card; hairline row separators; label column 40%; on mobile, rows stack (label above value).
- No generic icon-plus-heading-plus-paragraph feature cards anywhere on the page.

### Accordion (FAQ)
A `<button>` header with the full question text and a plus/minus glyph that rotates, and `aria-expanded`/`aria-controls`. The panel height animates (240ms) and is instant under reduced motion. Hairline dividers between items.

### Navigation
- **Desktop:** wordmark left; anchors centre (How it works → `#share`, Quote → `#assess`, Documents → `#assess`, FAQ → `#faq`); primary button right. The active anchor is underlined as its section scrolls into view.
- **Mobile:** wordmark plus a menu button (44×44) that opens a **full-height sheet** with the same anchors at 24px and the primary button at the bottom. Focus moves to the close button on open, is trapped while open and returns to the menu button on close. Esc closes, body scroll is locked, and the button's `aria-expanded` and label (Open menu / Close menu) swap.
- **Mobile header CTA** (replaced the sliding bottom bar on 2026-09-29, which felt intrusive): once the hero has left the viewport, a compact "Request an assessment" button (36px visual, 44px hit area) fades into the sticky header beside the menu button. It hides while `#assessment` is in view and while the menu is open, and below 360px, where the menu carries the same action.

### Stage header
The eyebrow `02 — Assess` (Plex Sans, teal-700), the h2, and the lead. The number appears only here; the waypoint on the route is unlabelled.

### Assessment form (two steps)
- **Mode switch** at the top: `Planning a payment` | `I have a bank quote` (segmented control, keyboard accessible).
- **Step 1 · The payment:** amount (pre-filled from hero), funding currency (AED/USD), payment type (Supplier payment · Invoice payment · Other eligible business payment). In bank-quote mode it adds the file attach (optional, Demo) and an "Anything we should know about it?" free-text field (optional).
- **Step 2 · How to reach you:** full name, work email, company name, phone or WhatsApp (optional), preferred contact method (Email · WhatsApp · Call).
- Progress shown as `Step 1 of 2` in text **and** a two-segment bar.
- The **mode switch shows on Step 1 only**; Step 2 is the same for both modes.
- **Validation:** on blur and on submit. On submit with errors, focus moves to an **error summary** at the top of the card (listing links to each invalid field), announced via `aria-live="assertive"`.
- **Submitting:** the button enters the loading state for ~900ms (simulated). Fields go read-only (`surface-50` fill), Back is disabled, and the form gets `aria-busy="true"`.
- **Mobile (card at 322px, 24/20 padding):** paired buttons stack with the primary on top; the drop zone becomes a single full-width **Choose file** button (no drag text); receipt rows stack the label above the value.
- **After confirmation**, focus moves to the "Request received" heading.
- **Confirmation state** replaces the form in place: a heading, a short document-style receipt of what they submitted (amount, currency, type, contact method) with a `Demo` tag and a clear "Nothing was sent. This is a design prototype" line, what happens next in the real product (a payments manager reviews it and replies with the quote structure and document checklist), and a "Start another request" reset.
- Back navigation from Step 2 preserves all entered values.

---

## 11. Motion

**Principle:** motion only shows **progress** or **cause and effect**. Nothing moves just to look alive.

| Token | Value |
|---|---|
| `--dur-fast` | 150ms |
| `--dur-base` | 240ms |
| `--dur-slow` | 480ms |
| `--ease-out` | `cubic-bezier(0.2, 0.8, 0.2, 1)` |
| `--ease-in-out` | `cubic-bezier(0.6, 0, 0.2, 1)` |

**Allowed**
- The route drawing with scroll (Section 8). Each sailed dot grows and fades in (260ms) as the marker passes; passed waypoints ripple once and their check draws in.
- ~~The hero map's first route segment drawing once on load.~~ Removed on 2026-09-29: on shorter windows the sailed stretch ran below the fold. The marker now rests on the start point at the top of the page and gets underway as the reader scrolls (its aim moves twice as fast as the page until it reaches ~62% down the screen).
- **Hero entrance, once on load:** eyebrow, then each headline line rising out of a clip (900ms, 120ms apart), then lead, amount starter, map (opacity only, so the route stays aligned), start label and caption. The whole sequence finishes within ~1.2s and never blocks input.
- **Section reveals, once per section:** eyebrow, h2 and lead cascade in (14px rise plus opacity, 560ms, 70ms stagger); lists inside a section cascade after the header (why items, share rows, checklist, eligibility items, FAQ items, spec rows at a tighter 40ms). Never repeated.
- **Progress moments:** the Track stepper plays its progress once (dots pop, lines fill step by step); the quote's "Supplier receives" row highlight sweeps in after its rows (60ms stagger); the form's progress bar fills from the left.
- **Cause and effect:** the nav's active underline slides between links; trailing arrows nudge 3px on hover and focus; FAQ answers fade in as their panel opens; field errors and the error summary slide in; the confirmation check pops and receipt rows cascade; the arrival label crossfades to "Arrived" and the marker pulses twice on arrival; the mobile menu's links cascade in.
- **Paperwork (trial, 2026-09-30):** "Same sea" has the maps and route; "Better paperwork" gets a matching, restrained language. The quote document reads like a remittance advice (dotted leaders between label and value where they share a line) with an outlined "Before you fund" stamp that presses in once; the "What we check upfront" items are checkboxes that tick one after another on first view; the form's receipt uses the same leaders and is stamped "Received". Flat, one colour (teal-700), no textures; everything is already ticked and stamped without JS or under reduced motion.
- Accordion height, form step transitions (a 16px horizontal slide plus fade), button state changes, the mobile header CTA fading in.

Motion was expanded on 2026-09-28 at the client's request ("less of a static webpage and more of a dynamic experience"). The principle above still holds: every addition shows progress or cause and effect, plays once, and the forbidden list below is unchanged.

**Forbidden:** parallax, scroll-jacking or snap-scrolling, cursor followers, magnetic buttons, tilt-on-hover, looping background animation, counting-up numbers, typing effects, marquee logos, hover scale on cards, and anything that delays reading.

All motion is disabled under `prefers-reduced-motion: reduce`.

---

## 12. Accessibility baseline

- WCAG 2.2 AA contrast for all text and for UI boundaries (3:1).
- Visible `:focus-visible` on every interactive element (defined in Section 10). Never `outline: none` without a replacement.
- Touch targets are at least **44×44px**.
- State is never shown by colour alone: errors have an icon and text; waypoints have a glyph and a weight change; tags have text.
- Every field has a real `<label>`. Errors are linked with `aria-describedby`.
- Landmarks: `header`, `nav`, `main`, `footer`. One `h1`. Headings in order.
- The skip link "Skip to assessment" is the first focusable element.
- Decorative SVGs (maps, route) are `aria-hidden`. The dirham sign has `aria-label="AED"`.
- The page works fully with JavaScript slow or failing: anchors still scroll, and the form still renders (validation enhances it).

---

## 13. Banned list

If it appears, remove it.

- Gradients of any kind (mesh, radial glow, gradient text, gradient borders)
- Glassmorphism, frosted blur, neon glows, noise-texture backgrounds
- Spinning or rotating globes; generic "network of dots and lines" backgrounds
- Bento grids; three-card icon-in-a-circle feature rows
- Fake stats, fake logos, fake testimonials, "as seen in" strips
- Stock photos of people shaking hands or pointing at laptops
- Emoji in UI or copy
- Dark mode toggle (out of scope)
- Crypto, blockchain or stablecoin imagery anywhere
- More than one primary button visible in the same viewport (except nav plus hero on desktop)

---

## 14. Design frames to produce (static pass)

1. **Desktop 1440, full page**, with the route shown fully drawn (end state), all waypoints passed, and the marker at Mumbai.
2. **Mobile 390, full page**, same end state, with the route in the left gutter.
3. **Key moments:** hero at load (first segment only); the Assess section mid-scroll (marker between waypoints 02 and 03); the mobile menu open; the mobile sticky CTA.
4. **Form states:** Step 1 empty, Step 1 with errors (with error summary), Step 2 filled, submitting, and confirmation.
5. **Component sheet:** colour tokens, type scale, buttons (all states), fields (all states), tags, quote document, spec table row, accordion (closed and open), waypoint (upcoming and passed), and the dirham sign at three sizes.

---

## 15. Open items

- Official Straiton logo SVG and brand colours or fonts have been requested; until they arrive, use a typographic wordmark ("STRAITON" in Plex Sans 600, +0.04em tracking) and the sampled palette above.
- Final copy lives in **COPY.md** (to be written). This file defines structure and intent only, except for the hero headline and the rupee caption, which are locked.
