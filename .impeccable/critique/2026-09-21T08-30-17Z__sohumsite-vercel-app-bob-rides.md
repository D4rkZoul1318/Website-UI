---
target: "Bob Rides case study (https://sohumsite.vercel.app/bob-rides)"
total_score: 18
max_score: 24
na_heuristics: 5,7,9,10
p0_count: 1
p1_count: 2
target_identity: "url:https://sohumsite.vercel.app/bob-rides"
timestamp: 2026-09-21T08-30-17Z
slug: sohumsite-vercel-app-bob-rides
---
Method: dual-agent (A: af1018400d95fff96 · B: a90e731c864db70c4)

**Note**: Live-URL access to sohumsite.vercel.app is blocked by network egress in this sandbox for both assessments — findings come from source inspection of `BobRides.tsx` (487 lines) only.

## Audit Health Score (technical)

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 3/4 | Clean heading order, descriptive alt text throughout; hero video has no `<track>`/captions |
| 2 | Performance | 2/4 | Hero `<video autoPlay loop muted playsInline>` (line 315) has **no `poster`** — blank frame until load |
| 3 | Theming | 3/4 | Zero raw hex codes; three `rgba()` literals shared verbatim with other case-study files instead of a token |
| 4 | Responsive Design | 2/4 | Several hard-coded pixel widths (416/816, 480, 640, 880, 1800); small mobile-nav tap targets (13px 6px padding, 10px font) |
| 5 | Implementation Integrity | 3/4 | Product-specific throughout, no lorem ipsum, metrics consistently hedged ("~40K," "20-30") |
| **Total** | | **13/20** | **Acceptable** |

## Design Health Score (Nielsen, heuristics 5/7/9/10 n/a in read mode)

| # | Heuristic | Score | Note |
|---|-----------|-------|------|
| 1 | Visibility of System Status | 3/4 | Scroll-spy nav is good; no read-progress indicator |
| 2 | Match Real World | 4/4 | Accurate, industry-native domain language |
| 3 | User Control/Freedom | 3/4 | Section jump-nav works; no back-to-top or skip-to-outcome |
| 4 | Consistency/Standards | 4/4 | Disciplined component reuse across 23 sections |
| 6 | Recognition Over Recall | 2/4 | Nav numbering skips 03 — breaks recall trust |
| 8 | Aesthetic/Minimalist Design | 2/4 | 23 sections for one feature; several restate the same 3 points |
| **Total** | | **18/24 (75%)** | **Good** |

## Design Specificity Verdict

**Specific and credible.** Named competitors, a real pipeline (Figma→Maya→Photoshop→AI), a disclosed-composite persona, and an honest "Three Decisions" section admitting real tradeoffs. Well above median case-study boilerplate.

## Cognitive Load: 6/8 pass

**Fails one-thing-at-a-time**: Objectives, Business Challenges, User Needs, and Unique Features (4 of 23 sections) largely restate "fragmented apps / generic icons / no dark mode" in different wording before any visual payoff — first screenshot doesn't appear until well past the halfway point.

## Emotional Journey

Strong open and close (validation stats land well), but the middle sags across ~10 sections restating the same three problems before the actual icon-system payoff arrives very late.

## What's Working

1. Honest, specific tradeoff reporting ("Three Decisions") — rare and credibility-building.
2. Disciplined component reuse (`Reveal`, `feature-cell`, `spec-plate`) keeps 23 sections visually consistent.
3. Numbers used as evidence (24px constraint, 40K beta users), not decoration.

## Priority Issues

**[P0] No broken-media fallback anywhere on this page** — every `<img>`/`<video>` (9 elements: hero video line 314, Product Users 473, Eisenhower Matrix 607, sketches 638, three icon renders 650-652, major-screens ×3 at 697, thank-you 740) lacks `onError` and the hero video lacks `poster`. This is the same gap already fixed on the homepage (`Hero.tsx`, `SelectedWork.tsx`, `ImageWithFallback.tsx`) — the fix was never carried to this page.

**[P1] Redundant problem restatement dilutes momentum** — 4 of 23 sections (Objectives, Business Challenges, User Needs, Unique Features) repeat the same three-problem framing. Merge Business Challenges into the Problem section and cut Unique Features to only what's genuinely new.

**[P1] First visual proof arrives too late** — no product screenshot until line 472, no icon imagery until line 650. Pull a hero glimpse of the final icon set higher, into "At a Glance."

**[P2] Broken numbering sequence** — sidebar nav jumps 02→04 (no 03), visible to every visitor and reads as a leftover from section deletion, undermining recognition-over-recall.

**[P2] Mechanical alt text on high-value images** — `alt="Product Users"`, `alt="Eisenhower Matrix"`, `alt="Thank You"` describe the filename, not the content, unlike the better `alt="BOB Rides 3D cab icon"` elsewhere in the same file.

## Persona Red Flags

- **Sam (accessibility)**: generic alt text on research/outcome images; autoplaying hero video with no visible pause control and no confirmed `prefers-reduced-motion` guard in this file specifically.
- **Riley (stress-tester)**: the 02→04 numbering gap is exactly the kind of inconsistency this persona flags as sloppiness undermining an otherwise careful narrative.
- **Casey (mobile)**: tiny 10px mono-numeral mobile nav with low-contrast labels; dense 4-column task-mapping table relies only on horizontal scroll.

## Minor Observations

- Stray space in document title: `'BOB Rides , Sohum Bhatnagar'`.
- Meta-tag pills ("Individual: design & research," "No formal supervisor") visually read as content tags, not metadata — consider a distinct treatment.

## Questions to Consider

- If the four redundant sections were cut to their non-repeated content, would readers lose anything besides length?
- Is 23 sections the right unit for one icon system + one UI redesign, or is the taxonomy over-fitted to a template?
