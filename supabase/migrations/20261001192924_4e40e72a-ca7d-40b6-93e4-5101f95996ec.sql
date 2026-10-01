ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS website TEXT,
  ADD COLUMN IF NOT EXISTS licenses_confirmed BOOLEAN NOT NULL DEFAULT false;

COMMENT ON COLUMN public.leads.website IS 'Required business website supplied through the public contact form';
COMMENT ON COLUMN public.leads.licenses_confirmed IS 'Confirms the business holds required licenses in its operating markets';