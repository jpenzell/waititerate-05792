import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Keyboard } from "lucide-react";

interface KeyboardShortcutsProps {
  visible: boolean;
  onNavigate?: (direction: "prev" | "next") => void;
  onToggleFullscreen?: () => void;
}

export const KeyboardShortcuts = ({ 
  visible, 
  onNavigate, 
  onToggleFullscreen 
}: KeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
          onNavigate?.("prev");
          break;
        case "ArrowRight":
        case " ": // Space bar
          e.preventDefault();
          onNavigate?.("next");
          break;
        case "f":
        case "F":
          onToggleFullscreen?.();
          break;
        case "Escape":
          if (document.fullscreenElement) {
            document.exitFullscreen();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onNavigate, onToggleFullscreen]);

  if (!visible) return null;

  return (
    <Card className="fixed bottom-4 left-4 z-40 p-3 bg-background/90 backdrop-blur-xl border-primary/20 shadow-lg animate-fade-in">
      <div className="flex items-start gap-3">
        <Keyboard className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
        <div className="space-y-2">
          <p className="text-xs font-semibold text-foreground">Keyboard Shortcuts</p>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="px-1.5 py-0.5 text-xs">←</Badge>
              <span>Previous</span>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="px-1.5 py-0.5 text-xs">→</Badge>
              <span>Next</span>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="px-1.5 py-0.5 text-xs">Space</Badge>
              <span>Next</span>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="px-1.5 py-0.5 text-xs">F</Badge>
              <span>Fullscreen</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
