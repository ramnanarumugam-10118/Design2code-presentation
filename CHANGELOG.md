# Changelog

Format: `[Date] | Slide/File | Change | Reason`

---

## 2026-05-24

### PROJECT.md + CHANGELOG.md created
- **File:** PROJECT.md, CHANGELOG.md
- **Change:** Created project orientation doc and this changelog
- **Why:** So any new session can read these two files and immediately understand the deck structure, tech stack, and history of changes without reading all 13 slide files

---

### Restructured the opening act — Slide02 → glassmorphic light, Slide03 → Scope, Slide04 → Architecture, plus 2 new slides (Foundation, Components)
- **Files:** `Slide02.tsx`, `Slide03.tsx`, `Slide04.tsx`, **NEW** `SlideFoundation.tsx`, **NEW** `SlideComponents.tsx`, `slides/index.ts`, `PROJECT.md`
- **Narrative arc now**: Title → **Problem → Scope → Architecture → Foundation → Components** → Claim-form morph → Workflow → …
- **Changes:**
  1. **Slide02 (Problem) — back to light glassmorphic**: dark theme reverted to light, cards use the existing `.card-light` frosted-glass class. Same 5 problems / 2×2 + 1 wide layout, same regulatory pink accent on card 05. Heading restored to the purple gradient ("Where we are today.")
  2. **Slide03 (Scope) — replaced "Four things we're building"**: light theme, 4 glassmorphic cards with icon + numbered tag + title + body. Pointers: 01 Foundational design system, 02 AI-powered design tooling, 03 Design-to-code translation, 04 Accessibility & compliance. Heading: "Four bets, one system."
  3. **Slide04 (Architecture) — replaced "Visuals + tone"**: 2 large cards side-by-side, each with a purple-gradient top border (deck-framework styling). Text taken from the reference image: 01 "A foundational design system" + body, 02 "An AI-powered design-to-code workflow" + body. Heading: "Two pillars, one product."
  4. **NEW SlideFoundation**: 2-column layout — LEFT: 5 numbered points (Tokens / Atoms, molecules and organisms / Standardised visual language / Configurable design + accessibility / Two systems for two contexts), RIGHT: L0–L4 hierarchy visualization in glassmorphic rows with token swatches, atom pills, molecule clusters, organism bar, page-layout outline. Heading: "A proper foundation, built ground-up."
  5. **NEW SlideComponents**: 2×2 grid showing real ACKO components by hierarchy — L0 (token swatches, 6 colors), L1 (Button variants), L2 (TextInput + Checkbox), L3 (RadioGroup + Submit Button as a composite form section). Heading: "Built-in components."
  6. **Slide order** updated in `slides/index.ts`. Deck grows from 14 → 16 slides. `PROJECT.md` slide table fully rewritten

---

### Slide02 — Full redesign: 5 problem cards with subtexts (2×2 grid + regulatory bar), dark theme
- **File:** `src/slides/Slide02.tsx`, `PROJECT.md`
- **Changes:**
  1. **Theme switched light → dark** to match the reference. Logo now `LOGO_DARK`. Slide reads as a "what's broken" beat between the title slide and the four-things slide
  2. **Pill rows replaced with card grid** — old design: 4 pill-shaped horizontal rows with title + big number on the right. New: 5 cards with **title + multi-line subtext** stacked inside each
  3. **New content per the reference** — all 5 problems rewritten with richer copy:
     - 01 `Slow cycle time` — "Multiple handoffs between design and engineering…"
     - 02 `Designer as bottleneck` — "Only designers can create or modify UI…"
     - 03 `Inconsistent UI across surfaces` — "No standardised design system…"
     - 04 `Fragile, hard-to-maintain code` — "No design tokens. No shared component standards…"
     - 05 `Not WCAG 2.0 accessibility compliant` — "Following a Supreme Court ruling, IRDAI is enforcing…" (REGULATORY)
  4. **Layout: 2×2 grid + full-width bar** — `gridTemplateColumns: 1fr 1fr, gridTemplateRows: 1fr 1fr` for cards 01–04; card 05 sits below as a full-width bar (`flex` column with two children, the grid grows via `flex: 1`)
  5. **Regulatory card has pink accent** — `#f06aa3` for the `05 — REGULATORY` label, border `rgba(240,106,163,0.32)`, a subtle radial pink highlight on the top-right + soft pink box-shadow. Visually distinct from the 4 purple-bordered cards so the legal urgency reads at a glance
  6. **Heading** kept as "Where we are today." but switched from purple gradient to plain white for legibility on dark, weight 700, `clamp(48px, 6.4vw, 84px)`. Eyebrow "Today" added for scaffolding
- **Bundle impact:** Negligible

---

### SlideDesignSystem — Claim form title, Date field, driver question, wider column inside phone
- **File:** `src/slides/SlideDesignSystem.tsx`
- **Changes:**
  1. **"Claim form" title** added at the top of the phone (mobile) / browser (web) frames. Rendered in an `AnimatePresence` outside the COMPS loop so it only appears in `mobile` / `web` — never in `kit`. Title uses framer-motion `layout` so it morphs cleanly from the mobile position (centered, 22 px) to web (left-aligned at 20%, 28 px) when the prompt fires. Letter-spacing `-0.4`, weight 700
  2. **Date field added** — new `dateField` CompId. Sits between Mobile-number and the Textarea. Uses ACKO `<TextInput>` with a calendar-icon `iconRight` and `readOnly` so it visually reads as a date picker. Copy: kit → label `Label` + placeholder `Select date`; mobile/web → label `Date of incident` + value `24 May 2026`
  3. **Radio question changed** — was "Plan" with Comprehensive / Third-party. Now "Who was driving the car?" with **Myself / Others**. Still horizontal-orientation, size `sm` so it fits the column
  4. **Component column widened** from 260 → 280 px (`calc(50% - 130px)` → `calc(50% - 140px)`) so the inputs hug the phone bezel — less wasted side padding inside the frame, matching the user's "left and right has too much space" feedback. Phone frame width bumped `22% → 24%` so the wider column has the right bezel ratio
  5. **Vertical spacing rebuilt** to give proper top/bottom padding inside the phone frame:
     - Title @ `14%`, TextField @ `21%`, DateField @ `31%`, Textarea @ `41%`, CheckboxRadio @ `57%`, Submit @ `76%`. Frame spans 12% → 84%, so ~2% top safe area + ~2% bottom safe area, with every component sitting cleanly inside
  6. **Web positions** mirror the same spacing logic with the title (15%) + 60%-wide column (left 20% → right 80%). Same vertical rhythm but more generous because the browser frame is larger
