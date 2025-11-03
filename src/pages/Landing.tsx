import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { PresentationLayout } from "@/components/PresentationLayout";
import { useSlideConfig } from "@/hooks/useSlideConfig";
import { useRealtimeSession } from "@/hooks/useRealtimeSession";
import { LDTitleScreen } from "@/components/screens/LDTitleScreen";
import { WindshieldWipersScreen } from "@/components/screens/WindshieldWipersScreen";
import { ScarcityVsAbundanceScreen } from "@/components/screens/ScarcityVsAbundanceScreen";
import { PhotoCollectionScreen } from "@/components/screens/PhotoCollectionScreen";
import { HumanPatternsScreen } from "@/components/screens/HumanPatternsScreen";
import { AIPatternsScreen } from "@/components/screens/AIPatternsScreen";
import { NumericEstimateScreen } from "@/components/screens/NumericEstimateScreen";
import { AIDatapointsScreen } from "@/components/screens/AIDatapointsScreen";
import RehearsalNotPerformanceScreen from "@/components/screens/RehearsalNotPerformanceScreen";
import { MakeAMessScreen } from "@/components/screens/MakeAMessScreen";
import MeasureTheMessScreen from "@/components/screens/MeasureTheMessScreen";
import { InteractiveCycleScreen } from "@/components/screens/InteractiveCycleScreen";
import FreedomToTryScreen from "@/components/screens/FreedomToTryScreen";
import { ActOnDataScreen } from "@/components/screens/ActOnDataScreen";
import LiveRehearsalExerciseScreen from "@/components/screens/LiveRehearsalExerciseScreen";
import { LDTakeawaysScreen } from "@/components/screens/LDTakeawaysScreen";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Play } from "lucide-react";

