import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// AI Student edge function — used by LD7.3 (AIStudentScreen).
// Roleplays a curious first-year community-college student. The teacher
// (the workshop participant) explains a concept; the AI student responds
// in-character with one short follow-up question or paraphrase. When the
// participant clicks "Quiz Time" we ask the same model 5 questions about
// what was taught and grade itself.

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { mode, conversation = [], userMessage } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const personaSystem = `You are roleplaying a curious, motivated first-year community college student.
You are talkative but humble. You ask exactly ONE short follow-up question or
paraphrase per turn. You never lecture the teacher. You never use jargon they
haven't introduced. Reply in 1–3 sentences only. Stay in character.`;

    const transcript = conversation
      .map((m: { role: string; text: string }) => `${m.role === "teacher" ? "Teacher" : "Student"}: ${m.text}`)
      .join("\n");

    let systemPrompt = personaSystem;
    let userContent = userMessage ?? "";

    if (mode === "quiz") {
      systemPrompt = `You are grading yourself as a student. Based ONLY on what the
teacher actually taught in the transcript below, write 5 quiz questions you
would ask yourself, then answer each one as the student would after that
lesson, then mark each answer correct or incorrect based strictly on whether
the teacher actually covered that point. Return JSON only:
{"questions":[{"q":"...","a":"...","correct":true|false,"explanation":"..."}]}`;
      userContent = `Transcript so far:\n${transcript}\n\nProduce the JSON now.`;
    }

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
          ...(mode === "quiz"
            ? [{ role: "user", content: userContent }]
            : conversation.map((m: { role: string; text: string }) => ({
                role: m.role === "teacher" ? "user" : "assistant",
                content: m.text,
              })).concat({ role: "user", content: userMessage ?? "" })),
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit reached. Slow down." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiText: string = data.choices?.[0]?.message?.content ?? "";

    if (mode === "quiz") {
      // Try to extract JSON
      let parsed: unknown = null;
      const match = aiText.match(/\{[\s\S]*\}/);
      try {
        parsed = match ? JSON.parse(match[0]) : null;
      } catch (_e) {
        parsed = null;
      }
      const questions = (parsed as { questions?: Array<{ q: string; a: string; correct: boolean; explanation?: string }> })?.questions ?? [];
      const correct = questions.filter((q) => q.correct).length;
      return new Response(
        JSON.stringify({
          questions,
          correct,
          total: questions.length || 0,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ response: aiText }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in ai-student:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});