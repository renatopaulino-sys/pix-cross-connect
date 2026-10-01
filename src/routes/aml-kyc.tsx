import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/aml-kyc")({
  head: () => seo("/aml-kyc", "Política de AML e KYC | CruziaPay", "Resumo público da política de AML e KYC da CruziaPay: due diligence, monitoramento e comunicação a autoridades."),
  component: () => <LegalPage doc="aml" />,
});
