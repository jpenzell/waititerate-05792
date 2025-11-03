import { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PresentationLayout } from "@/components/PresentationLayout";
import { PollWidget } from "@/components/PollWidget";
import { useSlideConfig } from "@/hooks/useSlideConfig";
import { useAuth } from "@/hooks/useAuth";
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
import { LogOut } from "lucide-react";
import { AIAssistant } from "@/components/AIAssistant";
import { AccessibilityControls } from "@/components/AccessibilityControls";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { ParticipantInstructions } from "@/components/ParticipantInstructions";

const screens = [
  {
    id: "LD0.0",
    title: "Title - Don't Wait, Iterate",
    component: LDTitleScreen,
    duration: 2,
  },
  {
    id: "LD0.1",
    title: "Windshield Wipers Question",
    component: WindshieldWipersScreen,
    duration: 2,
    hasPoll: true,
  },
  {
    id: "LD0.5.1",
    title: "Step 1: Photo Collection",
    component: PhotoCollectionScreen,
    duration: 2,
  },
  {
    id: "LD0.5.2",
    title: "Step 2: Human Patterns",
    component: HumanPatternsScreen,
    duration: 2,
  },
  {
    id: "LD0.5.3",
    title: "Step 3: AI Patterns",
    component: AIPatternsScreen,
    duration: 2,
  },
  {
    id: "LD0.5.4",
    title: "Step 4: Data Point Estimates",
    component: NumericEstimateScreen,
    duration: 2,
  },
  {
    id: "LD0.5.5",
    title: "Step 5: Abundance Reveal",
    component: AIDatapointsScreen,
    duration: 2,
  },
  {
    id: "LD5.5",
    title: "From Scarcity to Abundance: The Technology Shift",
    component: MeasureTheMessScreen,
    duration: 7,
    hasPoll: true,
  },
  {
    id: "LD1.0",
    title: "The Paradigm Shift",
    component: ScarcityVsAbundanceScreen,
    duration: 4,
    hasPoll: true,
  },
  {
    id: "LD4.0",
    title: "Make a Mess (On Purpose)",
    component: MakeAMessScreen,
    duration: 4,
  },
  {
    id: "LD6.5",
    title: "The Freedom to Try Anything",
    component: FreedomToTryScreen,
    duration: 6,
  },
  {
    id: "LD5.0",
    title: "Interactive Cycle Demo",
    component: InteractiveCycleScreen,
    duration: 6,
  },
  {
    id: "LD6.0",
    title: "The Trick: Acting On Data",
    component: ActOnDataScreen,
    duration: 4,
  },
  {
    id: "LD7.0",
    title: "Your New Design Process",
    component: LDTakeawaysScreen,
    duration: 4,
  },
];

