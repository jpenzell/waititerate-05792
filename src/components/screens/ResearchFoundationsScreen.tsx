import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Brain, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { Reveal, useRegisterReveals } from "@/contexts/RevealContext";

export const ResearchFoundationsScreen = () => {
  const [expandedArea, setExpandedArea] = useState<string | null>(null);
  useRegisterReveals(5);

  const researchAreas = [
    {
      icon: Brain,
      title: "Neurodiversity Research",
      finding: "Cognitive differences aren't deficits—they're natural human variation that drives innovation",
      studies: [
        {
          citation: "Armstrong, T. (2010). The Power of Neurodiversity",
          finding: "Reframes neurodivergence from deficit to design advantage"
        },
        {
          citation: "Baron-Cohen, S. (2017). Journal of Child Psychology and Psychiatry",
          finding: "Neurodiversity as paradigm shift: differences are natural variation"
        },
        {
          citation: "Zeman, A., et al. (2015). Lives without imagery — Congenital aphantasia",
          finding: "2-5% of people have no mental imagery—invisible cognitive difference"
        }
      ]
    },
    {
      icon: BookOpen,
      title: "Universal Design for Learning",
      finding: "Design for variation from the start—not retrofitted accommodations",
      studies: [
        {
          citation: "Rose, D. H., & Meyer, A. (2002). Teaching Every Student",
          finding: "Design for variation from the start, not retrofitted"
        },
        {
          citation: "CAST (2018). UDL Guidelines version 2.2",
          finding: "Three principles: representation, engagement, expression"
        },
        {
          citation: "Meyer, A., et al. (2014). UDL: Theory and Practice",
          finding: "UDL reduces barriers for all learners, not just those with disabilities"
        }
      ]
    },
    {
      icon: Users,
      title: "Cognitive Load & Accessibility",
      finding: "Working memory is limited—reduce cognitive barriers for everyone",
      studies: [
        {
          citation: "Sweller, J. (2011). Cognitive Load Theory",
          finding: "Extraneous cognitive load (clutter, sensory overwhelm) blocks learning"
        },
        {
          citation: "Barkley, R. A. (2010). ADHD: A Handbook",
          finding: "Time blindness affects 80% of people with ADHD"
        },
        {
          citation: "Dunn, W. (1997). Impact of Sensory Processing",
          finding: "Sensory processing differences make standard environments painful"
        }
      ]
    },
    {
      icon: Sparkles,
      title: "AI & Learning Design",
      finding: "AI can personalize at scale—but only if we design for cognitive diversity first",
      studies: [
        {
          citation: "Holmes, W., et al. (2019). AI in Education",
          finding: "AI can personalize—if we design for cognitive diversity from start"
        },
        {
          citation: "Luckin, R., et al. (2016). Intelligence Unleashed",
          finding: "AI acts as 'cognitive prosthetic' when designed inclusively"
        },
        {
          citation: "Baker, R. S., & Inventado, P. S. (2014). Educational Data Mining",
          finding: "Adaptive systems must account for neurodivergent data patterns"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 py-12 px-6 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="space-y-12 animate-fade-in">
          <div className="text-center space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold text-foreground">
              The science is settled.
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground max-w-4xl mx-auto">
              Every exercise tonight rests on decades of peer-reviewed research.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {researchAreas.map((area) => {
              const Icon = area.icon;
              const isExpanded = expandedArea === area.title;
              const idx = researchAreas.indexOf(area);
              return (
                <Reveal key={area.title} step={idx + 1}>
                <Card className="p-10 bg-gradient-to-br from-background to-primary/10 border-2 border-primary/20 hover:border-primary/40 transition-all h-full">
                  <div className="space-y-5">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-9 w-9 text-primary" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground flex-1">{area.title}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedArea(isExpanded ? null : area.title)}
                        className="shrink-0"
                      >
                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </Button>
                    </div>
                    <p className="text-xl md:text-2xl text-foreground/85 leading-snug">
                      {area.finding}
                    </p>
                    
                    {isExpanded && (
                      <div className="space-y-4 pt-4 border-t border-border animate-fade-in">
                        {area.studies.map((study, idx) => (
                          <div key={idx} className="bg-background/50 p-4 rounded-lg space-y-2">
                            <p className="text-sm font-mono text-muted-foreground">
                              {study.citation}
                            </p>
                            <p className="text-base text-foreground">
                              <strong>Finding:</strong> {study.finding}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
                </Reveal>
              );
            })}
          </div>

          <Reveal step={5}>
            <Card className="p-10 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30 text-center">
              <p className="text-3xl md:text-4xl font-semibold text-foreground leading-snug">
                Design for cognitive <span className="text-primary">diversity</span>,<br />
                not cognitive uniformity.
              </p>
            </Card>
          </Reveal>
        </div>
      </div>
    </div>
  );
};
