import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Copy, QrCode, ArrowRight, ShieldCheck, Clock, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface PixCheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PixCheckoutModal({ open, onOpenChange }: PixCheckoutModalProps) {
  const [step, setStep] = useState<"form" | "qrcode" | "success">("form");
  const [amount, setAmount] = useState<string>("50.00");
  const [name, setName] = useState<string>("Cliente Demonstração");
  const [cpf, setCpf] = useState<string>("123.456.789-00");
  const [email, setEmail] = useState<string>("cliente@exemplo.com");
  const [loading, setLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(900);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "qrcode" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleGeneratePix = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const payload = `00020126580014br.gov.bcb.pix0136cruziapay-pix-gateway-id-${Date.now()}5204000053039865405${Number(amount).toFixed(2)}5802BR5920CruziaPay Pagamentos6009SAO PAULO62070503***6304E8A2`;
    setPixPayload(payload);

    setLoading(false);
    setStep("qrcode");
    setTimer(900);
  };

  const [pixPayload, setPixPayload] = useState<string>("");

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(pixPayload);
    toast.success("Código Pix Copia e Cola copiado!");
  };

  const handleSimulatePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("success");
      toast.success("Pagamento Pix identificado instantaneamente!");
    }, 1000);
  };

  const resetFlow = () => {
    setStep("form");
    setAmount("50.00");
    setTimer(900);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => { onOpenChange(val); if (!val) resetFlow(); }}>
      <DialogContent className="max-w-md rounded-2xl border-border bg-card p-6 shadow-2xl sm:p-8">
        {step === "form" && (
          <div>
            <DialogHeader className="text-left">
              <div className="flex items-center gap-2 text-primary font-medium text-xs uppercase tracking-wider">
                <QrCode className="h-4 w-4" />
                <span>Demonstração de Checkout Pix</span>
              </div>
              <DialogTitle className="mt-1 text-2xl font-bold">
                Gerar Cobrança Pix Instantânea
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm">
                Experimente a velocidade de confirmação do Pix CruziaPay para merchants internacionais.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleGeneratePix} className="mt-6 space-y-4">
              <div>
                <Label className="text-xs font-semibold text-muted-foreground uppercase">Valor do Pagamento (BRL)</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-2.5 font-bold text-muted-foreground text-sm">R$</span>
                  <Input
                    type="number"
                    step="0.01"
                    min="1.00"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-9 font-bold text-lg"
                  />
                </div>
                <div className="mt-2 flex gap-2">
                  {["20.00", "50.00", "100.00", "500.00"].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setAmount(val)}
                      className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
                        amount === val ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"
                      }`}
                    >
                      R$ {val}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <Label className="text-xs">Nome do Pagador</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">CPF / CNPJ</Label>
                    <Input value={cpf} onChange={(e) => setCpf(e.target.value)} required />
                  </div>
                  <div>
                    <Label className="text-xs">E-mail</Label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-500" />
                <span>Confirmação em tempo real via Webhook HMAC com conciliação automática.</span>
              </div>

              <Button type="submit" disabled={loading} className="w-full text-primary-foreground font-semibold py-6">
                {loading ? "Gerando QR Code Pix..." : "Gerar QR Code Pix"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        )}

        {step === "qrcode" && (
          <div className="text-center">
            <DialogHeader className="text-center">
              <DialogTitle className="text-xl font-bold">Aguardando Pagamento Pix</DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Escaneie o QR Code abaixo pelo app do seu banco ou use a opção Copia e Cola.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 flex flex-col items-center justify-center">
              <div className="relative rounded-2xl border-2 border-primary/20 bg-white p-4 shadow-inner">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pixPayload)}`}
                  alt="QR Code Pix"
                  className="h-48 w-48 rounded-lg"
                />
              </div>

              <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
                <Clock className="h-3.5 w-3.5" />
                <span>Expira em {formatTimer(timer)}</span>
              </div>

              <div className="mt-4 w-full text-left">
                <Label className="text-xs text-muted-foreground font-medium">Pix Copia e Cola</Label>
                <div className="mt-1 flex items-center gap-2">
                  <Input value={pixPayload} readOnly className="font-mono text-xs overflow-x-auto bg-muted" />
                  <Button type="button" variant="outline" onClick={handleCopyPayload} className="shrink-0">
                    <Copy className="h-4 w-4 mr-1.5" />
                    Copiar
                  </Button>
                </div>
              </div>

              <div className="mt-6 w-full space-y-2">
                <Button
                  onClick={handleSimulatePayment}
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-5"
                >
                  {loading ? (
                    <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                  )}
                  Simular Pagamento Confirmado
                </Button>
                <Button variant="ghost" onClick={resetFlow} className="w-full text-xs text-muted-foreground">
                  Voltar / Alterar Valor
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="mt-4 text-2xl font-bold text-foreground">Pagamento Confirmado!</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs mx-auto">
              O evento <code className="font-mono text-primary font-semibold">PIX_CONFIRMED</code> foi disparado via Webhook para a sua aplicação.
            </p>

            <div className="mt-6 rounded-xl border border-border bg-muted/40 p-4 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Valor pago:</span>
                <span className="font-bold text-foreground">R$ {Number(amount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status do Gateway:</span>
                <span className="font-semibold text-emerald-500">200 OK (CONFIRMED)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tempo de Confirmação:</span>
                <span className="font-mono text-foreground">0.8 segundos</span>
              </div>
            </div>

            <Button onClick={resetFlow} className="mt-6 w-full text-primary-foreground font-semibold">
              Realizar Novo Teste de Pix
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
