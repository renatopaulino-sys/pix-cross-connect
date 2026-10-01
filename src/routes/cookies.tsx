import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/cookies")({
  head: () => seo("/cookies", "Política de cookies | CruziaPay", "Como a CruziaPay usa cookies essenciais e de medição e como gerenciar suas escolhas."),
  component: () => <LegalPage doc="cookies" />,
});
