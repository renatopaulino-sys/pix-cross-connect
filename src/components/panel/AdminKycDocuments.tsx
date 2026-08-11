import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { listMerchantDocuments, decideDocument, getDocumentUrl, type MerchantDoc } from "@/lib/kycdocs.functions";
import { StatusPill } from "@/components/panel/PanelLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminKycDocuments({ merchantId }: { merchantId: string }) {
  const fetchDocs = useServerFn(listMerchantDocuments);
  const decide = useServerFn(decideDocument);
  const signUrl = useServerFn(getDocumentUrl);
  const queryClient = useQueryClient();
  const [rejecting, setRejecting] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);

  const docs = useQuery({
    queryKey: ["merchant-docs", merchantId],
    queryFn: () => fetchDocs({ data: { merchantId } }),
  });

  async function open(path: string) {
    try {
      const { url } = await signUrl({ data: { path } });
      window.open(url, "_blank", "noopener");
    } catch {
      toast.error("Não foi possível abrir o arquivo");
    }
  }

  async function act(documentId: string, status: "approved" | "rejected", rejection_reason?: string) {
    setBusy(true);
    try {
      await decide({ data: { documentId, status, rejection_reason } });
      toast.success(status === "approved" ? "Documento aprovado" : "Documento recusado");
      setRejecting(null);
      setReason("");
      await queryClient.invalidateQueries({ queryKey: ["merchant-docs", merchantId] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha ao registrar decisão");
    } finally {
      setBusy(false);
    }
  }

  const list = (docs.data ?? []) as MerchantDoc[];

  return (
    <div>
      <p className="label-mono text-xs uppercase text-muted-foreground">Documentos anexados</p>
      {docs.isLoading && <p className="mt-2 text-sm text-muted-foreground">Carregando...</p>}
      {!docs.isLoading && list.length === 0 && (
        <p className="mt-2 text-sm text-muted-foreground">Nenhum documento enviado por este cliente.</p>
      )}
      <ul className="mt-2 space-y-2 text-sm">
        {list.map((d) => (
          <li key={d.id} className="rounded-lg border border-border px-3 py-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-medium">{d.document_key}</p>
                <button type="button" className="text-xs text-muted-foreground underline" onClick={() => open(d.file_url)}>
                  {d.file_name}
                </button>
              </div>
              <StatusPill status={d.status} />
            </div>

            {d.status === "rejected" && d.rejection_reason && (
              <p className="mt-1 text-xs text-destructive">Motivo: {d.rejection_reason}</p>
            )}

            {rejecting === d.id ? (
              <div className="mt-3 space-y-2">
                <Input
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Motivo da rejeição"
                />
                <div className="flex gap-2">
                  <Button size="sm" variant="destructive" disabled={busy} onClick={() => act(d.id, "rejected", reason)}>
                    Confirmar recusa
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => { setRejecting(null); setReason(""); }}>
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-3 flex gap-2">
                <Button size="sm" disabled={busy} className="text-primary-foreground" onClick={() => act(d.id, "approved")}>
                  Aprovar
                </Button>
                <Button size="sm" variant="outline" onClick={() => { setRejecting(d.id); setReason(d.rejection_reason ?? ""); }}>
                  Recusar
                </Button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
