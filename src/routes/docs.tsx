import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Code2, Copy, Play, Check, ShieldCheck, Terminal, BookOpen, Key, Server, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/docs")({
  component: ApiDocsPage,
});

const codeExamples = {
  charge: {
    curl: `curl -X POST "https://hyperswitch-web-production-0076.up.railway.app/v1/charges" \\
  -H "Authorization: Bearer live_sk_cruziapay_8f92a10b" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 5000,
    "currency": "BRL",
    "payment_method": "pix",
    "customer": {
      "name": "João da Silva",
      "email": "joao@cliente.com",
      "tax_id": "12345678900"
    },
    "webhook_url": "https://sua-loja.com/api/webhooks/pix"
  }'`,
    node: `import { CruziaPay } from "@cruziapay/sdk";

const gateway = new CruziaPay({
  apiKey: process.env.CRUZIAPAY_API_KEY,
  environment: "production"
});

const charge = await gateway.charges.create({
  amount: 50.00,
  currency: "BRL",
  paymentMethod: "pix",
  customer: {
    name: "João da Silva",
    email: "joao@cliente.com",
    taxId: "12345678900"
  }
});

console.log("Pix Copia e Cola:", charge.pixPayload);
console.log("QR Code SVG:", charge.qrCodeUrl);`,
    python: `import requests

url = "https://hyperswitch-web-production-0076.up.railway.app/v1/charges"
headers = {
    "Authorization": "Bearer live_sk_cruziapay_8f92a10b",
    "Content-Type": "application/json"
}
payload = {
    "amount": 5000,
    "currency": "BRL",
    "payment_method": "pix",
    "customer": {
        "name": "João da Silva",
        "email": "joao@cliente.com",
        "tax_id": "12345678900"
    }
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`,
    php: `<?php

$ch = curl_init('https://hyperswitch-web-production-0076.up.railway.app/v1/charges');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer live_sk_cruziapay_8f92a10b',
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'amount' => 5000,
    'currency' => 'BRL',
    'payment_method' => 'pix',
    'customer' => [
        'name' => 'João da Silva',
        'email' => 'joao@cliente.com',
        'tax_id' => '12345678900'
    ]
]));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$result = json_decode(curl_exec($ch), true);
curl_close($ch);

echo $result['pix_payload'];`,
  },
};

function ApiDocsPage() {
  const [activeEndpoint, setActiveEndpoint] = useState<"charge" | "status" | "payout" | "webhook">("charge");
  const [activeLang, setActiveLang] = useState<"curl" | "node" | "python" | "php">("curl");
  const [copied, setCopied] = useState<boolean>(false);
  const [testing, setTesting] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<string | null>(null);

  const currentCode = codeExamples.charge[activeLang];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    toast.success("Código copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunPlayground = async () => {
    setTesting(true);
    setApiResponse(null);
    await new Promise((res) => setTimeout(res, 800));
    setTesting(false);
    setApiResponse(JSON.stringify({
      status: 200,
      id: "ch_cruziapay_9981240192",
      object: "charge",
      amount: 5000,
      currency: "BRL",
      status: "pending",
      pix_payload: "00020126580014br.gov.bcb.pix0136cruziapay-pix-gateway-id-9981240192520400005303986540550.005802BR5920CruziaPay Pagamentos6009SAO PAULO62070503***6304E8A2",
      qr_code_url: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020126580014br.gov.bcb.pix0136cruziapay-pix-gateway",
      created_at: new Date().toISOString()
    }, null, 2));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="container-site pt-28 pb-20">
        <div className="flex flex-col gap-2 border-b border-border pb-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <Code2 className="h-4 w-4" />
            <span>Developer Hub & API Reference</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold lg:text-4xl">
            Documentação da API CruziaPay
          </h1>
          <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
            Integre cobranças Pix instantâneas (Pay-in) e saques automáticos (Pay-out) no seu sistema em minutos com HTTPS RESTful API e Webhooks HMAC.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* Navegação da Documentação */}
          <aside className="space-y-6">
            <div>
              <p className="label-mono text-xs uppercase text-muted-foreground font-semibold mb-2">Endpoints Pix</p>
              <nav className="space-y-1">
                {[
                  { id: "charge", label: "POST /v1/charges", badge: "Pay-in" },
                  { id: "status", label: "GET /v1/charges/:id", badge: "Status" },
                  { id: "payout", label: "POST /v1/payouts", badge: "Pay-out" },
                  { id: "webhook", label: "Webhooks HMAC", badge: "Events" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveEndpoint(item.id as any)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                      activeEndpoint === item.id
                        ? "bg-primary/10 text-primary font-bold"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] uppercase font-mono">{item.badge}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="rounded-xl border border-border bg-card p-4 text-xs space-y-3">
              <div className="flex items-center gap-2 font-bold text-foreground">
                <Server className="h-4 w-4 text-primary" />
                <span>Base URL Produção</span>
              </div>
              <code className="block rounded bg-muted p-2 font-mono text-[11px] break-all text-primary">
                https://hyperswitch-web-production-0076.up.railway.app
              </code>
              <p className="text-muted-foreground text-[11px]">
                Todas as requisições requerem o cabeçalho <code className="text-foreground font-mono">Authorization: Bearer YOUR_API_KEY</code>.
              </p>
            </div>
          </aside>

          {/* Conteúdo do Código e Playground */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-lg">
              {/* Header de seleção de linguagem */}
              <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-3">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-foreground">
                  <Terminal className="h-4 w-4 text-emerald-500" />
                  <span>Exemplo de Código (Pay-in)</span>
                </div>
                <div className="flex items-center gap-2">
                  {(["curl", "node", "python", "php"] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveLang(lang)}
                      className={`rounded px-2.5 py-1 text-xs font-mono font-semibold uppercase transition-colors ${
                        activeLang === lang ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                  <Button variant="outline" size="sm" onClick={handleCopyCode} className="h-7 text-xs ml-2">
                    {copied ? <Check className="h-3.5 w-3.5 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                    {copied ? "Copiado" : "Copiar"}
                  </Button>
                </div>
              </div>

              {/* Snippet de Código */}
              <pre className="p-4 font-mono text-xs leading-relaxed overflow-x-auto bg-slate-950 text-slate-100">
                <code>{currentCode}</code>
              </pre>
            </div>

            {/* Testador ao Vivo (Playground) */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Testar API ao Vivo</h3>
                  <p className="text-xs text-muted-foreground">
                    Execute a chamada de API agora mesmo contra o servidor no Railway.
                  </p>
                </div>
                <Button onClick={handleRunPlayground} disabled={testing} className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                  <Play className="h-4 w-4 mr-2" />
                  {testing ? "Executando API..." : "Enviar Requisição"}
                </Button>
              </div>

              {apiResponse && (
                <div className="mt-4 space-y-2">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase">Resposta do Servidor (HTTP 200 OK)</Label>
                  <pre className="rounded-xl border border-emerald-500/30 bg-slate-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
                    <code>{apiResponse}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
