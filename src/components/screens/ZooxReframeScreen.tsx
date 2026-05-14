import { Sparkles } from "lucide-react";

export const ZooxReframeScreen = () => {
  return (
    <main className="min-h-screen flex items-center justify-center px-8 animate-fade-in">
      <section className="max-w-6xl w-full text-center space-y-10">
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 border border-primary/30 rounded-full">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            So I Asked Myself the Same Question
          </span>
        </div>

        <p className="text-4xl md:text-6xl text-foreground/90 leading-tight">
          Why am I building a <span className="line-through text-muted-foreground">PowerPoint</span>?
        </p>

        <p className="text-6xl md:text-8xl font-bold text-primary leading-tight">
          This isn't a deck.
          <br />
          It's a live website.
        </p>

        <p className="text-3xl md:text-4xl text-foreground/80">
          Built by having a <span className="text-primary font-semibold">conversation with AI</span>.
        </p>
      </section>
    </main>
  );
};