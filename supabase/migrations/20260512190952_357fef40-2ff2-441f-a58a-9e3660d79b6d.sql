
-- 1. Lock down SECURITY DEFINER functions to internal use only
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.assign_first_user_as_presenter() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_anonymous_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- 2. Tighten blind_spot_analysis INSERT (was WITH CHECK true) — only service role (edge function) writes
DROP POLICY IF EXISTS "System can insert blind spot analysis" ON public.blind_spot_analysis;
-- No INSERT policy means clients cannot insert; service_role bypasses RLS and can still write from the edge function.
