import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getMyDashboard } from "@/lib/panel.functions";
import { PageHeader, StatusPill } from "@/components/panel/PanelLayout";

export const Route = createFileRoute("/_authenticated/app/")({
  component: DashboardPage,
});

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 2 });

function DashboardPage() {
  const fetchDashboard = useServerFn(getMyDashboard);
  const { data, isLoading } = useQuery({ queryKey: ["dashboard"], queryFn: () => fetchDashboard() });

  if (isLoading) return <p className="text-sm text-muted-foreground">Carregando...</p>;

  if (!data?.merchant) {
    return (
      <div>
        <PageHeader title="Início" subtitle="Sua empresa ainda não foi cadastrada." />
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Preencha o onboarding para começar a acompanhar volume e transações.
          </p>
          <Link
            to="/app/onboarding"
            className="mt-4 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Iniciar onboarding
          </Link>
        </div>
      </div>
    );
  }

  const transactions = data.transactions as {
    id: string;
    amount: number;
    currency: string;
    method: string;
    status: string;
    created_at: string;
  }[];

  return (
    <div>
      <PageHeader title="Início" subtitle={data.merchant.legal_name ?? "Sua empresa"} />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card label="Saldo disponível" value={brl(data.balance)} />
        <Card label="TPV (últimos lançamentos)" value={brl(data.tpv)} />
        <Card label="Status do KYC" value={<StatusPill status={data.merchant.kyc_status} />} />
      </div>

      <h2 className="mt-8 font-display text-lg font-bold">Transações recentes</h2>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Data</th>
              <th className="px-4 py-3">Método</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Valor</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-b border-border/50 last:border-0">
                <td className="px-4 py-3">{new Date(t.created_at).toLocaleDateString("pt-BR")}</td>
                <td className="px-4 py-3 uppercase">{t.method}</td>
                <td className="px-4 py-3">
                  <StatusPill status={t.status} />
                </td>
                <td className="px-4 py-3 text-right font-medium">{brl(Number(t.amount))}</td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-muted-foreground">
                  Nenhuma transação ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Card({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="label-mono text-xs uppercase text-muted-foreground">{label}</p>
      <div className="mt-2 font-display text-2xl font-bold text-foreground">{value}</div>
    </div>
  );
}