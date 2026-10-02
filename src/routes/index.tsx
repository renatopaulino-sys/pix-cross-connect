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
  pt: "CruziaPay · Pagamentos cross-border e Pix no Brasil",
  en: "CruziaPay · Cross-border payments and Pix for Brazil",
};
const title = titles.en;
const description =
  "Cross-border infrastructure for global businesses selling in Brazil with Pix, REST API, webhooks, reconciliation and international settlement.";

export const Route = createFileRoute("/")({
  head: () => ({
    ...seo("/", title, description),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: content.en.faq.items.map((item) => ({
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
