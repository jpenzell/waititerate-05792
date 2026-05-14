import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface Props {
  children: ReactNode;
  attribution?: string;
  variant?: "primary" | "accent" | "soft";
  className?: string;
}

const variantClass: Record<NonNullable<Props["variant"]>, string> = {
  primary: "bg-gradient-to-r from-primary/15 to-accent/10 border-primary/40",
  accent:  "bg-gradient-to-r from-accent/15 to-primary/10 border-accent/40",
  soft:    "bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20",
};

/** Closing quote / call-to-action card. Replaces the repeating pattern across slides. */
export const PullQuote = ({ children, attribution, variant = "soft", className = "" }: Props) => (
  <Card className={`p-10 md:p-12 border-2 text-center ${variantClass[variant]} ${className}`}>
    <p className="text-3xl md:text-5xl font-bold text-foreground leading-snug">{children}</p>
    {attribution && (
      <p className="mt-5 text-base md:text-lg font-mono uppercase tracking-[0.3em] text-muted-foreground">
        {attribution}
      </p>
    )}
  </Card>
);