-- Create table for AI-generated blind spot analysis
CREATE TABLE IF NOT EXISTS public.blind_spot_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  category TEXT NOT NULL,
  missed_perspective TEXT NOT NULL,
  detail TEXT NOT NULL,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.blind_spot_analysis ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view blind spot analysis
CREATE POLICY "Users can view blind spot analysis"
  ON public.blind_spot_analysis
  FOR SELECT
  USING (true);

-- Only allow system/presenters to insert
CREATE POLICY "System can insert blind spot analysis"
  ON public.blind_spot_analysis
  FOR INSERT
  WITH CHECK (true);

-- Add index for faster queries
CREATE INDEX idx_blind_spot_session ON public.blind_spot_analysis(session_id);