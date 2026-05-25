# Project: Design-to-Code Presentation

## Purpose
Internal pitch deck for Project Damaris / Aurora — presenting the AI-assisted design-to-code workflow being built at ACKO. Used in co-founder presentations.

## Tech Stack
- React + TypeScript + Vite (`damaris-react/`)
- Framer Motion for slide transitions and per-element animations
- Plus Jakarta Sans typeface
- Two themes: `dark` (dark bg) and `light` (light bg), controlled via `SlideComponent.theme`

## Navigation
- Arrow keys (← →) advance/retreat slides
- Some slides have **sub-steps** (e.g. Slide05): right arrow steps through milestones _within_ the slide before advancing to the next slide
- Nav bar at bottom has dot indicators + Prev/Next buttons

## Slide Order (1-indexed as user sees it)

| # | File | Theme | Title / Purpose |
|---|------|-------|-----------------|
| 1 | Slide01 | dark | Title card — "Project: XXXXXX" |
| 2 | Slide02 | light | "Where we are today" — 5 problem cards in glassmorphic 2×2 grid + 1 full-width regulatory bar (pink accent) |
| 3 | Slide03 | light | "Four bets, one system" — 4 glassmorphic Scope pointers (design system, AI tooling, design-to-code, accessibility) |
| 4 | Slide04 | light | "Two pillars, one product" — Architecture: 2 cards (foundational design system + AI design-to-code workflow) |
| 5 | SlideFoundation | light | "A proper foundation, built ground-up" — 5 numbered points + L0–L4 hierarchy visualization |
| 6 | SlideComponents | light | "Built-in components" — 2×2 grid of real ACKO components by hierarchy (Tokens, Atoms, Molecules, Organisms) |
| 7 | SlideDesignSystem | light | Claim-form morph — chat-driven kit → mobile form → desktop form |
| 8 | Slide05 | light | "How we ship today" — 5-step workflow journey with step-by-step highlight |
| 9 | Slide09 | dark | "Two workflows. One toolkit" — Demo interstitial |
| 10 | SlideWorkflowComparison | light | "Three ways to ship" — Traditional vs AI-only vs Streamlined Way |
| 11 | Slide06 | light | "We already started" — 3 phone-mockup pilot project cards |
| 12 | Slide07 | light | "Numbers from the Bike pilot" — 3 orbit stat circles |
| 13 | Slide08 | dark | "Six shifts, across the org" — 3×2 grid of impact cards with colored icon chips |
| 14 | SlideHonestScope | light | "Being clear about the current edge" — 4 caveat cards with amber accent bar |
| 15 | Slide10 | light | "What's next" — 4-row roadmap |
| 16 | Slide11 | dark | Closing card — "Anyone at ACKO with good judgement and taste can now build." |

## Key Files
- `src/slides/index.ts` — slide registry and `SlideComponent` type
- `src/App.tsx` — slide + step state, keyboard navigation
- `src/motion.ts` — shared Framer Motion variants (`fadeUp`, `scaleIn`, `softFade`, `staggerParent`)
- `src/assets.ts` — logo URLs (LOGO_DARK, LOGO_LIGHT)
- `src/index.css` — global utility classes (`.h-lg`, `.h-xl`, `.card`, `.card-light`, `.eyebrow`, `.pill`, `.img-ph`, `.g2/.g3/.g4`)

## SlideComponent Type
```ts
React.FC<{ step?: number }> & { theme: Theme; steps?: number }
```
- `step` prop: current sub-step (0-indexed), passed from App
- `steps` property: total sub-steps in this slide; if set, ArrowRight steps through before advancing

## Design Tokens (from CSS)
- Purple: `#580092` (primary), `#ad56ff` (light), `#d1aef9` (pale)
- Dark bg: `#000000` / `#0a0a0a`
- Light bg: BG_Light.png
- Font: Plus Jakarta Sans
