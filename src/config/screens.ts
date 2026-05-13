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
import { CognitiveLoadScreen } from "@/components/screens/CognitiveLoadScreen";
import { StructuredFreedomScreen } from "@/components/screens/StructuredFreedomScreen";
import { AIStudentScreen } from "@/components/screens/AIStudentScreen";
import { ZooxReframeScreen } from "@/components/screens/ZooxReframeScreen";
import { AnnieDukeStudyScreen } from "@/components/screens/AnnieDukeStudyScreen";
import { AIParadoxRevealScreen } from "@/components/screens/AIParadoxRevealScreen";
import { AnthropicIterationScreen } from "@/components/screens/AnthropicIterationScreen";
import { MentalImageryScreen } from "@/components/screens/MentalImageryScreen";
import { InnerVoiceScreen } from "@/components/screens/InnerVoiceScreen";
import { TimePerceptionScreen } from "@/components/screens/TimePerceptionScreen";
import { SensoryProcessingScreen } from "@/components/screens/SensoryProcessingScreen";
import { CognitiveReflectionScreen } from "@/components/screens/CognitiveReflectionScreen";
import { ResearchFoundationsScreen } from "@/components/screens/ResearchFoundationsScreen";
import { PatternRecognitionScreen } from "@/components/screens/PatternRecognitionScreen";
import { AICognitiveProtheticScreen } from "@/components/screens/AICognitiveProtheticScreen";
import { UDLInActionScreen } from "@/components/screens/UDLInActionScreen";
import { LDTakeawaysScreen } from "@/components/screens/LDTakeawaysScreen";
import { RCCCContextScreen } from "@/components/screens/RCCCContextScreen";
import { AcademicIntegrityScreen } from "@/components/screens/AcademicIntegrityScreen";
import { MondayPromptsScreen } from "@/components/screens/MondayPromptsScreen";
import { DiscoveryWallScreen } from "@/components/screens/DiscoveryWallScreen";
import { FacultyTranslationScreen } from "@/components/screens/FacultyTranslationScreen";
import { RedesignWorkshopScreen } from "@/components/screens/RedesignWorkshopScreen";
import { PeerTalkScreen } from "@/components/screens/PeerTalkScreen";
import { AIAccommodationScreen } from "@/components/screens/AIAccommodationScreen";
import { ParkingLotIntroScreen } from "@/components/screens/ParkingLotIntroScreen";
import { ParkingLotDisplayScreen } from "@/components/screens/ParkingLotDisplayScreen";
import { FacultyAreNeurodivergentScreen } from "@/components/screens/FacultyAreNeurodivergentScreen";
import { RetentionEquityScreen } from "@/components/screens/RetentionEquityScreen";
import { WhatThisIsNotScreen } from "@/components/screens/WhatThisIsNotScreen";
import { OnePagerDownloadScreen } from "@/components/screens/OnePagerDownloadScreen";

export interface ScreenDef {
  id: string;
  title: string;
  component: any;
  duration?: number;
  notes?: string;
  hasPoll?: boolean;
  pollQuestion?: string;
  pollOptions?: string[];
  props?: Record<string, any>;
}

