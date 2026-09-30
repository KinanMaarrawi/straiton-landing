# Straiton: UAE → India landing page

**Live preview:** https://straiton-landing-nine.vercel.app
**Source:** https://github.com/KinanMaarrawi/straiton-landing
**Component sheet:** https://straiton-landing-nine.vercel.app/components
**Time spent:** {{TIME, to confirm}}

A responsive landing page for Straiton's UAE → India B2B payments pilot. It explains the proposition and turns interest into a **payment assessment request**: a working two-step form with validation and a demo confirmation. Next.js (App Router) + TypeScript on Vercel.

---

## The idea: same sea, better paperwork

The Gulf and India's west coast have traded across the Arabian Sea for centuries. The route isn't new; what goes wrong today is the preparation: the quote, the documents, the details. The headline, **"Same sea. Better paperwork."**, names that problem in four words.

The page is structured as the payment's voyage. It starts on a dotted map of the UAE coast ("You, in the UAE"), follows a dotted route down the page through the four stages the brief describes (**Share → Assess → Complete → Track**), and arrives on India's west coast, where the assessment form waits ("Your supplier, in India").

- **Why sailing, not flying:** sailing reads as trade, cargo and suppliers, which is B2B. Flying reads as consumer remittances and invites speed promises the pilot can't make. The metaphor is about a known route prepared carefully, not speed.
- **The route only shows water already crossed.** It trails the reader by about a second and a half, and each stage's waypoint ticks as it's passed. On desktop, each waypoint also names a place on the passage (Mina Rashid, Strait of Hormuz, Muscat, Arabian Sea); on mobile, where there's no room beside the route, the marks stay unlabelled. At the end, submitting the form settles the marker on India and the label changes to "Arrived".
- **"Better paperwork," made visible.** The maps and route carry the sea; the documents carry the paperwork. The quote reads like a remittance advice, with dotted leaders between label and value and an outlined "Before you fund" stamp. The "What we check upfront" list ticks itself, one item after another, as you read it. And the confirmation you get after sending the form is the matching document, stamped "Received". One colour, no textures, nothing added that doesn't carry the idea.
- **The metaphor lives in structure and visuals only.** The copy never gets cute about it: no "set sail", no ship emoji.

## Messaging decisions

- **Consultative, not sales.** The reader is a finance or ops lead who has been burned by returned payments and opaque quotes. The page talks like a payments manager across a desk: short sentences, concrete nouns (invoice, beneficiary, cut-off).
- **Honesty as a feature.** The corridor is in pilot and several details are unconfirmed. Instead of hiding that, the corridor specification marks them "To be confirmed", and every conditional fact stays conditional ("Same-day where supported", "subject to confirmed capability"). For a finance audience, visible candour builds more trust than confident vagueness.
- **One conversion path.** The prototype offered four competing calls to action. Here there is one primary action, **request an assessment**, with "I have a bank quote" as a *mode of the same form* rather than a separate flow, and WhatsApp in the manager section for people who want a human first.
- **Pain before product.** A navy "Why payments to India stall" section names the five failure modes from the prototype, then turns the page: "Straiton does the checking first, so it isn't happening while your supplier waits."
- **A person, not a stock photo.** The manager section shows an illustrative conversation. Every reply restates a fact the page already makes, including the honest answer to "Can it go same-day?".
- **Crypto kept in its place.** Stablecoins appear once, in an FAQ answer that leads with what the customer holds: AED/USD in, INR out, no crypto to manage.
- **Cut for length.** Related guides were dropped (they'd be dead links), and FAQs already answered by the specification and checklist were removed.

## Design decisions

- **Palette sampled from the prototype**, so it stays recognisably Straiton. Teal is reserved for action and progress (buttons, the route, passed waypoints); if it appears anywhere else, it's wrong. Primary buttons use navy text on teal, because white on that teal fails contrast.
- **Type with a job each:** Newsreader for headlines only (it reads "private bank / trade desk", deliberately far from crypto aesthetics), IBM Plex Sans for everything readable, IBM Plex Mono for money only.
- **The UAE dirham sign** (introduced by the Central Bank in 2025) is drawn as an inline SVG, since most fonts don't ship the glyph yet.
- **Restraint:** no gradients, cards-with-icons, stock photos or fake logos. Three navy sections give the scroll a rhythm, like deep and shallow water.
- **Motion shows progress or cause and effect, and plays once:** the hero entrance, section reveals, the Track stepper filling in, the quote's key row highlighting, the checklist ticking, stamps pressing in, waypoints ticking, the form's progress bar. No parallax, scroll-jacking or counting numbers. All of it switches off under reduced motion, where the route is shown fully drawn.

## Quality

- **Accessibility:** automated checks (axe-core, WCAG 2.2 AA) pass across the page, the mobile menu, every form state, the contact notice and the 404. Keyboard-only use works throughout (every tab stop checked on desktop and mobile), with visible focus, a skip link and a focus-trapped mobile menu. The form's error summary receives focus and links to each field, and errors carry an icon and words, never colour alone. Touch targets are at least 44px.
- **Responsive:** designed at 1440 and 390, with no horizontal scrolling from 320px up. Tested in Firefox and Chrome, and in Safari on an iPhone in portrait and landscape.
- **Performance (Lighthouse, live site):** desktop 100, mobile 92; accessibility 100; best practices 100. The route is sampled once and animated without repainting the page, and holds 60fps while scrolling in Chrome.
- **Without JavaScript,** every section and FAQ answer stays readable, links work, and the form explains that it needs JavaScript.
- **Privacy:** no cookies, no analytics and no third-party requests (fonts are self-hosted). Nothing entered in the form, including an attached file, leaves the browser; checked by logging every request while completing it. So there is no cookie banner or privacy policy, and none is invented.
- **Security:** a static site with no backend or stored data. No secrets in the repository, a clean dependency audit, and baseline security headers (no framing, no MIME sniffing, a strict referrer policy, and camera, microphone and location switched off).

## System

- **Tokens** from `docs/DESIGN.md` as CSS custom properties; CSS Modules; no UI kit.
- **Reusable components:** Button, Field, AmountField, Segmented, Tag, QuoteDocument, Checklist, Stamp, SpecTable, Accordion, Stepper, AssessmentForm, Nav and MobileMenu, and the Route. The `/components` page shows each one in its states.
- **Sources of truth in the repo:** `docs/DESIGN.md` (visual and behavioural spec), `docs/COPY.md` (every string, verbatim) and `README.md` (handoff notes and a running assumptions list).

## Assumptions

- Contact details, the quote anatomy, the status stepper and the manager conversation are **illustrative**. One notice above the navigation says so, and nothing is sent anywhere: the form, file attachment and contact buttons are demos, and each says so at the moment you use it.
- The route is illustrative geography: it follows the real sea lane from Dubai Creek to Mumbai, but the endpoint is labelled as the supplier, and nothing claims a city-specific service.
- The regulatory footer is the brief's neutral placeholder. No licensing, coverage or guarantees are claimed.
- The page is marked `noindex`, as a prototype with placeholder content.

## Unfinished

- No official Straiton logo or brand assets were supplied, so the wordmark is typographic and the palette is sampled.
- Copy hasn't had a legal or compliance review.
- A full pass with a screen reader is still to do; the structure (landmarks, heading order, live regions) is checked.
- There is no backend: the form ends in a local demo confirmation, as the brief allows.

## How it was made

Designed and built with Claude: the concept, DESIGN.md, COPY.md and the reference frames in Claude Design, and the build, testing and iteration in Claude Code. My time went into the direction, the copy and messaging, and reviewing and steering each pass.
