---
target: "Rewind case study (https://sohumsite.vercel.app/rewind-case-study)"
total_score: 28
max_score: 36
na_heuristics: 10
p0_count: 1
p1_count: 1
target_identity: "url:https://sohumsite.vercel.app/rewind-case-study"
timestamp: 2026-09-21T08-30-17Z
slug: sohumsite-vercel-app-rewind-case-study
---
Method: dual-agent (A: a7a0156aa0b40abf4 · B: adcc02f001ba3a770)

**Note**: Live-URL access to sohumsite.vercel.app is blocked by network egress in this sandbox for both assessments — findings come from source inspection of `RewindCaseStudy.tsx` (487 lines) only.

## Audit Health Score (technical)

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 3/4 | Clean heading order; live-unit power button and mobile nav have proper ARIA; iframe has no `sandbox` attribute |
| 2 | Performance | 3/4 | Live prototype iframe deferred behind a click-to-power gate (good pattern); hero video has no `poster` |
| 3 | Theming | 3/4 | Fully token-driven in styles; two hex codes appear as literal text in prose copy (accurate but could drift from the token if it ever changes) |
| 4 | Responsive Design | 2/4 | Hero video hardcodes intrinsic width/height (mitigated by external CSS); mobile nav mixes fixed-px and token-based spacing inconsistently |
| 5 | Implementation Integrity | 3/4 | Highly product-specific (real Web Audio node names); several qualitative claims ("testers stopped treating it like a novelty") have no data backing shown |
| **Total** | | **14/20** | **Acceptable** |

## Design Health Score (Nielsen, heuristic 10 n/a — no form/task requiring help text on a documentation page)

| # | Heuristic | Score | Note |
|---|-----------|-------|------|
| 1 | Visibility of System Status | 4/4 | Active-section sidebar, live "V.01-Alpha · Live" status bar |
| 2 | Match Real World | 4/4 | CD-changer/click-wheel metaphor carried consistently |
| 3 | User Control/Freedom | 3/4 | Click-to-power gate avoids surprise autoplay; no skip-to-demo shortcut |
| 4 | Consistency/Standards | 4/4 | Uniform card pattern reused across 6 sections |
| 5 | Error Prevention | 2/4 | No fallback if the cross-origin live-demo iframe fails to load |
| 6 | Recognition Over Recall | 4/4 | Persistent numbered sidebar with category headings |
| 7 | Flexibility/Efficiency | 2/4 | Anchor-jump nav helps; no other power-user path (expected for read mode) |
| 8 | Aesthetic/Minimalist Design | 3/4 | Signal-chain diagram and control-ledger table repeat the same 4 node mappings |
| 9 | Error Recovery | 2/4 | No handling for a dead/slow live-demo embed |
| **Total** | | **28/36 (78%)** | **Good** |

## Design Specificity Verdict

**Reads as specific, not boilerplate.** `signalChain`/`controlLedger` map each physical control to a literal Web Audio node (BiquadFilterNode, GainNode, StereoPannerNode, AnalyserNode). Four rejected design directions are named with distinct, plausible rejection reasons rather than a generic "we explored options" beat — a rare case study that earns its technical claims.

## Cognitive Load: 5.5/8 pass

No single clear primary action — three separate links point to the same live product (hero, "Launch REWIND" CTA, and the power-on button), plus the signal-chain diagram and control-ledger table repeat the same four node mappings within two sections of each other.

## Emotional Journey

Builds well: problem → thesis → exploration/rejection → payoff at the live, playable demo → a genuinely reflective close naming a real trade-off (saved EQ presets never built). **Status framing is handled honestly** — explicitly labeled "Makeathon submission," never implying a shipped product.

## What's Working

1. Verifiable technical specificity — the Web Audio node graph is mapped 1:1 to physical controls, consistently.
2. Honest status framing throughout — never overclaims "shipped" for a submitted hackathon build.
3. Live, click-gated embed lets a skeptical reviewer verify the audio claims directly — rare and effective in a portfolio.

## Priority Issues

**[P0] No broken-media fallback, and the live demo has no failure state** — the hero video (line 253) has no `poster`/`onError`; the instrument photo (line 327) has no `onError`; and critically, the live-demo iframe (lines 119-125) has no loading indicator or error/timeout message if `rewind-it.vercel.app` is down or slow — undermining the page's central credibility device with no warning to the visitor.

**[P1] Redundant technical explanation dilutes a strong asset** — the signal-chain diagram and control-ledger table present nearly the same four node mappings twice within two sections. Merge into one canonical table; keep the diagram purely visual.

**[P2] Mobile nav bar hardcodes light-theme colors regardless of section theme** — three sections are dark-themed, but the mobile nav's fixed paper-color background doesn't adapt when scrolled into a dark band, unlike the desktop sidebar which does swap.

**[P2] Competing CTAs dilute the single strong ask** — three separate links point to the same external app with no clear hierarchy of "this is the one thing to do."

## Persona Red Flags

- **Engineering hiring manager verifying claims**: served well — the node-level mapping is exactly the specificity this persona checks for, and it survives scrutiny.
- **Recruiter skimming in 60 seconds**: 15 sections may feel long for a fast skim; no "jump to demo" shortcut from the top.
- **Accessibility-conscious reviewer**: autoplaying looped hero video has no confirmed `prefers-reduced-motion` guard in this specific component.

## Minor Observations

- Alt text throughout is descriptive and specific — worth noting as a positive pattern to replicate on the other two case studies.
- Iframe has a `title` attribute but no `sandbox` attribute — minor hardening opportunity for an embedded third-party origin.

## Questions to Consider

- With three links pointing to the same live product, which one should a recruiter actually click, and why make them choose?
- If `rewind-it.vercel.app` goes offline, does this case study's central credibility device just go silently blank?
