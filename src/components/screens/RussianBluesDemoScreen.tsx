import { SlideShell, SlideTitle } from "@/components/slide";

/**
 * Russian Blues Demo — measurable proof that language conditions perception.
 * Pairs with LanguageShapesThoughtScreen.
 */
export const RussianBluesDemoScreen = () => (
  <SlideShell tone="indigo" align="center" ariaLabel="Russian blues demo">
    <div className="space-y-12 max-w-5xl mx-auto text-center">
      <SlideTitle kicker="Russian Blues — Winawer & Boroditsky 2007">
        Two words for blue. <span className="text-primary">Faster eyes.</span>
      </SlideTitle>

      <div className="flex items-center justify-center gap-10 md:gap-16">
        <div className="space-y-3">
          <div
            className="w-44 h-44 md:w-56 md:h-56 rounded-2xl shadow-2xl border border-border/30"
            style={{ background: "hsl(205 75% 70%)" }}
            aria-label="Light blue (goluboy)"
          />
          <p className="font-mono text-base md:text-lg uppercase tracking-[0.25em] text-accent">
            goluboy
          </p>
        </div>
        <div className="space-y-3">
          <div
            className="w-44 h-44 md:w-56 md:h-56 rounded-2xl shadow-2xl border border-border/30"
            style={{ background: "hsl(220 80% 38%)" }}
            aria-label="Dark blue (siniy)"
          />
          <p className="font-mono text-base md:text-lg uppercase tracking-[0.25em] text-accent">
            siniy
          </p>
        </div>
      </div>

      <p className="text-2xl md:text-3xl text-foreground leading-snug max-w-3xl mx-auto">
        Russian has two basic words for blue. Russian speakers discriminate
        these shades{" "}
        <span className="text-primary font-black">124&nbsp;ms</span> faster
        than English speakers — measurably.
      </p>
    </div>
  </SlideShell>
);