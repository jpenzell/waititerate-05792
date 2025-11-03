import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CaseCard } from "@/components/blocks/CaseCard";
import { Brain, Sparkles, TrendingUp, Users } from "lucide-react";

export const AICognitiveProtheticScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="secondary" className="mb-4">
            AI as Enabler
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            AI as Cognitive Prosthetic
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            AI tools extend cognitive capabilities—like glasses extend vision
          </p>
        </div>

        {/* Core Concept */}
        <Card className="p-8 mb-12 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 animate-scale-in">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Brain className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">What's a Cognitive Prosthetic?</h2>
              <p className="text-lg text-muted-foreground mb-4">
                A tool that augments human cognitive abilities. Just as a wheelchair enables mobility 
                or glasses enable clear vision, AI can enable personalized learning at scale.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="p-3 bg-background rounded border border-primary/20">
                  <p className="font-semibold text-primary mb-1">ADHD</p>
                  <p className="text-sm text-muted-foreground">Gamification + immediate feedback (dopamine regulation)</p>
                </div>
                <div className="p-3 bg-background rounded border border-primary/20">
                  <p className="font-semibold text-primary mb-1">Autism</p>
                  <p className="text-sm text-muted-foreground">Predictable structure + clear rules</p>
                </div>
                <div className="p-3 bg-background rounded border border-primary/20">
                  <p className="font-semibold text-primary mb-1">Dyslexia</p>
                  <p className="text-sm text-muted-foreground">Text-to-speech + font adjustments</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Learning Platform Examples */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            AI-Powered Learning in Practice
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
                <h4 className="text-lg font-bold text-foreground">Khan Academy</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                AI-driven mastery-based progression: won't advance until 80% proficiency
              </p>
              <Badge className="bg-primary/10 text-primary border-primary/20">
                Adaptive Pacing
              </Badge>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
                <h4 className="text-lg font-bold text-foreground">Carnegie Learning</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                AI tutors provide scaffolded hints and adaptive feedback based on learner errors
              </p>
              <Badge className="bg-primary/10 text-primary border-primary/20">
                Personalized Support
              </Badge>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6 text-primary" />
                <h4 className="text-lg font-bold text-foreground">Duolingo</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Adaptive difficulty + spaced repetition algorithms adjust to individual retention patterns
              </p>
              <Badge className="bg-primary/10 text-primary border-primary/20">
                Memory Optimization
              </Badge>
            </Card>
          </div>
        </div>

        {/* Corporate Case Studies */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Neurodiversity Hiring Programs
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <CaseCard
              title="JPMorgan: Autism at Work"
              category="Financial Services"
              bullets={[
                "Created neurodiversity hiring program with structured onboarding",
                "90%+ retention rate across cybersecurity and data analytics roles",
                "Autistic analysts 30% more productive in pattern recognition tasks"
              ]}
              takeaway="Cognitive diversity strengthens security teams—autistic analysts spot errors others miss"
            />

            <CaseCard
              title="SAP: Autism at Work"
              category="Enterprise Software"
              bullets={[
                "Hired autistic QA testers with sensory-friendly workspaces",
                "30% faster QA task completion with higher bug detection rates",
                "Expanded program to 30+ countries due to success"
              ]}
              takeaway="Detail-oriented processing styles excel at repetitive, high-precision work"
            />

            <CaseCard
              title="Microsoft: Neurodiversity Hiring"
              category="Technology & Cloud Services"
              bullets={[
                "Redesigned hiring: skills-based assessments instead of traditional interviews",
                "92% of neurodivergent hires meet or exceed performance expectations",
                "Model adopted by 20+ Fortune 500 companies"
              ]}
              takeaway="Traditional hiring filtered out talent—accommodations leveled the playing field for innovation"
            />
          </div>
        </div>

        {/* Key Insight */}
        <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold text-foreground">AI Enables Personalization at Scale</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Before AI, personalizing learning for neurodivergent learners was <strong className="text-foreground">expensive and manual</strong>. 
              Now, AI can adapt content, pacing, and format in real-time for <strong className="text-primary">every learner</strong>.
            </p>
            <p className="text-base text-muted-foreground italic">
              The technology that helps 15-20% of learners thrive can now help 100%.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};