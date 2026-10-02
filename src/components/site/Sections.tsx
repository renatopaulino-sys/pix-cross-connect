import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { methods, solutions } from "@/data/methods";
import { StatusCard } from "./StatusCard";
import { useI18n } from "@/lib/i18n";

function SectionHead({ label, title, intro }: { label: string; title: string; intro?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="label-mono text-slateink">{label}</p>
      <h2 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
      {intro ? <p className="mt-4 text-base leading-relaxed text-slateink">{intro}</p> : null}
    </div>
  );
}

export function SolutionsSection() {
  const { t } = useI18n();
  return (
    <section id="solucoes" className="border-t border-border bg-sand py-24 lg:py-32">
      <div className="container-site">
        <SectionHead label={t.solutions.label} title={t.solutions.title} intro={t.solutions.intro} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => (
            <StatusCard key={s.id} item={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function MethodsSection() {
  const { t } = useI18n();
  return (
    <section id="metodos" className="border-t border-border py-24 lg:py-32">
      <div className="container-site">
        <SectionHead label={t.methods.label} title={t.methods.title} intro={t.methods.intro} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {methods.map((m) => (
            <StatusCard key={m.id} item={m} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  const { t } = useI18n();
  return (
    <section id="como-funciona" className="border-t border-border bg-sand py-24 lg:py-32">
      <div className="container-site">
        <SectionHead label={t.how.label} title={t.how.title} />
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {t.how.steps.map((step, i) => (
            <li key={step.title} className="border-t border-ink/20 pt-5">
              <span className="label-mono text-cobalt">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slateink">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function VerticalsSection() {
  const { t } = useI18n();
  return (
    <section className="border-t border-border py-24 lg:py-32">
      <div className="container-site">
        <SectionHead label={t.verticals.label} title={t.verticals.title} />
        <dl className="mt-12 max-w-4xl divide-y divide-border border-y border-border">
          {t.verticals.items.map((v) => (
            <div key={v.name} className="grid gap-1 py-5 sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-8">
              <dt className="text-sm font-semibold text-ink">{v.name}</dt>
              <dd className="text-sm leading-relaxed text-slateink">{v.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function SecuritySection() {
  const { t } = useI18n();
  return (
    <section id="seguranca" className="scroll-mt-24 border-t border-border bg-sand py-24 lg:py-32">
      <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-16">
        <SectionHead label={t.security.label} title={t.security.title} />
        <div className="max-w-2xl space-y-5">
          {t.security.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="text-base leading-relaxed text-slateink">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  const { t } = useI18n();
  return (
    <section className="border-t border-border py-24 lg:py-32">
      <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-16">
        <SectionHead label={t.faq.label} title={t.faq.title} />
        <Accordion type="single" collapsible className="max-w-2xl">
          {t.faq.items.map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger className="text-left text-base font-medium text-ink">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-slateink">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
