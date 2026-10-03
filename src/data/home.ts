import type { Locale } from "./content";

export type CountryCode = string;

const genericKyc = {
  pt: ["Documento de constituição da empresa", "Registro fiscal da empresa", "Documento dos sócios (UBO)", "Comprovante de endereço", "Dados bancários de liquidação"],
  en: ["Company incorporation document", "Company tax registration", "Shareholder / UBO IDs", "Proof of address", "Settlement bank details"],
};

export const kycDocs: Record<string, { pt: string[]; en: string[] }> = {
  BR: { pt: ["Contrato social ou estatuto", "Cartão CNPJ", "Documento dos sócios (UBO)", "Comprovante de endereço", "Dados bancários de liquidação"], en: ["Articles of incorporation", "Tax registration (CNPJ)", "Shareholder / UBO IDs", "Proof of address", "Settlement bank details"] },
  MX: { pt: ["Acta constitutiva", "RFC da empresa", "Documento dos sócios (UBO)", "Comprovante de endereço", "Dados bancários (CLABE)"], en: ["Acta constitutiva", "Company RFC", "Shareholder / UBO IDs", "Proof of address", "Bank details (CLABE)"] },
  CO: { pt: ["Certificado de existencia", "NIT / RUT", "Documento dos sócios (UBO)", "Comprovante de endereço", "Dados bancários"], en: ["Certificate of incorporation", "NIT / RUT", "Shareholder / UBO IDs", "Proof of address", "Bank details"] },
  PE: { pt: ["Ficha RUC", "Estatuto social", "Documento dos sócios (UBO)", "Comprovante de endereço", "Dados bancários (CCI)"], en: ["RUC record", "Company bylaws", "Shareholder / UBO IDs", "Proof of address", "Bank details (CCI)"] },
  AR: { pt: ["Estatuto social", "CUIT da empresa", "Documento dos sócios (UBO)", "Comprovante de endereço", "Dados bancários (CBU)"], en: ["Company bylaws", "Company CUIT", "Shareholder / UBO IDs", "Proof of address", "Bank details (CBU)"] },
  CL: { pt: ["Escritura de constitución", "RUT da empresa", "Documento dos sócios (UBO)", "Comprovante de endereço", "Dados bancários"], en: ["Deed of incorporation", "Company RUT", "Shareholder / UBO IDs", "Proof of address", "Bank details"] },
};
export const kycFor = (code: string) => kycDocs[code] ?? genericKyc;

type HomeCopy = {
  hero: { eyebrow: string; headline1: string; headline2: string; sub: string; primary: string; secondary: string; status: string; testPix: string; sandbox: string };
  heroAside: { title: string; note: string; steps: { code: string; title: string; text: string }[] };
  bullets: { title: string; text: string }[];
  highlights: {
    label: string; title: string; intro: string; contactLink: string;
    items: { key: string; name: string; text: string; status: "available" | "on_request" | "soon" }[];
  };
  crossBorder: {
    label: string; title: string; intro: string; cta: string; availability: string;
    steps: { title: string; text: string; meta: string }[];
    benefits: { title: string; text: string }[];
  };
  routing: { label: string; title: string; intro: string; hub: string; hubNote: string; source: string; sourceNote: string; tooltipHint: string };
  simulator: {
    label: string; title: string; intro: string; country: string; loading: string;
    methods: string; settlement: string; settlementValue: string; settlementNote: string; availabilityNotice: string; marketCta: string; docs: string; cta: string;
  };
  pricing: {
    label: string; title: string; intro: string; badge: string; payin: string; payout: string; payinFrom: string;
    cols: { method: string; providers: string; rate: string }; notAvailable: string; minFee: string; notes: string;
    feesTitle: string; legal: string; cta: string; requestSheet: string; country: string;
  };
  devhub: { sandbox: string; sandboxSoon: string };
  finalCta: { title: string; text: string; button: string; secondary: string };
  verticalsAvailable: string;
  verticalsUpcoming: string;
  verticalsSuspended: string;
  igamingNotice: string;
  footerSocial: string;
};

