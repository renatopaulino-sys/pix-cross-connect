import type { Locale } from "./content";

export type CountryCode = "BR" | "MX" | "CO" | "PE" | "AR" | "CL";

export const latamCoverage: Record<
  CountryCode,
  { flag: string; live: boolean; methods: string[]; settlement: { pt: string; en: string }; kyc: { pt: string[]; en: string[] } }
> = {
  BR: {
    flag: "🇧🇷",
    live: true,
    methods: ["Pix QR Code", "Pix Copia e Cola", "Pix payment link", "Boleto (soon)", "Cards (soon)"],
    settlement: { pt: "D+0 a D+1 útil", en: "D+0 to D+1 business day" },
    kyc: {
      pt: ["Contrato social ou estatuto", "Cartão CNPJ", "Documento dos sócios (UBO)", "Comprovante de endereço", "Dados bancários de liquidação"],
      en: ["Articles of incorporation", "Tax registration (CNPJ)", "Shareholder / UBO IDs", "Proof of address", "Settlement bank details"],
    },
  },
  MX: {
    flag: "🇲🇽",
    live: false,
    methods: ["SPEI transfer", "Cards (soon)", "Cash vouchers (soon)"],
    settlement: { pt: "D+1 a D+2 úteis", en: "D+1 to D+2 business days" },
    kyc: {
      pt: ["Acta constitutiva", "RFC da empresa", "Documento dos sócios (UBO)", "Comprovante de endereço", "Dados bancários (CLABE)"],
      en: ["Acta constitutiva", "Company RFC", "Shareholder / UBO IDs", "Proof of address", "Bank details (CLABE)"],
    },
  },
  CO: {
    flag: "🇨🇴",
    live: false,
    methods: ["PSE", "Bank transfer", "Cards (soon)"],
    settlement: { pt: "D+2 úteis", en: "D+2 business days" },
    kyc: {
      pt: ["Certificado de existencia", "NIT / RUT", "Documento dos sócios (UBO)", "Comprovante de endereço", "Dados bancários"],
      en: ["Certificate of incorporation", "NIT / RUT", "Shareholder / UBO IDs", "Proof of address", "Bank details"],
    },
  },
  PE: {
    flag: "🇵🇪",
    live: false,
    methods: ["Bank transfer", "Yape / PagoEfectivo (soon)", "Cards (soon)"],
    settlement: { pt: "D+2 a D+3 úteis", en: "D+2 to D+3 business days" },
    kyc: {
      pt: ["Ficha RUC", "Estatuto social", "Documento dos sócios (UBO)", "Comprovante de endereço", "Dados bancários (CCI)"],
      en: ["RUC record", "Company bylaws", "Shareholder / UBO IDs", "Proof of address", "Bank details (CCI)"],
    },
  },
  AR: {
    flag: "🇦🇷",
    live: false,
    methods: ["Transferencia 3.0", "Cards (soon)"],
    settlement: { pt: "D+2 a D+3 úteis", en: "D+2 to D+3 business days" },
    kyc: {
      pt: ["Estatuto social", "CUIT da empresa", "Documento dos sócios (UBO)", "Comprovante de endereço", "Dados bancários (CBU)"],
      en: ["Company bylaws", "Company CUIT", "Shareholder / UBO IDs", "Proof of address", "Bank details (CBU)"],
    },
  },
  CL: {
    flag: "🇨🇱",
    live: false,
    methods: ["Bank transfer", "Webpay (soon)", "Cards (soon)"],
    settlement: { pt: "D+2 úteis", en: "D+2 business days" },
    kyc: {
      pt: ["Escritura de constitución", "RUT da empresa", "Documento dos sócios (UBO)", "Comprovante de endereço", "Dados bancários"],
      en: ["Deed of incorporation", "Company RUT", "Shareholder / UBO IDs", "Proof of address", "Bank details"],
    },
  },
};

export const countryOrder: CountryCode[] = ["BR", "MX", "CO", "PE", "AR", "CL"];

export const acquirers = [
  { id: "p1", name: "Provider 1", market: "BR", note: { pt: "Adquirência local — Brasil", en: "Local acquirer — Brazil" } },
  { id: "p2", name: "Provider 2", market: "MX", note: { pt: "Adquirência local — México", en: "Local acquirer — Mexico" } },
  { id: "p3", name: "Provider 3", market: "CO", note: { pt: "Adquirência local — Colômbia", en: "Local acquirer — Colombia" } },
  { id: "p4", name: "Provider 4", market: "PE", note: { pt: "Adquirência local — Peru", en: "Local acquirer — Peru" } },
  { id: "p5", name: "Provider 5", market: "AR", note: { pt: "Adquirência local — Argentina", en: "Local acquirer — Argentina" } },
  { id: "p6", name: "Provider 6", market: "CL", note: { pt: "Adquirência local — Chile", en: "Local acquirer — Chile" } },
];

