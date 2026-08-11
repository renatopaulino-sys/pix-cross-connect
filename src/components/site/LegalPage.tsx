import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: string[];
}) {
  const { t } = useI18n();

  return (
    <main className="pt-36 pb-24 lg:pt-44">
      <div className="container-site max-w-3xl">
        <Link to="/" className="label-mono text-cobalt">
          ← {t.legal.back}
        </Link>
        <h1 className="mt-6 text-4xl font-extrabold text-ink">{title}</h1>
        <p className="mt-3 text-sm text-slateink">{updated}</p>
        <div className="mt-6 rounded-lg border border-signal/40 bg-sand p-4 text-sm text-ink">
          {t.legal.pending}
        </div>

        <div className="mt-12 space-y-10">
          {sections.map((section, i) => (
            <section key={section}>
              <h2 className="text-xl font-semibold text-ink">
                {i + 1}. {section}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slateink">
                [{t.legal.pending}]
              </p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
