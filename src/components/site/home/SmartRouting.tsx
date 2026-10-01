import { Globe2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { home } from "@/data/home";
import { SectionShell, SectionHead } from "./SectionShell";

export function SmartRouting() {
  const { locale } = useI18n();
  const c = home[locale];
  const network = locale === "pt" ? "Rede de parceiros regionais" : "Regional partner network";

  return (
    <SectionShell id="roteamento" tone="sand">
      <SectionHead label={c.routing.label} title={c.routing.title} intro={c.routing.intro} />
      <div className="cp-reveal mt-12 grid items-center gap-3 rounded-2xl border border-border bg-paper p-5 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:p-8">
        <div className="rounded-xl border border-border bg-sand px-4 py-4 text-center">
          <p className="font-display text-sm font-bold text-ink">{c.routing.source}</p>
          <p className="mt-1 text-xs text-slateink">{c.routing.sourceNote}</p>
        </div>
        <span aria-hidden="true" className="mx-auto h-6 w-px bg-brand/50 sm:h-px sm:w-10" />
        <div className="gradient-brand rounded-xl px-4 py-4 text-center text-primary-foreground">
          <p className="font-display text-sm font-bold">{c.routing.hub}</p>
          <p className="mt-1 text-xs opacity-80">{c.routing.hubNote}</p>
        </div>
        <span aria-hidden="true" className="mx-auto h-6 w-px bg-brand/50 sm:h-px sm:w-10" />
        <div className="flex items-center justify-center gap-2 rounded-xl border border-brand/40 bg-brand/10 px-4 py-4 text-center">
          <Globe2 className="h-4 w-4 shrink-0 text-brand-light" strokeWidth={1.7} />
          <p className="font-display text-sm font-bold text-ink">{network}</p>
        </div>
      </div>
    </SectionShell>
  );
}
