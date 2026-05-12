import { Sparkles } from "lucide-react";

export const ZooxReframeScreen = () => {
  const lines = [
    "So I asked myself the same question.",
    "Why am I building a PowerPoint?",
    "This isn't a deck. It's a live website —",
    "built by having a conversation with AI.",
  ];

  return (
    <main className="min-h-screen flex items-center justify-center px-8 animate-fade-in">
      <section className="max-w-5xl w-full text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 border border-primary/30 rounded-full">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            My Own Reframe
          </span>
        </div>

        <div className="space-y-6">
          {lines.map((line, i) => (
            <p
              key={i}
              className={`leading-tight ${
                i === lines.length - 1
                  ? "text-3xl md:text-5xl font-bold text-primary"
                  : "text-2xl md:text-4xl text-foreground/90"
              }`}
            >
              {line}
            </p>
          ))}
        </div>

        <p className="text-base md:text-lg text-muted-foreground italic pt-6">
          If a self-driving car doesn't need windshield wipers,
          maybe a presentation doesn't need slides.
        </p>
      </section>
    </main>
  );
};