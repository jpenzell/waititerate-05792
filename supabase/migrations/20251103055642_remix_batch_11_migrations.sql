
-- Migration: 20251030003611
-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('presenter', 'participant');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (true);

-- Create function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create presentation_sessions table
CREATE TABLE public.presentation_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  presenter_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  session_code TEXT UNIQUE NOT NULL,
  current_slide_id TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.presentation_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active sessions"
  ON public.presentation_sessions FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Presenters can manage their sessions"
  ON public.presentation_sessions FOR ALL
  TO authenticated
  USING (presenter_id = auth.uid());

-- Create polls table
CREATE TABLE public.polls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.presentation_sessions(id) ON DELETE CASCADE NOT NULL,
  slide_id TEXT NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.polls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view polls"
  ON public.polls FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Presenters can manage polls"
  ON public.polls FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.presentation_sessions
      WHERE id = session_id AND presenter_id = auth.uid()
    )
  );

-- Create poll_responses table
CREATE TABLE public.poll_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id UUID REFERENCES public.polls(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(poll_id, user_id)
);

ALTER TABLE public.poll_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all responses"
  ON public.poll_responses FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create own responses"
  ON public.poll_responses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.presentation_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.polls;
ALTER PUBLICATION supabase_realtime ADD TABLE public.poll_responses;

-- Create trigger to update updated_at on presentation_sessions
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_presentation_sessions_updated_at
  BEFORE UPDATE ON public.presentation_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'display_name');
  
  -- All new users are participants by default
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'participant');
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Migration: 20251030004952
-- Create a function to automatically give the first user the presenter role
CREATE OR REPLACE FUNCTION public.assign_first_user_as_presenter()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_count INTEGER;
BEGIN
  -- Count existing users with roles
  SELECT COUNT(*) INTO user_count FROM public.user_roles;
  
  -- If this is the first user, make them a presenter
  IF user_count = 0 THEN
    UPDATE public.user_roles
    SET role = 'presenter'
    WHERE user_id = NEW.user_id;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to assign first user as presenter
CREATE TRIGGER assign_first_presenter
  AFTER INSERT ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.assign_first_user_as_presenter();

-- Migration: 20251030005013
-- Fix search_path security warning by recreating function with proper search_path
CREATE OR REPLACE FUNCTION public.assign_first_user_as_presenter()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public
AS $$
DECLARE
  user_count INTEGER;
BEGIN
  -- Count existing users with roles
  SELECT COUNT(*) INTO user_count FROM public.user_roles;
  
  -- If this is the first user, make them a presenter
  IF user_count = 0 THEN
    UPDATE public.user_roles
    SET role = 'presenter'
    WHERE user_id = NEW.user_id;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Migration: 20251030005036
-- Fix all function search paths for security
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path TO public;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'display_name');
  
  -- All new users are participants by default
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'participant');
  
  RETURN NEW;
END;
$$;

-- Migration: 20251030012124
-- Allow users to insert their own role during signup
CREATE POLICY "Users can set their own role on signup"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create a trigger to automatically assign participant role to new anonymous users
CREATE OR REPLACE FUNCTION public.handle_new_anonymous_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only insert if no role exists yet
  IF NOT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = NEW.id
  ) THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'participant');
  END IF;
  RETURN NEW;
END;
$$;

-- Trigger to auto-assign participant role
DROP TRIGGER IF EXISTS on_auth_user_created_assign_role ON auth.users;
CREATE TRIGGER on_auth_user_created_assign_role
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_anonymous_user();

-- Migration: 20251030012501
-- Allow users to update their own role (needed for facilitator setup)
CREATE POLICY "Users can update their own role"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Migration: 20251030031741
-- Create table for photo submissions
CREATE TABLE public.photo_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_id UUID NOT NULL,
  photo_data TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.photo_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone in a session to view photos from that session
CREATE POLICY "Users can view photos in their session"
ON public.photo_submissions
FOR SELECT
USING (true);

-- Allow authenticated users to insert photos
CREATE POLICY "Users can insert their own photos"
ON public.photo_submissions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create table for pattern submissions (human-identified patterns)
CREATE TABLE public.pattern_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_id UUID NOT NULL,
  pattern_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pattern_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view patterns in a session
CREATE POLICY "Users can view patterns in their session"
ON public.pattern_submissions
FOR SELECT
USING (true);

-- Allow authenticated users to insert patterns
CREATE POLICY "Users can insert patterns"
ON public.pattern_submissions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create table for data point submissions
CREATE TABLE public.datapoint_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_id UUID NOT NULL,
  datapoint_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.datapoint_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view data points in a session
CREATE POLICY "Users can view datapoints in their session"
ON public.datapoint_submissions
FOR SELECT
USING (true);

-- Allow authenticated users to insert data points
CREATE POLICY "Users can insert datapoints"
ON public.datapoint_submissions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create table for exercise phase tracking
CREATE TABLE public.photo_exercise_phase (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  current_phase TEXT NOT NULL DEFAULT 'photo_collection',
  ai_patterns TEXT,
  ai_datapoints TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.photo_exercise_phase ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view the phase
CREATE POLICY "Users can view phase in their session"
ON public.photo_exercise_phase
FOR SELECT
USING (true);

-- Allow presenters to update phase
CREATE POLICY "Presenters can update phase"
ON public.photo_exercise_phase
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'presenter'
  )
);

-- Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.photo_submissions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.pattern_submissions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.datapoint_submissions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.photo_exercise_phase;

-- Migration: 20251030041753
-- Add numeric estimates table for participants' guesses
CREATE TABLE IF NOT EXISTS public.numeric_estimates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  user_id UUID NOT NULL,
  estimate INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.numeric_estimates ENABLE ROW LEVEL SECURITY;

-- Users can insert their own estimates
CREATE POLICY "Users can insert own estimates"
  ON public.numeric_estimates
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Anyone can view estimates
CREATE POLICY "Users can view all estimates"
  ON public.numeric_estimates
  FOR SELECT
  USING (true);

-- Update photo_exercise_phase to store AI datapoint count instead of full array
ALTER TABLE public.photo_exercise_phase 
  DROP COLUMN IF EXISTS ai_datapoints,
  ADD COLUMN IF NOT EXISTS ai_datapoint_count INTEGER;

-- Migration: 20251030052440
-- Add column to store detailed datapoint analysis results
ALTER TABLE photo_exercise_phase
ADD COLUMN ai_datapoint_details text;

-- Migration: 20251030055250
-- Add foreign key relationship between photo_submissions and profiles
ALTER TABLE photo_submissions
ADD CONSTRAINT photo_submissions_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES profiles(id) 
ON DELETE CASCADE;

-- Migration: 20251030061420
-- Create storage bucket for photo submissions
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('photo-submissions', 'photo-submissions', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Storage policies for photo submissions
CREATE POLICY "Anyone can upload photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'photo-submissions');

CREATE POLICY "Anyone can view photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'photo-submissions');

-- Add photo_url column to photo_submissions table
ALTER TABLE photo_submissions 
ADD COLUMN IF NOT EXISTS photo_url TEXT;

-- Update photo_submissions table to make photo_data nullable since we'll use photo_url instead
ALTER TABLE photo_submissions 
ALTER COLUMN photo_data DROP NOT NULL;
