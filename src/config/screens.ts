// ─── 7-Act outline. 54 slides. AI for All Minds. ───
// Through-line: ND minds aren't behind. They've been ahead, waiting for systems
// that could meet them. AI is the first system that doesn't require the bending.

import { LDTitleScreen } from "@/components/screens/LDTitleScreen";
import { WindshieldWipersScreen } from "@/components/screens/WindshieldWipersScreen";
import { WindshieldWipersRevealScreen } from "@/components/screens/WindshieldWipersRevealScreen";
import { RCCCContextScreen } from "@/components/screens/RCCCContextScreen";
import { AboutMeScreen } from "@/components/screens/AboutMeScreen";

import { YouGovSelfIDScreen } from "@/components/screens/YouGovSelfIDScreen";
import { DisclosureGapScreen } from "@/components/screens/DisclosureGapScreen";

import { PhotoCollectionScreen } from "@/components/screens/PhotoCollectionScreen";
import { HumanPatternsScreen } from "@/components/screens/HumanPatternsScreen";
import { AIPatternsScreen } from "@/components/screens/AIPatternsScreen";
import { MentalImageryScreen } from "@/components/screens/MentalImageryScreen";
import { InnerVoiceScreen } from "@/components/screens/InnerVoiceScreen";
import { TimePerceptionScreen } from "@/components/screens/TimePerceptionScreen";
import { FeedbackSensitivityScreen } from "@/components/screens/FeedbackSensitivityScreen";
import { DiscoveryWallScreen } from "@/components/screens/DiscoveryWallScreen";

import { StudentsAlreadyUsingAIScreen } from "@/components/screens/StudentsAlreadyUsingAIScreen";
import { HumanizeMyWordsScreen } from "@/components/screens/HumanizeMyWordsScreen";
import { ShadowAccommodationScreen } from "@/components/screens/ShadowAccommodationScreen";
import { AIParadoxRevealScreen } from "@/components/screens/AIParadoxRevealScreen";
import { DetectorBiasScreen } from "@/components/screens/DetectorBiasScreen";
import { WilliamsIdentityScreen } from "@/components/screens/WilliamsIdentityScreen";

import { CurbCutIntroScreen } from "@/components/screens/CurbCutIntroScreen";
import { CurbCutQuizScreen } from "@/components/screens/CurbCutQuizScreen";
import { CurbCutExamplesScreen } from "@/components/screens/CurbCutExamplesScreen";
import { FreeTierDivideScreen } from "@/components/screens/FreeTierDivideScreen";
import { RetentionEquityScreen } from "@/components/screens/RetentionEquityScreen";

import { RedesignWorkshopScreen } from "@/components/screens/RedesignWorkshopScreen";
import { AIStudentScreen } from "@/components/screens/AIStudentScreen";
import { CoDesignScreen } from "@/components/screens/CoDesignScreen";

import { InclusiveSupportStackScreen } from "@/components/screens/InclusiveSupportStackScreen";
import { OnePagerDownloadScreen } from "@/components/screens/OnePagerDownloadScreen";

import {
  HiddenVanguardChapterScreen,
  FeelItChapterScreen,
  AccommodationChapterScreen,
  DesignForVanguardChapterScreen,
  MakeSomethingChapterScreen,
  CloseChapterScreen,
} from "@/components/screens/ChapterScreens";

import {
  WorldChangingScreen,
  PersonalDisclosureScreen,
  CostOfMaskingScreen,
  ThesisNamedScreen,
  TheRevealScreen,
  YouProbablyDoTooScreen,
  AIClarificationScreen,
  CognitiveLoadUDLScreen,
  AIStudentSetupScreen,
  ZooxCallbackScreen,
  CommitmentMomentScreen,
  IdentityMoveScreen,
} from "@/components/screens/NewActScreens";

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
  /**
   * Slides that only make sense with an active participant session
   * (live photo upload, live workshop, etc.). Filtered from the deck
   * when no session is started.
   */
  requiresSession?: boolean;
}

