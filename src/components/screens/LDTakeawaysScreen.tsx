import { SlideHero } from "@/components/slide";
import { Reveal, useRegisterReveals } from "@/contexts/RevealContext";
import horizon from "@/assets/slides/horizon.jpg";

const shifts = [
  { n: "01", title: "Audit for cognitive load" },
  { n: "02", title: "Add one new format" },
  { n: "03", title: "Try structured freedom" },
  { n: "04", title: "Test with diverse learners" },
];

export const LDTakeawaysScreen = () => {
  useRegisterReveals(5);
  return (
    <SlideHero
      image={horizon}
      alt="Soft pink and amber dawn over rolling hills"
      position="bottom"
      scrim="full"
      ariaLabel="Your action plan"
    >
      <div className="w-full max-w-7xl mx-auto space-y-12 self-center -mt-4">
        <header className="text-center space-y-3">
          <p className="text-base md:text-xl uppercase tracking-[0.4em] text-white/70">
            Your action plan
          </p>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05]">
            Four shifts. Pick <span className="text-accent">one</span>.
          </h1>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {shifts.map((s, i) => (
            <Reveal key={s.n} step={i + 1}>
              <div className="rounded-xl border border-white/15 bg-white/5 backdrop-blur-md p-8 flex items-center gap-6">
                <div className="font-mono text-6xl md:text-7xl font-black text-accent leading-none">
                  {s.n}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  {s.title}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal step={5}>
          <p className="text-3xl md:text-5xl font-bold italic text-center leading-snug">
            "Design the margins.{" "}
            <span className="text-accent">Improve the center.</span>"
          </p>
        </Reveal>
      </div>
    </SlideHero>
  );
};