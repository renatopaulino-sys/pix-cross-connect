import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { pagesCopy } from "@/data/pages";
import { company } from "@/data/company";
import { content } from "@/data/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => seo("/about", "Sobre a CruziaPay | Facilitadora de pagamentos cross-border", "CruziaPay é uma facilitadora de pagamentos cross-border focada na América Latina, operada por CRUZIAPAY LTDA."),
  component: AboutPage,
});

function AboutPage() {
  const { locale } = useI18n();
  const c = pagesCopy[locale].about;
  const facilitator = content[locale].security.paragraphs[1];
  return (
    <main className="pt-36 pb-24 lg:pt-44">
      <div className="container-site max-w-3xl">
        <p className="label-mono text-gradient-brand font-semibold">{c.label}</p>
        <h1 className="font-display mt-4 text-4xl font-extrabold text-ink sm:text-5xl">{c.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-slateink">{c.text}</p>
        {c.paragraphs.map((p) => (
          <p key={p.slice(0, 24)} className="mt-5 leading-relaxed text-slateink">{p}</p>
        ))}

        <h2 className="font-display mt-14 text-2xl font-bold text-ink">{c.companyTitle}</h2>
        <dl className="mt-4 grid gap-4 rounded-xl border border-border bg-sand p-6 text-sm sm:grid-cols-2">
          <div><dt className="label-mono text-slateink">{c.legalName}</dt><dd className="mt-1 text-ink">{company.legalName}</dd></div>
          <div><dt className="label-mono text-slateink">{c.cnpj}</dt><dd className="mt-1 text-ink">{company.cnpj}</dd></div>
          <div className="sm:col-span-2"><dt className="label-mono text-slateink">{c.address}</dt><dd className="mt-1 text-ink">{locale === "pt" ? company.addressPt : company.address}</dd></div>
          <div><dt className="label-mono text-slateink">{c.hours}</dt><dd className="mt-1 text-ink">{company.hours[locale]}</dd></div>
          <div>
            <dt className="label-mono text-slateink">{c.contacts}</dt>
            <dd className="mt-1 space-y-1 text-ink">
              {Object.values(company.emails).map((e) => (
                <a key={e} href={`mailto:${e}`} className="block break-all hover:text-brand-light">{e}</a>
              ))}
            </dd>
          </div>
        </dl>

        <h2 className="font-display mt-14 text-2xl font-bold text-ink">{c.operateTitle}</h2>
        <p className="mt-4 leading-relaxed text-slateink">{facilitator}</p>
        <Link to="/aml-kyc" className="mt-4 inline-block text-sm font-semibold text-brand-light hover:underline">{c.amlLink} →</Link>
      </div>
    </main>
  );
}
