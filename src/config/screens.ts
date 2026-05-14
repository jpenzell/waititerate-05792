// ─── 7-Act outline. 54 slides. AI for All Minds. ───
// Through-line: ND minds aren't behind. They've been ahead, waiting for systems
// that could meet them. AI is the first system that doesn't require the bending.

import { LDTitleScreen } from "@/components/screens/LDTitleScreen";
import { WindshieldWipersScreen } from "@/components/screens/WindshieldWipersScreen";
import { WindshieldWipersRevealScreen } from "@/components/screens/WindshieldWipersRevealScreen";
import { RCCCContextScreen } from "@/components/screens/RCCCContextScreen";
import { AboutMeScreen } from "@/components/screens/AboutMeScreen";
import { BallOnTablePromptScreen } from "@/components/screens/BallOnTablePromptScreen";
import { MentalImagerySpectrumScreen } from "@/components/screens/MentalImagerySpectrumScreen";
import { AphantasiaStatsScreen } from "@/components/screens/AphantasiaStatsScreen";
import { OneWordStoryIntroScreen } from "@/components/screens/OneWordStoryIntroScreen";
import { OneWordStoryLiveScreen } from "@/components/screens/OneWordStoryLiveScreen";
import { ElephantQuestionScreen } from "@/components/screens/ElephantQuestionScreen";
import { ElephantEstimateScreen } from "@/components/screens/ElephantEstimateScreen";
import { LLMExplainerScreen } from "@/components/screens/LLMExplainerScreen";
import { ProbabilisticExplainerScreen } from "@/components/screens/ProbabilisticExplainerScreen";
import { HallucinationScreen } from "@/components/screens/HallucinationScreen";
import { PatternRecognitionScreen } from "@/components/screens/PatternRecognitionScreen";
import { AnnieDukeStudyScreen } from "@/components/screens/AnnieDukeStudyScreen";

import { YouGovSelfIDScreen } from "@/components/screens/YouGovSelfIDScreen";
import { DisclosureGapScreen } from "@/components/screens/DisclosureGapScreen";

import { InnerVoiceScreen } from "@/components/screens/InnerVoiceScreen";
import { TimePerceptionScreen } from "@/components/screens/TimePerceptionScreen";
import { FeedbackSensitivityScreen } from "@/components/screens/FeedbackSensitivityScreen";
import { InjusticeSensitivityScreen } from "@/components/screens/InjusticeSensitivityScreen";
import { DifferentialByConditionScreen } from "@/components/screens/DifferentialByConditionScreen";

import { StudentsAlreadyUsingAIScreen } from "@/components/screens/StudentsAlreadyUsingAIScreen";
import { HumanizeMyWordsScreen } from "@/components/screens/HumanizeMyWordsScreen";
import { WorkaroundForGatekeepingScreen } from "@/components/screens/WorkaroundForGatekeepingScreen";
import { ShadowAccommodationScreen } from "@/components/screens/ShadowAccommodationScreen";
import { OpenUniversityTaylorScreen } from "@/components/screens/OpenUniversityTaylorScreen";
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
import { SpecialOlympicsGapScreen } from "@/components/screens/SpecialOlympicsGapScreen";

import { InclusiveSupportStackScreen } from "@/components/screens/InclusiveSupportStackScreen";
import { OnePagerDownloadScreen } from "@/components/screens/OnePagerDownloadScreen";

