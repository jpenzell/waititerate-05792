import { Accessibility } from "lucide-react";

export const CurbCutIntroScreen = () => {
  return (
    <main className="min-h-screen flex items-center justify-center px-8 py-10 animate-fade-in">
      <section className="max-w-6xl text-center space-y-10">
        <Accessibility className="h-20 w-20 mx-auto text-primary" />
        <h1 className="text-6xl md:text-8xl font-bold text-foreground leading-tight">
          The Curb-Cut Effect
        </h1>
        <p className="text-3xl md:text-4xl text-foreground/90 leading-snug max-w-5xl mx-auto">
          Built for wheelchairs.
          <br />
          Used by <span className="text-primary font-bold">everyone</span>.
        </p>
        <p className="text-2xl md:text-3xl text-muted-foreground italic">
          Strollers · luggage · cyclists · delivery · the elderly
        </p>
      </section>
    </main>
  );
};
