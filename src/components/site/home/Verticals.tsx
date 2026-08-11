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
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {t.verticals.items.map((v, i) => {
          const Icon = icons[i] ?? Layers;
          const available = verticalStatus[i] ?? true;
          return (
            <article
              key={v.name}
              className="cp-reveal relative overflow-hidden rounded-2xl border border-border bg-sand p-6"
              style={{ transitionDelay: `${(i % 3) * 90}ms` }}
            >
              <span
                aria-hidden="true"
                className="gradient-brand pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-20 blur-3xl"
              />
              <div className="relative flex items-start justify-between gap-3">
                <Icon className="h-6 w-6 text-brand" strokeWidth={1.5} />
                <Badge live={available} liveLabel={c.verticalsAvailable} soonLabel={c.verticalsUpcoming} />
              </div>
              <h3 className="font-display relative mt-5 text-base font-bold text-ink">{v.name}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-slateink">{v.text}</p>
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}
