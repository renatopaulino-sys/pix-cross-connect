import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/refund-chargeback")({
  head: () => seo("/refund-chargeback", "Reembolso e chargeback | CruziaPay", "Política de reembolso e chargeback da CruziaPay: prazos, contestações, tarifas e direito de retenção."),
  component: () => <LegalPage doc="refund" />,
});
