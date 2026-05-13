-- Allow presenters to delete interactive data for sessions they own.
-- Needed for the "Reset Session Data" button.

-- Helper expressions inline; create policies per table.

-- UUID session_id tables
CREATE POLICY "Presenters can delete own session reflections"
ON public.cognitive_reflection_responses FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.presentation_sessions ps WHERE ps.id = cognitive_reflection_responses.session_id AND ps.presenter_id = auth.uid()));

CREATE POLICY "Presenters can delete own session inner voice"
ON public.inner_voice_responses FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.presentation_sessions ps WHERE ps.id = inner_voice_responses.session_id AND ps.presenter_id = auth.uid()));

CREATE POLICY "Presenters can delete own session mental imagery"
ON public.mental_imagery_responses FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.presentation_sessions ps WHERE ps.id = mental_imagery_responses.session_id AND ps.presenter_id = auth.uid()));

CREATE POLICY "Presenters can delete own session neuro quiz"
ON public.neurodiversity_quiz_responses FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.presentation_sessions ps WHERE ps.id = neurodiversity_quiz_responses.session_id AND ps.presenter_id = auth.uid()));

CREATE POLICY "Presenters can delete own session sensory"
ON public.sensory_processing_responses FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.presentation_sessions ps WHERE ps.id = sensory_processing_responses.session_id AND ps.presenter_id = auth.uid()));

CREATE POLICY "Presenters can delete own session time perception"
ON public.time_perception_responses FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.presentation_sessions ps WHERE ps.id = time_perception_responses.session_id AND ps.presenter_id = auth.uid()));

-- TEXT session_id tables (cast presentation_sessions.id to text for match)
CREATE POLICY "Presenters can delete own session blind spots"
ON public.blind_spot_analysis FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.presentation_sessions ps WHERE ps.id::text = blind_spot_analysis.session_id AND ps.presenter_id = auth.uid()));

CREATE POLICY "Presenters can delete own session datapoints"
ON public.datapoint_submissions FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.presentation_sessions ps WHERE ps.id::text = datapoint_submissions.session_id AND ps.presenter_id = auth.uid()));

CREATE POLICY "Presenters can delete own session discovery wall"
ON public.discovery_wall_responses FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.presentation_sessions ps WHERE ps.id::text = discovery_wall_responses.session_id AND ps.presenter_id = auth.uid()));

CREATE POLICY "Presenters can delete own session estimates"
ON public.numeric_estimates FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.presentation_sessions ps WHERE ps.id::text = numeric_estimates.session_id AND ps.presenter_id = auth.uid()));

CREATE POLICY "Presenters can delete own session parking lot"
ON public.parking_lot_questions FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.presentation_sessions ps WHERE ps.id::text = parking_lot_questions.session_id AND ps.presenter_id = auth.uid()));

CREATE POLICY "Presenters can delete own session patterns"
ON public.pattern_submissions FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.presentation_sessions ps WHERE ps.id::text = pattern_submissions.session_id AND ps.presenter_id = auth.uid()));

CREATE POLICY "Presenters can delete own session photo phase"
ON public.photo_exercise_phase FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.presentation_sessions ps WHERE ps.id::text = photo_exercise_phase.session_id AND ps.presenter_id = auth.uid()));

CREATE POLICY "Presenters can delete own session photos"
ON public.photo_submissions FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.presentation_sessions ps WHERE ps.id::text = photo_submissions.session_id AND ps.presenter_id = auth.uid()));

-- Poll responses: delete those tied to polls in presenter's sessions
CREATE POLICY "Presenters can delete poll responses in own sessions"
ON public.poll_responses FOR DELETE TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.polls p
  JOIN public.presentation_sessions ps ON ps.id = p.session_id
  WHERE p.id = poll_responses.poll_id AND ps.presenter_id = auth.uid()
));