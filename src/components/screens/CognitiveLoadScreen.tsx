import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, AlertCircle, CheckCircle2 } from "lucide-react";

export const CognitiveLoadScreen = () => {
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-destructive/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="secondary" className="mb-4">
            Cognitive Science in Practice
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Cognitive Load in Action
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Working memory can hold <strong>7±2 chunks</strong> at once (Miller's Law). 
            Design must respect this limit.
          </p>
        </div>

        {/* Key Principles */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="p-8 border-2 border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="h-8 w-8 text-primary" />
              <h3 className="font-bold text-foreground text-xl">Progressive Disclosure</h3>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              Don't show everything at once—reveal information as needed
            </p>
          </Card>

          <Card className="p-8 border-2 border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="h-8 w-8 text-primary" />
              <h3 className="font-bold text-foreground text-xl">Chunking</h3>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              Break complex information into digestible pieces
            </p>
          </Card>

          <Card className="p-8 border-2 border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="h-8 w-8 text-primary" />
              <h3 className="font-bold text-foreground text-xl">Reduce Extraneous Load</h3>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              Minimize visual clutter and distractions
            </p>
          </Card>
        </div>

        {/* Interactive Comparison Toggle */}
        <div className="text-center mb-8">
          <Button 
            onClick={() => setShowComparison(!showComparison)}
            size="lg"
            className="text-lg px-8 py-6"
          >
            {showComparison ? "Hide Comparison" : "Show Before & After Example"}
          </Button>
        </div>

        {showComparison && (
          <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
            {/* BAD Example */}
            <Card className="p-8 bg-destructive/5 border-destructive/20 border-2">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="h-8 w-8 text-destructive" />
                <h3 className="text-2xl font-bold text-destructive">High Cognitive Load</h3>
              </div>
              
              <div className="space-y-4 text-sm leading-relaxed">
                <p className="font-bold text-lg text-foreground animate-pulse">
                  🎉 WELCOME TO OUR AMAZING TRAINING MODULE! 🎉
                </p>
                <p className="text-foreground" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  In this comprehensive and extensive training session, you will learn about the fundamental principles of effective communication strategies in the workplace environment, including but not limited to: active listening techniques, nonverbal communication cues, written communication best practices, email etiquette guidelines, meeting facilitation skills, conflict resolution approaches, feedback delivery methods, presentation design principles, public speaking techniques, cross-cultural communication considerations, and remote collaboration tools.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge className="bg-red-500 animate-bounce">NEW!</Badge>
                  <Badge className="bg-blue-500 animate-bounce" style={{ animationDelay: '0.1s' }}>UPDATED!</Badge>
                  <Badge className="bg-green-500 animate-bounce" style={{ animationDelay: '0.2s' }}>HOT!</Badge>
                  <Badge className="bg-purple-500 animate-bounce" style={{ animationDelay: '0.3s' }}>TRENDING!</Badge>
                </div>
                <p className="text-muted-foreground text-xs italic">
                  Note: Please review all 47 pages of the prerequisite materials before proceeding. This training is mandatory for all employees in departments A through Z, including but not limited to full-time, part-time, contract, and temporary staff members.
                </p>
              </div>

              <div className="mt-6 p-4 bg-muted rounded">
                <p className="text-base font-semibold text-destructive mb-3">Problems:</p>
                <ul className="text-base space-y-2 text-muted-foreground leading-relaxed">
                  <li>• Dense paragraph (hard to scan)</li>
                  <li>• Multiple fonts and animations</li>
                  <li>• Unclear priority or focus</li>
                  <li>• Overwhelming amount of info at once</li>
                </ul>
              </div>
            </Card>

            {/* GOOD Example */}
            <Card className="p-8 bg-primary/5 border-primary/20 border-2">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-bold text-primary">Low Cognitive Load</h3>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-foreground">
                  Communication Skills
                </h4>
                <p className="text-muted-foreground text-sm">
                  Learn to communicate clearly and confidently at work.
                </p>
                
                <div className="space-y-3">
                  <div className="p-3 bg-background rounded border border-border">
                    <p className="font-semibold text-foreground mb-1">Module 1: Active Listening</p>
                    <p className="text-sm text-muted-foreground">15 minutes</p>
                  </div>
                  <div className="p-3 bg-background rounded border border-border">
                    <p className="font-semibold text-foreground mb-1">Module 2: Clear Writing</p>
                    <p className="text-sm text-muted-foreground">20 minutes</p>
                  </div>
                  <div className="p-3 bg-background rounded border border-border">
                    <p className="font-semibold text-foreground mb-1">Module 3: Effective Meetings</p>
                    <p className="text-sm text-muted-foreground">25 minutes</p>
                  </div>
                </div>

                <Button className="w-full mt-4">Start Module 1</Button>
              </div>

              <div className="mt-6 p-4 bg-muted rounded">
                <p className="text-base font-semibold text-primary mb-3">Improvements:</p>
                <ul className="text-base space-y-2 text-muted-foreground leading-relaxed">
                  <li>• Clear hierarchy (title → action)</li>
                  <li>• Chunked into 3 modules</li>
                  <li>• Single font, minimal animation</li>
                  <li>• Scannable structure</li>
                </ul>
              </div>
            </Card>
          </div>
        )}

        {/* Key Takeaway */}
        <Card className="p-8 mt-12 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold text-foreground">This Is Structured Freedom in Practice</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The "good" example provides <strong className="text-primary">structure</strong> (clear modules, time estimates) 
              while maintaining <strong className="text-accent">freedom</strong> (learner chooses when to start). 
              It reduces cognitive load for <strong className="text-foreground">everyone</strong>.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};