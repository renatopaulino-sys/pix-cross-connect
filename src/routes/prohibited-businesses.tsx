import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/prohibited-businesses")({
  head: () => seo("/prohibited-businesses", "Atividades proibidas e restritas | CruziaPay", "Atividades que a CruziaPay não aceita e atividades restritas que exigem análise reforçada."),
  component: () => <LegalPage doc="prohibited" />,
});
