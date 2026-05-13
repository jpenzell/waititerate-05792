## Goal

The deck is screenshared on Zoom/Teams. Participants never read slides on their devices — their phone/laptop is purely an input remote that wakes up only when the current slide needs them. Everything else should be calm and dark so they look at the shared screen.

## What changes

### 1. New participant experience: `StandbyView`

Replace the current `Participate.tsx` rendering of `<PresentationLayout> + <SlideRenderer>` with a dedicated, single-purpose view that watches `currentSlideId` from realtime and switches between two states:

- **Interactive slide** (id is in `INTERACTIVE_SLIDE_IDS`): render only the interaction widget for that slide — poll, photo upload, numeric estimate, prompt input, parking-lot input, etc. No slide narrative, no headings beyond "Your turn", no decorative imagery.
- **Non-interactive slide** (everything else): render a calm standby screen — dark background, a small pulsing dot, the line "Eyes on the shared screen", their display name, the session code, and a "Leave session" link. No content from the slide.

Strip from the participant view: `ParticleBackground`, `AccessibilityControls`, `ProgressIndicator`, the per-slide `<PresentationLayout>` chrome, the `Reveal` build system, and the join overlay (they're already in).

### 2. Interaction registry

Create a small map `participantWidgets: Record<SlideId, ReactNode>` so the standby view knows exactly which widget to mount per interactive slide. Sources already exist inside each slide component; extract just the participant-facing portion (the `!isFacilitator` branch) into a shared `widgets/` folder so the standby view can import without pulling slide layout/narrative.

Slides covered (from `INTERACTIVE_SLIDE_IDS`): LD1.1, LD1.5, LD2.0, LD2.1, LD3.0–LD3.6, LD4.0–LD4.4, LD4.6, LD5.1–LD5.3, LD6.1, LD7.0, LD7.3, LD8.2.

### 3. Presenter-side polish for Zoom/Teams screenshare

- Audit every slide's interactive cue: when a slide expects audience input, the shared screen must clearly say "Respond on your phone" with the join code/QR, so screenshare viewers know to pick up their device. The persistent join overlay handles latecomers; add a slide-level "Your turn" banner only on interactive slides.
- Confirm no slide instructs participants to read content on their phone (e.g. "scroll down on your device"). Rewrite any such copy.
- Verify Clean View (M) and Blank (B/W) work on every slide.
- Remove participant-only affordances that were leaking into the shared view (e.g. "tap here" hints visible to facilitator).

### 4. Mobile chrome cleanup

On the participant device, kill all desktop-only UI (particles, progress bar, accessibility panel are already gated by `isMobile`, but the standby view should not depend on those gates — it just doesn't render them at all). Sign-out becomes a small icon in a corner.

## Technical notes

- Keep `useRealtimeSession` as the single source of truth for `currentSlideId`.
- New file: `src/components/participant/StandbyView.tsx` — owns layout, standby state, and slide-id → widget switch.
- New folder: `src/components/participant/widgets/` — one tiny component per interactive slide, each accepting `{ sessionId, userId, sessionCode }`. Reuse existing widgets (`PollWidget`, photo upload, `NumericEstimateScreen`'s input subtree, etc.) where they already isolate the participant UI.
- `Participate.tsx` shrinks to: auth + auto-join + render `<StandbyView />`. No `PresentationLayout`, no `SlideRenderer` for participants.
- Slides themselves are unchanged for facilitator rendering. We only stop using their participant branch from `Participate.tsx`.
- For slides that previously rendered a participant fallback inline (e.g. "📱 Vote on your device"), keep them — they're shown on the shared screen as an audience cue.

## Out of scope

- No changes to slide content/copy beyond removing any "look at your phone for the next slide" style instructions.
- No new interactive slide types.
- No captioning/audio work (Zoom/Teams handles it).

## Open question

Do you want the standby screen to show the **current slide title** as a tiny label (so a participant glancing at their phone knows where the group is), or stay completely blank-message ("Eyes on the shared screen") with no slide context at all?
