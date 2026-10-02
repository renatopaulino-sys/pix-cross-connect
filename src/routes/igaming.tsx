import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { pagesCopy } from "@/data/pages";
import { home } from "@/data/home";
import { igamingMarkets } from "@/data/igaming";
import { StatusPill } from "@/components/site/home/SectionShell";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/igaming")({
  head: () => seo("/igaming", "iGaming | Pagamentos para operadores licenciados | CruziaPay", "Pagamentos para operadores de gaming licenciados na América Latina, com requisitos por mercado e due diligence reforçada."),
  component: IgamingPage,
});

function IgamingPage() {
  const { locale } = useI18n();
  const c = pagesCopy[locale].igaming;
  const goContact = () => {
    sessionStorage.setItem("cruzia:prefill-vertical", "iGaming");
    window.location.href = "/#contato";
  };
  return (
    <main className="pt-36 pb-24 lg:pt-44">
      <div className="container-site max-w-4xl">
        <p className="label-mono text-gradient-brand font-semibold">{c.label}</p>
        <h1 className="font-display mt-4 text-4xl font-extrabold text-ink sm:text-5xl">{c.title}</h1>
        <p role="note" className="mt-8 rounded-lg border border-warning/40 bg-warning/10 p-4 text-sm leading-relaxed text-ink">{home[locale].igamingNotice}</p>

        <h2 className="font-display mt-12 text-2xl font-bold text-ink">{c.whoTitle}</h2>
        <p className="mt-4 leading-relaxed text-slateink">{c.who}</p>

        <div className="mt-10 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-sand text-slateink">
              <tr><th className="p-3 font-medium">{c.cols.market}</th><th className="p-3 font-medium">{c.cols.status}</th><th className="p-3 font-medium">{c.cols.requirement}</th></tr>
            </thead>
            <tbody>
              {igamingMarkets.map((m) => (
                <tr key={m.market.en} className="border-t border-border">
                  <td className="p-3 text-ink">{m.market[locale]}</td>
                  <td className="p-3"><StatusPill status={m.status === "unavailable" ? "soon" : "on_request"} label={c.status[m.status]} /></td>
                  <td className="p-3 text-slateink">{m.requirement[locale]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="font-display mt-12 text-2xl font-bold text-ink">{c.rgTitle}</h2>
        <p className="mt-4 leading-relaxed text-slateink">{c.rg}</p>

        <h2 className="font-display mt-12 text-2xl font-bold text-ink">{c.eddTitle}</h2>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-slateink">{c.edd.map((x) => <li key={x}>{x}</li>)}</ul>

        <Button type="button" size="lg" onClick={goContact} className="btn-lift gradient-brand mt-10 h-12 px-6 font-semibold text-primary-foreground">{c.cta}</Button>
      </div>
    </main>
  );
}
