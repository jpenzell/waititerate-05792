import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const CurbCutQuizScreen = () => {
  const quizQuestions = [
    {
      question: "What percentage of ALL viewers use closed captions (not just deaf/hard-of-hearing)?",
    },
    {
      question: "How much does chunked content improve completion rates for everyone?",
    },
    {
      question: "What percentage of learners prefer multiple format options (text + audio + visual)?",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 py-12 px-6 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="secondary" className="mb-4 text-base px-4 py-2">
            Test the Principle
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Let's Test This Principle
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            On your phone: Guess the statistics about accessibility features
          </p>
        </div>

        <div className="space-y-6">
          {quizQuestions.map((q, idx) => (
            <Card key={idx} className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">{idx + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-2xl text-foreground font-semibold leading-relaxed">
                    {q.question}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
