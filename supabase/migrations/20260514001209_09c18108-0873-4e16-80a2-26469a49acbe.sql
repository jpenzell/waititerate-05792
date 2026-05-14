CREATE TABLE public.probability_word_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  user_id uuid NOT NULL,
  word text NOT NULL,
  percentage integer NOT NULL CHECK (percentage >= 0 AND percentage <= 100),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (session_id, user_id, word)
);

ALTER TABLE public.probability_word_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can view probability word responses"
  ON public.probability_word_responses FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "Users can insert their own probability responses"
  ON public.probability_word_responses FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own probability responses"
  ON public.probability_word_responses FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Presenters can delete own session probability responses"
  ON public.probability_word_responses FOR DELETE
  TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.presentation_sessions ps
      WHERE ps.id::text = probability_word_responses.session_id
        AND ps.presenter_id = auth.uid()
    )
  );

ALTER PUBLICATION supabase_realtime ADD TABLE public.probability_word_responses;