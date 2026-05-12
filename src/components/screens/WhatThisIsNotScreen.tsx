import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Check } from "lucide-react";

const isNot = [
  "A tech-tool tutorial — no software to install",
  "A lecture on being more inclusive",
  "A \"just use ChatGPT\" pitch",
  "A replacement for your professional judgment",
  "A claim that AI can teach better than you",
];

const is = [
  "A live experiment in cognitive diversity",
  "A reframe on what your students actually experience",
  "A practical design principle (curb-cut effect)",
  "Permission to redesign one thing — not everything",
  "Tools that respect your expertise and amplify it",
];

export const WhatThisIsNotScreen = () => {
  return (
    <main className="min-h-screen flex items-center justify-center px-8 py-10 animate-fade-in">
      <section className="max-w-6xl w-full space-y-8">
        <div className="text-center space-y-3">
          <Badge variant="secondary" className="mx-auto">Setting expectations</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Before we go further
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4 border-l-4 border-l-destructive/60">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <X className="h-6 w-6 text-destructive" /> What this is NOT
            </h2>
            <ul className="space-y-3">
              {isNot.map((t, i) => (
                <li key={i} className="flex gap-3 items-start text-base text-foreground/90">
                  <X className="h-5 w-5 text-destructive/70 flex-shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 space-y-4 border-l-4 border-l-primary">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Check className="h-6 w-6 text-primary" /> What this IS
            </h2>
            <ul className="space-y-3">
              {is.map((t, i) => (
                <li key={i} className="flex gap-3 items-start text-base text-foreground/90">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
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