export const screens: ScreenDef[] = [
  // ═══ ACT 1 — The Future Demands Different Thinking (5 slides · ~15 min) ═══
  { id: "LD1.0", title: "Title — AI for All Minds", component: LDTitleScreen, duration: 2, notes: "Set the stage. Opening energy." },
  { id: "LD1.1", title: "Zoox Question — Windshield Wipers", component: WindshieldWipersScreen, duration: 4, notes: "Does a self-driving car need windshield wipers? Show of hands or live poll.", pollQuestion: "Does a self-driving car need windshield wipers?", pollOptions: ["Yes", "No", "Who knows anymore?"] },
  { id: "LD1.2", title: "Zoox Reveal", component: WindshieldWipersRevealScreen, duration: 1, notes: "Full-bleed Zoox image. No driver, no windshield, no wipers." },
  { id: "LD1.3", title: "The Templates Can't Keep Up", component: WorldChangingScreen, duration: 3, notes: "Meta-frame: this is a rehearsal, not a deck. Built in a weekend with AI." },
  { id: "LD1.4", title: "Who's in Your RCCC Classroom", component: RCCCContextScreen, duration: 5, notes: "Audience grounding for Rowan-Cabarrus Summer Institute." },
  { id: "LD1.5", title: "About Me — Josh Penzell", component: AboutMeScreen, duration: 2, notes: "Quick intro: who I am and the path that got me here. Drag the logos." },

  // ═══ ACT 2 — The Hidden Vanguard (6 slides · ~20 min) ═══
  { id: "LD2.0", title: "Chapter — The Hidden Vanguard", component: HiddenVanguardChapterScreen, duration: 1, notes: "Chapter card." },
  { id: "LD2.1", title: "Personal Disclosure", component: PersonalDisclosureScreen, duration: 5, notes: "Aphantasia · autism + ADHD · masking. Personal anchor before the data." },
  { id: "LD2.2", title: "1 in 5 Adults Self-ID as ND", component: YouGovSelfIDScreen, duration: 3, notes: "YouGov 2023 — 19% of US adults self-identify as neurodivergent." },
  { id: "LD2.3", title: "The 5× Disclosure Gap", component: DisclosureGapScreen, duration: 4, notes: "~36% identify vs 6–7% registered. Purdue + NCES + Doyle." },
  { id: "LD2.4", title: "The Cost of Masking", component: CostOfMaskingScreen, duration: 4, notes: "What the system has been taking. Cage 2018, Cassidy 2018, Huang 2020." },
  { id: "LD2.5", title: "The Thesis Named", component: ThesisNamedScreen, duration: 2, notes: "ND minds aren't behind. They've been ahead, waiting for systems that could meet them." },

  // ═══ ACT 3 — Feel It (11 slides · ~45 min) ═══
  { id: "LD3.0", title: "Chapter — Feel It", component: FeelItChapterScreen, duration: 1, notes: "Chapter card." },
  { id: "LD3.1", title: "Photo Exercise — Upload", component: PhotoCollectionScreen, duration: 4, notes: "Step 1: How you learn best.", requiresSession: true },
  { id: "LD3.2", title: "Photo Exercise — What You See", component: HumanPatternsScreen, duration: 4, notes: "Step 2: Different observers, different patterns.", requiresSession: true },
  { id: "LD3.3", title: "Photo Exercise — AI as Observer", component: AIPatternsScreen, duration: 4, notes: "Step 3: AI is one observer among many.", requiresSession: true },
  { id: "LD3.4", title: "Mental Imagery", component: MentalImageryScreen, duration: 6, notes: "Aphantasia reveal." },
  { id: "LD3.5", title: "Inner Voice", component: InnerVoiceScreen, duration: 5, notes: "Reading voice." },
  { id: "LD3.6", title: "Time Perception", component: TimePerceptionScreen, duration: 5, notes: "Time blindness." },
  { id: "LD3.7", title: "Feedback Sensitivity (RSD)", component: FeedbackSensitivityScreen, duration: 4, notes: "Why a single comment can derail a week." },
  { id: "LD3.8", title: "Discovery Wall", component: DiscoveryWallScreen, duration: 5, notes: "Live shared cognitive reflection.", requiresSession: true },
  { id: "LD3.9", title: "The Reveal — They're In This Room", component: TheRevealScreen, duration: 3, notes: "Several of you on this call are these people. The rest of you teach them every day." },

  // ═══ ACT 4 — The Accommodation That Already Happened (9 slides · ~30 min) ═══
  { id: "LD4.0", title: "Chapter — The Accommodation That Already Happened", component: AccommodationChapterScreen, duration: 1, notes: "Chapter card." },
  { id: "LD4.1", title: "Students Already Use AI", component: StudentsAlreadyUsingAIScreen, duration: 3, notes: "HEPI 2025 — 92% of UK undergrads use GenAI." },
  { id: "LD4.2", title: "You Probably Do Too", component: YouProbablyDoTooScreen, duration: 3, notes: "Faculty already use AI for the same accommodations students want." },
  { id: "LD4.3", title: "Humanize My Words", component: HumanizeMyWordsScreen, duration: 4, notes: "Ma et al. 2026 — masking-as-a-service." },
  { id: "LD4.4", title: "Shadow Accommodation", component: ShadowAccommodationScreen, duration: 4, notes: "Atcheson et al. CHI 2025 — AI does what the institution doesn't." },
  { id: "LD4.5", title: "Doctor + AI Paradox", component: AIParadoxRevealScreen, duration: 4, notes: "JAMA 2024." },
  { id: "LD4.6", title: "The Detector Is the Cheater", component: DetectorBiasScreen, duration: 4, notes: "Liang et al. 2023 — 61% false-positive on non-native English." },
  { id: "LD4.7", title: "I'm Just Autistic", component: WilliamsIdentityScreen, duration: 3, notes: "Donna Williams identity-first language quote." },
  { id: "LD4.8", title: "AI Clears Friction So Thinking Can Happen", component: AIClarificationScreen, duration: 3, notes: "AI isn't replacing thinking. It clears friction so ND minds can do the thinking the future needs." },

  // ═══ ACT 5 — Design for the Vanguard, Win for Everyone (8 slides · ~25 min) ═══
  { id: "LD5.0", title: "Chapter — Design for the Vanguard", component: DesignForVanguardChapterScreen, duration: 1, notes: "Chapter card." },
  { id: "LD5.1", title: "The Curb-Cut Effect — Introduction", component: CurbCutIntroScreen, duration: 3, notes: "Curb-cut effect intro." },
  { id: "LD5.2", title: "Quiz Q1: Closed Captions", component: CurbCutQuizScreen, duration: 3, notes: "Q1 with reveal-on-arrow.", pollQuestion: "What percentage of ALL viewers use closed captions (not just deaf/hard-of-hearing)?", pollOptions: ["20%", "45%", "71%", "85%"] },
  { id: "LD5.3", title: "Quiz Q2: Chunked Content", component: CurbCutQuizScreen, duration: 3, notes: "Q2 with reveal-on-arrow.", pollQuestion: "How much does chunked content improve completion rates for everyone?", pollOptions: ["10%", "30%", "50%", "75%"] },
  { id: "LD5.4", title: "Quiz Q3: Multiple Formats", component: CurbCutQuizScreen, duration: 3, notes: "Q3 with reveal-on-arrow.", pollQuestion: "What share of learners prefer having content in multiple formats (text + audio + visual)?", pollOptions: ["35%", "55%", "70%", "80%+"] },
  { id: "LD5.5", title: "The Free-Tier Divide", component: FreeTierDivideScreen, duration: 3, notes: "Zhao et al. 2025 — 91% of disabled students locked into free tiers." },
  { id: "LD5.6", title: "The Institutional Case", component: RetentionEquityScreen, duration: 4, notes: "Retention / Title III / SACSCOC hook." },
  { id: "LD5.7", title: "Learning Design Curb Cuts", component: CurbCutExamplesScreen, duration: 4, notes: "Real examples." },

  // ═══ ACT 6 — Make Something (9 slides · ~50 min) ═══
  { id: "LD6.0", title: "Chapter — Make Something", component: MakeSomethingChapterScreen, duration: 1, notes: "Chapter card." },
  { id: "LD6.1", title: "Workshop: Redesign Your Slide", component: RedesignWorkshopScreen, duration: 12, notes: "Hands-on faculty workshop.", requiresSession: true },
  { id: "LD6.2", title: "Cognitive Load + UDL", component: CognitiveLoadUDLScreen, duration: 5, notes: "Two principles for the next 30 minutes." },
  { id: "LD6.3", title: "AI Student: Setup", component: AIStudentSetupScreen, duration: 3, notes: "You are now the teacher. Three rounds." },
  { id: "LD6.4", title: "AI Student: Round 1 — Teach", component: AIStudentScreen, duration: 8, notes: "Teach the AI a concept; watch where it misunderstands.", requiresSession: true, props: { round: 1 } },
  { id: "LD6.5", title: "AI Student: Round 2 — Redesign", component: AIStudentScreen, duration: 6, notes: "Re-teach using UDL + cognitive load.", requiresSession: true, props: { round: 2 } },
  { id: "LD6.6", title: "AI Student: Round 3 — Iterate", component: AIStudentScreen, duration: 5, notes: "Watch the score improve. Iteration doubles quality.", requiresSession: true, props: { round: 3 } },
  { id: "LD6.7", title: "Co-Design With ND Students", component: CoDesignScreen, duration: 4, notes: "Special Olympics co-design model. Nothing about us without us." },
  // LD6.8 removed (peer talk — Zoom delivery)

  // ═══ ACT 7 — Close With the Callback (6 slides · ~15 min) ═══
  { id: "LD7.0", title: "Zoox Callback — Your Windshield Wiper", component: ZooxCallbackScreen, duration: 3, notes: "Callback to the opening question. What's the windshield wiper in your syllabus?" },
  { id: "LD7.1", title: "The Inclusive Support Stack", component: InclusiveSupportStackScreen, duration: 4, notes: "Accessible curriculum → AT → AI → human judgment." },
  { id: "LD7.2", title: "Commitment Moment", component: CommitmentMomentScreen, duration: 3, notes: "Name one change for fall. Write it down." },
  // LD7.3 removed (peer accountability — Zoom delivery)
  { id: "LD7.4", title: "Identity Move — Prototyping the Future", component: IdentityMoveScreen, duration: 2, notes: "I'm not accommodating. I'm prototyping the future." },
  { id: "LD7.5", title: "Take It With You", component: OnePagerDownloadScreen, duration: 2, notes: "Faculty one-pager. Footnote, not climax." },
];

// Slide IDs that accept (isFacilitator, sessionId, userId) interactive props
export const INTERACTIVE_SLIDE_IDS = new Set<string>([
  "LD1.1",   // Windshield wipers poll
  "LD2.3",   // (was disclosure gap — kept here in case poll-style props passed)
  "LD3.1",   // Photo collection
  "LD3.2",   // Human patterns
  "LD3.3",   // AI patterns
  "LD3.4",   // Mental imagery
  "LD3.5",   // Inner voice
  "LD3.6",   // Time perception
  "LD3.7",   // Feedback sensitivity
  "LD3.8",   // Discovery wall
  "LD5.2",   // Curb-cut quiz Q1
  "LD5.3",   // Curb-cut quiz Q2
  "LD6.1",   // Redesign workshop
  "LD6.4",   // AI student R1
  "LD6.5",   // AI student R2
  "LD6.6",   // AI student R3
]);
