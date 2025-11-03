import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accessibility } from "lucide-react";

export const CurbCutIntroScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 py-12 px-6 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="secondary" className="mb-4 text-base px-4 py-2">
            Universal Design Principle
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            The Curb-Cut Effect
          </h1>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Designing for neurodivergent learners improves outcomes for <strong className="text-foreground">everyone</strong>
          </p>
        </div>

        {/* Origin Story */}
        <Card className="p-10 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 animate-scale-in">
          <div className="flex items-start gap-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Accessibility className="h-10 w-10 text-primary" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">The Original Curb Cut (1970s)</h2>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                Activists fought for sloped curbs to help wheelchair users. City planners called it a "special accommodation."
              </p>
              <p className="text-xl text-foreground leading-relaxed">
                <strong className="text-2xl">What happened?</strong> Everyone benefited: parents with strollers, travelers with luggage, 
                delivery workers, cyclists, elderly pedestrians—and yes, wheelchair users.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
