import { Card } from "@/components/ui/card";
import { SlideShell, PullQuote, StatBlock } from "@/components/slide";
import {
  Eye, Brain, Sparkles, Wind, MessageCircle, Lightbulb,
  TrendingUp, Users, ArrowRight, CheckCircle2, Quote, Target,
} from "lucide-react";

/* ════════════════════════════════════════════════════════════════
   ACT 1
   ════════════════════════════════════════════════════════════════ */

/** 1.3 — The world is changing faster than the templates + meta-frame. */
export const WorldChangingScreen = () => (
  <SlideShell tone="indigo" align="center" ariaLabel="The world is changing faster than the templates">
    <div className="space-y-12">
      <header className="text-center space-y-6">
        <p className="text-lg md:text-xl font-mono uppercase tracking-[0.4em] text-primary">
          The frame for today
        </p>
        <h1 className="text-5xl md:text-7xl font-black text-foreground leading-[1.05]">
          The world is changing faster than the
          <span className="text-primary"> templates can be replaced.</span>
        </h1>
      </header>

      <Card className="p-8 md:p-10 bg-card/70 border-l-8 border-l-primary/60 max-w-4xl mx-auto space-y-4">
        <div className="flex items-start gap-4">
          <Sparkles className="h-10 w-10 text-primary shrink-0 mt-1" aria-hidden="true" />
          <div className="space-y-3">
            <p className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
              This isn't a deck. It's a rehearsal.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-snug">
              I built this site in a weekend with AI. It's the same move I'm asking you to make
              in your classroom — start with the question, not the template.
            </p>
          </div>
        </div>
      </Card>
    </div>
  </SlideShell>
);

/* ════════════════════════════════════════════════════════════════
   ACT 2 — The Hidden Vanguard
   ════════════════════════════════════════════════════════════════ */

/** 2.1 — Personal disclosure. */
export const PersonalDisclosureScreen = () => (
  <SlideShell tone="rose" align="center" ariaLabel="Personal disclosure">
    <div className="space-y-10">
      <header className="text-center space-y-4">
        <p className="text-lg md:text-xl font-mono uppercase tracking-[0.4em] text-muted-foreground">
          Before we go further
        </p>
        <h1 className="text-5xl md:text-7xl font-black text-foreground leading-[1.05]">
          I should tell you <span className="text-primary">how I see this slide.</span>
        </h1>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        <Card className="p-7 bg-card/70 border-t-4 border-t-primary space-y-3">
          <Eye className="h-9 w-9 text-primary" aria-hidden="true" />
          <p className="text-2xl font-bold text-foreground">Aphantasia</p>
          <p className="text-base text-muted-foreground leading-snug">
            I can't picture an apple. Close my eyes — black. I think in words and structure, not images.
          </p>
        </Card>
        <Card className="p-7 bg-card/70 border-t-4 border-t-accent space-y-3">
          <Brain className="h-9 w-9 text-accent" aria-hidden="true" />
          <p className="text-2xl font-bold text-foreground">Autistic + ADHD</p>
          <p className="text-base text-muted-foreground leading-snug">
            Pattern brain. Detail-first. Hyperfocus on the interesting thing, miss the meeting it's in.
          </p>
        </Card>
        <Card className="p-7 bg-card/70 border-t-4 border-t-destructive space-y-3">
          <Wind className="h-9 w-9 text-destructive" aria-hidden="true" />
          <p className="text-2xl font-bold text-foreground">Masking, for years</p>
          <p className="text-base text-muted-foreground leading-snug">
            Performing "normal" eats the energy that should have gone to the actual work.
          </p>
        </Card>
        <Card className="p-7 bg-card/70 border-t-4 border-t-secondary space-y-3">
          <Users className="h-9 w-9 text-secondary-foreground" aria-hidden="true" />
          <p className="text-2xl font-bold text-foreground">
            Birkman Social Energy
          </p>
          <p className="text-base text-foreground leading-snug">
            <span className="font-semibold text-primary">Usual 84</span> · <span className="font-semibold text-accent">Needs 27</span>
            <span className="block text-muted-foreground mt-1">A 57-point reversal: I look outgoing, but I recharge in silence.</span>
          </p>
        </Card>
      </div>

      <p className="text-center text-xl md:text-2xl text-muted-foreground italic max-w-4xl mx-auto">
        I tell you this because the cost of hiding it shows up in the data on the next slide.
      </p>
    </div>
  </SlideShell>
);

