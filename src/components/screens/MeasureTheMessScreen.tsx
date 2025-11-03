import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Zap, Brain } from "lucide-react";
import { motion } from "framer-motion";

export const MeasureTheMessScreen = () => {
  const [activeTab, setActiveTab] = useState<'scorm' | 'xapi' | 'ai'>('scorm');

  return (
    <div className="h-screen flex flex-col items-center justify-center p-8 animate-fade-in">
      <div className="text-center mb-12 max-w-5xl px-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          From Scarcity to Abundance: The Technology Shift
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          From 5-10 data points per learner to unlimited
        </p>
      </div>

      {/* Technology Timeline */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl w-full mb-8">
        <Card 
          className={`p-6 cursor-pointer transition-all ${activeTab === 'scorm' ? 'border-primary border-2 scale-105' : 'opacity-60 hover:opacity-80'}`}
          onClick={() => setActiveTab('scorm')}
        >
          <div className="text-center">
            <Database className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-bold mb-2">SCORM Era</h3>
            <Badge variant="outline" className="mb-4">2000-2015</Badge>
            <p className="text-sm text-muted-foreground">
              5-10 data points per learner
            </p>
          </div>
        </Card>

        <Card 
          className={`p-6 cursor-pointer transition-all ${activeTab === 'xapi' ? 'border-primary border-2 scale-105' : 'opacity-60 hover:opacity-80'}`}
          onClick={() => setActiveTab('xapi')}
        >
          <div className="text-center">
            <Zap className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-2">xAPI + LRS</h3>
            <Badge variant="outline" className="mb-4">2015-2023</Badge>
            <p className="text-sm text-muted-foreground">
              50-100+ data points per learner
            </p>
          </div>
        </Card>

        <Card 
          className={`p-6 cursor-pointer transition-all ${activeTab === 'ai' ? 'border-accent border-2 scale-105' : 'opacity-60 hover:opacity-80'}`}
          onClick={() => setActiveTab('ai')}
        >
          <div className="text-center">
            <Brain className="w-12 h-12 mx-auto mb-4 text-accent" />
            <h3 className="text-xl font-bold mb-2">AI Era</h3>
            <Badge variant="outline" className="mb-4">2024+</Badge>
            <p className="text-sm text-muted-foreground">
              Unlimited data extraction
            </p>
          </div>
        </Card>
      </div>

      {/* Content for each tab */}
      <div className="max-w-5xl w-full">
        {activeTab === 'scorm' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="p-8 bg-muted/50">
              <h3 className="text-2xl font-bold mb-4">SCORM: The Old Standard</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📦</div>
                  <div>
                    <h4 className="font-bold mb-1">Limited Data Points</h4>
                    <p className="text-muted-foreground">
                      Completion status, time spent, quiz scores, pass/fail. That's about it.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🔒</div>
                  <div>
                    <h4 className="font-bold mb-1">Trapped in the LMS</h4>
                    <p className="text-muted-foreground">
                      Data stays locked in whatever learning management system you're using
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">❓</div>
                  <div>
                    <h4 className="font-bold mb-1">Measurement Scarcity</h4>
                    <p className="text-muted-foreground">
                      With so little data, you couldn't afford to take risks. Every launch felt like a gamble.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'xapi' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="p-8 bg-primary/5 border-primary/20">
              <h3 className="text-2xl font-bold mb-4">xAPI + LRS: 10x More Data</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📊</div>
                  <div>
                    <h4 className="font-bold mb-1">Rich Experience Tracking</h4>
                    <p className="text-muted-foreground">
                      Clicks, hovers, pause points, replays, skip patterns, path taken, resources accessed—50-100+ data points per learner
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🔓</div>
                  <div>
                    <h4 className="font-bold mb-1">Learning Record Stores (LRS)</h4>
                    <p className="text-muted-foreground">
                      Data flows anywhere: Watershed, Learning Locker, your own database
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🚀</div>
                  <div>
                    <h4 className="font-bold mb-1">This Changed Everything</h4>
                    <p className="text-muted-foreground">
                      Suddenly you could see WHERE learners struggled, HOW they engaged, WHAT they skipped. Measurement abundance began.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'ai' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="p-8 bg-accent/5 border-accent/20">
              <h3 className="text-2xl font-bold mb-4">AI: Infinite Measurement</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🤖</div>
                  <div>
                    <h4 className="font-bold mb-1">AI Tutors & Adaptive Systems</h4>
                    <p className="text-muted-foreground">
                      Khanmigo, ChatGPT feedback, Carnegie Learning—real-time coaching with conversational insights
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <h4 className="font-bold mb-1">Extract Data From Anything</h4>
                    <p className="text-muted-foreground">
                      Photos, audio, video, text, drawings—AI turns unstructured input into structured insights
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">∞</div>
                  <div>
                    <h4 className="font-bold mb-1">True Abundance</h4>
                    <p className="text-muted-foreground">
                      The limit isn't technology anymore—it's your imagination. Let's prove it with a photo...
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      {activeTab === 'ai' && (
        <div className="mt-8 text-center">
          <p className="text-xl text-primary font-semibold animate-pulse">
            → Next: See AI measurement abundance in action
          </p>
        </div>
      )}
    </div>
  );
};

export default MeasureTheMessScreen;
