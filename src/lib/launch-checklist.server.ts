import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const RUN_ID = "X-Lovable-AIG-Run-ID";

export class GatewayError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

export async function generateLaunchChecklist(prompt: string, system: string): Promise<string> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new GatewayError("AI is not configured.", 401);

  let runId: string | undefined;
  let failStatus: number | undefined;
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: async (input, init) => {
      const headers = new Headers(init?.headers);
      if (runId && !headers.has(RUN_ID)) headers.set(RUN_ID, runId);
      const res = await fetch(input, { ...init, headers });
      runId ??= res.headers.get(RUN_ID)?.trim() || undefined;
      if (!res.ok) failStatus = res.status;
      return res;
    },
  });

  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    system,
    prompt,
    maxRetries: 0,
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  try {
    const text = await result.text;
    if (!text.trim()) throw new GatewayError("The AI could not produce a checklist for this request.", 422);
    return text;
  } catch (e) {
    if (e instanceof GatewayError) throw e;
    const status = failStatus ?? 500;
    const msg =
      status === 402
        ? "AI credits are exhausted. Add credits in Settings → Plans & credits."
        : status === 429
          ? "Too many requests right now. Please try again in a minute."
          : status === 403
            ? "AI access is currently blocked for this workspace."
            : "The AI service failed. Please try again later.";
    console.error("launch checklist gateway error", status, e);
    throw new GatewayError(msg, status);
  }
}