/** 2.4 — The cost of masking. */
export const CostOfMaskingScreen = () => (
  <SlideShell tone="slate" align="center" ariaLabel="The cost of masking">
    <div className="space-y-10">
      <header className="text-center space-y-4">
        <p className="text-lg md:text-xl font-mono uppercase tracking-[0.4em] text-destructive">
          What the system has been taking
        </p>
        <h1 className="text-5xl md:text-7xl font-black text-foreground leading-[1.05]">
          Masking isn't politeness.
          <br />
          <span className="text-destructive">It's unpaid labor.</span>
        </h1>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <StatBlock
          value="73%"
          label="of autistic adults mask at work"
          note="Cage et al., 2018 — masking linked to exhaustion and burnout."
          icon={Users}
          accent="destructive"
        />
        <StatBlock
          value="6×"
          label="higher rate of suicidal ideation"
          note="Cassidy et al., 2018 — among autistic adults reporting heavy camouflaging."
          icon={TrendingUp}
          accent="destructive"
        />
        <StatBlock
          value="Late 30s"
          label="median age of adult ND diagnosis"
          note="Huang et al., 2020 — decades of masking before the system sees them."
          icon={Brain}
          accent="primary"
        />
      </div>

      <p className="text-center text-xl md:text-2xl text-foreground font-semibold max-w-4xl mx-auto leading-snug">
        Every "thriving" ND student in your classroom is paying a tax you can't see on the syllabus.
      </p>
    </div>
  </SlideShell>
);

/** 2.5 — The thesis named. */
export const ThesisNamedScreen = () => (
  <SlideShell tone="indigo" align="center" ariaLabel="The thesis named">
    <PullQuote variant="primary" attribution="The thesis of this entire session">
      Neurodivergent minds aren't behind.
      <br />
      <span className="text-primary">They've been ahead, waiting for systems that could meet them.</span>
    </PullQuote>
  </SlideShell>
);

/* ════════════════════════════════════════════════════════════════
   ACT 3 — Feel It
   ════════════════════════════════════════════════════════════════ */

/** 3.9 — The reveal. */
export const TheRevealScreen = () => (
  <SlideShell tone="indigo" align="center" ariaLabel="The reveal">
    <div className="space-y-10 text-center">
      <p className="text-lg md:text-xl font-mono uppercase tracking-[0.4em] text-primary">
        Stop. Look around the room.
      </p>
      <h1 className="text-5xl md:text-7xl font-black text-foreground leading-[1.05] max-w-5xl mx-auto">
        Several of you in this room
        <br />
        <span className="text-primary">are these people.</span>
      </h1>
      <h2 className="text-3xl md:text-5xl font-bold text-muted-foreground leading-snug max-w-5xl mx-auto">
        The rest of you teach them <span className="text-foreground">every day.</span>
      </h2>
      <p className="text-lg md:text-xl text-muted-foreground italic max-w-3xl mx-auto pt-4">
        That's why this matters. Not as theory. As a person two seats over.
      </p>
    </div>
  </SlideShell>
);

/* ════════════════════════════════════════════════════════════════
   ACT 4 — The Accommodation That Already Happened
   ════════════════════════════════════════════════════════════════ */

/** 4.2 — You probably do too. */
export const YouProbablyDoTooScreen = () => (
  <SlideShell tone="amber" align="center" ariaLabel="You probably use AI too">
    <div className="space-y-10">
      <header className="text-center space-y-4">
        <p className="text-lg md:text-xl font-mono uppercase tracking-[0.4em] text-accent">
          Be honest with yourself
        </p>
        <h1 className="text-5xl md:text-7xl font-black text-foreground leading-[1.05]">
          You probably <span className="text-primary">do too.</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-snug">
          The email you sent this morning. The rubric you tightened. The lesson plan you sketched.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <Card className="p-7 bg-card/70 border-l-4 border-l-primary space-y-2">
          <MessageCircle className="h-8 w-8 text-primary" aria-hidden="true" />
          <p className="text-xl font-bold text-foreground">Drafting the hard email</p>
          <p className="text-base text-muted-foreground">AI takes the friction out of starting.</p>
        </Card>
        <Card className="p-7 bg-card/70 border-l-4 border-l-accent space-y-2">
          <Lightbulb className="h-8 w-8 text-accent" aria-hidden="true" />
          <p className="text-xl font-bold text-foreground">Untangling a syllabus</p>
          <p className="text-base text-muted-foreground">AI sees the structure your tired brain can't.</p>
        </Card>
        <Card className="p-7 bg-card/70 border-l-4 border-l-primary space-y-2">
          <Brain className="h-8 w-8 text-primary" aria-hidden="true" />
          <p className="text-xl font-bold text-foreground">Summarizing 40 student emails</p>
          <p className="text-base text-muted-foreground">It's accommodation. You just don't call it that.</p>
        </Card>
        <Card className="p-7 bg-card/70 border-l-4 border-l-accent space-y-2">
          <Sparkles className="h-8 w-8 text-accent" aria-hidden="true" />
          <p className="text-xl font-bold text-foreground">Translating jargon for a student</p>
          <p className="text-base text-muted-foreground">Same accommodation your students want for themselves.</p>
        </Card>
      </div>

      <p className="text-center text-xl md:text-2xl text-foreground font-semibold max-w-4xl mx-auto">
        If it's a tool when you use it, it's a tool when they use it.
      </p>
    </div>
  </SlideShell>
);

