import { RefreshCw } from "lucide-react";

export const AnthropicIterationScreen = () => {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-8 py-10 overflow-hidden animate-fade-in">
      <div className="w-full max-w-6xl space-y-8 text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 border border-primary/30 rounded-full">
          <RefreshCw className="h-4 w-4 text-primary" />
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            Anthropic AI Fluency Index · 2026
          </span>
        </div>

        <h1 className="text-4xl md:text-7xl font-bold text-foreground leading-tight">
          Iteration <span className="text-primary">doubles</span>
          <br />
          the quality of AI output.
        </h1>

        <p className="text-[8rem] md:text-[12rem] font-black text-primary leading-none">
          2×
        </p>

        <p className="text-xl md:text-3xl italic text-foreground/80 max-w-3xl mx-auto">
          The skill isn't the prompt.
          <br />
          It's the <span className="text-primary font-semibold not-italic">rehearsal</span>.
        </p>

        <p className="text-xs md:text-sm text-muted-foreground tracking-widest uppercase">
          9,830 conversations analyzed · Anthropic, Feb 2026
        </p>
      </div>
    </main>
  );
};