export const home: Record<Locale, HomeCopy> = {
  pt: {
    hero: {
      eyebrow: "Infraestrutura cross-border · América Latina",
      headline1: "Receba localmente em toda a América Latina.",
      headline2: "Liquide onde sua empresa opera.",
      sub: "Uma integração para métodos de pagamento locais em 12 mercados da América Latina, incluindo Pix instantâneo no Brasil.",
      primary: "Falar com o time",
      secondary: "Solicitar acesso à API",
      status: "Pix, cartões, payouts e trilhos LATAM ativos em uma única integração.",
      testPix: "Testar Checkout Pix",
      sandbox: "Ambiente sandbox, nenhum valor real é movimentado.",
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
      { title: "Integrável", text: "API REST, webhooks e referências próprias." },
      { title: "Cross-border", text: "Cobrança local conectada à sua operação global." },
      { title: "Compliance", text: "Onboarding com análise de KYC e AML." },
    ],
    highlights: {
      label: "Produtos",
      title: "Uma integração, um portfólio completo",
      intro: "Opere Pix, cartões, split, payouts e métodos locais pelo mesmo endpoint.",
      contactLink: "Entre em contato para mais informações",
      items: [
        { key: "pix", name: "Pix — pagamentos instantâneos (Brasil)", text: "QR Code dinâmico, Copia e Cola e link de pagamento, com confirmação por webhook em segundos.", status: "available" },
        { key: "cards", name: "Cartões & Split", text: "Cartões domésticos e internacionais com split automático entre sellers e parceiros.", status: "available" },
        { key: "payouts", name: "Payouts & trilhos globais", text: "Payouts para beneficiários locais e liquidação internacional em múltiplas moedas.", status: "available" },
      ],
    },
    crossBorder: {
      label: "Cross-border",
      title: "Cobrança local. Operação global.",
      intro: "Entre na América Latina com experiências de pagamento locais e familiares e uma camada única para integrar, acompanhar e conciliar sua operação.",
      cta: "Desenhar minha operação",
      availability: "Pay-ins, payouts e métodos locais ativos nos mercados atendidos.",
      steps: [
        { title: "Seu cliente paga localmente", text: "Ofereça Pix no checkout, com QR Code, Copia e Cola ou link de pagamento.", meta: "Brasil · BRL · Pix" },
        { title: "A CruziaPay processa", text: "A transação é confirmada por webhook e organizada para conciliação na sua integração.", meta: "API · Webhooks · Roteamento regional" },
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
      title: "Smart Routing",
      intro: "O roteamento multiadquirente seleciona a melhor rota em tempo real entre parceiros regionais, com failover automático.",
      hub: "CruziaPay",
      hubNote: "Roteador de pagamentos",
      source: "Sua operação",
      sourceNote: "API · Checkout · Links",
      tooltipHint: "Toque ou passe o mouse sobre os nós para ver detalhes.",
    },
    simulator: {
      label: "Cobertura",
      title: "Simulador de métodos e cobertura LATAM",
      intro: "Selecione um dos 12 mercados para ver métodos, status, prazo de liquidação e documentos de KYC exigidos.",
      country: "País",
      loading: "Consultando cobertura...",
      methods: "Métodos locais",
      settlement: "Prazo de liquidação",
      settlementValue: "D+0 a D+1",
      settlementNote: "Termos de liquidação internacional definidos por contrato.",
      availabilityNotice: "Disponível. Os termos de liquidação são definidos no contrato comercial.",
      marketCta: "Solicitar demo",
      docs: "Documentos de KYC",
      cta: "Solicitar demo",
    },
    pricing: {
      label: "Preços", title: "Preços transparentes em toda a América Latina",
      intro: "Uma integração, taxas locais por mercado. Preços por volume definidos conforme o perfil da operação.",
      badge: "Ativo", payin: "Pay-in (recebimento)", payout: "Payout (pagamento)", payinFrom: "Pay-in a partir de",
      cols: { method: "Método", providers: "Redes", rate: "Taxa" }, notAvailable: "Condições definidas no contrato comercial", minFee: "Tarifa mínima por transação", notes: "Notas",
      feesTitle: "Taxas de conta e liquidação",
      legal: "As taxas incidem sobre o valor da transação. Impostos locais incidem sobre a taxa de processamento conforme indicado em cada mercado. A disponibilidade por mercado e vertical está sujeita à aprovação de KYC, KYB e compliance. Os preços são indicativos e os termos finais são definidos no contrato comercial.",
      cta: "Falar com o time", requestSheet: "Solicitar tabela completa de preços", country: "País",
    },
    devhub: { sandbox: "Solicitar acesso ao sandbox", sandboxSoon: "" },
    finalCta: {
      title: "Comece a receber Pix hoje",
      text: "Fale com o time e receba o desenho de integração para a sua operação.",
      button: "Falar com o time",
      secondary: "Falar com o time",
    },
    verticalsAvailable: "Disponível",
    verticalsUpcoming: "Disponível",
    verticalsSuspended: "Suspenso",
    igamingNotice: "Aviso: após a Medida Provisória (MP) assinada em 25 de setembro de 2026, as operações de apostas de quota fixa no Brasil estão suspensas, incluindo novos depósitos via Pix. A CruziaPay retomará esta vertical somente quando o marco legal permitir.",
    footerSocial: "Redes",
  },
  en: {
    hero: {
      eyebrow: "Cross-border infrastructure · Latin America",
      headline1: "Collect locally across Latin America.",
      headline2: "Settle where your business operates.",
      sub: "One integration for local payment methods in 12 Latin American markets, including instant Pix in Brazil.",
      primary: "Talk to the team",
      secondary: "Request API access",
      status: "Pix, cards, payouts and LATAM rails are live through one integration.",
      testPix: "Test Pix Checkout",
      sandbox: "Sandbox environment, no real funds are moved.",
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
      { title: "Integration-ready", text: "REST API, webhooks and your own references." },
      { title: "Cross-border", text: "Local collection connected to your global operation." },
      { title: "Compliance", text: "Onboarding with KYC and AML review." },
    ],
    highlights: {
      label: "Products",
      title: "One integration, a complete portfolio",
      intro: "Run Pix, cards, split, payouts and local methods through the same endpoint.",
      contactLink: "Contact us for more information",
      items: [
        { key: "pix", name: "Pix — instant payments (Brazil)", text: "Dynamic QR Code, copy-and-paste codes and payment links, confirmed by webhook in seconds.", status: "available" },
        { key: "cards", name: "Cards & Split", text: "Domestic and international cards with automatic split between sellers and partners.", status: "available" },
        { key: "payouts", name: "Payouts & Global Rails", text: "Payouts to local beneficiaries and international settlement in multiple currencies.", status: "available" },
      ],
    },
    crossBorder: {
      label: "Cross-border",
      title: "Local collection. Global operations.",
      intro: "Enter Latin America with familiar local payment experiences and one layer to integrate, monitor and reconcile your operation.",
      cta: "Design my payment flow",
      availability: "Pay-ins, payouts and local methods are live across supported markets.",
      steps: [
        { title: "Your customer pays locally", text: "Offer Pix at checkout through QR Code, copy-and-paste or a payment link.", meta: "Brazil · BRL · Pix" },
        { title: "CruziaPay processes", text: "The payment is confirmed by webhook and organized for reconciliation in your integration.", meta: "API · Webhooks · Regional routing" },
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
      title: "Smart Routing",
      intro: "Multi-acquirer routing selects the best route in real time across regional partners, with automatic failover.",
      hub: "CruziaPay",
      hubNote: "Payment router",
      source: "Your operation",
      sourceNote: "API · Checkout · Links",
      tooltipHint: "Tap or hover the nodes to see details.",
    },
    simulator: {
      label: "Coverage",
      title: "LATAM methods and coverage simulator",
      intro: "Pick one of 12 markets to see methods, status, settlement window and required KYC documents.",
      country: "Country",
      loading: "Checking coverage...",
      methods: "Local methods",
      settlement: "Settlement window",
      settlementValue: "D+0 to D+1",
      settlementNote: "International settlement terms defined per contract.",
      availabilityNotice: "Available. Settlement terms are defined in the commercial agreement.",
      marketCta: "Request a demo",
      docs: "KYC documents",
      cta: "Request a demo",
    },
    pricing: {
      label: "Pricing", title: "Transparent pricing across Latin America",
      intro: "One integration, local rates per market. Volume pricing is defined for each operation profile.",
      badge: "Live", payin: "Pay-in (collection)", payout: "Payout (disbursement)", payinFrom: "Pay-in from",
      cols: { method: "Method", providers: "Providers", rate: "Rate" }, notAvailable: "Terms defined in the commercial agreement", minFee: "Minimum fee per transaction", notes: "Notes",
      feesTitle: "Account & settlement fees",
      legal: "Rates apply to the transaction amount. Local taxes apply to the processing fee as indicated per market. Availability by market and vertical is subject to KYC, KYB and compliance approval. Prices are indicative and final terms are defined in the commercial agreement.",
      cta: "Talk to the team", requestSheet: "Request full pricing sheet", country: "Country",
    },
    devhub: { sandbox: "Request sandbox access", sandboxSoon: "" },
    finalCta: {
      title: "Start accepting Pix today",
      text: "Talk to the team and get an integration design for your operation.",
      button: "Talk to the team",
      secondary: "Talk to the team",
    },
    verticalsAvailable: "Available",
    verticalsUpcoming: "Available",
    verticalsSuspended: "Suspended",
    igamingNotice: "Notice: following the Provisional Measure (MP) signed on 25 September 2026, fixed odds betting operations in Brazil are suspended, including new Pix deposits. CruziaPay will resume this vertical only when the legal framework allows.",
    footerSocial: "Social",
  },
};
