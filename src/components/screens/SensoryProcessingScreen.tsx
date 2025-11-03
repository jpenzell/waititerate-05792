import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Volume2, VolumeX, Eye, Sun, AlertCircle, Sparkles } from "lucide-react";
import { SlideHeader } from "@/components/SlideHeader";

interface SensoryProcessingScreenProps {
  isFacilitator?: boolean;
}

export const SensoryProcessingScreen = ({ isFacilitator = false }: SensoryProcessingScreenProps) => {
  const [step, setStep] = useState<"intro" | "experience" | "results">("intro");
  const [visualIntensity, setVisualIntensity] = useState(5);
  const [soundLevel, setSoundLevel] = useState(5);
  const [brightness, setBrightness] = useState(5);
  const [overwhelming, setOverwhelming] = useState(false);

  const totalLoad = visualIntensity + soundLevel + brightness;
  const isOverload = totalLoad > 20;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <SlideHeader slideNumber={5} totalSlides={14} estimatedMinutes={6} title="Sensory Processing Simulator" />

        {step === "intro" && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <Badge variant="secondary" className="mb-2">
                <Eye className="h-4 w-4 mr-2" />
                Experience Cognitive Difference
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground">
                The Sensory Overload Simulator
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                About 1 in 6 people experience <strong>sensory processing differences</strong>—where sounds, lights, or visual clutter become physically overwhelming.
              </p>
            </div>

            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Volume2 className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">The Experience</h3>
                    <p className="text-muted-foreground mb-4">
                      You'll control three sensory dimensions: visual complexity, sound intensity, and brightness.
                    </p>
                    <p className="text-muted-foreground">
                      Turn them up slowly and notice when it starts to feel uncomfortable—that's your <strong>cognitive load threshold.</strong>
                    </p>
                  </div>
                </div>

                <Button 
                  onClick={() => setStep("experience")} 
                  size="lg" 
                  className="w-full md:w-auto"
                >
                  Start Simulation
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-background/50 border border-border">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-accent mt-0.5" />
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">Why This Matters for Learning Design</p>
                  <p className="text-sm text-muted-foreground">
                    Autistic students, those with ADHD, or sensory processing disorder can't learn when environments are overwhelming. Busy slides, background music, or flickering animations aren't just distracting—they're <strong>cognitively painful.</strong>
                  </p>
                  <p className="text-xs text-muted-foreground italic mt-2">
                    Research: Dunn, W. (1997) — "The Impact of Sensory Processing Abilities on the Daily Lives of Young Children"
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {step === "experience" && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-foreground">Control the Sensory Load</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Adjust the sliders. When it feels overwhelming, you've found your threshold.
              </p>
            </div>

            <Card 
              className={`p-8 transition-all duration-300 ${
                isOverload 
                  ? 'bg-gradient-to-br from-red-500/20 to-orange-500/20 border-red-500/50 animate-pulse' 
                  : 'bg-gradient-to-br from-background to-accent/5'
              }`}
              style={{
                filter: `brightness(${100 + brightness * 5}%)`,
              }}
            >
              <div className="space-y-8">
                {/* Visual Complexity */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-primary" />
                      <span className="font-semibold text-foreground">Visual Complexity</span>
                    </div>
                    <span className="text-2xl font-bold text-primary">{visualIntensity}</span>
                  </div>
                  <Slider
                    value={[visualIntensity]}
                    onValueChange={(vals) => setVisualIntensity(vals[0])}
                    min={0}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                  <div 
                    className="h-32 rounded-lg border border-border transition-all duration-300"
                    style={{
                      background: `repeating-linear-gradient(
                        ${visualIntensity * 9}deg,
                        hsl(var(--primary)) 0px,
                        hsl(var(--accent)) ${20 - visualIntensity}px,
                        hsl(var(--background)) ${40 - visualIntensity * 2}px
                      )`,
                      opacity: 0.3 + (visualIntensity * 0.07)
                    }}
                  />
                </div>

                {/* Sound Level */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {soundLevel > 5 ? <Volume2 className="h-5 w-5 text-primary" /> : <VolumeX className="h-5 w-5 text-muted-foreground" />}
                      <span className="font-semibold text-foreground">Sound Intensity</span>
                    </div>
                    <span className="text-2xl font-bold text-primary">{soundLevel}</span>
                  </div>
                  <Slider
                    value={[soundLevel]}
                    onValueChange={(vals) => setSoundLevel(vals[0])}
                    min={0}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex items-center justify-center h-32 border border-border rounded-lg bg-background/50">
                    <p className="text-center text-muted-foreground text-sm">
                      {soundLevel === 0 && "🔇 Silence"}
                      {soundLevel > 0 && soundLevel <= 3 && "🔉 Quiet hum"}
                      {soundLevel > 3 && soundLevel <= 6 && "🔊 Moderate noise"}
                      {soundLevel > 6 && soundLevel <= 8 && "📢 Loud and busy"}
                      {soundLevel > 8 && "🚨 OVERWHELMING CHAOS"}
                    </p>
                  </div>
                </div>

                {/* Brightness */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sun className="h-5 w-5 text-primary" />
                      <span className="font-semibold text-foreground">Brightness</span>
                    </div>
                    <span className="text-2xl font-bold text-primary">{brightness}</span>
                  </div>
                  <Slider
                    value={[brightness]}
                    onValueChange={(vals) => setBrightness(vals[0])}
                    min={0}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Cognitive Load Meter */}
                <div className="pt-6 border-t border-border">
                  <div className="text-center space-y-4">
                    <p className="text-sm text-muted-foreground">Cognitive Load</p>
                    <div className="text-6xl font-bold" style={{ color: isOverload ? 'hsl(var(--destructive))' : 'hsl(var(--primary))' }}>
                      {totalLoad} / 30
                    </div>
                    {isOverload && (
                      <Badge variant="destructive" className="animate-pulse">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Sensory Overload
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={() => {
                      setOverwhelming(true);
                      setStep("results");
                    }}
                    variant={isOverload ? "destructive" : "secondary"}
                    className="flex-1"
                  >
                    This Feels Overwhelming
                  </Button>
                  <Button 
                    onClick={() => {
                      setOverwhelming(false);
                      setStep("results");
                    }}
                    className="flex-1"
                  >
                    I Could Handle More
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {step === "results" && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <Badge variant="secondary" className="mb-2">
                <Sparkles className="h-4 w-4 mr-2" />
                Your Sensory Profile
              </Badge>
              <h2 className="text-5xl font-bold text-foreground">
                Your Threshold: <span className="text-primary">{totalLoad}/30</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                {overwhelming 
                  ? "You likely have sensory sensitivity—common in neurodivergent populations." 
                  : "You have a high sensory threshold—you can tolerate more stimulation."}
              </p>
            </div>

            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">The Science</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      <strong>Sensory Processing Disorder:</strong> 1 in 20 people experience sensory input as overwhelming or distressing.
                    </p>
                    <p>
                      <strong>Autism & ADHD:</strong> Up to 90% of autistic individuals have sensory sensitivities—lights, sounds, textures feel "too much."
                    </p>
                    <p>
                      <strong>Cognitive Cost:</strong> When overwhelmed, the brain can't process new information—it's in survival mode.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">UDL Design Principles</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      ✓ <strong>Minimize clutter:</strong> Clean, uncluttered slides with ample white space
                    </p>
                    <p>
                      ✓ <strong>User control:</strong> Let students adjust brightness, turn off animations, or read transcripts instead of video
                    </p>
                    <p>
                      ✓ <strong>Quiet zones:</strong> Provide silent reading time, reduce background music
                    </p>
                    <p>
                      ✓ <strong>Predictability:</strong> Warn before loud sounds, bright flashes, or sudden changes
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {isFacilitator && (
              <div className="text-center">
                <Button onClick={() => {
                  setStep("intro");
                  setVisualIntensity(5);
                  setSoundLevel(5);
                  setBrightness(5);
                }} variant="outline">
                  Reset Exercise
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
