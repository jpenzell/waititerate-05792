-- Create table for neurodiversity quiz responses
CREATE TABLE public.neurodiversity_quiz_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.presentation_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  unemployment_guess INTEGER NOT NULL CHECK (unemployment_guess >= 0 AND unemployment_guess <= 100),
  productivity_guess INTEGER NOT NULL CHECK (productivity_guess >= 0 AND productivity_guess <= 100),
  population_guess INTEGER NOT NULL CHECK (population_guess >= 0 AND population_guess <= 100),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.neurodiversity_quiz_responses ENABLE ROW LEVEL SECURITY;

-- Users can insert their own responses
CREATE POLICY "Users can insert their own neurodiversity quiz responses"
ON public.neurodiversity_quiz_responses FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Everyone in session can view responses
CREATE POLICY "Session participants can view neurodiversity quiz responses"
ON public.neurodiversity_quiz_responses FOR SELECT
USING (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.neurodiversity_quiz_responses;