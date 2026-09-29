# Handoff: Straiton — UAE → India landing page

## Overview
A single responsive landing page for Straiton's UAE → India B2B payments pilot. It explains the proposition and turns interest into a **payment assessment request**. The page is structured as the payment's sea route: it starts in the UAE (hero), passes four waypoints (the four stages: Share, Assess, Complete, Track) and arrives in India (assessment form). Target: a working **Vercel Preview** with a functional nav, CTAs, FAQ and a two-step form with validation and a demo confirmation.

## About the design files
Files in `design/` are **design references built in HTML**. They're prototypes showing the intended look and behaviour, not production code. Recreate them in the target stack (Next.js + TypeScript, see `CLAUDE.md`) using proper components. The references use inline styles and a small runtime (`support.js`) only so they render standalone.

Open any `design/*.dc.html` directly in a browser (keep `support.js` beside them).

## Fidelity
**High-fidelity.** Final colours, type, spacing, copy and states. Recreate pixel-close at 1440 and 390, and make every width between them work.

## Files
| File | What it is |
|---|---|
| `docs/DESIGN.md` | **Full spec**: tokens, type scale, grid and lanes, the route system, every component and its states, motion, accessibility, page architecture |
| `docs/COPY.md` | Every string, in page order. Verbatim. Includes the messaging rationale for the submission write-up |
| `docs/Straiton_Web_Designer_Assignment.pdf` | The brief and review checklist |
| `design/Desktop 1440 v2.dc.html` | Full desktop page, route shown in its end state. Has a `moment` prop (`end` / `load` / `mid`) for partial route states |
| `design/Mobile 390.dc.html` | Full mobile page (no maps; the route runs in alternating gutters) |
| `design/Component Sheet.dc.html` | Tokens, type, buttons (all states), fields (all states), tags, dirham sign, quote document, spec rows, accordion, route/waypoint, navigation, spacing, contact demo notice |
| `design/Form States.dc.html` | Assessment card, desktop A–F (Step 1 empty / errors / bank-quote mode, Step 2 filled / sending, confirmation) + mobile versions at 322px |
| `design/Key Moments.dc.html` | Viewport crops: hero at load, Assess mid-scroll, mobile menu open, mobile sticky CTA |

## Page sections (order, anchor, route lane, surface)
1. Nav: sticky, white, hairline after scroll
2. Hero `#top`: departure map on the right · white
3. Eligibility strip: `surface-50`
4. Why payments stall `#why`: navy
5. 01 Share `#share`: lane left · white
6. 02 Assess `#assess`: lane right · white (quote document + checklist)
7. 03 Complete `#complete`: lane left · `surface-50` (corridor spec, two columns of seven rows)
8. 04 Track `#track`: lane right · white (illustrative stepper)
9. Your payments manager `#support`: navy (contact buttons → demo notice)
10. FAQ `#faq`: white, six independent accordion items
11. Arrival `#assessment`: India map on the left, form card on the right · `surface-50`
12. Footer: navy, regulatory placeholder

Full notes per section: DESIGN.md §9.

## Design tokens (summary; DESIGN.md §5–7 is canonical)
- **Colour:** navy-900 `#0B2231` · navy-800 `#12303F` · ink-700 `#3D5260` · ink-500 `#5F707B` · line-200 `#DCE3E2` · surface-50 `#F3F6F5` · white `#FFFFFF` · teal-500 `#17B3A0` (hover `#15A594`) · teal-700 `#0B7A6E` (pressed text `#085F55`) · teal-50 `#E7F4F1` · amber-50 `#FBF1DC` · amber-800 `#7A5200` · red-700 `#B42318` · red-50 `#FDECEA` · on-dark text `#EEF3F4`, muted on dark `#A9B8BF`
- **Type:** display Newsreader 300 90/52px lh .98 −0.02em · h2 Newsreader 350 60/36 lh 1.04 −0.015em · h3 Newsreader 400 30/24 lh 1.2 · lead Plex Sans 21/18 lh 1.5 · body 17/16 lh 1.6, max 62ch · small 14 · label 500 14 · eyebrow 500 14 teal-700 · figure-lg Plex Mono 32/24 · figure Plex Mono 16/15, tabular-nums
- **Space:** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160. Section padding 128 desktop / 96 mobile
- **Grid:** desktop 12 cols, 1200 max, 24 gutters, 120 margins. Mobile 4 cols with alternating 48/20 gutters
- **Radius:** 4 tags · 6 fields and buttons · 10 cards · 999 pills
- **Shadow (form card + quote document only):** `0 1px 2px rgba(11,34,49,.06), 0 12px 32px rgba(11,34,49,.08)`

