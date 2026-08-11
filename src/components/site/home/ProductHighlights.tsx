import { QrCode, CreditCard, Send, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { home } from "@/data/home";
import { requestContact } from "@/lib/contact-prefill";
import { SectionShell, SectionHead, Badge } from "./SectionShell";

const icons = { pix: QrCode, cards: CreditCard, payouts: Send } as const;

export function ProductHighlights() {
  const { locale, t } = useI18n();
  const c = home[locale];

  return (
    <SectionShell id="solucoes" tone="paper">
      <SectionHead label={c.highlights.label} title={c.highlights.title} intro={c.highlights.intro} />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {c.highlights.items.map((item, i) => {
          const Icon = icons[item.key as keyof typeof icons] ?? QrCode;
          return (
            <article
              key={item.key}
              className="cp-reveal group flex flex-col rounded-2xl border border-border bg-paper p-7 transition-shadow hover:shadow-[0_24px_60px_-40px_color-mix(in_oklab,var(--color-brand)_80%,transparent)]"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className="gradient-brand inline-flex h-11 w-11 items-center justify-center rounded-xl text-white">
                <Icon className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <div className="mt-5 flex items-start justify-between gap-3">
                <h3 className="font-display text-lg leading-snug font-bold text-ink">{item.name}</h3>
              </div>
              <div className="mt-3">
                <Badge live={item.live} liveLabel="Live" soonLabel={t.badge.soon} />
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slateink">{item.text}</p>
              {!item.live ? (
                <button
                  type="button"
                  onClick={() => requestContact({ message: item.name })}
                  className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand underline-offset-4 hover:underline"
                >
                  {c.highlights.contactLink}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.8} />
                </button>
              ) : null}
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}
