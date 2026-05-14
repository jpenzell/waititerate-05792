
# Slide-by-Slide Audit — Technical + Research

Both research PDFs are now saved permanently at `public/research/` (parsed and indexed in memory at `mem://research/keynote-pdfs`). The audit below cross-references every slide against those two sources plus the corrected reveal infrastructure we shipped in the last turn.

## Status legend
- 🔴 **Broken** — fake/placeholder data, stat not in research PDFs, or build doesn't fire
- 🟡 **Thin** — works, but is missing a research-backed factoid that's in the PDFs and would strengthen it
- ✅ **Solid** — content is well-supported and renders cleanly

## Chapter 01 — Opening

| Slide | Status | Issue / Gap | Recommended fix |
|---|---|---|---|
| LD1.0 Title | ✅ | — | — |
| LD1.1 Windshield poll | ✅ | — | Confirm Zoox visual on LD1.1b is high-res. |
| LD1.1b Zoox reveal | ✅ | — | — |
| LD1.2 / LD1.2b reframe | ✅ | — | — |
| **LD1.2c Meet Josh — Lie** | 🔴 | `JOSH_STATEMENTS` still has "Placeholder truth #2" and "Placeholder lie — replace me." | Replace with three real Josh statements. Needs your input — I'll add a question. |
| LD1.3 RCCC context | 🟡 | Stats are reasonable but uncited in the slide; `~45% first-gen`, `1 in 3 dev-ed`, `20%+ ND` aren't from the two PDFs (likely from RCCC IR data). | Add a small attribution line ("RCCC IR + Doyle 2020"). If RCCC IR numbers are guesses, replace with NCES community-college figures. |
| **LD1.3b Disclosure gap** | 🟡 | Solid. Missing one extra hook from PDF: **YouGov 2024 — 19% of Americans self-identify as ND; 47% know someone who does.** | Add as a fourth StatBlock or sidebar; reinforces "this room" framing. |
| LD1.4 What this is NOT | ✅ | — | — |

## Chapter 02 — Why difference matters

| Slide | Status | Issue / Gap | Recommended fix |
|---|---|---|---|
| LD2.0 Pattern recognition (duck/rabbit) | 🟡 | Reveal copy is generic ("autistic = bottom-up, NT = top-down"). No citation. | Add citation (Mottron weak central coherence / enhanced perceptual functioning) or soften to "research suggests…". |
| **LD2.1 Neurodiversity quiz** | 🔴 | Hardcoded `actualUnemployment = 85`, `actualProductivity = 30%`, `actualPopulation = 20%`. **Only the 20% figure is in our PDFs (Doyle 15–20%).** The 85% autism-grad unemployment and JPMorgan 30% productivity stats are NOT in the supplied research. | Either (a) replace with stats that ARE in the research — e.g., **UC Davis 58% vs 79% grad rate**, **Atcheson 25/62**, **Zhao 91% free-tier** — or (b) source the 85%/30% claims and add inline citations. As-is, this violates your "no fake data" rule. |
| LD2.2 Probability words | ✅ | Now works (reveal bug fixed). | — |

## Chapter 03 — Photo exercise (LD3.0–3.6)

All 7 screens render and are wired to Supabase + AI analysis edge functions. No content gaps from the research — this is an exercise framework, not a fact-delivery section. ✅

## Chapter 04 — Inside the mind

