import { useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { home } from "@/data/home";
import { pricingCountries, accountFees, showFullPricing, type RateRow } from "@/data/pricing";
import { requestContact } from "@/lib/contact-prefill";
import { SectionShell, SectionHead, StatusPill } from "./SectionShell";
import { Button } from "@/components/ui/button";

export function Pricing() {
  const { locale, t } = useI18n();
  const c = home[locale].pricing;
  const [code, setCode] = useState("BR");
  const panelRef = useRef<HTMLDivElement>(null);
  const country = pricingCountries.find((x) => x.code === code) ?? pricingCountries[0]!;

  const open = (next: string) => {
    setCode(next);
    if (showFullPricing) panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <SectionShell id="precos" tone="sand">
      <SectionHead label={c.label} title={c.title} intro={c.intro} />

      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {pricingCountries.map((x) => (
          <li key={x.code}>
            <button
              type="button"
              onClick={() => open(x.code)}
              aria-pressed={showFullPricing ? code === x.code : undefined}
              className={
                "flex h-full w-full flex-col items-start rounded-lg border bg-paper p-4 text-left transition-colors " +
                (showFullPricing && code === x.code ? "border-brand" : "border-border hover:border-brand/50")
              }
            >
              <span className="text-xl" aria-hidden="true">{x.flag}</span>
              <span className="font-display mt-2 text-sm font-bold text-ink">{x.name[locale]}</span>
              <span className="label-mono text-slateink">{x.currency}</span>
              <span className="mt-2 text-xs text-slateink">
                {c.payinFrom} <strong className="text-ink">{x.from}</strong>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {showFullPricing ? (
        <div ref={panelRef} className="mt-10 scroll-mt-28 rounded-2xl border border-border bg-paper">
          <div className="border-b border-border p-4 md:hidden">
            <label htmlFor="pricing-country" className="label-mono text-slateink">{c.country}</label>
            <select
              id="pricing-country"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-2 w-full rounded-lg border border-border bg-sand px-3 py-2.5 text-sm text-ink"
            >
              {pricingCountries.map((x) => (
                <option key={x.code} value={x.code}>{x.flag} {x.name[locale]} ({x.currency})</option>
              ))}
            </select>
          </div>
          <div role="tablist" aria-label={c.country} className="hidden flex-wrap gap-1 border-b border-border p-2 md:flex">
            {pricingCountries.map((x) => (
              <button
                key={x.code}
                type="button"
                role="tab"
                aria-selected={code === x.code}
                onClick={() => setCode(x.code)}
                className={
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors " +
                  (code === x.code ? "bg-ink text-onyx" : "text-slateink hover:text-ink")
                }
              >
                {x.name[locale]}
              </button>
            ))}
          </div>

          <div role="tabpanel" className="p-5 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-display text-2xl font-bold text-ink">
                <span aria-hidden="true" className="mr-2">{country.flag}</span>
                {country.name[locale]} <span className="label-mono text-slateink">({country.currency})</span>
              </h3>
              {code === "BR" ? (
                <StatusPill status="available" label={`Pix · ${t.badge.available}`} />
              ) : (
                <StatusPill status="available" label={c.badge} />
              )}
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <RateTable title={c.payin} rows={country.payin} cols={c.cols} empty={c.notAvailable} locale={locale} />
              <RateTable title={c.payout} rows={country.payout} cols={c.cols} empty={c.notAvailable} locale={locale} />
            </div>

            {country.minFee ? (
              <p className="mt-6 text-sm text-ink">
                <span className="font-semibold">{c.minFee}:</span> {country.minFee[locale]}
              </p>
            ) : null}
            <p className="mt-3 text-xs leading-relaxed text-slateink">
              <span className="font-semibold">{c.notes}:</span> {country.notes[locale]}
            </p>
          </div>
        </div>
      ) : null}

      <h3 className="font-display mt-14 text-xl font-bold text-ink">{c.feesTitle}</h3>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {accountFees.map((f) => (
          <li key={f.label.en} className="rounded-lg border border-border bg-paper p-4">
            <p className="label-mono text-slateink">{f.label[locale]}</p>
            <p className="mt-2 text-sm font-semibold text-ink">{f.value[locale]}</p>
          </li>
        ))}
      </ul>

      <p className="mt-8 max-w-3xl text-xs leading-relaxed text-slateink">{c.legal}</p>
      <Button
        type="button"
        size="lg"
        onClick={() => requestContact({ message: showFullPricing ? c.cta : c.requestSheet })}
        className="btn-lift gradient-brand mt-6 h-12 px-6 font-semibold text-primary-foreground"
      >
        {showFullPricing ? c.cta : c.requestSheet}
      </Button>
    </SectionShell>
  );
}

function RateTable({
  title, rows, cols, empty, locale,
}: {
  title: string;
  rows: RateRow[] | null;
  cols: { method: string; providers: string; rate: string };
  empty: string;
  locale: "pt" | "en";
}) {
  return (
    <div className="min-w-0">
      <p className="label-mono text-brand-light">{title}</p>
      {rows ? (
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[420px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-slateink">
                <th className="py-2 pr-3 font-medium">{cols.method}</th>
                <th className="py-2 pr-3 font-medium">{cols.providers}</th>
                <th className="py-2 text-right font-medium">{cols.rate}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.method.en + r.providers.en} className="border-b border-border/60 align-top">
                  <td className="py-2.5 pr-3 text-ink">{r.method[locale]}</td>
                  <td className="py-2.5 pr-3 text-slateink">{r.providers[locale]}</td>
                  <td className="py-2.5 text-right font-semibold whitespace-nowrap text-ink">{r.rate[locale]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-3 rounded-lg border border-dashed border-border px-4 py-3 text-sm text-slateink">{empty}</p>
      )}
    </div>
  );
}
