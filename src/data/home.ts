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
    methods: string; settlement: string; settlementValue: string; docs: string; cta: string;
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
  footerSocial: string;
};

export const home: Record<Locale, HomeCopy> = {
  pt: {
    hero: {
      eyebrow: "Infraestrutura cross-border · América Latina",
      headline1: "Receba localmente em toda a América Latina.",
      headline2: "Liquide onde sua empresa opera.",
      sub: "Uma integração para métodos de pagamento locais em 12 mercados da América Latina, começando pelo Pix instantâneo no Brasil.",
      primary: "Falar com o time",
      secondary: "Ver documentação",
      status: "Pix disponível no Brasil. Demais métodos disponíveis sob consulta.",
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
      title: "Um contrato de integração, todo o portfólio",
      intro: "Pix disponível no Brasil. Cartões, split e payouts disponíveis sob consulta, sujeitos a onboarding.",
      contactLink: "Entre em contato para mais informações",
      items: [
        { key: "pix", name: "Pix — pagamentos instantâneos (Brasil)", text: "QR Code dinâmico, Copia e Cola e link de pagamento, com confirmação por webhook em segundos.", status: "available" },
        { key: "cards", name: "Cartões & Split", text: "Cartões domésticos e internacionais com split automático entre sellers e parceiros.", status: "on_request" },
        { key: "payouts", name: "Payouts & liquidação", text: "Pix out e repasses locais, com liquidação internacional conforme contrato.", status: "on_request" },
      ],
    },
    crossBorder: {
      label: "Cross-border",
      title: "Cobrança local. Operação global.",
      intro: "Entre na América Latina com experiências de pagamento locais e familiares e uma camada única para integrar, acompanhar e conciliar sua operação.",
      cta: "Desenhar minha operação",
      availability: "Pix disponível no Brasil · demais mercados sob consulta",
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
      title: "Roteamento regional",
      intro: "Roteamento entre parceiros regionais, desenhado para resiliência.",
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
      settlementValue: "Definido no contrato comercial",
      docs: "Documentos de KYC",
      cta: "Solicitar demo",
    },
    pricing: {
      label: "Preços", title: "Preços transparentes em toda a América Latina",
      intro: "Uma integração, taxas locais por mercado. Preços por volume disponíveis sob consulta.",
      badge: "Disponível sob consulta · sujeito a onboarding", payin: "Pay-in (recebimento)", payout: "Payout (pagamento)", payinFrom: "Pay-in a partir de",
      cols: { method: "Método", providers: "Redes", rate: "Taxa" }, notAvailable: "Indisponível", minFee: "Tarifa mínima por transação", notes: "Notas",
      feesTitle: "Taxas de conta e liquidação",
      legal: "As taxas incidem sobre o valor da transação. Impostos locais incidem sobre a taxa de processamento conforme indicado em cada mercado. A disponibilidade por mercado e vertical está sujeita à aprovação de KYC, KYB e compliance. Os preços são indicativos e os termos finais são definidos no contrato comercial.",
      cta: "Falar com o time", requestSheet: "Solicitar tabela completa de preços", country: "País",
    },
    devhub: { sandbox: "Acessar o sandbox", sandboxSoon: "Disponível" },
    finalCta: {
      title: "Comece a receber Pix hoje",
      text: "Fale com o time e receba o desenho de integração para a sua operação.",
      button: "Falar com o time",
      secondary: "Falar com o time",
    },
    verticalsAvailable: "Disponível sob consulta",
    verticalsUpcoming: "Disponível sob consulta",
    footerSocial: "Redes",
  },
  en: {
    hero: {
      eyebrow: "Cross-border infrastructure · Latin America",
      headline1: "Collect locally across Latin America.",
      headline2: "Settle where your business operates.",
      sub: "One integration for local payment methods in 12 Latin American markets, starting with instant Pix in Brazil.",
      primary: "Talk to the team",
      secondary: "See documentation",
      status: "Pix available in Brazil. Other methods available on request.",
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
      title: "One integration, the whole portfolio",
      intro: "Pix available in Brazil. Cards, split and payouts available on request, subject to onboarding.",
      contactLink: "Contact us for more information",
      items: [
        { key: "pix", name: "Pix — instant payments (Brazil)", text: "Dynamic QR Code, copy-and-paste codes and payment links, confirmed by webhook in seconds.", status: "available" },
        { key: "cards", name: "Cards & Split", text: "Domestic and international cards with automatic split between sellers and partners.", status: "on_request" },
        { key: "payouts", name: "Payouts & settlement", text: "Pix out and local payouts, with international settlement under contract.", status: "on_request" },
      ],
    },
    crossBorder: {
      label: "Cross-border",
      title: "Local collection. Global operations.",
      intro: "Enter Latin America with familiar local payment experiences and one layer to integrate, monitor and reconcile your operation.",
      cta: "Design my payment flow",
      availability: "Pix available in Brazil · other markets on request",
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
      title: "Regional routing",
      intro: "Routing across regional partners, designed for resilience.",
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
      settlementValue: "Defined in the commercial agreement",
      docs: "KYC documents",
      cta: "Request a demo",
    },
    pricing: {
      label: "Pricing", title: "Transparent pricing across Latin America",
      intro: "One integration, local rates per market. Volume based pricing available on request.",
      badge: "Available on request · subject to onboarding", payin: "Pay-in (collection)", payout: "Payout (disbursement)", payinFrom: "Pay-in from",
      cols: { method: "Method", providers: "Providers", rate: "Rate" }, notAvailable: "Not available", minFee: "Minimum fee per transaction", notes: "Notes",
      feesTitle: "Account & settlement fees",
      legal: "Rates apply to the transaction amount. Local taxes apply to the processing fee as indicated per market. Availability by market and vertical is subject to KYC, KYB and compliance approval. Prices are indicative and final terms are defined in the commercial agreement.",
      cta: "Talk to the team", requestSheet: "Request full pricing sheet", country: "Country",
    },
    devhub: { sandbox: "Open the sandbox", sandboxSoon: "Available" },
    finalCta: {
      title: "Start accepting Pix today",
      text: "Talk to the team and get an integration design for your operation.",
      button: "Talk to the team",
      secondary: "Talk to the team",
    },
    verticalsAvailable: "Available on request",
    verticalsUpcoming: "Available on request",
    footerSocial: "Social",
  },
};

export const verticalStatus: Record<number, boolean> = {
  0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true,
};
