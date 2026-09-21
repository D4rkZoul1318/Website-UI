---
target: "Explorations page (https://sohumsite.vercel.app/explorations)"
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 2
p1_count: 2
target_identity: "url:https://sohumsite.vercel.app/explorations"
timestamp: 2026-09-21T08-43-06Z
slug: sohumsite-vercel-app-explorations
---
Method: dual-agent (A: af992f7bf89fd2711 · B: a8169e8bbc81a482d)

**Note**: Live-URL access to sohumsite.vercel.app is blocked by network egress in this sandbox for both assessments — findings come from source inspection of `ExplorationsPage.tsx`, `Masonry.tsx`, `Masonry.css`, and `PillNav.tsx`.

## Audit Health Score (technical)

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 1/4 | Gallery images render as CSS `background-image` divs, not `<img>` — **zero alt text on any of the 13 items**; grid tiles are plain `<div onClick>` with no `role`, `tabIndex`, or `onKeyDown` — mouse-only |
| 2 | Performance | 2/4 | No `prefers-reduced-motion` guard despite GSAP blur/slide/scale on every filter switch; blur animation runs on all newly-mounted items simultaneously, mitigated only on coarse-pointer devices |
| 3 | Theming | 4/4 | Zero raw hex codes in `ExplorationsPage.tsx`; token-based throughout (some hex/rgba one layer down in `Masonry.tsx`'s overlay styling, outside this file's scope) |
| 4 | Responsive Design | 3/4 | Legitimate breakpoint strategy via `useMedia` hook (1500/1000/600/400px → column counts); one Figma-sourced fixed dimension mitigated via `FitToFrame`'s ResizeObserver |
| 5 | Implementation Integrity | 4/4 | Coherent, product-specific — 13 real named works with real captions; detector returned zero findings |
| **Total** | | **14/20** | **Acceptable** |

## Design Health Score (Nielsen, heuristics 7/10 n/a — no power-user path or help system needed on a browse gallery)

| # | Heuristic | Score | Note |
|---|-----------|-------|------|
| 1 | Visibility of System Status | 3/4 | Active filter pill highlighted; no item count or loading indicator during the 2.5s image-preload gate |
| 2 | Match Real World | 3/4 | Plain, self-explanatory category names |
| 3 | User Control/Freedom | 2/4 | No Escape-key handling on lightbox/live panel; only backdrop-click or × button |
| 4 | Consistency/Standards | 2/4 | Mixed interaction model (external link / lightbox / live iframe) with no visual cue up front which is which |
| 5 | Error Prevention | 3/4 | Broken hotlinked images handled gracefully via timeout |
| 6 | Recognition Over Recall | 2/4 | Item title/category shown only on `:hover` — invisible until interaction |
| 8 | Aesthetic/Minimalist Design | 3/4 | Clean masonry, restrained hero copy |
| 9 | Error Recovery | 3/4 | Mostly n/a — nothing to fail beyond image load |
| **Total** | | **21/32 (66%)** | **Acceptable** |

## Design Specificity Verdict

**Authored, not boilerplate.** Personal photo captions ("Spent 20 minutes staring before I saw it"), a bespoke "Play" free-draw canvas instead of a generic empty state, two real embedded live builds (Rewind iframe, Octopus holographic card) rather than static screenshots, and a hotlink-timeout mechanism specifically engineered for this page's mix of local assets and external ArtStation URLs.

## Cognitive Load: 5/8 pass, 2 partial/weak, 1 fail

**Fails ≤4 visible choices**: 7 category pills exceed the working-memory guideline at the page's one real decision point. **Weak working memory**: since labels are hover-only, a visitor scanning quickly retains no titles, only images.

## Emotional Journey

Browsing feels visually pleasant (masonry stagger-in, blur-to-focus), and the two live embeds are a genuine delight beat most portfolios never attempt. Undercut by category imbalance (Catalogue has exactly one item, making that filter a dead end) and hover-only labels turning "what am I looking at" into a small tax on every tile. No wrap-up or CTA back to case studies at the end — the arc trails off.

## What's Working

1. Two working live prototypes embedded directly in the grid — a rare, high-craft touch most portfolios only show as static screenshots.
2. Personal, voiced captions on photography items give the gallery a human narrator instead of generic labels.
3. URL-synced filter state makes categories shareable/deep-linkable.

## Priority Issues

**[P0] No alt text anywhere in the gallery** — all 13 tiles render as CSS `background-image` divs (`Masonry.tsx:189`); screen-reader users get zero description of any artwork on a *design portfolio*. Fix: render a real `<img alt={item.title}>` (or a visually-hidden text alternative) alongside the background treatment.

**[P0] Grid tiles aren't keyboard operable** — `Masonry.tsx:181-188`, plain `<div onClick>` with no `role="button"`, `tabIndex`, or `onKeyDown`. Keyboard and switch-device users cannot open the lightbox, live panels, or external links at all.

**[P1] Titles/categories only reveal on `:hover`** (`Masonry.css:31`) — no `:focus-visible` equivalent, no touch-tap reveal. Mobile and keyboard users never see what a tile is before acting on it.

**[P1] 7-choice filter row exceeds the decision-point guideline, with no result count or empty-state feedback** — filtering "Catalogue" returns a single tile with no explanation of why the grid is thin.

**[P2] No Escape-key handling on the lightbox/live overlay** — closes only via backdrop click or × button.

## Persona Red Flags

- **Sam (accessibility)**: blocked outright — no alt text, no keyboard access to any grid item, hover-only labels. Would fail a basic screen-reader/keyboard pass entirely.
- **Casey (mobile)**: hover-gated captions mean touch users never see title/category before tapping; unclear whether a tap opens the lightbox immediately or needs a second tap.
- **Riley (stress-tester)**: rapid filter-switching relies on GSAP re-animating tiles keyed by `data-key` — plausible race between an in-flight image preload and a filter change mid-load.

## Minor Observations

- Stray space in document title: `'Explorations , Sohum Bhatnagar'`.
- Lightbox `<img>` (the one true `<img>` in this file) has `alt="Preview"` — present but generic, and has no `onError` fallback for a broken hotlinked URL.
- "Play" is listed as a category but isn't a `category` value on any item — it's a special-cased UI mode, conflating "filter" with "action" semantically.
- Filter pills use `role="menubar"`/`role="menuitem"` — arguably mismatched semantics for what functions as a tab-like filter control.

## Questions to Consider

- If the portfolio's own gallery has no alt text and no keyboard access, has accessibility ever been audited end-to-end across the site?
- A 1-item "Catalogue" pill alongside a 5-item "Photography" pill suggests the taxonomy was built around what exists rather than what a visitor would want to filter by — would three or four broader buckets serve browsing better?
- The two live embeds are the strongest thing on the page — should they be pulled out and led with, rather than sitting as two tiles among thirteen?
