import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/complaints")({
  head: () => seo("/complaints", "Reclamações | CruziaPay", "Canal de reclamações da CruziaPay: resposta em até 10 dias úteis e escalonamento à diretoria."),
  component: () => <LegalPage doc="complaints" />,
});
