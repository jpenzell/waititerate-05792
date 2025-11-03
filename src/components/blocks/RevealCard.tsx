import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Eye } from "lucide-react";

interface RevealCardProps {
  question: string;
  answer: ReactNode;
  variant?: "default" | "stat";
}

export const RevealCard = ({ question, answer, variant = "default" }: RevealCardProps) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 rounded-2xl p-8 shadow-lg">
      <div className="flex items-start justify-between gap-4 mb-4">
        <h3 className="text-2xl font-bold text-foreground">{question}</h3>
        {!revealed && (
          <Button
            onClick={() => setRevealed(true)}
            variant="outline"
            size="lg"
            className="flex items-center gap-2 shrink-0"
          >
            <Eye className="h-4 w-4" />
            Reveal Answer
          </Button>
        )}
      </div>
      
      {revealed ? (
        <div className="animate-fade-in bg-background/80 p-6 rounded-xl border-2 border-accent shadow-inner">
          {variant === "stat" ? (
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-4">{answer}</div>
            </div>
          ) : (
            <div className="text-foreground text-lg leading-relaxed">{answer}</div>
          )}
        </div>
      ) : (
        <p className="text-muted-foreground italic">Click to reveal the answer...</p>
      )}
    </div>
  );
};
