---
target: "UUCMS Redesign case study (https://sohumsite.vercel.app/case-study)"
total_score: 23
max_score: 32
na_heuristics: 9,10
p0_count: 1
p1_count: 1
target_identity: "url:https://sohumsite.vercel.app/case-study"
timestamp: 2026-09-21T08-30-17Z
slug: sohumsite-vercel-app-case-study
---
Method: dual-agent (A: a47b9940857174a56 · B: aa054554acce466a9)

**Note**: Live-URL access to sohumsite.vercel.app is blocked by network egress in this sandbox for both assessments — findings come from source inspection of `CaseStudy.tsx` only.

## Audit Health Score (technical)

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 3/4 | Clean heading order; compare-slider has full ARIA + keyboard support; no `prefers-reduced-motion` guard or `:focus-visible` scoped to this file's custom controls |
| 2 | Performance | 3/4 | All images `loading="lazy" decoding="async"`; `IntersectionObserver`-based tracking, no scroll listeners |
| 3 | Theming | 4/4 | Zero raw hex codes; fully token-based (`var(--accent)`, `var(--ink-faint)`, etc.) |
| 4 | Responsive Design | 3/4 | Responsiveness routed through companion CSS media queries rather than inline breakpoints; mobile-nav block (lines 214-236) hardcodes pixel values instead of tokens |
| 5 | Implementation Integrity | 3/4 | Product-specific, no lorem ipsum; core "15min→60sec" metric presented as measured fact without a stated methodology that actually supports it |
| **Total** | | **16/20** | **Good** |

## Design Health Score (Nielsen, heuristics 9/10 n/a — no user input/forms on a narrative page)

| # | Heuristic | Score | Note |
|---|-----------|-------|------|
| 1 | Visibility of System Status | 3/4 | Active nav state, sidebar tracking is solid |
| 2 | Match Real World | 4/4 | Central thesis of the case study itself |
| 3 | User Control/Freedom | 3/4 | Sidebar + mobile nav both work as escape hatches |
| 4 | Consistency/Standards | 3/4 | Section pattern repeats reliably |
| 5 | Error Prevention | 2/4 | Slider affordance relies on text cue, not strong visual signal |
| 6 | Recognition Over Recall | 3/4 | Numbered sidebar keeps location recall low |
| 7 | Flexibility/Efficiency | 2/4 | Single reading path only (expected in read mode, scored not n/a since a jump-nav exists) |
| 8 | Aesthetic/Minimalist Design | 3/4 | Hero stacks 4 visual blocks before body copy starts |
| **Total** | | **23/32 (72%)** | **Good** |

## Design Specificity Verdict

**Genuinely specific.** Names the real system (UUCMS, Karnataka DHE), concrete artifacts (12-column marks table, 0 back buttons), real comparison products (Manipal Portal, Notion), and an honest scope disclosure (prototype wasn't fully interactive, 5-student walkthrough). Reads like someone who actually used the broken system.

## Cognitive Load: 6.5/8 pass

Hero stacks headline, lede, primary tags, a second meta-tag row, and a pipeline row — four visual blocks before any body copy. Everything past the hero chunks well.

## Emotional Journey

Builds credibly: problem → research → before/after (the compare slider is the peak moment) → decisions → outcome stats → a genuinely humble reflection close. Drag point: sections 07-09 restate the same 15min→60sec stat three times without new evidence between them, right before the close.

## What's Working

1. Honest methodology disclosure (prototype not fully interactive, only 5 participants) builds more trust than most case studies that inflate rigor.
2. The before/after `CompareSlider` is fully accessible (role="slider", arrow-key + Home/End support) and is the strongest interaction on the page.
3. Information architecture in the code mirrors the narrative argument — the document is structured the way the redesign itself claims UUCMS should be.

## Priority Issues

**[P0] No broken-media fallback** — all 3 `<img>` elements (lines 137, 139, 174) lack `onError`. Confirmed this page never adopted `ImageWithFallback.tsx` or the pattern used in `Hero.tsx`/`SelectedWork.tsx`.

**[P1] The core metric is asserted, not substantiated** — "15 minutes to under 60 seconds" appears 4 times (lines 283, 319, 430, 442), but the validation section (449-464) explicitly says the prototype wasn't fully interactive, so no real timed task produced the "60 sec" figure. This is the single biggest credibility risk on the page. Either retitle it "projected/estimated" or show the click-count math as the actual evidence.

**[P2] Repetition drains the ending** — sections 07/08/09 re-surface the same stat with no new supporting detail between them. Consolidate into one outcomes section.

**[P3] Hero has four stacked elements competing before content starts** (h1+lede, primary tags, secondary meta-tag row, pipeline row).

**[P3] Generic alt text on hero images** — `alt="Redesigned Dashboard"` describes identity, not content; doesn't say what actually changed.

## Persona Red Flags

- **Sam (accessibility)**: carousel dots use `role="tablist"`/`role="tab"` with no associated `tabpanel` relationship — will confuse screen-reader users about what the tabs control.
- **Jordan (first-timer)**: may not realize the compare slider is interactive without a prominent visual drag cue.
- **Casey (mobile)**: mobile nav fallback is a horizontal scroll of 11 two-digit number links with no labels visible on touch.

## Minor Observations

- Stray space in document title: `'UUCMS Redesign , Sohum Bhatnagar'`.
- The "influence" column in the competitive-analysis table (e.g. Notion sidebar claim) has no visual proof point tying it to the actual redesign.

## Questions to Consider

- If the prototype wasn't fully interactive, what specifically was timed to produce "60 seconds," and should that number appear in the hero before it's justified in the body?
- The five-student validation confirms structural comprehension, not speed — why is it supporting a time-based headline metric?
