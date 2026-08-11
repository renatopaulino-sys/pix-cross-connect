import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { useI18n } from "@/lib/i18n";

const title = "Termos de uso | CruziaPay";
const description =
  "Termos de uso do site e dos serviços de pagamento CruziaPay. Documento em elaboração, pendente de revisão jurídica.";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://cruziapay.com.br/termos" },
    ],
    links: [{ rel: "canonical", href: "https://cruziapay.com.br/termos" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  const { locale } = useI18n();
  const pt = locale === "pt";
  return (
    <LegalPage
      title={pt ? "Termos de uso" : "Terms of use"}
      updated={pt ? "Versão preliminar" : "Draft version"}
      sections={
        pt
          ? [
              "Objeto e aceitação",
              "Definições",
              "Cadastro, KYC e elegibilidade",
              "Descrição dos serviços disponíveis",
              "Obrigações do cliente",
              "Obrigações do CruziaPay",
              "Preços, taxas e liquidação",
              "Prevenção à fraude e à lavagem de dinheiro",
              "Suspensão e encerramento",
              "Limitação de responsabilidade",
              "Propriedade intelectual",
              "Alterações destes termos",
              "Lei aplicável e foro",
            ]
          : [
              "Purpose and acceptance",
              "Definitions",
              "Onboarding, KYC and eligibility",
              "Description of available services",
              "Client obligations",
              "CruziaPay obligations",
              "Pricing, fees and settlement",
              "Fraud and money laundering prevention",
              "Suspension and termination",
              "Limitation of liability",
              "Intellectual property",
              "Changes to these terms",
              "Governing law and jurisdiction",
            ]
      }
    />
  );
}
