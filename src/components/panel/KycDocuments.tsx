import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  listRequiredDocuments,
  listMyDocuments,
  saveMyDocument,
  getDocumentUrl,
  type MerchantDoc,
  type RequiredDoc,
} from "@/lib/kycdocs.functions";
import { StatusPill } from "@/components/panel/PanelLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function KycDocuments({ country, merchantId }: { country: string; merchantId: string | null }) {
  const fetchRequired = useServerFn(listRequiredDocuments);
  const fetchMine = useServerFn(listMyDocuments);
  const save = useServerFn(saveMyDocument);
  const signUrl = useServerFn(getDocumentUrl);
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState<string | null>(null);

  const required = useQuery({
    queryKey: ["required-docs", country],
    queryFn: () => fetchRequired({ data: { country } }),
    enabled: Boolean(country),
  });
  const mine = useQuery({
    queryKey: ["my-docs"],
    queryFn: () => fetchMine(),
    enabled: Boolean(merchantId),
  });

  const byKey = new Map((mine.data ?? []).map((d: MerchantDoc) => [d.document_key, d]));

  async function upload(doc: RequiredDoc, file: File) {
    if (!merchantId) {
      toast.error("Salve os dados da empresa antes de anexar documentos.");
      return;
    }
    setUploading(doc.document_key);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      if (!uid) throw new Error("Sessão expirada");
      const ext = file.name.split(".").pop() ?? "bin";
      const path = `${uid}/${merchantId}/${doc.document_key}-${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("kyc-documents").upload(path, file, { upsert: true });
      if (error) throw new Error(error.message);
      await save({ data: { document_key: doc.document_key, file_name: file.name, file_url: path } });
      toast.success(`${doc.document_name} enviado para análise.`);
      await queryClient.invalidateQueries({ queryKey: ["my-docs"] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha no envio do arquivo");
    } finally {
      setUploading(null);
    }
  }

  async function open(path: string) {
    try {
      const { url } = await signUrl({ data: { path } });
      window.open(url, "_blank", "noopener");
    } catch {
      toast.error("Não foi possível abrir o arquivo");
    }
  }

  if (!country) return null;

  return (
    <section className="mt-8 rounded-2xl border border-border bg-card p-6">
      <h2 className="font-display text-lg font-bold">Documentos exigidos ({country})</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Anexe os documentos obrigatórios para o país selecionado. Eles ficam como pendentes até a análise do compliance.
      </p>

      {required.isLoading && <p className="mt-4 text-sm text-muted-foreground">Carregando documentos...</p>}
      {required.data?.length === 0 && (
        <p className="mt-4 text-sm text-muted-foreground">Nenhum documento configurado para este país.</p>
      )}

      <ul className="mt-5 space-y-4">
        {(required.data ?? []).map((doc: RequiredDoc) => {
          const sent = byKey.get(doc.document_key);
          return (
            <li key={doc.id} className="rounded-xl border border-border p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium">
                    {doc.document_name}
                    {doc.is_required && " *"}
                  </p>
                  {doc.description && <p className="mt-1 text-sm text-muted-foreground">{doc.description}</p>}
                </div>
                {sent && <StatusPill status={sent.status} />}
              </div>

              {sent && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Arquivo:{" "}
                  <button type="button" className="underline" onClick={() => open(sent.file_url)}>
                    {sent.file_name}
                  </button>
                  {sent.status === "rejected" && sent.rejection_reason && (
                    <span className="block text-destructive">Motivo da recusa: {sent.rejection_reason}</span>
                  )}
                </p>
              )}

              <Input
                type="file"
                className="mt-3"
                disabled={uploading === doc.document_key || !merchantId}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void upload(doc, file);
                  e.target.value = "";
                }}
              />
              {uploading === doc.document_key && <p className="mt-2 text-xs text-muted-foreground">Enviando...</p>}
            </li>
          );
        })}
      </ul>
      {!merchantId && (
        <p className="mt-4 text-sm text-muted-foreground">
          Salve os dados da empresa acima para habilitar o envio de arquivos.
        </p>
      )}
    </section>
  );
}

export function AdminDocuments({ merchantId }: { merchantId: string }) {
  return <AdminDocsInner merchantId={merchantId} />;
}

function AdminDocsInner({ merchantId }: { merchantId: string }) {
  const { useServerFn: _u } = { useServerFn };
  void _u;
  return <AdminDocsList merchantId={merchantId} />;
}

function AdminDocsList({ merchantId }: { merchantId: string }) {
  return <AdminDocsBody merchantId={merchantId} />;
}

function AdminDocsBody({ merchantId }: { merchantId: string }) {
  return <AdminDocsView merchantId={merchantId} />;
}

function AdminDocsView({ merchantId }: { merchantId: string }) {
  return <AdminDocsPanel merchantId={merchantId} />;
}

function AdminDocsPanel({ merchantId }: { merchantId: string }) {
  return <AdminDocs merchantId={merchantId} />;
}

function AdminDocs({ merchantId }: { merchantId: string }) {
  void merchantId;
  return null;
}
