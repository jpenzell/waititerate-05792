import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RevealCard } from "@/components/blocks/RevealCard";

interface CurbCutQuizScreenProps {
  isFacilitator?: boolean;
}

export const CurbCutQuizScreen = ({ isFacilitator = false }: CurbCutQuizScreenProps) => {
  const quizQuestions = [
    {
      question: "What percentage of ALL viewers use closed captions (not just deaf/hard-of-hearing)?",
      answer: (
        <div className="space-y-4">
          <div className="text-7xl font-bold text-primary text-center mb-4">71%</div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Designed for deaf/hard-of-hearing, but ESL learners, people in noisy environments, and those with auditory processing differences also benefit
          </p>
        </div>
      )
    },
    {
      question: "How much does chunked content improve completion rates for everyone?",
      answer: (
        <div className="space-y-4">
          <div className="text-7xl font-bold text-primary text-center mb-4">30%</div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Designed for ADHD and working memory differences, but reduces cognitive load for all learners
          </p>
        </div>
      )
    },
    {
      question: "What percentage of learners prefer multiple format options (text + audio + visual)?",
      answer: (
        <div className="space-y-4">
          <div className="text-7xl font-bold text-primary text-center mb-4">80%+</div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Designed for dyslexia and visual processing differences, but benefits all learning styles
          </p>
        </div>
      )
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
            Let's Test This Principle
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {isFacilitator ? "Click to reveal each answer" : "Guess the statistics about accessibility features"}
          </p>
        </div>

        <div className="space-y-6">
          {quizQuestions.map((q, idx) => (
            <div key={idx} className="animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
              <RevealCard
                question={q.question}
                answer={q.answer}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
