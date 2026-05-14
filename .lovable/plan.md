# Presentation Overhaul Plan — Zoox-level treatment, deck-wide

## What I audited

I read the slide registry plus a representative sample of 14 slides covering every layout pattern in the deck (title, transition, stat-grid, two-column, quiz, reveal, list, takeaway, downloads). The deck is technically solid but visually monotonous — almost every information slide uses the same template (centered H1 + 3-or-4 `Card` grid with icon + value + label + a closing gradient quote card). The Zoox slide stands out because it's a full-bleed photograph with cinematic typography. To bring every slide closer to that energy I need to (a) build a small set of reusable "presentation primitives" so styling stops being copy-pasted, (b) introduce hero imagery on the slides where a held image actually earns the second of silence, and (c) add chapter dividers so the audience can feel the deck breathe.

## Audit findings

**Strong already:** `LDTitleScreen`, `WindshieldWipersRevealScreen` (Zoox), `AnnieDukeStudyScreen`, `AnthropicIterationScreen` (giant 2×).

**Visually thin / repetitive:**
- `CurbCutQuizScreen` — small "Test the Principle" badge, plain centered card. Looks like a form, not a question on stage.
- `RCCCContextScreen`, `FacultyAreNeurodivergentScreen`, `RetentionEquityScreen`, `AIAccommodationScreen`, `LDTakeawaysScreen`, `MondayPromptsScreen`, `FacultyTranslationScreen`, `WhatThisIsNotScreen`, `AcademicIntegrityScreen` — same icon-card-grid template, varying only icon and copy.
- `ResearchFoundationsScreen` — collapsible chevron-expand UX is web-app behaviour, not stage behaviour. Too dense; should split.
- `CognitiveTransitionScreen`, `CurbCutIntroScreen`, `OnePagerDownloadScreen` — pure-text / single-icon. Read flat next to Zoox.
- Section transitions 2.x → 3.x → 4.x → 5.x → 6.x → 7.x → 8.x have no visual reset; the room never gets a "we're starting a new chapter" moment.

**Inconsistencies:**
- Reveal API: most slides use `useRegisterReveals` + `<Reveal>`; `AnthropicIterationScreen` and `LDTitleScreen` skip it and reveal everything at once.
- Background treatment: ~6 different gradient combinations, no chapter colour identity.
- Type ramp: H1 ranges from `text-5xl md:text-7xl` to `text-6xl md:text-8xl` with no logic.

## Approach (one PR)

### Step 1 — Foundations (new files)

`src/components/slide/` primitives (every existing slide is rewritten on top of these):

| Component | Use |
|---|---|
| `SlideShell` | Standard padded full-height container. Replaces the repeated `min-h-screen flex items-center px-8 py-10 animate-fade-in` boilerplate. Accepts `chapter` prop for accent colour. |
| `SlideHero` | Full-bleed image background + gradient scrim + foreground content slot. The Zoox pattern, generalised. |
| `ChapterDivider` | Cinematic chapter marker — large chapter number, theme word, optional hero image, single accent rule. |
| `StatBlock` | Large value + label, optional icon, optional source line. Replaces ~30 hand-rolled stat cards. |
| `QuoteSlide` / `PullQuote` | The recurring closing quote card ("Design the margins. Improve the center.") becomes one component with variants. |
| `TwoColumnContrast` | The recurring "fear vs reframe", "NOT this vs THIS" pattern. |
| `IconRow` | The "glasses → mobility aid → AI" sequencer. |

`src/styles/slide-tokens.css` — adds:
- 6 chapter accent HSL tokens (`--chapter-1` … `--chapter-6`) drawn from existing palette so each section has its own quiet hue.
- Refined type ramp variables (`--display-xl`, `--display-l`, `--display-m`, `--body-xl`, `--body-l`) so every slide pulls from the same scale.
- Standard reveal-build duration / easing.

`src/components/slide/useStandardReveals.ts` — wraps `useRegisterReveals` + `<Reveal>` so slides declare reveals as `reveals(['intro','grid','closer'])` instead of counting steps by hand. Also auto-handles the "everything visible for facilitator preview / thumbnail" case.

### Step 2 — Hero imagery

Generate ~9 new full-bleed images via `imagegen--generate_image` (premium tier where text appears, fast tier otherwise). All saved to `src/assets/slides/`, registered in `preloadImages.ts` so they paint on the first frame just like Zoox.

