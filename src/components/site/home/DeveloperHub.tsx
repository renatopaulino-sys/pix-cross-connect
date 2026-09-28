import { useState } from "react";
import { Terminal } from "lucide-react";
import { codeSamples } from "@/data/content";
import { useI18n } from "@/lib/i18n";
import { home } from "@/data/home";
import { Button } from "@/components/ui/button";

const tabs = [
  { id: "curl", label: "cURL" },
  { id: "node", label: "Node" },
  { id: "python", label: "Python" },
] as const;

const tokenClass = (token: string) => {
  if (/^"[^"]*":$/.test(token)) return "text-brand-light";
  if (/^".*"$/.test(token) || /^'.*'$/.test(token) || /^`.*`$/.test(token)) return "text-success";
  if (/^\d+$/.test(token)) return "text-warning";
  if (/^(const|await|import|from|method|POST|def|print|console|log|fetch|requests|headers|json|body|res|charge)$/.test(token))
    return "text-accent-foreground";
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
    <section id="desenvolvedores" className="bg-onyx py-20 text-ink lg:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="min-w-0">
          <p className="label-mono text-gradient-brand font-semibold">{t.developers.label}</p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t.developers.title}</h2>
          <div className="mt-6 space-y-5">
            {t.developers.text.map((p) => (
              <p key={p.slice(0, 24)} className="text-base leading-relaxed text-ink/70">{p}</p>
            ))}
          </div>
          <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-ink/20 px-4 py-3">
            <Terminal className="h-4 w-4 text-ink/70" strokeWidth={1.6} />
            <span className="text-sm font-medium text-ink/80">{c.devhub.sandbox}</span>
            <span className="label-mono rounded-lg bg-warning/20 px-2 py-1 font-semibold text-warning">
              {c.devhub.sandboxSoon}
            </span>
          </div>
        </div>

        <div className="min-w-0">
          <div className="overflow-hidden rounded-2xl border border-ink/15 bg-[oklch(0.16_0.02_260)]">
            <div className="flex overflow-x-auto border-b border-ink/15" role="tablist" aria-label="API">
              {tabs.map((x) => (
                <Button
                  key={x.id}
                  type="button"
                  variant="ghost"
                  role="tab"
                  aria-selected={tab === x.id}
                  onClick={() => setTab(x.id)}
                  className={
                    "label-mono h-11 rounded-none px-4 transition-colors " +
                    (tab === x.id ? "bg-ink/10 text-ink" : "text-ink/50 hover:text-ink")
                  }
                >
                  {x.label}
                </Button>
              ))}
            </div>
            <pre className="max-w-full overflow-x-auto p-5 font-mono text-[12px] leading-relaxed text-ink/85 sm:text-[13px]">
              <Highlighted code={codeSamples[tab]} />
            </pre>
          </div>
          <p className="mt-3 text-xs text-ink/50">{t.developers.note}</p>
        </div>
      </div>
    </section>
  );
}
