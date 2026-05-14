import { SlideShell, SlideTitle } from "@/components/slide";

/**
 * Lu, Song & Zhang (2025) — same LLM, same question, different language →
 * different cultural defaults. Reinforces Sapir-Whorf / Russian Blues thread.
 */
export const CulturalTendenciesScreen = () => (
  <SlideShell tone="indigo" align="center" ariaLabel="Cultural tendencies in generative AI">
    <div className="space-y-10 max-w-6xl mx-auto w-full">
      <SlideTitle kicker="Lu, Song & Zhang · Nature Human Behaviour · 2025">
        Same model. <span className="text-primary">Different mind</span> in a different language.
      </SlideTitle>

      <div className="rounded-2xl border-2 border-accent/40 bg-accent/5 px-8 py-5 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-2">
          Same prompt — two languages
        </p>
        <p className="text-2xl md:text-3xl italic text-foreground leading-snug">
          "I've been offered a great job in another city. Should I take it?"
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border/40 bg-card/40 p-8 space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
            Asked in English →
          </p>
          <p className="text-xl md:text-2xl text-foreground leading-snug">
            <span className="text-primary font-black">Individualist.</span>{" "}
            "Follow the opportunity. Think about your career growth, your
            independence, what <em>you</em> want from the next five years."
          </p>
        </div>
        <div className="rounded-2xl border border-border/40 bg-card/40 p-8 space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
            Asked in Chinese →
          </p>
          <p className="text-xl md:text-2xl text-foreground leading-snug">
            <span className="text-primary font-black">Collectivist.</span>{" "}
            "Talk to your parents. Consider your family's needs, the impact on
            relationships, the obligations you'd be leaving behind."
          </p>
        </div>
      </div>

      <p className="text-xl md:text-2xl text-foreground/90 max-w-4xl mx-auto text-center leading-snug">
        Switch the language and the model switches its{" "}
        <span className="text-primary font-black">values</span>, not just its words.
      </p>

      <p className="text-sm text-muted-foreground text-center font-mono">
        Lu, Song &amp; Zhang (2025). Cultural tendencies in generative AI.
        Nature Human Behaviour, 9(11), 2360–2369.
      </p>
    </div>
  </SlideShell>
);