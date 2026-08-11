import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

type AnyClient = {
  schema: (name: string) => any;
  from: (name: string) => any;
};

async function admin(): Promise<AnyClient> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin as unknown as AnyClient;
}

async function isAdmin(db: AnyClient, userId: string) {
  const { data } = await db.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
  return Boolean(data);
}

async function writeAudit(
  db: AnyClient,
  entry: {
    actorUserId: string;
    actorEmail?: string | null;
    action: string;
    entityType: string;
    entityId?: string | null;
    entityLabel?: string | null;
    details?: Record<string, unknown>;
  },
) {
  await db.from("audit_logs").insert({
    actor_user_id: entry.actorUserId,
    actor_email: entry.actorEmail ?? null,
    action: entry.action,
    entity_type: entry.entityType,
    entity_id: entry.entityId ?? null,
    entity_label: entry.entityLabel ?? null,
    details: entry.details ?? {},
  });
}

export const getMe = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const db = await admin();
    return {
      userId: context.userId,
      email: (context.claims as { email?: string }).email ?? "",
      isAdmin: await isAdmin(db, context.userId),
    };
  });

export const getMyMerchant = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const db = await admin();
    const { data: merchant } = await db
      .schema("cbm_funnels")
      .from("merchants")
      .select("*")
      .eq("owner_user_id", context.userId)
      .maybeSingle();
    if (!merchant) return { merchant: null, kyc: null };
    const { data: kyc } = await db
      .schema("cbm_funnels")
      .from("kyc_cases")
      .select("*")
      .eq("merchant_id", merchant.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    return { merchant, kyc };
  });

export type MerchantInput = {
  legal_name: string;
  fantasy_name: string;
  email: string;
  phone: string;
  country: string;
  registration_number: string;
  tax_id: string;
};

export const saveMyMerchant = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: MerchantInput) => {
    const required: (keyof MerchantInput)[] = ["legal_name", "email", "country"];
    for (const key of required) {
      if (!String(data[key] ?? "").trim()) throw new Error(`Campo obrigatório: ${key}`);
    }
    return data;
  })
  .handler(async ({ data, context }) => {
    const db = await admin();
    const merchants = db.schema("cbm_funnels").from("merchants");
    const { data: existing } = await db
      .schema("cbm_funnels")
      .from("merchants")
      .select("id")
      .eq("owner_user_id", context.userId)
      .maybeSingle();

    if (existing) {
      const { error } = await merchants
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq("id", existing.id)
        .eq("owner_user_id", context.userId);
      if (error) throw new Error(error.message);
      return { id: existing.id as string, created: false };
    }

    const { data: inserted, error } = await merchants
      .insert({
        ...data,
        owner_user_id: context.userId,
        merchant_master_id: `CZ-${Date.now().toString(36).toUpperCase()}`,
        kyc_status: "pending",
        compliance_status: "pending",
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);

    await db
      .schema("cbm_funnels")
      .from("kyc_cases")
      .insert({ merchant_id: inserted.id, kyc_status: "pending" });

    return { id: inserted.id as string, created: true };
  });

export const getMyDashboard = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const db = await admin();
    const { data: merchant } = await db
      .schema("cbm_funnels")
      .from("merchants")
      .select("id, legal_name, kyc_status")
      .eq("owner_user_id", context.userId)
      .maybeSingle();
    if (!merchant) return { merchant: null, transactions: [], tpv: 0, balance: 0 };

    const { data: transactions } = await db
      .schema("gateway")
      .from("transactions")
      .select("*")
      .eq("merchant_id", merchant.id)
      .order("created_at", { ascending: false })
      .limit(25);

    const rows = (transactions ?? []) as { amount: number | string; status: string }[];
    const tpv = rows.reduce((sum, r) => sum + Number(r.amount), 0);
    const balance = rows
      .filter((r) => r.status === "settled")
      .reduce((sum, r) => sum + Number(r.amount), 0);

    return { merchant, transactions: transactions ?? [], tpv, balance };
  });

export const listMerchants = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const db = await admin();
    if (!(await isAdmin(db, context.userId))) throw new Error("Forbidden");
    const { data } = await db
      .schema("cbm_funnels")
      .from("merchants")
      .select("*")
      .order("created_at", { ascending: false });
    return data ?? [];
  });

export const getMerchantDetail = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { merchantId: string }) => data)
  .handler(async ({ data, context }) => {
    const db = await admin();
    if (!(await isAdmin(db, context.userId))) throw new Error("Forbidden");
    const { data: merchant } = await db
      .schema("cbm_funnels")
      .from("merchants")
      .select("*")
      .eq("id", data.merchantId)
      .maybeSingle();
    const { data: kyc } = await db
      .schema("cbm_funnels")
      .from("kyc_cases")
      .select("*")
      .eq("merchant_id", data.merchantId)
      .order("created_at", { ascending: false });
    const kycIds = ((kyc ?? []) as { id: string }[]).map((k) => k.id);
    const { data: compliance } = kycIds.length
      ? await db
          .schema("cbm_funnels")
          .from("compliance_cases")
          .select("*")
          .in("kyc_case_id", kycIds)
          .order("created_at", { ascending: false })
      : { data: [] };
    return { merchant, kyc: kyc ?? [], compliance: compliance ?? [] };
  });

