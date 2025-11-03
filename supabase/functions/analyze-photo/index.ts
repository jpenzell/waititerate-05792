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
    const { imageData } = await req.json();
    
    if (!imageData) {
      throw new Error('No image data provided');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log('Analyzing photo with AI...');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are an AI data extraction expert. Analyze the provided image and extract as many distinct, specific data points as possible. 
            
Return ONLY a JSON array of data point objects. Each object should have:
- category: the type of data (e.g., "Objects", "Colors", "Text", "Emotions", "Setting", "Composition", "Lighting", "People", "Activities", "Brands", "Context")
- value: the specific data point found

Be extremely thorough and specific. Look for:
- Objects and items visible
- Colors and color schemes
- Any text or numbers
- Emotional tone and mood
- Setting/location type
- People and their characteristics (if any)
- Activities or actions
- Brand names or logos
- Time of day indicators
- Weather/lighting conditions
- Composition elements
- Textures and materials
- Spatial relationships
- Quality and condition of items
- Cultural or contextual clues

Extract 20-30 data points. Be creative and thorough. Return ONLY valid JSON array, no markdown or explanation.`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analyze this image and extract all possible data points:'
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageData
                }
              }
            ]
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI response received');
    
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('No content in AI response');
    }

    // Parse the JSON response
    let dataPoints;
    try {
      // Remove markdown code blocks if present
      const jsonStr = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      dataPoints = JSON.parse(jsonStr);
    } catch (e) {
      console.error('Failed to parse AI response:', content);
      throw new Error('Failed to parse AI response as JSON');
    }

    return new Response(
      JSON.stringify({ dataPoints }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in analyze-photo function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred analyzing the photo';
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        dataPoints: [] 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
