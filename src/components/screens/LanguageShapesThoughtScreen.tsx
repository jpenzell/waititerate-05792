import { SlideShell, SlideTitle } from "@/components/slide";

/**
 * Language Shapes Thought — Sapir-Whorf claim slide.
 * Sets up the Russian Blues demo and the broader "language is subjective"
 * sequence after LD3.61.
 */
export const LanguageShapesThoughtScreen = () => (
  <SlideShell tone="indigo" align="center" ariaLabel="Language shapes thought">
    <div className="space-y-10 max-w-5xl mx-auto text-center">
      <SlideTitle kicker="Sapir–Whorf, in one breath">
        Language doesn't just{" "}
        <span className="text-muted-foreground">describe</span> what you think.
      </SlideTitle>

      <p className="text-4xl md:text-6xl font-black italic text-primary leading-[1.05]">
        It shapes <span className="text-accent">how</span> you think.
      </p>

      <p className="text-base md:text-lg font-mono uppercase tracking-[0.25em] text-muted-foreground/80">
        Winawer et al. (2007) · PNAS 104(19), 7780–7785
      </p>
    </div>
  </SlideShell>
);