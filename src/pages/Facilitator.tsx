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
import { NeurodiversityDataQuizScreen } from "@/components/screens/NeurodiversityDataQuizScreen";
import { CurbCutIntroScreen } from "@/components/screens/CurbCutIntroScreen";
import { CurbCutQuizScreen } from "@/components/screens/CurbCutQuizScreen";
import { CurbCutResultsScreen } from "@/components/screens/CurbCutResultsScreen";
import { CurbCutExamplesScreen } from "@/components/screens/CurbCutExamplesScreen";
import { PhotoCollectionScreen } from "@/components/screens/PhotoCollectionScreen";
import { HumanPatternsScreen } from "@/components/screens/HumanPatternsScreen";
import { AIPatternsScreen } from "@/components/screens/AIPatternsScreen";
import { BlindSpotsScreen } from "@/components/screens/BlindSpotsScreen";
import { NumericEstimateScreen } from "@/components/screens/NumericEstimateScreen";
import { AIDatapointsScreen } from "@/components/screens/AIDatapointsScreen";
import { CognitiveTransitionScreen } from "@/components/screens/CognitiveTransitionScreen";
import RehearsalNotPerformanceScreen from "@/components/screens/RehearsalNotPerformanceScreen";
import { CognitiveLoadScreen } from "@/components/screens/CognitiveLoadScreen";
import { StructuredFreedomScreen } from "@/components/screens/StructuredFreedomScreen";
import { AIStudentScreen } from "@/components/screens/AIStudentScreen";
import { MentalImageryScreen } from "@/components/screens/MentalImageryScreen";
import { InnerVoiceScreen } from "@/components/screens/InnerVoiceScreen";
import { TimePerceptionScreen } from "@/components/screens/TimePerceptionScreen";
import { SensoryProcessingScreen } from "@/components/screens/SensoryProcessingScreen";
import { CognitiveReflectionScreen } from "@/components/screens/CognitiveReflectionScreen";
import { ResearchFoundationsScreen } from "@/components/screens/ResearchFoundationsScreen";
import { PatternRecognitionScreen } from "@/components/screens/PatternRecognitionScreen";
import { AICognitiveProtheticScreen } from "@/components/screens/AICognitiveProtheticScreen";
import { UDLInActionScreen } from "@/components/screens/UDLInActionScreen";
import LiveRehearsalExerciseScreen from "@/components/screens/LiveRehearsalExerciseScreen";
import { LDTakeawaysScreen } from "@/components/screens/LDTakeawaysScreen";
import { AIAssistant } from "@/components/AIAssistant";
import { ParticleBackground } from "@/components/ParticleBackground";
import { AccessibilityControls } from "@/components/AccessibilityControls";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
import { Button } from "@/components/ui/button";
import { PresentationModeToggle } from "@/components/PresentationModeToggle";
import { ExternalLink, Users } from "lucide-react";
import { toast } from "sonner";
import { seedPollsForSession } from "@/utils/pollSeeder";

