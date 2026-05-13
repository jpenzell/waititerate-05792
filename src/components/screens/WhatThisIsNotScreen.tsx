import { Card } from "@/components/ui/card";
import { X, Check } from "lucide-react";

const isNot = [
  "A tech tutorial",
  "A \"use ChatGPT\" pitch",
  "A replacement for you",
];

const is = [
  "A live experiment in cognitive diversity",
  "Permission to redesign one thing",
  "Tools that amplify your expertise",
];

export const WhatThisIsNotScreen = () => {
  return (
    <main className="min-h-screen flex items-center justify-center px-8 py-10 animate-fade-in">
      <section className="max-w-7xl w-full space-y-12">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground text-center">
          Before we go further
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-10 space-y-6 border-l-8 border-l-destructive/60">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground flex items-center gap-3">
              <X className="h-9 w-9 text-destructive" /> NOT this
            </h2>
            <ul className="space-y-5">
              {isNot.map((t, i) => (
                <li key={i} className="flex gap-4 items-start text-2xl md:text-3xl text-foreground/90 leading-snug">
                  <X className="h-7 w-7 text-destructive/70 flex-shrink-0 mt-1" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-10 space-y-6 border-l-8 border-l-primary">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground flex items-center gap-3">
              <Check className="h-9 w-9 text-primary" /> THIS
            </h2>
            <ul className="space-y-5">
              {is.map((t, i) => (
                <li key={i} className="flex gap-4 items-start text-2xl md:text-3xl text-foreground/90 leading-snug">
                  <Check className="h-7 w-7 text-primary flex-shrink-0 mt-1" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>
    </main>
  );
};