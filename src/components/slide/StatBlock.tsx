import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Props {
  value: string;
  label: string;
  note?: string;
  icon?: LucideIcon;
  accent?: "primary" | "accent" | "destructive";
}

const accentRing: Record<NonNullable<Props["accent"]>, string> = {
  primary: "border-l-primary",
  accent: "border-l-accent",
  destructive: "border-l-destructive",
};

const accentText: Record<NonNullable<Props["accent"]>, string> = {
  primary: "text-primary",
  accent: "text-accent",
  destructive: "text-destructive",
};

/** Large stat card. Used wherever the deck shows value + label. */
export const StatBlock = ({ value, label, note, icon: Icon, accent = "primary" }: Props) => (
  <Card className={`p-8 border-l-8 ${accentRing[accent]} h-full text-center space-y-3 bg-card/80 backdrop-blur`}>
    {Icon && <Icon className={`h-12 w-12 mx-auto ${accentText[accent]}`} aria-hidden="true" />}
    <div className={`text-6xl md:text-7xl font-black ${accentText[accent]} leading-none`}>{value}</div>
    <div className="text-xl md:text-2xl font-semibold text-foreground/90">{label}</div>
    {note && <p className="text-base md:text-lg text-muted-foreground leading-snug">{note}</p>}
  </Card>
);