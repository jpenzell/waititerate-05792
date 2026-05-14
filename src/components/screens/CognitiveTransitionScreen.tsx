import { SlideHero } from "@/components/slide";
import { Reveal, useRegisterReveals } from "@/contexts/RevealContext";
import neural from "@/assets/slides/neural.jpg";

export const CognitiveTransitionScreen = () => {
  useRegisterReveals(2);
  return (
    <SlideHero
      image={neural}
      alt="Glowing purple and cyan neural pathways"
      position="center"
      scrim="full"
      ariaLabel="Transition to cognition"
    >
      <div className="space-y-10 max-w-5xl">
        <h1 className="text-5xl md:text-8xl font-bold leading-[1.05]">
          AI sees the data.
        </h1>
        <Reveal step={1}>
          <p className="text-4xl md:text-6xl font-bold text-accent leading-[1.1]">
            But every mind reads it differently.
          </p>
        </Reveal>
        <Reveal step={2}>
          <p className="text-2xl md:text-3xl text-white/80 italic">
            Let's discover how.
          </p>
        </Reveal>
      </div>
    </SlideHero>
  );
};
