import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { pagesCopy } from "@/data/pages";
import { methodPages, methods } from "@/data/methods";
import { content } from "@/data/content";
import { StatusPill } from "@/components/site/home/SectionShell";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/methods/$slug")({
  loader: ({ params }) => {
    const page = methodPages.find((p) => p.slug === params.slug);
    if (!page) throw notFound();
    return { slug: page.slug };
  },
  head: ({ loaderData }) => {
    const page = methodPages.find((p) => p.slug === loaderData?.slug);
    if (!page) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    return seo(`/methods/${page.slug}`, `${page.name} (${page.country.en}) | CruziaPay`, page.what.pt);
  },
  notFoundComponent: () => <main className="container-site pt-44 pb-24 text-ink">Not found</main>,
  component: MethodPage,
});

function MethodPage() {
  const { slug } = Route.useLoaderData();
  const { locale } = useI18n();
  const c = pagesCopy[locale].method;
  const page = methodPages.find((p) => p.slug === slug)!;
  const status = methods.find((m) => m.id === page.methodId)?.status ?? "on_request";
  return (
    <main className="pt-36 pb-24 lg:pt-44">
      <div className="container-site max-w-3xl">
        <a href="/#metodos" className="label-mono text-cobalt">← {c.back}</a>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">{page.name}</h1>
          <StatusPill status={status} label={content[locale].badge[status]} />
        </div>
        <dl className="mt-8 grid gap-4 rounded-xl border border-border bg-sand p-6 text-sm sm:grid-cols-3">
          <div><dt className="label-mono text-slateink">{c.country}</dt><dd className="mt-1 text-ink">{page.country[locale]}</dd></div>
          <div><dt className="label-mono text-slateink">{c.currency}</dt><dd className="mt-1 text-ink">{page.currency}</dd></div>
          <div><dt className="label-mono text-slateink">{c.confirmation}</dt><dd className="mt-1 text-ink">{page.confirmation[locale]}</dd></div>
        </dl>
        <h2 className="font-display mt-12 text-2xl font-bold text-ink">{c.what}</h2>
        <p className="mt-4 leading-relaxed text-slateink">{page.what[locale]}</p>
        <h2 className="font-display mt-12 text-2xl font-bold text-ink">{c.how}</h2>
        <ol className="mt-4 space-y-3">
          {page.steps.map((s, i) => (
            <li key={s.en} className="flex gap-3 text-slateink"><span className="label-mono text-brand-light">0{i + 1}</span>{s[locale]}</li>
          ))}
        </ol>
        <h2 className="font-display mt-12 text-2xl font-bold text-ink">{c.useCases}</h2>
        <p className="mt-4 leading-relaxed text-slateink">{page.useCases[locale]}</p>
        <a href="/#contato" className="gradient-brand mt-10 inline-block rounded-lg px-6 py-3 font-semibold text-primary-foreground">{c.cta}</a>
        <Link to="/" className="sr-only">CruziaPay</Link>
      </div>
    </main>
  );
}
