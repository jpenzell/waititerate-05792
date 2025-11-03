-- Create table for mental imagery responses
CREATE TABLE public.mental_imagery_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.presentation_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  vividness_score INTEGER NOT NULL CHECK (vividness_score >= 0 AND vividness_score <= 10),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for inner voice responses
CREATE TABLE public.inner_voice_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.presentation_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  has_inner_voice BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for time perception responses
CREATE TABLE public.time_perception_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.presentation_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  actual_seconds NUMERIC(5,2) NOT NULL,
  target_seconds INTEGER NOT NULL DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for sensory processing responses
CREATE TABLE public.sensory_processing_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.presentation_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  visual_intensity INTEGER NOT NULL CHECK (visual_intensity >= 0 AND visual_intensity <= 10),
  sound_level INTEGER NOT NULL CHECK (sound_level >= 0 AND sound_level <= 10),
  brightness INTEGER NOT NULL CHECK (brightness >= 0 AND brightness <= 10),
  felt_overwhelming BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.mental_imagery_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inner_voice_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_perception_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sensory_processing_responses ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can insert their own responses
CREATE POLICY "Users can insert their own mental imagery responses"
ON public.mental_imagery_responses FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert their own inner voice responses"
ON public.inner_voice_responses FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert their own time perception responses"
ON public.time_perception_responses FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sensory responses"
ON public.sensory_processing_responses FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS Policies: Everyone in session can view all responses
CREATE POLICY "Session participants can view mental imagery responses"
ON public.mental_imagery_responses FOR SELECT
USING (true);

CREATE POLICY "Session participants can view inner voice responses"
ON public.inner_voice_responses FOR SELECT
USING (true);

CREATE POLICY "Session participants can view time perception responses"
ON public.time_perception_responses FOR SELECT
USING (true);

CREATE POLICY "Session participants can view sensory responses"
ON public.sensory_processing_responses FOR SELECT
USING (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.mental_imagery_responses;
ALTER PUBLICATION supabase_realtime ADD TABLE public.inner_voice_responses;
ALTER PUBLICATION supabase_realtime ADD TABLE public.time_perception_responses;
ALTER PUBLICATION supabase_realtime ADD TABLE public.sensory_processing_responses;