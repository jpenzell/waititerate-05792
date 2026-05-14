# Add three new content slides

Three new slides to support the neurodivergent-experience narrative and the AI-as-safer-feedback-channel point.

## New slides

### 1. `FeedbackSensitivityScreen` — `LD4.3b`
Inserted after Sensory Processing (LD4.3), before Cognitive Reflection.
- Big stat hero (e.g., "Rejection Sensitive Dysphoria affects up to 99% of adults with ADHD" — final number TBD by you)
- Short definition of feedback sensitivity / RSD
- 2–3 classroom implications ("a single edit comment can derail a week", etc.)
- Chapter 4 accent color, uses `SlideShell` + `StatBlock` primitives

### 2. `InjusticeSensitivityScreen` — `LD4.3c`
Immediately after Feedback Sensitivity.
- Definition: heightened response to perceived unfairness (common in autistic + ADHD profiles)
- Contrast block: "What looks like 'overreacting'" vs "What's actually happening"
- Tie to classroom: grading disputes, group-work fairness, policy rigidity
- Same Chapter 4 styling for visual continuity

### 3. `AIvsManagerScreen` — new slide in 6.x (AI as accommodation)
Inserted after `LD6.0` (AI as Cognitive Prosthetic), id `LD6.0b`.
- Headline stat: "People would rather talk to AI than their manager"
- Source: the widely-cited Workplace Intelligence / UKG-style survey (you'll confirm exact source + %; placeholder until then)
- One-line reframe tying it back to feedback/injustice sensitivity from Ch.4 — AI is a low-stakes feedback partner
- Hero treatment with single large pull-quote

## Config changes

`src/config/screens.ts`:
- Import the three new components
- Insert `LD4.3b`, `LD4.3c` between LD4.3 and LD4.4
- Insert `LD6.0b` between LD6.0 and LD6.1
- No `INTERACTIVE_SLIDE_IDS` changes (these are presentation-only)

## Out of scope

- No participant-phone widgets
- No DB / RLS / backend
- No changes to existing slides

## Open questions for you (will use placeholders until you confirm)

1. Exact stats/percentages you want on each slide
2. Citation for the AI-vs-manager stat (Workplace Intelligence 2024? Oracle? UKG?) — I'll use a sensible default and you can swap
3. Any specific examples from your own experience to feature on the sensitivity slides
