import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { pagesCopy } from "@/data/pages";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/insights")({
  head: () => seo("/insights", "Insights | CruziaPay", "Artigos da CruziaPay sobre pagamentos cross-border e métodos locais na América Latina."),
  component: InsightsPage,
});

function InsightsPage() {
  const { locale } = useI18n();
  const c = pagesCopy[locale].insights;
  return (
    <main className="pt-36 pb-24 lg:pt-44">
      <div className="container-site max-w-3xl">
        <p className="label-mono text-gradient-brand font-semibold">{c.label}</p>
        <h1 className="font-display mt-4 text-4xl font-extrabold text-ink">{c.title}</h1>
        <p className="mt-10 rounded-xl border border-dashed border-border p-8 text-center text-slateink">{c.empty}</p>
      </div>
    </main>
  );
}