/** 4.8 — The clarification. */
export const AIClarificationScreen = () => (
  <SlideShell tone="indigo" align="center" ariaLabel="AI clears friction so thinking can happen">
    <div className="space-y-10">
      <header className="text-center space-y-4">
        <p className="text-lg md:text-xl font-mono uppercase tracking-[0.4em] text-primary">
          Let's name what AI is — and isn't — doing
        </p>
        <h1 className="text-5xl md:text-7xl font-black text-foreground leading-[1.05]">
          AI isn't replacing thinking.
        </h1>
      </header>

      <Card className="p-10 md:p-12 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 max-w-5xl mx-auto">
        <p className="text-3xl md:text-5xl font-black text-foreground leading-tight text-center">
          AI clears the <span className="text-primary">friction</span> so neurodivergent minds
          can finally do the <span className="text-accent">thinking the future needs.</span>
        </p>
      </Card>

      <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto text-center">
        <div className="p-5 bg-card/50 rounded-lg">
          <p className="text-lg uppercase tracking-wider text-muted-foreground mb-1">Friction removed</p>
          <p className="text-lg font-bold text-foreground">Spelling, structure, formatting, recall</p>
        </div>
        <div className="p-5 bg-card/50 rounded-lg">
          <p className="text-lg uppercase tracking-wider text-muted-foreground mb-1">Thinking preserved</p>
          <p className="text-lg font-bold text-foreground">Pattern, judgment, synthesis, ethics</p>
        </div>
        <div className="p-5 bg-card/50 rounded-lg">
          <p className="text-lg uppercase tracking-wider text-muted-foreground mb-1">What you assess</p>
          <p className="text-lg font-bold text-foreground">The thinking. Always the thinking.</p>
        </div>
      </div>
    </div>
  </SlideShell>
);

/* ════════════════════════════════════════════════════════════════
   ACT 6 — Make Something
   ════════════════════════════════════════════════════════════════ */

/** 6.2 — Cognitive Load + UDL combined frame for the workshop. */
export const CognitiveLoadUDLScreen = () => (
  <SlideShell tone="emerald" align="center" ariaLabel="Cognitive load and UDL">
    <div className="space-y-10">
      <header className="text-center space-y-4">
        <p className="text-lg md:text-xl font-mono uppercase tracking-[0.4em] text-accent">
          Two principles for the next 30 minutes
        </p>
        <h1 className="text-5xl md:text-7xl font-black text-foreground leading-[1.05]">
          Lower the load. <span className="text-primary">Widen the doors.</span>
        </h1>
      </header>

      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <Card className="p-8 bg-card/70 border-l-8 border-l-primary space-y-4">
          <p className="text-lg font-mono uppercase tracking-wider text-primary">Cognitive load</p>
          <p className="text-3xl md:text-4xl font-black text-foreground leading-tight">
            Working memory holds <span className="text-primary">~4 items.</span>
          </p>
          <p className="text-lg text-muted-foreground leading-snug">
            Every extraneous element — bad layout, jargon, dense slides — eats one of those slots.
            Sweller, 1988 · Cowan, 2010.
          </p>
        </Card>
        <Card className="p-8 bg-card/70 border-l-8 border-l-accent space-y-4">
          <p className="text-lg font-mono uppercase tracking-wider text-accent">UDL</p>
          <p className="text-3xl md:text-4xl font-black text-foreground leading-tight">
            Multiple means of <span className="text-accent">representation, action, engagement.</span>
          </p>
          <p className="text-lg text-muted-foreground leading-snug">
            Don't accommodate one student at a time. Design once so the door is wide.
            CAST UDL Guidelines 3.0.
          </p>
        </Card>
      </div>

      <p className="text-center text-xl md:text-2xl text-foreground font-semibold max-w-4xl mx-auto">
        Apply both to the slide you brought.
      </p>
    </div>
  </SlideShell>
);

