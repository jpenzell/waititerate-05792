import { SlideHero } from "@/components/slide";
import curbCut from "@/assets/slides/curb-cut.jpg";

export const CurbCutIntroScreen = () => (
  <SlideHero
    image={curbCut}
    alt="Concrete curb cut at a city street corner in golden afternoon light"
    position="bottom"
    scrim="bottom"
    ariaLabel="The curb-cut effect introduction"
  >
    <div className="space-y-6 max-w-5xl">
      <p className="text-base md:text-xl uppercase tracking-[0.3em] text-white/70">
        The Curb-Cut Effect
      </p>
      <h1 className="text-5xl md:text-7xl font-bold leading-[1.05]">
        Built for wheelchairs.
        <br />
        Used by <span className="text-accent">everyone</span>.
      </h1>
      <p className="text-xl md:text-2xl text-white/80 italic">
        Strollers · luggage · cyclists · delivery · the elderly
      </p>
    </div>
  </SlideHero>
);
