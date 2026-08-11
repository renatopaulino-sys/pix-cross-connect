import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { useI18n } from "@/lib/i18n";

const title = "Política de cookies | CruziaPay";
const description =
  "Quais cookies o site do CruziaPay utiliza, para que servem e como recusar os não essenciais. Documento pendente de revisão jurídica.";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://cruziapay.com.br/cookies" },
    ],
    links: [{ rel: "canonical", href: "https://cruziapay.com.br/cookies" }],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  const { locale } = useI18n();
  const pt = locale === "pt";
  return (
    <LegalPage
      title={pt ? "Política de cookies" : "Cookie policy"}
      updated={pt ? "Versão preliminar" : "Draft version"}
      sections={
        pt
          ? [
              "O que são cookies",
              "Cookies essenciais",
              "Cookies de medição de audiência",
              "Cookies de terceiros",
              "Como gerenciar suas preferências",
              "Prazo de validade dos cookies",
              "Alterações desta política",
            ]
          : [
              "What cookies are",
              "Essential cookies",
              "Audience measurement cookies",
              "Third-party cookies",
              "How to manage your preferences",
              "Cookie lifetime",
              "Changes to this policy",
            ]
      }
    />
  );
}
