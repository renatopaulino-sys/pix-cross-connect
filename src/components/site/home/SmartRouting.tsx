import { useI18n } from "@/lib/i18n";
import { home } from "@/data/home";
import { SectionShell, SectionHead, StatusPill } from "./SectionShell";

const partners = ["BR", "MX", "CO", "PE", "AR", "CL"];

export function SmartRouting() {
  const { locale, t } = useI18n();
  const c = home[locale];

  return (
    <SectionShell id="roteamento" tone="sand">
      <SectionHead label={c.routing.label} title={c.routing.title} intro={c.routing.intro} />
      <div className="cp-reveal mt-12 grid items-center gap-3 rounded-2xl border border-border bg-paper p-5 sm:grid-cols-[1fr_auto_1fr_auto_1.6fr] sm:p-8">
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
        <ul className="grid grid-cols-2 gap-2">
          {partners.map((code) => {
            const live = code === "BR";
            return (
              <li
                key={code}
                className={
                  "flex flex-col items-start gap-2 rounded-xl border px-3 py-3 " +
                  (live ? "border-brand/40 bg-brand/10" : "border-border bg-sand opacity-60")
                }
              >
                <p className={"font-display text-sm font-bold " + (live ? "text-ink" : "text-slateink")}>Partner · {code}</p>
                <StatusPill status={live ? "available" : "soon"} label={t.badge[live ? "available" : "soon"]} />
              </li>
            );
          })}
        </ul>
      </div>
    </SectionShell>
  );
}
