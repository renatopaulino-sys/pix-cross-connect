export type Status = "live" | "soon";

export type Method = {
  id: string;
  status: Status;
  icon: string;
  name: { pt: string; en: string };
  description: { pt: string; en: string };
};

export const methods: Method[] = [
  {
    id: "pix",
    status: "live",
    icon: "zap",
    name: { pt: "Pix", en: "Pix" },
    description: {
      pt: "Cobrança via QR Code dinâmico, Pix Copia e Cola e link de pagamento. Confirmação em segundos, 24 por 7.",
      en: "Dynamic QR Code charges, copy-and-paste codes and payment links. Confirmation in seconds, 24/7.",
    },
  },
  {
    id: "credit",
    status: "soon",
    icon: "credit-card",
    name: { pt: "Cartão de crédito", en: "Credit card" },
    description: {
      pt: "Bandeiras nacionais e internacionais, parcelado e recorrência.",
      en: "Domestic and international schemes, installments and recurring billing.",
    },
  },
  {
    id: "debit",
    status: "soon",
    icon: "credit-card",
    name: { pt: "Cartão de débito", en: "Debit card" },
    description: {
      pt: "Débito à vista com autenticação do emissor.",
      en: "Single-payment debit with issuer authentication.",
    },
  },
  {
    id: "boleto",
    status: "soon",
    icon: "barcode",
    name: { pt: "Boleto bancário", en: "Boleto" },
    description: {
      pt: "Documento de cobrança com vencimento e compensação bancária.",
      en: "Brazilian bank slip with due date and bank clearing.",
    },
  },
  {
    id: "pix-installments",
    status: "soon",
    icon: "layers",
    name: { pt: "Pix parcelado", en: "Pix in installments" },
    description: {
      pt: "Parcelamento sobre trilho Pix com análise de crédito do parceiro.",
      en: "Installments over the Pix rail with partner credit analysis.",
    },
  },
  {
    id: "pix-out",
    status: "soon",
    icon: "send",
    name: { pt: "Pix out", en: "Pix out" },
    description: {
      pt: "Pagamentos e saques para chaves Pix e contas bancárias.",
      en: "Payouts and withdrawals to Pix keys and bank accounts.",
    },
  },
  {
    id: "wallets",
    status: "soon",
    icon: "wallet",
    name: { pt: "Carteiras digitais", en: "Digital wallets" },
    description: {
      pt: "Pagamento por carteiras com saldo e tokenização.",
      en: "Wallet payments with stored balance and tokenization.",
    },
  },
  {
    id: "spei",
    status: "soon",
    icon: "building",
    name: { pt: "SPEI (México)", en: "SPEI (Mexico)" },
    description: {
      pt: "Transferência interbancária mexicana em tempo real.",
      en: "Real-time Mexican interbank transfer.",
    },
  },
  {
    id: "pse",
    status: "soon",
    icon: "building",
    name: { pt: "PSE (Colômbia)", en: "PSE (Colombia)" },
    description: {
      pt: "Débito online a partir de contas bancárias colombianas.",
      en: "Online debit from Colombian bank accounts.",
    },
  },
  {
    id: "oxxo",
    status: "soon",
    icon: "store",
    name: { pt: "OXXO (México)", en: "OXXO (Mexico)" },
    description: {
      pt: "Pagamento em dinheiro na rede de lojas físicas.",
      en: "Cash payment across the physical store network.",
    },
  },
  {
    id: "latam-transfers",
    status: "soon",
    icon: "globe",
    name: {
      pt: "Transferências locais LATAM",
      en: "Local LATAM transfers",
    },
    description: {
      pt: "Trilhos locais em outros países da América Latina.",
      en: "Local rails across other Latin American countries.",
    },
  },
];

export type Solution = Method;

export const solutions: Solution[] = [
  {
    id: "pix-charges",
    status: "live",
    icon: "zap",
    name: { pt: "Cobrança Pix", en: "Pix charges" },
    description: {
      pt: "Gere cobranças por API ou link e receba confirmação em tempo real.",
      en: "Create charges by API or link and get real-time confirmation.",
    },
  },
  {
    id: "checkout",
    status: "soon",
    icon: "layout",
    name: { pt: "Checkout transparente", en: "Transparent checkout" },
    description: {
      pt: "Checkout hospedado ou embarcado no seu fluxo.",
      en: "Hosted checkout or embedded in your own flow.",
    },
  },
  {
    id: "payment-links",
    status: "soon",
    icon: "link",
    name: { pt: "Links de pagamento", en: "Payment links" },
    description: {
      pt: "Cobre sem integração, direto pelo painel.",
      en: "Charge with no integration, straight from the dashboard.",
    },
  },
  {
    id: "split",
    status: "soon",
    icon: "split",
    name: { pt: "Split de pagamentos", en: "Payment split" },
    description: {
      pt: "Divisão automática entre marketplace e sellers.",
      en: "Automatic division between marketplace and sellers.",
    },
  },
  {
    id: "payouts",
    status: "soon",
    icon: "send",
    name: {
      pt: "Payouts e liquidação internacional",
      en: "Payouts and international settlement",
    },
    description: {
      pt: "Envie recursos para fora do Brasil com FX transparente.",
      en: "Send funds out of Brazil with transparent FX.",
    },
  },
  {
    id: "dashboard",
    status: "soon",
    icon: "chart",
    name: { pt: "Painel e conciliação", en: "Dashboard and reconciliation" },
    description: {
      pt: "Extrato, relatórios e conciliação automática.",
      en: "Statements, reports and automatic reconciliation.",
    },
  },
];