const screens = [
  {
    id: "LD0.0",
    title: "Title - AI for All Minds",
    component: LDTitleScreen,
    duration: 2,
    notes: "Set the stage for neurodiversity-focused learning design. Opening energy.",
  },
  {
    id: "LD0.05",
    title: "First Principles: Windshield Wipers",
    component: WindshieldWipersScreen,
    duration: 5,
    notes: "Does a self-driving car need windshield wipers? Interactive poll revealing first-principles thinking—how neurodivergent minds question assumptions.",
    hasPoll: true,
    pollQuestion: "Does a self-driving car need windshield wipers?",
    pollOptions: ["Yes", "No", "Who knows anymore?"],
  },
  {
    id: "LD5.0",
    title: "Pattern Recognition & Perspective",
    component: PatternRecognitionScreen,
    duration: 6,
    notes: "Autistic detail focus vs neurotypical gestalt processing. Interactive demo with ambiguous image. Cognitive diversity catches more errors, spots more opportunities.",
    hasPoll: true,
    pollQuestion: "What did you see first?",
    pollOptions: ["Duck (facing right)", "Rabbit (facing left)", "Both at the same time", "Neither/Unsure"],
  },
  {
    id: "LD0.1",
    title: "Why Neurodiversity Matters: The Data",
    component: NeurodiversityDataQuizScreen,
    duration: 8,
    notes: "Interactive data quiz - participants guess shocking neurodiversity employment/productivity stats, then see reality. Creates visceral 'wow!' moment.",
  },
  {
    id: "LD0.5.1",
    title: "Step 1: How You Learn Best",
    component: PhotoCollectionScreen,
    duration: 2,
    notes: "Everyone takes a photo representing how they learn best - demonstrates pattern recognition differences.",
  },
  {
    id: "LD0.5.2",
    title: "Step 2: What Patterns Do You See?",
    component: HumanPatternsScreen,
    duration: 2,
    notes: "Participants spot learning patterns across photos - everyone sees differently.",
  },
  {
    id: "LD0.5.3",
    title: "Step 3: AI Pattern Analysis",
    component: AIPatternsScreen,
    duration: 2,
    notes: "AI reveals cognitive patterns it detected - pattern recognition diversity in action.",
  },
  {
    id: "LD0.5.4",
    title: "Step 4: What Are We Missing?",
    component: BlindSpotsScreen,
    duration: 4,
    notes: "Reveal the blind spots - what cognitive differences can't be photographed? Auditory learning, processing speed, abstract thinking, social context. Most neurodiversity is invisible.",
  },
  {
    id: "LD0.5.5",
    title: "Step 5: How Many Interpretations?",
    component: NumericEstimateScreen,
    duration: 2,
    notes: "Human estimates: how many ways could someone interpret ONE photo? Perspective-taking exercise.",
  },
  {
    id: "LD0.5.6",
    title: "Step 6: Abundance Reveal",
    component: AIDatapointsScreen,
    duration: 2,
    notes: "AI reveals hundreds of datapoints it extracted. Scarcity → abundance mindset shift.",
  },
  {
    id: "LD0.5.6.5",
    title: "Transition: From AI to Human Cognition",
    component: CognitiveTransitionScreen,
    duration: 1,
    notes: "Bridge slide: AI helps us measure more, but what if humans process information differently?",
  },
  {
    id: "LD0.5.7",
    title: "Mental Imagery Discovery",
    component: MentalImageryScreen,
    duration: 7,
    notes: "Aphantasia reveal - not everyone sees mental pictures. Visceral wow moment.",
  },
  {
    id: "LD0.5.8",
    title: "Inner Voice Discovery",
    component: InnerVoiceScreen,
    duration: 6,
    notes: "Reading voice differences - some hear narration, others read in silence.",
  },
  {
    id: "LD0.5.9",
    title: "Time Perception Challenge",
    component: TimePerceptionScreen,
    duration: 5,
    notes: "Time blindness reveal - ADHD time perception differences. Interactive 10-second challenge.",
  },
  {
    id: "LD0.5.10",
    title: "Sensory Processing Simulator",
    component: SensoryProcessingScreen,
    duration: 6,
    notes: "Experience sensory overload - adjust visual, audio, brightness to find threshold.",
  },
  {
    id: "LD0.5.11",
    title: "Cognitive Reflection",
    component: CognitiveReflectionScreen,
    duration: 8,
    notes: "Personal reflection prompts after experiencing cognitive diversity firsthand.",
  },
  {
    id: "LD0.5.12",
    title: "Research Foundations",
    component: ResearchFoundationsScreen,
    duration: 5,
    notes: "Academic grounding - peer-reviewed research supporting all interactive exercises.",
  },
  {
    id: "LD1.0",
    title: "The Curb-Cut Effect: Introduction",
    component: CurbCutIntroScreen,
    duration: 180,
    notes: "Introduce the curb-cut effect concept with the original 1970s accessibility story and how it benefited everyone."
  },
  {
    id: "LD1.0-Quiz-1",
    title: "Quiz Q1: Closed Captions",
    component: CurbCutQuizScreen,
    duration: 60,
    notes: "Question 1: What percentage of ALL viewers use closed captions?",
    hasPoll: true,
    pollQuestion: "What percentage of ALL viewers use closed captions (not just deaf/hard-of-hearing)?",
    pollOptions: ["20%", "45%", "71%", "85%"]
  },
  {
    id: "LD1.0-Quiz-2",
    title: "Quiz Q2: Chunked Content",
    component: CurbCutQuizScreen,
    duration: 60,
    notes: "Question 2: How much does chunked content improve completion rates?",
    hasPoll: true,
    pollQuestion: "How much does chunked content improve completion rates for everyone?",
    pollOptions: ["10%", "30%", "50%", "75%"]
  },
  {
    id: "LD1.0-Quiz-3",
    title: "Quiz Q3: Multiple Formats",
    component: CurbCutQuizScreen,
    duration: 60,
    notes: "Question 3: What percentage of learners prefer multiple format options?",
    hasPoll: true,
    pollQuestion: "What percentage of learners prefer multiple format options (text + audio + visual)?",
    pollOptions: ["40%", "60%", "80%+", "95%"]
  },
  {
    id: "LD1.0-Results",
    title: "The Curb-Cut Effect: Results",
    component: CurbCutResultsScreen,
    duration: 300,
    notes: "Reveal the actual statistics showing how accessibility features designed for 15-20% are used by 80%+. Emphasize the principle: Design for the Margins → Improve the Center.",
    pollOptions: ["Yes - often", "Yes - occasionally", "Not that I know of", "Not sure"],
  },
  {
    id: "LD1.1",
    title: "Learning Design Curb Cuts",
    component: CurbCutExamplesScreen,
    duration: 3,
    notes: "Real examples of accessibility features that became universally preferred: captions (71% use), chunked content (30% better completion), multiple formats (80%+ prefer).",
  },
  {
    id: "LD6.5",
    title: "AI as Cognitive Prosthetic",
    component: AICognitiveProtheticScreen,
    duration: 6,
    notes: "Real examples: JPMorgan Autism at Work (90%+ retention), SAP (30% faster QA), Khan Academy adaptive progression, Carnegie Learning AI tutors. AI extends cognitive capabilities like glasses extend vision.",
  },
  {
    id: "LD5.5",
    title: "Structured Freedom Framework",
    component: StructuredFreedomScreen,
    duration: 7,
    notes: "Balance between guidance and autonomy. Examples: LEGO instructions + free play, Khan Academy mastery paths, Duolingo adaptive placement. Reduces cognitive load while respecting learner agency.",
    hasPoll: true,
    pollQuestion: "Which design approach best describes your current training?",
    pollOptions: ["Too rigid (all structure)", "Too chaotic (all freedom)", "Balanced (structured freedom)", "Not sure"],
  },
  {
    id: "LD5.6",
    title: "AI Student: You're the Teacher",
    component: AIStudentScreen,
    duration: 8,
    notes: "Flip the script: learners teach an AI student and see if it passes the quiz. Demonstrates learning-by-teaching and the Feynman Technique in a low-stakes environment.",
  },
  {
    id: "LD4.0",
    title: "Cognitive Load in Action",
    component: CognitiveLoadScreen,
    duration: 4,
    notes: "Working memory limits (7±2 chunks). Show dense vs. chunked content comparison. Practice structured freedom in presentation design.",
  },
  {
    id: "LD6.0",
    title: "UDL in Action",
    component: UDLInActionScreen,
    duration: 4,
    notes: "Universal Design for Learning: multiple representations, engagement methods, expression options. Removes barriers without lowering standards.",
  },
  {
    id: "LD7.0",
    title: "Design with Difference: Your Action Plan",
    component: LDTakeawaysScreen,
    duration: 4,
    notes: "Four actionable shifts: Audit cognitive load, add one representation, experiment with structured freedom, test with diverse learners.",
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
  const [keyboardHintsVisible, setKeyboardHintsVisible] = useState(true);
  const [hideParticles, setHideParticles] = useState(false);
  const [pollsSeededSessionId, setPollsSeededSessionId] = useState<string | null>(null);

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

  // Ensure polls exist for active sessions (handles restored/previous sessions)
  useEffect(() => {
    const runSeeding = async () => {
      if (!sessionId) return;
      if (pollsSeededSessionId === sessionId) return; // seed once per session
      try {
        await seedPollsForSession(sessionId, visibleScreens);
      } catch (e) {
        console.error('Error seeding polls for existing session:', e);
      } finally {
        setPollsSeededSessionId(sessionId);
      }
    };
    runSeeding();
  }, [sessionId, visibleScreens, pollsSeededSessionId]);
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
        onNavigate={(direction) => {
          if (direction === "next" && currentIndex < visibleScreens.length - 1) {
            handleNavigation(currentIndex + 1);
          } else if (direction === "prev" && currentIndex > 0) {
            handleNavigation(currentIndex - 1);
          }
        }}
        onToggleFullscreen={() => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
        }}
      />
      
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
        title="AI for All Minds"
        duration={240}
        notes=""
        mode="presenter"
        sessionCode={sessionCode || undefined}
        sessionId={sessionId || undefined}
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
          <CurrentComponent isFacilitator={true} sessionId={sessionId || undefined} />
        ) : currentScreen.id === "LD1.0" ? (
          <CurrentComponent sessionId={sessionId || undefined} />
        ) : (currentScreen.id === "LD1.0-Quiz-1" || currentScreen.id === "LD1.0-Quiz-2" || currentScreen.id === "LD1.0-Quiz-3") ? (
          <CurrentComponent isFacilitator={true} sessionId={sessionId || undefined} userId={user?.id} />
        ) : currentScreen.id === "LD5.6" ? (
          <CurrentComponent isFacilitator={true} sessionId={sessionId || undefined} userId={user?.id} />
        ) : (currentScreen.id === "LD0.5.1" ||
            currentScreen.id === "LD0.5.2" || 
            currentScreen.id === "LD0.5.3" || 
            currentScreen.id === "LD0.5.4" || 
            currentScreen.id === "LD0.5.5" ||
            currentScreen.id === "LD0.5.6" ||
            currentScreen.id === "LD0.5.6.5" ||
            currentScreen.id === "LD0.5.7" ||
            currentScreen.id === "LD0.5.8" ||
            currentScreen.id === "LD0.5.9" ||
            currentScreen.id === "LD0.5.10" ||
            currentScreen.id === "LD0.5.11") ? (
          <CurrentComponent isFacilitator={true} sessionId={sessionId || undefined} />
        ) : (
          <CurrentComponent />
        )}
      </PresentationLayout>
    </>
  );
}