export const decideKyc = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { merchantId: string; decision: "approved" | "rejected"; notes?: string }) => {
    if (data.decision !== "approved" && data.decision !== "rejected") throw new Error("Decisão inválida");
    return data;
  })
  .handler(async ({ data, context }) => {
    const db = await admin();
    if (!(await isAdmin(db, context.userId))) throw new Error("Forbidden");

    const { error: mErr } = await db
      .schema("cbm_funnels")
      .from("merchants")
      .update({
        kyc_status: data.decision,
        compliance_status: data.decision === "approved" ? "cleared" : "rejected",
        risk_level: data.decision === "approved" ? "low" : "high",
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.merchantId);
    if (mErr) throw new Error(mErr.message);

    let { data: kycCase } = await db
      .schema("cbm_funnels")
      .from("kyc_cases")
      .select("id")
      .eq("merchant_id", data.merchantId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!kycCase) {
      const { data: created } = await db
        .schema("cbm_funnels")
        .from("kyc_cases")
        .insert({ merchant_id: data.merchantId, kyc_status: data.decision })
        .select("id")
        .single();
      kycCase = created;
    } else {
      await db
        .schema("cbm_funnels")
        .from("kyc_cases")
        .update({ kyc_status: data.decision })
        .eq("id", kycCase.id);
    }

    await db
      .schema("cbm_funnels")
      .from("compliance_cases")
      .insert({
        kyc_case_id: kycCase!.id,
        compliance_status: data.decision === "approved" ? "cleared" : "rejected",
        action_plan: data.notes ?? null,
        monitoring_required: data.decision === "approved",
      });

    const { data: merchant } = await db
      .schema("cbm_funnels")
      .from("merchants")
      .select("legal_name, email")
      .eq("id", data.merchantId)
      .maybeSingle();

    await writeAudit(db, {
      actorUserId: context.userId,
      actorEmail: (context.claims as { email?: string }).email ?? null,
      action: data.decision === "approved" ? "kyc.approved" : "kyc.rejected",
      entityType: "merchant",
      entityId: data.merchantId,
      entityLabel: merchant?.legal_name ?? merchant?.email ?? data.merchantId,
      details: { notes: data.notes ?? null },
    });

    return { ok: true };
  });

export const listConnectors = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async () => {
    const db = await admin();
    const { data } = await db
      .schema("gateway")
      .from("connector_mappings")
      .select("*")
      .order("connector_name");
    return data ?? [];
  });

export const listRoutingRules = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async () => {
    const db = await admin();
    const { data } = await db
      .schema("gateway")
      .from("routing_rules")
      .select("*")
      .order("priority", { ascending: true });
    return data ?? [];
  });

export const createRoutingRule = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (data: {
      rule_name: string;
      priority: number;
      country: string;
      method: string;
      destination_connector_id: string;
      merchant_id?: string | null;
    }) => {
      if (!data.rule_name.trim()) throw new Error("Nome da regra é obrigatório");
      if (!data.destination_connector_id) throw new Error("Selecione um conector de destino");
      return data;
    },
  )
  .handler(async ({ data, context }) => {
    const db = await admin();
    if (!(await isAdmin(db, context.userId))) throw new Error("Forbidden");
    const { data: inserted, error } = await db
      .schema("gateway")
      .from("routing_rules")
      .insert({
        rule_name: data.rule_name,
        priority: Number(data.priority) || 100,
        criteria: { country: data.country, method: data.method },
        destination_connector_id: data.destination_connector_id,
        merchant_id: data.merchant_id ? data.merchant_id : null,
        is_active: true,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);

    await writeAudit(db, {
      actorUserId: context.userId,
      actorEmail: (context.claims as { email?: string }).email ?? null,
      action: "routing_rule.created",
      entityType: "routing_rule",
      entityId: inserted?.id ?? null,
      entityLabel: data.rule_name,
      details: {
        priority: Number(data.priority) || 100,
        criteria: { country: data.country, method: data.method },
        destination_connector_id: data.destination_connector_id,
        merchant_id: data.merchant_id ?? null,
      },
    });

    return { ok: true };
  });

export const toggleRoutingRule = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; is_active: boolean }) => data)
  .handler(async ({ data, context }) => {
    const db = await admin();
    if (!(await isAdmin(db, context.userId))) throw new Error("Forbidden");
    const { data: updated, error } = await db
      .schema("gateway")
      .from("routing_rules")
      .update({ is_active: data.is_active })
      .eq("id", data.id)
      .select("rule_name")
      .maybeSingle();
    if (error) throw new Error(error.message);

    await writeAudit(db, {
      actorUserId: context.userId,
      actorEmail: (context.claims as { email?: string }).email ?? null,
      action: "routing_rule.updated",
      entityType: "routing_rule",
      entityId: data.id,
      entityLabel: updated?.rule_name ?? data.id,
      details: { is_active: data.is_active },
    });

    return { ok: true };
  });

export const deleteRoutingRule = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!data.id) throw new Error("Regra inválida");
    return data;
  })
  .handler(async ({ data, context }) => {
    const db = await admin();
    if (!(await isAdmin(db, context.userId))) throw new Error("Forbidden");

    const { data: existing } = await db
      .schema("gateway")
      .from("routing_rules")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();

    const { error } = await db.schema("gateway").from("routing_rules").delete().eq("id", data.id);
    if (error) throw new Error(error.message);

    await writeAudit(db, {
      actorUserId: context.userId,
      actorEmail: (context.claims as { email?: string }).email ?? null,
      action: "routing_rule.deleted",
      entityType: "routing_rule",
      entityId: data.id,
      entityLabel: existing?.rule_name ?? data.id,
      details: { removed: existing ?? null },
    });

    return { ok: true };
  });

export const listAuditLogs = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const db = await admin();
    if (!(await isAdmin(db, context.userId))) throw new Error("Forbidden");
    const { data } = await db
      .from("audit_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    return data ?? [];
  });