## Interactions and behaviour
- **Nav:** anchors scroll smoothly; the active anchor is underlined (2px teal, 8px offset, weight 500) via IntersectionObserver. Mobile menu: full-height sheet; focus moves to Close, is trapped, Esc closes, scroll is locked, and focus returns to the menu button.
- **Header CTA (mobile):** a compact "Request an assessment" fades into the sticky header after the hero leaves; hidden while `#assessment` is in view, while the menu is open and below 360px. (Replaced a sliding bottom bar.)
- **Hero amount starter:** digits only, thousands separators as you type, AED/USD toggle. The primary button scrolls to `#assessment` with the amount and currency pre-filled and labels the route marker (`AED 250,000`). "Compare it with us →" opens the form in bank-quote mode.
- **Route:** one page-level absolutely-positioned SVG (`aria-hidden`, `pointer-events:none`) recomputed from section rects every frame while the layout changes. Only the sailed course is drawn (the route ahead stays hidden); it is revealed dot by dot as the marker passes, and the marker trails the reader by ~1.5s on a critically damped spring (`FOLLOW` in `Route.tsx`; lower is lazier). Waypoints stay hidden until the marker reaches them. The page reopens at the top on reload, and buttons don't write `#assessment` to the URL. Reduced motion shows the full route drawn. Geometry, loops and lanes: DESIGN.md §8; working path logic is in the reference frames' logic class (`compute()`).
- **FAQ:** `<button aria-expanded aria-controls>`; independent items; 240ms height animation.
- **Contact buttons:** show the inline Demo notice (`role="status"`, dismissible, no stacking). They never dial or open anything.
- **Assessment form:** see the state model below and DESIGN.md §10.

## State model (assessment form)
```
mode: 'planning' | 'bankQuote'            // switch shown on Step 1 only
step: 1 | 2 | 'sending' | 'done'
values: { amount, currency: 'AED'|'USD', paymentType, file?: File, notes,
          fullName, email, company, phone, contactBy: 'email'|'whatsapp'|'call' }
errors: Record<field, message>          // messages verbatim from COPY.md §10
touched: Record<field, boolean>         // validate on blur + on submit
```
- Continue/Send with errors → error summary at the top of the card receives focus (`aria-live="assertive"`); each item links to its field; fields get `aria-invalid` + `aria-describedby`.
- Phone becomes required when `contactBy` is WhatsApp or Call.
- File > 10 MB → error. The file never leaves the browser.
- `sending` lasts about 900ms: fields read-only, Back disabled, button shows "Sending…", `aria-busy`.
- `done` replaces the card in place with a receipt; focus moves to "Request received"; the arrival map label changes to **Arrived** and the marker settles on Mumbai. "Start another request" resets.
- Back from Step 2 keeps every value. The hero amount pre-fills Step 1.

## Assets
- No raster images. The maps are generated dot grids (land polygons + projection are in the reference logic class). Reuse or regenerate at build time as static SVG.
- The dirham sign is an inline SVG (path in the Component Sheet), `role="img" aria-label="AED"`.
- Fonts: Google Fonts (Newsreader, IBM Plex Sans, IBM Plex Mono).

