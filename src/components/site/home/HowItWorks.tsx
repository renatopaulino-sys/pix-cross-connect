import { useI18n } from "@/lib/i18n";
import { SectionShell, SectionHead } from "./SectionShell";

export function HowItWorks() {
  const { t } = useI18n();

  return (
    <SectionShell id="como-funciona" tone="sand">
      <SectionHead label={t.how.label} title={t.how.title} />
      <div className="relative mt-10 sm:mt-14">
        <div
          aria-hidden="true"
          className="gradient-brand absolute top-5 right-[12.5%] left-[12.5%] hidden h-px opacity-40 lg:block"
        />
        <ol className="grid items-stretch gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-6">
          {t.how.steps.map((step, i) => (
            <li
              key={step.title}
              className="cp-reveal relative flex h-full min-w-0 flex-col"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="gradient-brand relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="font-display mt-4 text-base font-bold break-words text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed break-words text-slateink">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}
