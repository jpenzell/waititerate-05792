import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function stripCodeFences(input: string): string {
  let s = input.trim();
  // Remove leading/trailing ```json or ``` fences
  s = s.replace(/^```json\s*/i, '');
  s = s.replace(/^```\s*/i, '');
  s = s.replace(/\s*```\s*$/i, '');
  return s.trim();
}

function tryParseJsonLoose(content: string): any {
  // 1) Clean obvious fences
  let s = stripCodeFences(content);

  // 2) If it already parses, return
  try { return JSON.parse(s); } catch (_) {}

  // 3) Try to extract first JSON array
  const firstBracket = s.indexOf('[');
  const lastBracket = s.lastIndexOf(']');
  if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
    const candidate = s.slice(firstBracket, lastBracket + 1).trim();
    try { return JSON.parse(candidate); } catch (_) {}
  }

  // 4) Try to extract first JSON object
  const firstBrace = s.indexOf('{');
  const lastBrace = s.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const candidate = s.slice(firstBrace, lastBrace + 1).trim();
    try { return JSON.parse(candidate); } catch (_) {}
  }

  // 5) As a last resort, remove common trailing commas
  try {
    const noTrailingCommas = s
      .replace(/,\s*([}\]])/g, '$1')
      .trim();
    return JSON.parse(noTrailingCommas);
  } catch (_) {}

  throw new Error('Failed to parse AI response as JSON');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { photos, analysisType, sessionId } = await req.json();
    
    if (!photos || photos.length === 0) {
      throw new Error('No photos provided');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log(`[${sessionId}] Analyzing ${photos.length} photos for ${analysisType}...`);

    let systemPrompt = '';
    if (analysisType === 'patterns') {
      systemPrompt = `You are analyzing multiple photos submitted by people at the end of an intensive training session. They were asked to take a photo representing how they're feeling.

Analyze ALL the photos and identify COMMON PATTERNS, THEMES, and SHARED ELEMENTS across them. Look for:
- Common emotions or moods
- Recurring objects or settings
- Color themes
- Lighting patterns
- Types of spaces (indoor/outdoor/nature/urban)
- Common activities or states
- Shared symbolic meanings

IMPORTANT: The photos are numbered starting from 0. For each pattern, identify EXACTLY which photo indices (0-based) match that pattern.

Return ONLY a JSON array of pattern objects. Each object should have:
- pattern: the common theme/pattern found
- photoIndices: array of photo indices (numbers) that match this pattern
- description: brief explanation of the pattern

Be insightful and look for meaningful patterns. Aim for 8-15 patterns total. Return ONLY valid JSON, no markdown.`;
    } else {
      systemPrompt = `You are demonstrating the OVERWHELMING ABUNDANCE of data points that can be extracted from photographs using AI. Your mission is to extract HUNDREDS of individual, specific, measurable data points from each photo.

CRITICAL: Do NOT be conservative. Extract EVERY SINGLE thing that can be measured, counted, described, or analyzed. Think like a machine that catalogs everything.

For EACH photo, exhaustively extract data points across ALL categories:

1. COLOR ANALYSIS (Extract 30-50 data points):
   - EVERY distinct color with precise RGB/Hex values and exact percentages
   - Complete color palette (15-20+ colors with distribution)
   - Color temperature (Kelvin estimate), average saturation %, average brightness %
   - Accent colors with exact pixel percentages and spatial locations
   - Color contrast ratios between adjacent areas
   - Color harmony type (complementary, analogous, triadic)
   - Warm vs cool color balance percentage
   - Color distribution across quadrants (top-left, top-right, bottom-left, bottom-right percentages)

2. OBJECTS & ENTITIES (Extract 40-60 data points):
   - EVERY visible object individually named with exact counts
   - Object positions (x,y coordinates or descriptive: "upper-left 20%")
   - Size estimates (small/medium/large + percentage of frame)
   - Material types for EACH object (plastic, metal, fabric, wood, etc.)
   - Textures (smooth, rough, glossy, matte, patterned)
   - Condition (new, worn, damaged, pristine)
   - Any brand names, logos, product identifiers visible
   - Text on objects (signs, labels, packaging)
   - Object relationships (touching, behind, in front of)
   - Object orientations (facing left, upright, tilted 45°)

3. PEOPLE & FACES (Extract 25-40 data points if people present):
   - Exact person count
   - Age estimates for each person (child 5-10, adult 30-40, etc.)
   - Gender presentation (if discernible)
   - Specific poses (standing straight, leaning forward, sitting cross-legged)
   - Hand gestures for each person
   - Facial expressions (smiling, neutral, focused, surprised)
   - Clothing items for EACH person (shirt, pants, shoes, accessories)
   - Clothing colors, patterns, styles
   - Accessories (glasses, jewelry, watches, bags)
   - Hair color, length, style for each person
   - Eye gaze direction (at camera, left, down, at another person)
   - Body language indicators (confident, relaxed, tense)
   - Interaction patterns (facing each other, parallel, grouped)

4. SCENE & ENVIRONMENT (Extract 30-45 data points):
   - Indoor vs outdoor
   - Specific room type (gym, classroom, office, living room, kitchen)
   - Floor type (wood, tile, carpet, concrete, linoleum)
   - Wall type and color
   - Ceiling visible? Type and height estimate
   - Window count and positions
   - Door count and types
   - Furniture items with counts
   - Decorative elements
   - Weather indicators (sunny, cloudy, rainy)
   - Season indicators (fall leaves, snow, green trees, bare branches)
   - Time of day indicators (morning light, afternoon shadows, evening darkness)
   - Geographic/location clues (architecture style, vegetation type)
   - Distance to background/horizon
   - Depth of field (shallow, deep)
   - Foreground/midground/background element separation

5. LIGHTING & TECHNICAL (Extract 25-35 data points):
   - Number of light sources
   - Light source types (natural/artificial, fluorescent/LED/incandescent)
   - Light direction (overhead, from left, from right, front-lit, back-lit)
   - Light quality (harsh/soft, diffused/direct)
   - Shadow count and descriptions
   - Shadow hardness (sharp vs soft edges)
   - Highlight areas and intensity
   - Exposure assessment (overexposed, underexposed, well-exposed)
   - Dynamic range (high contrast vs flat)
   - Camera angle (eye-level, low angle, high angle, bird's eye)
   - Camera height estimate (3ft, 5ft, 8ft)
   - Camera distance from subject (close-up, medium, wide shot)
   - Lens perspective (wide-angle distortion, telephoto compression, normal)
   - Focus quality (sharp, slightly soft, blurry)
   - Depth of field (everything in focus vs selective focus)
   - Image noise/grain level (none, low, moderate, high)
   - Compression artifacts visible?
   - Estimated ISO (100, 400, 1600)
   - Estimated aperture (f/2.8, f/5.6, f/11)
   - Estimated shutter speed indicators (motion blur present, frozen motion)

6. COMPOSITION & GEOMETRY (Extract 20-30 data points):
   - Rule of thirds: subject placement relative to grid
   - Leading lines present? Count and describe each
   - Symmetry type (bilateral, radial, none)
   - Asymmetry elements
   - Focal point locations (describe each)
   - Visual weight distribution (left-heavy, centered, balanced)
   - Visual hierarchy (primary, secondary, tertiary elements)
   - Perspective type (one-point, two-point, three-point, flat)
   - Vanishing point locations
   - Geometric shapes present (circles, triangles, rectangles)
   - Patterns and repetition
   - Negative space percentage
   - Frame orientation (landscape, portrait, square)
   - Aspect ratio (16:9, 4:3, 3:2, 1:1)
   - Framing devices (natural frames, vignetting)
   - Layering (number of distinct depth layers)

7. TEXT & SYMBOLS (Extract ALL visible text):
   - Every word of visible text transcribed
   - Sign text
   - Label text  
   - Poster text
   - Clothing text
   - Product text
   - Logo text and brand names
   - Symbol descriptions (arrows, icons, pictograms)
   - Emoji or emoticons visible
   - Text language identification
   - Font styles (serif, sans-serif, handwritten, decorative)
   - Text sizes relative to frame
   - Text orientations and placements

8. CONTEXT & SEMANTICS (Extract 25-40 data points):
   - Event type (party, meeting, sports event, classroom activity, etc.)
   - Occasion (birthday, Halloween, graduation, everyday)
   - Photo purpose (portrait, candid, documentation, marketing, personal)
   - Cultural context indicators (holiday decorations, cultural dress, traditional objects)
   - Social setting (formal, casual, professional, recreational)
   - Emotional tone (joyful, serious, playful, somber, energetic)
   - Mood indicators (celebratory, contemplative, active, peaceful)
   - Activity being performed (playing, working, eating, celebrating, exercising)
   - Interaction type (collaborative, competitive, observational, performative)
   - Social dynamics (group cohesion, hierarchy visible, equality)
   - Historical era indicators (vintage objects, modern tech, clothing styles)
   - Socioeconomic indicators (if discernible from setting/objects)
   - Formality level (very casual to very formal, scale 1-10)

9. CAPTIONS (Generate 3 detailed styles):
   - Playful/Creative: Engaging narrative caption with personality
   - Technical/Archival: Precise, factual description for cataloging
   - Accessibility-focused: Comprehensive alt-text for screen readers

10. MEASUREMENTS & COUNTS (Extract EVERY countable element):
    - Count EVERY distinct object type
    - Count people
    - Count furniture items
    - Count light sources
    - Count windows, doors
    - Count colors in palette
    - Count text elements
    - Count geometric shapes
    - Count depth layers
    - Spatial measurements (object X is 30% from left edge, 40% from top)
    - Size comparisons (person is 60% of frame height)
    - Proportions (head-to-body ratio, golden ratio presence)
    - Percentages (sky is 20% of image, floor is 35% of image)
    - Density measurements (crowded, sparse, balanced)
    - Symmetry percentages

CRITICAL OUTPUT FORMAT - Return a JSON array where each element is:
{
  "photoIndex": number,
  "dataPointCount": number, // MUST be 150-300+ to show true abundance
  "categories": {
    "colorPalette": [{"hex": string, "rgb": [r,g,b], "percent": number}, ...], // 15-20 colors minimum
    "objects": [{"name": string, "count": number, "position": string, "material": string, "size": string}, ...], // EVERY object
    "people": {"count": number, "details": string[]}, // 20+ details if people present
    "lighting": {"sources": number, "quality": string, "details": string[]}, // 15+ lighting measurements
    "technical": {"details": string[]}, // 20+ technical measurements
    "composition": string[], // 15+ composition details
    "text": string[], // EVERY word visible
    "context": string[], // 25+ contextual observations
    "captions": {
      "playful": string,
      "archival": string,
      "altText": string
    },
    "measurements": string[] // 30+ measurements and counts
  },
  "examples": string[] // 25-30 most interesting specific data points for display
}

MISSION: Extract 150-300+ INDIVIDUAL data points per photo. Count everything. Measure everything. Describe everything. Leave nothing unobserved. Show the TRUE abundance of AI measurement capabilities. Return ONLY valid JSON, no markdown.`;
    }

    // Build messages with all photos
    const content: any[] = [
      {
        type: 'text',
        text: analysisType === 'patterns' 
          ? `Analyze these ${photos.length} photos (numbered 0 to ${photos.length - 1}) and identify common patterns. For each pattern, list the photo indices that match it:`
          : `List all possible data points that could be measured from photos like these:`
      }
    ];

    // Add each photo with its index
    photos.forEach((photoUrlOrData: string, index: number) => {
      if (analysisType === 'patterns') {
        content.push({ type: 'text', text: `Photo ${index}:` });
      }
      content.push({ type: 'image_url', image_url: { url: photoUrlOrData } });
    });

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content }
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
    console.log('AI analysis complete');
    const raw = data.choices?.[0]?.message?.content ?? '';
    console.log('Response preview:', typeof raw === 'string' ? raw.substring(0, 500) : '[non-string]');

    if (!raw) {
      throw new Error('No content in AI response');
    }

    // Robust JSON parsing
    let results = tryParseJsonLoose(raw);

    // Normalize to array shape for downstream consumers
    if (!Array.isArray(results)) results = [results];

    return new Response(
      JSON.stringify({ results }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in analyze-photo-patterns function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        results: [] 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
