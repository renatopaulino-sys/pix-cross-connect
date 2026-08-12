import { useState } from "react";
import { Terminal } from "lucide-react";
import { codeSamples } from "@/data/content";
import { useI18n } from "@/lib/i18n";
import { home } from "@/data/home";

const tabs = [
  { id: "curl", label: "cURL" },
  { id: "node", label: "Node" },
  { id: "python", label: "Python" },
] as const;

const tokenClass = (token: string) => {
  if (/^"[^"]*":$/.test(token)) return "text-[oklch(0.804_0.146_219.5)]";
  if (/^".*"$/.test(token) || /^'.*'$/.test(token) || /^`.*`$/.test(token)) return "text-[oklch(0.8_0.14_150)]";
  if (/^\d+$/.test(token)) return "text-[oklch(0.82_0.15_74)]";
  if (/^(const|await|import|from|method|POST|def|print|console|log|fetch|requests|headers|json|body|res|charge)$/.test(token))
    return "text-[oklch(0.78_0.12_290)]";
  return "";
};

function Highlighted({ code }: { code: string }) {
  return (
    <code>
      {code.split("\n").map((line, i) => (
        <span key={i} className="block">
          {line.split(/(\s+)/).map((token, j) => {
            const cls = tokenClass(token.trim());
            return cls ? (
              <span key={j} className={cls}>{token}</span>
            ) : (
              <span key={j}>{token}</span>
            );
          })}
        </span>
      ))}
    </code>
  );
}

export function DeveloperHub() {
  const { t, locale } = useI18n();
  const c = home[locale];
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("curl");

  return (
    <section id="desenvolvedores" className="bg-ink py-20 text-paper lg:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="min-w-0">
          <p className="label-mono text-gradient-brand font-semibold">{t.developers.label}</p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t.developers.title}</h2>
          <div className="mt-6 space-y-5">
            {t.developers.text.map((p) => (
              <p key={p.slice(0, 24)} className="text-base leading-relaxed text-paper/70">{p}</p>
            ))}
          </div>
          <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-paper/20 px-4 py-3">
            <Terminal className="h-4 w-4 text-paper/70" strokeWidth={1.6} />
            <span className="text-sm font-medium text-paper/80">{c.devhub.sandbox}</span>
            <span className="label-mono rounded-lg bg-warning/20 px-2 py-1 font-semibold text-warning">
              {c.devhub.sandboxSoon}
            </span>
          </div>
        </div>

        <div className="min-w-0">
          <div className="overflow-hidden rounded-2xl border border-paper/15 bg-[oklch(0.16_0.02_260)]">
            <div className="flex overflow-x-auto border-b border-paper/15" role="tablist" aria-label="API">
              {tabs.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  role="tab"
                  aria-selected={tab === x.id}
                  onClick={() => setTab(x.id)}
                  className={
                    "label-mono px-4 py-3 transition-colors " +
                    (tab === x.id ? "bg-paper/10 text-paper" : "text-paper/50 hover:text-paper")
                  }
                >
                  {x.label}
                </button>
              ))}
            </div>
            <pre className="max-w-full overflow-x-auto p-5 font-mono text-[12px] leading-relaxed text-paper/85 sm:text-[13px]">
              <Highlighted code={codeSamples[tab]} />
            </pre>
          </div>
          <p className="mt-3 text-xs text-paper/50">{t.developers.note}</p>
        </div>
      </div>
    </section>
  );
}
