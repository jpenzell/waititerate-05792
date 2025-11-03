import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { PresentationLayout } from "@/components/PresentationLayout";
import { SlideManager } from "@/components/SlideManager";
import { SessionControl } from "@/components/SessionControl";
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
import { AIAssistant } from "@/components/AIAssistant";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { PresentationModeToggle } from "@/components/PresentationModeToggle";
import { ExternalLink, Users } from "lucide-react";
import { toast } from "sonner";

const screens = [
  {
    id: "LD0.0",
    title: "Title - Don't Wait, Iterate",
    component: LDTitleScreen,
    duration: 2,
    notes: "Set the stage for the L&D measurement session. Opening energy.",
  },
  {
    id: "LD0.1",
    title: "Windshield Wipers Question",
    component: WindshieldWipersScreen,
    duration: 2,
    notes: "Interactive question to introduce the measurement mindset.",
    hasPoll: true,
    pollQuestion: "Does a self-driving vehicle need windshield wipers?",
    pollOptions: ["Yes", "No", "Who knows anymore"],
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
    notes: "AI reveals patterns it found (running in background from step 2).",
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
    notes: "AI reveals actual data point count (running in background from step 2). Shows the gap between human estimates and AI reality.",
  },
  {
    id: "LD5.5",
    title: "From Scarcity to Abundance: The Technology Shift",
    component: MeasureTheMessScreen,
    duration: 7,
    notes: "Showcase real AI measurement tools: xAPI/LRS (Watershed, Learning Locker), AI tutors (Khanmigo, ChatGPT feedback), adaptive systems (Carnegie Learning). Key stat: xAPI increases data points from 5-10 to 50-100+ per learner. Show Duolingo's 750+ A/B tests per quarter as exemplar.",
    hasPoll: true,
    pollQuestion: "How many of these measurement tools are you currently using?",
    pollOptions: ["None", "1-2", "3-5", "5+"],
  },
  {
    id: "LD1.0",
    title: "The Paradigm Shift",
    component: ScarcityVsAbundanceScreen,
    duration: 4,
    notes: "Bridge from the photo exercise to the theory: the overwhelming data abundance you just experienced proves we need a new approach.",
    hasPoll: true,
    pollQuestion: "Which era best describes your current L&D approach?",
    pollOptions: ["Mostly Scarcity Mindset", "Transitioning", "Mostly Abundance Mindset", "Not Sure"],
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

export default function Facilitator() {
  const navigate = useNavigate();
  const { user, loading, userRole, displayName, signOut } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionCode, setSessionCode] = useState<string | null>(null);
  const [showControls, setShowControls] = useState(true);
  const [backgroundAnalysisTriggered, setBackgroundAnalysisTriggered] = useState(false);

  const { updateSlide } = useRealtimeSession(sessionCode || undefined);

  const {
    config,
    toggleVisibility,
    moveSlide,
    resetToDefaults,
    showAll,
    hideAll,
  } = useSlideConfig(screens);

  const visibleScreens = useMemo(() => {
    const sortedConfig = [...config].sort((a, b) => a.order - b.order);
    return sortedConfig
      .filter(c => c.visible)
      .map(c => screens.find(s => s.id === c.id))
      .filter(Boolean) as typeof screens;
  }, [config]);

  // Restore session from localStorage or check for active session
  useEffect(() => {
    if (!loading && user) {
      // Try to restore from localStorage first
      const savedState = localStorage.getItem("facilitator-state");
      if (savedState) {
        try {
          const { sessionId: savedSessionId, sessionCode: savedSessionCode } = JSON.parse(savedState);
          if (savedSessionId && savedSessionCode) {
            console.log('Restoring session from localStorage:', savedSessionCode);
            setSessionId(savedSessionId);
            setSessionCode(savedSessionCode);
            return;
          }
        } catch (e) {
          console.error('Error parsing saved facilitator state:', e);
        }
      }

      // If no saved state, check for active presenter sessions in DB
      const checkActiveSession = async () => {
        const { data } = await supabase
          .from("presentation_sessions")
          .select("id, session_code")
          .eq("presenter_id", user.id)
          .eq("is_active", true)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (data) {
          console.log('Found active session:', data.session_code);
          setSessionId(data.id);
          setSessionCode(data.session_code);
        }
      };
      
      checkActiveSession();
    }
  }, [user, loading]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    } else if (!loading && user && userRole === "participant") {
      toast.error("Facilitator access only");
      navigate("/participate");
    }
  }, [user, loading, userRole, navigate]);

  // Update session when slide changes
  useEffect(() => {
    if (sessionCode && visibleScreens[currentIndex]) {
      console.log('Facilitator updating to slide:', visibleScreens[currentIndex].id);
      updateSlide(visibleScreens[currentIndex].id);
    }
  }, [currentIndex, sessionCode]);


  useEffect(() => {
    if (visibleScreens[currentIndex]) {
      window.location.hash = visibleScreens[currentIndex].id;
    }
  }, [currentIndex, visibleScreens]);

  const handleSessionChange = (newSessionId: string | null, newSessionCode: string | null, isPresenter: boolean) => {
    setSessionId(newSessionId);
    setSessionCode(newSessionCode);
    
    // Save to localStorage for control panel window
    if (newSessionId && newSessionCode) {
      localStorage.setItem("facilitator-state", JSON.stringify({
        sessionId: newSessionId,
        sessionCode: newSessionCode,
        currentSlideId: visibleScreens[currentIndex]?.id || screens[0].id,
      }));
    }
  };

  const openControlPanel = () => {
    const width = 450;
    const height = 900;
    const left = window.screen.width - width - 50;
    const top = 50;
    
    window.open(
      "/facilitator-controls",
      "facilitator-controls",
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
    toast.success("Control panel opened");
  };

  // Trigger background AI analysis immediately when photos are submitted
  useEffect(() => {
    if (!sessionId) return;

    const channel = supabase
      .channel(`photo-analysis-trigger:${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'photo_submissions',
          filter: `session_id=eq.${sessionId}`,
        },
        async () => {
          console.log('Photo submitted, triggering analysis...');
          // Small delay to batch multiple photos
          setTimeout(() => {
            triggerBackgroundAnalysis();
          }, 3000);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  const triggerBackgroundAnalysis = async () => {
    if (!sessionId) return;
    
    // Load photos
    const { data: photos } = await supabase
      .from('photo_submissions')
      .select('*')
      .eq('session_id', sessionId);
    
    if (!photos || photos.length === 0) return;
    
    console.log('Triggering background AI analysis for', photos.length, 'photos...');
    
    // Use photo URLs for analysis (fallback to photo_data for backwards compatibility)
    const photoUrls = photos.map(p => p.photo_url || p.photo_data);
    
    // Trigger pattern analysis
    try {
      const { data, error } = await supabase.functions.invoke('analyze-photo-patterns', {
        body: { sessionId, photos: photoUrls, analysisType: 'patterns' }
      });
      if (error) {
        console.error('Pattern analysis error:', error);
      } else if (data) {
        console.log('Pattern analysis complete');
        console.log('Attempting to save patterns for session:', sessionId);
        const { data: updated, error: updateError } = await supabase
          .from('photo_exercise_phase')
          .update({ ai_patterns: JSON.stringify(data.results) })
          .eq('session_id', sessionId)
          .select('id');
        
        console.log('Update result:', updated, 'Error:', updateError);
        
        if (!updated || updated.length === 0) {
          console.log('No row found, inserting new row');
          const { data: inserted, error: insertError } = await supabase
            .from('photo_exercise_phase')
            .insert({ session_id: sessionId, ai_patterns: JSON.stringify(data.results) })
            .select('id');
          console.log('Insert result:', inserted, 'Error:', insertError);
        }
      }
    } catch (e) {
      console.error('Pattern analysis exception:', e);
    }
    
    // Trigger datapoint analysis
    try {
      const { data, error } = await supabase.functions.invoke('analyze-photo-patterns', {
        body: { sessionId, photos: photoUrls, analysisType: 'datapoints' }
      });
      if (error) {
        console.error('Datapoint analysis error:', error);
      } else if (data) {
        console.log('Datapoint analysis complete');
        console.log('Attempting to save datapoints for session:', sessionId);
        const counts = data.results.map((r: any) => r.dataPointCount);
        const maxCount = Math.max(...counts);
        const avgCount = Math.round(counts.reduce((a: number, b: number) => a + b, 0) / counts.length);
        
        const { data: updated, error: updateError } = await supabase
          .from('photo_exercise_phase')
          .update({ 
            ai_datapoint_count: maxCount,
            ai_datapoint_details: JSON.stringify({ counts, max: maxCount, avg: avgCount })
          })
          .eq('session_id', sessionId)
          .select('id');
        
        console.log('Update result:', updated, 'Error:', updateError);
        
        if (!updated || updated.length === 0) {
          console.log('No row found, inserting new row');
          const { data: inserted, error: insertError } = await supabase
            .from('photo_exercise_phase')
            .insert({ 
              session_id: sessionId,
              ai_datapoint_count: maxCount,
              ai_datapoint_details: JSON.stringify({ counts, max: maxCount, avg: avgCount })
            })
            .select('id');
          console.log('Insert result:', inserted, 'Error:', insertError);
        }
      }
    } catch (e) {
      console.error('Datapoint analysis exception:', e);
    }
  };

  const handleNavigation = (newIndex: number) => {
    setCurrentIndex(newIndex);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user || !userRole) return null;

  const CurrentComponent = visibleScreens[currentIndex]?.component;
  const currentScreen = visibleScreens[currentIndex];

  return (
    <>
      <ParticleBackground />
      
      {/* Always-visible control toggle button */}
      {!showControls && (
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={() => setShowControls(true)}
            size="sm"
            className="bg-primary/90 hover:bg-primary border-primary/20 backdrop-blur-xl shadow-lg"
          >
            <Users className="w-4 h-4 mr-2" />
            Show Session Controls
          </Button>
        </div>
      )}
      
      {/* Minimal Controls Toggle */}
      {showControls && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          <SessionControl
            onSessionChange={handleSessionChange}
            userId={user.id}
            userRole={userRole}
            slides={visibleScreens}
          />
          
          <Button
            onClick={openControlPanel}
            variant="outline"
            size="sm"
            className="border-primary/20 bg-background/80 backdrop-blur-xl"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Open Controls
          </Button>
          
          <PresentationModeToggle onToggle={(isFullscreen) => setShowControls(!isFullscreen)} />
        </div>
      )}

      <PresentationLayout
        currentScreen={currentScreen.id}
        totalScreens={visibleScreens.length}
        currentIndex={currentIndex}
        onNavigate={handleNavigation}
        title="Don't Wait, Iterate"
        duration={240}
        notes=""
        mode="presenter"
        slideManager={
          <SlideManager
            slides={screens}
            config={config}
            onToggleVisibility={toggleVisibility}
            onMoveSlide={moveSlide}
            onResetToDefaults={resetToDefaults}
            onShowAll={showAll}
            onHideAll={hideAll}
          />
        }
      >
        {currentScreen.id === "LD0.1" ? (
          <CurrentComponent isFacilitator={true} sessionId={sessionId || undefined} userId={user?.id} sessionCode={sessionCode || undefined} />
        ) : currentScreen.id === "LD1.0" ? (
          <CurrentComponent sessionId={sessionId || undefined} />
        ) : (currentScreen.id === "LD0.5.1" || 
            currentScreen.id === "LD0.5.2" || 
            currentScreen.id === "LD0.5.3" || 
            currentScreen.id === "LD0.5.4" || 
            currentScreen.id === "LD0.5.5") ? (
          <CurrentComponent isFacilitator={true} sessionId={sessionId || undefined} />
        ) : (
          <CurrentComponent />
        )}
      </PresentationLayout>
    </>
  );
}
