import { ReactNode, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, Info, ZoomIn, ZoomOut, Maximize2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RevealProvider, tryRevealNext, tryRevealPrev } from "@/contexts/RevealContext";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface PresentationLayoutProps {
  children: ReactNode;
  currentScreen: string;
  totalScreens: number;
  currentIndex: number;
  onNavigate: (index: number) => void;
  title: string;
  duration?: number;
  notes?: string;
  mode?: "presenter" | "participant" | "present";
  slideManager?: ReactNode;
  sessionCode?: string;
  sessionId?: string;
}

export const PresentationLayout = ({
  children,
  currentScreen,
  totalScreens,
  currentIndex,
  onNavigate,
  title,
  duration = 240,
  notes,
  mode = "presenter",
  slideManager,
  sessionCode,
  sessionId,
}: PresentationLayoutProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const isPresenter = mode === "presenter";
  const isPresent = mode === "present";
  const isParticipant = mode === "participant";

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 60000); // Update every minute
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}:${mins.toString().padStart(2, "0")}`;
  };

  const progress = (currentIndex / (totalScreens - 1)) * 100;
  const timeProgress = (elapsedTime / duration) * 100;

  const handleKeyPress = (e: KeyboardEvent) => {
    // Completely disable navigation in present mode (public viewers)
    if (isPresent) return;
    
    // Only presenter can navigate
    if (!isPresenter) return;
    
    // Don't handle keyboard shortcuts if user is typing in an input/textarea
    const target = e.target as HTMLElement;
    const isTyping = target.tagName === 'INPUT' || 
                     target.tagName === 'TEXTAREA' || 
                     target.isContentEditable;
    
    if (e.key === "ArrowRight" || e.key === " ") {
      if (!isTyping) {
        e.preventDefault();
        if (tryRevealNext()) return;
        if (currentIndex < totalScreens - 1) {
          onNavigate(currentIndex + 1);
        }
      }
    } else if (e.key === "ArrowLeft") {
      if (!isTyping) {
        e.preventDefault();
        if (tryRevealPrev()) return;
        if (currentIndex > 0) {
          onNavigate(currentIndex - 1);
        }
      }
    } else if (e.key === "=" || e.key === "+") {
      e.preventDefault();
      setZoom((prev) => Math.min(prev + 10, 200));
    } else if (e.key === "-") {
      e.preventDefault();
      setZoom((prev) => Math.max(prev - 10, 50));
    } else if (e.key === "0") {
      e.preventDefault();
      setZoom(100);
    }
  };
  
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 50));
  const handleZoomReset = () => setZoom(100);
  
  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error('Error attempting to enable fullscreen:', err);
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentIndex, totalScreens, onNavigate, isPresenter, isPresent]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      {/* Session Info Header - visible in present mode when session is active */}
      {isPresent && sessionCode && (
        <header className="fixed top-0 left-0 right-0 z-50 border-b bg-card/95 backdrop-blur-md px-6 py-2 flex items-center justify-center gap-4 shadow-lg">
          <Badge variant="outline" className="text-sm">
            <Users className="w-3 h-3 mr-1" />
            Join Code: <span className="font-mono font-bold ml-1">{sessionCode}</span>
          </Badge>
          {sessionId && (
            <>
              <span className="text-xs text-muted-foreground hidden sm:block">
                ai4all.joshpenzell.com/participate?code={sessionCode}
              </span>
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(`https://ai4all.joshpenzell.com/participate?code=${sessionCode}`)}`}
                alt="Join Session QR Code"
                className="h-14 w-14 border-2 border-border rounded"
              />
            </>
          )}
        </header>
      )}

      {/* Header - hidden in present mode */}
      {!isPresent && (
        <header className="border-b bg-card/80 backdrop-blur-sm px-6 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <h1 className="text-lg font-semibold text-foreground">{title}</h1>
            {sessionCode && (
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-sm">
                  Code: <span className="font-mono font-bold ml-1">{sessionCode}</span>
                </Badge>
                {sessionId && (
                  <>
                    <span className="text-xs text-muted-foreground">
                      ai4all.joshpenzell.com/participate?code={sessionCode}
                    </span>
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=${encodeURIComponent(`https://ai4all.joshpenzell.com/participate?code=${sessionCode}`)}`}
                      alt="Join Session QR Code"
                      className="h-12 w-12 border border-border rounded"
                    />
                  </>
                )}
              </div>
            )}
            <span className="text-sm text-muted-foreground">
              Screen {currentIndex + 1} of {totalScreens}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Slide Manager - presenter only */}
            {slideManager && isPresenter && slideManager}
            
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 border rounded-md px-2 py-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={handleZoomOut}
                disabled={zoom <= 50}
              >
                <ZoomOut className="h-3 w-3" />
              </Button>
              <span className="text-xs font-mono text-muted-foreground min-w-[3rem] text-center">
                {zoom}%
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={handleZoomIn}
                disabled={zoom >= 200}
              >
                <ZoomIn className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={toggleFullscreen}
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                <Maximize2 className="h-3 w-3" />
              </Button>
            </div>


            {/* Progress */}
            <div className="w-32">
              <Progress value={progress} className="h-2" />
            </div>

            {/* Navigation - presenter only, never in present mode */}
            {isPresenter && !isPresent && (
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => { if (!tryRevealPrev()) onNavigate(currentIndex - 1); }}
                  disabled={currentIndex === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => { if (!tryRevealNext()) onNavigate(currentIndex + 1); }}
                  disabled={currentIndex === totalScreens - 1}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Notes Sheet - presenter only */}
            {notes && isPresenter && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Info className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Speaker Notes</SheetTitle>
                    <SheetDescription>
                      Notes for screen: {currentScreen}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-4 prose prose-sm max-w-none">
                    <p className="text-foreground">{notes}</p>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </header>
      )}

      {/* Time Progress Bar - presenter only */}
      {isPresenter && !isPresent && (
        <Progress value={timeProgress} className="h-1 rounded-none" />
      )}

      {/* Main Content with Zoom */}
      <main className="flex-1 overflow-auto" style={{ paddingTop: isPresent && sessionCode ? '70px' : '0' }}>
        <div 
          className="max-w-7xl mx-auto p-8 md:p-12 transition-transform duration-300 origin-top w-full"
          style={{ 
            transform: `scale(${zoom / 100})`,
            minHeight: isPresent ? '100vh' : 'auto'
          }}
        >
          <div className="w-full overflow-x-hidden">
            <RevealProvider slideId={currentScreen}>{children}</RevealProvider>
          </div>
        </div>
      </main>

      {/* Footer Navigation - presenter only */}
      {isPresenter && !isPresent && (
        <footer className="border-t bg-card/80 backdrop-blur-sm px-6 py-4 flex items-center justify-between shadow-sm">
          <Button
            variant="outline"
            size="lg"
            onClick={() => { if (!tryRevealPrev()) onNavigate(currentIndex - 1); }}
            disabled={currentIndex === 0}
            className="font-semibold"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <span className="text-sm font-mono text-muted-foreground bg-muted px-4 py-2 rounded-full">
            {currentScreen}
          </span>

          <Button
            size="lg"
            onClick={() => { if (!tryRevealNext()) onNavigate(currentIndex + 1); }}
            disabled={currentIndex === totalScreens - 1}
            className="font-semibold"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </footer>
      )}
      
      {/* Minimal controls in present mode - floating bottom right */}
      {isPresent && (
        <div className="fixed bottom-4 right-4 flex items-center gap-2 bg-card/90 backdrop-blur-sm border rounded-lg px-3 py-2 shadow-lg">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleZoomOut}
            disabled={zoom <= 50}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-xs font-mono text-muted-foreground min-w-[3rem] text-center">
            {zoom}%
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleZoomIn}
            disabled={zoom >= 200}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
