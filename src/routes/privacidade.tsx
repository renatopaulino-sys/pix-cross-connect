import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { useI18n } from "@/lib/i18n";

const title = "Política de privacidade | CruziaPay";
const description =
  "Como o CruziaPay trata dados pessoais sob a LGPD: finalidades, bases legais, retenção e direitos do titular. Documento pendente de revisão jurídica.";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://cruziapay.com.br/privacidade" },
    ],
    links: [{ rel: "canonical", href: "https://cruziapay.com.br/privacidade" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { locale } = useI18n();
  const pt = locale === "pt";
  return (
    <LegalPage
      title={pt ? "Política de privacidade" : "Privacy policy"}
      updated={pt ? "Versão preliminar" : "Draft version"}
      sections={
        pt
          ? [
              "Controlador e encarregado de dados",
              "Dados pessoais coletados",
              "Finalidades do tratamento",
              "Bases legais",
              "Compartilhamento com terceiros e parceiros",
              "Transferência internacional de dados",
              "Prazo de retenção",
              "Medidas de segurança",
              "Direitos do titular",
              "Cookies e tecnologias similares",
              "Alterações desta política",
              "Contato",
            ]
          : [
              "Data controller and data protection officer",
              "Personal data collected",
              "Processing purposes",
              "Legal bases",
              "Sharing with third parties and partners",
              "International data transfers",
              "Retention period",
              "Security measures",
              "Data subject rights",
              "Cookies and similar technologies",
              "Changes to this policy",
              "Contact",
            ]
      }
    />
  );
}
