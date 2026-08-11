import {
  Zap, CreditCard, Barcode, Layers, Send, Wallet, Building2, Store, Globe,
  LayoutTemplate, Link2, Split, BarChart3, type LucideIcon,
} from "lucide-react";
import type { Method } from "@/data/methods";
import { useI18n } from "@/lib/i18n";

const icons: Record<string, LucideIcon> = {
  zap: Zap,
  "credit-card": CreditCard,
  barcode: Barcode,
  layers: Layers,
  send: Send,
  wallet: Wallet,
  building: Building2,
  store: Store,
  globe: Globe,
  layout: LayoutTemplate,
  link: Link2,
  split: Split,
  chart: BarChart3,
};

export function StatusCard({ item }: { item: Method }) {
  const { locale, t } = useI18n();
  const Icon = icons[item.icon] ?? Zap;
  const live = item.status === "live";

  return (
    <div
      className={
        live
          ? "group rounded-lg border border-border bg-paper p-6 transition-shadow hover:shadow-[0_8px_28px_-16px_oklch(0.244_0.049_250/0.45)]"
          : "rounded-lg border border-border bg-paper p-6 opacity-55"
      }
    >
      <div className="flex items-start justify-between gap-4">
        <Icon
          aria-hidden="true"
          className={live ? "h-5 w-5 shrink-0 text-cobalt" : "h-5 w-5 shrink-0 text-slateink grayscale"}
          strokeWidth={1.6}
        />
        <span
          className={
            live
              ? "label-mono shrink-0 rounded-lg border border-signal/40 bg-signal/10 px-2 py-1 text-ink"
              : "label-mono shrink-0 rounded-lg border border-border bg-sand px-2 py-1 text-slateink"
          }
        >
          {live ? t.badge.live : t.badge.soon}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-semibold text-ink">{item.name[locale]}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slateink">{item.description[locale]}</p>
    </div>
  );
}
