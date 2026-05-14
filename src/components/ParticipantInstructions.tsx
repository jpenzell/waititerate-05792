import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { useState, useEffect } from "react";

interface ParticipantInstructionsProps {
  slideId: string;
  instructions?: string;
  isInteractive?: boolean;
  autoHide?: boolean;
  duration?: number;
}

// IDs match the rebuilt 7-act outline (see config/screens.ts).
const slideInstructions: Record<string, { text: string; type: "info" | "action" | "success" }> = {
  "LD1.1": { text: "Does a self-driving car need windshield wipers? Vote on your device.", type: "action" },
  "LD3.1": { text: "Take a photo of something that represents how YOU learn best. There's no wrong answer.", type: "action" },
  "LD3.2": { text: "Look at everyone's photos. What patterns do YOU notice?", type: "info" },
  "LD3.4": { text: "Close your eyes and picture a red apple on a white plate. How vivid is the image?", type: "action" },
  "LD3.5": { text: "Read the sentence silently. Do you hear a voice reading it to you?", type: "action" },
  "LD3.6": { text: "Press START, then — without counting — press STOP when you think 10 seconds have passed.", type: "action" },
  "LD3.7": { text: "How does feedback land for you? Move the slider.", type: "action" },
  "LD3.8": { text: "Add your discovery to the wall. What did you notice about your own mind today?", type: "action" },
  "LD5.2": { text: "Closed-caption usage: what percentage of ALL viewers use them? Vote on your device.", type: "action" },
  "LD5.3": { text: "How much does chunking improve completion for everyone? Vote on your device.", type: "action" },
  "LD6.1": { text: "Pick a slide of your own and redesign it for cognitive accessibility. AI will help.", type: "action" },
  "LD6.4": { text: "Round 1 — teach the AI student a concept. Watch where it misunderstands.", type: "action" },
  "LD6.5": { text: "Round 2 — redesign your explanation using UDL + cognitive load.", type: "action" },
  "LD6.6": { text: "Round 3 — iterate. Watch the score climb.", type: "action" },
};

export const ParticipantInstructions = ({ 
  slideId, 
  instructions,
  isInteractive = false,
  autoHide = false,
  duration = 10000 
}: ParticipantInstructionsProps) => {
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  const instruction = instructions || slideInstructions[slideId];

  useEffect(() => {
    setVisible(true);
    setDismissed(false);
    
    if (autoHide && instruction) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [slideId, autoHide, duration, instruction]);

  if (!instruction || dismissed) return null;

  // Handle both string and object instruction types
  const instructionData = typeof instruction === 'string' 
    ? { text: instruction, type: 'info' as const }
    : instruction;

  const Icon = instructionData.type === "action" ? AlertCircle : instructionData.type === "success" ? CheckCircle2 : Info;
  const colorClass = instructionData.type === "action" 
    ? "border-accent/30 bg-accent/5" 
    : instructionData.type === "success" 
    ? "border-primary/30 bg-primary/5" 
    : "border-primary/20 bg-primary/5";

  return (
    <Card 
      className={`fixed top-20 left-1/2 -translate-x-1/2 z-40 p-4 backdrop-blur-xl shadow-lg max-w-2xl w-full mx-4 ${colorClass} transition-all duration-300 ${
        visible ? "animate-fade-in" : "opacity-0"
      }`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
          instructionData.type === "action" ? "text-accent" : "text-primary"
        }`} />
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge variant={instructionData.type === "action" ? "default" : "secondary"} className="text-xs">
              {instructionData.type === "action" ? "Action Required" : instructionData.type === "success" ? "Well Done!" : "Information"}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-background/50"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss instructions"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            {instructionData.text}
          </p>
          {isInteractive && (
            <p className="text-xs text-muted-foreground mt-2 italic">
              This is an interactive exercise. Take your time—there's no rush.
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};
