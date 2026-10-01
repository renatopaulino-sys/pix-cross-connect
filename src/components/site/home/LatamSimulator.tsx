import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { home, kycFor } from "@/data/home";
import { pricingCountries } from "@/data/pricing";
import { requestContact } from "@/lib/contact-prefill";
import { SectionShell, SectionHead, StatusPill } from "./SectionShell";
import { Button } from "@/components/ui/button";

export function LatamSimulator() {
  const { locale, t } = useI18n();
  const c = home[locale];
  const [code, setCode] = useState("BR");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const id = window.setTimeout(() => setLoading(false), 350);
    return () => window.clearTimeout(id);
  }, [code]);

  const country = pricingCountries.find((x) => x.code === code) ?? pricingCountries[0]!;
  const methods = [
    ...(code === "BR" ? [{ name: "Pix", status: "available" as const }] : []),
    ...country.payin.map((r) => ({ name: r.method[locale], status: "on_request" as const })),
    ...(country.payout ?? []).map((r) => ({ name: `Payout · ${r.method[locale]}`, status: "on_request" as const })),
  ];

  return (
    <SectionShell id="cobertura" tone="paper">
      <SectionHead label={c.simulator.label} title={c.simulator.title} intro={c.simulator.intro} />

      <div className="cp-reveal mt-10 overflow-hidden rounded-2xl border border-border bg-sand">
        <div className="flex flex-wrap items-center gap-2 border-b border-border p-4 sm:p-6">
          <span className="label-mono mr-2 text-slateink">{c.simulator.country}</span>
          {pricingCountries.map((x) => (
            <Button
              key={x.code}
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setCode(x.code)}
              aria-pressed={code === x.code}
              className={
                "h-9 rounded-xl px-3 text-sm font-semibold " +
                (code === x.code ? "gradient-brand border-transparent text-primary-foreground" : "bg-paper text-ink hover:border-brand")
              }
            >
              <span aria-hidden="true" className="mr-1.5">{x.flag}</span>
              {x.name[locale]}
            </Button>
          ))}
        </div>

        <div className="p-6 sm:p-8">
          {loading ? (
            <div className="flex items-center gap-3 py-10 text-sm text-slateink">
              <Loader2 className="cp-spinner h-4 w-4 text-brand" strokeWidth={2} />
              {c.simulator.loading}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-3">
              <div className="min-w-0">
                <p className="label-mono text-slateink">{c.simulator.methods}</p>
                <ul className="mt-4 space-y-3">
                  {methods.map((m) => (
                    <li key={m.name} className="flex flex-wrap items-center justify-between gap-2 text-sm text-ink">
                      <span className="min-w-0">{m.name}</span>
                      <StatusPill status={m.status} label={t.badge[m.status]} />
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="label-mono text-slateink">{c.simulator.settlement}</p>
                <p className="font-display mt-4 text-xl font-bold text-ink">{c.simulator.settlementValue}</p>
              </div>
              <div>
                <p className="label-mono text-slateink">{c.simulator.docs}</p>
                <ul className="mt-4 space-y-2">
                  {kycFor(code)[locale].map((d) => (
                    <li key={d} className="text-sm leading-relaxed text-slateink">{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <Button
            type="button"
            size="lg"
            onClick={() => requestContact({ country: country.name[locale], message: `${c.simulator.cta} — ${country.name[locale]}` })}
            className="btn-lift gradient-brand mt-8 h-12 px-5 font-semibold text-primary-foreground"
          >
            {c.simulator.cta}
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
