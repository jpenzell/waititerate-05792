-- Discovery Wall: shared "Until today, I assumed everyone..." reflections
CREATE TABLE public.discovery_wall_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_id UUID NOT NULL,
  response TEXT NOT NULL CHECK (char_length(response) > 0 AND char_length(response) <= 280),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.discovery_wall_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own discovery responses"
  ON public.discovery_wall_responses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated can view discovery responses"
  ON public.discovery_wall_responses
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX idx_discovery_wall_session ON public.discovery_wall_responses(session_id, created_at DESC);

-- Parking Lot: questions captured at session start, displayed near the end
CREATE TABLE public.parking_lot_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_id UUID NOT NULL,
  question TEXT NOT NULL CHECK (char_length(question) > 0 AND char_length(question) <= 500),
  answered BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.parking_lot_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own parking lot questions"
  ON public.parking_lot_questions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated can view parking lot questions"
  ON public.parking_lot_questions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX idx_parking_lot_session ON public.parking_lot_questions(session_id, created_at DESC);

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.discovery_wall_responses;
ALTER PUBLICATION supabase_realtime ADD TABLE public.parking_lot_questions;