## Development
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static production build (what Vercel runs)
npm run typecheck
```
- `src/styles/tokens.css`: every DESIGN.md token as a CSS custom property. `globals.css` holds the reset, focus styles and type-role classes (`t-display`, `t-h2`, `t-lead`, ...).
- `src/app/fonts.ts`: Newsreader (variable, opsz), IBM Plex Sans 400/500/600, IBM Plex Mono 400/500 via `next/font`.
- `src/components/ui/`: base components (Button, Tag, DirhamSign, Field + TextInput/Textarea/Select, AmountInput, AmountField, Segmented, FileField, ErrorSummary, QuoteDocument, SpecTable, Accordion, DemoNotice).
- `src/components/route/`: route glyphs (Waypoint, PaymentMarker). The page-level route comes last.
- `/components`: a living component sheet built from the real components (noindex). Use it to review states.

## Unfinished / assumptions
- Placeholder contact details, the regulatory copy and sample form values are illustrative by brief.
- Tablet (768–1199) has no dedicated frame; follow DESIGN.md §7 (8 cols, 32 margins) and the lane rules.
- Mobile route frames show only the end state; mid-scroll behaviour follows the desktop rules.
- Build status: the full page is built: sections, form, nav, mobile menu, mobile header CTA, FAQ, contact demo notice and route. `/components` remains as a living component sheet.
- Spec table label column is 40% (DESIGN.md §10). The frames use 44%; DESIGN.md wins the conflict.
- Quote document: only the "You send" amount is Plex Mono. Other values are Plex Sans, per the money-only rule and the frames (DESIGN.md §10 says "value in Plex Mono").
- Tags have a small size (20px, 12px text) for the Demo tag beside field labels and footer headings, as in the frames. DESIGN.md only specifies 13px.
- Segmented options keep the frames' 40px visual height but extend their hit area over the track padding to 48px, to meet the 44px target rule.
- Tertiary links get a 44px hit area with negative block margins, so their visual spacing matches the frames.
- Error summary heading pluralises: "Check 1 field…" / "Check 2 fields…". The same wording is used on Step 2.
- Collapsible and animated content only hides when JS runs (an inline script adds `html.js`). Without JS every FAQ answer is visible.
- The dismiss button on the contact demo notice is labelled "Dismiss" (from the Component Sheet). TODO(copy) if a different label is wanted.
- Layout below 960px uses the mobile layout and gutter route, centred at a readable width on tablets. From 960px up it uses the desktop 12-column lanes, with the route's frame x-positions rescaled from 1440 to the live lane widths.
- Desktop nav keeps its primary button next to the WhatsApp button and the form's Continue, as the frames show, even though DESIGN.md §13 limits one primary per viewport.
- Active nav anchor: How it works for Share, Complete and Track; Quote for Assess; FAQ for FAQ. Documents also links to #assess but never shows as active.
- The hero amount, the form amount, the quote's "You send" row and the route marker label share one value. The hero field starts empty; 250,000 is only its placeholder, so the marker reads "Your payment" until an amount is entered.
- "Compare it with us" also carries the hero amount into the form, in bank-quote mode.
- The route marker aims at about 62% down the viewport, so it stays visible while you read. At load it sails the hero map's first stretch once, over 1200ms.
- The route marker's amount label is desktop only. Mobile shows the marker without a label, as in the Mobile 390 frame.
- After a request is sent, only the first line of the arrival label changes, to "Arrived"; "Receives INR" stays.
- Phone numbers must start with "+" and have 8–15 digits; spaces, dashes and brackets are allowed.
- "Use numbers only" appears when pasted text contains letters or decimals. Typed non-digits are simply ignored.
- A file over 10 MB is rejected with the error and is not attached. The file error doesn't block Continue, because the field is optional.
- Blur validation waits until a pointer press is released, so an error appearing can't shift the button you're clicking.
- Form control borders use `--line-control` (#84929A, 3.2:1 on white) instead of line-200 (1.3:1), to meet DESIGN.md §12's 3:1 rule for UI boundaries. Hairlines and cards still use line-200.
- Footer contact details are plain text, not buttons.
- Maps are static SVGs in `public/maps/`, generated by `npm run maps` from `src/lib/geo.ts`.
- "Helps with" and "Placeholder contact details" come from the frames rather than COPY.md, and are marked TODO(copy) in `src/content/copy.ts`.
- Route rendering: the course is sampled in JS from the path's own segments (Firefox's `getPointAtLength` walks the path from the start on each call, which made scrolling stall for seconds). Both courses are tiled into ~1024px bands of static SVG; newly sailed dots animate as a few live circles and then settle into small per-chunk paths; the marker and waypoints are HTML moved with transforms. Nothing repaints the whole page while scrolling.
- Motion vocabulary was expanded at the client's request; DESIGN.md §11 lists every animation. All of it plays once, and all of it is off under reduced motion.
- `src/components/route/Waypoint.tsx` (SVG glyphs) is used only by the `/components` sheet; the live page uses the HTML marks in `RouteMarks.tsx`.
- Manager section (trial, 2026-09-29): an illustrative conversation with the India payments manager, tagged Illustrative. Every line restates a fact already on the page (quote before funding, the checklist, "same-day where supported"); the first message uses the reader's hero amount when there is one. The IN monogram tile above the heading was removed as redundant. Fallback if it's cut: plain "WhatsApp / Call / Email" buttons without the fake number and address, and a corridor mark instead of the tile.
- Demo disclosure (2026-09-29): one prototype notice above the nav replaces every per-item Demo/Illustrative pill. The contact notice, the form's privacy line, the file hint and the receipt still say nothing is sent at the moment it matters. The quote card ("Illustrative · no live rates") and the example chat ("Example") keep quiet plain-text labels, since the brief asks for illustrative data to be clearly labelled. Contact buttons show channels only; the footer's placeholder contact column is gone. The Tag component's Demo/Illustrative variants remain in the `/components` sheet but are unused on the page.
- Launch polish (2026-09-29): on-brand 404 ("Off course."), favicon and Apple touch icon (the route mark), a build-time link-preview image, Open Graph/Twitter metadata, `robots.txt` that allows crawling (so link previews work) plus a site-wide `noindex`, and inlined CSS. No sitemap, since nothing should be indexed.
- Checks run (Firefox, plus headless Chrome for Lighthouse): axe-core reports no WCAG 2.2 AA or best-practice violations across the page, mobile menu, every form state, the contact notice and the 404. Lighthouse mobile performance 90-93 (observed LCP ~0.2s; the simulated 3.2s is slow-4G contention with the 129KB Newsreader opsz font), desktop 100, accessibility and best practices 100. SEO scores 63 only because of the deliberate noindex.
- Without JavaScript: every section and FAQ answer is readable, anchors work, the mobile header shows its links in place of the menu button, and the form explains that it needs JavaScript (a submit lands back on the form). Contact buttons do nothing without JS; the prototype notice already says contact details are placeholders.
- Chrome (headless, 2026-09-29): no overflow 320–1920, 60fps scrolling with no frame over 17ms on desktop and mobile, FAQ toggles at 60fps, full form/menu/notice flow, axe clean, reduced motion correct, no console errors. Not yet done: a real iPhone in Safari, and a screen-reader pass with a real reader. Structure checks passed (one H1, ordered headings, labelled landmarks, live regions).
