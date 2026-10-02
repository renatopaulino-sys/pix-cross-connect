import { ShoppingCart, Layers, Store, Plane, GraduationCap, MonitorSmartphone, Dices } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";
import { home } from "@/data/home";
import { SectionShell, SectionHead, StatusPill } from "./SectionShell";

const icons = [ShoppingCart, Layers, Store, Plane, GraduationCap, MonitorSmartphone, Dices];
// Index order matches content.verticals.items: E-commerce, SaaS, Marketplaces, Travel, Education, Digital services, iGaming
const statusByIndex: ("available" | "soon" | "suspended")[] = ["available", "soon", "soon", "available", "available", "available", "suspended"];

export function Verticals() {
  const { t, locale } = useI18n();
  const c = home[locale];

  return (
    <SectionShell id="verticais" tone="paper">
      <SectionHead label={t.verticals.label} title={t.verticals.title} />
      <div className="mt-10 grid items-stretch gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {t.verticals.items.map((v, i, arr) => {
          const Icon = icons[i] ?? Layers;
          const isIgaming = i === 6;
          const isLast = i === arr.length - 1;
          const st = statusByIndex[i] ?? "available";
          const span = [
            isLast && arr.length % 2 === 1 ? "sm:col-span-2" : "",
            isLast && arr.length % 3 === 1 ? "lg:col-span-3" : "",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <article
              key={v.name}
              className={`cp-reveal relative flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-sand p-5 transition-colors hover:border-brand/35 sm:p-6 ${span}`}
              style={{ transitionDelay: `${(i % 3) * 70}ms` }}
            >
              <span aria-hidden="true" className="gradient-brand pointer-events-none absolute top-0 right-0 h-px w-24 opacity-70" />
              <div className="relative grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 sm:flex sm:justify-between">
                <Icon className="h-6 w-6 shrink-0 text-brand" strokeWidth={1.5} />
                <span className="flex justify-end sm:contents">
                  {st === "suspended" ? (
                    <span className="label-mono inline-flex items-center gap-1.5 rounded-full border border-warning/40 bg-warning/15 px-2.5 py-1 font-semibold text-warning">
                      <span className="h-1.5 w-1.5 rounded-full bg-warning" />
                      {c.verticalsSuspended}
                    </span>
                  ) : (
                    <StatusPill status={st} label={st === "available" ? c.verticalsAvailable : c.verticalsUpcoming} />
                  )}
                </span>
              </div>
              <h3 className="font-display relative mt-4 text-base font-bold break-words text-ink sm:mt-5">{v.name}</h3>
              <p className="relative mt-2 text-sm leading-relaxed break-words text-slateink">{v.text}</p>
              {isIgaming ? (
                <>
                  <p className="relative mt-4 rounded-md border border-warning/30 bg-warning/10 p-3 text-xs leading-relaxed text-ink">{c.igamingNotice}</p>
                  <Link to="/igaming" className="relative mt-4 text-sm font-semibold text-brand-light underline-offset-4 hover:underline">
                    {locale === "pt" ? "Ver requisitos por mercado →" : "See requirements by market →"}
                  </Link>
                </>
              ) : null}
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}