const screens = [
  {
    id: "LD0.0",
    title: "Title - Don't Wait, Iterate",
    component: LDTitleScreen,
    duration: 2,
    notes: "Opening.",
  },
  {
    id: "LD0.1",
    title: "Windshield Wipers Question",
    component: WindshieldWipersScreen,
    duration: 2,
    notes: "Interactive question to introduce the measurement mindset.",
    hasPoll: true,
  },
  {
    id: "LD0.5.1",
    title: "Step 1: Photo Collection",
    component: PhotoCollectionScreen,
    duration: 2,
    notes: "Everyone takes a photo of their current feeling.",
  },
  {
    id: "LD0.5.2",
    title: "Step 2: Human Patterns",
    component: HumanPatternsScreen,
    duration: 2,
    notes: "Participants spot patterns across all photos.",
  },
  {
    id: "LD0.5.3",
    title: "Step 3: AI Patterns",
    component: AIPatternsScreen,
    duration: 2,
    notes: "AI reveals patterns it found.",
  },
  {
    id: "LD0.5.4",
    title: "Step 4: Data Point Estimates",
    component: NumericEstimateScreen,
    duration: 2,
    notes: "Human estimates: how many data points in ONE photo?",
  },
  {
    id: "LD0.5.5",
    title: "Step 5: Abundance Reveal",
    component: AIDatapointsScreen,
    duration: 2,
    notes: "AI reveals actual data point count.",
  },
  {
    id: "LD1.0",
    title: "The Paradigm Shift",
    component: ScarcityVsAbundanceScreen,
    duration: 4,
    notes: "Theory after experience: scarcity vs abundance.",
  },
  {
    id: "LD5.5",
    title: "From Scarcity to Abundance: The Technology Shift",
    component: MeasureTheMessScreen,
    duration: 7,
    notes: "Showcase real AI measurement tools: xAPI/LRS (Watershed, Learning Locker), AI tutors (Khanmigo, ChatGPT feedback), adaptive systems (Carnegie Learning). Key stat: xAPI increases data points from 5-10 to 50-100+ per learner. Show Duolingo's 750+ A/B tests per quarter as exemplar.",
  },
  {
    id: "LD4.0",
    title: "Make a Mess (On Purpose)",
    component: MakeAMessScreen,
    duration: 4,
    notes: "Challenge old beliefs. Click to reveal each principle. Give permission to ship imperfect work.",
  },
  {
    id: "LD6.5",
    title: "The Freedom to Try Anything",
    component: FreedomToTryScreen,
    duration: 6,
    notes: "Real examples: Duolingo ran 2,000+ experiments over 3 years. Coursera tests course imagery impact on belonging. Dutch retail company achieved 400% ROI through training experiments. These prove measurement enables bold experimentation.",
  },
  {
    id: "LD5.0",
    title: "Interactive Cycle Demo",
    component: InteractiveCycleScreen,
    duration: 6,
    notes: "Hands-on simulation. Walk through launch → measure → fix → repeat. Show live metrics improving.",
  },
  {
    id: "LD6.0",
    title: "The Trick: Acting On Data",
    component: ActOnDataScreen,
    duration: 4,
    notes: "Critical distinction: measurement abundance doesn't mean you know what to do—it means you can learn faster.",
  },
  {
    id: "LD7.0",
    title: "Your New Design Process",
    component: LDTakeawaysScreen,
    duration: 4,
    notes: "Four actionable shifts. Bridge to next session (Megan's Human-AI Collaboration for Insight Generation). End with Q&A prompt.",
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeSessionCode, setActiveSessionCode] = useState<string | null>(null);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  const { config } = useSlideConfig(screens);
  const { currentSlideId } = useRealtimeSession(activeSessionCode || undefined);

  const visibleScreens = useMemo(() => {
    const sortedConfig = [...config].sort((a, b) => a.order - b.order);
    return sortedConfig
      .filter(c => c.visible)
      .map(c => screens.find(s => s.id === c.id))
      .filter(Boolean) as typeof screens;
  }, [config]);

  // Check for active sessions on load
  useEffect(() => {
    const checkActiveSessions = async () => {
      const { data } = await supabase
        .from("presentation_sessions")
        .select("id, session_code")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (data) {
        setActiveSessionCode(data.session_code);
        setActiveSessionId(data.id);
      }
    };

    checkActiveSessions();

    // Listen for new sessions
    const channel = supabase
      .channel("public:presentation_sessions")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "presentation_sessions",
        },
        (payload) => {
          if (payload.eventType === "INSERT" && payload.new.is_active) {
            setActiveSessionCode(payload.new.session_code);
            setActiveSessionId(payload.new.id);
          } else if (payload.eventType === "UPDATE" && !payload.new.is_active) {
            setActiveSessionCode(null);
            setActiveSessionId(null);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Sync to presenter's current slide
  useEffect(() => {
    if (currentSlideId && activeSessionCode) {
      const index = visibleScreens.findIndex((s) => s.id === currentSlideId);
      if (index !== -1 && index !== currentIndex) {
        setCurrentIndex(index);
      }
    }
  }, [currentSlideId, activeSessionCode, visibleScreens]);

  useEffect(() => {
    if (visibleScreens[currentIndex]) {
      window.location.hash = visibleScreens[currentIndex].id;
    }
  }, [currentIndex, visibleScreens]);

  const CurrentComponent = visibleScreens[currentIndex]?.component;
  const currentScreen = visibleScreens[currentIndex];

  if (!currentScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <p className="text-xl text-muted-foreground">No active presentation</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ParticleBackground />
      
      {/* Watch/Participate Options - Top Right */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <Card className="p-4 bg-card/95 backdrop-blur-xl border-primary/30 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Play className="w-4 h-4 text-primary" />
            <p className="text-sm font-display font-bold text-card-foreground">Watching Live</p>
          </div>
          <Button
            onClick={() => navigate("/participate")}
            size="sm"
            variant="default"
            className="w-full mb-2"
          >
            <Users className="w-4 h-4 mr-2" />
            Join & Participate
          </Button>
          <Button
            onClick={() => navigate("/facilitator-setup")}
            size="sm"
            variant="outline"
            className="w-full text-xs"
          >
            Facilitator Login
          </Button>
        </Card>
      </div>

      <PresentationLayout
        currentScreen={currentScreen.id}
        totalScreens={visibleScreens.length}
        currentIndex={currentIndex}
        onNavigate={() => {}} // Disabled for public viewers
        title="AI for All Minds"
        duration={240}
        notes=""
        mode="present"
      >
        {(currentScreen.id === "LD0.5.1" || 
          currentScreen.id === "LD0.5.2" || 
          currentScreen.id === "LD0.5.3" || 
          currentScreen.id === "LD0.5.4" || 
          currentScreen.id === "LD0.5.5") ? (
          <CurrentComponent isFacilitator={true} sessionId={activeSessionId || undefined} />
        ) : currentScreen.id === "LD1.0" ? (
          <CurrentComponent sessionId={activeSessionId || undefined} />
        ) : (
          <CurrentComponent />
        )}
      </PresentationLayout>
    </>
  );
}
