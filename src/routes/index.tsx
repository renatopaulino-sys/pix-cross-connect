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
import { Pricing } from "@/components/site/home/Pricing";
import { seo } from "@/lib/seo";
import { useEffect } from "react";
import { useI18n } from "@/lib/i18n";

const titles = {
  pt: "CruziaPay | Pagamentos cross-border na América Latina",
  en: "CruziaPay | Cross-border payments in Latin America",
};
const title = titles.pt;
const description =
  "Métodos de pagamento locais em 12 mercados da América Latina com uma única integração. Pix, SPEI, PSE, OXXO, cartões e payouts, com liquidação internacional.";

export const Route = createFileRoute("/")({
  head: () => ({
    ...seo("/", title, description),
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
  const { locale } = useI18n();
  useEffect(() => {
    document.title = titles[locale];
  }, [locale]);
  return (
    <main>
      <Hero />
      <ProductHighlights />
      <CrossBorder />
      <MethodsSection />
      <Pricing />
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
