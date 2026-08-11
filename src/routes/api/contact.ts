import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";
import { renderLeadEmail, sendEmail } from "@/lib/email";

const LEAD_INBOX = "comercial@cruziapay.com.br";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(8).max(40),
  country: z.string().trim().min(2).max(80),
  vertical: z.string().trim().min(1).max(120),
  volume: z.string().trim().min(1).max(120),
  message: z.string().trim().max(1000).optional().default(""),
  consent: z.literal(true),
  locale: z.enum(["pt", "en"]).default("pt"),
});

type Lead = z.infer<typeof schema>;

async function forwardToSheet(lead: Lead) {
  const webhook = process.env["GOOGLE_SHEET_WEBHOOK"];
  if (!webhook) return { sent: false, reason: "missing_google_sheet_webhook" };
  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        name: lead.name,
        company: lead.company,
        email: lead.email,
        phone: lead.phone,
        country: lead.country,
        vertical: lead.vertical,
        volume: lead.volume,
        message: lead.message,
      }),
    });
    if (!response.ok) {
      console.error(`Google Sheet webhook failed [${response.status}]: ${await response.text()}`);
      return { sent: false, reason: `sheet_${response.status}` };
    }
    return { sent: true };
  } catch (error) {
    console.error("Google Sheet webhook error:", error);
    return { sent: false, reason: "sheet_network_error" };
  }
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return Response.json({ error: "invalid_json" }, { status: 400 });
        }

        const parsed = schema.safeParse(raw);
        if (!parsed.success) {
          return Response.json({ error: "invalid_input" }, { status: 400 });
        }
        const lead = parsed.data;

        // 1) Persistência no banco (mantém o painel administrativo funcionando)
        const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
        const supabase = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
          auth: { persistSession: false, autoRefreshToken: false },
          global: {
            fetch: (input, init) => {
              const headers = new Headers(init?.headers);
              if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
                headers.delete("Authorization");
              }
              headers.set("apikey", key);
              return fetch(input, { ...init, headers });
            },
          },
        });

        const { error } = await supabase.from("leads").insert({
          name: lead.name,
          company: lead.company,
          email: lead.email,
          phone: lead.phone,
          country: lead.country,
          vertical: lead.vertical,
          monthly_volume: lead.volume,
          message: lead.message || null,
          consent: true,
          locale: lead.locale,
        });

        if (error) {
          console.error("Lead insert failed:", error.message);
          return Response.json({ error: "storage_failed" }, { status: 500 });
        }

        // 2) e 3) Encaminhamentos (não bloqueiam o sucesso do lead)
        const [sheet, email] = await Promise.all([
          forwardToSheet(lead),
          sendEmail({
            to: LEAD_INBOX,
            replyTo: lead.email,
            subject: `Novo lead CruziaPay — ${lead.company} (${lead.country})`,
            html: renderLeadEmail({
              Nome: lead.name,
              Empresa: lead.company,
              "E-mail": lead.email,
              Telefone: lead.phone,
              País: lead.country,
              Vertical: lead.vertical,
              "Volume mensal": lead.volume,
              Mensagem: lead.message,
              Recebido: new Date().toISOString(),
            }),
          }).catch((error: unknown) => {
            console.error("Lead email error:", error);
            return { sent: false, reason: "email_network_error" as const };
          }),
        ]);

        return Response.json({ ok: true, stored: true, sheet: sheet.sent, email: email.sent });
      },
    },
  },
});