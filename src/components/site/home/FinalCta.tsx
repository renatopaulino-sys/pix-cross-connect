import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { home } from "@/data/home";
import { requestContact } from "@/lib/contact-prefill";
import { useReveal } from "@/hooks/use-reveal";

export function FinalCta() {
  const { locale } = useI18n();
  const c = home[locale];
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="border-t border-border bg-paper py-20 lg:py-28">
      <div className="container-site">
        <div className="cp-reveal gradient-brand relative overflow-hidden rounded-3xl px-8 py-14 text-center sm:px-14">
          <span aria-hidden="true" className="pointer-events-none absolute -top-24 -left-16 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
          <h2 className="font-display relative text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {c.finalCta.title}
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-base text-white/85">{c.finalCta.text}</p>
          <button
            type="button"
            onClick={() => requestContact({ message: c.finalCta.button })}
            className="btn-lift relative mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-bold text-ink"
          >
            {c.finalCta.button}
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
