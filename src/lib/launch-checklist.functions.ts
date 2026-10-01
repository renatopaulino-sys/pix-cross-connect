import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const schema = z.object({
  markets: z.array(z.string().min(2).max(40)).min(1).max(12),
  businessModel: z.string().trim().min(2).max(200),
  vertical: z.string().trim().min(2).max(100),
  monthlyVolume: z.string().trim().max(60).optional().default(""),
  payins: z.array(z.string().max(40)).max(20),
  payouts: z.array(z.string().max(40)).max(20),
  requirements: z.string().trim().max(2000).optional().default(""),
  locale: z.enum(["pt", "en"]).default("pt"),
});

export type ChecklistInput = z.input<typeof schema>;

const SYSTEM = `You are a payments launch consultant for CruziaPay, a cross-border payment facilitator for Latin America.
Produce a practical, tailored launch checklist in Markdown for a merchant.
Rules:
- Structure: "## " section headings (e.g. Compliance & KYC, Payment methods, Integration, Settlement & FX, Risk & chargebacks, Go-live), each with "- [ ] " checklist items. Group per market when relevant.
- Each item is one concrete, actionable line; add a short reason after " — " when useful.
- Never name acquirers, banks, partner processors or providers. Payment methods (Pix, SPEI, PSE, OXXO, cards) may be named.
- Do not promise approval times, rates, or settlement windows; say they are defined in the commercial agreement / subject to onboarding.
- For gaming or other regulated verticals, require a valid local license and 18+ controls.
- Finish with a "## Questions for the CruziaPay team" section (3-5 bullets).
- Keep it under ~600 words. No preamble.`;

export const generateChecklist = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: ChecklistInput) => schema.parse(d))
  .handler(async ({ data }) => {
    const { generateLaunchChecklist, GatewayError } = await import("./launch-checklist.server");
    const lang = data.locale === "pt" ? "Brazilian Portuguese" : "English";
    const prompt = `Write the checklist in ${lang}.
Target markets: ${data.markets.join(", ")}
Business model: ${data.businessModel}
Vertical: ${data.vertical}
Expected monthly volume: ${data.monthlyVolume || "not informed"}
Pay-in methods wanted: ${data.payins.join(", ") || "not informed"}
Payout methods wanted: ${data.payouts.join(", ") || "none"}
Additional requirements: ${data.requirements || "none"}`;
    try {
      return { checklist: await generateLaunchChecklist(prompt, SYSTEM), error: null as string | null };
    } catch (e) {
      return { checklist: "", error: e instanceof GatewayError ? e.message : "Unexpected error." };
    }
  });
