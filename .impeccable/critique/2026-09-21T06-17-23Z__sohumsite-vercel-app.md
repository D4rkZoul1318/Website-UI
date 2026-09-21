---
target: "homepage (https://sohumsite.vercel.app)"
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
target_identity: "url:https://sohumsite.vercel.app/"
timestamp: 2026-09-21T06-17-23Z
slug: sohumsite-vercel-app
---
Method: dual-agent (A: a3a8d9f6857b63a92 · B: a063a7d706845982b)

**Note on scope**: Both assessments independently discovered that the homepage has been substantially rebuilt since this session last touched it — the dark "#0C0C0C / HeroCollage / AboutSection" version no longer exists. The live homepage (confirmed against `src/app/components/home/{Home,Hero,Nav,Marquee,SelectedWork,Manifesto,Footer}.tsx`, routed from `App.tsx`) is now a cream-paper "Viewfinder" camera-metaphor design: `--paper` background, `--ink: #1a1a1a` text, `--terracotta: #d91e18` accent, Bricolage Grotesque + JetBrains Mono. This report evaluates what actually ships. Live-URL browser/WebFetch access to sohumsite.vercel.app was blocked by network egress in this environment (`EGRESS_BLOCKED`) for both assessments and for a direct retry — all findings below come from source inspection, not a live render. Flagging this substitution explicitly rather than presenting it as verified live evidence.

## Audit Health Score (technical)

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 3/4 | `prefers-reduced-motion` guards exist (`camera-theme.css:405,475,499`); alt text present everywhere checked; heading hierarchy skips h2 — `Manifesto.tsx:51`, `SelectedWork.tsx:97` jump h1→h3 |
| 2 | Performance | 4/4 | No rAF/canvas loops or unbounded listeners in Hero; images use `loading="lazy"` + `decoding="async"` (`Hero.tsx:15`) |
| 3 | Theming | 4/4 | Zero raw hex codes in `home/*.tsx`; central tokens in `theme.css` feeding Tailwind `@theme inline` |
| 4 | Responsive Design | 3/4 | No hard-coded pixel widths in home components, but zero `md:`/`lg:` Tailwind breakpoint classes — responsiveness lives entirely in separate CSS media queries, unverifiable from component files alone |
| 5 | Implementation Integrity | 4/4 | Inline `style={{}}` usage is low and localized (`Hero.tsx`: 4, `PillNav.tsx`: 9, others 0-1); `Home.tsx`/`LineMask.tsx` have zero |
| **Total** | | **18/20** | **Excellent** |

## Implementation Integrity Verdict

**Pass — coherent and specific.** The detector (`impeccable detect --json`) returned zero findings against the real homepage files. More importantly, the "viewfinder" photography metaphor (F/2.8 · 1/250 · ISO 200 exposure readout, frame numbers, "Shutter open" scroll cue, focal-length/aspect-ratio metadata on work cards) is executed consistently across nav, hero, work grid, and footer — this is not a template with product names swapped in.

## Executive Summary

- Audit Health Score: **18/20 (Excellent)** — the codebase itself is clean, tokenized, and lint-clean.
- Design Health Score: **23/32 (72% — Good)**, two heuristics scored n/a (see below).
- Total issues found: 1 P0, 2 P1, 2 P2.
- Top issues: no broken-image/video fallback, nav has 6 competing top-level targets, hero is copy-heavy before any project is visible.
- The code quality ceiling is high; the remaining gaps are UX-judgment issues (information architecture, failure states), not implementation sloppiness.