- **Bundle impact:** Negligible (`@acko/text-input` used in two more places, no new dependencies)

---

### SlideDesignSystem — Card removed, generic labels in kit, layout tightened
- **File:** `src/slides/SlideDesignSystem.tsx`
- **Changes:**
  1. **Card visual + data removed entirely**: `card` dropped from `CompId`, `COMPS`, `ENTRY_DELAYS`, and `renderVisual`. The plan-summary card was eating ~140 px of phone screen and pushing the Submit CTA off the bottom edge. With it gone, the mobile form fits cleanly inside the phone frame
  2. **Generic labels in kit, real labels in form**: `renderVisual(id, layoutKey)` now takes the layoutKey and each visual switches its copy:
     - **TextField**: kit → label `Label` + placeholder `Enter text` (empty value); mobile/web → label `Mobile number` + value `+91 98765 43210`
     - **Textarea**: kit → label `Label` + placeholder `Enter description`; mobile/web → label `Tell us about the claim` + the pothole story
     - **Checkbox**: kit → `Checkbox label`; mobile/web → `I agree to the terms & conditions`
     - **RadioGroup**: kit → `Radio group` + `Option A / Option B`; mobile/web → `Plan` + `Comprehensive plan / Third-party only`
     - **Button**: kit → `Button`; mobile/web → `Submit`
     Reads as a real "component library showcase" in kit, then transforms into a real claim form on prompt.
  3. **Layout positions retuned** for the 4 remaining components — now that Card is gone there's more vertical room:
     - **Mobile**: TextField `12%` → Textarea `24%` → CheckboxRadio `50%` (height bumped to 130 for the radio+checkbox to breathe) → Submit `78%` (full-width)
     - **Web**: TextField `18%` → Textarea `32%` → CheckboxRadio `58%` → Submit `78%`. Content centered at 20%–80% horizontally
  4. **Component sizing trimmed**: Checkbox + RadioGroup switched from default `md` to `size="sm"` so labels don't overflow the 260-px-wide phone column. Combined with horizontal orientation on the RadioGroup, the consent + plan block fits in a single compact band

---

