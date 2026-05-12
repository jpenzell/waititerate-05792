
CREATE OR REPLACE FUNCTION public.claim_presenter_role(_password text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
BEGIN
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- NOTE: Facilitator password lives here, server-side. Update by running a new migration.
  IF _password IS DISTINCT FROM 'iterate2025' THEN
    RETURN false;
  END IF;

  -- Upsert presenter role for the current user
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _uid) THEN
    UPDATE public.user_roles SET role = 'presenter'::app_role WHERE user_id = _uid;
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (_uid, 'presenter'::app_role);
  END IF;

  RETURN true;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.claim_presenter_role(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.claim_presenter_role(text) TO authenticated;
