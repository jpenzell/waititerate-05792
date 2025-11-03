import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export const CurbCutResultsScreen = () => {
  const results = [
    {
      question: "What percentage of ALL viewers use closed captions?",
      answer: "71%",
      context: "Designed for deaf/hard-of-hearing, but ESL learners, people in noisy environments, and those with auditory processing differences also benefit"
    },
    {
      question: "How much does chunked content improve completion rates?",
      answer: "30%",
      context: "Designed for ADHD and working memory differences, but reduces cognitive load for all learners"
    },
    {
      question: "What percentage prefer multiple format options?",
      answer: "80%+",
      context: "Designed for dyslexia and visual processing differences, but benefits all learning styles"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            The Reality: Designed for 15-20%, Used by 80%+
          </h2>
        </div>
        
        <div className="space-y-8 mb-12">
          {results.map((result, idx) => (
            <Card key={idx} className="p-10 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary">{idx + 1}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{result.question}</h3>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {result.context}
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-7xl font-bold text-primary mb-4">{result.answer}</div>
                  <Badge className="bg-accent/20 text-accent border-accent/30 text-lg px-4 py-2">
                    Actual Data
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Key Principle */}
        <Card className="p-12 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30 animate-scale-in">
          <div className="text-center space-y-6">
            <h3 className="text-4xl font-bold text-foreground">The Principle</h3>
            <div className="flex items-center justify-center gap-6 text-3xl font-semibold flex-wrap">
              <span className="text-primary">Design for the Margins</span>
              <ArrowRight className="h-10 w-10 text-accent" />
              <span className="text-accent">Improve the Center</span>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              When you solve for cognitive diversity, you create better learning for everyone.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
