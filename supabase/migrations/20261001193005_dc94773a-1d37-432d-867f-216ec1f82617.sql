ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS markets_interest TEXT[] NOT NULL DEFAULT '{}';

COMMENT ON COLUMN public.leads.markets_interest IS 'Optional Latin American markets selected in the public contact form';