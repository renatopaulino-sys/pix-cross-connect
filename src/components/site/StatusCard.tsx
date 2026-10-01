import { Link } from "@tanstack/react-router";
import {
  Zap, CreditCard, Barcode, Layers, Send, Wallet, Building2, Store, Globe,
  LayoutTemplate, Link2, Split, BarChart3, ArrowRight, type LucideIcon,
} from "lucide-react";
import { methodPages, type Method } from "@/data/methods";
import { useI18n } from "@/lib/i18n";
import { StatusPill } from "./home/SectionShell";

const icons: Record<string, LucideIcon> = {
  zap: Zap, "credit-card": CreditCard, barcode: Barcode, layers: Layers, send: Send,
  wallet: Wallet, building: Building2, store: Store, globe: Globe, layout: LayoutTemplate,
  link: Link2, split: Split, chart: BarChart3,
};

export function StatusCard({ item }: { item: Method }) {
  const { locale, t } = useI18n();
  const Icon = icons[item.icon] ?? Zap;
  const page = methodPages.find((p) => p.methodId === item.id);
  const muted = item.status === "soon";

  return (
    <div
      className={
        "group flex flex-col rounded-lg border border-border bg-paper p-6 transition-all " +
        (muted ? "opacity-70" : "hover:-translate-y-0.5 hover:border-brand/40")
      }
    >
      <div className="flex items-start justify-between gap-4">
        <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-cobalt" strokeWidth={1.6} />
        <StatusPill status={item.status} label={t.badge[item.status]} />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-ink">{item.name[locale]}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slateink">{item.description[locale]}</p>
      {page ? (
        <Link
          to="/methods/$slug"
          params={{ slug: page.slug }}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-light hover:underline"
        >
          {locale === "pt" ? "Saiba mais" : "Learn more"}
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
}
