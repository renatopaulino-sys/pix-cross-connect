export type Status = "available" | "on_request" | "soon";

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
    status: "available",
    icon: "zap",
    name: { pt: "Pix", en: "Pix" },
    description: {
      pt: "Cobrança via QR Code dinâmico, Pix Copia e Cola e link de pagamento. Confirmação em segundos.",
      en: "Dynamic QR Code charges, copy-and-paste codes and payment links. Confirmation in seconds.",
    },
  },
  {
    id: "credit",
    status: "available",
    icon: "credit-card",
    name: { pt: "Cartão de crédito", en: "Credit card" },
    description: {
      pt: "Bandeiras nacionais e internacionais, parcelado e recorrência.",
      en: "Domestic and international schemes, installments and recurring billing.",
    },
  },
  {
    id: "debit",
    status: "available",
    icon: "credit-card",
    name: { pt: "Cartão de débito", en: "Debit card" },
    description: {
      pt: "Débito à vista com autenticação do emissor.",
      en: "Single-payment debit with issuer authentication.",
    },
  },
  {
    id: "boleto",
    status: "available",
    icon: "barcode",
    name: { pt: "Boleto bancário", en: "Boleto" },
    description: {
      pt: "Documento de cobrança com vencimento e compensação bancária.",
      en: "Brazilian bank slip with due date and bank clearing.",
    },
  },
  {
    id: "pix-installments",
    status: "available",
    icon: "layers",
    name: { pt: "Pix parcelado", en: "Pix in installments" },
    description: {
      pt: "Parcelamento sobre trilho Pix com análise de crédito do parceiro.",
      en: "Installments over the Pix rail with partner credit analysis.",
    },
  },
  {
    id: "pix-out",
    status: "available",
    icon: "send",
    name: { pt: "Pix out", en: "Pix out" },
    description: {
      pt: "Pagamentos e saques para chaves Pix e contas bancárias.",
      en: "Payouts and withdrawals to Pix keys and bank accounts.",
    },
  },
  {
    id: "wallets",
    status: "available",
    icon: "wallet",
    name: { pt: "Carteiras digitais", en: "Digital wallets" },
    description: {
      pt: "Pagamento por carteiras com saldo e tokenização.",
      en: "Wallet payments with stored balance and tokenization.",
    },
  },
  {
    id: "spei",
    status: "available",
    icon: "building",
    name: { pt: "SPEI (México)", en: "SPEI (Mexico)" },
    description: {
      pt: "Transferência interbancária mexicana em tempo real.",
      en: "Real-time Mexican interbank transfer.",
    },
  },
  {
    id: "pse",
    status: "available",
    icon: "building",
    name: { pt: "PSE (Colômbia)", en: "PSE (Colombia)" },
    description: {
      pt: "Débito online a partir de contas bancárias colombianas.",
      en: "Online debit from Colombian bank accounts.",
    },
  },
  {
    id: "oxxo",
    status: "available",
    icon: "store",
    name: { pt: "OXXO (México)", en: "OXXO (Mexico)" },
    description: {
      pt: "Pagamento em dinheiro na rede de lojas físicas.",
      en: "Cash payment across the physical store network.",
    },
  },
  {
    id: "latam-transfers",
    status: "available",
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
    status: "available",
    icon: "zap",
    name: { pt: "Cobrança Pix", en: "Pix charges" },
    description: {
      pt: "Gere cobranças por API ou link e receba confirmação em tempo real.",
      en: "Create charges by API or link and get real-time confirmation.",
    },
  },
  {
    id: "checkout",
    status: "available",
    icon: "layout",
    name: { pt: "Checkout transparente", en: "Transparent checkout" },
    description: {
      pt: "Checkout hospedado ou embarcado no seu fluxo.",
      en: "Hosted checkout or embedded in your own flow.",
    },
  },
  {
    id: "payment-links",
    status: "available",
    icon: "link",
    name: { pt: "Links de pagamento", en: "Payment links" },
    description: {
      pt: "Cobre sem integração, direto pelo painel.",
      en: "Charge with no integration, straight from the dashboard.",
    },
  },
  {
    id: "split",
    status: "available",
    icon: "split",
    name: { pt: "Split de pagamentos", en: "Payment split" },
    description: {
      pt: "Divisão automática entre marketplace e sellers.",
      en: "Automatic division between marketplace and sellers.",
    },
  },
  {
    id: "payouts",
    status: "available",
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
    status: "available",
    icon: "chart",
    name: { pt: "Painel e conciliação", en: "Dashboard and reconciliation" },
    description: {
      pt: "Extrato, relatórios e conciliação automática.",
      en: "Statements, reports and automatic reconciliation.",
    },
  },
];

