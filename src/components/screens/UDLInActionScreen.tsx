import { SlideHero } from "@/components/slide";
import { Reveal, useRegisterReveals } from "@/contexts/RevealContext";
import windows from "@/assets/slides/windows.jpg";

const pillars = [
  { q: "WHAT", title: "Representation", ask: "≥ 2 formats?" },
  { q: "WHY",  title: "Engagement",     ask: "Real choices?" },
  { q: "HOW",  title: "Expression",     ask: "Multiple ways to show it?" },
];

export const UDLInActionScreen = () => {
  useRegisterReveals(pillars.length + 1);
  return (
    <SlideHero
      image={windows}
      alt="Three large arched windows in a quiet gallery"
      position="bottom"
      scrim="full"
      ariaLabel="UDL in action"
    >
      <div className="w-full max-w-7xl mx-auto space-y-12 self-center -mt-4">
        <h1 className="text-5xl md:text-7xl font-bold text-center leading-[1.05]">
          UDL in action
        </h1>
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <Reveal key={p.title} step={i + 1}>
              <div className="rounded-xl border border-white/15 bg-white/5 backdrop-blur-md p-10 text-center space-y-4 h-full">
                <p className="text-sm font-mono uppercase tracking-[0.4em] text-accent">{p.q}</p>
                <h3 className="text-3xl md:text-4xl font-bold text-white">{p.title}</h3>
                <p className="text-xl md:text-2xl text-white/80">{p.ask}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal step={pillars.length + 1}>
          <p className="text-3xl md:text-5xl font-bold text-center text-white leading-snug">
            Add <span className="text-accent">one</span> option this week.
          </p>
        </Reveal>
      </div>
    </SlideHero>
  );
};