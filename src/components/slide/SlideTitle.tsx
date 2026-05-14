import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  kicker?: string;
  align?: "center" | "left";
  className?: string;
}

/**
 * Standardised slide headline. Replaces the dozens of one-off
 * `text-5xl md:text-7xl font-bold ...` lines across screens.
 */
export const SlideTitle = ({ children, kicker, align = "center", className = "" }: Props) => (
  <header className={`${align === "center" ? "text-center" : "text-left"} space-y-4`}>
    {kicker && (
      <p className="text-xs md:text-sm font-mono uppercase tracking-[0.4em] text-accent">
        {kicker}
      </p>
    )}
    <h1 className={`text-5xl md:text-7xl font-bold text-foreground leading-[1.05] ${className}`}>
      {children}
    </h1>
  </header>
);