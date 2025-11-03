import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId } = await req.json();
    console.log('Analyzing blind spots for session:', sessionId);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch photos from the session
    const { data: photos, error: photosError } = await supabase
      .from('photo_submissions')
      .select('*')
      .eq('session_id', sessionId);

    if (photosError) {
      console.error('Error fetching photos:', photosError);
      throw photosError;
    }

    // Fetch human-identified patterns
    const { data: patterns, error: patternsError } = await supabase
      .from('pattern_submissions')
      .select('*')
      .eq('session_id', sessionId);

    if (patternsError) {
      console.error('Error fetching patterns:', patternsError);
      throw patternsError;
    }

    console.log(`Found ${photos?.length || 0} photos and ${patterns?.length || 0} patterns`);

    // Build context for AI
    const humanPatterns = patterns?.map(p => p.pattern_text).join(', ') || 'None identified';
    const photoCount = photos?.length || 0;

    const systemPrompt = `You are an expert in learning sciences, Universal Design for Learning (UDL), and pattern analysis. Your task is to identify BLIND SPOTS—patterns, themes, insights, and perspectives that humans MISSED or overlooked in their analysis.

Context:
- ${photoCount} participants submitted photos representing "how they learn best"
- Humans identified these patterns: ${humanPatterns}

Your job:
1. Identify 5-7 MAJOR blind spots—patterns, themes, or insights that humans didn't notice
2. Look for: invisible learning preferences, contradictions, underrepresented modalities, hidden themes, environmental factors, social/emotional aspects, temporal patterns, etc.
3. Consider what CAN'T be easily seen in photos but might still be important
4. Identify patterns that may exist ACROSS the photos that humans didn't connect
5. Surface counter-intuitive insights or less obvious connections
6. Each blind spot should reveal something genuinely useful that was overlooked

Return a JSON array of blind spots with this exact structure:
[
  {
    "category": "Short category name (2-4 words)",
    "missed": "One-sentence description of what was overlooked",
    "detail": "2-3 sentences explaining why this matters and what to do about it",
    "icon": "single emoji that represents this category"
  }
]

Be specific, insightful, and focused on actionable learning design principles.`;

    const userPrompt = `Based on ${photoCount} photos representing learning preferences and these human-identified patterns: "${humanPatterns}"

What patterns, themes, insights, and perspectives did humans MISS in their analysis? What connections did they not make? What's hidden in the data?

Look for:
- Patterns that exist ACROSS photos that weren't connected
- Learning preferences that can't be captured visually
- Contradictions or tensions in the data
- Environmental, social, or temporal factors that weren't mentioned
- Counter-intuitive insights
- Underrepresented or overlooked themes

Focus on genuinely useful blind spots that will help improve learning design.`;

    // Call Lovable AI for analysis
    console.log('Calling Lovable AI for blind spot analysis...');
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      throw new Error(`AI API error: ${aiResponse.status} ${errorText}`);
    }

    const aiData = await aiResponse.json();
    console.log('AI response received');

    const aiContent = aiData.choices[0].message.content;
    console.log('AI content:', aiContent);

    // Parse JSON from AI response (handle markdown code blocks)
    let blindSpots;
    try {
      // Remove markdown code blocks if present
      const jsonMatch = aiContent.match(/```json\n?([\s\S]*?)\n?```/) || aiContent.match(/```\n?([\s\S]*?)\n?```/);
      const jsonString = jsonMatch ? jsonMatch[1] : aiContent;
      blindSpots = JSON.parse(jsonString.trim());
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      console.error('AI content was:', aiContent);
      throw new Error('Failed to parse AI response as JSON');
    }

    console.log('Parsed blind spots:', blindSpots);

    // Delete existing blind spots for this session
    const { error: deleteError } = await supabase
      .from('blind_spot_analysis')
      .delete()
      .eq('session_id', sessionId);

    if (deleteError) {
      console.error('Error deleting old blind spots:', deleteError);
    }

    // Store blind spots in database
    const blindSpotRecords = blindSpots.map((spot: any) => ({
      session_id: sessionId,
      category: spot.category,
      missed_perspective: spot.missed,
      detail: spot.detail,
      icon: spot.icon || '🔍',
    }));

    const { error: insertError } = await supabase
      .from('blind_spot_analysis')
      .insert(blindSpotRecords);

    if (insertError) {
      console.error('Error inserting blind spots:', insertError);
      throw insertError;
    }

    console.log('Successfully stored blind spots');

    return new Response(
      JSON.stringify({ success: true, blindSpots: blindSpotRecords }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('Error in analyze-blind-spots function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Unknown error occurred' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
