import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import {
  SolutionsSection, MethodsSection, HowItWorksSection, VerticalsSection,
  SecuritySection, DevelopersSection, FaqSection,
} from "@/components/site/Sections";
import { ContactSection } from "@/components/site/ContactForm";
import { content } from "@/data/content";

const title = "CruziaPay | Pagamentos Pix e cross-border para LATAM";
const description =
  "Infraestrutura de pagamentos cross-border para empresas que vendem no Brasil. Cobrança Pix por API, webhooks e liquidação previsível fora do país.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://cruziapay.com.br/" },
    ],
    links: [{ rel: "canonical", href: "https://cruziapay.com.br/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: content.pt.faq.items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Hero />
      <SolutionsSection />
      <MethodsSection />
      <HowItWorksSection />
      <VerticalsSection />
      <SecuritySection />
      <DevelopersSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
}