| Slide | Image direction |
|---|---|
| LD1.0 Title | Optional subtle abstract — keep current gradient if it reads well, otherwise a generated cinematic background. |
| LD1.4 What This Is NOT | Single muted classroom photo, scrim. |
| LD2.0 Pattern Recognition | Already has the duck/rabbit; keep but tighten frame. |
| LD3.0 Photo Collection chapter beat | Hero photo of mixed learning surfaces. |
| LD4.x chapter divider | Hero brain/abstract neural texture. |
| LD5.0 Curb-Cut Intro | Real curb-cut photograph, low contrast, scrim. |
| LD5.4 Curb-Cut Results | Same image carried through, now with the stats overlaid. |
| LD6.0 AI as Cognitive Prosthetic | Hero shot — glasses on a desk, soft focus, scrim. |
| LD6.3 Academic Integrity | Calculator-on-paper shot, scrim. |
| LD7.5 UDL in Action | Three-window architectural photo (representation/engagement/expression). |
| LD8.0 Takeaways | Sunrise / horizon photo, scrim, type-led. |

### Step 3 — Six chapter divider slides

Inserted into `src/config/screens.ts` between sections, each a `ChapterDivider` instance with chapter number, theme line, image, and the section colour token:

| New ID | Before | Theme |
|---|---|---|
| LD2.0a | Before LD2.0 | "02 · Why difference matters" |
| LD3.0a | Before LD3.0 | "03 · Patterns we miss" |
| LD4.0a | Before LD4.0 | "04 · Inside the mind" |
| LD5.0a | Before LD5.0 | "05 · The curb-cut effect" |
| LD6.0a | Before LD6.0 | "06 · AI as accommodation" |
| LD7.0a | Before LD7.0 | "07 · Make something" |

Chapter dividers are non-interactive, ~3 seconds, no reveals, designed to give you a beat to set up the next section verbally.

### Step 4 — Slide-by-slide rebuild (47 screens)

Every existing screen file gets rewritten to:
1. Use `SlideShell` (or `SlideHero` / `ChapterDivider` where appropriate).
2. Pull type from the new ramp tokens — no more arbitrary `text-5xl md:text-7xl` per slide.
3. Use the shared primitives (`StatBlock`, `TwoColumnContrast`, `IconRow`, `QuoteSlide`) instead of hand-rolled `Card` grids.
4. Standardise reveal pacing via `useStandardReveals`.
5. Carry its chapter accent colour (each section has a quiet hue, not just primary everywhere).

Specific structural changes worth calling out (not just restyles):

- `CurbCutQuizScreen` — promote to `SlideHero` with the question itself as 7xl headline, options spaced like a stage poll. The PollWidget chrome shrinks; the *question* becomes the slide.
- `ResearchFoundationsScreen` — drop the chevron-expand interaction. Show the four areas as four large cards with the headline finding only. The full citations move into the Faculty One-Pager PDF (where they belong).
- `OnePagerDownloadScreen` — full-bleed close, type-led, big QR + email. Removes the two-card layout.
- `MondayPromptsScreen` — currently four prompt cards on one slide. Split into a chapter card + four reveal-paced prompt cards so each prompt gets a screenshare moment.
- `LDTitleScreen` and `AnthropicIterationScreen` — keep their identity but route through `SlideShell` for consistency.
- Zoox (`WindshieldWipersRevealScreen`) — untouched; it's the reference.

### Step 5 — Verification

After the rebuild, I'll page through every slide ID via the preview to confirm:
- No clipped content at 1015×802 (current preview viewport).
- Reveals advance/reset cleanly.
- Hero images paint without the load flash (same preload pattern as Zoox).
- Participant widgets still wire up correctly (no `slideId` regressions).
- Memory rules respected: large typography, screenshare-first, phones input-only, semantic HTML/ARIA preserved.

## Out of scope

- Participant phone widgets — untouched unless a slide-shell change forces a prop tweak.
- Backend / DB / RLS — no changes.
- The 1.x slides you've explicitly dialled in recently (`WindshieldWipersScreen` join step, `MeetJoshLieScreen`) get the primitive treatment but no structural change.

## Risk & rollback

This is a wide change touching ~50 files. Risks:
- Reveal counts could drift if I miscount steps — mitigated by `useStandardReveals` returning a typed list.
- Image preload list grows; should still be under 5 MB total. I'll keep individual hero images ≤ 400 KB after generation.
- If a slide regresses, each file is self-contained — easy to revert per-screen.

If you approve, I'll execute the entire pass in one go and walk you through the new look section by section at the end.
