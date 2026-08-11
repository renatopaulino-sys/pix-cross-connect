import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/home/Hero";
import { ProductHighlights } from "@/components/site/home/ProductHighlights";
import { HowItWorks } from "@/components/site/home/HowItWorks";
import { Verticals } from "@/components/site/home/Verticals";
import { SmartRouting } from "@/components/site/home/SmartRouting";
import { LatamSimulator } from "@/components/site/home/LatamSimulator";
import { DeveloperHub } from "@/components/site/home/DeveloperHub";
import { Faq } from "@/components/site/home/Faq";
import { FinalCta } from "@/components/site/home/FinalCta";
import { MethodsSection, SecuritySection } from "@/components/site/Sections";
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
      <ProductHighlights />
      <MethodsSection />
      <HowItWorks />
      <Verticals />
      <SmartRouting />
      <LatamSimulator />
      <SecuritySection />
      <DeveloperHub />
      <Faq />
      <FinalCta />
      <ContactSection />
    </main>
  );
}