## Design Health Score (Nielsen's heuristics, /32 — H7 Flexibility and H10 Help scored n/a on this Persuade/Experience-mode surface)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3/4 | Scroll-progress bar + live IST clock (`Nav.tsx`) are strong; no loading state for the two autoplay videos in `SelectedWork` |
| 2 | Match System / Real World | 4/4 | Photography vocabulary used correctly and consistently throughout |
| 3 | User Control and Freedom | 3/4 | Hash-anchor nav with sessionStorage handoff works well; no visible "back to top" |
| 4 | Consistency and Standards | 3/4 | `vf-*` class system is coherent; external-link `↗` glyph convention applied inconsistently between Nav and Footer |
| 5 | Error Prevention | 2/4 | `ContactForm` validation not verifiable from `Footer.tsx` alone |
| 6 | Recognition Rather Than Recall | 3/4 | Frame numbers (00-03) aid orientation across sections |
| 7 | Flexibility and Efficiency | n/a | First-visit portfolio; no repeat-user power path expected |
| 8 | Aesthetic and Minimalist Design | 3/4 | Dense metadata (focal length, ISO, aperture, ticks) risks decorative clutter over substance |
| 9 | Error Recovery | 2/4 | No fallback if hero/work images or videos fail to load — raw broken-image glyph |
| 10 | Help and Documentation | n/a | Not applicable to a marketing/portfolio page |
| **Total** | | **23/32** | **Good (72%)** |

## Design Specificity Verdict

**Strong.** The extended camera metaphor is a real, sustained choice tied to Sohum's stated identity as a photographer — not a generic portfolio template. It would require rewriting most of the copy to reuse elsewhere. One gap: the "Currently" status line and live-clock touches (`Footer.tsx`, `Nav.tsx`) are the most concrete trust signals for a hiring manager, but they compete with dense technical metadata (F/2.8, ISO 200, aspect ratios on every work card) that a non-photographer recruiter may not parse as intentional rather than noisy.

## Cognitive Load

