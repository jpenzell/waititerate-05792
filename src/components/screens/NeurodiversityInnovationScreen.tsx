import { Brain, Sparkles, Lightbulb } from "lucide-react";

export const NeurodiversityInnovationScreen = () => {
  return (
    <main className="min-h-screen flex items-center justify-center px-8 animate-fade-in">
      <section className="max-w-6xl w-full space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 border border-primary/30 rounded-full">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">
              I Thought Backwards
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
            And that's the whole point.
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-2xl p-8 space-y-4">
            <Brain className="h-12 w-12 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Think differently</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Neurodivergent minds don't follow the default path — they question it.
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 space-y-4">
            <Sparkles className="h-12 w-12 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Use AI flexibly</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              AI removes the friction of execution, so your different idea can actually ship.
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 space-y-4">
            <Lightbulb className="h-12 w-12 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Innovate</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              That combination is how new things — like this site — get made.
            </p>
          </div>
        </div>

        <p className="text-2xl md:text-3xl text-center text-foreground/80 italic max-w-4xl mx-auto leading-relaxed">
          Neurodiversity + AI flexibility = the conditions for innovation.
        </p>
      </section>
    </main>
  );
};
