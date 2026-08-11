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
    </div>
  );
}