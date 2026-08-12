-- 1. Leads: allow admins to read
CREATE POLICY "Admins can read leads"
ON public.leads FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));
GRANT SELECT ON public.leads TO authenticated;

-- 2. KYC documents: allow owners and admins to delete
CREATE POLICY "kyc docs own delete"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'kyc-documents'
  AND (((storage.foldername(name))[1] = (auth.uid())::text) OR public.has_role(auth.uid(), 'admin'::app_role))
);

-- 3. Lock down SECURITY DEFINER functions
REVOKE ALL ON FUNCTION public.handle_new_user_role() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.seed_demo_transactions() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- role/ownership helpers are required by RLS policies for signed-in users only
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.owns_merchant(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.owns_merchant(uuid) TO authenticated, service_role;