import { useI18n } from "@/lib/i18n";
import { SectionShell, SectionHead } from "./SectionShell";

export function HowItWorks() {
  const { t } = useI18n();

  return (
    <SectionShell id="como-funciona" tone="sand">
      <SectionHead label={t.how.label} title={t.how.title} />
      <div className="relative mt-14">
        <div
          aria-hidden="true"
          className="gradient-brand absolute top-5 right-0 left-0 hidden h-px opacity-50 lg:block"
        />
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {t.how.steps.map((step, i) => (
            <li key={step.title} className="cp-reveal relative" style={{ transitionDelay: `${i * 120}ms` }}>
              <span className="gradient-brand relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="font-display mt-4 text-base font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slateink">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}
