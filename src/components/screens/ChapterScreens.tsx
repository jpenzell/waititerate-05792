import { ChapterDivider } from "@/components/slide";
import patterns from "@/assets/slides/patterns.jpg";
import classroom from "@/assets/slides/classroom.jpg";
import neural from "@/assets/slides/neural.jpg";
import curbCut from "@/assets/slides/curb-cut.jpg";
import glasses from "@/assets/slides/glasses.jpg";
import workshop from "@/assets/slides/workshop.jpg";

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