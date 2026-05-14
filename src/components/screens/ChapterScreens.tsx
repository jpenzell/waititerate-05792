import { ChapterDivider } from "@/components/slide";
import patterns from "@/assets/slides/patterns.jpg";
import classroom from "@/assets/slides/classroom.jpg";
import neural from "@/assets/slides/neural.jpg";
import curbCut from "@/assets/slides/curb-cut.jpg";
import glasses from "@/assets/slides/glasses.jpg";
import workshop from "@/assets/slides/workshop.jpg";
import horizon from "@/assets/slides/horizon.jpg";

export const Chapter02Screen = () => (
  <ChapterDivider
    number="02"
    kicker="Why difference matters"
    title="Same data. Different minds."
    image={classroom}
    alt="Empty community college classroom in warm afternoon light"
  />
);

export const Chapter03Screen = () => (
  <ChapterDivider
    number="03"
    kicker="Patterns we miss"
    title="What you see depends on who's looking."
    image={patterns}
    alt="Layered cream and grey paper textures"
  />
);

export const Chapter04Screen = () => (
  <ChapterDivider
    number="04"
    kicker="Inside the mind"
    title="No two brains read this slide the same way."
    image={neural}
    alt="Glowing purple and cyan neural pathways"
  />
);

export const Chapter05Screen = () => (
  <ChapterDivider
    number="05"
    kicker="The curb-cut effect"
    title="Built for the margins. Used by everyone."
    image={curbCut}
    alt="Concrete curb cut at a city street corner in golden afternoon light"
  />
);

export const Chapter06Screen = () => (
  <ChapterDivider
    number="06"
    kicker="AI as accommodation"
    title="The cognitive prosthetic."
    image={glasses}
    alt="Round glasses resting on an open notebook by a window"
  />
);

export const Chapter07Screen = () => (
  <ChapterDivider
    number="07"
    kicker="Make something"
    title="Now we redesign one thing."
    image={workshop}
    alt="Workshop bench with trace paper, pencil, ruler and coffee in warm light"
  />
);

/* ─── New chapter dividers for the rebuilt 7-act outline ─── */

export const HiddenVanguardChapterScreen = () => (
  <ChapterDivider
    number="02"
    kicker="The hidden vanguard"
    title="The minds the future needs are already in the room."
    image={classroom}
    alt="Empty community college classroom in warm afternoon light"
  />
);

export const FeelItChapterScreen = () => (
  <ChapterDivider
    number="03"
    kicker="Feel it"
    title="No two brains read this slide the same way."
    image={neural}
    alt="Glowing purple and cyan neural pathways"
  />
);

export const AccommodationChapterScreen = () => (
  <ChapterDivider
    number="04"
    kicker="The accommodation that already happened"
    title="They didn't wait for permission. Neither did the tools."
    image={glasses}
    alt="Round glasses resting on an open notebook by a window"
  />
);

export const DesignForVanguardChapterScreen = () => (
  <ChapterDivider
    number="05"
    kicker="Design for the vanguard"
    title="Build for the edges. Win for everyone."
    image={curbCut}
    alt="Concrete curb cut at a city street corner in golden afternoon light"
  />
);

export const MakeSomethingChapterScreen = () => (
  <ChapterDivider
    number="06"
    kicker="Make something"
    title="Stop talking about it. Build it."
    image={workshop}
    alt="Workshop bench with trace paper, pencil, ruler and coffee in warm light"
  />
);

export const CloseChapterScreen = () => (
  <ChapterDivider
    number="07"
    kicker="The callback"
    title="So — what's the windshield wiper in your syllabus?"
    image={horizon}
    alt="Open horizon at dusk"
  />
);