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
  "LD1.1": { text: "Does a self-driving car need windshield wipers? Vote on your device—this is about questioning assumptions.", type: "action" },
  "LD1.5": { text: "Submit your biggest question about AI in the classroom. We'll come back to these at the end.", type: "action" },
  "LD2.0": { text: "What did you see first—duck or rabbit? Vote on your device.", type: "action" },
  "LD2.1": { text: "Guess three statistics about neurodiversity. Most people are way off—prepare to be surprised.", type: "action" },
  "LD3.0": { text: "Take a photo of something that represents how YOU learn best. There's no wrong answer.", type: "action" },
  "LD3.1": { text: "Look at everyone's photos. What patterns do YOU notice? What themes emerge?", type: "info" },
  "LD3.3": { text: "Reflect: what learning differences can't be photographed? Think about invisible cognitive variations.", type: "info" },
  "LD3.4": { text: "How many distinct interpretations do you think AI could draw from these photos? Submit your estimate.", type: "action" },
  "LD4.0": { text: "Close your eyes and picture a red apple on a white plate. How vivid is your mental image?", type: "action" },
  "LD4.1": { text: "Read the sentence on screen SILENTLY. Do you hear a voice reading it to you?", type: "action" },
  "LD4.2": { text: "Press START, then—without counting—press STOP when you think 10 seconds have passed.", type: "action" },
  "LD4.3": { text: "Adjust the sensory sliders until it feels OVERWHELMING. Everyone's threshold is different.", type: "action" },
  "LD4.4": { text: "Reflect on what surprised you. What did you learn about cognitive diversity?", type: "action" },
  "LD4.6": { text: "Add your discovery to the wall. What did you notice about your own mind today?", type: "action" },
  "LD5.1": { text: "Closed-caption usage: what percentage of ALL viewers use them? Vote on your device.", type: "action" },
  "LD5.2": { text: "How much does chunking improve completion for everyone? Vote on your device.", type: "action" },
  "LD5.3": { text: "What percentage of learners prefer multiple formats? Vote on your device.", type: "action" },
  "LD6.1": { text: "Which best describes your current training design—rigid, chaotic, or balanced? Vote on your device.", type: "action" },
  "LD7.0": { text: "Pick one of your own slides and redesign it for cognitive accessibility. AI will help.", type: "action" },
  "LD7.3": { text: "You're the teacher. Explain neurodiversity to the AI student—learning by teaching.", type: "action" },
  "LD8.2": { text: "Your parking-lot questions are now displayed. Upvote any you'd like answered.", type: "info" },
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
