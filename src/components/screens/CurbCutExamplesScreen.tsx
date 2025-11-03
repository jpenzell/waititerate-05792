import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, CheckCircle2 } from "lucide-react";

export const CurbCutExamplesScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="secondary" className="mb-4 text-base px-4 py-2">
            Real-World Examples
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            Learning Design "Curb Cuts"
          </h1>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Features designed for neurodivergent learners that <strong className="text-foreground">everyone</strong> now uses
          </p>
        </div>

        {/* Three Examples */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Closed Captions */}
          <Card className="p-10 hover:shadow-xl transition-all border-2 border-primary/20">
            <div className="mb-8">
              <Badge className="bg-primary/10 text-primary border-primary/20 text-lg px-4 py-2">
                Closed Captions
              </Badge>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-8 w-8 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground text-xl mb-2">Designed for:</p>
                  <p className="text-lg text-muted-foreground leading-relaxed">Deaf/hard-of-hearing learners</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="h-8 w-8 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground text-xl mb-2">Also helps:</p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    ESL learners, noisy environments, auditory processing differences
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-3xl font-bold text-accent">71%</p>
                <p className="text-base text-muted-foreground">of all viewers use captions</p>
              </div>
            </div>
          </Card>

          {/* Chunked Content */}
          <Card className="p-10 hover:shadow-xl transition-all border-2 border-primary/20">
            <div className="mb-8">
              <Badge className="bg-primary/10 text-primary border-primary/20 text-lg px-4 py-2">
                Chunked Content
              </Badge>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-8 w-8 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground text-xl mb-2">Designed for:</p>
                  <p className="text-lg text-muted-foreground leading-relaxed">ADHD, working memory differences</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="h-8 w-8 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground text-xl mb-2">Also helps:</p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Everyone's cognitive load, mobile learners
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-3xl font-bold text-accent">30%</p>
                <p className="text-base text-muted-foreground">better completion rates</p>
              </div>
            </div>
          </Card>

          {/* Multiple Representations */}
          <Card className="p-10 hover:shadow-xl transition-all border-2 border-primary/20">
            <div className="mb-8">
              <Badge className="bg-primary/10 text-primary border-primary/20 text-lg px-4 py-2">
                Multiple Formats
              </Badge>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-8 w-8 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground text-xl mb-2">Designed for:</p>
                  <p className="text-lg text-muted-foreground leading-relaxed">Dyslexia, visual processing</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="h-8 w-8 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground text-xl mb-2">Also helps:</p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    All learning styles, reinforcement
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-3xl font-bold text-accent">80%+</p>
                <p className="text-base text-muted-foreground">prefer multiple formats</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom Message */}
        <Card className="mt-12 p-10 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              The Pattern
            </h3>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              What starts as <strong className="text-primary">accommodation</strong> becomes <strong className="text-accent">preferred practice</strong> for everyone
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
