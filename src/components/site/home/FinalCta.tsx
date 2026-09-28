import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { home } from "@/data/home";
import { requestContact } from "@/lib/contact-prefill";
import { useReveal } from "@/hooks/use-reveal";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  const { locale } = useI18n();
  const c = home[locale];
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="border-t border-border bg-paper py-20 lg:py-28">
      <div className="container-site">
        <div className="cp-reveal relative overflow-hidden rounded-xl bg-ink px-8 py-14 text-center sm:px-14">
          <span aria-hidden="true" className="gradient-brand absolute inset-x-0 top-0 h-1" />
          <h2 className="font-display relative text-3xl font-extrabold text-paper sm:text-4xl">
            {c.finalCta.title}
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-base text-paper/70">{c.finalCta.text}</p>
          <Button
            type="button"
            size="lg"
            onClick={() => requestContact({ message: c.finalCta.button })}
            className="btn-lift relative mt-8 h-12 bg-brand-light px-7 font-bold text-ink hover:bg-brand-light/90"
          >
            {c.finalCta.button}
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Button>
        </div>
      </div>
    </section>
  );
}