| Slide | Status | Issue / Gap | Recommended fix |
|---|---|---|---|
| **LD4.0 Mental imagery** | 🔴 | Facilitator view has **no reveals at all** (uses local `useState`, doesn't call `useRegisterReveals`). The "we can't see inside each other's minds" line just sits there. | Add reveals: distribution → **Hollis Robbins/Aphantasia Network "~4% of population"** stat → Josh's personal aphantasia hook ("for 39 years I couldn't see a red apple…"). |
| **LD4.1 Inner voice** | 🔴 | Same — no `useRegisterReveals`, no facilitator builds. | Add reveal: distribution → "research estimates 30–50% of people don't experience consistent inner monologue (Hurlburt et al.)". This is NOT in our PDFs but is well-established; needs a citation choice. |
| **LD4.2 Time perception** | 🔴 | "Up to 80% of ADHD = time blindness" is hardcoded and **NOT in either PDF**. Also no reveals. | Replace 80% claim with a sourced stat OR remove the number and keep the qualitative framing. The PDF supports "ADHD users report planning ≠ enacting" (Atcheson) — use that quote instead. |
| **LD4.3 Sensory processing** | 🔴 | "About 1 in 6 people" is uncited and **NOT in either PDF**. No reveals. | Source it or replace with the autism-specific figure from condition-impacts table (research brief lists sensory misclassification by AI emotion-recognition systems as a documented harm). |
| LD4.3b Feedback sensitivity | 🟡 | "~99% of adults with ADHD" — **NOT in either PDF**. The screen's own notes acknowledge "stats are placeholders". | Either source Dodson 2017 (the usual citation for the 99% RSD claim) or replace with a softer "near-universal among adults with ADHD per clinical reports". |
| LD4.3c Injustice sensitivity | ✅ | Qualitative, no false stats. | Optional: add Williams "I'm just Autistic" quote from the research brief. |
| LD4.3d Humanize my words | ✅ | Excellent — Ma et al. 2026 directly cited. | — |
| **LD4.4 Cognitive reflection** | 🟡 | Footer cites "CAST (2018) — UDL 2.2". Research PDF says **CAST released UDL Guidelines v3.0 in 2024 with explicit AI integration**. | Update citation to UDL v3.0 (2024). |
| LD4.5 Research foundations | 🟡 | Generic. Could name the actual bodies of work. | Replace the four generic categories with: **Doyle (2020)**, **CAST UDL v3.0 (2024)**, **Sweller (cognitive load)**, **Atcheson CHI 2025**. |
| LD4.6 Discovery wall | ✅ | — | — |
| LD4.7 Faculty translation | ✅ | — | — |
| LD4.8 Faculty are ND | 🟡 | Stats `5–10% ADHD / 10–15% dyslexia / 2–4% autism` need a citation. PDF gives **Doyle 15–20% combined** and **Duke DUCkI 10.2% self-identified**. | Replace with cited population figures from the PDF. |
| LD4.9 Peer talk | ✅ | — | — |

## Chapter 05 — Curb-cut effect

| Slide | Status | Issue / Gap | Recommended fix |
|---|---|---|---|
| LD5.0–5.5 | 🟡 | The 71% / 30% / 80%+ stats on LD5.4/LD5.5 don't have citations and aren't in our research PDFs. | Source or replace. (These are legitimate published stats — Verizon Media 2019 for the 71% caption figure, etc. — just need citations on-screen.) |

## Chapter 06 — AI as accommodation

| Slide | Status | Issue / Gap | Recommended fix |
|---|---|---|---|
| LD6.0 AI cognitive prosthetic | ✅ | — | — |
| LD6.0b AI vs manager | 🟡 | The slide title cites "Workplace Intelligence × Oracle 2024" but the slide body now uses Atcheson P31 quote (better — that's in our PDFs). | Update notes to drop the Oracle reference and just say "Atcheson CHI 2025". |
| LD6.0c Shadow accommodation | ✅ | Atcheson stats are exact. | — |
| **LD6.1 Structured freedom** | 🟡 | Long, dense, and content is largely Josh-authored framework — no false stats but no research backing either. | Optional: add a one-line tie to **Atcheson "explainability, expressibility, plannability"** (the three affordances from the 2026 follow-on study). |
| LD6.2 Doctor + AI paradox | ✅ | JAMA 2024 cited. | — |
| LD6.3 Academic integrity | ✅ | — | — |
| LD6.3b Detector bias | ✅ | Liang + Bloomberg cited. **Add Williams "I'm just Autistic" quote** for emotional punch. |
| LD6.4 AI accommodation archetypes | ✅ | — | — |
| LD6.5 AI evidence map | ✅ | Solid. | — |

## Chapter 07 — Workshop

| Slide | Status | Issue / Gap | Recommended fix |
|---|---|---|---|
| LD7.0 Redesign workshop | ✅ | — | — |
| LD7.1 Peer talk | ✅ | — | — |
| LD7.2 Retention equity | 🟡 | "+30% completion / +18% dev-ed retention" — **NOT in either PDF**. PLOS One 2025 IS in PDF (9.47% vs 28.40% accommodation provision two-year vs four-year — directly relevant to RCCC). | Replace fabricated +30/+18 with **PLOS One 2025 9.47% / 28.40% gap** and **UC Davis 58% vs 79% grad rate**. |
| LD7.2b Free-tier divide | 🟡 | "$240/yr vs institutional license" — order of magnitude is right but uncited. Zhao 91% / 77% are exact. | Drop the dollar figure or label it "ChatGPT Plus pricing as of 2026". |
| **LD7.3 AI Student** | 🔴 | Uses `Math.random()` to fake AI responses and quiz results. **This is fake data masquerading as interaction.** | Either wire to a real Lovable AI Gateway call (`google/gemini-2.5-flash`) or rebrand as a "scripted demo". |
| LD7.4 Cognitive load (7±2) | ✅ | Sweller cited. | — |
| LD7.5 UDL in action | ✅ | — | — |
| LD7.6 Anthropic iteration | 🟡 | "9,830 conversations · Anthropic Feb 2026" — verify source. | Confirm Anthropic AI Fluency Index 2026 figure. |
| LD7.9 Inclusive support stack | ✅ | — | — |

## Chapter 08 — Close

| Slide | Status | Issue / Gap | Recommended fix |
|---|---|---|---|
| LD8.0 Action plan | ✅ | — | — |
| LD8.1 Monday prompts | ✅ | RCCC-tuned. | — |
| LD8.3 One-pager download | ✅ | — | Consider adding a second link to the new `public/research/` PDFs. |

---

## New slides worth building from research not yet on deck

1. **YouGov 19%** sidebar on LD1.3b — already covered above.
2. **Williams "I'm just Autistic"** — could be its own short slide between LD6.3 and LD6.3b, or an addition to LD6.3b.
3. **HEPI Policy Note 61** — *92% of UK undergrads use AI; 88% for assessments; 18% pasted AI text directly; "little evidence of cheating".* Could become "The students are already here" — a powerful slide between LD6.0 and LD6.0b.
4. **Special Olympics 64%/77%/35% gap** + Nathan Cook "**nothing about us, without us**" — could close the deck before LD8.0 as a co-design call to action.
5. **Aphantasia opening hook** — the PDF literally drafts Josh's opening: *"For 39 years I couldn't see a red apple when I closed my eyes. Then ChatGPT could draw it…"* Could become a slide under LD4.0 as Josh's personal frame.

---

## Priority fix list

**P0 (blocks delivery — fake data / placeholder text)**
1. LD1.2c — replace `Placeholder truth #2` and `Placeholder lie` with real statements.
2. LD2.1 — replace 85% / 30% stats with research-backed numbers.
3. LD7.3 — remove `Math.random()`, wire to real AI or relabel.
4. LD4.0 / LD4.1 / LD4.2 / LD4.3 — add reveals + replace uncited stats (80%, 1-in-6, 99%).

**P1 (citations missing on real claims)**
5. LD4.3b feedback sensitivity 99% — source Dodson or remove.
6. LD4.4 footer — update CAST citation to UDL v3.0 (2024).
7. LD4.8 faculty stats — replace with cited Doyle/Duke figures.
8. LD7.2 retention stats — swap fabricated +30/+18 for PLOS One 2025 gap + UC Davis grad rate.

**P2 (research enrichment — net new factoids)**
9. Add YouGov 19% to LD1.3b.
10. Add Williams quote to LD6.3b (or new slide).
11. Build HEPI 92%/88% slide.
12. Build Special Olympics co-design slide.
13. Add aphantasia opening hook slide under Ch.4.

---

## How I'll proceed

If you approve this plan I'll batch-execute in priority order — P0 first (so nothing fake ships), then P1 citations, then P2 enrichment. I'll need one piece of info from you for LD1.2c: the two real statements + one real lie about Josh. I'll ask via questions tool when we hit that step.
