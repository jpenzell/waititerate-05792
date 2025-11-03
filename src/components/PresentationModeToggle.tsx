import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2 } from "lucide-react";
import { toast } from "sonner";

interface PresentationModeToggleProps {
  onToggle?: (isFullscreen: boolean) => void;
}

export const PresentationModeToggle = ({ onToggle }: PresentationModeToggleProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);
      onToggle?.(isNowFullscreen);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [onToggle]);

  const togglePresentationMode = async () => {
    try {
      if (!isFullscreen) {
        await document.documentElement.requestFullscreen();
        toast.success("Presentation mode activated");
      } else {
        await document.exitFullscreen();
        toast.success("Presentation mode deactivated");
      }
    } catch (error) {
      console.error("Fullscreen toggle failed:", error);
      toast.error("Could not toggle presentation mode");
    }
  };

  return (
    <Button
      onClick={togglePresentationMode}
      variant="outline"
      size="sm"
      className="border-primary/20"
      title={isFullscreen ? "Exit Presentation Mode (Esc)" : "Enter Presentation Mode (F11)"}
    >
      {isFullscreen ? (
        <Minimize2 className="w-4 h-4 mr-2" />
      ) : (
        <Maximize2 className="w-4 h-4 mr-2" />
      )}
      {isFullscreen ? "Exit Presentation" : "Presentation Mode"}
    </Button>
  );
};
