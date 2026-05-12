
-- 1. PROFILES: restrict SELECT to self only
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- 2. RESPONSE TABLES: require authentication for SELECT
DROP POLICY IF EXISTS "Session participants can view neurodiversity quiz responses" ON public.neurodiversity_quiz_responses;
CREATE POLICY "Authenticated can view neurodiversity quiz responses"
  ON public.neurodiversity_quiz_responses FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Session participants can view reflection responses" ON public.cognitive_reflection_responses;
CREATE POLICY "Authenticated can view reflection responses"
  ON public.cognitive_reflection_responses FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Session participants can view mental imagery responses" ON public.mental_imagery_responses;
CREATE POLICY "Authenticated can view mental imagery responses"
  ON public.mental_imagery_responses FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Session participants can view inner voice responses" ON public.inner_voice_responses;
CREATE POLICY "Authenticated can view inner voice responses"
  ON public.inner_voice_responses FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Session participants can view time perception responses" ON public.time_perception_responses;
CREATE POLICY "Authenticated can view time perception responses"
  ON public.time_perception_responses FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Session participants can view sensory responses" ON public.sensory_processing_responses;
CREATE POLICY "Authenticated can view sensory responses"
  ON public.sensory_processing_responses FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Users can view photos in their session" ON public.photo_submissions;
CREATE POLICY "Authenticated can view photos"
  ON public.photo_submissions FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Users can view patterns in their session" ON public.pattern_submissions;
CREATE POLICY "Authenticated can view patterns"
  ON public.pattern_submissions FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Users can view datapoints in their session" ON public.datapoint_submissions;
CREATE POLICY "Authenticated can view datapoints"
  ON public.datapoint_submissions FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Users can view all estimates" ON public.numeric_estimates;
CREATE POLICY "Authenticated can view estimates"
  ON public.numeric_estimates FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Users can view blind spot analysis" ON public.blind_spot_analysis;
CREATE POLICY "Authenticated can view blind spot analysis"
  ON public.blind_spot_analysis FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Users can view phase in their session" ON public.photo_exercise_phase;
CREATE POLICY "Authenticated can view phase"
  ON public.photo_exercise_phase FOR SELECT TO authenticated USING (true);

-- 3. USER_ROLES: prevent privilege escalation
DROP POLICY IF EXISTS "Users can update their own role" ON public.user_roles;
DROP POLICY IF EXISTS "Users can set their own role on signup" ON public.user_roles;
CREATE POLICY "Users can self-insert participant role only"
  ON public.user_roles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id AND role = 'participant'::app_role);

-- 4. STORAGE: tighten photo bucket policies
DROP POLICY IF EXISTS "Anyone can upload photos" ON storage.objects;
CREATE POLICY "Authenticated users can upload photos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'photo-submissions' AND auth.uid() IS NOT NULL);

CREATE POLICY "Owners can update their photos"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'photo-submissions' AND owner = auth.uid())
  WITH CHECK (bucket_id = 'photo-submissions' AND owner = auth.uid());

CREATE POLICY "Owners can delete their photos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'photo-submissions' AND owner = auth.uid());
