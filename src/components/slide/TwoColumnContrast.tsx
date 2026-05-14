import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface ContrastSide {
  label: string;
  icon: LucideIcon;
  items: ReactNode[];
  tone: "negative" | "positive";
}

interface Props {
  left: ContrastSide;
  right: ContrastSide;
}

const toneRing = {
  negative: "border-l-destructive/70",
  positive: "border-l-primary",
};
const toneText = {
  negative: "text-destructive",
  positive: "text-primary",
};

/** "Fear vs reframe", "NOT this vs THIS" pattern. */
export const TwoColumnContrast = ({ left, right }: Props) => {
  const Side = ({ side }: { side: ContrastSide }) => {
    const Icon = side.icon;
    return (
      <Card className={`p-10 border-l-8 ${toneRing[side.tone]} space-y-6 h-full bg-card/80`}>
        <header className="flex items-center gap-3">
          <Icon className={`h-9 w-9 ${toneText[side.tone]}`} aria-hidden="true" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{side.label}</h2>
        </header>
        <ul className="space-y-4 text-2xl md:text-3xl text-foreground/90 leading-snug">
          {side.items.map((it, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className={`mt-2 h-2 w-2 rounded-full ${toneText[side.tone]} bg-current shrink-0`} aria-hidden="true" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </Card>
    );
  };
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Side side={left} />
      <Side side={right} />
    </div>
  );
};