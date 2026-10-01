import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/termos")({
  head: () => seo("/termos", "Termos de uso | CruziaPay", "Termos de uso da CruziaPay, operada por CRUZIAPAY LTDA: natureza do serviço, elegibilidade, preços e liquidação."),
  component: () => <LegalPage doc="terms" />,
});
