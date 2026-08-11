import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getMyMerchant, saveMyMerchant, type MerchantInput } from "@/lib/panel.functions";
import { PageHeader, StatusPill } from "@/components/panel/PanelLayout";
import { KycDocuments } from "@/components/panel/KycDocuments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_authenticated/app/onboarding")({
  component: OnboardingPage,
});

const empty: MerchantInput = {
  legal_name: "",
  fantasy_name: "",
  email: "",
  phone: "",
  country: "BR",
  registration_number: "",
  tax_id: "",
};

const fields: { key: keyof MerchantInput; label: string; required?: boolean }[] = [
  { key: "legal_name", label: "Razão social", required: true },
  { key: "fantasy_name", label: "Nome fantasia" },
  { key: "email", label: "E-mail de contato", required: true },
  { key: "phone", label: "Telefone" },
  { key: "country", label: "País (ISO, ex.: BR)", required: true },
  { key: "registration_number", label: "Número de registro / CNPJ" },
  { key: "tax_id", label: "Identificação fiscal" },
];

function OnboardingPage() {
  const fetchMerchant = useServerFn(getMyMerchant);
  const save = useServerFn(saveMyMerchant);
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["my-merchant"], queryFn: () => fetchMerchant() });
  const [form, setForm] = useState<MerchantInput>(empty);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data?.merchant) {
      const m = data.merchant as Partial<MerchantInput>;
      setForm({
        legal_name: m.legal_name ?? "",
        fantasy_name: m.fantasy_name ?? "",
        email: m.email ?? "",
        phone: m.phone ?? "",
        country: m.country ?? "BR",
        registration_number: m.registration_number ?? "",
        tax_id: m.tax_id ?? "",
      });
    }
  }, [data]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await save({ data: form });
      toast.success(res.created ? "Dados enviados. KYC em análise." : "Dados atualizados.");
      await queryClient.invalidateQueries();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Não foi possível salvar");
    } finally {
      setSaving(false);
    }
  }

  if (isLoading) return <p className="text-sm text-muted-foreground">Carregando...</p>;

  const status = (data?.merchant as { kyc_status?: string } | null)?.kyc_status;

  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Onboarding (KYC)"
        subtitle="Dados cadastrais da empresa para análise de KYC e compliance."
      />

      {data?.merchant && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
          <span className="text-sm text-muted-foreground">Status do onboarding:</span>
          <StatusPill status={status} />
        </div>
      )}

      <form onSubmit={submit} className="grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.key} className="space-y-1.5">
            <Label htmlFor={f.key}>
              {f.label}
              {f.required && " *"}
            </Label>
            <Input
              id={f.key}
              required={f.required}
              value={form[f.key]}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
            />
          </div>
        ))}
        <div className="sm:col-span-2">
          <Button type="submit" disabled={saving} className="text-primary-foreground">
            {saving ? "Salvando..." : data?.merchant ? "Atualizar dados" : "Enviar para análise"}
          </Button>
        </div>
      </form>

      <KycDocuments
        country={(form.country || "BR").toUpperCase()}
        merchantId={(data?.merchant as { id?: string } | null)?.id ?? null}
      />
    </div>
  );
}