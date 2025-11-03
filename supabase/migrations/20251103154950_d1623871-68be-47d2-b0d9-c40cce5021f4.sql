-- Enable realtime for numeric_estimates table
ALTER TABLE public.numeric_estimates REPLICA IDENTITY FULL;

-- Add the table to realtime publication if not already added
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'numeric_estimates'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.numeric_estimates;
  END IF;
END $$;