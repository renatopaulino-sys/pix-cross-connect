import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { listMerchants, getMerchantDetail, decideKyc } from "@/lib/panel.functions";
import { PageHeader, StatusPill } from "@/components/panel/PanelLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/app/clientes")({
  component: ClientsPage,
});

type Merchant = {
  id: string;
  legal_name: string | null;
  fantasy_name: string | null;
  email: string;
  country: string | null;
  kyc_status: string | null;
  compliance_status: string | null;
  risk_level: string | null;
  registration_number: string | null;
  tax_id: string | null;
  phone: string | null;
  merchant_master_id: string | null;
  created_at: string;
};

function ClientsPage() {
  const fetchList = useServerFn(listMerchants);
  const fetchDetail = useServerFn(getMerchantDetail);
  const decide = useServerFn(decideKyc);
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);

  const list = useQuery({ queryKey: ["merchants"], queryFn: () => fetchList() });
  const detail = useQuery({
    queryKey: ["merchant", selected],
    queryFn: () => fetchDetail({ data: { merchantId: selected! } }),
    enabled: Boolean(selected),
  });

  if (list.isError) {
    return (
      <div>
        <PageHeader title="Gestão de Clientes / KYC" />
        <p className="text-sm text-muted-foreground">
          Sua conta não tem permissão de administrador para ver esta área.
        </p>
      </div>
    );
  }

  async function handleDecision(decision: "approved" | "rejected") {
    if (!selected) return;
    setBusy(true);
    try {
      await decide({ data: { merchantId: selected, decision, notes } });
      toast.success(decision === "approved" ? "Cliente aprovado" : "Cliente rejeitado");
      setNotes("");
      await queryClient.invalidateQueries();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha ao registrar decisão");
    } finally {
      setBusy(false);
    }
  }

  const merchants = (list.data ?? []) as Merchant[];
  const current = detail.data?.merchant as Merchant | undefined;

  return (
    <div>
      <PageHeader title="Gestão de Clientes / KYC" subtitle="Analise cadastros e registre decisões de compliance." />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="border-b border-border text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Empresa</th>
                <th className="px-4 py-3">País</th>
                <th className="px-4 py-3">KYC</th>
              </tr>
            </thead>
            <tbody>
              {merchants.map((m) => (
                <tr
                  key={m.id}
                  onClick={() => setSelected(m.id)}
                  className={cn(
                    "cursor-pointer border-b border-border/50 last:border-0 hover:bg-accent",
                    selected === m.id && "bg-primary/10",
                  )}
                >
                  <td className="px-4 py-3">
                    <p className="font-medium">{m.legal_name ?? m.email}</p>
                    <p className="text-xs text-muted-foreground">{m.email}</p>
                  </td>
                  <td className="px-4 py-3">{m.country ?? "—"}</td>
                  <td className="px-4 py-3">
                    <StatusPill status={m.kyc_status} />
                  </td>
                </tr>
              ))}
              {merchants.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-muted-foreground">
                    Nenhuma empresa cadastrada ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          {!selected && <p className="text-sm text-muted-foreground">Selecione uma empresa para ver o KYC.</p>}
          {selected && detail.isLoading && <p className="text-sm text-muted-foreground">Carregando...</p>}
          {current && (
            <div className="space-y-5">
              <div>
                <h2 className="font-display text-xl font-bold">{current.legal_name ?? current.email}</h2>
                <p className="text-sm text-muted-foreground">{current.merchant_master_id}</p>
              </div>

              <dl className="grid grid-cols-2 gap-3 text-sm">
                <Field label="Nome fantasia" value={current.fantasy_name} />
                <Field label="E-mail" value={current.email} />
                <Field label="Telefone" value={current.phone} />
                <Field label="País" value={current.country} />
                <Field label="Registro / CNPJ" value={current.registration_number} />
                <Field label="Identificação fiscal" value={current.tax_id} />
                <Field label="Nível de risco" value={current.risk_level} />
                <div>
                  <dt className="label-mono text-xs uppercase text-muted-foreground">Compliance</dt>
                  <dd className="mt-1">
                    <StatusPill status={current.compliance_status} />
                  </dd>
                </div>
              </dl>

              <div>
                <p className="label-mono text-xs uppercase text-muted-foreground">Observações da decisão</p>
                <Textarea
                  className="mt-2"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Plano de ação, ressalvas ou motivo da recusa"
                />
              </div>

              <div className="flex gap-3">
                <Button disabled={busy} onClick={() => handleDecision("approved")} className="text-primary-foreground">
                  Aprovar
                </Button>
                <Button disabled={busy} variant="destructive" onClick={() => handleDecision("rejected")}>
                  Rejeitar
                </Button>
              </div>

              {Array.isArray(detail.data?.compliance) && detail.data.compliance.length > 0 && (
                <div>
                  <p className="label-mono text-xs uppercase text-muted-foreground">Histórico de compliance</p>
                  <ul className="mt-2 space-y-2 text-sm">
                    {(detail.data.compliance as { id: string; compliance_status: string; action_plan: string | null; created_at: string }[]).map(
                      (c) => (
                        <li key={c.id} className="rounded-lg border border-border px-3 py-2">
                          <div className="flex items-center justify-between">
                            <StatusPill status={c.compliance_status} />
                            <span className="text-xs text-muted-foreground">
                              {new Date(c.created_at).toLocaleString("pt-BR")}
                            </span>
                          </div>
                          {c.action_plan && <p className="mt-1 text-muted-foreground">{c.action_plan}</p>}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <dt className="label-mono text-xs uppercase text-muted-foreground">{label}</dt>
      <dd className="mt-1">{value || "—"}</dd>
    </div>
  );
}