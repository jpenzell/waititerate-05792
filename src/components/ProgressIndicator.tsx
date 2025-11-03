import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ChevronRight } from "lucide-react";

interface ProgressIndicatorProps {
  currentIndex: number;
  totalSlides: number;
  currentTitle: string;
  estimatedTimeRemaining?: number;
  visible?: boolean;
}

export const ProgressIndicator = ({ 
  currentIndex, 
  totalSlides, 
  currentTitle,
  estimatedTimeRemaining,
  visible = true 
}: ProgressIndicatorProps) => {
  if (!visible) return null;

  const progressPercentage = ((currentIndex + 1) / totalSlides) * 100;

  return (
    <Card className="fixed top-4 left-4 z-40 p-4 bg-background/90 backdrop-blur-xl border-primary/20 shadow-lg max-w-xs animate-fade-in">
      <div className="space-y-3">
        {/* Slide Counter */}
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            Slide {currentIndex + 1} of {totalSlides}
          </Badge>
          {estimatedTimeRemaining && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>~{estimatedTimeRemaining} min left</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
              role="progressbar"
              aria-valuenow={currentIndex + 1}
              aria-valuemin={1}
              aria-valuemax={totalSlides}
            />
          </div>
          <p className="text-xs font-medium text-foreground truncate">
            {currentTitle}
          </p>
        </div>

        {/* Next Up (if not last slide) */}
        {currentIndex < totalSlides - 1 && (
          <div className="pt-2 border-t border-border">
            <div className="flex items-start gap-2">
              <ChevronRight className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Next:</p>
                <p className="text-xs font-medium text-foreground line-clamp-2">
                  Slide {currentIndex + 2}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
