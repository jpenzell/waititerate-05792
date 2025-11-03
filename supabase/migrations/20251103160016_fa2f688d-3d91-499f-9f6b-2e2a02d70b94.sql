-- Create table for cognitive reflection responses
CREATE TABLE public.cognitive_reflection_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL,
  user_id UUID NOT NULL,
  surprise_response TEXT,
  designing_response TEXT,
  ai_support_response TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cognitive_reflection_responses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can insert their own reflection responses"
  ON public.cognitive_reflection_responses
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Session participants can view reflection responses"
  ON public.cognitive_reflection_responses
  FOR SELECT
  USING (true);

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.cognitive_reflection_responses;