import { ShoppingCart, Layers, Store, Plane, GraduationCap, MonitorSmartphone, Dices } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { home, verticalStatus } from "@/data/home";
import { SectionShell, SectionHead, Badge } from "./SectionShell";

const icons = [ShoppingCart, Layers, Store, Plane, GraduationCap, MonitorSmartphone, Dices];

export function Verticals() {
  const { t, locale } = useI18n();
  const c = home[locale];

  return (
    <SectionShell id="verticais" tone="paper">
      <SectionHead label={t.verticals.label} title={t.verticals.title} />
      <div className="mt-10 grid items-stretch gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {t.verticals.items.map((v, i, arr) => {
          const Icon = icons[i] ?? Layers;
          const available = verticalStatus[i] ?? true;
          const isLast = i === arr.length - 1;
          const span = [
            isLast && arr.length % 2 === 1 ? "sm:col-span-2" : "",
            isLast && arr.length % 3 === 1 ? "lg:col-span-3" : isLast && arr.length % 3 === 2 ? "lg:col-span-1" : "",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <article
              key={v.name}
              className={`cp-reveal relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-sand p-5 sm:p-6 ${span}`}
              style={{ transitionDelay: `${(i % 3) * 70}ms` }}
            >
              <span
                aria-hidden="true"
                className="gradient-brand pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-20 blur-3xl"
              />
              <div className="relative grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 sm:flex sm:justify-between">
                <Icon className="h-6 w-6 shrink-0 text-brand" strokeWidth={1.5} />
                <span className="flex justify-end sm:contents">
                <Badge live={available} liveLabel={c.verticalsAvailable} soonLabel={c.verticalsUpcoming} />
                </span>
              </div>
              <h3 className="font-display relative mt-4 text-base font-bold break-words text-ink sm:mt-5">{v.name}</h3>
              <p className="relative mt-2 text-sm leading-relaxed break-words text-slateink">{v.text}</p>
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}
