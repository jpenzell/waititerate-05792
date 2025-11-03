import { Settings, Eye, EyeOff, ChevronUp, ChevronDown, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { SlideConfig } from "@/hooks/useSlideConfig";

interface SlideManagerProps {
  slides: { id: string; title: string }[];
  config: SlideConfig[];
  onToggleVisibility: (slideId: string) => void;
  onMoveSlide: (slideId: string, direction: 'up' | 'down') => void;
  onResetToDefaults: () => void;
  onShowAll: () => void;
  onHideAll: () => void;
}

export const SlideManager = ({
  slides,
  config,
  onToggleVisibility,
  onMoveSlide,
  onResetToDefaults,
  onShowAll,
  onHideAll,
}: SlideManagerProps) => {
  // Sort slides by order
  const sortedConfig = [...config].sort((a, b) => a.order - b.order);
  
  const visibleCount = config.filter(c => c.visible).length;
  const totalCount = config.length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" title="Manage Slides">
          <Settings className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Manage Slides</SheetTitle>
          <SheetDescription>
            Show/hide slides and reorder the presentation
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 space-y-4">
          {/* Summary */}
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm text-muted-foreground">
              Visible Slides
            </span>
            <Badge variant="secondary">
              {visibleCount} / {totalCount}
            </Badge>
          </div>

          {/* Bulk Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onShowAll}
              className="flex-1"
            >
              Show All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onHideAll}
              className="flex-1"
            >
              Hide All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onResetToDefaults}
              title="Reset to Original Order"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {/* Slide List */}
          <ScrollArea className="h-[calc(100vh-280px)] pr-4">
            <div className="space-y-2">
              {sortedConfig.map((slideConfig, index) => {
                const slide = slides.find(s => s.id === slideConfig.id);
                if (!slide) return null;

                const isFirst = index === 0;
                const isLast = index === sortedConfig.length - 1;

                return (
                  <div
                    key={slide.id}
                    className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                      slideConfig.visible
                        ? 'bg-background border-border'
                        : 'bg-muted/50 border-muted opacity-60'
                    }`}
                  >
                    {/* Reorder Buttons */}
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => onMoveSlide(slide.id, 'up')}
                        disabled={isFirst}
                      >
                        <ChevronUp className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => onMoveSlide(slide.id, 'down')}
                        disabled={isLast}
                      >
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* Slide Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-muted-foreground">
                          {slide.id}
                        </span>
                        {!slideConfig.visible && (
                          <Badge variant="secondary" className="text-xs">
                            Hidden
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm font-medium truncate">
                        {slide.title}
                      </p>
                    </div>

                    {/* Visibility Toggle */}
                    <Button
                      variant={slideConfig.visible ? "default" : "outline"}
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      onClick={() => onToggleVisibility(slide.id)}
                    >
                      {slideConfig.visible ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};