export default function Participate() {
  const navigate = useNavigate();
  const { user, loading, displayName, signOut } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionCode, setSessionCode] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const [keyboardHintsVisible, setKeyboardHintsVisible] = useState(true);
  const [hideParticles, setHideParticles] = useState(false);
  
  // Support both 'code' (from QR codes) and 'session' parameters
  const urlSessionCode = searchParams.get("code") || searchParams.get("session");
  const { currentSlideId } = useRealtimeSession(sessionCode || undefined);

  const { config } = useSlideConfig(screens);

  const visibleScreens = useMemo(() => {
    const sortedConfig = [...config].sort((a, b) => a.order - b.order);
    return sortedConfig
      .filter(c => c.visible)
      .map(c => screens.find(s => s.id === c.id))
      .filter(Boolean) as typeof screens;
  }, [config]);

  useEffect(() => {
    if (!loading && !user) {
      const redirectPath = urlSessionCode ? `/auth?code=${urlSessionCode}` : "/auth";
      navigate(redirectPath);
    }
  }, [user, loading, navigate, urlSessionCode]);

  // Auto-join session if URL has session code
  useEffect(() => {
    if (urlSessionCode && !sessionCode && user) {
      const joinSessionAuto = async () => {
        const { data, error } = await supabase
          .from("presentation_sessions")
          .select("*")
          .eq("session_code", urlSessionCode.toUpperCase())
          .eq("is_active", true)
          .single();

        if (data && !error) {
          setSessionId(data.id);
          setSessionCode(data.session_code);
          toast.success("Joined session!");
        } else {
          toast.error("Session not found or inactive");
          navigate("/");
        }
      };
      joinSessionAuto();
    }
  }, [urlSessionCode, sessionCode, user]);

  // Sync to presenter's current slide
  useEffect(() => {
    if (currentSlideId && sessionCode) {
      const index = visibleScreens.findIndex((s) => s.id === currentSlideId);
      if (index !== -1 && index !== currentIndex) {
        console.log('Participant syncing to slide:', currentSlideId, 'index:', index);
        setCurrentIndex(index);
        window.location.hash = currentSlideId;
      }
    }
  }, [currentSlideId, sessionCode, visibleScreens]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  const CurrentComponent = visibleScreens[currentIndex]?.component;
  const currentScreen = visibleScreens[currentIndex];

  if (!currentScreen || !sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8 bg-background/80 backdrop-blur-xl border-primary/20 text-center">
          <p className="text-xl text-muted-foreground mb-4">No active session</p>
          <Button onClick={() => navigate("/")} className="bg-gradient-primary">
            Return to Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <>
      {!hideParticles && <ParticleBackground />}
      
      {/* Accessibility Controls */}
      <AccessibilityControls 
        onSettingsChange={(settings) => {
          setKeyboardHintsVisible(settings.keyboardHintsVisible);
          setHideParticles(settings.hideParticles);
        }}
      />
      
      {/* Keyboard Shortcuts */}
      <KeyboardShortcuts 
        visible={keyboardHintsVisible}
        onNavigate={() => {}} // Participant can't navigate manually
      />
      
      {/* Progress Indicator */}
      <ProgressIndicator 
        currentIndex={currentIndex}
        totalSlides={visibleScreens.length}
        currentTitle={currentScreen.title}
        estimatedTimeRemaining={
          visibleScreens.slice(currentIndex).reduce((sum, s) => sum + (s.duration || 0), 0)
        }
      />
      
      {/* Participant Instructions for Interactive Slides */}
      <ParticipantInstructions 
        slideId={currentScreen.id}
        isInteractive={
          currentScreen.id === "LD0.5.1" || 
          currentScreen.id === "LD0.5.2" || 
          currentScreen.id === "LD0.5.3" || 
          currentScreen.id === "LD0.5.4" ||
          currentScreen.id === "LD0.5.6" ||
          currentScreen.id === "LD0.5.7" ||
          currentScreen.id === "LD0.5.8"
        }
      />
      
      {/* Participant Info - Top Right */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {displayName && (
          <Card className="p-3 bg-background/80 backdrop-blur-xl border-primary/20">
            <p className="text-sm text-muted-foreground">Participating as</p>
            <p className="font-display font-bold text-primary">{displayName}</p>
          </Card>
        )}
        
        <Button
          onClick={handleSignOut}
          variant="outline"
          size="sm"
          className="w-full border-primary/20"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Leave Session
        </Button>
      </div>

      <PresentationLayout
        currentScreen={currentScreen.id}
        totalScreens={visibleScreens.length}
        currentIndex={currentIndex}
        onNavigate={() => {}} // Controlled by presenter
        title="Don't Wait, Iterate"
        duration={240}
        notes=""
        mode="participant"
      >
        <div className="space-y-6">
          {/* Interactive screens - participants engage here */}
          {(currentScreen.id === "LD0.5.1" || 
            currentScreen.id === "LD0.5.2" || 
            currentScreen.id === "LD0.5.3" || 
            currentScreen.id === "LD0.5.4" || 
            currentScreen.id === "LD0.5.5") ? (
            <CurrentComponent isFacilitator={false} sessionId={sessionId || undefined} />
          ) : currentScreen.id === "LD1.0" ? (
            // Show ScarcityVsAbundanceScreen with sessionId
            <div className="max-w-2xl mx-auto space-y-6">
              <CurrentComponent sessionId={sessionId || undefined} />
              {sessionId && (
                <PollWidget
                  sessionId={sessionId}
                  slideId={currentScreen.id}
                  userId={user.id}
                  isPresenter={false}
                />
              )}
            </div>
          ) : currentScreen.id === "LD6.7" ? (
            <LiveRehearsalExerciseScreen isFacilitator={false} />
          ) : currentScreen.hasPoll && sessionId ? (
            // For poll slides, show waiting message + poll widget
            <div className="max-w-2xl mx-auto space-y-6">
              <Card className="p-8 bg-background/80 backdrop-blur-xl border-primary/20 text-center">
                <div className="animate-pulse mb-4">
                  <div className="w-3 h-3 bg-primary rounded-full mx-auto mb-2"></div>
                </div>
                <h3 className="text-xl font-display font-bold mb-2">
                  Follow along on screen
                </h3>
                <p className="text-muted-foreground mb-4">
                  The facilitator is presenting: <span className="text-primary font-semibold">{currentScreen.title}</span>
                </p>
                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm font-semibold text-primary mb-2">📊 Poll Active Below</p>
                  <p className="text-xs text-muted-foreground">Share your response</p>
                </div>
              </Card>
              
              <PollWidget
                sessionId={sessionId}
                slideId={currentScreen.id}
                userId={user.id}
                isPresenter={false}
              />
            </div>
          ) : (
            // For non-interactive slides, show waiting state
            <div className="max-w-2xl mx-auto">
              <Card className="p-12 bg-background/80 backdrop-blur-xl border-primary/20 text-center">
                <div className="animate-pulse mb-4">
                  <div className="w-3 h-3 bg-primary rounded-full mx-auto mb-2"></div>
                </div>
                <h3 className="text-xl font-display font-bold mb-2">
                  Follow along on screen
                </h3>
                <p className="text-muted-foreground mb-1">
                  The facilitator is presenting:
                </p>
                <p className="text-lg font-semibold text-primary mb-4">
                  {currentScreen.title}
                </p>
                <div className="text-sm text-muted-foreground">
                  <p>Slide {currentIndex + 1} of {visibleScreens.length}</p>
                </div>
              </Card>
            </div>
          )}
        </div>
      </PresentationLayout>

    </>
  );
}
