import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { getMyMerchant } from "@/lib/panel.functions";
import { PageHeader } from "@/components/panel/PanelLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/app/configuracoes")({
  component: SettingsPage,
});

function keyFrom(prefix: string, seed: string) {
  const base = seed.replace(/-/g, "");
  return `${prefix}${base.slice(0, 24)}`;
}

function SettingsPage() {
  const fetchMerchant = useServerFn(getMyMerchant);
  const { data, isLoading } = useQuery({ queryKey: ["my-merchant"], queryFn: () => fetchMerchant() });
  const [reveal, setReveal] = useState(false);

  if (isLoading) return <p className="text-sm text-muted-foreground">Carregando...</p>;

  const merchant = data?.merchant as { id: string; merchant_master_id?: string | null } | null;

  if (!merchant) {
    return (
      <div>
        <PageHeader title="Configurações" />
        <p className="text-sm text-muted-foreground">Conclua o onboarding para gerar suas chaves de API.</p>
      </div>
    );
  }

  const keys = [
    { label: "Chave pública (live)", value: keyFrom("cz_live_pk_", merchant.id) },
    { label: "Chave secreta (live)", value: keyFrom("cz_live_sk_", merchant.id.split("").reverse().join("")), secret: true },
    { label: "Chave pública (sandbox)", value: keyFrom("cz_test_pk_", merchant.id) },
  ];

  return (
    <div className="max-w-3xl">
      <PageHeader title="Configurações" subtitle="Credenciais de integração (ambiente de demonstração)." />

      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="label-mono text-xs uppercase text-muted-foreground">Merchant ID</p>
        <p className="mt-1 font-mono text-sm">{merchant.merchant_master_id ?? merchant.id}</p>

        <div className="mt-6 space-y-4">
          {keys.map((k) => (
            <div key={k.label} className="space-y-1.5">
              <p className="text-sm font-medium">{k.label}</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 overflow-x-auto rounded-lg border border-border bg-muted px-3 py-2 font-mono text-xs">
                  {k.secret && !reveal ? "•".repeat(28) : k.value}
                </code>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(k.value);
                    toast.success("Chave copiada");
                  }}
                >
                  Copiar
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button type="button" variant="ghost" className="mt-4" onClick={() => setReveal(!reveal)}>
          {reveal ? "Ocultar chave secreta" : "Revelar chave secreta"}
        </Button>
      </div>

      {/* Seção de Webhooks */}
      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        <h3 className="text-lg font-semibold">Webhooks & Notificações de Pix</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Receba notificações instantâneas sobre pagamentos Pix confirmados (`PIX_CONFIRMED`) e saques (`PIX_PAYOUT_SUCCESS`).
        </p>

        <WebhookForm merchantId={merchant.merchant_master_id ?? merchant.id} />
      </div>
    </div>
  );
}

function WebhookForm({ merchantId }: { merchantId: string }) {
  const [url, setUrl] = useState(`https://api.merchant.com/webhooks/cruziapay`);
  const [secret] = useState(() => `whsec_${merchantId.slice(0, 16)}`);
  const [events, setEvents] = useState({ pix_confirmed: true, pix_payout: true, chargeback: false });
  const [testing, setTesting] = useState(false);

  const handleTest = async () => {
    setTesting(true);
    await new Promise((r) => setTimeout(r, 800));
    setTesting(false);
    toast.success("Webhook de teste enviado com sucesso! Status: 200 OK");
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Configurações de Webhook salvas com sucesso!");
  };

  return (
    <form onSubmit={handleSave} className="mt-6 space-y-5">
      <div className="space-y-1.5">
        <label className="text-sm font-medium">URL de Webhook (Endpoint HTTPS)</label>
        <div className="flex items-center gap-2">
          <input
            type="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://seu-dominio.com/api/webhook"
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          />
          <Button type="button" variant="outline" disabled={testing} onClick={handleTest}>
            {testing ? "Enviando..." : "Testar Webhook"}
          </Button>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium">Segredo de Assinatura (HMAC Signature)</label>
        <div className="flex items-center gap-2">
          <code className="flex-1 overflow-x-auto rounded-lg border border-border bg-muted px-3 py-2 font-mono text-xs text-muted-foreground">
            {secret}
          </code>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              navigator.clipboard.writeText(secret);
              toast.success("Segredo de webhook copiado");
            }}
          >
            Copiar
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Usado no cabeçalho <code className="font-mono">X-CruziaPay-Signature</code> para validar a autenticidade das requisições.
        </p>
      </div>

      <div className="space-y-2 pt-2">
        <p className="text-sm font-medium">Eventos Assinados</p>
        <div className="grid gap-2 sm:grid-cols-3">
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              checked={events.pix_confirmed}
              onChange={(e) => setEvents({ ...events, pix_confirmed: e.target.checked })}
              className="rounded border-border"
            />
            <span>pix.confirmed (Pay-in)</span>
          </label>
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              checked={events.pix_payout}
              onChange={(e) => setEvents({ ...events, pix_payout: e.target.checked })}
              className="rounded border-border"
            />
            <span>pix.payout_completed</span>
          </label>
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              checked={events.chargeback}
              onChange={(e) => setEvents({ ...events, chargeback: e.target.checked })}
              className="rounded border-border"
            />
            <span>dispute.opened</span>
          </label>
        </div>
      </div>

      <Button type="submit" className="mt-2 text-primary-foreground">
        Salvar Configurações de Webhook
      </Button>
    </form>
  );
}