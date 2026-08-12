import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, StatusPill } from "@/components/panel/PanelLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Wallet, ArrowUpRight, UploadCloud, CheckCircle2, Clock, RefreshCw, FileText, Download } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/app/saques")({
  component: PixPayoutsPage,
});

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 2 });

interface PayoutItem {
  id: string;
  keyType: string;
  pixKey: string;
  recipientName: string;
  amount: number;
  fee: number;
  status: "cleared" | "pending" | "rejected";
  created_at: string;
}

const mockPayouts: PayoutItem[] = [
  {
    id: "po_98741029384",
    keyType: "CPF",
    pixKey: "***.456.789-00",
    recipientName: "Carlos Eduardo Silva",
    amount: 1450.00,
    fee: 1.50,
    status: "cleared",
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "po_98741029385",
    keyType: "CNPJ",
    pixKey: "12.345.678/0001-90",
    recipientName: "Tech Gaming Eireli",
    amount: 5800.00,
    fee: 1.50,
    status: "cleared",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "po_98741029386",
    keyType: "EMAIL",
    pixKey: "financeiro@afiliados.com",
    recipientName: "Mariana Souza Santos",
    amount: 320.50,
    fee: 1.50,
    status: "pending",
    created_at: new Date().toISOString(),
  },
];

function PixPayoutsPage() {
  const [payouts, setPayouts] = useState<PayoutItem[]>(mockPayouts);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(45890.00);
  const [loading, setLoading] = useState<boolean>(false);

  // Campos do Formulário de Saque
  const [keyType, setKeyType] = useState<string>("CPF");
  const [pixKey, setPixKey] = useState<string>("");
  const [recipientName, setRecipientName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const handleExecutePayout = async (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);

    if (!numericAmount || numericAmount <= 0) {
      toast.error("Informe um valor válido para transferência.");
      return;
    }

    if (numericAmount + 1.50 > balance) {
      toast.error("Saldo insuficiente para esta transferência.");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newPayout: PayoutItem = {
      id: `po_${Date.now()}`,
      keyType,
      pixKey,
      recipientName: recipientName || "Favorecido Pix",
      amount: numericAmount,
      fee: 1.50,
      status: "cleared",
      created_at: new Date().toISOString(),
    };

    setPayouts([newPayout, ...payouts]);
    setBalance((prev) => prev - (numericAmount + 1.50));
    setLoading(false);
    setOpenModal(false);
    setAmount("");
    setPixKey("");
    setRecipientName("");

    toast.success(`Repasse Pix de ${brl(numericAmount)} realizado com sucesso!`);
  };

  const handleDownloadReceipt = (payout: PayoutItem) => {
    const text = `===========================================
            COMPROVANTE DE REPASSE PIX
                  CRUZIAPAY
===========================================
ID do Repasse: ${payout.id}
Favorecido: ${payout.recipientName}
Tipo de Chave: ${payout.keyType}
Chave Pix: ${payout.pixKey}
Valor Transferido: ${brl(payout.amount)}
Tarifa de Processamento: ${brl(payout.fee)}
Status: LIQUIDADO (200 OK)
Data/Hora: ${new Date(payout.created_at).toLocaleString("pt-BR")}
Autenticação Bancária: PIX-BACEN-${Math.random().toString(36).substring(2, 12).toUpperCase()}
===========================================`;

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `comprovante_pix_${payout.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    toast.info("Comprovante de transferência baixado!");
  };

  return (
    <div>
      <PageHeader
        title="Saques & Repasses Pix (Pay-out)"
        subtitle="Efetue transferências instantâneas e pagamentos em massa para chaves Pix no Brasil 24/7."
      />

      {/* Cards de Saldo e Resumo */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="label-mono text-xs uppercase text-muted-foreground">Saldo Disponível</p>
            <Wallet className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2 font-display text-2xl font-bold text-emerald-500">{brl(balance)}</div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="label-mono text-xs uppercase text-muted-foreground">Em Processamento</p>
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-2 font-display text-2xl font-bold text-foreground">{brl(320.50)}</div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="label-mono text-xs uppercase text-muted-foreground">Tarifa Fixa Pay-out</p>
            <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">Pix API</span>
          </div>
          <div className="mt-2 font-display text-2xl font-bold text-foreground">R$ 1,50 <span className="text-xs font-normal text-muted-foreground">/ repasse</span></div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Button onClick={() => setOpenModal(true)} className="bg-primary font-semibold text-primary-foreground">
          <ArrowUpRight className="mr-2 h-4 w-4" />
          Novo Repasse Pix
        </Button>
        <Button variant="outline" onClick={() => toast.info("Envio em lote em lote selecionado. Importe um arquivo CSV.")}>
          <UploadCloud className="mr-2 h-4 w-4" />
          Importar Lote de Saques (CSV)
        </Button>
      </div>

      {/* Tabela de Histórico de Saques */}
      <h2 className="mt-8 font-display text-lg font-bold">Histórico de Transferências Pix</h2>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">ID / Data</th>
              <th className="px-4 py-3">Favorecido</th>
              <th className="px-4 py-3">Chave Pix</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Valor</th>
              <th className="px-4 py-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((p) => (
              <tr key={p.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3">
                  <div className="font-mono text-xs font-semibold">{p.id}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(p.created_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-foreground">{p.recipientName}</td>
                <td className="px-4 py-3">
                  <span className="rounded border px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground mr-1.5 uppercase">
                    {p.keyType}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{p.pixKey}</span>
                </td>
                <td className="px-4 py-3">
                  <StatusPill status={p.status} />
                </td>
                <td className="px-4 py-3 text-right font-bold text-foreground">{brl(p.amount)}</td>
                <td className="px-4 py-3 text-center">
                  <Button variant="ghost" size="sm" onClick={() => handleDownloadReceipt(p)}>
                    <Download className="h-3.5 w-3.5 mr-1" />
                    Comprovante
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Novo Saque Pix */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-md rounded-2xl border-border bg-card p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Solicitar Repasse Pix</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Transferência instantânea em tempo real via API CruziaPay.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleExecutePayout} className="mt-4 space-y-4">
            <div>
              <Label className="text-xs">Tipo de Chave Pix</Label>
              <div className="mt-1.5 flex gap-2">
                {["CPF", "CNPJ", "EMAIL", "PHONE", "EVP"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setKeyType(type)}
                    className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${
                      keyType === type ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-xs">Chave Pix de Destino</Label>
              <Input
                placeholder="Digite a chave Pix..."
                value={pixKey}
                onChange={(e) => setPixKey(e.target.value)}
                required
              />
            </div>

            <div>
              <Label className="text-xs">Nome Completo do Favorecido</Label>
              <Input
                placeholder="Nome do recebedor..."
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                required
              />
            </div>

            <div>
              <Label className="text-xs">Valor da Transferência (BRL)</Label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-2.5 text-sm font-bold text-muted-foreground">R$</span>
                <Input
                  type="number"
                  step="0.01"
                  min="1.00"
                  placeholder="0,00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-9 font-bold text-lg"
                  required
                />
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Tarifa adicional: R$ 1,50 | Saldo disponível: {brl(balance)}
              </p>
            </div>

            <Button type="submit" disabled={loading} className="w-full py-5 text-primary-foreground font-semibold">
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Processando Transferência...
                </>
              ) : (
                "Confirmar e Transferir Agora"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
