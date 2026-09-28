# CLAUDE.md — Straiton UAE → India landing page

Persistent rules for every session in this repo.

## Sources of truth (read before changing anything)
- `docs/DESIGN.md` — tokens, type, grid, lanes, route system, components, states, motion, accessibility. **Wins on anything visual or behavioural.**
- `docs/COPY.md` — every string on the page. **Use verbatim.** If a string is missing, write the plainest version and mark it `TODO(copy)`.
- `docs/Straiton_Web_Designer_Assignment.pdf` — the brief and completion checklist.
- `design/*.dc.html` — hi-fi HTML reference frames. Open in a browser (they need `design/support.js` beside them). They are **references, not code to ship**: recreate them, don't copy their inline-style markup.
- `README.md` — handoff summary, build order, state model.

Conflict order: DESIGN.md / COPY.md → reference frames → your judgement (flag it).

## Stack
- Next.js (App Router) + TypeScript, deployed as a Vercel Preview. Static-renderable; no backend, no env vars, no external services.
- Styling: CSS custom properties for every DESIGN.md token + CSS Modules. No UI kit, no Tailwind preset colours.
- Fonts via `next/font/google`: Newsreader (variable, opsz), IBM Plex Sans (400/500/600), IBM Plex Mono (400/500).
- Icons: inline SVG only (the dirham sign is a custom inline SVG, see DESIGN.md).

## Non-negotiables
- Zero horizontal overflow from 320px up. Mobile-first; breakpoints 640 · 960 · 1200 · 1440.
- Newsreader for headlines only; Plex Mono for money only; Plex Sans for everything else.
- White text never sits on teal-500. Navy on teal only.
- State is never colour-only (icons + words on errors, check glyph + weight on waypoints).
- Every interactive element has a visible `:focus-visible` style from DESIGN.md. Touch targets ≥ 44px.
- `prefers-reduced-motion`: route fully drawn, nothing animates.
- Demo-only behaviour is visibly tagged `Demo`; illustrative content tagged `Illustrative`. Nothing is sent anywhere.
- Don't invent capabilities, pricing, guarantees or regulatory claims.

## Working style
- Build reusable components (Button, Field, AmountField, Segmented, Tag, QuoteDocument, SpecTable, Accordion, Nav, MobileMenu, StickyCta, AssessmentForm, Route).
- After each section, compare against the matching reference frame at 1440 and 390 before moving on.
- Keep README's "Unfinished / assumptions" list current.