Checklist: 5/8 pass.
- **Fail — one-thing-at-a-time**: `Hero.tsx` stacks a meta row, headline, tagline, three full bio paragraphs, dual CTAs, and a 4-photo grid before the fold ends.
- **Fail — ≤4 visible choices**: `Nav.tsx` `LINKS` has 5 entries (Work, Explorations, About, Contact, Resume) plus an "Available" pill = 6 competing top-level targets.
- Pass: single focus (one hero CTA to Work), chunking (numbered sections), grouping (Footer's Currently/Directory/Elsewhere columns), hierarchy, working memory (persistent frame numbers).

## Emotional Journey

Hero (metaphor-setup) → Marquee → SelectedWork (proof) → Manifesto (philosophy) → Footer (ask) is a real, intentional arc — not bolted-together sections. Weakness for peak-end: **Manifesto currently follows SelectedWork**, so the reader sees proof before the framing that explains it. Reordering to Hero → Manifesto → SelectedWork → Footer would let the metaphor earn the work instead of retroactively justifying it. The footer's closing line ("Let's make something worth keeping") is a strong end-peak as-is.

## What's Working

1. **Sustained, specific metaphor** — photography vocabulary executed in copy, iconography, and micro-copy simultaneously across every section; rare in portfolio sites and hard to fake.
2. **Clean, tokenized implementation** — zero raw hex codes in home components, zero detector findings, `prefers-reduced-motion` guards already in place. This is a strong technical foundation to build the fixes below on top of.
3. **`SelectedWork` copy is outcome-oriented**, not generic buzzwords ("down to two clicks" rather than "streamlined the UX").

## Priority Issues

**[P0] No broken-image/video fallback**
- **Where**: `Hero.tsx` `HeroPhotos` (4 `<img>` tags, no `onError`), `SelectedWork.tsx` autoplay `<video>` tags (no `poster` attribute).
- **Why it matters**: A single missing asset (`/images/about-photos/*.webp`) renders a raw broken-image glyph in the hero — the first thing a visitor sees, directly undercutting "designer by training" credibility. Autoplay project videos with no poster show a blank frame during the highest-intent moment: evaluating the actual work.
- **Fix**: Add an `onError` handler on hero images that swaps to a solid placeholder; add `poster` stills to the autoplay videos.
- **Suggested command**: `/impeccable harden`

**[P1] Nav has 6 competing top-level targets**
- **Where**: `Nav.tsx:12-24`, `LINKS` array (Work, Explorations, About, Contact, Resume) + the "Available" status pill.
- **Why it matters**: Exceeds the ≤4 working-memory guideline for a first-visit decision point; Resume and the Available pill are secondary information competing with primary navigation.
- **Fix**: Move Resume to the footer or fold it under a secondary affordance; keep the top nav to Work / Explorations / About / Contact.
- **Suggested command**: `/impeccable layout`

**[P1] Hero is copy-heavy before any project appears**
- **Where**: `Hero.tsx:52-71`, three full `vf-hero-side-copy` paragraphs above the fold.
- **Why it matters**: A hiring reviewer's first instinct is "show me the work" — three paragraphs of bio delay that proof point. Cognitive-load checklist fails "one-thing-at-a-time" here.
- **Fix**: Trim to one short paragraph in the hero; move the rest to `/about`, which already exists as a separate route.
- **Suggested command**: `/impeccable distill`

**[P2] No loading/poster state on autoplay project videos**
- **Where**: `SelectedWork.tsx`, `<video autoPlay loop muted playsInline>` with no `poster`.
- **Why it matters**: On a slow connection the highest-intent moment (evaluating actual work) shows a blank/black frame.
- **Fix**: Add `poster` pointing to a representative still frame per video.
- **Suggested command**: `/impeccable harden`

**[P2] Manifesto placement weakens the peak-end arc**
- **Where**: `Home.tsx:15-21` section order — `Manifesto` currently follows `SelectedWork`.
- **Why it matters**: Philosophy explaining the metaphor lands after the proof it's meant to frame, so it reads as justification rather than setup.
- **Fix**: Reorder to Hero → Manifesto → SelectedWork → Footer.
- **Suggested command**: `/impeccable layout`

## Persona Red Flags

**Sam (Accessibility-dependent)**: `Nav.tsx`'s `useISTClock` re-renders every second and the scroll-progress fill updates on every scroll tick; `.vf-blink` (used on the "Available" dot) suggests a continuous CSS blink. `prefers-reduced-motion` guards exist elsewhere in the CSS (`camera-theme.css:405,475,499`) but weren't confirmed to cover these two specifically — worth a direct check, since a vestibular-sensitive user gets constant motion with no visible opt-out if they don't.

**Riley (Stress-tester)**: The missing broken-image/video fallback (P0 above) is exactly the kind of edge case this persona finds first — throttle the network or block one image request and hero credibility breaks immediately.

**Jordan (First-timer)**: The photography vocabulary (F/2.8, ISO 200, focal length on every work card) assumes the reader parses camera settings as texture rather than needing them decoded — a first-time visitor unfamiliar with photography may read this as noise rather than voice. Not a hard failure, but worth validating with an actual non-photographer reviewer.

## Minor Observations

- External-link `↗` glyph is applied inconsistently: suffix in `Nav.tsx` ("Resume ↗") vs. prefix convention implied in Footer's "Elsewhere" links — pick one position and apply everywhere.
- `ContactForm` in `Footer.tsx` isn't visually distinguished from the CTA content around it with its own heading/label.
- Heading hierarchy skips h2 (`Manifesto.tsx:51`, `SelectedWork.tsx:97` go straight from the page's single h1 to h3) — cosmetically invisible but a real semantic-structure gap for screen-reader users navigating by heading level.

## Questions to Consider

- The camera metaphor is confident and specific — is the technical vocabulary (F/2.8, ISO 200) doing product-designer credibility work, or asking recruiters to learn a second vocabulary before they find the work?
- If Manifesto moved before SelectedWork, would the philosophy feel like setup or like a barrier between the visitor and the proof they came for?
- Is Resume meant to be a primary nav-level action, or would it read as more confident tucked into the footer alongside the other "Elsewhere" links?
