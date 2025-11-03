import { Zap, BarChart3 } from "lucide-react";
import { useLocation } from "react-router-dom";

export const LDTitleScreen = () => {
  const location = useLocation();
  const showNavHint = location.pathname === "/facilitator";
  return (
    <div className="h-screen w-full relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background patterns */}
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      <div className="absolute inset-0 dot-pattern opacity-20"></div>
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      
      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-8 py-6 animate-fade-in">
        <div className="text-center space-y-5 max-w-6xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 glass-effect rounded-full mb-4 animate-scale-in border border-primary/20">
            <BarChart3 className="w-5 h-5 text-accent" />
            <span className="text-foreground font-semibold text-lg font-mono">AI FOR ALL MINDS</span>
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
          </div>
          
          {/* Main Title */}
          <div className="space-y-3">
            <h1 className="text-5xl md:text-7xl font-bold gradient-text leading-tight pb-2 animate-slide-in tracking-tight">
              AI for<br/>All Minds
            </h1>
            
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-primary via-accent to-primary rounded-full glow-primary"></div>
          </div>
          
          {/* Subtitle */}
          <h2 className="text-xl md:text-3xl font-medium text-foreground/90 animate-slide-in max-w-4xl mx-auto leading-relaxed">
            Lessons from Neurodiversity to<br/>
            <span className="text-accent">Transform Learning</span>
          </h2>
          
          {/* Key Message */}
          <div className="pt-4 max-w-3xl mx-auto">
            <div className="glass-effect border border-primary/10 rounded-2xl p-8 space-y-4">
              <p className="text-lg text-muted-foreground">
                How designing with cognitive difference unlocks innovation for everyone
              </p>
              
              <div className="py-2">
                <Zap className="w-6 h-6 mx-auto text-accent" />
              </div>
              
              <p className="text-base text-foreground/80 italic">
                "Structured freedom" transforms learning into<br/>adaptive, inclusive, and systemic change
              </p>
            </div>
          </div>

          {/* Speaker Info */}
          <div className="pt-4">
            <p className="text-base text-muted-foreground font-mono">
              JOSH PENZELL<br/>
              <span className="text-sm text-muted-foreground/70">Founder & CEO • Imagination Applied</span><br/>
              <span className="text-xs text-muted-foreground/60">Diagnosed with autism and ADD at 39</span>
            </p>
          </div>

          {/* Navigation hint (facilitator only) */}
          {showNavHint && (
            <div className="pt-6 space-y-3">
    <div className="flex items-center justify-center gap-3 text-muted-foreground">
      <kbd className="px-3 py-1.5 text-sm font-mono bg-secondary rounded-lg border border-border glow-primary">←</kbd>
      <kbd className="px-3 py-1.5 text-sm font-mono bg-secondary rounded-lg border border-border glow-primary">→</kbd>
      <span className="text-sm font-mono">or</span>
      <kbd className="px-4 py-1.5 text-sm font-mono bg-secondary rounded-lg border border-border glow-primary">SPACE</kbd>
      <span className="text-sm font-mono">to navigate</span>
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
};
