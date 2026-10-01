DROP POLICY IF EXISTS "routing read" ON gateway.routing_rules;
CREATE POLICY "routing own or global read" ON gateway.routing_rules FOR SELECT TO authenticated
  USING (merchant_id IS NULL OR public.owns_merchant(merchant_id));
DROP POLICY IF EXISTS "providers read" ON provider_catalog.providers;
DROP POLICY IF EXISTS "connectors read" ON gateway.connector_mappings;