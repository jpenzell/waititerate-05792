import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Brain, Sparkles, ExternalLink } from "lucide-react";

export const ResearchFoundationsScreen = () => {
  const researchAreas = [
    {
      icon: Brain,
      title: "Neurodiversity Research",
      studies: [
        {
          citation: "Armstrong, T. (2010). The Power of Neurodiversity: Unleashing the Advantages of Your Differently Wired Brain. Da Capo Press.",
          finding: "Reframes neurodivergence from deficit to design advantage—cognitive diversity drives innovation."
        },
        {
          citation: "Baron-Cohen, S. (2017). Editorial Perspective: Neurodiversity – a revolutionary concept for autism and psychiatry. Journal of Child Psychology and Psychiatry, 58(6), 744-747.",
          finding: "Proposes neurodiversity as paradigm shift: differences aren't disorders, they're natural variation."
        },
        {
          citation: "Zeman, A., Dewar, M., & Della Sala, S. (2015). Lives without imagery — Congenital aphantasia. Cortex, 73, 378-380.",
          finding: "Discovered aphantasia: 2-5% of people have no mental imagery—invisible cognitive difference."
        }
      ]
    },
    {
      icon: BookOpen,
      title: "Universal Design for Learning",
      studies: [
        {
          citation: "Rose, D. H., & Meyer, A. (2002). Teaching Every Student in the Digital Age: Universal Design for Learning. ASCD.",
          finding: "Foundational text: design for variation from the start, not retrofitted accommodations."
        },
        {
          citation: "CAST (2018). Universal Design for Learning Guidelines version 2.2. Retrieved from http://udlguidelines.cast.org",
          finding: "Codifies three core principles: multiple means of representation, engagement, and expression."
        },
        {
          citation: "Meyer, A., Rose, D. H., & Gordon, D. (2014). Universal Design for Learning: Theory and Practice. CAST Professional Publishing.",
          finding: "UDL reduces barriers for all learners, not just those with documented disabilities."
        }
      ]
    },
    {
      icon: Users,
      title: "Cognitive Load & Accessibility",
      studies: [
        {
          citation: "Sweller, J. (2011). Cognitive Load Theory. In J. P. Mestre & B. H. Ross (Eds.), Psychology of Learning and Motivation (Vol. 55, pp. 37-76). Academic Press.",
          finding: "Working memory is limited—extraneous cognitive load (clutter, sensory overwhelm) blocks learning."
        },
        {
          citation: "Barkley, R. A. (2010). Attention-Deficit Hyperactivity Disorder: A Handbook for Diagnosis and Treatment (4th ed.). Guilford Press.",
          finding: "Time blindness affects 80% of people with ADHD—invisible barrier to task management."
        },
        {
          citation: "Dunn, W. (1997). The Impact of Sensory Processing Abilities on the Daily Lives of Young Children and Their Families: A Conceptual Model. Infants & Young Children, 9(4), 23-35.",
          finding: "Sensory processing differences (autism, SPD) make standard environments cognitively painful."
        }
      ]
    },
    {
      icon: Sparkles,
      title: "AI & Learning Design",
      studies: [
        {
          citation: "Holmes, W., Bialik, M., & Fadel, C. (2019). Artificial Intelligence in Education: Promises and Implications for Teaching and Learning. Center for Curriculum Redesign.",
          finding: "AI can personalize learning at scale—but only if we design for cognitive diversity from the start."
        },
        {
          citation: "Luckin, R., Holmes, W., Griffiths, M., & Forcier, L. B. (2016). Intelligence Unleashed: An Argument for AI in Education. Pearson.",
          finding: "AI amplifies human cognition—acts as 'cognitive prosthetic' when designed inclusively."
        },
        {
          citation: "Baker, R. S., & Inventado, P. S. (2014). Educational Data Mining and Learning Analytics. In J. A. Larusson & B. White (Eds.), Learning Analytics: From Research to Practice (pp. 61-75). Springer.",
          finding: "Adaptive systems can detect patterns humans miss—but must account for neurodivergent data."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="mb-2">
              <BookOpen className="h-4 w-4 mr-2" />
              Academic Grounding
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              Standing on Giants' Shoulders
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These interactive experiences aren't just fun—they're built on <strong>decades of peer-reviewed research</strong> in neuroscience, learning science, and inclusive design.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {researchAreas.map((area) => {
              const Icon = area.icon;
              return (
                <Card key={area.title} className="p-6 bg-gradient-to-br from-background to-accent/5 border-2 border-primary/10 hover:border-primary/30 transition-all">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="h-7 w-7 text-primary flex-shrink-0" />
                      <h3 className="text-xl font-bold text-foreground">{area.title}</h3>
                    </div>

                    <div className="space-y-4">
                      {area.studies.map((study, idx) => (
                        <div key={idx} className="space-y-2 pb-4 border-b border-border last:border-0 last:pb-0">
                          <p className="text-xs text-muted-foreground font-mono bg-background/50 p-2 rounded">
                            {study.citation}
                          </p>
                          <p className="text-sm text-foreground">
                            <strong>Key Finding:</strong> {study.finding}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20">
            <div className="text-center space-y-4">
              <h3 className="text-3xl font-bold text-foreground">Why This Evidence Matters</h3>
              <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
                Every interactive exercise you just experienced is <strong>anchored in validated research.</strong> This isn't speculation—it's science that demands we design learning systems for <strong>cognitive diversity, not cognitive uniformity.</strong>
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-accent pt-4">
                <ExternalLink className="h-4 w-4" />
                <span>Visit this website anytime to access all research studies</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-background/50 border border-border">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">For NDLW 2025 Participants</p>
              <p className="text-sm text-muted-foreground">
                All research citations shown here will remain <strong>available on this website</strong> for future reference, including links to full texts (where open access) and recommended reading lists for each domain.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