type L = { pt: string; en: string };
export type MethodPage = {
  slug: "pix" | "spei" | "pse" | "oxxo";
  methodId: string;
  name: string;
  country: L;
  currency: string;
  what: L;
  steps: L[];
  confirmation: L;
  useCases: L;
};

export const methodPages: MethodPage[] = [
  {
    slug: "pix", methodId: "pix", name: "Pix", country: { pt: "Brasil", en: "Brazil" }, currency: "BRL",
    what: { pt: "Pix é o sistema de pagamentos instantâneos do Banco Central do Brasil. O comprador paga a partir do aplicativo do banco usando QR Code ou código Copia e Cola.", en: "Pix is the instant payment system of Brazil's Central Bank. The buyer pays from their banking app using a QR Code or a copy-and-paste code." },
    steps: [
      { pt: "O comprador escolhe Pix no checkout e recebe um QR Code dinâmico ou código Copia e Cola.", en: "The buyer selects Pix at checkout and receives a dynamic QR Code or copy-and-paste code." },
      { pt: "Abre o aplicativo do banco, lê o QR Code ou cola o código e confirma.", en: "They open their banking app, scan the QR Code or paste the code and confirm." },
      { pt: "A confirmação chega por webhook e o pedido é liberado.", en: "Confirmation arrives by webhook and the order is released." },
    ],
    confirmation: { pt: "Segundos, a qualquer hora", en: "Seconds, at any time" },
    useCases: { pt: "E-commerce, serviços digitais, assinaturas e pagamentos avulsos por link.", en: "E-commerce, digital services, subscriptions and one-off payments by link." },
  },
  {
    slug: "spei", methodId: "spei", name: "SPEI", country: { pt: "México", en: "Mexico" }, currency: "MXN",
    what: { pt: "SPEI é o sistema de transferências interbancárias em tempo real operado pelo Banco de México.", en: "SPEI is the real-time interbank transfer system operated by Banco de México." },
    steps: [
      { pt: "O comprador escolhe transferência bancária e recebe uma CLABE de referência.", en: "The buyer selects bank transfer and receives a reference CLABE." },
      { pt: "Faz a transferência pelo internet banking ou aplicativo do banco.", en: "They send the transfer from online banking or their bank app." },
      { pt: "A transferência é identificada e a confirmação chega por webhook.", en: "The transfer is matched and confirmation arrives by webhook." },
    ],
    confirmation: { pt: "Minutos, em geral", en: "Usually minutes" },
    useCases: { pt: "Tickets médios e altos, B2B, educação e serviços digitais.", en: "Mid to high tickets, B2B, education and digital services." },
  },
  {
    slug: "pse", methodId: "pse", name: "PSE", country: { pt: "Colômbia", en: "Colombia" }, currency: "COP",
    what: { pt: "PSE é o botão de débito online que permite pagar diretamente a partir de contas bancárias colombianas.", en: "PSE is the online debit button that lets buyers pay directly from Colombian bank accounts." },
    steps: [
      { pt: "O comprador escolhe PSE e seleciona o seu banco.", en: "The buyer selects PSE and chooses their bank." },
      { pt: "É redirecionado ao ambiente do banco para autenticar e aprovar o débito.", en: "They are redirected to their bank to authenticate and approve the debit." },
      { pt: "Retorna ao checkout e a confirmação chega por webhook.", en: "They return to checkout and confirmation arrives by webhook." },
    ],
    confirmation: { pt: "Minutos, em geral", en: "Usually minutes" },
    useCases: { pt: "E-commerce, viagens, educação e serviços digitais.", en: "E-commerce, travel, education and digital services." },
  },
  {
    slug: "oxxo", methodId: "oxxo", name: "OXXO", country: { pt: "México", en: "Mexico" }, currency: "MXN",
    what: { pt: "OXXO Pay permite pagar em dinheiro na rede de lojas OXXO a partir de uma referência gerada no checkout.", en: "OXXO Pay lets buyers pay in cash at OXXO stores using a reference generated at checkout." },
    steps: [
      { pt: "O comprador escolhe OXXO e recebe uma referência de pagamento com validade.", en: "The buyer selects OXXO and receives a payment reference with an expiry date." },
      { pt: "Vai a uma loja OXXO e paga em dinheiro informando a referência.", en: "They visit an OXXO store and pay in cash with the reference." },
      { pt: "O pagamento é confirmado por webhook após o processamento da loja.", en: "Payment is confirmed by webhook once the store processes it." },
    ],
    confirmation: { pt: "Até o dia útil seguinte, em geral", en: "Usually by the next business day" },
    useCases: { pt: "Compradores sem conta bancária ou cartão, e-commerce e serviços digitais.", en: "Unbanked or card-less buyers, e-commerce and digital services." },
  },
];
