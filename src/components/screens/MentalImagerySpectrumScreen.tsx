import { SlideShell } from "@/components/slide";
import { Card } from "@/components/ui/card";

/**
 * LD1.03 — Opener step 2. The spectrum reveal. Five visual cards showing how
 * different minds "see" the same ball — from no image at all (aphantasia)
 * through photo-real (hyperphantasia). The point: people in this room are
 * having totally different experiences right now and they didn't know it.
 */
const stops = [
  {
    label: "No image",
    sub: "Aphantasia",
    glyph: "○",
    desc: "Nothing. Just the words 'ball on a table.'",
    bg: "bg-muted/40",
    fg: "text-muted-foreground",
    border: "border-muted",
  },
  {
    label: "Faint",
    sub: "Low imagery",
    glyph: "◔",
    desc: "A vague shape. Hard to hold for more than a second.",
    bg: "bg-card/80",
    fg: "text-foreground/70",
    border: "border-border",
  },
  {
    label: "Sketch",
    sub: "Typical",
    glyph: "◐",
    desc: "Clear-ish outline. Some color. Like a quick drawing.",
    bg: "bg-primary/5",
    fg: "text-foreground",
    border: "border-primary/30",
  },
  {
    label: "Vivid",
    sub: "Strong imagery",
    glyph: "◕",
    desc: "Specific color, texture, and lighting. You can rotate it.",
    bg: "bg-primary/15",
    fg: "text-primary",
    border: "border-primary/50",
  },
  {
    label: "Photo-real",
    sub: "Hyperphantasia",
    glyph: "●",
    desc: "Sharper than a memory. Sometimes sharper than the real thing.",
    bg: "bg-accent/15",
    fg: "text-accent",
    border: "border-accent/50",
  },
];

export const MentalImagerySpectrumScreen = () => {
  return (
    <SlideShell tone="indigo" align="center" ariaLabel="The mental imagery spectrum">
      <div className="space-y-10">
        <header className="text-center space-y-4">
          <p className="text-sm md:text-base font-mono uppercase tracking-[0.3em] text-muted-foreground">
            Same prompt · five different experiences
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-foreground leading-tight">
            Some of you saw <span className="text-accent">a photograph.</span>
            <br />
            Some of you saw <span className="text-muted-foreground">nothing at all.</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {stops.map((s) => (
            <Card
              key={s.label}
              className={`p-5 md:p-6 border-2 ${s.border} ${s.bg} text-center space-y-3 h-full flex flex-col items-center justify-start`}
            >
              <div className={`text-6xl md:text-7xl font-black ${s.fg} leading-none`} aria-hidden="true">
                {s.glyph}
              </div>
              <div>
                <div className={`text-xl md:text-2xl font-black ${s.fg}`}>{s.label}</div>
                <div className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mt-1">
                  {s.sub}
                </div>
              </div>
              <p className="text-sm md:text-base text-foreground/80 leading-snug">{s.desc}</p>
            </Card>
          ))}
        </div>

        <p className="text-center text-xl md:text-2xl text-foreground/85 max-w-4xl mx-auto leading-snug">
          Same words landed in this room. <span className="text-primary font-bold">Five completely different experiences.</span>
        </p>
      </div>
    </SlideShell>
  );
};