import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Sparkles, Loader2, Copy } from "lucide-react";
import { toast } from "sonner";
import { generateChecklist } from "@/lib/launch-checklist.functions";
import { PageHeader } from "@/components/panel/PanelLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/app/checklist")({
  head: () => ({ meta: [{ title: "Checklist de lançamento — CruziaPay" }, { name: "robots", content: "noindex" }] }),
  component: ChecklistPage,
});

const MARKETS = ["Brasil", "México", "Colômbia", "Argentina", "Chile", "Peru", "Equador", "Costa Rica", "Guatemala", "Panamá", "Uruguai", "Bolívia"];
const PAYINS = ["Pix", "Cartões", "Boleto", "SPEI", "OXXO", "PSE", "Carteiras digitais", "Transferência bancária"];
const PAYOUTS = ["Pix out", "Transferência local", "SPEI out", "Liquidação internacional (USD)"];

function Chips({ options, value, onChange }: { options: string[]; value: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = value.includes(o);
        return (
          <button
            key={o}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(on ? value.filter((x) => x !== o) : [...value, o])}
            className={cn(
              "rounded-full border px-3 py-1 text-sm transition-colors",
              on ? "border-primary bg-primary/15 text-foreground" : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

function ChecklistView({ text }: { text: string }) {
  const [done, setDone] = useState<Record<number, boolean>>({});
  return (
    <div className="space-y-1.5">
      {text.split("\n").map((raw, i) => {
        const line = raw.trim();
        if (!line) return null;
        if (line.startsWith("#")) {
          return <h3 key={i} className="pt-4 font-display text-lg font-semibold text-foreground">{line.replace(/^#+\s*/, "")}</h3>;
        }
        const box = line.match(/^[-*]\s*\[( |x)\]\s*(.*)$/i);
        if (box) {
          const checked = done[i] ?? false;
          return (
            <label key={i} className="flex cursor-pointer items-start gap-3 rounded-md px-2 py-1.5 hover:bg-accent">
              <input type="checkbox" className="mt-1 accent-primary" checked={checked} onChange={() => setDone((d) => ({ ...d, [i]: !checked }))} />
              <span className={cn("text-sm text-foreground", checked && "text-muted-foreground line-through")}>{clean(box[2])}</span>
            </label>
          );
        }
        if (/^[-*]\s+/.test(line)) return <p key={i} className="pl-2 text-sm text-foreground">• {clean(line.replace(/^[-*]\s+/, ""))}</p>;
        return <p key={i} className="text-sm text-muted-foreground">{clean(line)}</p>;
      })}
    </div>
  );
}
const clean = (s: string) => s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/`(.+?)`/g, "$1");

function ChecklistPage() {
  const run = useServerFn(generateChecklist);
  const [markets, setMarkets] = useState<string[]>(["Brasil"]);
  const [payins, setPayins] = useState<string[]>(["Pix"]);
  const [payouts, setPayouts] = useState<string[]>([]);
  const [businessModel, setBusinessModel] = useState("");
  const [vertical, setVertical] = useState("");
  const [monthlyVolume, setMonthlyVolume] = useState("");
  const [requirements, setRequirements] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!markets.length) return toast.error("Selecione ao menos um mercado.");
    if (businessModel.trim().length < 2 || vertical.trim().length < 2) return toast.error("Preencha modelo de negócio e vertical.");
    setLoading(true);
    setError("");
    try {
      const r = await run({ data: { markets, payins, payouts, businessModel, vertical, monthlyVolume, requirements, locale: "pt" } });
      if (r.error) setError(r.error);
      else setResult(r.checklist);
    } catch {
      setError("Não foi possível gerar o checklist. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Checklist de lançamento" subtitle="Descreva seus mercados e necessidades de pagamento e receba um plano de lançamento personalizado, gerado por IA." />
      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={submit} className="space-y-5 rounded-xl border border-border bg-card p-5">
          <div className="space-y-2"><Label>Mercados-alvo</Label><Chips options={MARKETS} value={markets} onChange={setMarkets} /></div>
          <div className="space-y-2"><Label htmlFor="bm">Modelo de negócio</Label><Input id="bm" maxLength={200} value={businessModel} onChange={(e) => setBusinessModel(e.target.value)} placeholder="Ex.: marketplace de cursos online" /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="vt">Vertical</Label><Input id="vt" maxLength={100} value={vertical} onChange={(e) => setVertical(e.target.value)} placeholder="Ex.: educação, iGaming, SaaS" /></div>
            <div className="space-y-2"><Label htmlFor="vol">Volume mensal estimado</Label><Input id="vol" maxLength={60} value={monthlyVolume} onChange={(e) => setMonthlyVolume(e.target.value)} placeholder="Ex.: USD 500 mil" /></div>
          </div>
          <div className="space-y-2"><Label>Métodos de recebimento</Label><Chips options={PAYINS} value={payins} onChange={setPayins} /></div>
          <div className="space-y-2"><Label>Métodos de pagamento (payout)</Label><Chips options={PAYOUTS} value={payouts} onChange={setPayouts} /></div>
          <div className="space-y-2"><Label htmlFor="rq">Requisitos adicionais</Label><Textarea id="rq" maxLength={2000} rows={4} value={requirements} onChange={(e) => setRequirements(e.target.value)} placeholder="Ex.: parcelamento, split de pagamentos, liquidação em USD..." /></div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Gerando…</> : <><Sparkles className="h-4 w-4" /> Gerar checklist</>}
          </Button>
        </form>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-display font-semibold text-foreground">Seu plano</h2>
            {result && (
              <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(result); toast.success("Copiado"); }}>
                <Copy className="h-4 w-4" /> Copiar
              </Button>
            )}
          </div>
          {error ? (
            <p className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>
          ) : loading ? (
            <p className="text-sm text-muted-foreground">Analisando seus mercados… isso pode levar alguns segundos.</p>
          ) : result ? (
            <ChecklistView key={result} text={result} />
          ) : (
            <p className="text-sm text-muted-foreground">Preencha o formulário para gerar seu checklist.</p>
          )}
          <p className="mt-4 text-xs text-muted-foreground">Gerado por IA como orientação. Condições finais dependem do onboarding e do acordo comercial.</p>
        </div>
      </div>
    </div>
  );
}
