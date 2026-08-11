import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useI18n } from "@/lib/i18n";
import { SectionShell, SectionHead } from "./SectionShell";

export function Faq() {
  const { t } = useI18n();
  return (
    <SectionShell id="faq" tone="paper">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-16">
        <SectionHead label={t.faq.label} title={t.faq.title} />
        <Accordion type="single" collapsible className="cp-reveal max-w-2xl">
          {t.faq.items.map((item) => (
            <AccordionItem key={item.q} value={item.q} className="border-border">
              <AccordionTrigger className="text-left text-base font-medium text-ink hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-slateink">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionShell>
  );
}
