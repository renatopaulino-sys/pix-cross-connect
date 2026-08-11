import { useEffect, useState } from "react";
import { Loader2, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { home, latamCoverage, countryOrder, type CountryCode } from "@/data/home";
import { requestContact } from "@/lib/contact-prefill";
import { SectionShell, SectionHead, Badge } from "./SectionShell";

const names: Record<CountryCode, { pt: string; en: string }> = {
  BR: { pt: "Brasil", en: "Brazil" },
  MX: { pt: "México", en: "Mexico" },
  CO: { pt: "Colômbia", en: "Colombia" },
  PE: { pt: "Peru", en: "Peru" },
  AR: { pt: "Argentina", en: "Argentina" },
  CL: { pt: "Chile", en: "Chile" },
};

export function LatamSimulator() {
  const { locale } = useI18n();
  const c = home[locale];
  const [country, setCountry] = useState<CountryCode>("BR");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const id = window.setTimeout(() => setLoading(false), 450);
    return () => window.clearTimeout(id);
  }, [country]);

  const data = latamCoverage[country];

  return (
    <SectionShell id="cobertura" tone="paper">
      <SectionHead label={c.simulator.label} title={c.simulator.title} intro={c.simulator.intro} />

      <div className="cp-reveal mt-10 overflow-hidden rounded-2xl border border-border bg-sand">
        <div className="flex flex-wrap items-center gap-2 border-b border-border p-4 sm:p-6">
          <span className="label-mono mr-2 text-slateink">{c.simulator.country}</span>
          {countryOrder.map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setCountry(code)}
              aria-pressed={country === code}
              className={
                "btn-lift rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors " +
                (country === code
                  ? "gradient-brand text-white"
                  : "border border-border bg-paper text-ink hover:border-brand")
              }
            >
              <span aria-hidden="true" className="label-mono mr-2 opacity-70">{code}</span>
              {names[code][locale]}
            </button>
          ))}
        </div>

        <div className="relative p-6 sm:p-8">
          {loading ? (
            <div className="flex items-center gap-3 py-10 text-sm text-slateink">
              <Loader2 className="cp-spinner h-4 w-4 text-brand" strokeWidth={2} />
              {c.simulator.loading}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <div className="flex items-center gap-3">
                  <p className="label-mono text-slateink">{c.simulator.methods}</p>
                  <Badge live={data.live} liveLabel={c.simulator.liveBadge} soonLabel={c.simulator.soonBadge} />
                </div>
                <ul className="mt-4 space-y-2">
                  {data.methods.map((m) => (
                    <li key={m} className="flex items-start gap-2 text-sm text-ink">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2} />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="label-mono text-slateink">{c.simulator.settlement}</p>
                <p className="font-display mt-4 text-2xl font-bold text-ink">{data.settlement[locale]}</p>
              </div>

              <div>
                <p className="label-mono text-slateink">{c.simulator.docs}</p>
                <ul className="mt-4 space-y-2">
                  {data.kyc[locale].map((d) => (
                    <li key={d} className="text-sm leading-relaxed text-slateink">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() =>
              requestContact({
                country: names[country][locale],
                message: `${c.simulator.cta} — ${names[country][locale]}`,
              })
            }
            className="btn-lift gradient-brand mt-8 rounded-xl px-5 py-3 text-sm font-semibold text-white"
          >
            {c.simulator.cta}
          </button>
        </div>
      </div>
    </SectionShell>
  );
}
