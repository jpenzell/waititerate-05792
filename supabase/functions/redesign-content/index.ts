import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content } = await req.json();
    if (!content || typeof content !== 'string' || content.length > 4000) {
      throw new Error('Provide content (max 4000 chars).');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY not configured');

    const system = `You are a community-college learning designer trained in Universal Design for Learning. A faculty member will paste a slide, handout paragraph, or assignment instructions. Produce THREE short rewrites of the SAME content, each optimized for a different cognitive lens. Return ONLY valid JSON with this exact shape:
{
  "rewrites": [
    { "label": "Chunked & Scannable", "why": "one sentence why this helps", "content": "the rewrite" },
    { "label": "Multi-Modal", "why": "one sentence why this helps", "content": "the rewrite — describe alt-format suggestions inline (audio cue, diagram cue, demo cue)" },
    { "label": "Plain Language (8th-grade ESL friendly)", "why": "one sentence why this helps", "content": "the rewrite" }
  ]
}
Rules: keep all factual content, tighten wording, no jargon, no markdown in the JSON values, no preamble.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${LOVABLE_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: `Original content from a community-college course:\n\n${content}` },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.6,
      }),
    });

    if (!response.ok) {
      const txt = await response.text();
      console.error('AI error', response.status, txt);
      throw new Error(`AI error ${response.status}`);
    }
    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content ?? '{}';
    const cleaned = raw.replace(/```json\n?/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('redesign-content error:', msg);
    return new Response(JSON.stringify({ error: msg, rewrites: [] }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});