### SlideDesignSystem — Real `@acko/*` components, claim-form mobile/desktop layouts, new prompts
- **Files:** `damaris-react/package.json`, `damaris-react/vite.config.ts`, `damaris-react/src/acko.css` (new), `damaris-react/src/main.tsx`, `damaris-react/src/slides/SlideDesignSystem.tsx`
- **Changes:**
  1. **Nexus now reachable** — installed the real ACKO components: `@acko/button`, `@acko/text-input`, `@acko/textarea`, `@acko/checkbox`, `@acko/radio`, `@acko/card`, `@acko/typography`, `@acko/css`, `@acko/tokens` (all `1.5.0`). Used `npm install --legacy-peer-deps` because ACKO declares React 18 peer dep and the project is on React 19
  2. **Tailwind v4 set up** — `@tailwindcss/vite` + `tailwindcss` dev-deps installed; `vite.config.ts` updated to register `tailwindcss()` plugin (ACKO's per-component CSS uses `@apply` directives that need Tailwind v4 to resolve)
  3. **`src/acko.css` created** — single global stylesheet that imports `tailwindcss`, `@acko/tokens/tokens.css`, `@acko/tokens/theme.css`, and per-component CSS (`button.css`, `text-input.css`, `textarea.css`, `checkbox.css`, `radio.css`, `card.css`, `label.css`, `field.css`, `typography.css`). Loaded once in `main.tsx` (before `index.css`)
  4. **Inline `Acko*` approximations deleted** and replaced with thin wrappers around real ACKO components: `<TextInput label="Mobile number" />`, `<Textarea label="Tell us about the claim" />`, `<Checkbox label="I agree…" />` + `<RadioGroup options=…>`, `<Card variant="elevated" padding="lg">`. Submit uses real `<Button variant="primary" size="lg" fullWidth>` inside the existing `motion.div` zoom wrapper
  5. **Mobile layout = vertical claim form** inside the phone frame: TextField (Mobile number) at top → Textarea (claim details) → Checkbox+RadioGroup (T&C + plan) → Card (plan summary) → full-width Submit at the bottom of the phone screen. Button moved from middle (36%) to bottom (78%) and widened 140→240 px — Submit lives at thumb position
  6. **Desktop layout = single-column wider form** (per user's pick): same 5 components stacked, all left-padded to 18% / right-padded to 82% (content sits in the middle 64% of the slide), Card sits inline as a horizontal "plan summary" band, Submit left-aligned at 220 px wide (standard desktop primary action treatment)
  7. **Chat prompts updated**: `"Design this as a mobile screen"` → `"Build a simple claim form for mobile"`; `"Now make it a website"` → `"Now build it for desktop"`
  8. Kit (step 0) layout unchanged — still the sketch-based "component library showcase" arrangement (Button centered, TextField top-left, TextArea top-right, CheckboxRadio bottom-left, Card bottom-right)
- **Bundle impact:** CSS 4 kB → 74 kB (ACKO per-component CSS), JS 367 kB → 376 kB (real ACKO React components)

---

### SlideDesignSystem — Component set + kit layout updated to match paper sketch (ACKO-style visuals)
- **Files:** `src/slides/SlideDesignSystem.tsx`, `damaris-react/.npmrc` (new)
- **Why I didn't install the real `@acko/*` packages:** Nexus at `nexus-dev.acko.in:8080` is unreachable from this environment (TCP connects, but the server resets the connection — likely needs the company VPN). The user-provided GitHub repo only contains the consuming `App.tsx`, not component source. So I rebuilt the slide with inline ACKO-style visuals; swapping for `import { Button } from '@acko/button'` etc. is a 1-line change per visual when the registry is reachable
- **Changes:**
  1. **Component set replaced** to match the sketch: was `{header, card, dropdown, input, modal, button, badge}` (7 items, generic). Now `{button, textField, textArea, checkboxRadio, card}` (5 items, real product UI primitives). `CompId` typed as a union for safety
  2. **Kit layout per paper sketch**: Button centered (the "seed"), TextField top-left small pill, TextArea top-right medium block, Checkbox+Radio combo bottom-left, Card bottom-right (largest). Coordinates: TF `(10%, 26%, 22%×56)`, TA `(58%, 14%, 30%×150)`, Btn `(50%, 50%, 128×44)`, CR `(10%, 63%, 22%×96)`, Card `(58%, 44%, 30%×280)`
  3. **Mobile layout** updated to stack the 5 new components vertically in a 260-px centered column (TextField → TextArea → Button → CheckboxRadio → Card). Web layout puts TextField + Button as a top form row, TextArea below as content, then CheckboxRadio (left) + Card (right) — a more form-like page structure
  4. **Inline ACKO-style visuals** added (`AckoTextField`, `AckoTextArea`, `AckoCheckboxRadio`, `AckoCard`) — each renders a clean white card with the ACKO purple `#580092` as the accent. Labels use product-realistic copy ("Mobile number / +91 98765 43210", "Tell us about your claim", "Comprehensive · ₹5,499/year · ✓ Own damage cover…")
  5. **Button styling** updated from pill (`borderRadius: 999`) to standard ACKO button radius `10` with text `Submit`. Zoom entrance (3.6× → 1×) preserved
  6. **`.npmrc`** added with the ACKO Nexus registry line `@acko:registry=http://nexus-dev.acko.in:8080/repository/quark-skill/` — ready for when the registry is reachable
  7. `Comp` wrapper simplified — dashed-border placeholder rendering removed (each visual now provides its own styling); only positioning + entry animation remains in the wrapper

---

### SlideHonestScope — Explicit light gradient background added
- **File:** `src/slides/SlideHonestScope.tsx`
- **Change:** Even though `theme = 'light'` was already set (which makes `App.tsx` apply the `.slide.light` class and load `BG_Light.png`), the slide was still rendering dark in the user's view (likely the dev server / browser was holding the prior dark cache). Added an explicit light purple gradient `linear-gradient(180deg, #f4eff9 0%, #ece3f5 60%, #e3d6f1 100%)` on the slide's own top-level `motion.div` so the background is guaranteed light regardless of CSS class application

---

### SlideHonestScope — Light theme, badges removed, bold sentence promoted to card heading
- **File:** `src/slides/SlideHonestScope.tsx`, `PROJECT.md`
- **Changes:**
  1. **Theme switched dark → light**: logo now `LOGO_LIGHT`, heading black, accent purple `#580092`, supporting copy gray `#585858`. Cards use the deck's existing `.card-light` frosted-glass style instead of `#0a0a0a` solid dark
  2. **Category badges removed**: `FRAMEWORK / ADOPTION / COVERAGE / DATA` pills are gone (and the `tag` field dropped from the data structure). The cards are now content-focused rather than category-tagged
  3. **Bold sentence promoted to card heading**: the previously inline `<strong>` first sentence ("Flutter translation is in progress." etc.) is now the card's title — `fontSize: 19, fontWeight: 700, color: #000`. Description sits below on its own line as supporting body text. Visually the bold sentence reads as the heading first, then the explanatory paragraph
  4. **Amber accent bar** kept on the left edge of each card (color tuned `#fbbf24 → #d97706` for better contrast on light bg) so the slide still reads as "caveats / things to flag" at a glance
  5. Layout simplified — single-column card body (was 2-col grid for tag + content), padding rebalanced `20px 28px 20px 32px → 22px 30px 22px 38px`

---

### SlideWorkflowComparison — Bigger title, balanced 2-line labels, content cleanup
- **File:** `src/slides/SlideWorkflowComparison.tsx`
- **Changes:**
  1. **Slide title** "Three ways to ship." switched from `h-lg` (weight 600, clamp(36, 5vw, 64)) to the deck's bigger heading style: `font-weight: 700`, `clamp(52px, 6.8vw, 88px)`, `letter-spacing: -1.8px`. Matches the title weight on Slide05 / Slide06 so all slide titles read at the same impact
  2. **Flow labels** now use explicit `\n` breaks rendered via `whiteSpace: 'pre-line'` so the long labels wrap at meaningful points:
     - `AI AS\nPROTOTYPE ONLY` (was wrapping to `AI AS PROTOTYPE / ONLY` — last word alone)
     - `STREAMLINED WAY\nWITH AI` (was `OUR WAY`)
     - `TRADITIONAL` stays a single line
     - Font size 16 → 14, letter-spacing 0.20em → 0.18em, line-height 1.15 → 1.3, plus `minHeight: 2.6em` so all three label cells reserve the same vertical space regardless of line count
  3. **TRADITIONAL label color** darkened `#7a7a7a → #3a3a3a` for stronger contrast on the light background
  4. **TRADITIONAL caption** trimmed `"Slow. Many handoffs." → "Many handoffs."`
  5. **AI prototype** step: `note: 'Random rules'` removed — the step now just shows the pill, no caption underneath
  6. **Generated code** step: `formats: ['SDUI', 'React', 'Flutter']` array removed, along with the "in the required format" / `SDUI · React · Flutter` subtext that rendered under the pill

---

### Slide07 — Center circle properly centered, metric boxes lightened, new metrics
- **File:** `src/slides/Slide07.tsx`
- **Changes:**
  1. **Big circle centering**: dimensions switched from `width/height: 95vh` to `85vmin`. `vh`-based sizing pushed the circle out of frame on wide displays where the viewport height exceeded the slide content height; `vmin` (the smaller of viewport width/height) keeps the circle within the slide regardless of aspect ratio
  2. **Orbit boxes lightened**: solid `background: #0a0a0a` replaced with `linear-gradient(180deg, #2d1f44 0%, #1a0d2a 100%)` — a brand-purple-tinted dark gradient. Reads as "dark accent" rather than pure black. Added a subtle outer ring `box-shadow` (8px ring at 6% rgba) for soft glow consistent with the rest of the deck
  3. **Metrics updated** to match the user-provided figures:
     - Top-left: `1.5 days` — "Bike pilot: design → UAT." (was `80–90%` UI right on the first try)
     - Top-right: `40%` — "Less effort to ship." (unchanged)
     - Bottom: `0` — "Days spent on design QA." (was "Design handoffs.")

---

### Slide09 — Demo simplified to a single centered headline
- **File:** `src/slides/Slide09.tsx`
- **Change:** Stripped the two screen-recording placeholder boxes + dual-column layout (Designer view / Engineer view). The slide is now a minimal "interstitial":
  - Logo top-left, "Demo" tag pill centered
  - Single huge headline "Let's see it in action." with `in action.` tinted purple (`#d1aef9`)
  - Soft radial purple glow behind the text for ambient depth
  - Same animations as before (`scaleIn` for the headline, stagger for the lead-in)
- Theme stays dark. This works as a clean breath between "How we ship today" and "Three ways to ship"

---

### Slide order — Demo (Slide09) moved up right after "How we ship today"
- **Files:** `src/slides/index.ts`, `PROJECT.md`
- **Change:** Moved `Slide09` ("Two workflows. One toolkit" — the demo with the two screen recording placeholders) from position 12 → position 7 in the `slides` array, immediately after `Slide05` ("How we ship today"). The demo now lands right when the audience has seen how the workflow works, before the comparison slide
- New deck order: Slide01 → Slide02 → Slide03 → Slide04 → SlideDesignSystem → Slide05 → **Slide09 (demo)** → SlideWorkflowComparison → Slide06 → Slide07 → Slide08 → SlideHonestScope → Slide10 → Slide11

---

### Slide08 (rewrite) + SlideHonestScope (new) — "Six shifts" + "Honest scope" act
- **Files:** `src/slides/Slide08.tsx`, `src/slides/SlideHonestScope.tsx` (new), `src/slides/index.ts`, `PROJECT.md`
- **Changes:**
  1. **Slide08 full rewrite** ("What changes" → "Six shifts, across the org"). Theme switched `light → dark`. New content: 3×2 grid of 6 impact cards driven by a `SHIFTS` data array:
     - `Cycle time compression` (lightning, amber chip), `Engineering efficiency` (gear, cyan), `Design unbottlenecked` (diamond, purple), `Systemic visual consistency` (lines, pink), `Easy change management` (refresh, orange), `Accessibility — ahead of the deadline` (check, green)
     - Each card uses the existing dark `.card` class. Icon sits in a 38×38 rounded chip with its accent color at ~14% opacity; the icon itself uses the full accent color. Title white, description #9f9f9f
     - Heading uses the existing `h-lg` class with an inline span tinted `#ad56ff` for the "across the org" part to match the reference's split-color treatment
  2. **New SlideHonestScope** — "Being clear about the current edge". Theme dark. 4 horizontal caveat cards stacked vertically:
     - Each card has an amber (`#fbbf24`) vertical accent bar pinned to the left edge, the category tag (`FRAMEWORK` / `ADOPTION` / `COVERAGE` / `DATA`) rendered as an amber-bordered pill, and the title sentence (bold white) inline with the description (gray)
     - Two-column grid: `160px` for the tag, `1fr` for the prose
     - Body description above the list explains the intent — "A few things are intentionally not done yet. Calling them out so this view is accurate, not aspirational."
  3. **Slide order**: `SlideHonestScope` inserted between `Slide08` and `Slide09` in `slides/index.ts`. Deck total grows from 13 → 14 slides. `PROJECT.md` slide table updated to reflect the new positions

---

### Slide05 — M4 stack offsetY tuned so "Segment events" sits below the curve
- **File:** `src/slides/Slide05.tsx`
- **Change:** M4 split `offsetY` adjusted `-110 → -90`. With the bigger 60px circles, `-110` pushed the 4th row label ("Segment events") up onto the curve line at the milestone's anchor (`y:72%`); `-90` lets the row land cleanly below the curve while still keeping the `Backend wiring` title + description on the slide

---

### Slide06 — Phone mockup: title pinned top, phone centered + bigger, lighter bezel
- **File:** `src/slides/Slide06.tsx`
- **Changes:**
  1. **Order flipped** — title (`Bike journey` / `Landing page` / `App polish`) and "In progress" pill now sit at the **top** of each column (was bottom). Title bumped: `fontSize 18 → 22`, `fontWeight 600 → 700`, letter-spacing tightened
  2. **Phone centered + bigger** — wrapped the device in a `flex: 1` container with `align-items: center, justify-content: center`. Phone now uses `height: 100%` + `aspect-ratio: 9 / 18.5` (no `maxWidth` cap), so it fills the full available column height and the width is derived from the aspect ratio. Phone is substantially taller than the previous 230-px-capped version
  3. **Lighter bezel** — body switched from the heavy `linear-gradient(180deg, #1a1a1a, #0a0a0a)` to `rgba(255,255,255,0.60)` with a soft `1.5px solid rgba(88,0,146,0.22)` border. Side buttons + their stroke moved from `#0a0a0a` to the same `rgba(88,0,146,0.22)` purple. Shadow softened to `rgba(88,0,146,0.10)` / `0.06`. The notch stays dark (`#1a1a1a`) so it still reads as an iPhone-style cutout. Border radius nudged 32 → 38 / 24 → 30 to feel proportional to the bigger device
  4. Placeholder text inside the screen recolored from a grey `#a8a8b0` to the on-brand `#9f7bc7` and slightly larger so it's readable on the bigger screen area

---

### Slide05 — M4 split: circle size matches M2, per-circle icons, stack pushed up
- **File:** `src/slides/Slide05.tsx`
- **Changes:**
  1. Split circles bumped `50 → 60px` so M3 and M4 now match the M2 Figma/AI circle size exactly. Same purple fill, light-purple border. Shadow ring deepened slightly (`0.24 → 0.30`, ring `6 → 8`) so the bigger circles still feel "lifted"
  2. **Per-circle icons** for M4 Backend wiring: `Strapi integration → database cylinder`, `API integration → link/chain`, `Data modeling → layers`, `Segment events → activity/heartbeat`. M3 keeps the code-chevron on all three. Icons defined as small components (`CodeIcon`, `DatabaseIcon`, `LinkIcon`, `LayersIcon`, `ActivityIcon`) and attached directly to each `SplitItem` for cleanest data structure
  3. **M4 stack pushed up** with new `offsetY: -110` in the split definition. At y:72% with bigger 60px circles + 4 items, a stack centered exactly on the anchor pushed the `Backend wiring` title and description off the bottom of the slide. The offset shifts the whole stack up by 110px so the title now sits at `+93` below the anchor (stack center −110 + half 192 + gap 18) with clear room below
  4. `stackTop` and `labelTop` math updated to honor `stackCenterY` (was always centered on anchor). M3 unchanged since it has no offset — its 3-item stack auto-fits at y:40%

---

### Slide05 — Removed SDUI, added code-chevron icon inside each Code-to-dev circle
- **File:** `src/slides/Slide05.tsx`
- **Changes:**
  1. `SDUI` removed from the M3 (Code to dev) split — now just 3 items: `React`, `Next JS`, `Flutter`
  2. Each M3 circle now renders the code-chevron icon (`<>`) in white at 22×22 — matches the original M3 milestone icon, so the split's individual circles read clearly as "code targets"
  3. Stack height + label positioning now derived dynamically from `pillSplit.items.length` rather than hardcoded to 4. M3's 3-item stack is shorter (244px tall, half 122) so its title `Code to dev` sits at `top: -213` (auto-computed from `stackHeight/2 + 91`) instead of the previous `-252`. M4 still has 4 items so its label position is unchanged
  4. Removed the static `SPLIT_STACK_TOP` constant — replaced with a per-milestone `stackTop` computed inside the map

---

### Slide05 — M3 / M4 split circles bumped to match M2's size + title pushed clear of stack
- **File:** `src/slides/Slide05.tsx`
- **Changes:**
  1. Split circles for M3 (Code to dev) and M4 (Backend wiring) sized up from `32px → 50px` so they read at the same visual weight as the M2 Figma/AI split circles. Same purple fill + light purple border + outer glow ring style
  2. Row spacing increased to match the larger circles: label-to-circle gap `4 → 6`, inter-row gap `8 → 14`. Row height now 72, total stack 330px (centered on the milestone anchor)
  3. Row widths widened: M3 `90 → 110` (R/N/F/S labels have more breathing room), M4 `180 → 220` (longer integration labels)
  4. **Main title positioning fixed** so it no longer overlaps the top of the stack — `labelTop` for M3 (`Code to dev` title sits above) pushed `-150 → -252`, and for M4 (`Backend wiring` title sits below) pushed `132 → 182`. Title + description block now has a clean ~16px gap from the nearest split row

---

### Slide05 — M3 / M4 splits: labels now sit ABOVE circles (matching reference)
- **File:** `src/slides/Slide05.tsx`
- **Changes:**
  1. Each split row is now a vertical "label + circle" unit (was horizontal "circle + label"). Inside each row: text on top, 4px gap, 32px filled purple circle below — same purple style as M2 split for consistency
  2. M3 items reordered + renamed to match the reference image: `React`, `Next JS`, `Flutter`, `SDUI` (was `React`, `Flutter`, `NextJS`, `SDUI`)
  3. Geometry: circle 34→32, row height 52 (label 16 + gap 4 + circle 32), inter-row gap 8. Total stack height 4×52 + 3×8 = **232px**, centered on the milestone anchor. Row widths: 90 (M3) and 180 (M4) — each label centered above its circle
  4. Main title `labelTop` bumped for the taller stack: M3 split `-128 → -150`, M4 split `112 → 132`
  5. Stagger delay slightly slowed (`0.06 → 0.07` per index) so the items fan out a touch more deliberately

---

### Slide05 — M3 / M4 splits switched from button-pills to circle + label rows
- **File:** `src/slides/Slide05.tsx`
- **Change:** The Code-to-dev and Backend-wiring splits used rounded-rectangle pills with text inside (button look). Now each row is a small filled purple circle (34px, same `#580092` + `#ad56ff` border + glow ring as the M2 split circles) with the label sitting in black text to the right — matching the M2 split's "circle + label" style for visual consistency
- Geometry: row height = circle (34), vertical gap 14, horizontal gap 12. Row width per milestone: 116 (React/Flutter/NextJS/SDUI) and 220 (Strapi integration / API integration / Data modeling / Segment events). Whole stack still centered on the milestone anchor
- Main title `labelTop` nudged for the slightly taller stack: M3 pill split `-118 → -128`, M4 pill split `94 → 112`

---

### Slide05 — Removed numbers + flowing line, labeled M2 split, added pill splits for M3 + M4
- **File:** `src/slides/Slide05.tsx`
- **Changes:**
  1. **Removed ghost step numbers**: the huge `1, 2, 3, 4, 5` rendered behind each milestone (and their slide-up animation on activation) are gone. The journey reads as the curve + circles only
  2. **Removed flowing dashes animation**: the second `<motion.path>` with `strokeDasharray` + infinite `strokeDashoffset` loop is deleted. The curve is now just the static gradient stroke
  3. **Milestone 2 split — proper labels + bigger arrows**:
     - Top circle now holds the pen/Figma icon with **"Figma"** label above it (`top: -106`)
     - Bottom circle holds the sparkle/AI icon with **"AI"** label below it (`top: 84`)
     - Arrow SVGs bumped from 10×14 → 14×22, stroke 1.8 → 2, color changed from purple to black for visibility, container resized 38×18 → 46×26
     - Circles bumped 56 → 60 to give the icons + labels more breathing room
  4. **New milestone 3 split — Code to dev fans into 4 format pills**: when active, the single circle fades and 4 purple pills stack vertically: `React`, `Flutter`, `NextJS`, `SDUI`. Each pill is 110×30, staggered entry (50ms + 60ms per index)
  5. **New milestone 4 split — Backend wiring fans into 4 task pills**: same pill mechanism with wider 184px pills: `Strapi integration`, `API integration`, `Data modeling`, `Segment events`
  6. **Generic split data**: pill splits driven by a `SPLIT_PILLS` record keyed by milestone num — easy to add more later. Stack height auto-computed from `PILL_HEIGHT + PILL_GAP` so layout stays correct if the list size changes
  7. **Label position adjusted per split type**: title/description sits at `116` below anchor for M2 split (clears Figma circle, AI circle, AI sub-label), `94` below for M4 pill split, `-118` above for M3 pill split

---

### SlideWorkflowComparison — Bolder titles, more spacing, new AI step, formats subtext
- **File:** `src/slides/SlideWorkflowComparison.tsx`
- **Changes:**
  1. **New step in "AI as prototype only" flow**: added `{ text: 'Redesign to match UI', style: 'warning' }` right after the red `AI prototype` block. Reinforces the caption "AI used wrong. Code is rewritten anyway" by visually showing the extra rework step the designer has to do
  2. **Formats subtext on "Generated code"** (OUR WAY): now renders two lines below the purple pill — *"in the required format"* (italic, muted) and *"SDUI · React · Flutter"* (purple, bold, letter-spaced) — driven by a new optional `formats: string[]` field on the step type
  3. **Flow labels much bolder**: TRADITIONAL / AI AS PROTOTYPE ONLY / OUR WAY bumped from `fontSize: 11, fontWeight: 700` to `fontSize: 16, fontWeight: 800`, letter-spacing `0.18em → 0.20em`, label-to-caption margin `6 → 12`. Caption color `#888 → #666`, size `12 → 13` for proportional readability
  4. **More spacing across the comparison**:
     - Row gap `28 → 40`
     - Inner padding `22px 0 → 30px 0`
     - Grid template `180px 1fr → 240px 1fr` (wider label column for the bigger title)
     - Label↔flow gap `28 → 40`
  5. **Slightly larger flow pills and arrows**: pill padding `10px 18px → 11px 20px`, arrows `16px → 18px` and adjusted vertical alignment

---

### Slide06 — Phone mockups + bigger left text
- **File:** `src/slides/Slide06.tsx`
- **Changes:**
  1. Replaced the 3 gradient/glass pilot cards with 3 iPhone-style phone mockups (flowbite-inspired). Each device has: rounded dark `linear-gradient(180deg, #1a1a1a, #0a0a0a)` body, padded screen with `#fafafb` background, dynamic-island notch at the top, and subtle side buttons (mute + 2 volume on the left, power on the right) for visual realism
  2. Phones are at `maxWidth: 230, aspect-ratio: 9 / 18.5` so they read as real mobile devices and leave breathing room around them
  3. New `PhoneMockup` component takes `children` that fills the screen area — ready for `<img>` or `<video>` to be dropped in when the user provides assets. Falls back to a labeled image-icon placeholder when no children are passed
  4. Title (e.g., "Bike journey") + "In progress" pill render below each device for context (replaces the inline label inside the old cards)
  5. Left-corner text bumped: heading "We already started." now `clamp(52px, 6.8vw, 88px)` (was `h-lg`'s `clamp(36px, 5vw, 64px)`), font-weight 700 (was 600), letter-spacing tightened to `-1.8px`. Left column width grown `300px → 360px` to accommodate the larger headline. Description font size 15 → 17 for proportional readability

---

### Slide05 — Milestone 2 splits into AI + Pen circles with bidirectional arrows
- **File:** `src/slides/Slide05.tsx`
- **Changes:**
  1. When milestone 2 ("Design via prompt") becomes the active step (`step === 1`), its single circle fades out and is replaced by two stacked purple circles: AI sparkles on top, pen/design icon on bottom. Bidirectional up+down arrows render in the gap between them
  2. Both split circles use the same active-state styling as the original active circle (purple fill `#580092`, `#ad56ff` border, soft outer glow ring) — same purple palette, no grey reference colors
  3. Animation is staggered: top circle fades+scales in (delay 0.05s), bottom circle (delay 0.10s), arrows pop in last (delay 0.25s). All reverse smoothly when the user advances past milestone 2 — split circles fade out and the single circle reappears (now in its "past" inactive state)
  4. Ghost number "2" `y` offset adjusted to `-82` when split is active so it sits cleanly above the top of the split stack rather than overlapping the top circle
  5. Title/description label `top` offset adjusted to `82` (vs the normal `iconSize/2 + 28`) so it sits below the bottom circle of the split stack with consistent breathing room

---

### SlideDesignSystem — Revert scribble content, button properly nested in header
- **File:** `src/slides/SlideDesignSystem.tsx`
- **Changes:**
  1. Removed all wireframe scribble content (Bar helper, HeaderScribble, CardScribble, ModalScribble, DropdownScribble, InputScribble, BadgeScribble, Scribble switch) and the label↔scribble overlay/crossfade. Components now render their plain label in all layouts (kit, mobile, web) — matching the simple dashed-box wireframe look the user wants. This also leaves a clean shell for swapping in real component implementations later
  2. Web Header height bumped from `46px` to `56px` so the CTA button sits inside it visually rather than overlapping the bottom edge
  3. Web Button repositioned from `top: 16.5%, left: 82%, w92×h32` to `top: 15.6%, left: 83%, w90×h32` — vertically centered inside the taller header bar, no longer floating across the header bottom edge

---

### SlideDesignSystem — Web layout restructured as a real page + wireframe scribble content
- **File:** `src/slides/SlideDesignSystem.tsx`
- **Changes:**
  1. **Web layout redone** as a proper marketing-page structure rather than scattered boxes:
     - Row 1 (top): Header bar (90% wide) with Button as a top-right CTA inside it (`82%, 16.5%`)
     - Row 2 (hero): Card 56% wide on the left, Modal 32% wide on the right — both 215px tall — forming a hero text + image layout
     - Row 3 (feature row): Dropdown + Input side-by-side at 44% wide each (a feature/filter row)
     - Row 4 (footer): Badge centered at the bottom as a small footer accent
  2. **Wireframe scribble content** for the web layout — each component now renders content that reads as a real page section instead of a "Card" label:
     - Header: logo block + 4 nav-item bars
     - Card (hero): heading bar, subheading bar, 3 body lines, small CTA pill at the bottom
     - Modal (image): centered image-placeholder icon
     - Dropdown: text bar + chevron-down icon
     - Input: text bar + search icon
     - Badge: dot + small text bar
  3. **Label ↔ scribble crossfade** — the label is overlaid with the scribble inside each component. When the layout morphs into web, the label fades out (0.3s) and the scribble fades in (0.35s with 0.25s delay) so the swap reads as smooth content transformation rather than a flicker
  4. Kit and mobile layouts continue to show the label (unchanged) — the scribble only appears when components are large enough to read as real content

---

### SlideDesignSystem — Orchestrated chat → type → morph sequence + lower positions
- **File:** `src/slides/SlideDesignSystem.tsx`
- **Changes:**
  1. **Sequencing rewrite**: introduced an orchestrator `useEffect` that owns the timeline for forward step changes. One key press now fires a strict sequence: (a) chat slides in (550ms, first time) OR input clears (280ms, subsequent), (b) typewriter (~38ms/char), (c) pause 380ms, (d) send button pulses with expanding purple ring + input border flash (450ms), (e) `committedLayout` updates → components morph via `layout` prop FLIP (~700ms). Total ~3s per transition. Backward / initial step transitions snap immediately with no sequence
  2. New `committedLayout` state replaces the raw `step → layoutKey` derivation for `Comp` and `DeviceFrame`. This is what holds the components in place until the chat sequence completes
  3. `ChatInput` refactored to a fully controlled component — receives `typed`, `isTyping`, `sendPulse`, `isEmpty` as props from the parent orchestrator. Previously it ran its own typewriter `useEffect` which couldn't coordinate with the layout morph
  4. New "sent" animation visual: send button does a scale pulse `1 → 1.18 → 1` over 450ms; an expanding purple ring renders inside the button (`scale 1 → 1.9`, `opacity 0.55 → 0`); input pill border briefly brightens from `rgba(88,0,146,0.18)` to `0.55` with an extra soft glow shadow
  5. **Position adjustments**: ChatInput moved from `bottom: 10%` to `bottom: 4%`; DeviceFrame anchor moved from `top: 41%` to `top: 48%`, mobile height from `62%` to `72%`, web height from `65%` to `74%`. Frame now spans ~12%–84% (mobile) / ~11%–85% (web). Components shifted down to fill the new frame (mobile header `12% → 15%`, badge `65% → 75%`; web equivalents shifted ~4–6% down). Result: ~3% gap between frame bottom and chat top instead of the previous ~12%

---

### SlideDesignSystem — Compact section: shorter frame, components shifted down
- **File:** `src/slides/SlideDesignSystem.tsx`
- **Changes:**
  1. Device frame dimensions reduced — mobile height `78%` → `62%`, web height `76%` → `65%`. Frame center moved from `top: 38%` to `top: 41%`. Frame now spans roughly 10%–72% (mobile) and 8.5%–73.5% (web) of the slide, sitting cleanly below the "Design system" label without clipping at top
  2. Mobile components shifted down to live inside the new shorter frame: header `4%` → `12%`, card `12%` → `19%`, dropdown `28%` → `33%`, input `36%` → `41%`, modal `44%` → `49%`, button `53%` → `57%`, badge `63%` → `65%`. Card height trimmed `96` → `90` to keep proportions
  3. Web components similarly shifted: header `4%` → `9%`, card/dropdown `15%` → `18%`, button `6%` → `11%`, etc. Card/dropdown heights trimmed `200` → `175`, modal `165` → `145` to fit the shorter frame
  4. Chat bar moved up from `bottom: 6%` to `bottom: 10%` to close the gap between frame and chat (~10–12% breathing room now, not the previous 23%+)

---

### SlideDesignSystem — Minimal chat input + centered layouts
- **File:** `src/slides/SlideDesignSystem.tsx`
- **Changes:**
  1. Removed the right-side ChatBox card (with bubble history, frosted glass card, header label). Replaced with a single ChatInput pill at bottom-center — clean search-bar UX matching the reference image
  2. Pill is `min(560px, 60%)` wide, vertically positioned at `bottom: 6%`, with 40px purple send button on the right. The active prompt types live inside the pill itself (one prompt visible at a time — when step changes, text clears and the new prompt re-types)
  3. Past prompts are no longer displayed (no bubble history); only the current step's prompt shows. This keeps the focal point on the wireframe morph, not the chat UI
  4. Mobile layout re-centered to horizontal midpoint (`calc(50% - 130px)`, was `35%`) since the chat no longer occupies the right side
  5. Web layout restored to full-width grid — header 90% wide, button as a top-right `83%` CTA, components span 0–95% of slide
  6. DeviceFrame anchor restored to `left: 50%`, mobile width raised to 22% and web to 94% for full-screen feel
  7. Layout adjustments leave bottom ~14% of slide clear for the chat input strip; components confined to top ~78%

---

### SlideDesignSystem — Chat right / mobile left + typewriter prompt
- **File:** `src/slides/SlideDesignSystem.tsx`
- **Changes:**
  1. Mobile and web layouts re-anchored from horizontal center (50%) to 35% so the chat box can own the right side of the slide
  2. Web layout components squeezed from 90% wide to ~64% wide (fit in left ~67% of slide)
  3. ChatBox repositioned from bottom-centered horizontal strip to right-side vertical card (340px × 440px, vertically centered)
  4. ChatBox internal layout flipped: past prompts as static bubbles stack at top (justify-end), active prompt types live in the input row at the bottom with a typewriter effect (~38ms per char + 420ms initial delay)
  5. Blinking purple cursor shown while typing; reverts to placeholder "Type a prompt…" only when no message is active
  6. DeviceFrame anchor moved to `left: 35%` and made more visible — border alpha from 0.22 → 0.50, opacity from 0.55 → 0.85, browser dot alpha from 0.28 → 0.40
  7. Frame width converted from mixed px+% to pure % (20.5% mobile / 68% web) so framer-motion interpolates smoothly between the two states

---

### SlideDesignSystem — Kit → Mobile → Web wireframe demo
- **File:** `src/slides/SlideDesignSystem.tsx`
- **Changes:**
  1. Full rewrite of the slide body. Replaced 6 scattered `<Placeholder>` calls and the central `<Button>` with a unified `COMPS` array of 7 component definitions, each with three layout states: `kit`, `mobile`, `web`
  2. The button is now treated as a positionable component too — it still uses the purple ACKO pill styling and keeps its 3.6× → 1× zoom entrance, but its position morphs between layouts (center in kit, mid-stack in mobile, top-right CTA in web)
  3. `Comp` wrapper uses framer-motion's `layout` prop — FLIP-based animation handles the % ↔ px unit changes between layout states cleanly
  4. New `DeviceFrame` component renders behind the components: invisible in kit, narrow rounded phone outline in mobile, wide rounded browser outline (with chrome dots) in web. Frame size/radius animate smoothly across step changes
  5. New `ChatBox` component appears at slide bottom from step 1 onward. Frosted-glass card with stacked purple chat bubbles (one per step) and a faux input row ("Type a prompt…" + send icon) to sell the prompting interaction
  6. `SlideDesignSystem.steps = 3` enables 3 within-slide arrow presses: kit → mobile → web → next slide

---

### Slide05 — Step-by-step workflow interaction + visual overhaul
- **File:** `src/slides/Slide05.tsx`, `src/slides/index.ts`, `src/App.tsx`
- **Changes:**
  1. Heading (`How we ship today.`) and eyebrow (`Workflow`) font sizes increased
  2. All 5 milestones now highlight in purple — previously only #2 and #3 had `accent: true`, which looked inconsistent
  3. Step-by-step highlight: pressing ArrowRight now advances the active milestone (bigger circle 88px, white icon, purple fill, bigger title) rather than jumping to the next slide immediately. After milestone 5, ArrowRight moves to the next slide
  4. Inactive milestones are smaller (64px), faded — past ones have subtle purple tint, future ones are white/gray
  5. Flowing animated dashes added to the curve to show forward direction
  6. `SlideComponent` type updated to accept `step?: number` prop and expose `steps?: number` static property
  7. `App.tsx` updated to track sub-step state, reset on slide change, and handle both ArrowRight (advance step or slide) and ArrowLeft (retreat step or slide)
