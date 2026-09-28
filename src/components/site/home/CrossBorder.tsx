import { ArrowDown, ArrowRight, CheckCircle2, Globe2, Landmark, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { home } from "@/data/home";
import { requestContact } from "@/lib/contact-prefill";
import { SectionShell } from "./SectionShell";

const stepIcons = [Globe2, Route, Landmark];

export function CrossBorder() {
  const { locale } = useI18n();
  const c = home[locale].crossBorder;

  return (
    <SectionShell id="cross-border" tone="ink" className="relative overflow-hidden border-border/40">
      <div aria-hidden="true" className="cross-border-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.35fr)] lg:items-start lg:gap-16">
        <div className="cp-reveal lg:sticky lg:top-28">
          <p className="label-mono text-brand-light font-semibold">{c.label}</p>
          <h2 className="font-display mt-4 text-3xl font-extrabold text-ink sm:text-4xl lg:text-5xl">{c.title}</h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/70">{c.intro}</p>
          <p className="mt-6 flex items-start gap-2 text-sm text-ink/65">
            <span className="cp-status-dot mt-1.5 h-2 w-2 shrink-0 rounded-full bg-success" />
            {c.availability}
          </p>
          <Button
            type="button"
            size="lg"
            onClick={() => requestContact({ message: c.cta })}
            className="btn-lift mt-8 h-12 bg-brand-light px-6 font-bold text-ink hover:bg-brand-light/90"
          >
            {c.cta}
            <ArrowRight />
          </Button>
        </div>

        <div className="min-w-0">
          <ol className="relative grid gap-3">
            {c.steps.map((step, index) => {
              const Icon = stepIcons[index] ?? Route;
              return (
                <li key={step.title} className="cp-reveal relative grid min-w-0 grid-cols-[3rem_minmax(0,1fr)] gap-4 rounded-xl border border-ink/15 bg-ink/5 p-5 backdrop-blur-sm sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:p-6">
                  <span className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-xl ${index === 1 ? "gradient-brand text-primary-foreground" : "border border-brand/35 bg-brand/10 text-brand-light"}`}>
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display text-base font-bold text-ink sm:text-lg">{step.title}</h3>
                      <span className="label-mono text-ink/45">0{index + 1}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink/65">{step.text}</p>
                    <p className="label-mono mt-4 break-words text-brand-light">{step.meta}</p>
                  </div>
                  {index < c.steps.length - 1 ? <ArrowDown aria-hidden="true" className="absolute -bottom-3.5 left-8 z-20 h-4 w-4 rounded-full bg-onyx text-brand-light sm:left-9" /> : null}
                </li>
              );
            })}
          </ol>

          <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-ink/15 bg-ink/15 sm:grid-cols-2">
            {c.benefits.map((benefit) => (
              <div key={benefit.title} className="cp-reveal bg-onyx/90 p-5">
                <CheckCircle2 className="h-4 w-4 text-brand-light" strokeWidth={1.8} />
                <h3 className="font-display mt-3 text-sm font-bold text-ink">{benefit.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}