import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getMyDashboard } from "@/lib/panel.functions";
import { PageHeader, StatusPill } from "@/components/panel/PanelLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, ArrowUpRight, ArrowDownLeft, RotateCcw, Download, CheckCircle2, TrendingUp, DollarSign, Percent } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/app/")({
  component: DashboardPage,
});

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 2 });

interface TxItem {
  id: string;
  customer_name: string;
  customer_tax_id: string;
  amount: number;
  currency: string;
  method: string;
  status: string;
  created_at: string;
}

const mockTxs: TxItem[] = [
  {
    id: "tx_pix_99182301",
    customer_name: "Roberto Mendonça",
    customer_tax_id: "***.182.900-12",
    amount: 250.00,
    currency: "BRL",
    method: "pix",
    status: "approved",
    created_at: new Date().toISOString(),
  },
  {
    id: "tx_pix_99182302",
    customer_name: "Juliana Paes",
    customer_tax_id: "***.441.200-88",
    amount: 1200.00,
    currency: "BRL",
    method: "pix",
    status: "approved",
    created_at: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: "tx_pix_99182303",
    customer_name: "Fernando Costa",
    customer_tax_id: "***.901.332-11",
    amount: 75.50,
    currency: "BRL",
    method: "pix",
    status: "pending",
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "tx_pix_99182304",
    customer_name: "Aline Oliveira",
    customer_tax_id: "***.772.109-33",
    amount: 450.00,
    currency: "BRL",
    method: "pix",
    status: "approved",
    created_at: new Date(Date.now() - 7200000).toISOString(),
  },
];

function DashboardPage() {
  const fetchDashboard = useServerFn(getMyDashboard);
  const { data, isLoading } = useQuery({ queryKey: ["dashboard"], queryFn: () => fetchDashboard() });

  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [period, setPeriod] = useState<string>("7d");
  const [txList, setTxList] = useState<TxItem[]>(mockTxs);

  const handleRefund = (id: string) => {
    setTxList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "rejected" } : t))
    );
    toast.success(`Reembolso Pix para a transação ${id} solicitado com sucesso!`);
  };

  const filteredTxs = txList.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.customer_name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <PageHeader
        title="Painel de Transações & Volumetria Pix"
        subtitle="Acompanhamento ao vivo de vendas, liquidez e métricas financeiras."
      />

      {/* Seletor de Período */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span>Filtro de Período</span>
        </div>
        <div className="flex gap-2">
          {[
            { id: "today", label: "Hoje" },
            { id: "7d", label: "Últimos 7 dias" },
            { id: "30d", label: "Últimos 30 dias" },
            { id: "month", label: "Mês Atual" },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => setPeriod(p.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                period === p.id ? "bg-primary text-primary-foreground font-bold" : "border border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards de Métricas Principais */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card label="Volume Total (TPV)" value={brl(128450.00)} icon={<DollarSign className="h-4 w-4 text-primary" />} />
        <Card label="Volume Líquido" value={brl(125881.00)} icon={<ArrowUpRight className="h-4 w-4 text-emerald-500" />} />
        <Card label="Taxa de Aprovação Pix" value="99,4%" icon={<Percent className="h-4 w-4 text-emerald-500" />} />
        <Card label="Ticket Médio" value={brl(380.00)} icon={<TrendingUp className="h-4 w-4 text-primary" />} />
      </div>

      {/* Filtros e Busca da Tabela */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por ID, Nome do Cliente ou CPF..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        <div className="flex gap-2">
          {[
            { id: "all", label: "Todas" },
            { id: "approved", label: "Aprovadas" },
            { id: "pending", label: "Pendentes" },
            { id: "rejected", label: "Reembolsadas / Falhas" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                statusFilter === f.id ? "border-primary bg-primary/10 text-primary font-bold" : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabela Interativa de Transações */}
      <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-left text-xs uppercase text-muted-foreground bg-muted/30">
            <tr>
              <th className="px-4 py-3">ID / Data</th>
              <th className="px-4 py-3">Cliente / CPF</th>
              <th className="px-4 py-3">Método</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Valor</th>
              <th className="px-4 py-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredTxs.map((t) => (
              <tr key={t.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3">
                  <div className="font-mono text-xs font-bold text-foreground">{t.id}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(t.created_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-foreground">{t.customer_name}</div>
                  <div className="font-mono text-xs text-muted-foreground">{t.customer_tax_id}</div>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary uppercase">
                    {t.method}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <StatusPill status={t.status} />
                </td>
                <td className="px-4 py-3 text-right font-bold text-foreground">{brl(t.amount)}</td>
                <td className="px-4 py-3 text-center">
                  {t.status === "approved" && (
                    <Button variant="ghost" size="sm" onClick={() => handleRefund(t.id)} className="text-xs text-amber-600 hover:text-amber-700">
                      <RotateCcw className="h-3.5 w-3.5 mr-1" />
                      Estornar Pix
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Card({ label, value, icon }: { label: string; value: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="label-mono text-xs uppercase text-muted-foreground">{label}</p>
        {icon}
      </div>
      <div className="mt-2 font-display text-2xl font-bold text-foreground">{value}</div>
    </div>
  );
}