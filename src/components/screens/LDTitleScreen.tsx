export const LDTitleScreen = () => {
  return (
    <main
      className="h-full w-full relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/10"
      role="main"
      aria-label="Presentation title screen"
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0 grid-pattern opacity-20" aria-hidden="true" />
      <div
        className="absolute -top-32 -left-32 w-[36rem] h-[36rem] bg-primary/30 rounded-full blur-3xl animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-32 w-[36rem] h-[36rem] bg-accent/25 rounded-full blur-3xl animate-pulse-glow"
        style={{ animationDelay: "1.2s" }}
        aria-hidden="true"
      />

      {/* Top tag */}
      <div className="absolute top-10 left-0 right-0 flex justify-center animate-fade-in">
        <span className="text-base md:text-lg font-mono uppercase tracking-[0.4em] text-accent/90">
          Rowan-Cabarrus Summer Institute · 2026
        </span>
      </div>

      {/* Cinematic title */}
      <div className="relative h-full flex flex-col items-center justify-center px-8 text-center animate-fade-in">
        <h1 className="gradient-text font-bold tracking-tight leading-[0.9] text-[clamp(4rem,14vw,12rem)]">
          AI for<br />All Minds
        </h1>

        <div className="mt-8 h-[3px] w-32 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full" />

        <h2 className="mt-8 text-2xl md:text-4xl font-light text-foreground/80 max-w-4xl leading-snug">
          Lessons from neurodiversity to{" "}
          <span className="text-accent font-medium">transform learning</span>
        </h2>
      </div>

      {/* Speaker — bottom corner, minimal */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center text-center animate-fade-in">
        <div className="font-mono">
          <p className="text-base md:text-lg font-semibold tracking-wider text-foreground">
            JOSH PENZELL
          </p>
          <p className="text-base md:text-lg text-muted-foreground/80 tracking-wide">
            Founder & CEO · Imagination Applied
          </p>
        </div>
      </div>
    </main>
  );
};
