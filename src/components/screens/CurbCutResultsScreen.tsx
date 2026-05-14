import { SlideHero } from "@/components/slide";
import { Reveal, useRegisterReveals } from "@/contexts/RevealContext";
import curbCut from "@/assets/slides/curb-cut.jpg";

const results = [
  { answer: "71%", label: "use closed captions" },
  { answer: "30%", label: "better completion when chunked" },
  { answer: "80%+", label: "prefer multiple formats" },
];

export const CurbCutResultsScreen = () => {
  useRegisterReveals(4);
  return (
    <SlideHero
      image={curbCut}
      alt="Curb cut continuing from previous slide"
      position="bottom"
      scrim="full"
      ariaLabel="Curb-cut effect results"
    >
      <div className="w-full max-w-7xl mx-auto space-y-12 self-center -mt-4">
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] text-center">
          Built for 15%.{" "}
          <span className="text-accent">Used by 80%+.</span>
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {results.map((r, i) => (
            <Reveal key={i} step={i + 1}>
              <div className="rounded-xl border border-white/15 bg-white/5 backdrop-blur-md p-8 text-center h-full">
                <div className="text-7xl md:text-8xl font-black text-accent leading-none">{r.answer}</div>
                <p className="mt-4 text-xl md:text-2xl text-white/90">{r.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal step={4}>
          <p className="text-3xl md:text-5xl font-bold text-center leading-snug">
            <span className="text-white">Design the margins.</span>
            <span className="text-accent"> Improve the center.</span>
          </p>
        </Reveal>
      </div>
    </SlideHero>
  );
};
