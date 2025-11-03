import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PollWidget } from "@/components/PollWidget";

interface CurbCutQuizScreenProps {
  isFacilitator?: boolean;
  sessionId?: string;
  userId?: string;
}

export const CurbCutQuizScreen = ({ 
  isFacilitator = false,
  sessionId,
  userId 
}: CurbCutQuizScreenProps) => {
  const quizQuestions = [
    {
      id: "captions",
      question: "What percentage of ALL viewers use closed captions (not just deaf/hard-of-hearing)?",
      options: ["20%", "45%", "71%", "85%"]
    },
    {
      id: "chunked",
      question: "How much does chunked content improve completion rates for everyone?",
      options: ["10%", "30%", "50%", "75%"]
    },
    {
      id: "formats",
      question: "What percentage of learners prefer multiple format options (text + audio + visual)?",
      options: ["40%", "60%", "80%+", "95%"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 py-12 px-6">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="secondary" className="mb-4 text-base px-4 py-2">
            Test the Principle
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Guess the Statistics
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {isFacilitator ? "Participants are answering on their phones" : "Answer each question on your phone"}
          </p>
        </div>

        <div className="space-y-12">
          {quizQuestions.map((q, idx) => (
            <Card key={q.id} className="p-10 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="space-y-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary">{idx + 1}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground leading-relaxed flex-1">
                    {q.question}
                  </h3>
                </div>

                {sessionId && userId && (
                  <PollWidget
                    sessionId={sessionId}
                    slideId={`LD1.0-Quiz-${q.id}`}
                    userId={userId}
                    isPresenter={isFacilitator}
                  />
                )}

                {!sessionId && (
                  <div className="grid grid-cols-2 gap-4">
                    {q.options.map((option) => (
                      <Card key={option} className="p-6 bg-background border-2 border-border hover:border-primary/40 transition-all cursor-pointer">
                        <p className="text-xl font-semibold text-foreground text-center">{option}</p>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