type HomeCopy = {
  hero: { eyebrow: string; headline1: string; headline2: string; sub: string; primary: string; secondary: string; status: string };
  heroAside: { title: string; note: string; steps: { code: string; title: string; text: string }[] };
  bullets: { title: string; text: string }[];
  highlights: {
    label: string; title: string; intro: string; contactLink: string;
    items: { key: string; name: string; text: string; live: boolean }[];
  };
  crossBorder: {
    label: string; title: string; intro: string; cta: string; availability: string;
    steps: { title: string; text: string; meta: string }[];
    benefits: { title: string; text: string }[];
  };
  routing: { label: string; title: string; intro: string; hub: string; hubNote: string; source: string; sourceNote: string; tooltipHint: string };
  simulator: {
    label: string; title: string; intro: string; country: string; loading: string;
    methods: string; settlement: string; docs: string; cta: string; liveBadge: string; soonBadge: string;
  };
  devhub: { sandbox: string; sandboxSoon: string };
  finalCta: { title: string; text: string; button: string; secondary: string };
  verticalsAvailable: string;
  verticalsUpcoming: string;
  footerSocial: string;
};

export const home: Record<Locale, HomeCopy> = {
  pt: {
    hero: {
      eyebrow: "Infraestrutura cross-border · América Latina",
      headline1: "Venda no Brasil.",
      headline2: "Receba onde sua empresa opera.",
      sub: "Uma integração para oferecer Pix aos seus clientes, acompanhar cada pagamento e organizar a liquidação internacional da sua operação.",
      primary: "Falar com o time",
      secondary: "Ver documentação",
      status: "Pix ativo no Brasil. Demais métodos em habilitação.",
    },
    heroAside: {
      title: "Uma operação, ponta a ponta",
      note: "Do checkout local à conciliação, com visibilidade em uma única integração.",
      steps: [
        { code: "01", title: "Pay-in local", text: "Pix disponível no Brasil" },
        { code: "02", title: "Orquestração", text: "Roteamento e confirmação" },
        { code: "03", title: "Settlement", text: "Liquidação conforme contrato" },
      ],
    },
    bullets: [
      { title: "Instantâneo", text: "Pagamento confirmado em segundos." },
      { title: "Escalável", text: "Suporta volumes de € 10 M+ por mês." },
      { title: "Global-ready", text: "APIs e SDKs multilíngues (EN / PT)." },
      { title: "Compliance total", text: "KYC/AML alinhado à LGPD e ao GDPR." },
    ],
    highlights: {
      label: "Produtos",
      title: "Um contrato de integração, todo o portfólio",
      intro: "O Pix já está em produção no Brasil. Os demais produtos entram no mesmo endpoint conforme forem habilitados.",
      contactLink: "Entre em contato para mais informações",
      items: [
        { key: "pix", name: "Pix — pagamentos instantâneos (Brasil)", text: "QR Code dinâmico, Copia e Cola e link de pagamento, com confirmação por webhook em segundos.", live: true },
        { key: "cards", name: "Cartões & Split", text: "Cartões domésticos e internacionais com split automático entre sellers e parceiros.", live: false },
        { key: "payouts", name: "Payouts & Global Rails", text: "Repasses para beneficiários locais e liquidação internacional em múltiplas moedas.", live: false },
      ],
    },
    crossBorder: {
      label: "Cross-border",
      title: "Cobrança local. Operação global.",
      intro: "Entre no Brasil com uma experiência de pagamento familiar para o cliente e uma camada única para integrar, acompanhar e conciliar sua operação.",
      cta: "Desenhar minha operação",
      availability: "Pix disponível no Brasil · Demais mercados em habilitação",
      steps: [
        { title: "Seu cliente paga localmente", text: "Ofereça Pix no checkout, com QR Code, Copia e Cola ou link de pagamento.", meta: "Brasil · BRL · Pix" },
        { title: "A CruziaPay processa", text: "A transação é confirmada por webhook e organizada para conciliação na sua integração.", meta: "API · Webhooks · Smart routing" },
        { title: "Sua empresa liquida", text: "O recebimento internacional segue moeda, prazo e condições definidos comercialmente.", meta: "Conforme contratação" },
      ],
      benefits: [
        { title: "Experiência local", text: "Um meio de pagamento conhecido pelo comprador brasileiro." },
        { title: "Integração centralizada", text: "Uma conexão para cobrança, status e conciliação." },
        { title: "Visibilidade operacional", text: "Referências próprias e eventos para acompanhar cada transação." },
        { title: "Compliance desde o início", text: "Onboarding com análise de KYC e AML para a sua operação." },
      ],
    },
    routing: {
      label: "Infraestrutura",
      title: "Smart Routing & Multi-Acquirer",
      intro: "A CruziaPay conecta sua operação a múltiplos parceiros de adquirência regionais. O roteador escolhe a melhor rota em tempo real, com failover automático.",
      hub: "CruziaPay",
      hubNote: "Roteador de pagamentos",
      source: "Sua operação",
      sourceNote: "API · Checkout · Links",
      tooltipHint: "Toque ou passe o mouse sobre os nós para ver detalhes.",
    },
    simulator: {
      label: "Cobertura",
      title: "Simulador de métodos e cobertura LATAM",
      intro: "Selecione o país de operação para ver métodos suportados, prazo de liquidação e documentos de KYC exigidos.",
      country: "País",
      loading: "Consultando cobertura...",
      methods: "Métodos locais",
      settlement: "Prazo de liquidação",
      docs: "Documentos de KYC",
      cta: "Solicitar demo",
      liveBadge: "Disponível",
      soonBadge: "Em breve",
    },
    devhub: { sandbox: "Acessar o sandbox", sandboxSoon: "Em breve" },
    finalCta: {
      title: "Comece a receber Pix hoje",
      text: "Fale com o time e receba o desenho de integração para a sua operação.",
      button: "Falar com o time",
      secondary: "Falar com o time",
    },
    verticalsAvailable: "Disponível",
    verticalsUpcoming: "Em breve",
    footerSocial: "Redes",
  },
  en: {
    hero: {
      eyebrow: "Cross-border infrastructure · Latin America",
      headline1: "Sell in Brazil.",
      headline2: "Settle where your business operates.",
      sub: "One integration to offer Pix to your customers, track every payment and organize international settlement for your operation.",
      primary: "Talk to the team",
      secondary: "See documentation",
      status: "Pix live in Brazil. Other methods being enabled.",
    },
    heroAside: {
      title: "One end-to-end operation",
      note: "From local checkout to reconciliation, visible through a single integration.",
      steps: [
        { code: "01", title: "Local pay-in", text: "Pix available in Brazil" },
        { code: "02", title: "Orchestration", text: "Routing and confirmation" },
        { code: "03", title: "Settlement", text: "Settlement under contract" },
      ],
    },
    bullets: [
      { title: "Instant", text: "Payments confirmed in seconds." },
      { title: "Scalable", text: "Handles volumes of €10M+ per month." },
      { title: "Global-ready", text: "Multilingual APIs and SDKs (EN / PT)." },
      { title: "Fully compliant", text: "KYC/AML aligned with LGPD and GDPR." },
    ],
    highlights: {
      label: "Products",
      title: "One integration, the whole portfolio",
      intro: "Pix is live in Brazil today. Every other product lands on the same endpoint as it is enabled.",
      contactLink: "Contact us for more information",
      items: [
        { key: "pix", name: "Pix — instant payments (Brazil)", text: "Dynamic QR Code, copy-and-paste codes and payment links, confirmed by webhook in seconds.", live: true },
        { key: "cards", name: "Cards & Split", text: "Domestic and international cards with automatic split between sellers and partners.", live: false },
        { key: "payouts", name: "Payouts & Global Rails", text: "Payouts to local beneficiaries and international settlement in multiple currencies.", live: false },
      ],
    },
    crossBorder: {
      label: "Cross-border",
      title: "Local collection. Global operations.",
      intro: "Enter Brazil with a familiar payment experience for customers and one layer to integrate, monitor and reconcile your operation.",
      cta: "Design my payment flow",
      availability: "Pix available in Brazil · Other markets being enabled",
      steps: [
        { title: "Your customer pays locally", text: "Offer Pix at checkout through QR Code, copy-and-paste or a payment link.", meta: "Brazil · BRL · Pix" },
        { title: "CruziaPay processes", text: "The payment is confirmed by webhook and organized for reconciliation in your integration.", meta: "API · Webhooks · Smart routing" },
        { title: "Your business settles", text: "International settlement follows the currency, timing and terms agreed commercially.", meta: "Subject to contract" },
      ],
      benefits: [
        { title: "Local experience", text: "A familiar payment method for Brazilian customers." },
        { title: "Centralized integration", text: "One connection for collection, status and reconciliation." },
        { title: "Operational visibility", text: "Your own references and events to track each transaction." },
        { title: "Compliance from day one", text: "KYC and AML onboarding designed around your operation." },
      ],
    },
    routing: {
      label: "Infrastructure",
      title: "Smart Routing & Multi-Acquirer",
      intro: "CruziaPay connects your operation to multiple regional acquiring partners. The router picks the best route in real time, with automatic failover.",
      hub: "CruziaPay",
      hubNote: "Payment router",
      source: "Your operation",
      sourceNote: "API · Checkout · Links",
      tooltipHint: "Tap or hover the nodes to see details.",
    },
    simulator: {
      label: "Coverage",
      title: "LATAM methods and coverage simulator",
      intro: "Pick your country of operation to see supported methods, settlement window and required KYC documents.",
      country: "Country",
      loading: "Checking coverage...",
      methods: "Local methods",
      settlement: "Settlement window",
      docs: "KYC documents",
      cta: "Request a demo",
      liveBadge: "Available",
      soonBadge: "Upcoming",
    },
    devhub: { sandbox: "Open the sandbox", sandboxSoon: "Coming soon" },
    finalCta: {
      title: "Start accepting Pix today",
      text: "Talk to the team and get an integration design for your operation.",
      button: "Talk to the team",
      secondary: "Talk to the team",
    },
    verticalsAvailable: "Available",
    verticalsUpcoming: "Upcoming",
    footerSocial: "Social",
  },
};

export const verticalStatus: Record<number, boolean> = {
  0: true, 1: true, 2: true, 3: false, 4: true, 5: true, 6: false,
};
