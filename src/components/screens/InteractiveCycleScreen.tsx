import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, RotateCw, TrendingUp, Zap, Target } from "lucide-react";

export const InteractiveCycleScreen = () => {
  const [step, setStep] = useState(0);
  const [metrics, setMetrics] = useState({
    engagement: 45,
    completion: 38,
    comprehension: 52,
    performance: 40
  });
  const [iteration, setIteration] = useState(1);

  const steps = [
    {
      title: "Launch Messy Module",
      description: "You've built a quick compliance training. It's not perfect, but it's done. Let's ship it.",
      action: "Deploy to 100 learners",
      icon: Play,
      color: "text-blue-500"
    },
    {
      title: "AI Measures Automatically",
      description: "Within hours, AI agents are tracking engagement, drop-off points, question patterns, and comprehension signals.",
      action: "View live metrics",
      icon: TrendingUp,
      color: "text-purple-500"
    },
    {
      title: "Identify the Problem",
      description: "Data shows 55% of learners abandon at Module 2. AI analysis reveals: language is too technical, no clear next steps.",
      action: "Review AI insights",
      icon: Target,
      color: "text-orange-500"
    },
    {
      title: "Fix Fast",
      description: "You simplify Module 2 language and add a checkpoint. This takes 2 hours. You redeploy. AI measures again.",
      action: "Deploy fix & measure",
      icon: Zap,
      color: "text-green-500"
    },
    {
      title: "Repeat",
      description: "Engagement jumps to 78%. Completion up to 71%. AI suggests next optimization. The cycle continues.",
      action: "Next iteration",
      icon: RotateCw,
      color: "text-primary"
    }
  ];

  const currentStep = steps[step];

  const handleAction = () => {
    if (step === 1) {
      // Simulate measurement
      setTimeout(() => {
        setMetrics({
          engagement: 45,
          completion: 38,
          comprehension: 52,
          performance: 40
        });
      }, 500);
    } else if (step === 3) {
      // Simulate improvement after fix
      setTimeout(() => {
        setMetrics({
          engagement: 78,
          completion: 71,
          comprehension: 82,
          performance: 75
        });
      }, 500);
    } else if (step === 4) {
      // Next iteration
      setIteration(prev => prev + 1);
      setStep(0);
      return;
    }
    
    if (step < steps.length - 1) {
      setStep(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setStep(0);
    setIteration(1);
    setMetrics({
      engagement: 45,
      completion: 38,
      comprehension: 52,
      performance: 40
    });
  };

  const Icon = currentStep.icon;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-12">
        <Badge className="mb-4">Interactive Demo</Badge>
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
          The Messy → Measure → Fix Cycle
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-light">
          Watch how AI-powered measurement enables rapid iteration
        </p>
      </div>

      {/* Iteration Counter */}
      <div className="text-center mb-8">
        <Badge variant="outline" className="text-lg px-6 py-2">
          Iteration {iteration}
        </Badge>
      </div>

      {/* Progress Stepper */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex justify-between items-center">
          {steps.map((s, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                idx <= step 
                  ? 'bg-primary border-primary text-white' 
                  : 'bg-muted border-muted text-muted-foreground'
              }`}>
                {idx + 1}
              </div>
              <span className={`text-xs mt-2 ${idx <= step ? 'text-foreground' : 'text-muted-foreground'}`}>
                {s.title.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Current Step Card */}
      <Card className="max-w-5xl mx-auto p-8 border-2 border-primary">
        <div className="flex items-start gap-6 mb-6">
          <div className={`p-4 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20`}>
            <Icon className={`h-10 w-10 ${currentStep.color}`} />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              {currentStep.title}
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              {currentStep.description}
            </p>
          </div>
        </div>

        {/* Metrics Dashboard (shows on step 1 and 3+) */}
        {step >= 1 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-2">Engagement</p>
              <p className="text-3xl font-bold text-primary mb-2">{metrics.engagement}%</p>
              <Progress value={metrics.engagement} className="h-2" />
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-2">Completion</p>
              <p className="text-3xl font-bold text-secondary mb-2">{metrics.completion}%</p>
              <Progress value={metrics.completion} className="h-2" />
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-2">Comprehension</p>
              <p className="text-3xl font-bold text-primary mb-2">{metrics.comprehension}%</p>
              <Progress value={metrics.comprehension} className="h-2" />
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-2">Performance</p>
              <p className="text-3xl font-bold text-secondary mb-2">{metrics.performance}%</p>
              <Progress value={metrics.performance} className="h-2" />
            </Card>
          </div>
        )}

        {/* Action Button */}
        <div className="flex gap-4 justify-center">
          <Button 
            size="lg"
            onClick={handleAction}
            className="text-lg px-8"
          >
            <currentStep.icon className="h-5 w-5 mr-2" />
            {currentStep.action}
          </Button>
          {step > 0 && (
            <Button 
              size="lg"
              variant="outline"
              onClick={handleReset}
              className="text-lg px-8"
            >
              <RotateCw className="h-5 w-5 mr-2" />
              Reset Demo
            </Button>
          )}
        </div>
      </Card>

      {/* Key Insight */}
      {step === 4 && (
        <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary animate-fade-in">
          <h3 className="text-2xl font-bold text-primary mb-4">
            What Just Happened?
          </h3>
          <ul className="space-y-3 text-foreground/80 text-lg">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">→</span>
              <span>You went from launch to optimized in <strong>days</strong>, not months</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">→</span>
              <span>Metrics improved <strong>40-80%</strong> through data-driven fixes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">→</span>
              <span>Zero surveys, focus groups, or expensive studies required</span>
            </li>
          </ul>
        </Card>
      )}
    </div>
  );
};