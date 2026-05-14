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
import { FacultyAreNeurodivergentScreen } from "@/components/screens/FacultyAreNeurodivergentScreen";
import { RetentionEquityScreen } from "@/components/screens/RetentionEquityScreen";
import { WhatThisIsNotScreen } from "@/components/screens/WhatThisIsNotScreen";
import { OnePagerDownloadScreen } from "@/components/screens/OnePagerDownloadScreen";
import { WindshieldWipersRevealScreen } from "@/components/screens/WindshieldWipersRevealScreen";
import { NeurodiversityInnovationScreen } from "@/components/screens/NeurodiversityInnovationScreen";
import { FeedbackSensitivityScreen } from "@/components/screens/FeedbackSensitivityScreen";
import { InjusticeSensitivityScreen } from "@/components/screens/InjusticeSensitivityScreen";
import { AIvsManagerScreen } from "@/components/screens/AIvsManagerScreen";
import { DisclosureGapScreen } from "@/components/screens/DisclosureGapScreen";
import { ShadowAccommodationScreen } from "@/components/screens/ShadowAccommodationScreen";
import { DetectorBiasScreen } from "@/components/screens/DetectorBiasScreen";
import { HumanizeMyWordsScreen } from "@/components/screens/HumanizeMyWordsScreen";
import { FreeTierDivideScreen } from "@/components/screens/FreeTierDivideScreen";
import { AIEvidenceMapScreen } from "@/components/screens/AIEvidenceMapScreen";
import { InclusiveSupportStackScreen } from "@/components/screens/InclusiveSupportStackScreen";
import { YouGovSelfIDScreen } from "@/components/screens/YouGovSelfIDScreen";
import { StudentsAlreadyUsingAIScreen } from "@/components/screens/StudentsAlreadyUsingAIScreen";
import { WilliamsIdentityScreen } from "@/components/screens/WilliamsIdentityScreen";
import { CoDesignScreen } from "@/components/screens/CoDesignScreen";
import {
  Chapter02Screen,
  Chapter03Screen,
  Chapter04Screen,
  Chapter05Screen,
  Chapter06Screen,
  Chapter07Screen,
} from "@/components/screens/ChapterScreens";

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
  // 1.x — Opening
  { id: "LD1.0", title: "Title - AI for All Minds", component: LDTitleScreen, duration: 2, notes: "Set the stage for neurodiversity-focused learning design. Opening energy." },
  { id: "LD1.1", title: "First Principles: Windshield Wipers", component: WindshieldWipersScreen, duration: 5, notes: "Does a self-driving car need windshield wipers? Interactive poll revealing first-principles thinking.", pollQuestion: "Does a self-driving car need windshield wipers?", pollOptions: ["Yes", "No", "Who knows anymore?"] },
  { id: "LD1.1b", title: "Reveal: Zoox", component: WindshieldWipersRevealScreen, duration: 1, notes: "Full-bleed Zoox image. No driver, no windshield, no wipers." },
  { id: "LD1.2", title: "My Own Reframe", component: ZooxReframeScreen, duration: 2, notes: "Personal proof of the Zoox reframe — this isn't a deck, it's a live website." },
  { id: "LD1.2b", title: "Neurodiversity + AI = Innovation", component: NeurodiversityInnovationScreen, duration: 2, notes: "Meta-point: I thought backwards. Thinking differently + AI flexibility = innovation. This site is the proof." },
  { id: "LD1.3", title: "Who's in Your RCCC Classroom", component: RCCCContextScreen, duration: 4, notes: "Audience grounding for Rowan-Cabarrus Summer Institute." },
  { id: "LD1.3b", title: "The 5× Disclosure Gap", component: DisclosureGapScreen, duration: 3, notes: "~36% identify as ND vs 6–7% registered with DSO. Purdue institutional + NCES + Doyle." },
  { id: "LD1.3c", title: "1 in 5 Adults Self-ID as ND", component: YouGovSelfIDScreen, duration: 2, notes: "YouGov 2023 — 19% of US adults self-identify as neurodivergent. Self-ID outpacing diagnosis." },
  { id: "LD1.4", title: "What This Is NOT", component: WhatThisIsNotScreen, duration: 3, notes: "Disarm faculty skepticism early." },
  // 2.x — Why neurodiversity matters
  { id: "LD2.0a", title: "Chapter 02 — Why difference matters", component: Chapter02Screen, duration: 1, notes: "Cinematic chapter divider." },
  { id: "LD2.0", title: "Pattern Recognition & Perspective", component: PatternRecognitionScreen, duration: 6, notes: "Autistic detail focus vs neurotypical gestalt processing.", pollQuestion: "What did you see first?", pollOptions: ["Duck (facing right)", "Rabbit (facing left)", "Both at the same time", "Neither/Unsure"] },
  { id: "LD2.1", title: "Why Neurodiversity Matters: The Data", component: NeurodiversityDataQuizScreen, duration: 8, notes: "Interactive data quiz." },
  { id: "LD2.2", title: "Same Words, Different Meanings", component: AnnieDukeStudyScreen, duration: 5, notes: "Annie Duke / Sherman Kent." },
  // 3.x — Photo exercise
  { id: "LD3.0a", title: "Chapter 03 — Patterns we miss", component: Chapter03Screen, duration: 1, notes: "Cinematic chapter divider." },
  { id: "LD3.0", title: "Step 1: How You Learn Best", component: PhotoCollectionScreen, duration: 2, notes: "Photo collection." },
  { id: "LD3.1", title: "Step 2: What Patterns Do You See?", component: HumanPatternsScreen, duration: 2, notes: "Pattern spotting." },
  { id: "LD3.2", title: "Step 3: AI Pattern Analysis", component: AIPatternsScreen, duration: 2, notes: "AI reveals patterns." },
  { id: "LD3.3", title: "Step 4: What Are We Missing?", component: BlindSpotsScreen, duration: 4, notes: "Reveal blind spots." },
  { id: "LD3.4", title: "Step 5: How Many Interpretations?", component: NumericEstimateScreen, duration: 2, notes: "Estimates." },
  { id: "LD3.5", title: "Step 6: Abundance Reveal", component: AIDatapointsScreen, duration: 2, notes: "AI datapoints." },
  { id: "LD3.6", title: "Transition: From AI to Human Cognition", component: CognitiveTransitionScreen, duration: 1, notes: "Bridge slide." },
  // 4.x — Cognitive discovery
  { id: "LD4.0a", title: "Chapter 04 — Inside the mind", component: Chapter04Screen, duration: 1, notes: "Cinematic chapter divider." },
  { id: "LD4.0", title: "Mental Imagery Discovery", component: MentalImageryScreen, duration: 7, notes: "Aphantasia reveal." },
  { id: "LD4.1", title: "Inner Voice Discovery", component: InnerVoiceScreen, duration: 6, notes: "Reading voice." },
  { id: "LD4.2", title: "Time Perception Challenge", component: TimePerceptionScreen, duration: 5, notes: "Time blindness." },
  { id: "LD4.3", title: "Sensory Processing Simulator", component: SensoryProcessingScreen, duration: 6, notes: "Sensory overload." },
  { id: "LD4.3b", title: "Feedback Sensitivity (RSD)", component: FeedbackSensitivityScreen, duration: 4, notes: "Rejection Sensitive Dysphoria — why a single comment can derail a week. Stats are placeholders, confirm before delivery." },
  { id: "LD4.3c", title: "Injustice Sensitivity", component: InjusticeSensitivityScreen, duration: 4, notes: "Heightened response to unfairness — what looks like overreaction vs what's actually happening." },
  { id: "LD4.3d", title: "Humanize My Words", component: HumanizeMyWordsScreen, duration: 4, notes: "Ma et al. 2026 — 3,984 autistic posts. Four affordances + three risks. Masking-as-a-service tension." },
  { id: "LD4.4", title: "Cognitive Reflection", component: CognitiveReflectionScreen, duration: 8, notes: "Reflection prompts." },
  { id: "LD4.5", title: "Research Foundations", component: ResearchFoundationsScreen, duration: 5, notes: "Academic grounding." },
  { id: "LD4.6", title: "Discovery Wall", component: DiscoveryWallScreen, duration: 5, notes: "Live shared wall." },
  { id: "LD4.7", title: "What This Means For Your Students", component: FacultyTranslationScreen, duration: 5, notes: "Bridge to teaching practice." },
  { id: "LD4.8", title: "You Are Not Alone (Faculty)", component: FacultyAreNeurodivergentScreen, duration: 3, notes: "Permission slide." },
  { id: "LD4.9", title: "Peer Talk: Discovery", component: PeerTalkScreen, duration: 3, props: { prompt: "What did you just discover that you'd never noticed before?", subPrompt: "Pick one thing. 90 seconds with the person next to you.", seconds: 90 }, notes: "Structured peer talk." },
  // 5.x — Curb-cut effect
  { id: "LD5.0a", title: "Chapter 05 — The curb-cut effect", component: Chapter05Screen, duration: 1, notes: "Cinematic chapter divider." },
  { id: "LD5.0", title: "The Curb-Cut Effect: Introduction", component: CurbCutIntroScreen, duration: 3, notes: "Curb-cut effect intro." },
  { id: "LD5.1", title: "Quiz Q1: Closed Captions", component: CurbCutQuizScreen, duration: 1, notes: "Q1.", pollQuestion: "What percentage of ALL viewers use closed captions (not just deaf/hard-of-hearing)?", pollOptions: ["20%", "45%", "71%", "85%"] },
  { id: "LD5.2", title: "Quiz Q2: Chunked Content", component: CurbCutQuizScreen, duration: 1, notes: "Q2.", pollQuestion: "How much does chunked content improve completion rates for everyone?", pollOptions: ["10%", "30%", "50%", "75%"] },
  { id: "LD5.3", title: "Quiz Q3: Multiple Formats", component: CurbCutQuizScreen, duration: 1, notes: "Q3.", pollQuestion: "What percentage of learners prefer multiple format options (text + audio + visual)?", pollOptions: ["40%", "60%", "80%+", "95%"] },
  { id: "LD5.4", title: "The Curb-Cut Effect: Results", component: CurbCutResultsScreen, duration: 5, notes: "Reveal stats." },
  { id: "LD5.5", title: "Learning Design Curb Cuts", component: CurbCutExamplesScreen, duration: 3, notes: "Real examples." },
  // 6.x — AI for accommodation
  { id: "LD6.0a", title: "Chapter 06 — AI as accommodation", component: Chapter06Screen, duration: 1, notes: "Cinematic chapter divider." },
  { id: "LD6.0", title: "AI as Cognitive Prosthetic", component: AICognitiveProtheticScreen, duration: 6, notes: "Real examples." },
  { id: "LD6.0b", title: "People Prefer AI to Their Manager", component: AIvsManagerScreen, duration: 3, notes: "Workplace Intelligence × Oracle 2024 stat. Ties feedback/injustice sensitivity (Ch.4) to why AI is a safer tutor. Confirm exact stat before delivery." },
  { id: "LD6.0c", title: "Shadow Accommodation", component: ShadowAccommodationScreen, duration: 4, notes: "Atcheson et al. CHI 2025 — 25/62 students say AI does what the institution doesn't. P10 quote on bypassing bureaucracy. Political punch of the talk." },
  { id: "LD6.0d", title: "Students Already Use AI", component: StudentsAlreadyUsingAIScreen, duration: 3, notes: "HEPI 2025 — 92% of UK undergrads use GenAI, 88% for assessments. The adoption already happened." },
  { id: "LD6.1", title: "Structured Freedom Framework", component: StructuredFreedomScreen, duration: 7, notes: "Balance between guidance and autonomy.", pollQuestion: "Which design approach best describes your current training?", pollOptions: ["Too rigid (all structure)", "Too chaotic (all freedom)", "Balanced (structured freedom)", "Not sure"] },
  { id: "LD6.2", title: "Doctor + AI Paradox", component: AIParadoxRevealScreen, duration: 5, notes: "JAMA 2024." },
  { id: "LD6.3", title: "But Isn't This Just Cheating?", component: AcademicIntegrityScreen, duration: 5, notes: "Reframe academic integrity." },
  { id: "LD6.3b", title: "The Detector Is the Cheater", component: DetectorBiasScreen, duration: 4, notes: "Liang et al. 2023 — 61% false-positive on non-native English. Bloomberg autistic-student-flagged-100% case." },
  { id: "LD6.3c", title: "I'm Just Autistic", component: WilliamsIdentityScreen, duration: 3, notes: "Donna Williams identity-first language quote. Person-first vs identity-first framing." },
  { id: "LD6.4", title: "AI as Cognitive Accommodation", component: AIAccommodationScreen, duration: 5, notes: "Six archetypes." },
  { id: "LD6.5", title: "AI Evidence Map — Trust, but Verify", component: AIEvidenceMapScreen, duration: 4, notes: "Strong/Mixed/Thin evidence tiers. LLMs strong, AT mixed, predictive analytics thin. Procurement guardrail." },
  // 7.x — Workshop
  { id: "LD7.0a", title: "Chapter 07 — Make something", component: Chapter07Screen, duration: 1, notes: "Cinematic chapter divider." },
  { id: "LD7.0", title: "Workshop: Redesign Your Slide", component: RedesignWorkshopScreen, duration: 12, notes: "Hands-on faculty workshop." },
  { id: "LD7.1", title: "Peer Talk: Redesign", component: PeerTalkScreen, duration: 3, props: { prompt: "Show your neighbor what you redesigned.", subPrompt: "What changed? What did the AI catch that you wouldn't have? 90 seconds each way.", seconds: 180 }, notes: "Pair share." },
  { id: "LD7.2", title: "This Is Retention Strategy", component: RetentionEquityScreen, duration: 4, notes: "Equity / Title III / SACSCOC hook." },
  { id: "LD7.2b", title: "The Free-Tier Divide", component: FreeTierDivideScreen, duration: 3, notes: "Zhao et al. 2025 — 91% of disabled students locked into free tiers. Equity argument for institutional AI access via DSO." },
  { id: "LD7.3", title: "AI Student: You're the Teacher", component: AIStudentScreen, duration: 8, notes: "Learning by teaching." },
  { id: "LD7.4", title: "Cognitive Load in Action", component: CognitiveLoadScreen, duration: 4, notes: "Working memory limits." },
  { id: "LD7.5", title: "UDL in Action", component: UDLInActionScreen, duration: 4, notes: "Universal Design for Learning." },
  { id: "LD7.6", title: "Iteration Doubles Quality", component: AnthropicIterationScreen, duration: 3, notes: "Anthropic AI Fluency Index 2026." },
  // 8.x — Close
  { id: "LD7.9", title: "The Inclusive Support Stack", component: InclusiveSupportStackScreen, duration: 4, notes: "Mental model: accessible curriculum → accommodations + AT → AI augmentation → human judgement. Sets up action plan." },
  { id: "LD7.9b", title: "Co-Design With ND Students", component: CoDesignScreen, duration: 3, notes: "Special Olympics co-design model applied to syllabus design. Nothing about us without us." },
  { id: "LD8.0", title: "Design with Difference: Your Action Plan", component: LDTakeawaysScreen, duration: 4, notes: "Four actionable shifts." },
  { id: "LD8.1", title: "Monday-Morning Prompts", component: MondayPromptsScreen, duration: 5, notes: "Four copy-paste prompts." },
  { id: "LD8.3", title: "Take It With You", component: OnePagerDownloadScreen, duration: 3, notes: "Download faculty one-pager." },
];

// Slide IDs that accept (isFacilitator, sessionId, userId) interactive props
export const INTERACTIVE_SLIDE_IDS = new Set<string>([
  "LD1.1",   // Windshield wipers poll
  "LD2.0",   // Pattern recognition poll
  "LD2.1",   // Neurodiversity quiz
  "LD2.2",   // Probability words
  "LD3.0",   // Photo collection
  "LD3.1",   // Human patterns
  "LD3.2",   // AI patterns
  "LD3.3",   // Blind spots
  "LD3.4",   // Numeric estimate
  "LD3.5",   // AI datapoints
  "LD3.6",   // Cognitive transition
  "LD4.0",   // Mental imagery
  "LD4.1",   // Inner voice
  "LD4.2",   // Time perception
  "LD4.3",   // Sensory processing
  "LD4.4",   // Cognitive reflection
  "LD4.6",   // Discovery wall
  "LD5.1",   // Curb-cut quiz Q1
  "LD5.2",   // Curb-cut quiz Q2
  "LD5.3",   // Curb-cut quiz Q3
  "LD6.1",   // Structured freedom poll
  "LD7.0",   // Redesign workshop
  "LD7.3",   // AI student
]);
