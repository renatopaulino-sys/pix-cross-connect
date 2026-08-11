import { useState } from "react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { methods, solutions } from "@/data/methods";
import { codeSamples } from "@/data/content";
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

export function OrchestrationSection() {
  const { t } = useI18n();
  const data = t.orchestration;
  const countries = data.countries;

  return (
    <section id="orquestracao" className="border-t border-border bg-sand py-24 lg:py-32">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionHead label={data.label} title={data.title} intro={data.intro} />
            <dl className="mt-10 grid gap-6 sm:grid-cols-3 lg:grid-cols-1 lg:gap-5">
              {data.stats.map((s) => (
                <div key={s.label} className="border-t border-ink/20 pt-4">
                  <dt className="text-2xl font-bold tracking-tight text-ink">{s.value}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-slateink">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-xl border border-border bg-background p-6 sm:p-8">
            {/* Fluxo horizontal */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <div className="flex-1 rounded-lg border border-border px-4 py-3">
                <p className="label-mono text-slateink">01</p>
                <p className="mt-1 text-sm font-semibold text-ink">{data.flow.source}</p>
              </div>
              <div className="flex-1 rounded-lg border border-cobalt/40 bg-cobalt px-4 py-3">
                <p className="label-mono text-paper/70">02</p>
                <p className="mt-1 text-sm font-semibold text-paper">{data.hub}</p>
                <p className="text-xs text-paper/70">{data.flow.router}</p>
              </div>
              <div className="flex-1 rounded-lg border border-border px-4 py-3">
                <p className="label-mono text-slateink">03</p>
                <p className="mt-1 text-sm font-semibold text-ink">{data.flow.target}</p>
              </div>
            </div>

            <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-signal to-transparent" />

            {/* Tabela de mercados */}
            <div className="mt-6 overflow-hidden">
              <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] gap-4 border-b border-border pb-3">
                <span className="label-mono text-slateink">{data.colHeaders.market}</span>
                <span className="label-mono hidden text-slateink sm:block">{data.colHeaders.rails}</span>
                <span className="label-mono text-right text-slateink">{data.colHeaders.status}</span>
              </div>
              <ul className="divide-y divide-border">
                {countries.map((c) => (
                  <li
                    key={c.code}
                    className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-4 py-3.5"
                  >
                    <span className="flex items-center gap-3">
                      <span className="label-mono rounded border border-border px-1.5 py-0.5 text-ink">
                        {c.code}
                      </span>
                      <span className="text-sm font-medium text-ink">{c.name}</span>
                    </span>
                    <span className="hidden text-sm text-slateink sm:block">{c.rails}</span>
                    <span className="flex items-center justify-end gap-2 text-xs font-medium text-slateink">
                      <span
                        className={
                          "h-2 w-2 rounded-full " + (c.live ? "cp-status-dot bg-signal" : "bg-cobalt/50")
                        }
                      />
                      {c.live ? data.badgeActive : data.badgeBackup}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SecuritySection() {
  const { t } = useI18n();
  return (
    <section className="border-t border-border bg-sand py-24 lg:py-32">
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

const tabs = [
  { id: "curl", label: "cURL" },
  { id: "node", label: "Node" },
  { id: "python", label: "Python" },
] as const;

export function DevelopersSection() {
  const { t } = useI18n();
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("curl");

  return (
    <section id="desenvolvedores" className="bg-ink py-24 text-paper lg:py-32">
      <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="label-mono text-signal">{t.developers.label}</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{t.developers.title}</h2>
          <div className="mt-6 space-y-5">
            {t.developers.text.map((p) => (
              <p key={p.slice(0, 24)} className="text-base leading-relaxed text-paper/70">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-8 inline-flex items-center gap-3 rounded-lg border border-paper/20 px-4 py-3">
            <span className="text-sm font-medium text-paper/70">{t.developers.docs}</span>
            <span className="label-mono rounded-lg border border-paper/20 bg-paper/10 px-2 py-1 text-paper/70">
              {t.badge.soon}
            </span>
          </div>
        </div>

        <div>
          <div className="overflow-hidden rounded-lg border border-paper/15">
            <div className="flex border-b border-paper/15" role="tablist" aria-label="API">
              {tabs.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  role="tab"
                  aria-selected={tab === x.id}
                  onClick={() => setTab(x.id)}
                  className={
                    "label-mono px-4 py-3 transition-colors " +
                    (tab === x.id ? "bg-paper/10 text-paper" : "text-paper/50 hover:text-paper")
                  }
                >
                  {x.label}
                </button>
              ))}
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-paper/85">
              <code>{codeSamples[tab]}</code>
            </pre>
          </div>
          <p className="mt-3 text-xs text-paper/50">{t.developers.note}</p>
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
