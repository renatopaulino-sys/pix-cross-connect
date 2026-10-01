import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacidade")({
  head: () => seo("/privacidade", "Política de privacidade | CruziaPay", "Como a CRUZIAPAY LTDA trata dados pessoais sob a LGPD, direitos do titular e contato do encarregado."),
  component: () => <LegalPage doc="privacy" />,
});
