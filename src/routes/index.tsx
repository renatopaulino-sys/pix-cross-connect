import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/home/Hero";
import { ProductHighlights } from "@/components/site/home/ProductHighlights";
import { CrossBorder } from "@/components/site/home/CrossBorder";
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

const title = "CruziaPay | Pagamentos cross-border e Pix no Brasil";
const description =
  "Infraestrutura cross-border para empresas globais venderem no Brasil com Pix, API, webhooks, conciliação e liquidação internacional.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.cruziapay.com/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.cruziapay.com/" }],
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
      <CrossBorder />
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
