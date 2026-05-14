import { X, Check } from "lucide-react";
import { Reveal, useRegisterReveals } from "@/contexts/RevealContext";
import { SlideShell, SlideTitle, TwoColumnContrast } from "@/components/slide";

const isNot = ["A tech tutorial", "A \"use ChatGPT\" pitch", "A replacement for you"];
const is = [
  "A live experiment in cognitive diversity",
  "Permission to redesign one thing",
  "Tools that amplify your expertise",
];

export const WhatThisIsNotScreen = () => {
  useRegisterReveals(2);
  return (
    <SlideShell tone="indigo" ariaLabel="What this is and isn't">
      <div className="space-y-12">
        <SlideTitle kicker="Before we go further">Set the frame.</SlideTitle>
        <Reveal step={1}>
          <TwoColumnContrast
            left={{ label: "NOT this", icon: X, items: isNot, tone: "negative" }}
            right={{ label: "THIS", icon: Check, items: is, tone: "positive" }}
          />
        </Reveal>
        <Reveal step={2}>
          <p className="text-center text-2xl md:text-3xl text-muted-foreground italic">
            Permission, not prescription.
          </p>
        </Reveal>
      </div>
    </SlideShell>
  );
};