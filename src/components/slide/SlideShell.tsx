import { ReactNode } from "react";

type Tone = "default" | "indigo" | "teal" | "amber" | "rose" | "emerald" | "slate";

const toneBg: Record<Tone, string> = {
  default: "bg-background",
  indigo:  "bg-gradient-to-br from-background via-background to-primary/10",
  teal:    "bg-gradient-to-br from-background via-background to-accent/10",
  amber:   "bg-gradient-to-br from-background via-background to-[hsl(38_85%_55%/0.10)]",
  rose:    "bg-gradient-to-br from-background via-background to-[hsl(346_77%_60%/0.10)]",
  emerald: "bg-gradient-to-br from-background via-background to-[hsl(160_70%_45%/0.10)]",
  slate:   "bg-gradient-to-br from-background via-background to-[hsl(220_15%_45%/0.10)]",
};

interface Props {
  children: ReactNode;
  tone?: Tone;
  align?: "center" | "top";
  className?: string;
  ariaLabel?: string;
}

/**
 * Standard slide container. Replaces the repeated
 * `min-h-screen flex items-center px-8 py-10 animate-fade-in` boilerplate.
 */
export const SlideShell = ({
  children,
  tone = "default",
  align = "center",
  className = "",
  ariaLabel,
}: Props) => {
  return (
    <main
      className={`min-h-full w-full relative overflow-y-auto ${toneBg[tone]} flex ${
        align === "center" ? "items-center" : "items-start pt-8"
      } px-8 py-6 md:py-8 animate-fade-in ${className}`}
      aria-label={ariaLabel}
    >
      <section className="max-w-7xl mx-auto w-full">{children}</section>
    </main>
  );
};