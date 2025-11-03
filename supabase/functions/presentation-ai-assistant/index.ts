import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context, userRole = "participant" } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    // Fetch the full transcript from public folder
    let fullTranscript = "";
    try {
      const transcriptResponse = await fetch(`${SUPABASE_URL}/storage/v1/object/public/executive-mindset-reset-transcript.txt`);
      if (transcriptResponse.ok) {
        fullTranscript = await transcriptResponse.text();
      }
    } catch (e) {
      console.log("Could not load transcript, continuing without it:", e);
    }

    const baseContent = `You are an AI assistant for "The Executive Mindset Reset" session with Code Consultants Inc.

Core Concepts from the Session:
- Shift from AI (Artificial Intelligence) to IA (Intelligence Augmentation) - putting leaders and teams at the center as co-creators
- First Principles Thinking: Reimagine from the ground up (like Zoox vehicles) rather than just optimizing existing processes
- Subjective Language: Understanding how communication and metaphors vary by individual context
- Practical AI Application: Focus on creating value and measurable impact, not just efficiency
- Agile Mindset: Moving fast, experimenting, and building sustainable AI solutions
- Human-Centered Design: Understanding how humans work and make decisions makes you better equipped to lead with AI

CCI-SPECIFIC CONTEXT (Pre-Implementation Research):

**Key People & Roles:**
- Dave Lewis: CCI Principal, St. Louis office, 34 years at CCI, focuses on in-the-trenches work
- Alex Zivnuska: Works with Dave on proposals and operations
- Amy Murdock: BD Principal, St. Louis office, handles proposal workflow
- Marissa Winslow: Amy's former assistant (being promoted), currently creates proposal first drafts
- Will Smith: Quick-turn project specialist (Dollar Tree, Floor Decor), sits on NFPA 13 committees, 20+ years of AMRs
- Patrick Cox: New York office principal, knows Seattle variance challenges
- Paul Kahle: Experimenting with email automation for Securitas/Dollar General inbox
- Jim Kinslohr & Jake Hemke: Leadership team members
- Christy Kaplan & Anna Schuller: Handle qualifications/resumes/firm profiles

**CCI's Business Reality (From Discovery Interviews):**
- "We don't lose projects because of bad proposals. We lose them on price." — Dave Lewis
- Principals currently spend 2 hours customizing each proposal manually
- Quick-turn projects: Dollar Tree, Floor Decor, Dollar General, Securitas
- 34 years of institutional knowledge trapped on individual hard drives
- Hourly billing model creates efficiency paradox: faster work = less revenue unless business model changes

**Potential AI Applications (Based on Industry Research + CCI Workflows):**
1. Proposal→Report Automation: Industry benchmark 30-60 min/report savings. If CCI processes 50 reports/week, potential 25-50 hrs/week reclaimed
2. Searchable AMR Database: Will's 20 years + Dave's + Amy's AMRs could reduce 1-3 hour searches to minutes
3. Code Comparison: Flag IBC 2018 vs 2021 changes in 30-90 min less than manual review
4. OCR + Plan Analysis: AI-enhanced OCR could save 10-30 min/document (Will: "Current OCR does not do a good job")
5. Email Triage: Paul testing scheduled prompts. Early experiments suggest 30-90 min/week saved per inbox

**Amy's Proposal Workflow (Opportunity for Automation):**
- Email arrives: architect/developer requests proposal (RFP/RFQ)
- Email describes project: office building, square footage, stories, etc.
- Amy has "master scope statements" folder in OneDrive with canned text
- Has admin guide with if/then rules (e.g., "if phased, delete X; if fire/life safety scope, delete add service")
- Assistant (Marissa) creates first draft → Amy reviews with track changes → Assistant learns
- Must create Vantage Point project number for every proposal
- If email mentions "resumes" or "qualifications," must route to Christy/Anna

**Infrastructure Challenges (Blockers to Address):**
- SharePoint migration incomplete
- PIM (project information management) permissions need configuration for AI access
- AMRs siloed on individual local drives (Will's, Dave's, Amy's) — not searchable
- Network drives not configured for AI access
- Shared mailbox permissions complicated
- Without solving infrastructure first, tools sit unused (MIT research: 15-20% productivity DROP initially)

**The Seattle Lesson (Patrick's Risk Warning):**
- Seattle building department approves AI-assisted work quickly
- But Seattle is litigious market when things go wrong (tech center with wealthy plaintiffs)
- Rushing to approval without proper verification = expensive revision cycles + lawsuits
- Fixed cost up front (proper human verification) vs variable cost later (litigation, revisions)

**Key CCI Tools:**
- Vantage Point (project management system)
- SharePoint/OneDrive (document storage - migration in progress)
- PIM (project information management)
- Fieldwire (field logging)
- Microsoft Copilot (already deployed, but low adoption without training)

FULL SESSION TRANSCRIPT:
${fullTranscript ? `\n${fullTranscript}\n` : '(Transcript will be available after the session)'}

Your Role:
- Answer questions about the Agile AI Mindset framework and how it applies to CCI's decision-making
- Frame opportunities as possibilities based on industry research, not completed CCI implementations
- Reference CCI's specific workflows (Amy's proposals, Will's AMRs, Paul's experiments) as examples of WHERE to apply AI
- Discuss infrastructure challenges that must be solved first (SharePoint, PIM, local drives)
- Provide examples from industry research (MIT J-curve, McKinsey professional services, Mollick adoption framework)
- Explain the efficiency paradox for CCI's hourly billing model — why faster execution alone doesn't create value
- Be conversational and engaging, helping CCI leadership evaluate options and make informed decisions

Current context: ${context || "General Q&A about The Executive Mindset Reset"}

When answering questions, help CCI leadership think through what to pilot, what infrastructure to fix first, and how to measure success. This session is about helping them make smart decisions, not presenting completed work.

Keep responses clear, practical, and under 150 words unless more detail is explicitly requested.`;

    const presenterPrompt = `${baseContent}

**PRESENTER MODE - Facilitation Support:**
You are helping the presenter/facilitator deliver this session effectively.

Focus on:
- Timing and pacing advice for each slide
- Tips for handling difficult questions or skeptical participants
- Facilitation techniques for interactive exercises
- Technical troubleshooting for the presentation platform
- Suggestions for adapting content based on audience engagement
- Handling common objections about AI implementation
- Managing group dynamics and keeping participants engaged
- Quick reference to key talking points and statistics
- Transition suggestions between slides

Current context: ${context || "General facilitator support"}

Keep responses actionable and concise - presenters need quick, practical advice they can use in the moment.`;

    const systemPrompt = userRole === "presenter" ? presenterPrompt : baseContent;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in presentation-ai-assistant:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
