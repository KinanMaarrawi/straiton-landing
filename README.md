# Handoff: Straiton — UAE → India landing page

## Overview
A single responsive landing page for Straiton's UAE → India B2B payments pilot. It explains the proposition and turns interest into a **payment assessment request**. The page is structured as the payment's sea route: it starts in Dubai (hero), passes four waypoints (the four stages: Share, Assess, Complete, Track) and arrives in India (assessment form). Target: a working **Vercel Preview** with a functional nav, CTAs, FAQ and a two-step form with validation and a demo confirmation.

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
5. 01 Share `#share` · Mina Rashid: lane left · white
6. 02 Assess `#assess` · Strait of Hormuz: lane right · white (quote document + checklist)
7. 03 Complete `#complete` · Muscat: lane left · `surface-50` (corridor spec, two columns of seven rows)
8. 04 Track `#track` · Arabian Sea: lane right · white (illustrative stepper)
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
- **Sticky CTA (mobile):** slides up after the hero leaves; hidden while `#assessment` is in view or the menu is open; safe-area aware.
- **Hero amount starter:** digits only, thousands separators as you type, AED/USD toggle. The primary button scrolls to `#assessment` with the amount and currency pre-filled and labels the route marker (`AED 250,000`). "Compare it with us →" opens the form in bank-quote mode.
- **Route:** one page-level absolutely-positioned SVG (`aria-hidden`, `pointer-events:none`) recomputed from section rects on resize (debounced). The charted course is always visible; the sailed course is revealed by scroll progress through a **mask** (the dot pattern already uses the dasharray), lerp ≈ 0.15. Waypoints flip from upcoming to passed as the marker reaches them. Reduced motion shows the full route drawn. Geometry, loops and lanes: DESIGN.md §8; working path logic is in the reference frames' logic class (`compute()`).
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

## Unfinished / assumptions
- Placeholder contact details, the regulatory copy and sample form values are illustrative by brief.
- Tablet (768–1199) has no dedicated frame; follow DESIGN.md §7 (8 cols, 32 margins) and the lane rules.
- Mobile route frames show only the end state; mid-scroll behaviour follows the desktop rules.