export const screens: ScreenDef[] = [
  { id: "LD0.0", title: "Title - AI for All Minds", component: LDTitleScreen, duration: 2, notes: "Set the stage for neurodiversity-focused learning design. Opening energy." },
  { id: "LD0.05", title: "First Principles: Windshield Wipers", component: WindshieldWipersScreen, duration: 5, notes: "Does a self-driving car need windshield wipers? Interactive poll revealing first-principles thinking.", pollQuestion: "Does a self-driving car need windshield wipers?", pollOptions: ["Yes", "No", "Who knows anymore?"] },
  { id: "LD0.06", title: "My Own Reframe", component: ZooxReframeScreen, duration: 2, notes: "Personal proof of the Zoox reframe — this isn't a deck, it's a live website." },
  { id: "LD0.07", title: "Who's in Your RCCC Classroom", component: RCCCContextScreen, duration: 4, notes: "Audience grounding for Rowan-Cabarrus Summer Institute." },
  { id: "LD0.08", title: "What This Is NOT", component: WhatThisIsNotScreen, duration: 3, notes: "Disarm faculty skepticism early." },
  { id: "LD0.09", title: "Parking Lot: Your Questions", component: ParkingLotIntroScreen, duration: 3, notes: "Capture each participant's biggest AI question." },
  { id: "LD5.0", title: "Pattern Recognition & Perspective", component: PatternRecognitionScreen, duration: 6, notes: "Autistic detail focus vs neurotypical gestalt processing.", pollQuestion: "What did you see first?", pollOptions: ["Duck (facing right)", "Rabbit (facing left)", "Both at the same time", "Neither/Unsure"] },
  { id: "LD0.1", title: "Why Neurodiversity Matters: The Data", component: NeurodiversityDataQuizScreen, duration: 8, notes: "Interactive data quiz." },
  { id: "LD0.15", title: "Same Words, Different Meanings", component: AnnieDukeStudyScreen, duration: 5, notes: "Annie Duke / Sherman Kent." },
  { id: "LD0.5.1", title: "Step 1: How You Learn Best", component: PhotoCollectionScreen, duration: 2, notes: "Photo collection." },
  { id: "LD0.5.2", title: "Step 2: What Patterns Do You See?", component: HumanPatternsScreen, duration: 2, notes: "Pattern spotting." },
  { id: "LD0.5.3", title: "Step 3: AI Pattern Analysis", component: AIPatternsScreen, duration: 2, notes: "AI reveals patterns." },
  { id: "LD0.5.4", title: "Step 4: What Are We Missing?", component: BlindSpotsScreen, duration: 4, notes: "Reveal blind spots." },
  { id: "LD0.5.5", title: "Step 5: How Many Interpretations?", component: NumericEstimateScreen, duration: 2, notes: "Estimates." },
  { id: "LD0.5.6", title: "Step 6: Abundance Reveal", component: AIDatapointsScreen, duration: 2, notes: "AI datapoints." },
  { id: "LD0.5.6.5", title: "Transition: From AI to Human Cognition", component: CognitiveTransitionScreen, duration: 1, notes: "Bridge slide." },
  { id: "LD0.5.7", title: "Mental Imagery Discovery", component: MentalImageryScreen, duration: 7, notes: "Aphantasia reveal." },
  { id: "LD0.5.8", title: "Inner Voice Discovery", component: InnerVoiceScreen, duration: 6, notes: "Reading voice." },
  { id: "LD0.5.9", title: "Time Perception Challenge", component: TimePerceptionScreen, duration: 5, notes: "Time blindness." },
  { id: "LD0.5.10", title: "Sensory Processing Simulator", component: SensoryProcessingScreen, duration: 6, notes: "Sensory overload." },
  { id: "LD0.5.11", title: "Cognitive Reflection", component: CognitiveReflectionScreen, duration: 8, notes: "Reflection prompts." },
  { id: "LD0.5.12", title: "Research Foundations", component: ResearchFoundationsScreen, duration: 5, notes: "Academic grounding." },
  { id: "LD0.5.13", title: "Discovery Wall", component: DiscoveryWallScreen, duration: 5, notes: "Live shared wall." },
  { id: "LD0.5.14", title: "What This Means For Your Students", component: FacultyTranslationScreen, duration: 5, notes: "Bridge to teaching practice." },
  { id: "LD0.5.15", title: "You Are Not Alone (Faculty)", component: FacultyAreNeurodivergentScreen, duration: 3, notes: "Permission slide." },
  { id: "LD0.5.16", title: "Peer Talk: Discovery", component: PeerTalkScreen, duration: 3, props: { prompt: "What did you just discover that you'd never noticed before?", subPrompt: "Pick one thing. 90 seconds with the person next to you.", seconds: 90 }, notes: "Structured peer talk." },
  { id: "LD1.0", title: "The Curb-Cut Effect: Introduction", component: CurbCutIntroScreen, duration: 3, notes: "Curb-cut effect intro." },
  { id: "LD1.0-Quiz-1", title: "Quiz Q1: Closed Captions", component: CurbCutQuizScreen, duration: 1, notes: "Q1.", pollQuestion: "What percentage of ALL viewers use closed captions (not just deaf/hard-of-hearing)?", pollOptions: ["20%", "45%", "71%", "85%"] },
  { id: "LD1.0-Quiz-2", title: "Quiz Q2: Chunked Content", component: CurbCutQuizScreen, duration: 1, notes: "Q2.", pollQuestion: "How much does chunked content improve completion rates for everyone?", pollOptions: ["10%", "30%", "50%", "75%"] },
  { id: "LD1.0-Quiz-3", title: "Quiz Q3: Multiple Formats", component: CurbCutQuizScreen, duration: 1, notes: "Q3.", pollQuestion: "What percentage of learners prefer multiple format options (text + audio + visual)?", pollOptions: ["40%", "60%", "80%+", "95%"] },
  { id: "LD1.0-Results", title: "The Curb-Cut Effect: Results", component: CurbCutResultsScreen, duration: 5, notes: "Reveal stats." },
  { id: "LD1.1", title: "Learning Design Curb Cuts", component: CurbCutExamplesScreen, duration: 3, notes: "Real examples." },
  { id: "LD6.5", title: "AI as Cognitive Prosthetic", component: AICognitiveProtheticScreen, duration: 6, notes: "Real examples." },
  { id: "LD5.5", title: "Structured Freedom Framework", component: StructuredFreedomScreen, duration: 7, notes: "Balance between guidance and autonomy.", pollQuestion: "Which design approach best describes your current training?", pollOptions: ["Too rigid (all structure)", "Too chaotic (all freedom)", "Balanced (structured freedom)", "Not sure"] },
  { id: "LD5.55", title: "Doctor + AI Paradox", component: AIParadoxRevealScreen, duration: 5, notes: "JAMA 2024." },
  { id: "LD5.57", title: "But Isn't This Just Cheating?", component: AcademicIntegrityScreen, duration: 5, notes: "Reframe academic integrity." },
  { id: "LD5.58", title: "AI as Cognitive Accommodation", component: AIAccommodationScreen, duration: 5, notes: "Six archetypes." },
  { id: "LD6.1", title: "Workshop: Redesign Your Slide", component: RedesignWorkshopScreen, duration: 12, notes: "Hands-on faculty workshop." },
  { id: "LD6.2", title: "Peer Talk: Redesign", component: PeerTalkScreen, duration: 3, props: { prompt: "Show your neighbor what you redesigned.", subPrompt: "What changed? What did the AI catch that you wouldn't have? 90 seconds each way.", seconds: 180 }, notes: "Pair share." },
  { id: "LD6.3", title: "This Is Retention Strategy", component: RetentionEquityScreen, duration: 4, notes: "Equity / Title III / SACSCOC hook." },
  { id: "LD5.6", title: "AI Student: You're the Teacher", component: AIStudentScreen, duration: 8, notes: "Learning by teaching." },
  { id: "LD4.0", title: "Cognitive Load in Action", component: CognitiveLoadScreen, duration: 4, notes: "Working memory limits." },
  { id: "LD6.0", title: "UDL in Action", component: UDLInActionScreen, duration: 4, notes: "Universal Design for Learning." },
  { id: "LD6.9", title: "Iteration Doubles Quality", component: AnthropicIterationScreen, duration: 3, notes: "Anthropic AI Fluency Index 2026." },
  { id: "LD7.0", title: "Design with Difference: Your Action Plan", component: LDTakeawaysScreen, duration: 4, notes: "Four actionable shifts." },
  { id: "LD7.5", title: "Monday-Morning Prompts", component: MondayPromptsScreen, duration: 5, notes: "Four copy-paste prompts." },
  { id: "LD7.7", title: "Parking Lot: Answers", component: ParkingLotDisplayScreen, duration: 8, notes: "Display all questions." },
  { id: "LD7.9", title: "Take It With You", component: OnePagerDownloadScreen, duration: 3, notes: "Download faculty one-pager." },
];

// Slide IDs that accept (isFacilitator, sessionId, userId) interactive props
export const INTERACTIVE_SLIDE_IDS = new Set<string>([
  "LD0.05",
  "LD5.0",
  "LD5.5",
  "LD1.0-Quiz-1",
  "LD1.0-Quiz-2",
  "LD1.0-Quiz-3",
  "LD0.1",
  "LD0.5.1",
  "LD0.5.2",
  "LD0.5.3",
  "LD0.5.4",
  "LD0.5.5",
  "LD0.5.6",
  "LD0.5.6.5",
  "LD0.5.7",
  "LD0.5.8",
  "LD0.5.9",
  "LD0.5.10",
  "LD0.5.11",
  "LD0.5.13",
  "LD1.0-Quiz-1",
  "LD1.0-Quiz-2",
  "LD1.0-Quiz-3",
  "LD5.6",
  "LD6.1",
  "LD0.09",
  "LD7.7",
]);
