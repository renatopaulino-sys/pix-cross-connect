import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

type AnyClient = { schema: (name: string) => any; from: (name: string) => any; storage: any };

async function admin(): Promise<AnyClient> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin as unknown as AnyClient;
}

async function isAdmin(db: AnyClient, userId: string) {
  const { data } = await db.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
  return Boolean(data);
}

export type RequiredDoc = {
  id: string;
  country_code: string;
  document_key: string;
  document_name: string;
  description: string | null;
  is_required: boolean;
};

export type MerchantDoc = {
  id: string;
  merchant_id: string;
  document_key: string;
  file_name: string;
  file_url: string;
  status: string;
  rejection_reason: string | null;
  created_at: string;
};

export const listRequiredDocuments = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { country: string }) => ({ country: String(data.country ?? "").toUpperCase() }))
  .handler(async ({ data }) => {
    const db = await admin();
    const { data: rows } = await db
      .schema("cbm_funnels")
      .from("kyc_required_documents")
      .select("*")
      .eq("country_code", data.country)
      .order("document_name");
    return (rows ?? []) as RequiredDoc[];
  });

export const listMyDocuments = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const db = await admin();
    const { data: merchant } = await db
      .schema("cbm_funnels")
      .from("merchants")
      .select("id")
      .eq("owner_user_id", context.userId)
      .maybeSingle();
    if (!merchant) return [] as MerchantDoc[];
    const { data: rows } = await db
      .schema("cbm_funnels")
      .from("merchant_documents")
      .select("*")
      .eq("merchant_id", merchant.id)
      .order("created_at", { ascending: false });
    return (rows ?? []) as MerchantDoc[];
  });

export const saveMyDocument = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { document_key: string; file_name: string; file_url: string }) => {
    if (!data.document_key || !data.file_url) throw new Error("Documento inválido");
    return data;
  })
  .handler(async ({ data, context }) => {
    const db = await admin();
    const { data: merchant } = await db
      .schema("cbm_funnels")
      .from("merchants")
      .select("id")
      .eq("owner_user_id", context.userId)
      .maybeSingle();
    if (!merchant) throw new Error("Cadastre os dados da empresa antes de anexar documentos.");

    const table = db.schema("cbm_funnels").from("merchant_documents");
    const { data: existing } = await db
      .schema("cbm_funnels")
      .from("merchant_documents")
      .select("id")
      .eq("merchant_id", merchant.id)
      .eq("document_key", data.document_key)
      .maybeSingle();

    if (existing) {
      const { error } = await table
        .update({
          file_name: data.file_name,
          file_url: data.file_url,
          status: "pending",
          rejection_reason: null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);
      if (error) throw new Error(error.message);
      return { ok: true, id: existing.id as string };
    }

    const { data: inserted, error } = await table
      .insert({
        merchant_id: merchant.id,
        document_key: data.document_key,
        file_name: data.file_name,
        file_url: data.file_url,
        status: "pending",
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { ok: true, id: inserted.id as string };
  });

export const listMerchantDocuments = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { merchantId: string }) => data)
  .handler(async ({ data, context }) => {
    const db = await admin();
    if (!(await isAdmin(db, context.userId))) throw new Error("Forbidden");
    const { data: rows } = await db
      .schema("cbm_funnels")
      .from("merchant_documents")
      .select("*")
      .eq("merchant_id", data.merchantId)
      .order("created_at", { ascending: false });
    return (rows ?? []) as MerchantDoc[];
  });

export const decideDocument = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { documentId: string; status: "approved" | "rejected"; rejection_reason?: string }) => {
    if (data.status !== "approved" && data.status !== "rejected") throw new Error("Decisão inválida");
    if (data.status === "rejected" && !String(data.rejection_reason ?? "").trim())
      throw new Error("Informe o motivo da rejeição");
    return data;
  })
  .handler(async ({ data, context }) => {
    const db = await admin();
    if (!(await isAdmin(db, context.userId))) throw new Error("Forbidden");
    const { data: updated, error } = await db
      .schema("cbm_funnels")
      .from("merchant_documents")
      .update({
        status: data.status,
        rejection_reason: data.status === "rejected" ? data.rejection_reason : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.documentId)
      .select("document_key, merchant_id")
      .maybeSingle();
    if (error) throw new Error(error.message);

    await db.from("audit_logs").insert({
      actor_user_id: context.userId,
      actor_email: (context.claims as { email?: string }).email ?? null,
      action: data.status === "approved" ? "document.approved" : "document.rejected",
      entity_type: "merchant_document",
      entity_id: data.documentId,
      entity_label: updated?.document_key ?? data.documentId,
      details: { merchant_id: updated?.merchant_id ?? null, rejection_reason: data.rejection_reason ?? null },
    });

    return { ok: true };
  });

export const getDocumentUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { path: string }) => data)
  .handler(async ({ data, context }) => {
    const db = await admin();
    const allowed =
      (await isAdmin(db, context.userId)) || data.path.startsWith(`${context.userId}/`);
    if (!allowed) throw new Error("Forbidden");
    const { data: signed, error } = await db.storage
      .from("kyc-documents")
      .createSignedUrl(data.path, 300);
    if (error) throw new Error(error.message);
    return { url: signed?.signedUrl as string };
  });