import {
  HiddenVanguardChapterScreen,
  FeelItChapterScreen,
  AccommodationChapterScreen,
  DesignForVanguardChapterScreen,
  MakeSomethingChapterScreen,
  CloseChapterScreen,
  NoTwoAIsAlikeChapterScreen,
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
  { id: "LD1.02", title: "Opener — Ball on a Table (Prompt)", component: BallOnTablePromptScreen, duration: 2, notes: "Have everyone close their eyes. Describe the ball: color, size, texture, lighting, the table it sits on. Take your time. Then ask: 'What did you see?'" },
  { id: "LD1.03", title: "Opener — The Imagery Spectrum", component: MentalImagerySpectrumScreen, duration: 3, notes: "Five cards from no-image → photo-real. Walk the room through each one and let people locate themselves. Pause for the gasps." },
  { id: "LD1.04", title: "Opener — Aphantasia Stats", component: AphantasiaStatsScreen, duration: 3, notes: "~4% aphantasia · ~3% hyperphantasia. Land it: people in this room think differently — and they didn't know that about themselves OR each other. Sets up the entire 'feel it' thread." },
  { id: "LD1.07", title: "About Me — Josh Penzell", component: AboutMeScreen, duration: 2, notes: "Quick intro: who I am and the path that got me here. Drag the logos." },
  { id: "LD1.1", title: "Zoox Question — Windshield Wipers", component: WindshieldWipersScreen, duration: 4, notes: "Does a self-driving car need windshield wipers? Show of hands or live poll.", pollQuestion: "Does a self-driving car need windshield wipers?", pollOptions: ["Yes", "No", "Who knows anymore?"] },
  { id: "LD1.2", title: "Zoox Reveal", component: WindshieldWipersRevealScreen, duration: 1, notes: "Full-bleed Zoox image. No driver, no windshield, no wipers." },
  { id: "LD1.3", title: "The Templates Can't Keep Up", component: WorldChangingScreen, duration: 3, notes: "Meta-frame: this is a rehearsal, not a deck. Built in a weekend with AI." },
  { id: "LD1.4", title: "Who's in Your RCCC Classroom", component: RCCCContextScreen, duration: 5, notes: "Audience grounding for Rowan-Cabarrus Summer Institute." },

  // ═══ ACT 2 — The Hidden Vanguard (moved up: comes right after LD1.4) ═══
  { id: "LD2.0", title: "Chapter — The Hidden Vanguard", component: HiddenVanguardChapterScreen, duration: 1, notes: "Chapter card." },
  { id: "LD2.2", title: "1 in 5 Adults Self-ID as ND", component: YouGovSelfIDScreen, duration: 3, notes: "YouGov 2023 — 19% of US adults self-identify as neurodivergent." },
  { id: "LD2.3", title: "The 5× Disclosure Gap", component: DisclosureGapScreen, duration: 4, notes: "~36% identify vs 6–7% registered. Purdue + NCES + Doyle." },
  { id: "LD2.4", title: "The Cost of Masking", component: CostOfMaskingScreen, duration: 4, notes: "What the system has been taking. Cage 2018, Cassidy 2018, Huang 2020." },
  { id: "LD2.5", title: "The Thesis Named", component: ThesisNamedScreen, duration: 2, notes: "ND minds aren't behind. They've been ahead, waiting for systems that could meet them." },

  // ═══ ACT 3 — Feel It (11 slides · ~45 min) ═══
  { id: "LD3.0", title: "Chapter — Feel It", component: FeelItChapterScreen, duration: 1, notes: "Chapter card." },
  { id: "LD3.5", title: "Inner Voice", component: InnerVoiceScreen, duration: 5, notes: "Reading voice." },
  { id: "LD3.6", title: "Time Perception", component: TimePerceptionScreen, duration: 5, notes: "Time blindness." },
  { id: "LD3.61", title: "Duck or Rabbit?", component: PatternRecognitionScreen, duration: 4, notes: "Same image, two interpretations. Pattern recognition is subjective — what you see depends on what your brain expects." },
  { id: "LD3.62", title: "Language Subjectivity — Annie Duke", component: AnnieDukeStudyScreen, duration: 5, notes: "Probability words like 'serious possibility' or 'rarely' mean wildly different things to different people — and to different AI models. Words are not numbers." },
  { id: "LD3.78", title: "Differential by Condition", component: DifferentialByConditionScreen, duration: 4, notes: "ADHD / Autism / Dyslexia / TBI — AI helps each group differently. Synthesized from Atcheson 2025, Pierrès 2024, Zhao 2025, Ma 2026." },
  { id: "LD3.9", title: "The Reveal — They're In This Room", component: TheRevealScreen, duration: 3, notes: "Several of you on this call are these people. The rest of you teach them every day." },

  // ═══ ACT 4 — No Two AIs Are Alike (warm-ups + AI explainer) ═══
  { id: "LD4.00", title: "Chapter — No Two AIs Are Alike", component: NoTwoAIsAlikeChapterScreen, duration: 1, notes: "Chapter card." },
  { id: "LD1.6", title: "Warm-up — Cast Call", component: OneWordStoryIntroScreen, duration: 2, notes: "Improv warm-up. Ask for 3 volunteers; demo animation explains the one-word story format." },
  { id: "LD1.7", title: "Warm-up — One-Word Story", component: OneWordStoryLiveScreen, duration: 4, notes: "Live-type one-word story. Type each word as the volunteers shout it. Enter locks. Backspace on empty undoes." },
  { id: "LD1.92", title: "How AI Predicts — Word by Word", component: LLMExplainerScreen, duration: 3, notes: "Auto-playing visualization: 'The sun set over the vineyard…' Top-4 candidates per step with probabilities. Press P to pause." },
  { id: "LD1.8", title: "Warm-up — Answer Together", component: ElephantQuestionScreen, duration: 4, notes: "Same mechanic, real question: how many elephants fit in the Charlotte Convention Center? Sets up the AI estimation thread later." },
  { id: "LD1.85", title: "Live Estimate — Audience + AI", component: ElephantEstimateScreen, duration: 5, notes: "Type guesses from the room as people shout numbers. AI models (Gemini Flash/Pro, GPT-5 Mini/Nano) stream their estimates in parallel. Number-line shows the spread; big numbers land on the wall in audience teal vs AI primary." },
  { id: "LD1.87", title: "AI Always Hallucinates", component: HallucinationScreen, duration: 3, notes: "Even the best models predict, they don't retrieve truth. Confidence ≠ correctness. Bigger models hallucinate more confidently, not less often. Treat every output as a draft to verify." },
  { id: "LD1.95", title: "LLMs Predict, They Don't Know — Anthropic", component: ProbabilisticExplainerScreen, duration: 4, notes: "Anthropic's explainer video on probabilistic AI. Embedded YouTube. Closes with: treat outputs as drafts to coach, not finished truth." },

  // ═══ ACT 5 — The Accommodation That Already Happened (9 slides · ~30 min) ═══
  { id: "LD4.0", title: "Chapter — The Accommodation That Already Happened", component: AccommodationChapterScreen, duration: 1, notes: "Chapter card." },
  { id: "LD4.1", title: "Students Already Use AI", component: StudentsAlreadyUsingAIScreen, duration: 3, notes: "HEPI 2025 — 92% of UK undergrads use GenAI." },
  { id: "LD4.2", title: "You Probably Do Too", component: YouProbablyDoTooScreen, duration: 3, notes: "Faculty already use AI for the same accommodations students want." },
  { id: "LD4.3", title: "Humanize My Words", component: HumanizeMyWordsScreen, duration: 4, notes: "Ma et al. 2026 — masking-as-a-service." },
  { id: "LD4.4", title: "Shadow Accommodation", component: ShadowAccommodationScreen, duration: 4, notes: "Atcheson et al. CHI 2025 — AI does what the institution doesn't." },
  { id: "LD4.45", title: "Workaround for Gatekeeping", component: WorkaroundForGatekeepingScreen, duration: 4, notes: "Atcheson et al. CHI 2025 — 25 of 62 students said GenAI supports them in ways the university doesn't. Two student quotes (P10, P31)." },
  { id: "LD4.47", title: "Open University 'Taylor'", component: OpenUniversityTaylorScreen, duration: 3, notes: "Co-designed digital assistant at the front door of disability services. AI handles intake, humans handle judgment." },
  { id: "LD4.5", title: "Doctor + AI Paradox", component: AIParadoxRevealScreen, duration: 4, notes: "JAMA 2024." },
  { id: "LD4.8", title: "AI Clears Friction So Thinking Can Happen", component: AIClarificationScreen, duration: 3, notes: "AI isn't replacing thinking. It clears friction so ND minds can do the thinking the future needs." },

  // ═══ ACT 6 — Design for the Vanguard, Win for Everyone (8 slides · ~25 min) ═══
  { id: "LD5.0", title: "Chapter — Design for the Vanguard", component: DesignForVanguardChapterScreen, duration: 1, notes: "Chapter card." },
  { id: "LD5.1", title: "The Curb-Cut Effect — Introduction", component: CurbCutIntroScreen, duration: 3, notes: "Curb-cut effect intro." },
  { id: "LD5.2", title: "Quiz Q1: Closed Captions", component: CurbCutQuizScreen, duration: 3, notes: "Q1 with reveal-on-arrow.", pollQuestion: "What percentage of ALL viewers use closed captions (not just deaf/hard-of-hearing)?", pollOptions: ["20%", "45%", "71%", "85%"] },
  { id: "LD5.3", title: "Quiz Q2: Chunked Content", component: CurbCutQuizScreen, duration: 3, notes: "Q2 with reveal-on-arrow.", pollQuestion: "How much does chunked content improve completion rates for everyone?", pollOptions: ["10%", "30%", "50%", "75%"] },
  { id: "LD5.4", title: "Quiz Q3: Multiple Formats", component: CurbCutQuizScreen, duration: 3, notes: "Q3 with reveal-on-arrow.", pollQuestion: "What share of learners prefer having content in multiple formats (text + audio + visual)?", pollOptions: ["35%", "55%", "70%", "80%+"] },
  { id: "LD5.5", title: "The Free-Tier Divide", component: FreeTierDivideScreen, duration: 3, notes: "Zhao et al. 2025 — 91% of disabled students locked into free tiers." },
  { id: "LD4.6", title: "The Detector Is the Cheater", component: DetectorBiasScreen, duration: 4, notes: "Liang et al. 2023 — 61% false-positive on non-native English." },
  { id: "LD5.7", title: "Learning Design Curb Cuts", component: CurbCutExamplesScreen, duration: 4, notes: "Real examples." },

  // ═══ ACT 7 — Make Something (9 slides · ~50 min) ═══
  { id: "LD6.0", title: "Chapter — Make Something", component: MakeSomethingChapterScreen, duration: 1, notes: "Chapter card." },
  { id: "LD6.1", title: "Workshop: Redesign Your Slide", component: RedesignWorkshopScreen, duration: 12, notes: "Hands-on faculty workshop.", requiresSession: true },
  { id: "LD6.2", title: "Cognitive Load + UDL", component: CognitiveLoadUDLScreen, duration: 5, notes: "Two principles for the next 30 minutes." },
  { id: "LD6.3", title: "AI Student: Setup", component: AIStudentSetupScreen, duration: 3, notes: "You are now the teacher. Three rounds." },
  { id: "LD6.4", title: "AI Student: Round 1 — Teach", component: AIStudentScreen, duration: 8, notes: "Teach the AI a concept; watch where it misunderstands.", requiresSession: true, props: { round: 1 } },
  { id: "LD6.5", title: "AI Student: Round 2 — Redesign", component: AIStudentScreen, duration: 6, notes: "Re-teach using UDL + cognitive load.", requiresSession: true, props: { round: 2 } },
  { id: "LD6.6", title: "AI Student: Round 3 — Iterate", component: AIStudentScreen, duration: 5, notes: "Watch the score improve. Iteration doubles quality.", requiresSession: true, props: { round: 3 } },
  { id: "LD6.7", title: "Co-Design With ND Students", component: CoDesignScreen, duration: 4, notes: "Special Olympics co-design model. Nothing about us without us." },
  { id: "LD6.75", title: "Special Olympics — The Inclusion Gap", component: SpecialOlympicsGapScreen, duration: 3, notes: "Stratalys × Special Olympics 2024. 77% of parents and 64% of educators see AI as a mechanism for inclusion — but only 35% think developers account for IDD students. Tim Shriver / Nathan Cook close." },
  // LD6.8 removed (peer talk — Zoom delivery)

  // ═══ ACT 8 — Close With the Callback (6 slides · ~15 min) ═══
  { id: "LD7.0", title: "Zoox Callback — Your Windshield Wiper", component: ZooxCallbackScreen, duration: 3, notes: "Callback to the opening question. What's the windshield wiper in your syllabus?" },
  { id: "LD7.1", title: "The Inclusive Support Stack", component: InclusiveSupportStackScreen, duration: 4, notes: "Accessible curriculum → AT → AI → human judgment." },
  { id: "LD7.2", title: "Commitment Moment", component: CommitmentMomentScreen, duration: 3, notes: "Name one change for fall. Write it down." },
  // LD7.3 removed (peer accountability — Zoom delivery)
  { id: "LD7.4", title: "Identity Move — Prototyping the Future", component: IdentityMoveScreen, duration: 2, notes: "I'm not accommodating. I'm prototyping the future." },
  { id: "LD7.5", title: "Take It With You", component: OnePagerDownloadScreen, duration: 2, notes: "Faculty one-pager. Footnote, not climax." },
  { id: "LD3.75", title: "Injustice Sensitivity", component: InjusticeSensitivityScreen, duration: 4, notes: "ND brains often register unfairness — to self and others — as a whole-body alarm. Easily mislabeled as defiance or inflexibility." },
  { id: "LD3.7", title: "Feedback Sensitivity (RSD)", component: FeedbackSensitivityScreen, duration: 4, notes: "Why a single comment can derail a week." },
  { id: "LD4.7", title: "I'm Just Autistic", component: WilliamsIdentityScreen, duration: 3, notes: "Donna Williams identity-first language quote." },
  { id: "LD5.6", title: "The Institutional Case", component: RetentionEquityScreen, duration: 4, notes: "Retention / Title III / SACSCOC hook." },
];

// Slide IDs that accept (isFacilitator, sessionId, userId) interactive props
export const INTERACTIVE_SLIDE_IDS = new Set<string>([
  "LD1.1",   // Windshield wipers poll
  "LD2.3",   // (was disclosure gap — kept here in case poll-style props passed)
  "LD3.5",   // Inner voice
  "LD3.7",   // Feedback sensitivity
  "LD5.2",   // Curb-cut quiz Q1
  "LD5.3",   // Curb-cut quiz Q2
  "LD6.1",   // Redesign workshop
  "LD6.4",   // AI student R1
  "LD6.5",   // AI student R2
  "LD6.6",   // AI student R3
]);
