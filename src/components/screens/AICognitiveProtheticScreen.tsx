import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles, Glasses, Accessibility } from "lucide-react";

export const AICognitiveProtheticScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12 px-6 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="secondary" className="mb-6 text-lg px-6 py-3">
            AI as Enabler
          </Badge>
          <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-8">
            AI as Cognitive Prosthetic
          </h1>
          <p className="text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            AI tools extend cognitive capabilities—<strong className="text-foreground">like glasses extend vision</strong>
          </p>
        </div>

        {/* Core Analogy */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-10 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <Glasses className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-4">Glasses</h3>
            <p className="text-xl text-muted-foreground">Extend Vision</p>
          </Card>

          <Card className="p-10 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <Accessibility className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-4">Mobility Aid</h3>
            <p className="text-xl text-muted-foreground">Enable Mobility</p>
          </Card>

          <Card className="p-10 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <Brain className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-4">AI</h3>
            <p className="text-xl text-muted-foreground">Augment Cognition</p>
          </Card>
        </div>

        {/* Key Examples */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="p-8 bg-gradient-to-br from-background to-primary/5 border-2 border-primary/20">
            <div className="text-center space-y-4">
              <Sparkles className="h-12 w-12 text-primary mx-auto" />
              <h4 className="text-2xl font-bold text-foreground">ADHD</h4>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Gamification + immediate feedback
              </p>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-background to-primary/5 border-2 border-primary/20">
            <div className="text-center space-y-4">
              <Brain className="h-12 w-12 text-primary mx-auto" />
              <h4 className="text-2xl font-bold text-foreground">Autism</h4>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Predictable structure + clear rules
              </p>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-background to-primary/5 border-2 border-primary/20">
            <div className="text-center space-y-4">
              <Sparkles className="h-12 w-12 text-primary mx-auto" />
              <h4 className="text-2xl font-bold text-foreground">Dyslexia</h4>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Text-to-speech + font adjustments
              </p>
            </div>
          </Card>
        </div>

        {/* Key Insight */}
        <Card className="p-12 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30">
          <div className="text-center space-y-6">
            <h3 className="text-4xl font-bold text-foreground">AI Enables Personalization at Scale</h3>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Before AI, personalizing for neurodivergent learners was <strong className="text-foreground">expensive and manual</strong>. 
              Now AI adapts content, pacing, and format in real-time for <strong className="text-primary">every learner</strong>.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};