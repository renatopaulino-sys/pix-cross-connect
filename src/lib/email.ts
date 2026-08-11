/**
 * Envio de e-mail via API HTTP do SendGrid.
 *
 * Usamos a REST API (fetch) em vez do SDK `@sendgrid/mail` porque o runtime
 * do servidor é um Worker (edge) e o SDK depende de módulos Node-only.
 * O contrato é o mesmo: basta ter SENDGRID_API_KEY configurada.
 */

export type EmailPayload = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

export type EmailResult = { sent: boolean; reason?: string };

export async function sendEmail({ to, subject, html, replyTo }: EmailPayload): Promise<EmailResult> {
  const apiKey = process.env["SENDGRID_API_KEY"];
  if (!apiKey) return { sent: false, reason: "missing_sendgrid_api_key" };

  const from = process.env["SENDGRID_FROM_EMAIL"] || "no-reply@cruziapay.com.br";

  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: from, name: "CruziaPay" },
      ...(replyTo ? { reply_to: { email: replyTo } } : {}),
      subject,
      content: [{ type: "text/html", value: html }],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error(`SendGrid request failed [${response.status}]: ${body}`);
    return { sent: false, reason: `sendgrid_${response.status}` };
  }
  return { sent: true };
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function renderLeadEmail(fields: Record<string, string>): string {
  const rows = Object.entries(fields)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #e6e9ef;font:600 13px Arial,sans-serif;color:#0b1b33;white-space:nowrap;">${escapeHtml(label)}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e6e9ef;font:400 13px Arial,sans-serif;color:#334155;">${escapeHtml(value || "—").replace(/\n/g, "<br />")}</td>
        </tr>`,
    )
    .join("");

  return `<!doctype html><html><body style="margin:0;background:#ffffff;">
    <div style="max-width:640px;margin:0 auto;padding:24px;">
      <h1 style="font:700 20px Arial,sans-serif;color:#0b1b33;margin:0 0 4px;">Novo lead — CruziaPay</h1>
      <p style="font:400 13px Arial,sans-serif;color:#64748b;margin:0 0 20px;">Recebido pelo formulário de contato do site.</p>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e6e9ef;border-radius:8px;">${rows}</table>
    </div>
  </body></html>`;
}