import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import {
  listConnectors,
  listRoutingRules,
  createRoutingRule,
  toggleRoutingRule,
  deleteRoutingRule,
} from "@/lib/panel.functions";
import { PageHeader } from "@/components/panel/PanelLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/_authenticated/app/roteamento")({
  component: RoutingPage,
});

type Connector = { id: string; connector_name: string; provider_id: string | null; is_active: boolean | null };
type Rule = {
  id: string;
  rule_name: string;
  priority: number | null;
  criteria: { country?: string; method?: string } | null;
  destination_connector_id: string | null;
  is_active: boolean | null;
};

function RoutingPage() {
  const fetchConnectors = useServerFn(listConnectors);
  const fetchRules = useServerFn(listRoutingRules);
  const create = useServerFn(createRoutingRule);
  const toggle = useServerFn(toggleRoutingRule);
  const remove = useServerFn(deleteRoutingRule);
  const queryClient = useQueryClient();

  const connectors = useQuery({ queryKey: ["connectors"], queryFn: () => fetchConnectors() });
  const rules = useQuery({ queryKey: ["routing-rules"], queryFn: () => fetchRules() });

  const [form, setForm] = useState({
    rule_name: "",
    priority: 100,
    country: "MX",
    method: "card",
    destination_connector_id: "",
  });
  const [busy, setBusy] = useState(false);

  const connectorList = (connectors.data ?? []) as Connector[];
  const ruleList = (rules.data ?? []) as Rule[];
  const connectorName = (id: string | null) =>
    connectorList.find((c) => c.id === id)?.connector_name ?? "—";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await create({ data: form });
      toast.success("Regra criada");
      setForm({ ...form, rule_name: "" });
      await queryClient.invalidateQueries({ queryKey: ["routing-rules"] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha ao criar regra");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <PageHeader title="Roteamento Inteligente" subtitle="Conectores disponíveis e regras de direcionamento de transações." />

      <h2 className="font-display text-lg font-bold">Conectores</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {connectorList.map((c) => (
          <div key={c.id} className="rounded-2xl border border-border bg-card p-4">
            <p className="font-display text-base font-bold">{c.connector_name}</p>
            <p className="mt-1 text-xs text-muted-foreground">{c.provider_id ?? "—"}</p>
            <span
              className={`mt-3 inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                c.is_active ? "bg-emerald-500/15 text-emerald-600" : "bg-muted text-muted-foreground"
              }`}
            >
              {c.is_active ? "Ativo" : "Inativo"}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="font-display text-lg font-bold">Regras</h2>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="border-b border-border text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Regra</th>
                  <th className="px-4 py-3">Critério</th>
                  <th className="px-4 py-3">Destino</th>
                  <th className="px-4 py-3">Prio.</th>
                  <th className="px-4 py-3">Ativa</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {ruleList.map((r) => (
                  <tr key={r.id} className="border-b border-border/50 last:border-0">
                    <td className="px-4 py-3 font-medium">{r.rule_name}</td>
                    <td className="px-4 py-3 font-mono text-xs">
                      {r.criteria?.country ?? "*"} / {r.criteria?.method ?? "*"}
                    </td>
                    <td className="px-4 py-3">{connectorName(r.destination_connector_id)}</td>
                    <td className="px-4 py-3">{r.priority ?? "—"}</td>
                    <td className="px-4 py-3">
                      <Switch
                        checked={Boolean(r.is_active)}
                        onCheckedChange={async (v) => {
                          try {
                            await toggle({ data: { id: r.id, is_active: v } });
                            await queryClient.invalidateQueries({ queryKey: ["routing-rules"] });
                          } catch {
                            toast.error("Sem permissão para alterar regras");
                          }
                        }}
                      />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        className="text-xs font-medium text-destructive hover:underline"
                        onClick={async () => {
                          try {
                            await remove({ data: { id: r.id } });
                            toast.success("Regra removida");
                            await queryClient.invalidateQueries({ queryKey: ["routing-rules"] });
                          } catch {
                            toast.error("Sem permissão para remover regras");
                          }
                        }}
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
                {ruleList.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">
                      Nenhuma regra criada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-bold">Nova regra</h2>
          <div className="space-y-1.5">
            <Label htmlFor="rule_name">Nome da regra</Label>
            <Input
              id="rule_name"
              required
              placeholder="Transações do México vão para a Kushki"
              value={form.rule_name}
              onChange={(e) => setForm({ ...form, rule_name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="country">País</Label>
              <Input
                id="country"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value.toUpperCase() })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="method">Método</Label>
              <select
                id="method"
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                value={form.method}
                onChange={(e) => setForm({ ...form, method: e.target.value })}
              >
                <option value="pix">pix</option>
                <option value="card">card</option>
                <option value="boleto">boleto</option>
                <option value="payout">payout</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="connector">Conector de destino</Label>
            <select
              id="connector"
              required
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              value={form.destination_connector_id}
              onChange={(e) => setForm({ ...form, destination_connector_id: e.target.value })}
            >
              <option value="">Selecione...</option>
              {connectorList.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.connector_name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="priority">Prioridade</Label>
            <Input
              id="priority"
              type="number"
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: Number(e.target.value) })}
            />
          </div>
          <Button type="submit" disabled={busy} className="w-full text-primary-foreground">
            {busy ? "Salvando..." : "Criar regra"}
          </Button>
        </form>
      </div>
    </div>
  );
}