/** 6.3 — AI Student setup. */
export const AIStudentSetupScreen = () => (
  <SlideShell tone="amber" align="center" ariaLabel="AI Student setup">
    <div className="space-y-10">
      <header className="text-center space-y-4">
        <p className="text-lg md:text-xl font-mono uppercase tracking-[0.4em] text-primary">
          Flip the script
        </p>
        <h1 className="text-5xl md:text-7xl font-black text-foreground leading-[1.05]">
          You are now <span className="text-primary">the teacher.</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-snug">
          The AI is your student. Your job: teach it one concept from your course well enough
          that it can pass a quiz on it.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {[
          { round: "Round 1", title: "Teach", body: "Explain it the way you usually do. Watch where it misunderstands." },
          { round: "Round 2", title: "Redesign", body: "Re-teach using what UDL + cognitive load tell you." },
          { round: "Round 3", title: "Iterate", body: "Watch the score improve. Iteration doubles quality." },
        ].map((r, i) => (
          <Card key={i} className="p-6 bg-card/70 border-t-4 border-t-primary text-center space-y-2">
            <p className="text-lg font-mono uppercase tracking-wider text-primary">{r.round}</p>
            <p className="text-2xl font-bold text-foreground">{r.title}</p>
            <p className="text-base text-muted-foreground leading-snug">{r.body}</p>
          </Card>
        ))}
      </div>

      <p className="text-center text-lg text-muted-foreground italic">
        The point isn't the AI. The point is what teaching it shows you about your own design.
      </p>
    </div>
  </SlideShell>
);

/* ════════════════════════════════════════════════════════════════
   ACT 7 — Close With the Callback
   ════════════════════════════════════════════════════════════════ */

/** 7.0 — Zoox callback. */
export const ZooxCallbackScreen = () => (
  <SlideShell tone="indigo" align="center" ariaLabel="Zoox callback">
    <div className="space-y-12 text-center">
      <p className="text-lg md:text-xl font-mono uppercase tracking-[0.4em] text-primary">
        Three hours ago I asked you a question
      </p>
      <h1 className="text-6xl md:text-8xl font-black text-foreground leading-[1.0]">
        What's the <span className="text-primary">windshield wiper</span>
        <br />
        in your syllabus?
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-snug">
        The thing that's there because it's always been there. The thing that was built for
        a problem you no longer have.
      </p>
    </div>
  </SlideShell>
);

/** 7.2 — Commitment moment. */
export const CommitmentMomentScreen = () => (
  <SlideShell tone="emerald" align="center" ariaLabel="Commitment moment">
    <div className="space-y-10">
      <header className="text-center space-y-4">
        <p className="text-lg md:text-xl font-mono uppercase tracking-[0.4em] text-accent">
          Right now. Not later.
        </p>
        <h1 className="text-5xl md:text-7xl font-black text-foreground leading-[1.05]">
          Name <span className="text-accent">one thing</span> you'll change for fall.
        </h1>
      </header>

      <Card className="p-8 md:p-10 bg-card/70 border-2 border-accent/40 max-w-4xl mx-auto space-y-5">
        <p className="text-lg font-mono uppercase tracking-wider text-accent">Pick one</p>
        <ul className="space-y-3 text-xl md:text-2xl text-foreground">
          <li className="flex items-start gap-3"><Target className="h-7 w-7 text-accent shrink-0 mt-1" aria-hidden="true" />Rewrite the AI policy on one syllabus.</li>
          <li className="flex items-start gap-3"><Target className="h-7 w-7 text-accent shrink-0 mt-1" aria-hidden="true" />Redesign one assignment for multiple means of expression.</li>
          <li className="flex items-start gap-3"><Target className="h-7 w-7 text-accent shrink-0 mt-1" aria-hidden="true" />Add captions + transcripts to every video this term.</li>
          <li className="flex items-start gap-3"><Target className="h-7 w-7 text-accent shrink-0 mt-1" aria-hidden="true" />Run the AI Student exercise on one lesson before you teach it.</li>
        </ul>
      </Card>

      <p className="text-center text-xl text-muted-foreground italic">
        Write it down. Real ink, real paper. The brain commits to what the hand makes.
      </p>
    </div>
  </SlideShell>
);

/** 7.4 — Identity move. */
export const IdentityMoveScreen = () => (
  <SlideShell tone="indigo" align="center" ariaLabel="Identity move">
    <div className="space-y-12 text-center">
      <Quote className="h-16 w-16 text-primary mx-auto" aria-hidden="true" />
      <h1 className="text-6xl md:text-8xl font-black text-foreground leading-[1.0] max-w-5xl mx-auto">
        I'm not <span className="line-through text-muted-foreground/60">accommodating.</span>
      </h1>
      <h2 className="text-5xl md:text-7xl font-black text-primary leading-[1.0] max-w-5xl mx-auto">
        I'm prototyping the future.
      </h2>
      <p className="text-xl md:text-2xl text-muted-foreground italic max-w-3xl mx-auto pt-4">
        Say it once out loud. That's the identity that gets you through October.
      </p>
    </div>
  </SlideShell>
);
