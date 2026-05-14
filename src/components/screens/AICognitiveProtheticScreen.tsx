import { SlideHero } from "@/components/slide";
import { Reveal, useRegisterReveals } from "@/contexts/RevealContext";
import glasses from "@/assets/slides/glasses.jpg";

export const AICognitiveProtheticScreen = () => {
  useRegisterReveals(2);
  return (
    <SlideHero
      image={glasses}
      alt="Round glasses resting on an open notebook by a window"
      position="right"
      scrim="right"
      ariaLabel="AI as cognitive prosthetic"
    >
      <div className="space-y-10 max-w-2xl">
        <p className="text-base md:text-xl uppercase tracking-[0.3em] text-white/70">
          The cognitive prosthetic
        </p>
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.05]">
          Glasses sharpen vision.
          <br />
          <span className="text-accent">AI sharpens cognition.</span>
        </h1>
        <Reveal step={1}>
          <p className="text-2xl md:text-3xl text-white/85 leading-snug">
            One quietly amplifies an eye.
            <br />
            The other quietly amplifies a mind.
          </p>
        </Reveal>
        <Reveal step={2}>
          <p className="text-3xl md:text-4xl font-semibold leading-snug">
            Personalisation at scale.{" "}
            <span className="text-accent">For every learner.</span>
          </p>
        </Reveal>
      </div>
    </SlideHero>
  );
};