import { Clock, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SlideHeaderProps {
  slideNumber: number;
  totalSlides: number;
  estimatedMinutes?: number;
  title?: string;
  showProgress?: boolean;
}

export const SlideHeader = ({ 
  slideNumber, 
  totalSlides, 
  estimatedMinutes,
  title,
  showProgress = true 
}: SlideHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6 px-4 py-2 bg-background/50 backdrop-blur-sm rounded-lg border border-border/50">
      {/* Progress Indicator */}
      {showProgress && (
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground font-medium">
            Slide {slideNumber} of {totalSlides}
          </span>
          {/* Visual Progress Bar */}
          <div className="hidden sm:flex items-center gap-1 ml-2">
            {Array.from({ length: totalSlides }, (_, i) => (
              <div
                key={i}
                className={`h-1.5 w-6 rounded-full transition-all ${
                  i < slideNumber 
                    ? 'bg-primary' 
                    : i === slideNumber 
                    ? 'bg-primary/50' 
                    : 'bg-border'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Title (optional) */}
      {title && (
        <h2 className="text-sm font-semibold text-foreground hidden md:block">
          {title}
        </h2>
      )}

      {/* Timing Estimate */}
      {estimatedMinutes && (
        <Badge variant="outline" className="gap-1.5">
          <Clock className="h-3 w-3" />
          <span className="text-xs">{estimatedMinutes} min</span>
        </Badge>
      )}
    </div>
  );
};
