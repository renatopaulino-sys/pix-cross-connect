import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { legalDocs } from "@/data/pages";

export function LegalPage({ doc }: { doc: keyof typeof legalDocs }) {
  const { t, locale } = useI18n();
  const d = legalDocs[doc]![locale];
  const isList = doc === "prohibited";

  return (
    <main className="pt-36 pb-24 lg:pt-44">
      <div className="container-site max-w-3xl">
        <Link to="/" className="label-mono text-cobalt">← {t.legal.back}</Link>
        <h1 className="font-display mt-6 text-4xl font-extrabold text-ink">{d.title}</h1>
        <p className="mt-3 text-sm text-slateink">{d.updated}</p>
        {d.intro ? <p className="mt-8 text-base leading-relaxed text-ink">{d.intro}</p> : null}
        <div className="mt-10 space-y-10">
          {d.sections.map((s, i) => (
            <section key={s.heading}>
              <h2 className="text-xl font-semibold text-ink">{i + 1}. {s.heading}</h2>
              {isList ? (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slateink">
                  {s.body.map((b) => <li key={b}>{b}</li>)}
                </ul>
              ) : (
                s.body.map((b) => <p key={b} className="mt-3 text-sm leading-relaxed text-slateink">{b}</p>)
              )}
            </section>
          ))}
        </div>
        {d.closing ? <p className="mt-12 rounded-lg border border-border bg-sand p-4 text-sm text-ink">{d.closing}</p> : null}
      </div>
    </main>
  );
}
