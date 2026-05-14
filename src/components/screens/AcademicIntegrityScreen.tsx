import { SlideHero } from "@/components/slide";
import { Reveal, useRegisterReveals } from "@/contexts/RevealContext";
import calculator from "@/assets/slides/calculator.jpg";

export const AcademicIntegrityScreen = () => {
  useRegisterReveals(3);
  return (
    <SlideHero
      image={calculator}
      alt="A scientific calculator resting on a page of handwritten math"
      position="right"
      scrim="right"
      ariaLabel="But isn't this just cheating?"
    >
      <div className="space-y-8 max-w-2xl">
        <p className="text-base md:text-xl uppercase tracking-[0.3em] text-white/70">
          1972 · The calculator panic
        </p>
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.05]">
          "Isn't this just <span className="text-accent">cheating</span>?"
        </h1>
        <Reveal step={1}>
          <p className="text-2xl md:text-3xl text-white/85 leading-snug">
            Schools said calculators would end math.
            <br />They didn't. They <span className="text-accent">raised the floor</span>.
          </p>
        </Reveal>
        <Reveal step={2}>
          <p className="text-2xl md:text-3xl text-white/90 leading-snug">
            Design what AI <span className="text-accent">can't shortcut</span>.
            <br />Teach <span className="text-accent">with</span> it, not against it.
          </p>
        </Reveal>
        <Reveal step={3}>
          <p className="text-3xl md:text-4xl font-bold leading-snug">
            Same panic. New tool. <span className="text-accent">Same answer.</span>
          </p>
        </Reveal>
      </div>
    </SlideHero>
  );
};