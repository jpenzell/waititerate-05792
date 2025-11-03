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

const slideInstructions: Record<string, { text: string; type: "info" | "action" | "success" }> = {
  "LD0.1": {
    text: "Guess three shocking statistics about neurodiversity in the workplace. Most people are way off—prepare to be surprised by reality.",
    type: "action"
  },
  "LD0.5.1": {
    text: "Take a photo of something that represents how YOU learn best. It can be anything—your workspace, a tool, a place, a object. There's no wrong answer.",
    type: "action"
  },
  "LD0.5.2": {
    text: "Look at everyone's photos. What patterns do YOU notice? What themes emerge? Everyone will see something different.",
    type: "info"
  },
  "LD0.5.3": {
    text: "Close your eyes and picture a red apple on a white plate. Try to 'see' it clearly. How vivid is your mental image?",
    type: "action"
  },
  "LD0.5.4": {
    text: "Read the sentence on screen SILENTLY. Do you hear a voice reading it to you? Or is it just... meaning without sound?",
    type: "action"
  },
  "LD0.5.6": {
    text: "You'll press START, then—without counting or looking at a clock—press STOP when you think 10 seconds have passed.",
    type: "action"
  },
  "LD0.5.7": {
    text: "Adjust the sensory sliders until it feels OVERWHELMING. This is your cognitive load threshold. Everyone's is different.",
    type: "action"
  },
  "LD0.5.8": {
    text: "Reflect on what surprised you. What did you learn about cognitive diversity? How might this change your design practice?",
    type: "action"
  },
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
